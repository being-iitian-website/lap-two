import type { VercelRequest, VercelResponse } from "@vercel/node";
import app from "../src/app";

export default function (req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}
