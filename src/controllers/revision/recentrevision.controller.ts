import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { updateMissedRevisions } from "./revision.controller";

/**
 * GET REVISION HISTORY
 * GET /api/revisions/history?range=7|30|all
 * Default range: 7 days
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

    // Default to 7 days if range is not provided
    const rangeValue = range && typeof range === "string" ? range : "7";

    if (!["7", "30", "all"].includes(rangeValue)) {
      return res.status(400).json({
        message: "Range query parameter must be: 7, 30, or all",
      });
    }

    // Update missed revisions before fetching history
    await updateMissedRevisions(userId);

    let startDate: Date | undefined;
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    if (rangeValue === "7") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
    } else if (rangeValue === "30") {
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

