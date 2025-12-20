import type { Response } from "express";
import { TargetType, TargetStatus } from "@prisma/client";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";

/**
 * CREATE DAILY CHALLENGE TARGET
 * POST /api/targets/challenge
 * 
 * Creates a predefined daily challenge target for the authenticated user.
 * Only one challenge target per user per day is allowed.
 */
export const createChallengeTarget = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get today's date range (start and end of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if challenge already exists for today
    const existingChallenge = await prisma.target.findFirst({
      where: {
        userId,
        type: TargetType.challenge,
        createdAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (existingChallenge) {
      return res.status(409).json({
        message: "Daily challenge already exists for today",
      });
    }

    // Predefined values for daily challenge
    const challengeData = {
      field: "Daily Challenge",
      subject: "Challenge",
      title: "Daily Challenge",
      type: TargetType.challenge,
      status: TargetStatus.pending,
      plannedHours: 1.0, // Default 1 hour for challenge
      userId,
    };

    // Create the challenge target
    const challenge = await prisma.target.create({
      data: challengeData,
    });

    return res.status(201).json({
      message: "Daily challenge added successfully",
      target: {
        id: challenge.id,
        type: challenge.type,
        status: challenge.status,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating daily challenge:", error);
    return res.status(500).json({ message: "Failed to create daily challenge" });
  }
};

