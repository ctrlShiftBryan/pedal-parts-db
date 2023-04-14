// pages/api/pedals/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const pedals = await prisma.pedal.findMany();
    res.json(pedals);
  } else if (req.method === 'POST') {
    const { name,
      pcbUrl, buildDocUrl
    } = req.body;
    const newPedal = await prisma.pedal.create({ data: { name, pcbUrl, buildDocUrl } });
    res.json(newPedal);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
