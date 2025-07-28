import prisma from "../config/prismaClient";
import { NewUser } from "../types/auth";

export const createOneUser = async (data: NewUser) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      avatarUrl: true,
      createdAt: true,
    },
  });
};

export const readOneUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email: email } });
};

export const readOneUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: { username: username },
    include: {
      _count: {
        select: {
          Track: true,
          Follower: true,
        },
      },
      Track: {
        include: {
          _count: {
            select: {
              TrackPlay: true,
            },
          },
        },
      },
    },
  });
};
