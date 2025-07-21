import { JwtPayloadCustom, TokenType } from "../types/auth";
import crypto from "crypto";
import { CookieOptions } from "express";
import jwt from "jsonwebtoken";

export const accessTokenExpiry = 15;
export const refreshTokenExpiryDays = 30;

export const accessCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false, // use HTTPS in production
  sameSite: "lax",
  path: "/",
  maxAge: accessTokenExpiry * 60 * 1000
};

export const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: false, // use HTTPS in production
  sameSite: "lax",
  path: "api/auth/refresh",
  maxAge: refreshTokenExpiryDays * 24 * 60 * 60 * 1000,
};

export const genJwtTokken = (
  userId: string,
  tokenType: TokenType,
  isFresh?: boolean,
) => {
  const tokenPayload: JwtPayloadCustom = {
    sub: userId,
    tokenType: tokenType,
    isFresh: isFresh !== undefined ? isFresh : tokenType === "access",
  };

  const token = jwt.sign(
    tokenPayload,
    tokenType === "access"
      ? (process.env.ACCESS_TOKEN_SECRET as string)
      : (process.env.REFRESH_TOKEN_SECRET as string),
    {
      expiresIn:
        tokenType === "access"
          ? `${accessTokenExpiry}m`
          : `${refreshTokenExpiryDays}d`,
    },
  );
  return token;
};

export const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
