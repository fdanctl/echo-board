import { NextFunction, Response, Request } from "express";
import { ApiResponse, AuthenticatedRequest } from "../types/api";
import { PostTrack, PostTrackReq, PostTrackRes, TrackInfo } from "../types/track";
import ApiError from "../utils/apiError";
import { insertOneTrack, getOneTrack } from "../services/tracks.service";

export const getTrack = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const trackId = req.params.id;
  console.log("trackId: ", trackId)
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
    const file: Express.Multer.File | undefined = req.file;
    const userId = req.user?.sub;

    if (typeof userId !== "string") {
      throw new ApiError(500, "Internal server error");
    }

    // TODO fix spaghetti

    if (
      !file ||
      !body.name ||
      !body.trackType ||
      !body.genre ||
      !body.mood ||
      !body.bpm ||
      !body.price
    ) {
      throw new ApiError(400, "Missing params");
    }
    console.log(body);

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

    console.log(postTrack);

    const data = await insertOneTrack(postTrack, userId, file);

    const response: ApiResponse<PostTrackRes> = {
      success: true,
      data: data,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
