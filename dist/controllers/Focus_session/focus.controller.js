"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentFocusSessions = exports.saveFocusSession = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
const xp_utils_1 = require("./xp.utils");
/**
 * SAVE FOCUS SESSION
 * POST /api/focus
 */
const saveFocusSession = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { notes, startTime, endTime } = req.body;
        if (!startTime || !endTime) {
            return res
                .status(400)
                .json({ message: "startTime and endTime are required" });
        }
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res
                .status(400)
                .json({ message: "Invalid date format for startTime or endTime" });
        }
        if (end <= start) {
            return res
                .status(400)
                .json({ message: "endTime must be after startTime" });
        }
        // Duration in minutes
        const durationMs = end.getTime() - start.getTime();
        const durationMinutes = Math.round(durationMs / (1000 * 60));
        // Create focus session
        const session = await prismaconfig_1.default.focusSession.create({
            data: {
                notes: notes || null,
                startTime: start,
                endTime: end,
                duration: durationMinutes,
                userId,
            },
        });
        (0, xp_utils_1.checkAndAwardFocusXP)(userId, start, session.id).catch((error) => {
            // eslint-disable-next-line no-console
            console.error("Error awarding XP (non-blocking):", error);
        });
        return res.json({ message: "Focus session saved successfully" });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving focus session:", error);
        return res
            .status(500)
            .json({ message: "Failed to save focus session" });
    }
};
exports.saveFocusSession = saveFocusSession;
/**
 * GET RECENT FOCUS SESSIONS
 * GET /api/focus/recent?limit=5
 */
const getRecentFocusSessions = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { limit } = req.query;
        let take = 5;
        if (typeof limit === "string") {
            const parsed = Number.parseInt(limit, 10);
            if (!Number.isNaN(parsed) && parsed > 0 && parsed <= 50) {
                take = parsed;
            }
        }
        const sessions = await prismaconfig_1.default.focusSession.findMany({
            where: {
                userId,
            },
            select: {
                notes: true,
                duration: true,
                startTime: true,
                endTime: true,
            },
            orderBy: {
                startTime: "desc",
            },
            take,
        });
        // Shape response to match requirements (notes + duration)
        const response = sessions.map((s) => ({
            notes: s.notes,
            duration: s.duration,
        }));
        return res.json(response);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching recent focus sessions:", error);
        return res
            .status(500)
            .json({ message: "Failed to fetch recent focus sessions" });
    }
};
exports.getRecentFocusSessions = getRecentFocusSessions;
//# sourceMappingURL=focus.controller.js.map