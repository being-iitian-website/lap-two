import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";

interface SleepTrackingBody {
  date: string;
  sleptAt: string;
  actualSleepTime: string;
  actualWakeTime: string;
}

interface ActivityTrackingBody {
  date: string;
  exerciseDone: boolean;
  meditationDone: boolean;
}

interface WaterIntakeBody {
  date: string;
  waterIntakeMl: number;
}

/**
 * SLEEP TRACKING API
 * POST /api/wellness/sleep
 */
export const trackSleep = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date, sleptAt, actualSleepTime, actualWakeTime } = req.body as SleepTrackingBody;

    // Validate required fields
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)",
      });
    }

    // Parse and validate date
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }
    targetDate.setHours(0, 0, 0, 0);

    // Parse and validate sleep times
    let parsedSleptAt: Date | null = null;
    let parsedActualSleepTime: Date | null = null;
    let parsedActualWakeTime: Date | null = null;

    if (sleptAt) {
      parsedSleptAt = new Date(sleptAt);
      if (isNaN(parsedSleptAt.getTime())) {
        return res.status(400).json({ message: "Invalid date format for sleptAt" });
      }
    }

    if (actualSleepTime) {
      parsedActualSleepTime = new Date(actualSleepTime);
      if (isNaN(parsedActualSleepTime.getTime())) {
        return res.status(400).json({ message: "Invalid date format for actualSleepTime" });
      }
    }

    if (actualWakeTime) {
      parsedActualWakeTime = new Date(actualWakeTime);
      if (isNaN(parsedActualWakeTime.getTime())) {
        return res.status(400).json({ message: "Invalid date format for actualWakeTime" });
      }
    }

    // Upsert wellness record - only update sleep fields
    const existing = await (prisma as any).dailyWellness.findFirst({
      where: {
        userId,
        date: targetDate,
      },
    });

    if (existing) {
      await (prisma as any).dailyWellness.update({
        where: { id: existing.id },
        data: {
          sleptAt: parsedSleptAt,
          actualSleepTime: parsedActualSleepTime,
          actualWakeTime: parsedActualWakeTime,
        },
      });
    } else {
      await (prisma as any).dailyWellness.create({
        data: {
          userId,
          date: targetDate,
          sleptAt: parsedSleptAt,
          actualSleepTime: parsedActualSleepTime,
          actualWakeTime: parsedActualWakeTime,
          exerciseDone: false,
          meditationDone: false,
        },
      });
    }

    return res.json({ message: "Sleep data saved successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving sleep data:", error);
    return res.status(500).json({ message: "Failed to save sleep data" });
  }
};

/**
 * EXERCISE & MEDITATION TRACKING API
 * POST /api/wellness/activity
 */
export const trackActivity = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date, exerciseDone, meditationDone } = req.body as ActivityTrackingBody;

    // Validate required fields
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    if (exerciseDone === undefined && meditationDone === undefined) {
      return res.status(400).json({
        message: "At least one of exerciseDone or meditationDone must be provided",
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)",
      });
    }

    // Parse and validate date
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }
    targetDate.setHours(0, 0, 0, 0);

    // Validate boolean values
    if (exerciseDone !== undefined && typeof exerciseDone !== "boolean") {
      return res.status(400).json({ message: "exerciseDone must be a boolean" });
    }

    if (meditationDone !== undefined && typeof meditationDone !== "boolean") {
      return res.status(400).json({ message: "meditationDone must be a boolean" });
    }

    // Prepare update data - only include fields that are provided
    const updateData: any = {};
    if (exerciseDone !== undefined) {
      updateData.exerciseDone = exerciseDone;
    }
    if (meditationDone !== undefined) {
      updateData.meditationDone = meditationDone;
    }

    // Upsert wellness record - only update activity fields
    const existing = await (prisma as any).dailyWellness.findFirst({
      where: {
        userId,
        date: targetDate,
      },
    });

    if (existing) {
      await (prisma as any).dailyWellness.update({
        where: { id: existing.id },
        data: updateData,
      });
    } else {
      await (prisma as any).dailyWellness.create({
        data: {
          userId,
          date: targetDate,
          exerciseDone: exerciseDone ?? false,
          meditationDone: meditationDone ?? false,
        },
      });
    }

    return res.json({ message: "Activity data saved successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving activity data:", error);
    return res.status(500).json({ message: "Failed to save activity data" });
  }
};

/**
 * WATER INTAKE TRACKING API
 * POST /api/wellness/water
 */
export const trackWaterIntake = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date, waterIntakeMl } = req.body as WaterIntakeBody;

    // Validate required fields
    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    if (waterIntakeMl === undefined || waterIntakeMl === null) {
      return res.status(400).json({ message: "waterIntakeMl is required" });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)",
      });
    }

    // Parse and validate date
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }
    targetDate.setHours(0, 0, 0, 0);

    // Validate water intake value
    if (typeof waterIntakeMl !== "number" || waterIntakeMl < 0) {
      return res.status(400).json({
        message: "waterIntakeMl must be a non-negative number",
      });
    }

    // Upsert wellness record - only update water intake
    const existing = await (prisma as any).dailyWellness.findFirst({
      where: {
        userId,
        date: targetDate,
      },
    });

    if (existing) {
      await (prisma as any).dailyWellness.update({
        where: { id: existing.id },
        data: {
          waterIntakeMl,
        },
      });
    } else {
      await (prisma as any).dailyWellness.create({
        data: {
          userId,
          date: targetDate,
          waterIntakeMl,
          exerciseDone: false,
          meditationDone: false,
        },
      });
    }

    return res.json({ message: "Water intake data saved successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving water intake data:", error);
    return res.status(500).json({ message: "Failed to save water intake data" });
  }
};

