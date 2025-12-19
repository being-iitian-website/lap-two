"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// Prisma Client configuration optimized for serverless (Vercel)
const prisma = new client_1.PrismaClient({
    log: process.env.NODE_ENV === "production"
        ? ['warn', 'error']
        : ['query', 'info', 'warn', 'error'],
    // Optimize for serverless: reduce connection pool size
    // This helps prevent connection exhaustion in serverless environments
});
// Handle Prisma connection cleanup on serverless shutdown
if (process.env.NODE_ENV === "production") {
    // In serverless, ensure connections are properly closed
    process.on("beforeExit", async () => {
        await prisma.$disconnect();
    });
}
exports.default = prisma;
//# sourceMappingURL=prismaconfig.js.map