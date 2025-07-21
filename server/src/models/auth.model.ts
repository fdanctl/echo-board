import prisma from "../config/prismaClient";
import { NewUser } from "../types/auth";

export const createOneUser = async (data: NewUser) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      tier: true,
      name: true,
      emailVerifiedAt: true,
      createdAt: true,
    },
  });
};

export const readOneUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email: email } });
};
