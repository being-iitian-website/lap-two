import type { Response } from "express";
import bcrypt from "bcrypt";

import prisma from "../../config/prismaconfig";
import type { AuthenticatedRequest } from "../../middleware/auth.middleware";

interface SetCredentialsBody {
  username: string;
  password: string;
}

interface ResetPasswordBody {
  oldPassword: string;
  newPassword: string;
}

export const setJournalCredentials = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { username, password } = req.body as SetCredentialsBody;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Both username and password are required" });

    const existing = await (prisma as any).journalCredential.findUnique({
      where: { userId },
    });

    if (existing) {
      return res.status(409).json({
        message: "Journal credentials already set. Use reset password.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await (prisma as any).journalCredential.create({
      data: {
        userId,
        username,
        passwordHash,
      },
    });

    return res.json({ message: "Journal credentials set successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error setting journal credentials:", error);
    return res
      .status(500)
      .json({ message: "Failed to set journal credentials" });
  }
};

export const resetJournalPassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id as string;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { oldPassword, newPassword } = req.body as ResetPasswordBody;

    if (!oldPassword || !newPassword)
      return res
        .status(400)
        .json({ message: "Both oldPassword and newPassword are required" });

    if (oldPassword === newPassword)
      return res.status(400).json({
        message: "New password must be different from old password",
      });

    const creds = await (prisma as any).journalCredential.findUnique({
      where: { userId },
    });

    if (!creds)
      return res
        .status(404)
        .json({ message: "Journal credentials not set for user" });

    const match = await bcrypt.compare(oldPassword, creds.passwordHash);
    if (!match)
      return res.status(403).json({ message: "Old password is incorrect" });

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await (prisma as any).journalCredential.update({
      where: { userId },
      data: { passwordHash },
    });

    return res.json({ message: "Journal password reset successfully" });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error resetting journal password:", error);
    return res
      .status(500)
      .json({ message: "Failed to reset journal password" });
  }
};

export const verifyJournalCredentials = async (
  userId: string,
  username: string,
  password: string
): Promise<boolean> => {
  const creds = await (prisma as any).journalCredential.findUnique({
    where: { userId },
  });
  if (!creds) return false;
  if (creds.username !== username) return false;
  const ok = await bcrypt.compare(password, creds.passwordHash);
  return ok;
};

export const verifyJournalPassword = async (
  userId: string,
  password: string
): Promise<boolean> => {
  const creds = await (prisma as any).journalCredential.findUnique({
    where: { userId },
  });
  if (!creds) return false;
  const ok = await bcrypt.compare(password, creds.passwordHash);
  return ok;
};
