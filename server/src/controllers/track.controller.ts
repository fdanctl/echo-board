import { NextFunction, Response, Request } from "express";
import { ApiResponse, AuthenticatedRequest } from "../types/api";
import {
  Filters,
  PostTrack,
  PostTrackReq,
  PostTrackRes,
  TrackCommentReq,
  TrackInfo,
} from "../types/track";
import ApiError from "../utils/apiError";
import {
  insertOneTrack,
  getOneTrack,
  getManyTracks,
  insertOneComment,
  likeOneTrack,
  unlikeOneTrack,
  getProducerTracks,
  playOneTrack,
} from "../services/tracks.service";

export const getTracks = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let userId = req.user?.sub;

    if (userId && typeof userId !== "string") {
      userId = undefined;
    }

    const body: Filters = req.body;
    const track = await getManyTracks(body, userId);

    const response: ApiResponse<TrackInfo[]> = {
      success: true,
      data: track,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getTrack = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const trackId = req.params.id;
  try {
    let userId = req.user?.sub;

    if (userId && typeof userId !== "string") {
      userId = undefined;
    }

    const track = await getOneTrack(trackId, userId);

    const response: ApiResponse<TrackInfo> = {
      success: true,
      data: track,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getUserTracks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const username = req.params.username;
  try {
    const tracks = await getProducerTracks(username);

    const response: ApiResponse<TrackInfo[]> = {
      success: true,
      data: tracks,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const commentTrack = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: TrackCommentReq = req.body;
    const trackId = req.params.id;
    const userId = req.user?.sub;

    if (typeof userId !== "string") {
      throw new ApiError(500, "Internal server error");
    }

    if (!body.content || body.content === "") {
      throw new ApiError(400, "Invalid or missing params");
    }
    await insertOneComment({ ...body, trackId, userId });

    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: {
        message: "Track commented",
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const likeTrack = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trackId = req.params.id;
    const userId = req.user?.sub;

    if (typeof userId !== "string") {
      throw new ApiError(500, "Internal server error");
    }

    await likeOneTrack({ trackId, userId });
    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: {
        message: "Track liked",
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const unlikeTrack = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trackId = req.params.id;
    const userId = req.user?.sub;

    if (typeof userId !== "string") {
      throw new ApiError(500, "Internal server error");
    }

    await unlikeOneTrack({ trackId, userId });
    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: {
        message: "Track unliked",
      },
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const playTrack = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trackId = req.params.id;
    const userId = req.user?.sub;
    console.log("userId: ", userId);

    if (userId && typeof userId !== "string") {
      throw new ApiError(500, "Internal server error");
    }

    await playOneTrack({ trackId, userId });
    const response: ApiResponse<{ message: string }> = {
      success: true,
      data: {
        message: "Track played",
      },
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
