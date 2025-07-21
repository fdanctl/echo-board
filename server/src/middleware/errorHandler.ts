import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import { ApiResponse } from "../types/api";

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const response: ApiResponse<void> = {
    success: false,
    error: err.statusCode ? err.message : "Internal server error",
  };
  res.status(statusCode).json(response);
};
