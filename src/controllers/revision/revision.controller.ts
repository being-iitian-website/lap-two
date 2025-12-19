import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { checkAndAwardRevisionXP } from "./xp.revision";

// Enum types matching Prisma schema
type RevisionStatus = "pending" | "completed" | "missed";

interface CreateRevisionBody {
  subject: string;
  units: string[];
  notes?: string;
  revisionDate: string;
}

interface UpdateRevisionStatusBody {
  status: RevisionStatus;
}

// Export helper function for use in other revision controllers
export const updateMissedRevisions = async (userId: string): Promise<void> => {
  const now = new Date();
  const effectiveToday = new Date(now);

  // Before 5 AM, roll back one day so that "today" is effectively yesterday.
  if (now.getHours() < 5) {
    effectiveToday.setDate(effectiveToday.getDate() - 1);
  }

  // Normalise to start of effective day for date-only comparison
  effectiveToday.setHours(0, 0, 0, 0);

  await (prisma as any).revision.updateMany({
    where: {
      userId,
      revisionDate: {
        lt: effectiveToday,
      },
      status: {
        not: "completed",
      },
    },
    data: {
      status: "missed",
    },
  });
};

/**
 * CREATE REVISION (Manual)
 * POST /api/revisions
 */
export const createRevision = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { subject, units, notes, revisionDate } = req.body as CreateRevisionBody;

    // Validation
    if (!subject || !units || !Array.isArray(units) || units.length === 0 || !revisionDate) {
      return res.status(400).json({
        message: "Missing required fields: subject, units (array), revisionDate",
      });
    }

    const date = new Date(revisionDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format for revisionDate" });
    }

    const now = new Date();
    date.setHours(
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    const revision = await (prisma as any).revision.create({
      data: {
        subject,
        units,
        notes: notes || null,
        revisionDate: date,
        status: "pending",
        source: "manual",
        userId,
      },
    });

    return res.status(201).json({
      id: revision.id,
      subject: revision.subject,
      units: revision.units,
      revisionDate: revision.revisionDate,
      status: revision.status,
      source: revision.source,
      message: "Revision created successfully",
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating revision:", error);
    return res.status(500).json({ message: "Failed to create revision" });
  }
};

/**
 * GET REVISIONS BY DATE (Calendar View)
 * GET /api/revisions?date=2025-01-15
 */
export const getRevisionsByDate = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date } = req.query;

    // Update missed revisions before fetching
    await updateMissedRevisions(userId);

    if (!date || typeof date !== "string") {
      return res.status(400).json({ message: "Date query parameter is required" });
    }

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const revisions = await (prisma as any).revision.findMany({
      where: {
        userId,
        revisionDate: {
          gte: targetDate,
          lt: nextDay,
        },
      },
      select: {
        id: true,
        subject: true,
        units: true,
        notes: true,
        status: true,
        source: true,
        revisionDate: true,
        targetId: true,
      },
      orderBy: {
        revisionDate: "asc",
      },
    });

    return res.json(revisions);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching revisions by date:", error);
    return res.status(500).json({ message: "Failed to fetch revisions" });
  }
};

/**
 * UPDATE REVISION STATUS
 * PATCH /api/revisions/:id/status
 */
export const updateRevisionStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;
    const { id } = req.params as { id: string };
    const { status } = req.body as UpdateRevisionStatusBody;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate status - this endpoint is ONLY for marking as completed
    if (status !== "completed") {
      return res.status(400).json({
        message: "Invalid status. Only 'completed' is allowed for this endpoint",
      });
    }

    // Check if revision exists and belongs to user
    const revision = await (prisma as any).revision.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!revision) {
      return res.status(404).json({ message: "Revision not found or access denied" });
    }

    // Business rules:
    // - Only pending revisions can transition to completed
    // - Missed revisions are locked and cannot be updated
    if (revision.status === "missed") {
      return res
        .status(400)
        .json({ message: "Missed revisions cannot be updated. They are locked." });
    }

    if (revision.status !== "pending") {
      return res.status(400).json({
        message: "Only pending revisions can be marked as completed",
      });
    }

    // Update the revision status to completed
    const updatedRevision = await (prisma as any).revision.update({
      where: { id },
      data: {
        status: "completed",
      },
    });

    // ✅ XP awarding (non-blocking) - Check and award revision XP
    try {
      await checkAndAwardRevisionXP(userId, id);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Revision XP error:", err);
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(`Revision XP error details: ${err.message}`, err.stack);
      }
    }

    return res.json({
      message: "Revision marked as completed",
      revision: {
        id: updatedRevision.id,
        status: updatedRevision.status,
        subject: updatedRevision.subject,
        units: updatedRevision.units,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating revision status:", error);
    return res.status(500).json({ message: "Failed to update revision status" });
  }
};

