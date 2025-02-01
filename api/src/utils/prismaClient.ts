import { PrismaClient } from "@prisma/client";

// ensure only once instance is used in development
const prisma = new PrismaClient();

export default prisma;
