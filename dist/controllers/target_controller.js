"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carryForwardTarget = exports.updateTargetStatus = exports.getTodayTargets = exports.createTarget = void 0;
const prismaconfig_1 = __importDefault(require("../config/prismaconfig"));
/**
 * CREATE TARGET
 * POST /api/targets
 */
const createTarget = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { field, subject, title, type, plannedHours, questions, startTime, endTime, carryForward, } = req.body;
        // Validation
        if (!field || !subject || !title || !type || !plannedHours || !startTime || !endTime) {
            return res.status(400).json({
                message: "Missing required fields: field, subject, title, type, plannedHours, startTime, endTime",
            });
        }
        // Validate target type
        const validTypes = ["theory", "lecture", "revision", "solving", "mock"];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                message: `Invalid type. Must be one of: ${validTypes.join(", ")}`,
            });
        }
        // Validate dates
        const start = new Date(startTime);
        const end = new Date(endTime);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        if (start >= end) {
            return res.status(400).json({ message: "startTime must be before endTime" });
        }
        const target = await prismaconfig_1.default.target.create({
            data: {
                userId,
                field,
                subject,
                title,
                type,
                plannedHours,
                questions: questions || null,
                startTime: start,
                endTime: end,
                carryForward: carryForward || false,
                status: "pending",
            },
        });
        return res.status(201).json({
            id: target.id,
            status: target.status,
            message: "Target created successfully",
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
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
            return res.status(401).json({ message: "User not authenticated" });
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const targets = await prismaconfig_1.default.target.findMany({
            where: {
                userId,
                startTime: {
                    gte: today,
                    lt: tomorrow,
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
        console.error(error);
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
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        const { status, actualHours } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        // Validate status
        const validStatuses = ["pending", "completed", "missed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
            });
        }
        // Check if target exists and belongs to user
        const existingTarget = await prismaconfig_1.default.target.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!existingTarget) {
            return res.status(404).json({ message: "Target not found" });
        }
        // Update target
        const updateData = { status };
        if (actualHours !== undefined) {
            updateData.actualHours = actualHours;
        }
        const target = await prismaconfig_1.default.target.update({
            where: { id },
            data: updateData,
        });
        return res.json({
            id: target.id,
            status: target.status,
            actualHours: target.actualHours,
            message: "Target status updated successfully",
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
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
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const { id } = req.params;
        const { newDate } = req.body;
        if (!newDate) {
            return res.status(400).json({ message: "newDate is required" });
        }
        // Validate date
        const newStartTime = new Date(newDate);
        if (isNaN(newStartTime.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        // Check if target exists and belongs to user
        const existingTarget = await prismaconfig_1.default.target.findFirst({
            where: {
                id,
                userId,
            },
        });
        if (!existingTarget) {
            return res.status(404).json({ message: "Target not found" });
        }
        // Calculate new endTime (preserve duration)
        const duration = existingTarget.endTime.getTime() - existingTarget.startTime.getTime();
        const newEndTime = new Date(newStartTime.getTime() + duration);
        // Update target with new dates and set carryForward to true
        const target = await prismaconfig_1.default.target.update({
            where: { id },
            data: {
                startTime: newStartTime,
                endTime: newEndTime,
                carryForward: true,
                status: "pending", // Reset status to pending for the new date
            },
        });
        return res.json({
            id: target.id,
            startTime: target.startTime,
            endTime: target.endTime,
            carryForward: target.carryForward,
            status: target.status,
            message: "Target carried forward successfully",
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: "Failed to carry forward target" });
    }
};
exports.carryForwardTarget = carryForwardTarget;
//# sourceMappingURL=target_controller.js.map