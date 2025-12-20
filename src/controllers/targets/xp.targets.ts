import { TargetType } from "@prisma/client";

import prisma from "../../config/prismaconfig";
import { awardXP } from "../Focus_session/xp.utils";


export async function checkAndAwardDailyResponseXP(
  userId: string,
  date: Date,
  question1: string,
  answer1: string,
  question2?: string | null,
  answer2?: string | null
): Promise<void> {
  try {
    // Normalize date to start of day
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Check if both questions are answered
    // question1 and answer1 are required, question2 and answer2 are optional
    // Award XP only if BOTH question2 AND answer2 are provided
    if (question1 && answer1 && question2 && answer2) {
      // Check if 2-questions XP was already awarded today to avoid duplicate attempts
      const existingAward = await (prisma as any).dailyXPAward.findUnique({
        where: {
          userId_date_threshold: {
            userId,
            date: normalizedDate,
            threshold: "target_2questions",
          },
        },
      });

      if (!existingAward) {
        // eslint-disable-next-line no-console
        console.log(
          `Awarding daily response XP (2 questions): ${10} XP to user ${userId} on ${normalizedDate.toISOString()}`
        );
        await awardXP(userId, normalizedDate, "target_2questions", 10);
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `Daily response XP (2 questions) already awarded for user ${userId} on ${normalizedDate.toISOString()}`
        );
      }
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `Daily response XP not awarded: only ${question1 && answer1 ? '1' : '0'} question(s) answered (need 2 questions for +10 XP)`
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding daily response XP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break response submission
  }
}

/**
 * Calculate consecutive target completion streak ending on the given date
 * A valid day requires:
 * 1. Challenge target created on that day (createdAt matches day)
 * 2. At least one target completed on that day (status="completed", updatedAt matches day)
 */
async function calculateTargetCompletionStreak(
  userId: string,
  endDate: Date
): Promise<number> {
  try {
    let streak = 0;
    let currentDate = new Date(endDate);
    
    // Normalize endDate to start of day for consistent comparison
    currentDate.setHours(0, 0, 0, 0);
    
    // Check backwards from endDate until we find a day that doesn't meet requirements
    while (true) {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      // Check 1: Challenge target created on this day
      const challengeCreated = await (prisma as any).target.findFirst({
        where: {
          userId,
          type: TargetType.challenge,
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        select: {
          id: true,
        },
      });
      
      // Check 2: At least one target completed on this day
      const targetCompleted = await (prisma as any).target.findFirst({
        where: {
          userId,
          status: "completed",
          updatedAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        select: {
          id: true,
        },
      });
      
      // Both conditions must be met for the day to count
      if (!challengeCreated || !targetCompleted) {
        // eslint-disable-next-line no-console
        console.log(
          `Target completion streak broken at ${startOfDay.toISOString()}: ` +
            `challengeCreated=${!!challengeCreated}, targetCompleted=${!!targetCompleted}`
        );
        break;
      }
      
      streak++;
      
      // Move to previous day
      currentDate.setDate(currentDate.getDate() - 1);
      
      // Safety limit: don't check more than 90 days back
      if (streak >= 90) {
        break;
      }
    }
    
    return streak;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calculating target completion streak:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    return 0;
  }
}

/**
 * Check and award XP for target completion streaks
 * Awards +30 XP every 7 days (7, 14, 21, 28, etc.)
 * Awards +150 XP every 30 days (30, 60, 90, etc.)
 * 
 * Requirements for each day in streak:
 * - Challenge target created on that day (createdAt matches day)
 * - At least one target completed on that day (status="completed", updatedAt matches day)
 * 
 * @param userId - User ID
 * @param date - Date to check streak for (usually today)
 */
export async function checkAndAwardTargetStreakXP(
  userId: string,
  date: Date
): Promise<void> {
  try {
    // Normalize date to start of day
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    // Calculate current streak (includes today)
    const currentStreak = await calculateTargetCompletionStreak(userId, normalizedDate);
    
    // eslint-disable-next-line no-console
    console.log(
      `Target completion streak for user ${userId} on ${normalizedDate.toISOString()}: ${currentStreak} days`
    );
    
    // Calculate previous streak (before today was added)
    // If current streak is N, previous was N-1 (assuming today is valid)
    const previousStreak = currentStreak > 0 ? currentStreak - 1 : 0;
    
    // eslint-disable-next-line no-console
    console.log(
      `Target streak XP threshold check: previous=${previousStreak}, current=${currentStreak}`
    );
    
    // Check 7-day target completion streak threshold
    // Award if: current streak is divisible by 7 AND previous streak was not divisible by 7
    // This awards XP at 7, 14, 21, 28, 35, etc. days
    if (currentStreak % 7 === 0 && previousStreak % 7 !== 0) {
      // Check if 7-day streak XP was already awarded today to avoid duplicate attempts
      const existing7DayAward = await (prisma as any).dailyXPAward.findUnique({
        where: {
          userId_date_threshold: {
            userId,
            date: normalizedDate,
            threshold: "target_7day",
          },
        },
      });

      if (!existing7DayAward) {
        // eslint-disable-next-line no-console
        console.log(
          `Awarding 7-day target completion streak XP: ${30} XP to user ${userId} (streak: ${currentStreak} days)`
        );
        await awardXP(userId, normalizedDate, "target_7day", 30);
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `7-day target completion streak XP already awarded for user ${userId} on ${normalizedDate.toISOString()}`
        );
      }
    }
    
    // Check 30-day target completion streak threshold
    // Award if: current streak is divisible by 30 AND previous streak was not divisible by 30
    // This awards XP at 30, 60, 90, etc. days
    if (currentStreak % 30 === 0 && previousStreak % 30 !== 0) {
      // Check if 30-day streak XP was already awarded today to avoid duplicate attempts
      const existing30DayAward = await (prisma as any).dailyXPAward.findUnique({
        where: {
          userId_date_threshold: {
            userId,
            date: normalizedDate,
            threshold: "target_30day",
          },
        },
      });

      if (!existing30DayAward) {
        // eslint-disable-next-line no-console
        console.log(
          `Awarding 30-day target completion streak XP: ${150} XP to user ${userId} (streak: ${currentStreak} days)`
        );
        await awardXP(userId, normalizedDate, "target_30day", 150);
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `30-day target completion streak XP already awarded for user ${userId} on ${normalizedDate.toISOString()}`
        );
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding target streak XP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break target status update
  }
}
