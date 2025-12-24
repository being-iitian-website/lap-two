import { Router } from "express";

import {
  login,
  register,
  logout,
  startGoogleAuth,
  handleGoogleCallback,
} from "../controllers/authentication/auth.controller";

const router = Router();

// Simple health/test route
router.get("/test", (_req, res) => {
  // eslint-disable-next-line no-console
  console.log("HIT /api/auth/test");
  res.send("auth test ok");
});

router.post("/register", register);
router.post("/login", login);

// Google OAuth 2.0
router.get("/google", startGoogleAuth);
router.get("/google/callback", handleGoogleCallback);

// Stateless logout endpoint
router.post("/logout", logout);

export default router;
