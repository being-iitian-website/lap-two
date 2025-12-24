"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGoogleCallback = exports.startGoogleAuth = exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const google_auth_library_1 = require("google-auth-library");
const prismaconfig_1 = __importDefault(require("../../config/prismaconfig"));
const jwt_1 = require("../../utils/jwt");
const GOOGLE_SCOPES = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
];
const getGoogleClient = () => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackUrl = process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/auth/google/callback";
    if (!clientId || !clientSecret) {
        throw new Error("Google OAuth configuration is missing");
    }
    return new google_auth_library_1.OAuth2Client({
        clientId,
        clientSecret,
        redirectUri: callbackUrl,
    });
};
const fetchGoogleProfile = async (code) => {
    const client = getGoogleClient();
    const { tokens } = await client.getToken(code);
    if (!tokens.access_token) {
        throw new Error("Google OAuth token exchange failed");
    }
    const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch Google profile");
    }
    const profile = (await response.json());
    if (!profile.id || !profile.email) {
        throw new Error("Google profile missing id or email");
    }
    return profile;
};
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
            const message = existingUser.provider === "google"
                ? "User already exists via Google. Please use Google login."
                : "User already exists";
            return res.status(409).json({ message });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prismaconfig_1.default.user_info.create({
            data: {
                name,
                email,
                password: hashedPassword,
                provider: "local",
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
        if (user.provider && user.provider !== "local") {
            return res.status(409).json({ message: "Use Google login for this account" });
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
/**
 * LOGOUT
 *
 * For stateless JWT auth, logout is handled on the client
 * by removing the stored token. This endpoint exists mainly
 * for frontend/Postman flows and future extensibility (e.g. blacklist).
 */
const logout = async (_req, res) => {
    // If you later add token blacklist/refresh-token invalidation,
    // you can implement it here using information from the Authorization header.
    return res.json({
        message: "Logged out successfully. Please remove the token on the client.",
    });
};
exports.logout = logout;
/**
 * GOOGLE AUTH INITIATION
 */
const startGoogleAuth = async (_req, res) => {
    try {
        const client = getGoogleClient();
        const url = client.generateAuthUrl({
            access_type: "offline",
            scope: GOOGLE_SCOPES,
            prompt: "consent",
        });
        return res.redirect(url);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: "Failed to initiate Google authentication" });
    }
};
exports.startGoogleAuth = startGoogleAuth;
/**
 * GOOGLE AUTH CALLBACK
 */
const handleGoogleCallback = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({ message: "Missing authorization code" });
        }
        const profile = await fetchGoogleProfile(code);
        let user = await prismaconfig_1.default.user_info.findUnique({ where: { email: profile.email } });
        if (user && user.provider && user.provider !== "google") {
            return res.status(409).json({ message: "Email already registered with a different provider" });
        }
        if (!user) {
            user = await prismaconfig_1.default.user_info.create({
                data: {
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    provider: "google",
                    googleId: profile.id,
                },
            });
        }
        else {
            user = await prismaconfig_1.default.user_info.update({
                where: { id: user.id },
                data: {
                    googleId: user.googleId ?? profile.id,
                    image: profile.picture ?? user.image,
                    name: user.name ?? profile.name,
                    provider: "google",
                },
            });
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
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image,
            },
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(401).json({ message: "Google authentication failed" });
    }
};
exports.handleGoogleCallback = handleGoogleCallback;
//# sourceMappingURL=auth.controller.js.map