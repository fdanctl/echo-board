import prisma from "../config/prismaClient";

export const addOneTrackPlay = async (data: {
  userId?: string;
  trackId: string;
}) => {
  return await prisma.trackPlay.create({ data, select: { id: true } });
};
