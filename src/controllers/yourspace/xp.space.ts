import prisma from "../../config/prismaconfig";
import { awardXP } from "../Focus_session/xp.utils";

/**
 * Calculate word count from a text string
 * Words are separated by whitespace
 */
function calculateWordCount(text: string): number {
  if (!text || typeof text !== "string") {
    return 0;
  }
  
  // Trim and split by whitespace, filter out empty strings
  const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
  return words.length;
}

/**
 * Calculate consecutive journaling streak ending on the given date
 * A valid day requires at least one journal entry
 */
async function calculateJournalStreak(
  userId: string,
  endDate: Date
): Promise<number> {
  try {
    let streak = 0;
    let currentDate = new Date(endDate);
    
    // Normalize endDate to start of day for consistent comparison
    currentDate.setHours(0, 0, 0, 0);
    
    // Check backwards from endDate until we find a day without journal entry
    while (true) {
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      
      // Get journal entries for this day
      const journals = await (prisma as any).journal.findMany({
        where: {
          userId,
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
        select: {
          id: true,
        },
        take: 1, // We only need to know if at least one exists
      });
      
      // If no journal entry for this day, break the streak
      if (!journals || journals.length === 0) {
        // eslint-disable-next-line no-console
        console.log(
          `Journal streak broken at ${startOfDay.toISOString()}: no journal entry`
        );
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
    console.error("Error calculating journal streak:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    return 0;
  }
}

/**
 * Check and award XP for journal writing
 * Awards +5 XP when a journal entry has more than 50 words
 * Only awards once per day per user
 * 
 * @param userId - User ID
 * @param journalId - ID of the journal entry that was just saved
 * @param date - Date of the journal entry
 */
export async function checkAndAwardJournalXP(
  userId: string,
  journalId: string,
  date: Date
): Promise<void> {
  try {
    // Normalize date to start of day
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Fetch the journal entry to get the notes
    const journal = await (prisma as any).journal.findFirst({
      where: {
        id: journalId,
        userId, // Ensure it belongs to the user
      },
      select: {
        id: true,
        notes: true,
        date: true,
      },
    });

    if (!journal) {
      // eslint-disable-next-line no-console
      console.log(
        `Journal ${journalId} not found or doesn't belong to user ${userId}`
      );
      return;
    }

    // Calculate word count from notes
    const wordCount = calculateWordCount(journal.notes);

    // eslint-disable-next-line no-console
    console.log(
      `Journal XP check for user ${userId} on ${normalizedDate.toISOString()}: ` +
        `wordCount=${wordCount}`
    );

    // Check if journal has more than 50 words
    if (wordCount > 50) {
      // Award journal writing XP (+5) - only once per day
      const threshold = "journal_50words";
      
      // eslint-disable-next-line no-console
      console.log(
        `Awarding journal writing XP: ${5} XP to user ${userId} ` +
          `(wordCount: ${wordCount})`
      );
      
      await awardXP(userId, normalizedDate, threshold, 5);
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `Journal XP not awarded: wordCount=${wordCount} (need >50 words)`
      );
    }

    // Calculate current journaling streak (includes today)
    const currentStreak = await calculateJournalStreak(userId, normalizedDate);
    
    // eslint-disable-next-line no-console
    console.log(
      `Journal streak for user ${userId} on ${normalizedDate.toISOString()}: ${currentStreak} days`
    );
    
    // Calculate previous streak (before today was added)
    // If current streak is N, previous was N-1 (assuming today has journal entry)
    const previousStreak = currentStreak > 0 ? currentStreak - 1 : 0;
    
    // eslint-disable-next-line no-console
    console.log(
      `Journal streak XP threshold check: previous=${previousStreak}, current=${currentStreak}`
    );
    
    // Check 7-day journaling streak threshold
    // Award if: previous < 7 AND current >= 7
    if (previousStreak < 7 && currentStreak >= 7) {
      // eslint-disable-next-line no-console
      console.log(`Awarding 7-day journaling streak XP: ${50} XP to user ${userId}`);
      await awardXP(userId, normalizedDate, "journal_7day", 50);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding journal XP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break journal saving
  }
}

