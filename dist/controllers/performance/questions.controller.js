"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionsBySubject = exports.getTotalQuestions = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
/**
 * Helper function to calculate date range based on days
 */
const getDateRange = (days) => {
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
const getTotalQuestions = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Get range from query param (default: 7)
        const rangeParam = req.query.range;
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
        const targets = await prismaconfig_1.default.target.findMany({
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
        const totalQuestions = targets.reduce((sum, target) => sum + (target.questions || 0), 0);
        return res.json({
            range: `last ${range} days`,
            totalQuestions,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching total questions:", error);
        return res.status(500).json({ message: "Failed to fetch total questions" });
    }
};
exports.getTotalQuestions = getTotalQuestions;
/**
 * GET QUESTIONS BY SUBJECT
 * GET /api/performance/questions/subject
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
const getQuestionsBySubject = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Get range from query param (default: 7)
        const rangeParam = req.query.range;
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
        const targets = await prismaconfig_1.default.target.findMany({
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
        const subjectMap = new Map();
        targets.forEach((target) => {
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
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching questions by subject:", error);
        return res.status(500).json({ message: "Failed to fetch questions by subject" });
    }
};
exports.getQuestionsBySubject = getQuestionsBySubject;
//# sourceMappingURL=questions.controller.js.map