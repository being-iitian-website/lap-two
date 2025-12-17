import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { updateMissedRevisions } from "./revision.controller";

// Enum types matching Prisma schema
type RevisionStatus = "pending" | "completed" | "missed";

/**
 * GET REVISION ANALYTICS (Count by Subject and Unit)
 * GET /api/revisions/analytics/count
 */
export const getRevisionAnalytics = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update missed revisions before analytics
    await updateMissedRevisions(userId);

    const revisions = await (prisma as any).revision.findMany({
      where: {
        userId,
      },
      select: {
        subject: true,
        units: true,
        status: true,
      },
    });

    // Build analytics structure: { subject: { unit: { completed, pending, missed } } }
    const analytics: Record<
      string,
      Record<string, { completed: number; pending: number; missed: number }>
    > = {};

    revisions.forEach((revision: { subject: string; units: string[]; status: string }) => {
      if (!analytics[revision.subject]) {
        analytics[revision.subject] = {};
      }

      revision.units.forEach((unit: string) => {
        if (!analytics[revision.subject][unit]) {
          analytics[revision.subject][unit] = {
            completed: 0,
            pending: 0,
            missed: 0,
          };
        }

        const status = revision.status as RevisionStatus;
        if (status === "completed") {
          analytics[revision.subject][unit].completed++;
        } else if (status === "pending") {
          analytics[revision.subject][unit].pending++;
        } else if (status === "missed") {
          analytics[revision.subject][unit].missed++;
        }
      });
    });

    return res.json(analytics);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching revision analytics:", error);
    return res.status(500).json({ message: "Failed to fetch revision analytics" });
  }
};

