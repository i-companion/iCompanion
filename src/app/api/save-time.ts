import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';  // Assuming you have Prisma set up
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from "@/lib/page-protection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { date, time } = req.body;

    try {
      const session = await getServerSession(authOptions);
      loggedInProtectedPage(
          session as {
            user: { email: string; id: string; randomKey: string };
          } | null,
        );
      const loggedInUserEmail = session?.user?.email;
      await prisma.availableTime.create({
        data: {
          date: new Date(date),
          time: time,
          user: {
            connect: { email: loggedInUserEmail as string },
          },
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
