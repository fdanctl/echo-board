import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createOneUser, readOneUserByEmail } from "../models/user.model";
import { Credentials, NewUser } from "../types/auth";
import { User } from "@prisma/client";
import { NewRefreshToken } from "../types/refreshToken";
import {
  createOneRefreshToken,
  readOneRefreshTokenByHash,
  revokeOneRefreshToken,
} from "../models/refreshToken.model";
import ApiError from "../utils/apiError";
import {
  genJwtTokken,
  hashToken,
  refreshTokenExpiryDays,
} from "../utils/token";

export const registerUser = async (data: NewUser) => {
  const user = await readOneUserByEmail(data.email);
  if (user) {
    throw new ApiError(400, "Email in use");
  }

  const hashedPassword = bcrypt.hashSync(data.password, 8);

  const newUserData: NewUser = {
    email: data.email,
    password: hashedPassword,
    name: data.name || data.email.split("@")[0],
    username: data.username,
    location: data.location,
  };

  const newUser = await createOneUser(newUserData);

  const accessToken = genJwtTokken(newUser.id, "access");
  const refreshToken = genJwtTokken(newUser.id, "refresh");

  const hashedRefreshToken = hashToken(refreshToken);

  const newRefreshTokenData: NewRefreshToken = {
    userId: newUser.id,
    token: hashedRefreshToken,
    expiresAt: new Date(
      Date.now() + refreshTokenExpiryDays * 24 * 60 * 60 * 1000,
    ),
    revoked: false,
  };

  await createOneRefreshToken(newRefreshTokenData);

  return {
    user: newUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const loginUser = async (
  c: Credentials,
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  const user = await readOneUserByEmail(c.email);
  if (!user) {
    throw new ApiError(404, "Email not found");
  }

  if (!user.password) {
    throw new ApiError(303, "Sign in with Google");
  }

  const isPasswordValid = bcrypt.compareSync(c.password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Incorrect password");
  }

  const accessToken = genJwtTokken(user.id, "access");
  const refreshToken = genJwtTokken(user.id, "refresh");

  const hashedRefreshToken = hashToken(refreshToken);

  const newRefreshTokenData: NewRefreshToken = {
    userId: user.id,
    token: hashedRefreshToken,
    expiresAt: new Date(
      Date.now() + refreshTokenExpiryDays * 24 * 60 * 60 * 1000,
    ),
    revoked: false,
  };

  await createOneRefreshToken(newRefreshTokenData);

  return {
    user: user,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const logoutUser = async (token: string) => {
  const tokenHash = hashToken(token);
  await revokeOneRefreshToken(tokenHash);
  return;
};

export const refreshAccessToken = async (token: string) => {
  const tokenHash = hashToken(token);
  const storedToken = await readOneRefreshTokenByHash(tokenHash);

  if (!storedToken) {
    throw new ApiError(403, "Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await revokeOneRefreshToken(storedToken.token);
    throw new ApiError(403, "Refresh token expired");
  }

  try {
    const user = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);

    if (typeof user.sub !== "string") {
      throw new ApiError(403, "Invalid token");
    }

    const newAccessToken = genJwtTokken(user.sub, "access", false);
    return newAccessToken;
  } catch (error) {
    throw new ApiError(403, "Invalid or expired token");
  }
};
