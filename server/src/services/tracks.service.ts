import { createOneComment } from "../models/comment.model";
import { createOneLike, deleteOneLike, readLikedByUser } from "../models/like.model";
import {
  createOneTrack,
  readOneTrack,
  readManyTracks,
} from "../models/track.model";
import { NewTrack, NewTrackComment, PostTrack, TrackInfo, TrackInfo2 } from "../types/track";
import ApiError from "../utils/apiError";

export const getManyTracks = async (q?: string) => {
  const tracks = await readManyTracks(q ?? undefined);
  // console.log(track);
  const theTracks = tracks.map((track) => ({
    id: track.id,
    url: track.trackUrl,
    imgUrl: track.imgUrl,
    name: track.name,
    genre: track.genre,
    tags: track.Tag,
    author: track.User,
    stats: track._count,
    publishAt: track.publishAt,
    price: track.price,
    bpm: track.bpm,
    comments: track.Comment,
  }));

  return theTracks;
};

export const getOneTrack = async (trackId: string, userId?: string) => {
  const track = await readOneTrack(trackId);
  if (track === null) {
    throw new ApiError(400, "No track found");
  }

  const isLiked = userId && await readLikedByUser(userId, trackId)
  // console.log(track);

  const theTrack: TrackInfo2 = {
    id: track.id,
    url: track.trackUrl,
    imgUrl: track.imgUrl,
    name: track.name,
    genre: track.genre,
    tags: track.Tag,
    author: track.User,
    stats: track._count,
    publishAt: track.publishAt,
    price: track.price,
    bpm: track.bpm,
    comments: track.Comment,
    isLikedByUser: !!isLiked,
  };

  return theTrack;
};

export const insertOneTrack = async (
  data: PostTrack,
  userId: string,
  track: Express.Multer.File,
  img: Express.Multer.File,
) => {
  const newTrack: NewTrack = {
    userId: userId,
    trackUrl: track.path,
    imgUrl: img.path,
    name: data.name,
    trackTypeId: data.trackType,
    genreId: data.genre,
    moodId: data.mood,
    tagsId: data.tags,
    bpm: data.bpm,
    price: data.price,
  };

  const res = await createOneTrack(newTrack);
  return {
    id: res.id,
    name: res.name,
  };
};

export const insertOneComment = async (data: NewTrackComment) => {
  const track = await readOneTrack(data.trackId);

  if (!track) {
    throw new ApiError(400, "Track doesn't exist");
  }

  const res = await createOneComment(data);

  if (!res) {
    throw new ApiError(500, "Internal server error");
  }
  return res;
};

export const likeOneTrack = async (data: {
  userId: string;
  trackId: string;
}) => { 
  const track = await readOneTrack(data.trackId);

  if (!track) {
    throw new ApiError(400, "Track doesn't exist");
  }

  const res = await createOneLike(data);

  if (!res) {
    throw new ApiError(500, "Internal server error");
  }
  return res;
};

export const unlikeOneTrack = async (data: {
  userId: string;
  trackId: string;
}) => { 
  const track = await readOneTrack(data.trackId);

  if (!track) {
    throw new ApiError(400, "Track doesn't exist");
  }

  const res = await deleteOneLike(data);

  if (!res) {
    throw new ApiError(500, "Internal server error");
  }
  return res;
};
