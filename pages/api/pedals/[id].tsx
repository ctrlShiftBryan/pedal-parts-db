// pages/api/pedals/[id].tsx

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const pedal = await prisma.pedal.findUnique({
      where: { id: Number(id) },
      include: {
        PedalPart: {
          include: {
            part: true,
          },
          orderBy: {
            createdAt: 'asc',  // Order by PedalPart created date in ascending order
          },
        },
      },
    });
    res.json(pedal);
  } else if (req.method === 'PUT') {
    const { name, buildDocUrl, pcbUrl } = req.body;
    const updatedPedal = await prisma.pedal.update({
      where: { id: Number(id) },
      data: { name, buildDocUrl, pcbUrl },
    });
    res.json(updatedPedal);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
