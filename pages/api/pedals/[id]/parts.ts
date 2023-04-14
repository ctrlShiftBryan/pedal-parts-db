// pages/api/pedals/[id]/parts.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'POST') {
    const {
      count,
      part,
      type,
      value,
      order,
      ordered,
      polarized // Add this line
    } = req.body;


    try {
      const newPedalPart = await prisma.$transaction(async (prisma: any) => {
        const existingPart = await prisma.part.findUnique({
          where: {
            type_value: {
              type: type,
              value: value,
            },
          },
        });

        let newPart;

        if (!existingPart) {
          newPart = await prisma.part.create({
            data: {
              type,
              value,
              order,
              ordered,
            },
          });
        } else {
          newPart = existingPart;
        }

        const createdPedalPart = await prisma.pedalPart.create({
          data: {
            count,
            partNum: part,
            partId: newPart.id,
            pedalId: parseInt(id as string),
            polarized
          },
        });

        return createdPedalPart;
      });

      res.json(newPedalPart);
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
