import { NextFunction, Response, Request } from "express";
import { ApiResponse, AuthenticatedRequest } from "../types/api";
import {
  PostTrack,
  PostTrackReq,
  PostTrackRes,
  TrackInfo,
} from "../types/track";
import ApiError from "../utils/apiError";
import { insertOneTrack, getOneTrack } from "../services/tracks.service";

export const getTrack = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const trackId = req.params.id;
  try {
    const track = await getOneTrack(trackId);

    const response: ApiResponse<TrackInfo> = {
      success: true,
      data: track,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
export const postTrack = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: PostTrackReq = req.body;
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    const img = files["img"][0];
    const track = files["track"][0];
    const userId = req.user?.sub;

    if (typeof userId !== "string") {
      throw new ApiError(500, "Internal server error");
    }

    // TODO fix spaghetti

    if (
      !img ||
      !track ||
      !body.name ||
      !body.trackType ||
      !body.genre ||
      !body.mood ||
      !body.bpm ||
      !body.price
    ) {
      throw new ApiError(400, "Missing params");
    }

    // tags can be string string[] or non existant
    let tags: number[];
    if (!body.tags) {
      tags = [];
    } else if (typeof body.tags === "string") {
      tags = [Number(body.tags)];
    } else {
      tags = body.tags.map((t) => Number(t));
    }

    const postTrack: PostTrack = {
      name: body.name,
      trackType: Number(body.trackType),
      genre: Number(body.trackType),
      mood: Number(body.trackType),
      tags: tags,
      bpm: Number(body.trackType),
      price: Number(body.trackType),
    };

    const data = await insertOneTrack(postTrack, userId, track, img);

    const response: ApiResponse<PostTrackRes> = {
      success: true,
      data: data,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
