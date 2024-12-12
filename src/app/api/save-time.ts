import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';  // Assuming you have Prisma set up

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, time } = req.body;

    try {
      await prisma.availableTime.create({
        data: {
          date: new Date(date),
          time: time,
        },
      });

      res.status(200).json({ message: 'Time saved successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save time' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
