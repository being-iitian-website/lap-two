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

