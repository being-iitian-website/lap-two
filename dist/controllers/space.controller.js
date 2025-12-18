"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodayResponses = exports.getMyJournals = exports.saveJournal = void 0;
const prismaconfig_1 = __importDefault(require("../config/prismaconfig"));
/**
 * CREATE / UPDATE JOURNAL (Upsert-style)
 * POST /api/journal
 *
 * If body contains `id`, updates that journal (for the current user).
 * If no `id`, creates a new journal entry.
 */
const saveJournal = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { id, date, notes } = req.body;
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
        if (id) {
            // Update existing journal, ensuring it belongs to the current user
            const existing = await prismaconfig_1.default.journal.findFirst({
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
            await prismaconfig_1.default.journal.update({
                where: { id },
                data: {
                    date: parsedDate,
                    notes,
                    // updatedAt is handled automatically by Prisma
                },
            });
        }
        else {
            // Create new journal entry
            await prismaconfig_1.default.journal.create({
                data: {
                    date: parsedDate,
                    notes,
                    userId,
                    // createdAt / updatedAt handled by Prisma
                },
            });
        }
        return res.json({ message: "Journal saved successfully" });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving journal:", error);
        return res.status(500).json({ message: "Failed to save journal" });
    }
};
exports.saveJournal = saveJournal;
/**
 * GET MY JOURNALS
 * GET /api/journal/me
 */
const getMyJournals = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const journals = await prismaconfig_1.default.journal.findMany({
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
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching journals:", error);
        return res.status(500).json({ message: "Failed to fetch journals" });
    }
};
exports.getMyJournals = getMyJournals;
/**
 * GET TODAY'S RESPONSES
 * GET /api/space/today-responses
 *
 * Fetch all today's targets that contain daily question responses
 */
const getTodayResponses = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Get today's date range
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        // Fetch targets with responses for today
        const targets = await prismaconfig_1.default.target.findMany({
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
        const responses = targets.map((target) => ({
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
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching today's responses:", error);
        return res.status(500).json({ message: "Failed to fetch today's responses" });
    }
};
exports.getTodayResponses = getTodayResponses;
//# sourceMappingURL=space.controller.js.map