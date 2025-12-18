"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoursByType = exports.getHoursBySubject = exports.getTotalHours = void 0;
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
 * GET TOTAL HOURS
 * GET /api/performance/hours/total
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
const getTotalHours = async (req, res) => {
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
        // Fetch targets with plannedHours in the date range (only completed targets)
        const targets = await prismaconfig_1.default.target.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startDate,
                },
                status: "completed", // Only count completed targets
                plannedHours: {
                    not: null,
                    gt: 0,
                },
            },
            select: {
                plannedHours: true,
            },
        });
        // Calculate total hours from plannedHours
        const totalHours = targets.reduce((sum, target) => sum + (target.plannedHours || 0), 0);
        return res.json({
            range: `last ${range} days`,
            totalHours: Math.round(totalHours * 10) / 10, // Round to 1 decimal place
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching total hours:", error);
        return res.status(500).json({ message: "Failed to fetch total hours" });
    }
};
exports.getTotalHours = getTotalHours;
/**
 * GET HOURS BY SUBJECT
 * GET /api/performance/hours/subject
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
const getHoursBySubject = async (req, res) => {
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
        // Fetch targets with plannedHours in the date range (only completed targets)
        const targets = await prismaconfig_1.default.target.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startDate,
                },
                status: "completed", // Only count completed targets
                plannedHours: {
                    not: null,
                    gt: 0,
                },
            },
            select: {
                subject: true,
                plannedHours: true,
            },
        });
        // Group by subject and sum hours from plannedHours
        const subjectMap = new Map();
        targets.forEach((target) => {
            const subject = target.subject;
            const hours = target.plannedHours || 0;
            const current = subjectMap.get(subject) || 0;
            subjectMap.set(subject, current + hours);
        });
        // Convert to array format
        const result = Array.from(subjectMap.entries())
            .map(([subject, hours]) => ({
            subject,
            hours: Math.round(hours * 10) / 10, // Round to 1 decimal place
        }))
            .sort((a, b) => b.hours - a.hours); // Sort by hours descending
        return res.json(result);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching hours by subject:", error);
        return res.status(500).json({ message: "Failed to fetch hours by subject" });
    }
};
exports.getHoursBySubject = getHoursBySubject;
/**
 * GET HOURS BY TYPE (Theory vs Solving)
 * GET /api/performance/hours/type
 *
 * Query params: ?range=7|30|90 (default: 7)
 */
const getHoursByType = async (req, res) => {
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
        // Fetch targets with plannedHours in the date range (only completed targets)
        const targets = await prismaconfig_1.default.target.findMany({
            where: {
                userId,
                createdAt: {
                    gte: startDate,
                },
                status: "completed", // Only count completed targets
                plannedHours: {
                    not: null,
                    gt: 0,
                },
                type: {
                    in: ["theory", "solving"], // Only theory and solving types
                },
            },
            select: {
                type: true,
                plannedHours: true,
            },
        });
        // Group by type and sum hours from plannedHours
        const typeMap = new Map();
        targets.forEach((target) => {
            const type = target.type;
            const hours = target.plannedHours || 0;
            const current = typeMap.get(type) || 0;
            typeMap.set(type, current + hours);
        });
        // Convert to array format, ensuring theory and solving are always present
        const result = [
            {
                type: "theory",
                hours: Math.round((typeMap.get("theory") || 0) * 10) / 10,
            },
            {
                type: "solving",
                hours: Math.round((typeMap.get("solving") || 0) * 10) / 10,
            },
        ];
        return res.json(result);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching hours by type:", error);
        return res.status(500).json({ message: "Failed to fetch hours by type" });
    }
};
exports.getHoursByType = getHoursByType;
//# sourceMappingURL=hours.controller.js.map