import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types/api";
import { TrackOptions } from "../types/trackOptions";
import { getAllTrackOptionsService } from "../services/trackOptions.service";

export const getAllTrackOptions = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const options = await getAllTrackOptionsService()

    const response: ApiResponse<TrackOptions> = { 
      success: true,
      data: options,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
