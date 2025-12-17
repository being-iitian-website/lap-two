"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaconfig_1 = __importDefault(require("../config/prismaconfig"));
const jwt_1 = require("../utils/jwt");
/**
 * REGISTER
 */
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        const existingUser = await prismaconfig_1.default.user_info.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prismaconfig_1.default.user_info.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = (0, jwt_1.generateToken)(payload);
        return res.status(201).json({
            message: "User registered successfully",
            token,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: "Registration failed" });
    }
};
exports.register = register;
/**
 * LOGIN
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }
        const user = await prismaconfig_1.default.user_info.findUnique({ where: { email } });
        if (!user || !user.password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const token = (0, jwt_1.generateToken)(payload);
        return res.json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: "Login failed" });
    }
};
exports.login = login;
//# sourceMappingURL=auth_controller.js.map