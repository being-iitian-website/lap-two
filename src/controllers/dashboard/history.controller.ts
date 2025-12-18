import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";


export const getHistoryByDate = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date } = req.query;

    // Validate date parameter
    if (!date || typeof date !== "string") {
      return res.status(400).json({ message: "Date query parameter is required" });
    }

    
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ 
        message: "Invalid date format. Use YYYY-MM-DD format (e.g., 2025-01-16)" 
      });
    }

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }

    // Set to start of day (00:00:00)
    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Fetch targets for the given date
    // Targets are matched by startTime falling on the given date
    const targets = await (prisma as any).target.findMany({
      where: {
        userId,
        startTime: {
          gte: targetDate,
          lt: nextDay,
        },
      },
      select: {
        title: true,
        subject: true,
        type: true,
        actualHours: true,
        status: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

   
    const revisions = await (prisma as any).revision.findMany({
      where: {
        userId,
        revisionDate: {
          gte: targetDate,
          lt: nextDay,
        },
      },
      select: {
        subject: true,
        units: true,
        status: true,
      },
      orderBy: {
        revisionDate: "asc",
      },
    });

    // Format revisions - use first unit as topic, or subject if no units
    const formattedRevisions = revisions.map((revision: any) => ({
      topic: revision.units && revision.units.length > 0 
        ? revision.units[0] 
        : revision.subject,
      status: revision.status,
    }));

    // Format response
    const response = {
      date,
      targets: targets.map((target: any) => ({
        title: target.title,
        subject: target.subject,
        type: target.type,
        actualHours: target.actualHours,
        status: target.status,
      })),
      revisions: formattedRevisions,
    };

    return res.json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching history by date:", error);
    return res.status(500).json({ message: "Failed to fetch history" });
  }
};

