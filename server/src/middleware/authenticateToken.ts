import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayloadCustom } from "../types/auth";
import { AuthenticatedRequest } from "../types/api";

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    res.status(401).json("Authentication token missing");
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as JwtPayloadCustom;

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return
  }
};
