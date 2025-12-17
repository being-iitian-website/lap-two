"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTarget = exports.carryForwardTarget = exports.updateTargetStatus = exports.getTodayTargets = exports.createTarget = void 0;
const prismaconfig_1 = __importDefault(require("../config/prismaconfig"));
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
        const validTypes = ["theory", "lecture", "revision", "solving", "mock"];
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
/**
 * CARRY FORWARD MISSED TARGET
 * POST /api/targets/:id/carry-forward
 */
const carryForwardTarget = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const { newDate } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!newDate) {
            return res.status(400).json({ message: "newDate is required" });
        }
        const newStartTime = new Date(newDate);
        if (isNaN(newStartTime.getTime())) {
            return res.status(400).json({ message: "Invalid date format for newDate" });
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
        // Calculate new end time based on planned hours (if available)
        let updateData = {
            startTime: newStartTime,
            status: "pending",
            carryForward: true,
        };
        // Only calculate endTime if plannedHours is available
        if (target.plannedHours) {
            const newEndTime = new Date(newStartTime);
            newEndTime.setHours(newEndTime.getHours() + target.plannedHours);
            updateData.endTime = newEndTime;
        }
        const updatedTarget = await prismaconfig_1.default.target.update({
            where: { id },
            data: updateData,
        });
        return res.json({
            message: "Target carried forward successfully",
            target: {
                id: updatedTarget.id,
                startTime: updatedTarget.startTime,
                endTime: updatedTarget.endTime,
                status: updatedTarget.status,
                carryForward: updatedTarget.carryForward,
            },
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error carrying forward target:", error);
        return res.status(500).json({ message: "Failed to carry forward target" });
    }
};
exports.carryForwardTarget = carryForwardTarget;
/**
 * DELETE TARGET
 * DELETE /api/targets/:id
 */
const deleteTarget = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
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
        // Delete the target
        await prismaconfig_1.default.target.delete({
            where: { id },
        });
        return res.json({
            message: "Target deleted successfully",
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error deleting target:", error);
        return res.status(500).json({ message: "Failed to delete target" });
    }
};
exports.deleteTarget = deleteTarget;
//# sourceMappingURL=target.controllers.js.map