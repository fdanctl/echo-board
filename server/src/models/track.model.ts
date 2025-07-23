import prisma from "../config/prismaClient";
import { NewTrack } from "../types/track";

export const readOneTrack = async (id: string) => {
  return await prisma.track.findUnique({
    include: {
      User: {
        select: {
          id: true,
          name: true,
        },
      },
      trackType: true,
      genre: true,
      Mood: true,
      Tag: true,
      Comment: {
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      },
      _count: {
        select: {
          Like: true,
          TrackPlay: true,
          Comment: true,
        },
      },
    },
    where: {
      id: id,
    },
  });
};

export const createOneTrack = async (data: NewTrack) => {
  const { tagsId, ...rest } = data;
  return await prisma.track.create({
    data: {
      ...rest,
      Tag: {
        connect: tagsId.map((id) => ({ id })),
      },
    },
  });
};
