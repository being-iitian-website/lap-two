import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";

/**
 * CALCULATE EFFICIENCY FOR A SPECIFIC DAY
 * Helper function to calculate and store daily efficiency
 */
export const calculateDailyEfficiency = async (
  userId: string,
  date: Date
): Promise<{
  overallEfficiency: number;
  completionRate: number;
  timeEfficiency: number;
  totalTargets: number;
  completedTargets: number;
  missedTargets: number;
  pendingTargets: number;
} | null> => {
  try {
    // Normalize date to start of day
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Fetch all targets for the given date
    const targets = await prisma.target.findMany({
      where: {
        userId,
        startTime: {
          gte: targetDate,
          lt: nextDay,
        },
      },
      select: {
        status: true,
        plannedHours: true,
        actualHours: true,
      },
    });

    // If no targets for the day, return null (no data to calculate)
    if (targets.length === 0) {
      return null;
    }

    // Count targets by status
    const totalTargets = targets.length;
    const completedTargets = targets.filter((t) => t.status === "completed").length;
    const missedTargets = targets.filter((t) => t.status === "missed").length;
    const pendingTargets = targets.filter((t) => t.status === "pending").length;

    // Calculate completion rate
    const completionRate = (completedTargets / totalTargets) * 100;

    // Calculate time efficiency (only for completed targets with planned hours)
    const completedWithHours = targets.filter(
      (t) =>
        t.status === "completed" &&
        t.plannedHours &&
        t.plannedHours > 0 &&
        t.actualHours !== null &&
        t.actualHours !== undefined
    );

    let timeEfficiency = 0;
    if (completedWithHours.length > 0) {
      const efficiencies = completedWithHours.map((t) => {
        const planned = t.plannedHours || 1;
        const actual = t.actualHours || 0;
        // Cap at 100% to avoid over-efficiency skewing results
        return Math.min((actual / planned) * 100, 100);
      });

      timeEfficiency =
        efficiencies.reduce((sum, eff) => sum + eff, 0) / efficiencies.length;
    } else {
      // If no time-based targets, use completion rate as time efficiency
      timeEfficiency = completionRate;
    }

    // Calculate overall efficiency (60% completion, 40% time)
    const overallEfficiency = completionRate * 0.6 + timeEfficiency * 0.4;

    // Upsert efficiency record
    await prisma.dailyEfficiency.upsert({
      where: {
        userId_date: {
          userId,
          date: targetDate,
        },
      },
      update: {
        totalTargets,
        completedTargets,
        missedTargets,
        pendingTargets,
        completionRate,
        timeEfficiency,
        overallEfficiency,
        updatedAt: new Date(),
      },
      create: {
        userId,
        date: targetDate,
        totalTargets,
        completedTargets,
        missedTargets,
        pendingTargets,
        completionRate,
        timeEfficiency,
        overallEfficiency,
      },
    });

    return {
      overallEfficiency,
      completionRate,
      timeEfficiency,
      totalTargets,
      completedTargets,
      missedTargets,
      pendingTargets,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calculating daily efficiency:", error);
    return null;
  }
};

/**
 * GET TODAY'S EFFICIENCY
 * GET /api/dashboard/efficiency/today
 */
export const getTodayEfficiency = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate or recalculate today's efficiency
    const efficiency = await calculateDailyEfficiency(userId, today);

    if (!efficiency) {
      return res.json({
        date: today.toISOString().split("T")[0],
        message: "No targets found for today",
        efficiency: null,
      });
    }

    return res.json({
      date: today.toISOString().split("T")[0],
      overallEfficiency: Math.round(efficiency.overallEfficiency * 10) / 10,
      completionRate: Math.round(efficiency.completionRate * 10) / 10,
      timeEfficiency: Math.round(efficiency.timeEfficiency * 10) / 10,
      totalTargets: efficiency.totalTargets,
      completedTargets: efficiency.completedTargets,
      missedTargets: efficiency.missedTargets,
      pendingTargets: efficiency.pendingTargets,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching today's efficiency:", error);
    return res.status(500).json({ message: "Failed to fetch today's efficiency" });
  }
};

/**
 * GET 7-DAY AVERAGE EFFICIENCY
 * GET /api/dashboard/efficiency/week
 */
export const getWeekEfficiency = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get date range for last 7 days (including today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    // Fetch efficiency records for the last 7 days
    const efficiencyRecords = await prisma.dailyEfficiency.findMany({
      where: {
        userId,
        date: {
          gte: sevenDaysAgo,
          lte: today,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // If no records exist, calculate them
    if (efficiencyRecords.length === 0) {
      // Calculate efficiency for each of the last 7 days
      const calculations = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (6 - i));
        calculations.push(calculateDailyEfficiency(userId, date));
      }

      await Promise.all(calculations);

      // Re-fetch after calculations
      const newRecords = await prisma.dailyEfficiency.findMany({
        where: {
          userId,
          date: {
            gte: sevenDaysAgo,
            lte: today,
          },
        },
        orderBy: {
          date: "asc",
        },
      });

      if (newRecords.length === 0) {
        return res.json({
          message: "No efficiency data available for the past 7 days",
          weeklyAverage: null,
          dailyBreakdown: [],
        });
      }

      return buildWeekResponse(res, newRecords);
    }

    return buildWeekResponse(res, efficiencyRecords);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching week efficiency:", error);
    return res.status(500).json({ message: "Failed to fetch week efficiency" });
  }
};

/**
 * Helper function to build week efficiency response
 */
const buildWeekResponse = (res: Response, records: any[]): Response => {
  // Calculate averages
  const avgOverallEfficiency =
    records.reduce((sum, r) => sum + r.overallEfficiency, 0) / records.length;
  const avgCompletionRate =
    records.reduce((sum, r) => sum + r.completionRate, 0) / records.length;
  const avgTimeEfficiency =
    records.reduce((sum, r) => sum + r.timeEfficiency, 0) / records.length;

  // Calculate total targets across the week
  const totalTargets = records.reduce((sum, r) => sum + r.totalTargets, 0);
  const totalCompleted = records.reduce((sum, r) => sum + r.completedTargets, 0);
  const totalMissed = records.reduce((sum, r) => sum + r.missedTargets, 0);

  // Build daily breakdown
  const dailyBreakdown = records.map((record) => ({
    date: record.date.toISOString().split("T")[0],
    overallEfficiency: Math.round(record.overallEfficiency * 10) / 10,
    completionRate: Math.round(record.completionRate * 10) / 10,
    timeEfficiency: Math.round(record.timeEfficiency * 10) / 10,
    totalTargets: record.totalTargets,
    completedTargets: record.completedTargets,
    missedTargets: record.missedTargets,
  }));

  return res.json({
    weeklyAverage: {
      overallEfficiency: Math.round(avgOverallEfficiency * 10) / 10,
      completionRate: Math.round(avgCompletionRate * 10) / 10,
      timeEfficiency: Math.round(avgTimeEfficiency * 10) / 10,
      totalTargets,
      totalCompleted,
      totalMissed,
      daysTracked: records.length,
    },
    dailyBreakdown,
  });
};

/**
 * GET EFFICIENCY HISTORY FOR DATE RANGE
 * GET /api/dashboard/efficiency/history?startDate=2025-12-01&endDate=2025-12-27
 */
export const getEfficiencyHistory = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { startDate, endDate } = req.query;

    // Validate date parameters
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: "Both startDate and endDate query parameters are required",
      });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate as string) || !dateRegex.test(endDate as string)) {
      return res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-12-01)",
      });
    }

    // Parse dates
    const start = new Date(startDate as string);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate as string);
    end.setHours(23, 59, 59, 999);

    if (start > end) {
      return res.status(400).json({
        message: "startDate must be before or equal to endDate",
      });
    }

    // Fetch efficiency records for date range
    const efficiencyRecords = await prisma.dailyEfficiency.findMany({
      where: {
        userId,
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    // Format response
    const history = efficiencyRecords.map((record) => ({
      date: record.date.toISOString().split("T")[0],
      overallEfficiency: Math.round(record.overallEfficiency * 10) / 10,
      completionRate: Math.round(record.completionRate * 10) / 10,
      timeEfficiency: Math.round(record.timeEfficiency * 10) / 10,
      totalTargets: record.totalTargets,
      completedTargets: record.completedTargets,
      missedTargets: record.missedTargets,
      pendingTargets: record.pendingTargets,
    }));

    return res.json({
      startDate: startDate as string,
      endDate: endDate as string,
      recordsFound: history.length,
      history,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching efficiency history:", error);
    return res.status(500).json({ message: "Failed to fetch efficiency history" });
  }
};

/**
 * RECALCULATE EFFICIENCY FOR A SPECIFIC DATE
 * POST /api/dashboard/efficiency/recalculate
 * Body: { date: "2025-12-27" }
 */
export const recalculateEfficiency = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date } = req.body;

    if (!date || typeof date !== "string") {
      return res.status(400).json({
        message: "Date is required in request body (format: YYYY-MM-DD)",
      });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-12-27)",
      });
    }

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    // Recalculate efficiency
    const efficiency = await calculateDailyEfficiency(userId, targetDate);

    if (!efficiency) {
      return res.json({
        message: "No targets found for the specified date",
        date,
        efficiency: null,
      });
    }

    return res.json({
      message: "Efficiency recalculated successfully",
      date,
      efficiency: {
        overallEfficiency: Math.round(efficiency.overallEfficiency * 10) / 10,
        completionRate: Math.round(efficiency.completionRate * 10) / 10,
        timeEfficiency: Math.round(efficiency.timeEfficiency * 10) / 10,
        totalTargets: efficiency.totalTargets,
        completedTargets: efficiency.completedTargets,
        missedTargets: efficiency.missedTargets,
        pendingTargets: efficiency.pendingTargets,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error recalculating efficiency:", error);
    return res.status(500).json({ message: "Failed to recalculate efficiency" });
  }
};
