import prisma from "../config/prismaClient";

export const createOneLike = async (data: {
  userId: string;
  trackId: string;
}) => {
  return await prisma.like.create({ data, select: { id: true } });
};

export const deleteOneLike = async (data: {
  userId: string;
  trackId: string;
}) => {
  return await prisma.like.delete({
    where: {
      userId_trackId: {
        userId: data.userId,
        trackId: data.trackId,
      },
    },
  });
};
