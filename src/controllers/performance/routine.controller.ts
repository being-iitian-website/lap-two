import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";

/**
 * Helper function to calculate date range based on days
 */
const getDateRange = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * GET SLEEP ROUTINE (Range-based)
 * GET /api/performance/routine/sleep?range=7|30|90
 * 
 * Query params: ?range=7|30|90 (default: 7)
 * Returns day-wise sleep duration for the last N days
 */
export const getSleepRoutine = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get range from query param (default: 7)
    const rangeParam = req.query.range as string;
    const range = rangeParam ? parseInt(rangeParam, 10) : 7;

    // Validate range
    if (![7, 30, 90].includes(range)) {
      return res.status(400).json({
        message: "Invalid range. Must be 7, 30, or 90 days",
      });
    }

    // Calculate date range (from N days ago to today)
    const startDate = getDateRange(range);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    // Get all wellness records in the date range
    const wellnessRecords = await (prisma as any).dailyWellness.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        date: true,
        sleepDurationMin: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    // Create a map of date -> sleepDurationMin for quick lookup
    const sleepMap = new Map<string, number | null>();
    wellnessRecords.forEach((record: { date: Date; sleepDurationMin: number | null }) => {
      const dateKey = record.date.toISOString().split("T")[0];
      sleepMap.set(dateKey, record.sleepDurationMin);
    });

    // Generate all days from startDate to endDate
    const data: Array<{ date: string; durationMin: number | null }> = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split("T")[0];
      const durationMin = sleepMap.get(dateKey) ?? null;

      data.push({
        date: dateKey,
        durationMin,
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return res.json({ data });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching sleep routine:", error);
    return res.status(500).json({ message: "Failed to fetch sleep routine" });
  }
};

/**
 * GET HEALTH ROUTINE (Range-based)
 * GET /api/performance/routine/health?range=7|30|90
 * 
 * Query params: ?range=7|30|90 (default: 7)
 * Returns day-wise health activity status (exercise & meditation) for the last N days
 */
export const getHealthRoutine = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get range from query param (default: 7)
    const rangeParam = req.query.range as string;
    const range = rangeParam ? parseInt(rangeParam, 10) : 7;

    // Validate range
    if (![7, 30, 90].includes(range)) {
      return res.status(400).json({
        message: "Invalid range. Must be 7, 30, or 90 days",
      });
    }

    // Calculate date range (from N days ago to today)
    const startDate = getDateRange(range);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    // Get all wellness records in the date range
    const wellnessRecords = await (prisma as any).dailyWellness.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        date: true,
        exerciseDone: true,
        meditationDone: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    // Create maps for quick lookup
    const exerciseMap = new Map<string, boolean>();
    const meditationMap = new Map<string, boolean>();
    
    wellnessRecords.forEach(
      (record: { date: Date; exerciseDone: boolean; meditationDone: boolean }) => {
        const dateKey = record.date.toISOString().split("T")[0];
        exerciseMap.set(dateKey, record.exerciseDone);
        meditationMap.set(dateKey, record.meditationDone);
      }
    );

    // Generate all days from startDate to endDate
    const data: Array<{ date: string; exercise: boolean; meditation: boolean }> = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split("T")[0];
      const exercise = exerciseMap.get(dateKey) ?? false;
      const meditation = meditationMap.get(dateKey) ?? false;

      data.push({
        date: dateKey,
        exercise,
        meditation,
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return res.json({ data });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching health routine:", error);
    return res.status(500).json({ message: "Failed to fetch health routine" });
  }
};

