// src/pages/api/availableTimes.ts (or similar location)
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { date, time } = req.body;

      // Check if the available time already exists for that date
      const existingTime = await prisma.availableTime.findFirst({
        where: { date: new Date(date), time },
      });

      if (existingTime) {
        return res.status(400).json({ message: "This time slot is already taken." });
      }

      // Create a new available time
      const newAvailableTime = await prisma.availableTime.create({
        data: {
          date: new Date(date),
          time: time,
        },
      });

      res.status(200).json(newAvailableTime);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating available time" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}