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

