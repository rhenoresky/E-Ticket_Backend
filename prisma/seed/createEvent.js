import { prisma } from "../../src/db/prisma";

const createEvent = async () => {
  const event = await prisma.event.create({
    data: {
      name: "Music Festival",
      description: "A grand music festival featuring top artists.",
      location: "Central Park",
      startTime: "2024-07-01T18:00:00.000Z",
      finishTime: "2024-07-01T23:00:00.000Z",
    },
    select: { id: true },
  });

  console.log(`success id = ${event.id}`);
};

await createEvent();
