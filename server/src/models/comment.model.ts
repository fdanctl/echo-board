import prisma from "../config/prismaClient";
import { NewTrackComment } from "../types/track";

export const createOneComment = async (data: NewTrackComment) => {
  return await prisma.comment.create({ data, select: { id: true } });
};
