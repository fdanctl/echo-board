import { createOneComment } from "../models/comment.model";
import {
  createOneLike,
  deleteOneLike,
  readLikedByUser,
} from "../models/like.model";
import {
  createOneTrack,
  readOneTrack,
  readManyTracks,
  readProducerTracks,
} from "../models/track.model";
import { addOneTrackPlay } from "../models/trackPlay.model";
import {
  Filters,
  NewTrack,
  NewTrackComment,
  PostTrack,
  TrackInfo2,
} from "../types/track";
import ApiError from "../utils/apiError";

export const getManyTracks = async (f: Filters, userId?: string) => {
  const tracks = await readManyTracks(f ?? undefined, userId);
  // console.log(track);
  const theTracks: TrackInfo2[] = tracks.map((track) => ({
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
    isLikedByUser: track.Like ? track.Like.length !== 0 : false,
  }));

  return theTracks;
};

export const getOneTrack = async (trackId: string, userId?: string) => {
  const track = await readOneTrack(trackId);
  if (track === null) {
    throw new ApiError(400, "No track found");
  }

  const isLiked = userId && (await readLikedByUser(userId, trackId));
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

export const getProducerTracks = async (producerUsername: string) => {
  const tracks = await readProducerTracks(producerUsername);
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

export const insertOneTrack = async (
  data: PostTrack,
  userId: string,
  track: Express.Multer.File,
  img: Express.Multer.File,
) => {
  const newTrack: NewTrack = {
    userId: userId,
    trackUrl: track.path.replace(/^src/, ""),
    imgUrl: img.path.replace(/^src/, ""),
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

export const playOneTrack = async (data: {
  userId?: string;
  trackId: string;
}) => {
  const track = await readOneTrack(data.trackId);

  if (!track) {
    throw new ApiError(400, "Track doesn't exist");
  }

  const res = await addOneTrackPlay(data);

  if (!res) {
    throw new ApiError(500, "Internal server error");
  }
  return res;
};
