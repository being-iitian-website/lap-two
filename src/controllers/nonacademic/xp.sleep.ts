import prisma from "../../config/prismaconfig";
import { awardXP } from "../Focus_session/xp.utils";


function isValidSleepDuration(sleepDurationMin: number | null | undefined): boolean {
  if (!sleepDurationMin) {
    return false;
  }
  return sleepDurationMin >= 420 && sleepDurationMin <= 540;
}

/**
 * Calculate consecutive exercise streak ending on the given date
 * A valid day requires exerciseDone === true
 */
async function calculateExerciseStreak(
  userId: string,
  endDate: Date
): Promise<number> {
  try {
    let streak = 0;
    let currentDate = new Date(endDate);
    
    // Check backwards from endDate until we find a day without exercise
    while (true) {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      // Get wellness record for this day
      const wellness = await (prisma as any).dailyWellness.findFirst({
        where: {
          userId,
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        select: {
          exerciseDone: true,
        },
      });
      
      // If no record or exercise not done, break the streak
      if (!wellness || !wellness.exerciseDone) {
        break;
      }
      
      streak++;
      
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
      
      // Safety limit: don't check more than 30 days back
      if (streak >= 30) {
        break;
      }
    }
    
    return streak;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calculating exercise streak:", error);
    return 0;
  }
}

/**
 * Calculate consecutive meditation streak ending on the given date
 * A valid day requires meditationDone === true
 */
async function calculateMeditationStreak(
  userId: string,
  endDate: Date
): Promise<number> {
  try {
    let streak = 0;
    let currentDate = new Date(endDate);
    
    // Check backwards from endDate until we find a day without meditation
    while (true) {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      // Get wellness record for this day
      const wellness = await (prisma as any).dailyWellness.findFirst({
        where: {
          userId,
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        select: {
          meditationDone: true,
        },
      });
      
      // If no record or meditation not done, break the streak
      if (!wellness || !wellness.meditationDone) {
        break;
      }
      
      streak++;
      
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
      
      // Safety limit: don't check more than 30 days back
      if (streak >= 30) {
        break;
      }
    }
    
    return streak;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calculating meditation streak:", error);
    return 0;
  }
}


async function calculateSleepStreak(
  userId: string,
  endDate: Date
): Promise<number> {
  try {
    let streak = 0;
    let currentDate = new Date(endDate);
    
    // Check backwards from endDate until we find a day without valid sleep
    while (true) {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      // Get wellness record for this day
      const wellness = await (prisma as any).dailyWellness.findFirst({
        where: {
          userId,
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        select: {
          sleepDurationMin: true,
        },
      });
      
      // If no record or invalid sleep, break the streak
      if (!wellness || !isValidSleepDuration(wellness.sleepDurationMin)) {
        break;
      }
      
      streak++;
      
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
      
      // Safety limit: don't check more than 30 days back
      if (streak >= 30) {
        break;
      }
    }
    
    return streak;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calculating sleep streak:", error);
    return 0;
  }
}


export async function checkAndAwardSleepXP(
  userId: string,
  date: Date
): Promise<void> {
  try {
    // Normalize date to start of day (same as how it's stored)
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    // Get today's sleep record to verify it has valid sleep
    // Use exact date match first, then fallback to range if needed
    const todayWellness = await (prisma as any).dailyWellness.findFirst({
      where: {
        userId,
        date: normalizedDate,
      },
      select: {
        sleepDurationMin: true,
      },
    });
    
    // If exact match fails, try date range query (for timezone edge cases)
    const wellness = todayWellness || await (prisma as any).dailyWellness.findFirst({
      where: {
        userId,
        date: {
          gte: normalizedDate,
          lt: new Date(normalizedDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      select: {
        sleepDurationMin: true,
      },
    });
    
    
    if (!wellness || !isValidSleepDuration(wellness.sleepDurationMin)) {
      // eslint-disable-next-line no-console
      console.log(`No valid sleep found for user ${userId} on ${normalizedDate.toISOString()}, skipping XP check`);
      return;
    }
    
    // Calculate current streak
    const currentStreak = await calculateSleepStreak(userId, normalizedDate);
    
    // eslint-disable-next-line no-console
    console.log(`Sleep streak for user ${userId} on ${normalizedDate.toISOString()}: ${currentStreak} days`);
    
    
    const previousStreak = currentStreak > 0 ? currentStreak - 1 : 0;
    
    
    if (previousStreak < 7 && currentStreak >= 7) {
      // eslint-disable-next-line no-console
      console.log(`Awarding 7-day sleep streak XP to user ${userId}`);
      await awardXP(userId, normalizedDate, "sleep_7day", 25);
    }
    
   
    if (previousStreak < 21 && currentStreak >= 21) {
      // eslint-disable-next-line no-console
      console.log(`Awarding 21-day sleep streak XP to user ${userId}`);
      await awardXP(userId, normalizedDate, "sleep_21day", 100);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding sleep XP:", error);
    // Log more details for debugging
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break sleep data saving
  }
}

/**
 * Check and award XP based on exercise completion
 * Awards daily XP (+10) and streak XP (+25 for 5-day streak)
 */
export async function checkAndAwardExerciseXP(
  userId: string,
  date: Date
): Promise<void> {
  try {
    // Normalize date to start of day
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    // Get today's wellness record
    const wellness = await (prisma as any).dailyWellness.findFirst({
      where: {
        userId,
        date: normalizedDate,
      },
      select: {
        exerciseDone: true,
      },
    });
    
    // If exercise not done today, skip
    if (!wellness || !wellness.exerciseDone) {
      return;
    }
    
    // Award daily exercise XP (+10) - only once per day
    await awardXP(userId, normalizedDate, "exercise_daily", 10);
    
    // Calculate current exercise streak
    const currentStreak = await calculateExerciseStreak(userId, normalizedDate);
    
    // eslint-disable-next-line no-console
    console.log(`Exercise streak for user ${userId} on ${normalizedDate.toISOString()}: ${currentStreak} days`);
    
    // Calculate previous streak (for threshold crossing)
    const previousStreak = currentStreak > 0 ? currentStreak - 1 : 0;
    
    // Check 5-day exercise streak threshold
    // Award if: previous < 5 AND current >= 5
    if (previousStreak < 5 && currentStreak >= 5) {
      // eslint-disable-next-line no-console
      console.log(`Awarding 5-day exercise streak XP to user ${userId}`);
      await awardXP(userId, normalizedDate, "exercise_5day", 25);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding exercise XP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break activity data saving
  }
}

/**
 * Check and award XP based on meditation completion
 * Awards daily XP (+10) and streak XP (+25 for 5-day streak)
 */
export async function checkAndAwardMeditationXP(
  userId: string,
  date: Date
): Promise<void> {
  try {
    // Normalize date to start of day
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    // Get today's wellness record
    const wellness = await (prisma as any).dailyWellness.findFirst({
      where: {
        userId,
        date: normalizedDate,
      },
      select: {
        meditationDone: true,
      },
    });
    
    // If meditation not done today, skip
    if (!wellness || !wellness.meditationDone) {
      return;
    }
    
    // Award daily meditation XP (+10) - only once per day
    await awardXP(userId, normalizedDate, "meditation_daily", 10);
    
    // Calculate current meditation streak
    const currentStreak = await calculateMeditationStreak(userId, normalizedDate);
    
    // eslint-disable-next-line no-console
    console.log(`Meditation streak for user ${userId} on ${normalizedDate.toISOString()}: ${currentStreak} days`);
    
    // Calculate previous streak (for threshold crossing)
    const previousStreak = currentStreak > 0 ? currentStreak - 1 : 0;
    
    // Check 5-day meditation streak threshold
    // Award if: previous < 5 AND current >= 5
    if (previousStreak < 5 && currentStreak >= 5) {
      // eslint-disable-next-line no-console
      console.log(`Awarding 5-day meditation streak XP to user ${userId}`);
      await awardXP(userId, normalizedDate, "meditation_5day", 25);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding meditation XP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break activity data saving
  }
}

