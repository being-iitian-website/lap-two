"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/authentication/auth.controller");
const router = (0, express_1.Router)();
// Simple health/test route
router.get("/test", (_req, res) => {
    // eslint-disable-next-line no-console
    console.log("HIT /api/auth/test");
    res.send("auth test ok");
});
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
// Google OAuth 2.0
router.get("/google", auth_controller_1.startGoogleAuth);
router.get("/google/callback", auth_controller_1.handleGoogleCallback);
// Stateless logout endpoint
router.post("/logout", auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map