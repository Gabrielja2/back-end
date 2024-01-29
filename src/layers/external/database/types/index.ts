import { Prisma, PrismaClient } from "@prisma/client";

export type Context = PrismaClient<
    Prisma.PrismaClientOptions,
    never> | Prisma.TransactionClient | PrismaClient;



