import jwt from "jsonwebtoken";

export interface JwtUserPayload {
  id: string | number;
  email: string;
  role?: string;
}

export const generateToken = (user: JwtUserPayload): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    { expiresIn: "7d" }
  );
};
