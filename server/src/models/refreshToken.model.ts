import prisma from "../config/prismaClient";
import { NewRefreshToken } from "../types/refreshToken";

export const createOneRefreshToken = async (data: NewRefreshToken) => {
  return await prisma.refreshToken.create({ data, select: { id: true } });
};

export const revokeOneRefreshToken = async (tokenHash: string) => {
  return await prisma.refreshToken.update({
    where: { token: tokenHash },
    data: { revoked: true },
  });
};

export const readOneRefreshTokenByHash = async (tokenHash: string) => {
  return await prisma.refreshToken.findUnique({ where: { token: tokenHash } });
};
