import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { date, time, userId } = req.body;

    try {
      // Remove the selected time for the user
      await prisma.availableTime.deleteMany({
        where: {
          date: new Date(date),
          time,
          userId,
        },
      });

      res.status(200).json({ message: 'Available time removed successfully!' });
    } catch (error) {
      console.error('Error removing available time:', error);
      res.status(500).json({ error: 'Could not remove available time.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
