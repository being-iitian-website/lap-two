import type { Response } from "express";

import prisma from "../config/prismaconfig";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";

// Enum types matching Prisma schema
type RevisionStatus = "pending" | "completed" | "missed";

interface CreateRevisionBody {
  subject: string;
  units: string[];
  notes?: string;
  revisionDate: string;
}

/**
 * Helper function to update missed revisions
 * Day boundary is 5:00 AM local time.
 *
 * Until 5:00 AM, the system still treats the previous calendar day as "today",
 * so revisions from "yesterday" are only marked as missed after 5:00 AM.
 *
 * Updates status from pending to missed if revisionDate < effectiveToday and status != completed
 */
const updateMissedRevisions = async (userId: string): Promise<void> => {
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

    // Attach the current local time to the provided date so that
    // both the chosen date and the creation time are stored.
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
 * GET REVISION ANALYTICS (Count by Subject and Unit)
 * GET /api/revisions/analytics/count
 */
export const getRevisionAnalytics = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update missed revisions before analytics
    await updateMissedRevisions(userId);

    const revisions = await (prisma as any).revision.findMany({
      where: {
        userId,
      },
      select: {
        subject: true,
        units: true,
        status: true,
      },
    });

    // Build analytics structure: { subject: { unit: { completed, pending, missed } } }
    const analytics: Record<
      string,
      Record<string, { completed: number; pending: number; missed: number }>
    > = {};

    revisions.forEach((revision: { subject: string; units: string[]; status: string }) => {
      if (!analytics[revision.subject]) {
        analytics[revision.subject] = {};
      }

      revision.units.forEach((unit: string) => {
        if (!analytics[revision.subject][unit]) {
          analytics[revision.subject][unit] = {
            completed: 0,
            pending: 0,
            missed: 0,
          };
        }

        const status = revision.status as RevisionStatus;
        if (status === "completed") {
          analytics[revision.subject][unit].completed++;
        } else if (status === "pending") {
          analytics[revision.subject][unit].pending++;
        } else if (status === "missed") {
          analytics[revision.subject][unit].missed++;
        }
      });
    });

    return res.json(analytics);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching revision analytics:", error);
    return res.status(500).json({ message: "Failed to fetch revision analytics" });
  }
};

/**
 * GET REVISION HISTORY
 * GET /api/revisions/history?range=7|30|all
 */
export const getRevisionHistory = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { range } = req.query;

    if (!range || typeof range !== "string" || !["7", "30", "all"].includes(range)) {
      return res.status(400).json({
        message: "Range query parameter is required and must be: 7, 30, or all",
      });
    }

    // Update missed revisions before fetching history
    await updateMissedRevisions(userId);

    let startDate: Date | undefined;
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    if (range === "7") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
    } else if (range === "30") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
    }

    const whereClause: {
      userId: string;
      revisionDate?: { gte?: Date; lte?: Date };
    } = {
      userId,
    };

    if (startDate) {
      whereClause.revisionDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    const revisions = await (prisma as any).revision.findMany({
      where: whereClause,
      select: {
        status: true,
      },
    });

    const completed = revisions.filter((r: { status: string }) => r.status === "completed").length;
    const pending = revisions.filter((r: { status: string }) => r.status === "pending").length;
    const missed = revisions.filter((r: { status: string }) => r.status === "missed").length;

    const response: {
      from?: string;
      to: string;
      completed: number;
      pending: number;
      missed: number;
    } = {
      to: endDate.toISOString().split("T")[0],
      completed,
      pending,
      missed,
    };

    if (startDate) {
      response.from = startDate.toISOString().split("T")[0];
    }

    return res.json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching revision history:", error);
    return res.status(500).json({ message: "Failed to fetch revision history" });
  }
};

interface UpdateRevisionStatusBody {
  status: RevisionStatus;
}

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

