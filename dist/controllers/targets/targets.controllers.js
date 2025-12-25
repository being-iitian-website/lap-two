"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTargetStatus = exports.getTodayTargets = exports.createTarget = exports.getTargetStatus = exports.getAllTargets = void 0;
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
const xp_targets_1 = require("./xp.targets");
/**
 * GET ALL USER TARGETS
 * GET /api/targets
 * Optional query param: forTomorrow=true
 */
const getAllTargets = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { forTomorrow } = req.query;
        let start;
        let end;
        if (forTomorrow === 'true') {
            // Tomorrow's targets (next day)
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            start = tomorrow;
            const tomorrowEnd = new Date(tomorrow);
            tomorrowEnd.setHours(23, 59, 59, 999);
            end = tomorrowEnd;
        }
        else {
            // Today's targets
            start = new Date();
            start.setHours(0, 0, 0, 0);
            end = new Date();
            end.setHours(23, 59, 59, 999);
        }
        const targets = await prismaconfig_1.default.target.findMany({
            where: {
                userId,
                startTime: {
                    gte: start,
                    lte: end,
                },
            },
            select: {
                id: true,
                field: true,
                subject: true,
                title: true,
                type: true,
                plannedHours: true,
                actualHours: true,
                questions: true,
                startTime: true,
                endTime: true,
                status: true,
                carryForward: true,
                dailyQuestion1: true,
                dailyAnswer1: true,
                dailyQuestion2: true,
                dailyAnswer2: true,
                responseDate: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                startTime: "asc",
            },
        });
        // Transform to match frontend expected format
        const transformedTargets = targets.map(target => ({
            id: target.id,
            name: target.title,
            subject: target.subject,
            target_type: target.type,
            quantity: target.plannedHours || target.questions || 0,
            quantity_type: target.plannedHours ? 'HOUR' : 'QUESTION',
            start_time: target.startTime,
            end_time: target.endTime,
            progress: target.actualHours || 0,
            completed: target.status === 'completed',
            dailyTarget: {
                progress: target.actualHours || 0,
                completed: target.status === 'completed',
            },
            // Include raw target data for backend compatibility
            field: target.field,
            title: target.title,
            type: target.type,
            plannedHours: target.plannedHours,
            actualHours: target.actualHours,
            questions: target.questions,
            status: target.status,
            carryForward: target.carryForward,
            dailyQuestion1: target.dailyQuestion1,
            dailyAnswer1: target.dailyAnswer1,
            dailyQuestion2: target.dailyQuestion2,
            dailyAnswer2: target.dailyAnswer2,
            responseDate: target.responseDate,
        }));
        return res.json({
            message: "Targets retrieved successfully",
            data: transformedTargets,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching targets:", error);
        return res.status(500).json({ message: "Failed to fetch targets" });
    }
};
exports.getAllTargets = getAllTargets;
/**
 * GET TARGET STATUS (day completion)
 * GET /api/targets/status
 */
const getTargetStatus = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        // Get all today's targets
        const targets = await prismaconfig_1.default.target.findMany({
            where: {
                userId,
                startTime: {
                    gte: start,
                    lte: end,
                },
            },
            select: {
                status: true,
            },
        });
        // Check if all targets are completed or missed
        const isDayCompleted = targets.length > 0 && targets.every(target => target.status === 'completed' || target.status === 'missed');
        return res.json({
            message: "Target status retrieved successfully",
            data: {
                isDayCompleted,
                totalTargets: targets.length,
                completedTargets: targets.filter(t => t.status === 'completed').length,
                missedTargets: targets.filter(t => t.status === 'missed').length,
                pendingTargets: targets.filter(t => t.status === 'pending').length,
            },
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching target status:", error);
        return res.status(500).json({ message: "Failed to fetch target status" });
    }
};
exports.getTargetStatus = getTargetStatus;
/**
 * CREATE TARGET
 * POST /api/targets
 */
const createTarget = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { field, subject, title, type, plannedHours, questions, startTime, endTime, carryForward = false, } = req.body;
        // Validation - plannedHours, startTime and endTime are optional per schema
        if (!field || !subject || !title || !type) {
            return res.status(400).json({
                message: "Missing required fields: field, subject, title, type",
            });
        }
        // Validate enum values from Prisma schema
        const validTypes = ["theory", "lecture", "revision", "solving", "mock", "challenge"];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                message: `Invalid target type. Must be one of: ${validTypes.join(", ")}`,
            });
        }
        // Validate plannedHours if provided
        if (plannedHours !== undefined && plannedHours <= 0) {
            return res.status(400).json({ message: "Planned hours must be greater than 0" });
        }
        // Handle optional startTime and endTime (matching schema: DateTime?)
        let start = null;
        let end = null;
        if (startTime) {
            start = new Date(startTime);
            if (isNaN(start.getTime())) {
                return res.status(400).json({ message: "Invalid date format for startTime" });
            }
        }
        if (endTime) {
            end = new Date(endTime);
            if (isNaN(end.getTime())) {
                return res.status(400).json({ message: "Invalid date format for endTime" });
            }
        }
        // If both are provided, validate endTime is after startTime
        if (start && end && start >= end) {
            return res.status(400).json({ message: "endTime must be after startTime" });
        }
        // If only one is provided, it's invalid
        if ((start && !end) || (!start && end)) {
            return res.status(400).json({
                message: "Both startTime and endTime must be provided together, or both omitted",
            });
        }
        // Build data object with optional plannedHours, startTime and endTime (matching schema)
        const targetData = {
            field,
            subject,
            title,
            type,
            ...(plannedHours !== undefined && { plannedHours }),
            questions: questions || null,
            carryForward,
            status: "pending",
            userId,
            ...(start && { startTime: start }),
            ...(end && { endTime: end }),
        };
        const target = await prismaconfig_1.default.target.create({
            data: targetData, // Type assertion needed due to Prisma optional field typing
        });
        // Auto-create Revision if target type is "revision"
        if (type === "revision") {
            try {
                // Use startTime if available, otherwise use current date
                const revisionDate = start || new Date();
                revisionDate.setHours(0, 0, 0, 0);
                await prismaconfig_1.default.revision.create({
                    data: {
                        subject,
                        units: [title], // Use title as unit, or could be extracted from other fields
                        notes: null,
                        revisionDate,
                        status: "pending",
                        source: "target",
                        targetId: target.id,
                        userId,
                    },
                });
            }
            catch (revisionError) {
                // eslint-disable-next-line no-console
                console.error("Error auto-creating revision from target:", revisionError);
                // Don't fail the target creation if revision creation fails
            }
        }
        return res.status(201).json({
            id: target.id,
            status: target.status,
            message: "Target created successfully",
            data: target,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error creating target:", error);
        return res.status(500).json({ message: "Failed to create target" });
    }
};
exports.createTarget = createTarget;
/**
 * GET TODAY'S TARGETS
 * GET /api/targets/today
 */
const getTodayTargets = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        const targets = await prismaconfig_1.default.target.findMany({
            where: {
                userId,
                startTime: {
                    gte: start,
                    lte: end,
                },
            },
            select: {
                id: true,
                title: true,
                type: true,
                status: true,
                startTime: true,
            },
            orderBy: {
                startTime: "asc",
            },
        });
        return res.json(targets);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching today's targets:", error);
        return res.status(500).json({ message: "Failed to fetch today's targets" });
    }
};
exports.getTodayTargets = getTodayTargets;
/**
 * UPDATE TARGET STATUS
 * PATCH /api/targets/:id/status
 */
const updateTargetStatus = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { status, actualHours } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Validate enum values from Prisma schema
        const validStatuses = ["pending", "completed", "missed"];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            });
        }
        // Check if target exists and belongs to user
        const target = await prismaconfig_1.default.target.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!target) {
            return res.status(404).json({ message: "Target not found or access denied" });
        }
        const updatedTarget = await prismaconfig_1.default.target.update({
            where: { id },
            data: {
                status,
                ...(actualHours !== undefined && { actualHours }),
            },
        });
        // ✅ XP awarding (non-blocking) - Check and award target streak XP if status is "completed"
        if (status === "completed") {
            try {
                // Fire and forget - don't await to avoid blocking response
                (0, xp_targets_1.checkAndAwardTargetStreakXP)(userId, new Date()).catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error("Target streak XP error:", err);
                    if (err instanceof Error) {
                        // eslint-disable-next-line no-console
                        console.error(`Target streak XP error details: ${err.message}`, err.stack);
                    }
                });
            }
            catch (err) {
                // eslint-disable-next-line no-console
                console.error("Target streak XP error:", err);
            }
        }
        return res.json({
            message: "Target status updated successfully",
            target: {
                id: updatedTarget.id,
                status: updatedTarget.status,
                actualHours: updatedTarget.actualHours,
            },
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error updating target status:", error);
        return res.status(500).json({ message: "Failed to update target status" });
    }
};
exports.updateTargetStatus = updateTargetStatus;
//# sourceMappingURL=targets.controllers.js.map