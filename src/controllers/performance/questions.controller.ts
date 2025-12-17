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
 * GET TOTAL QUESTIONS
 * GET /api/performance/questions/total
 * 
 * Query params: ?range=7|30|90 (default: 7)
 */
export const getTotalQuestions = async (
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

    // Calculate date range
    const startDate = getDateRange(range);

    // Fetch targets with questions in the date range (only completed targets)
    const targets = await (prisma as any).target.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
        },
        status: "completed", // Only count completed targets
        questions: {
          not: null,
          gt: 0,
        },
      },
      select: {
        questions: true,
      },
    });

    // Calculate total questions
    const totalQuestions = targets.reduce(
      (sum: number, target: any) => sum + (target.questions || 0),
      0
    );

    return res.json({
      range: `last ${range} days`,
      totalQuestions,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching total questions:", error);
    return res.status(500).json({ message: "Failed to fetch total questions" });
  }
};

/**
 * GET QUESTIONS BY SUBJECT
 * GET /api/performance/questions/subject
 * 
 * Query params: ?range=7|30|90 (default: 7)
 */
export const getQuestionsBySubject = async (
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

    // Calculate date range
    const startDate = getDateRange(range);

    // Fetch targets with questions in the date range (only completed targets)
    const targets = await (prisma as any).target.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
        },
        status: "completed", // Only count completed targets
        questions: {
          not: null,
          gt: 0,
        },
      },
      select: {
        subject: true,
        questions: true,
      },
    });

    // Group by subject and sum questions
    const subjectMap = new Map<string, number>();

    targets.forEach((target: any) => {
      const subject = target.subject;
      const questions = target.questions || 0;
      const current = subjectMap.get(subject) || 0;
      subjectMap.set(subject, current + questions);
    });

    // Convert to array format
    const result = Array.from(subjectMap.entries())
      .map(([subject, questions]) => ({
        subject,
        questions,
      }))
      .sort((a, b) => b.questions - a.questions); // Sort by questions descending

    return res.json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching questions by subject:", error);
    return res.status(500).json({ message: "Failed to fetch questions by subject" });
  }
};

