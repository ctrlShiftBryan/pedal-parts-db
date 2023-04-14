// pages/api/pedals/[id]/parts/[pedalPartId].tsx

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, pedalPartId } = req.query;

  if (req.method === 'DELETE') {
    await prisma.pedalPart.delete({
      where: { id: Number(pedalPartId) },
    });

    res.status(200).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
