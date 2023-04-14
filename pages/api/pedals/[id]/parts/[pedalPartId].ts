// pages/api/pedals/[id]/parts/[pedalPartId].ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, pedalPartId } = req.query;

  if (req.method === 'PUT') {
    try {
      // Retrieve the current PedalPart
      const currentPedalPart = await prisma.pedalPart.findUnique({
        where: {
          id: parseInt(pedalPartId as string),
        },
      });

      // Toggle the polarized value
      const updatedPedalPart = await prisma.pedalPart.update({
        where: {
          id: parseInt(pedalPartId as string),
        },
        data: {
          polarized: !currentPedalPart?.polarized, // Use the opposite value of the current polarized state
        },
      });

      res.json(updatedPedalPart);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  } else if (req.method === 'DELETE') {

    await prisma.pedalPart.delete({
      where: { id: Number(pedalPartId) },
    });

    res.status(200).end();
  }
  else {
    res.status(405).end(); // Method Not Allowed
  }
};
