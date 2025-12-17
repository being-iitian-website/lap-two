"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get("/test", (_req, res) => {
    console.log("HIT /api/auth/test");
    res.send("auth test ok");
});
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map