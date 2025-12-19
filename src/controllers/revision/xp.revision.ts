import prisma from "../../config/prismaconfig";
import { awardXP } from "../Focus_session/xp.utils";

/**
 * Get start of week (Monday) for a given date
 * Week = Monday (00:00:00) to Sunday (23:59:59)
 */
function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const startOfWeek = new Date(d.setDate(diff));
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

/**
 * Get week identifier string (e.g., "2025-01-13" for Monday of that week)
 * Used for unique weekly XP threshold
 * Format: YYYY-MM-DD (Monday date of the week)
 */
function getWeekIdentifier(date: Date): string {
  const startOfWeek = getStartOfWeek(date);
  const year = startOfWeek.getFullYear();
  const month = String(startOfWeek.getMonth() + 1).padStart(2, "0");
  const day = String(startOfWeek.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Create a unique chapter identifier from subject and units array
 * Sorts units to ensure consistent identification
 */
function getChapterKey(subject: string, units: string[]): string {
  const sortedUnits = [...units].sort().join("_");
  return `${subject}_${sortedUnits}`;
}

/**
 * Check if two unit arrays represent the same chapter
 * Compares sorted arrays to handle different ordering
 */
function isSameChapter(units1: string[], units2: string[]): boolean {
  if (units1.length !== units2.length) {
    return false;
  }
  const sorted1 = [...units1].sort();
  const sorted2 = [...units2].sort();
  return sorted1.every((unit, index) => unit === sorted2[index]);
}

/**
 * Check and award XP for chapter revision rounds
 * Awards XP when revision count crosses thresholds (3 or 5)
 * 
 * @param userId - User ID
 * @param subject - Revision subject
 * @param units - Revision units array
 * @param revisionDate - Date of the revision
 */
async function checkAndAwardChapterRoundsXP(
  userId: string,
  subject: string,
  units: string[],
  revisionDate: Date
): Promise<void> {
  try {
    const chapterKey = getChapterKey(subject, units);

    // Fetch all completed revisions for this user and subject
    // Filter in JavaScript to handle array comparison correctly
    const allCompletedRevisions = await (prisma as any).revision.findMany({
      where: {
        userId,
        subject,
        status: "completed",
      },
      select: {
        id: true,
        units: true,
      },
    });

    // Filter to only revisions with matching units (same chapter)
    const chapterRevisions = allCompletedRevisions.filter((r: { units: string[] }) =>
      isSameChapter(r.units, units)
    );

    const currentCount = chapterRevisions.length;

    // Calculate previous count (excluding current revision if it was just marked completed)
    // We need to check if this revision was already counted
    // For threshold crossing, we check: previous < threshold AND current >= threshold
    // Since we're counting all completed revisions including the current one,
    // previous count = currentCount - 1
    const previousCount = currentCount - 1;

    // Check 3-round threshold: Award if previous < 3 AND current >= 3
    if (previousCount < 3 && currentCount >= 3) {
      const threshold = `revision_3rounds_${chapterKey}`;
      // Use revisionDate for the award date
      const awardDate = new Date(revisionDate);
      awardDate.setHours(0, 0, 0, 0);
      
      // eslint-disable-next-line no-console
      console.log(
        `Awarding 3-round revision XP: ${20} XP for chapter ${chapterKey} to user ${userId}`
      );
      await awardXP(userId, awardDate, threshold, 20);
    }

    // Check 5-round threshold: Award if previous < 5 AND current >= 5
    if (previousCount < 5 && currentCount >= 5) {
      const threshold = `revision_5rounds_${chapterKey}`;
      // Use revisionDate for the award date
      const awardDate = new Date(revisionDate);
      awardDate.setHours(0, 0, 0, 0);
      
      // eslint-disable-next-line no-console
      console.log(
        `Awarding 5-round revision XP: ${50} XP for chapter ${chapterKey} to user ${userId}`
      );
      await awardXP(userId, awardDate, threshold, 50);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding chapter rounds XP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break revision status update
  }
}


async function checkAndAwardWeeklyCompletionXP(
  userId: string,
  createdAt: Date
): Promise<void> {
  try {
    // Use createdAt to determine the week, since "planned revisions" are defined
    // as revisions created in the week
    const startOfWeek = getStartOfWeek(createdAt);
    const weekId = getWeekIdentifier(createdAt);

    // Get all revisions planned in this week (created during the week)
    // Use start of next week (Monday 00:00:00) for cleaner date range
    const startOfNextWeek = new Date(startOfWeek);
    startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);

    const plannedRevisions = await (prisma as any).revision.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfWeek,
          lt: startOfNextWeek, // Use < instead of <= for cleaner comparison
        },
      },
      select: {
        id: true,
        status: true,
      },
    });

    const plannedCount = plannedRevisions.length;

    // Count completed revisions in this week
    const completedCount = plannedRevisions.filter(
      (r: { status: string }) => r.status === "completed"
    ).length;

    // eslint-disable-next-line no-console
    console.log(
      `Weekly XP check for user ${userId}, week ${weekId}: ` +
        `planned=${plannedCount}, completed=${completedCount}`
    );

    // Check conditions:
    // 1. At least 5 planned revisions
    // 2. All planned revisions are completed
    if (plannedCount >= 5 && completedCount === plannedCount) {
      // Check if XP was already awarded this week (threshold crossing logic)
      // We need to check if it was incomplete before this revision was completed
      const previousCompletedCount = completedCount - 1;
      const wasIncomplete = previousCompletedCount < plannedCount;

      if (wasIncomplete) {
        // Award weekly completion XP
        // Use start of week date for consistency with threshold
        const threshold = `revision_weekly_${weekId}`;
        const awardDate = new Date(startOfWeek);
        awardDate.setHours(0, 0, 0, 0);

        // eslint-disable-next-line no-console
        console.log(
          `Awarding weekly revision completion XP: ${25} XP for week ${weekId} to user ${userId}`
        );
        await awardXP(userId, awardDate, threshold, 25);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error checking and awarding weekly completion XP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break revision status update
  }
}

/**
 * Main function to check and award all revision XP
 * Called when a revision is marked as completed
 * 
 * @param userId - User ID
 * @param revisionId - ID of the revision that was just completed
 */
export async function checkAndAwardRevisionXP(
  userId: string,
  revisionId: string
): Promise<void> {
  try {
    // Fetch the revision details
    const revision = await (prisma as any).revision.findFirst({
      where: {
        id: revisionId,
        userId, // Ensure it belongs to the user
      },
      select: {
        id: true,
        subject: true,
        units: true,
        revisionDate: true,
        createdAt: true,
        status: true,
      },
    });

    if (!revision) {
      // eslint-disable-next-line no-console
      console.log(`Revision ${revisionId} not found or doesn't belong to user ${userId}`);
      return;
    }

    // Only process if status is completed
    if (revision.status !== "completed") {
      return;
    }

    // Check and award chapter rounds XP
    await checkAndAwardChapterRoundsXP(
      userId,
      revision.subject,
      revision.units,
      revision.revisionDate
    );

    // Check and award weekly completion XP
    // Use createdAt to determine the week, since planned revisions are defined
    // as revisions created in the week
    await checkAndAwardWeeklyCompletionXP(userId, revision.createdAt);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in checkAndAwardRevisionXP:", error);
    if (error instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(`Error details: ${error.message}`, error.stack);
    }
    // Don't throw - XP awarding should not break revision status update
  }
}

