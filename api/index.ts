import serverless from "serverless-http";
// Import from source - Vercel will compile TypeScript automatically
import app from "../src/app";

// Export handler for Vercel serverless functions
export default serverless(app);
