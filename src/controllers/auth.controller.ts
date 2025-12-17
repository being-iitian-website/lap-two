import type { Request, Response } from "express";
import bcrypt from "bcrypt";

import prisma from "../config/prismaconfig";
import { generateToken, type JwtUserPayload } from "../utils/jwt";

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

/**
 * REGISTER
 */
export const register = async (
  req: Request<unknown, unknown, RegisterBody>,
  res: Response
): Promise<Response | void> => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await prisma.user_info.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user_info.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const payload: JwtUserPayload = {
      id: user.id,
      email: user.email,
      role: (user as any).role,
    };

    const token = generateToken(payload);

    return res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * LOGIN
 */
export const login = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await prisma.user_info.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload: JwtUserPayload = {
      id: user.id,
      email: user.email,
      role: (user as any).role,
    };

    const token = generateToken(payload);

    return res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).json({ message: "Login failed" });
  }
};

/**
 * LOGOUT
 *
 * For stateless JWT auth, logout is handled on the client
 * by removing the stored token. This endpoint exists mainly
 * for frontend/Postman flows and future extensibility (e.g. blacklist).
 */
export const logout = async (
  _req: Request,
  res: Response
): Promise<Response | void> => {
  // If you later add token blacklist/refresh-token invalidation,
  // you can implement it here using information from the Authorization header.

  return res.json({
    message: "Logged out successfully. Please remove the token on the client.",
  });
};