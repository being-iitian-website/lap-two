import type { Response } from "express";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";
import { checkAndAwardJournalXP } from "./xp.space";
import { verifyJournalCredentials, verifyJournalPassword } from "./journalCredentials.controller";

interface SaveJournalBody {
  id?: string;
  date: string;
  notes: string;
  username?: string; // required for update
  password?: string; // required for update
}

/**
 * CREATE / UPDATE JOURNAL (Upsert-style)
 * POST /api/journal
 */
export const saveJournal = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id, date, notes, username, password } = req.body as SaveJournalBody;

    if (!date || !notes) {
      return res
        .status(400)
        .json({ message: "Both date and notes are required" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid date format for date" });
    }

    // Normalise to start of day for date-only semantics
    parsedDate.setHours(0, 0, 0, 0);

    let savedJournal;
    
    if (id) {
      // Require journal credentials for updating an existing journal
      if (!username || !password) {
        return res.status(400).json({
          message: "Username and password are required to update a journal",
        });
      }

      const ok = await verifyJournalCredentials(userId, username, password);
      if (!ok) {
        return res.status(403).json({
          message: "Invalid journal credentials or not configured",
        });
      }

      // Update existing journal, ensuring it belongs to the current user
      const existing = await (prisma as any).journal.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!existing) {
        return res
          .status(404)
          .json({ message: "Journal not found or access denied" });
      }

      savedJournal = await (prisma as any).journal.update({
        where: { id },
        data: {
          date: parsedDate,
          notes,
          // updatedAt is handled automatically by Prisma
        },
      });
    } else {
      // Create new journal entry
      savedJournal = await (prisma as any).journal.create({
        data: {
          date: parsedDate,
          notes,
          userId,
          // createdAt / updatedAt handled by Prisma
        },
      });
    }

    // ✅ XP awarding (non-blocking) - Check and award journal XP
    try {
      await checkAndAwardJournalXP(userId, savedJournal.id, parsedDate);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Journal XP error:", err);
      if (err instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(`Journal XP error details: ${err.message}`, err.stack);
      }
    }

    return res.json({ message: "Journal saved successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error saving journal:", error);
    return res.status(500).json({ message: "Failed to save journal" });
  }
};

/**
 * GET MY JOURNALS
 * GET /api/journal/me
 */
export const getMyJournals = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Require journal password for viewing journals
    const rawHeaderPwd = req.headers["x-journal-password"]; // header style
    const headerPwd = Array.isArray(rawHeaderPwd) ? rawHeaderPwd[0] : rawHeaderPwd;
    const queryPwd = (req.query?.password as string) || undefined;
    const bodyPwd = (req.body as any)?.password as string | undefined;
    const collected = headerPwd ?? queryPwd ?? bodyPwd;
    const password = typeof collected === "string" ? collected.trim() : undefined;

    if (!password) {
      return res.status(400).json({
        message: "Password is required to view journals",
      });
    }

    const allowed = await verifyJournalPassword(userId, password);
    if (!allowed) {
      return res.status(403).json({
        message: "Invalid journal password or not configured",
      });
    }

    const journals = await (prisma as any).journal.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        date: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        { date: "desc" },
        { createdAt: "desc" },
      ],
    });

    return res.json(journals);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching journals:", error);
    return res.status(500).json({ message: "Failed to fetch journals" });
  }
};

/**
 * GET TODAY'S RESPONSES
 * GET /api/space/today-responses
 * 
 * Fetch all today's targets that contain daily question responses
 */
export const getTodayResponses = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.user?.id as string;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch targets with responses for today
    const targets = await (prisma as any).target.findMany({
      where: {
        userId,
        responseDate: {
          gte: today,
          lt: tomorrow,
        },
        dailyQuestion1: {
          not: null,
        },
        dailyAnswer1: {
          not: null,
        },
      },
      select: {
        title: true,
        dailyQuestion1: true,
        dailyAnswer1: true,
        dailyQuestion2: true,
        dailyAnswer2: true,
      },
      orderBy: {
        responseDate: "asc",
      },
    });

    // Format response
    const responses = targets.map((target: any) => ({
      targetTitle: target.title,
      question1: target.dailyQuestion1,
      answer1: target.dailyAnswer1,
      question2: target.dailyQuestion2 || null,
      answer2: target.dailyAnswer2 || null,
    }));

    // Format date as YYYY-MM-DD
    const dateString = today.toISOString().split("T")[0];

    return res.json({
      date: dateString,
      responses,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching today's responses:", error);
    return res.status(500).json({ message: "Failed to fetch today's responses" });
  }
};


