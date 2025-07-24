import { createOneTrack, readOneTrack } from "../models/track.model";
import { NewTrack, PostTrack } from "../types/track";
import ApiError from "../utils/apiError";

export const getOneTrack = async (trackId: string) => {
  const track = await readOneTrack(trackId);
  if (track === null) {
    throw new ApiError(400, "No track found");
  }
  console.log(track);

  const theTrack = {
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
