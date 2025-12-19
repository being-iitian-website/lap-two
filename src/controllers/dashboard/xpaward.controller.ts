import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";

/**
 * GET DAILY XP AWARDS BY DATE
 * GET /api/dashboard/xp/daily?date=2025-01-16
 */
export const getDailyXPAwardsByDate = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date } = req.query;

    // Validate date parameter
    if (!date || typeof date !== "string") {
      return res.status(400).json({ message: "Date query parameter is required" });
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)",
      });
    }

    // Parse and normalize date to start of day
    const [year, month, day] = date.split("-").map(Number);
    const targetDate = new Date(year, month - 1, day, 0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Get all daily XP awards for this user on this date
    const awards = await (prisma as any).dailyXPAward.findMany({
      where: {
        userId,
        date: {
          gte: targetDate,
          lt: nextDay,
        },
      },
      select: {
        id: true,
        threshold: true,
        xpAmount: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Calculate total XP for the day
    const totalXPForDay = awards.reduce(
      (sum: number, award: { xpAmount: number }) => sum + award.xpAmount,
      0
    );

    return res.json({
      date,
      awards: awards.map((award: { threshold: string; xpAmount: number; createdAt: Date }) => ({
        threshold: award.threshold,
        xpAmount: award.xpAmount,
        awardedAt: award.createdAt,
      })),
      totalXPForDay,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching daily XP awards:", error);
    return res.status(500).json({ message: "Failed to fetch daily XP awards" });
  }
};

/**
 * GET TOTAL XP FOR USER
 * GET /api/dashboard/xp/total
 */
export const getTotalXP = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get user's total XP record
    const userXP = await (prisma as any).userXP.findUnique({
      where: {
        userId,
      },
      select: {
        totalXP: true,
        updatedAt: true,
      },
    });

    // If no record exists, return 0 (user hasn't earned any XP yet)
    const totalXP = userXP?.totalXP || 0;

    return res.json({
      userId,
      totalXP,
      lastUpdated: userXP?.updatedAt || null,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching total XP:", error);
    return res.status(500).json({ message: "Failed to fetch total XP" });
  }
};

