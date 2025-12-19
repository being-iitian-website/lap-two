import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { checkAndAwardFocusXP } from "./xp.utils";

interface SaveFocusSessionBody {
  notes?: string;
  startTime: string;
  endTime: string;
}

/**
 * SAVE FOCUS SESSION
 * POST /api/focus
 */
export const saveFocusSession = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { notes, startTime, endTime } = req.body as SaveFocusSessionBody;

    if (!startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "startTime and endTime are required" });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid date format for startTime or endTime" });
    }

    if (end <= start) {
      return res
        .status(400)
        .json({ message: "endTime must be after startTime" });
    }

    // Duration in minutes
    const durationMs = end.getTime() - start.getTime();
    const durationMinutes = Math.round(durationMs / (1000 * 60));

    // Create focus session
    const session = await (prisma as any).focusSession.create({
      data: {
        notes: notes || null,
        startTime: start,
        endTime: end,
        duration: durationMinutes,
        userId,
      },
    });

    // Calculate and award XP based on daily focus time thresholds
    // Await to ensure it completes in serverless environment (Vercel)
    // Errors are caught so they don't break the session save
    try {
      await checkAndAwardFocusXP(userId, start, session.id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error awarding XP (non-blocking):", error);
      // Continue - don't fail the request if XP awarding fails
    }

    return res.json({ message: "Focus session saved successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving focus session:", error);
    return res
      .status(500)
      .json({ message: "Failed to save focus session" });
  }
};

/**
 * GET RECENT FOCUS SESSIONS
 * GET /api/focus/recent?limit=5
 */
export const getRecentFocusSessions = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { limit } = req.query;

    let take = 5;
    if (typeof limit === "string") {
      const parsed = Number.parseInt(limit, 10);
      if (!Number.isNaN(parsed) && parsed > 0 && parsed <= 50) {
        take = parsed;
      }
    }

    const sessions = await (prisma as any).focusSession.findMany({
      where: {
        userId,
      },
      select: {
        notes: true,
        duration: true,
        startTime: true,
        endTime: true,
      },
      orderBy: {
        startTime: "desc",
      },
      take,
    });

    // Shape response to match requirements (notes + duration)
    const response = sessions.map(
      (s: { notes: string | null; duration: number }) => ({
        notes: s.notes,
        duration: s.duration,
      })
    );

    return res.json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching recent focus sessions:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch recent focus sessions" });
  }
};


