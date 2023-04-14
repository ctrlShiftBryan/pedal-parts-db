// lib/api.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllPedals() {
  return await prisma.pedal.findMany();
}
