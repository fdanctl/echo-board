import prisma from "../config/prismaClient";
import { NewTrack } from "../types/track";

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
