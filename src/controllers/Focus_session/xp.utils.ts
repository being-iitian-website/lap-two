import prisma from "../../config/prismaconfig";


export async function awardXP(
  userId: string,
  date: Date,
  threshold: string,
  xpAmount: number
): Promise<boolean> {
  try {
    // Use transaction to ensure atomicity
    const result = await (prisma as any).$transaction(async (tx: any) => {
      // Check if XP was already awarded for this threshold today
      const existing = await tx.dailyXPAward.findUnique({
        where: {
          userId_date_threshold: {
            userId,
            date,
            threshold,
          },
        },
      });

      // If already awarded, skip
      if (existing) {
        return false;
      }

      // Create award record
      await tx.dailyXPAward.create({
        data: {
          userId,
          date,
          threshold,
          xpAmount,
        },
      });

      // Update or create UserXP record
      await tx.userXP.upsert({
        where: { userId },
        update: {
          totalXP: {
            increment: xpAmount,
          },
        },
        create: {
          userId,
          totalXP: xpAmount,
        },
      });

      return true;
    });

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error awarding XP (${threshold}):`, error);
    return false;
  }
}

/**
 * Calculate total focus time in minutes for a given date
 * 
 * @param userId - User ID
 * @param date - Date normalized to start of day
 * @returns Total focus time in minutes
 */
export async function calculateDailyFocusTime(
  userId: string,
  date: Date
): Promise<number> {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Get all focus sessions for the day
    const sessions = await (prisma as any).focusSession.findMany({
      where: {
        userId,
        startTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      select: {
        duration: true,
      },
    });

    // Sum all durations
    const totalMinutes = sessions.reduce(
      (sum: number, session: { duration: number }) => sum + session.duration,
      0
    );

    return totalMinutes;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error calculating daily focus time:", error);
    return 0;
  }
}

/**
 * Check and award XP based on focus time thresholds
 * Uses threshold-crossing logic: XP awarded only when crossing threshold for first time
 * 
 * @param userId - User ID
 * @param sessionDate - Date of the focus session (from startTime)
 * @param currentSessionId - ID of the session just created
 */
export async function checkAndAwardFocusXP(
  userId: string,
  sessionDate: Date,
  currentSessionId: string
): Promise<void> {
  try {
    // Normalize date to start of day
    const date = new Date(sessionDate);
    date.setHours(0, 0, 0, 0);

    const startOfDay = new Date(date);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    // Calculate previous total (without current session) - for threshold crossing check
    const previousSessions = await (prisma as any).focusSession.findMany({
      where: {
        userId,
        startTime: {
          gte: startOfDay,
          lt: endOfDay,
        },
        NOT: {
          id: currentSessionId,
        },
      },
      select: {
        duration: true,
      },
    });

    const previousMinutes = previousSessions.reduce(
      (sum: number, session: { duration: number }) => sum + session.duration,
      0
    );

    // Get current session duration
    const currentSession = await (prisma as any).focusSession.findUnique({
      where: { id: currentSessionId },
      select: { duration: true },
    });

    if (!currentSession) {
      return; // Session not found, skip XP calculation
    }

    const currentMinutes = previousMinutes + currentSession.duration;

    // Check 7-hour threshold (420 minutes)
    // Award if: previous < 420 AND current >= 420
    if (previousMinutes < 420 && currentMinutes >= 420) {
      await awardXP(userId, date, "focus_7h", 15);
    }

    // Check 11-hour threshold (660 minutes)
    // Award if: previous < 660 AND current >= 660
    if (previousMinutes < 660 && currentMinutes >= 660) {
      await awardXP(userId, date, "focus_11h", 30);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding focus XP:", error);
    // Don't throw - XP awarding should not break session saving
  }
}

