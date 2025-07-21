import { Request, Response, NextFunction } from "express";
import { getUserInfo } from "../services/user.service";
import { ApiResponse } from "../types/api";

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const username = req.params.username;
  try {
    const user = await getUserInfo(username);

    const response: ApiResponse<any> = { // TODO change
      success: true,
      data: user,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
