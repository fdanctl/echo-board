import { NextFunction, Request, Response } from "express";
import { AuthResponse, Credentials, NewUser } from "../types/auth";
import { ApiResponse } from "../types/api";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../services/auth.service";
import ApiError from "../utils/apiError";
import { accessCookieOptions, refreshCookieOptions } from "../utils/token";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: NewUser = req.body;

    if (
      !body?.email ||
      !body?.password ||
      body?.email === "" ||
      body?.password === ""
    ) {
      throw new ApiError(400, "Missing email or password");
    }
    if (!body.email.includes("@")) {
      throw new ApiError(400, "Invalid email");
    }

    if (!body?.location || body?.location === "") {
      throw new ApiError(400, "Missing location");
    }

    if (!body?.username || body?.username === "") {
      throw new ApiError(400, "Missing username");
    }

    const result = await registerUser(body);
    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        id: result.user.id,
        email: result.user.email,
        username: result.user.username,
      },
    };
    console.log("at: ", result.accessToken);
    console.log("rt: ", result.refreshToken);

    res
      .status(200)
      .cookie("accessToken", result.accessToken, accessCookieOptions)
      .cookie("refreshToken", result.refreshToken, refreshCookieOptions)
      .json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: Credentials = req.body;

    if (
      !body?.email ||
      !body?.password ||
      body?.email === "" ||
      body?.password === ""
    ) {
      throw new ApiError(400, "Missing email or password");
    }
    if (!body.email.includes("@")) {
      throw new ApiError(400, "Invalid email");
    }

    const result = await loginUser(body);
    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        id: result.user.id,
        email: result.user.email,
        username: result.user.username,
      },
    };
    res
      .status(200)
      .cookie("accessToken", result.accessToken, accessCookieOptions)
      .cookie("refreshToken", result.refreshToken, refreshCookieOptions)
      .json(response);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) {
      throw new ApiError(400, "Refresh token not sent");
    }

    logoutUser(token);

    res.clearCookie("refreshToken", refreshCookieOptions);
    res.clearCookie("accessToken", accessCookieOptions);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw new ApiError(400, "Refresh token not sent");
    }

    const newAccessToken = await refreshAccessToken(token);

    res
      .cookie("accessToken", newAccessToken.newAccessToken, accessCookieOptions)
      .send(200)
      .json(newAccessToken.user);
  } catch (error) {
    next(error);
  }
};
