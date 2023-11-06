import { PrismaClient } from "@prisma/client";

// Check if the global `prisma` instance exists.
// If not, create a new instance.
const prisma = global.prisma || new PrismaClient(); // in a Node.js environment, the global object is available by default;

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;