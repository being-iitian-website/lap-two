"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRevisionStatus = exports.getRevisionHistory = exports.getRevisionAnalytics = exports.getRevisionsByDate = exports.createRevision = void 0;
const prismaconfig_1 = __importDefault(require("../config/prismaconfig"));
/**
 * Helper function to update missed revisions
 * Day boundary is 5:00 AM local time.
 *
 * Until 5:00 AM, the system still treats the previous calendar day as "today",
 * so revisions from "yesterday" are only marked as missed after 5:00 AM.
 *
 * Updates status from pending to missed if revisionDate < effectiveToday and status != completed
 */
const updateMissedRevisions = async (userId) => {
    const now = new Date();
    const effectiveToday = new Date(now);
    // Before 5 AM, roll back one day so that "today" is effectively yesterday.
    if (now.getHours() < 5) {
        effectiveToday.setDate(effectiveToday.getDate() - 1);
    }
    // Normalise to start of effective day for date-only comparison
    effectiveToday.setHours(0, 0, 0, 0);
    await prismaconfig_1.default.revision.updateMany({
        where: {
            userId,
            revisionDate: {
                lt: effectiveToday,
            },
            status: {
                not: "completed",
            },
        },
        data: {
            status: "missed",
        },
    });
};
/**
 * CREATE REVISION (Manual)
 * POST /api/revisions
 */
const createRevision = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { subject, units, notes, revisionDate } = req.body;
        // Validation
        if (!subject || !units || !Array.isArray(units) || units.length === 0 || !revisionDate) {
            return res.status(400).json({
                message: "Missing required fields: subject, units (array), revisionDate",
            });
        }
        const date = new Date(revisionDate);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ message: "Invalid date format for revisionDate" });
        }
        // Set time to start of day for consistent comparison
        date.setHours(0, 0, 0, 0);
        const revision = await prismaconfig_1.default.revision.create({
            data: {
                subject,
                units,
                notes: notes || null,
                revisionDate: date,
                status: "pending",
                source: "manual",
                userId,
            },
        });
        return res.status(201).json({
            id: revision.id,
            subject: revision.subject,
            units: revision.units,
            revisionDate: revision.revisionDate,
            status: revision.status,
            source: revision.source,
            message: "Revision created successfully",
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error creating revision:", error);
        return res.status(500).json({ message: "Failed to create revision" });
    }
};
exports.createRevision = createRevision;
/**
 * GET REVISIONS BY DATE (Calendar View)
 * GET /api/revisions?date=2025-01-15
 */
const getRevisionsByDate = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { date } = req.query;
        // Update missed revisions before fetching
        await updateMissedRevisions(userId);
        if (!date || typeof date !== "string") {
            return res.status(400).json({ message: "Date query parameter is required" });
        }
        const targetDate = new Date(date);
        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        targetDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(targetDate);
        nextDay.setDate(nextDay.getDate() + 1);
        const revisions = await prismaconfig_1.default.revision.findMany({
            where: {
                userId,
                revisionDate: {
                    gte: targetDate,
                    lt: nextDay,
                },
            },
            select: {
                id: true,
                subject: true,
                units: true,
                notes: true,
                status: true,
                source: true,
                revisionDate: true,
                targetId: true,
            },
            orderBy: {
                revisionDate: "asc",
            },
        });
        return res.json(revisions);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching revisions by date:", error);
        return res.status(500).json({ message: "Failed to fetch revisions" });
    }
};
exports.getRevisionsByDate = getRevisionsByDate;
/**
 * GET REVISION ANALYTICS (Count by Subject and Unit)
 * GET /api/revisions/analytics/count
 */
const getRevisionAnalytics = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Update missed revisions before analytics
        await updateMissedRevisions(userId);
        const revisions = await prismaconfig_1.default.revision.findMany({
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
        const analytics = {};
        revisions.forEach((revision) => {
            if (!analytics[revision.subject]) {
                analytics[revision.subject] = {};
            }
            revision.units.forEach((unit) => {
                if (!analytics[revision.subject][unit]) {
                    analytics[revision.subject][unit] = {
                        completed: 0,
                        pending: 0,
                        missed: 0,
                    };
                }
                const status = revision.status;
                if (status === "completed") {
                    analytics[revision.subject][unit].completed++;
                }
                else if (status === "pending") {
                    analytics[revision.subject][unit].pending++;
                }
                else if (status === "missed") {
                    analytics[revision.subject][unit].missed++;
                }
            });
        });
        return res.json(analytics);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching revision analytics:", error);
        return res.status(500).json({ message: "Failed to fetch revision analytics" });
    }
};
exports.getRevisionAnalytics = getRevisionAnalytics;
/**
 * GET REVISION HISTORY
 * GET /api/revisions/history?range=7|30|all
 */
const getRevisionHistory = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { range } = req.query;
        if (!range || typeof range !== "string" || !["7", "30", "all"].includes(range)) {
            return res.status(400).json({
                message: "Range query parameter is required and must be: 7, 30, or all",
            });
        }
        // Update missed revisions before fetching history
        await updateMissedRevisions(userId);
        let startDate;
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        if (range === "7") {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            startDate.setHours(0, 0, 0, 0);
        }
        else if (range === "30") {
            startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);
            startDate.setHours(0, 0, 0, 0);
        }
        const whereClause = {
            userId,
        };
        if (startDate) {
            whereClause.revisionDate = {
                gte: startDate,
                lte: endDate,
            };
        }
        const revisions = await prismaconfig_1.default.revision.findMany({
            where: whereClause,
            select: {
                status: true,
            },
        });
        const completed = revisions.filter((r) => r.status === "completed").length;
        const pending = revisions.filter((r) => r.status === "pending").length;
        const missed = revisions.filter((r) => r.status === "missed").length;
        const response = {
            to: endDate.toISOString().split("T")[0],
            completed,
            pending,
            missed,
        };
        if (startDate) {
            response.from = startDate.toISOString().split("T")[0];
        }
        return res.json(response);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching revision history:", error);
        return res.status(500).json({ message: "Failed to fetch revision history" });
    }
};
exports.getRevisionHistory = getRevisionHistory;
/**
 * UPDATE REVISION STATUS
 * PATCH /api/revisions/:id/status
 */
const updateRevisionStatus = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { status } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Validate status - this endpoint is ONLY for marking as completed
        if (status !== "completed") {
            return res.status(400).json({
                message: "Invalid status. Only 'completed' is allowed for this endpoint",
            });
        }
        // Check if revision exists and belongs to user
        const revision = await prismaconfig_1.default.revision.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!revision) {
            return res.status(404).json({ message: "Revision not found or access denied" });
        }
        // Business rules:
        // - Only pending revisions can transition to completed
        // - Missed revisions are locked and cannot be updated
        if (revision.status === "missed") {
            return res
                .status(400)
                .json({ message: "Missed revisions cannot be updated. They are locked." });
        }
        if (revision.status !== "pending") {
            return res.status(400).json({
                message: "Only pending revisions can be marked as completed",
            });
        }
        // Update the revision status to completed
        const updatedRevision = await prismaconfig_1.default.revision.update({
            where: { id },
            data: {
                status: "completed",
            },
        });
        return res.json({
            message: "Revision marked as completed",
            revision: {
                id: updatedRevision.id,
                status: updatedRevision.status,
                subject: updatedRevision.subject,
                units: updatedRevision.units,
            },
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error updating revision status:", error);
        return res.status(500).json({ message: "Failed to update revision status" });
    }
};
exports.updateRevisionStatus = updateRevisionStatus;
//# sourceMappingURL=revision.controller.js.map