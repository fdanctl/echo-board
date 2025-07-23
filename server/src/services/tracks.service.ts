import { createOneTrack } from "../models/track.model";
import { NewTrack, PostTrack } from "../types/track";

export const insertOneTrack = async (
  data: PostTrack,
  userId: string,
  file: Express.Multer.File,
) => {
  const newTrack: NewTrack = {
    userId: userId,
    trackUrl: file.path,
    name: data.name,
    trackTypeId: data.trackType,
    genreId: data.genre,
    moodId: data.mood,
    tagsId: data.tags,
    bpm: data.bpm,
    price: data.price,
  };

  console.log("hello")

  const res = await createOneTrack(newTrack);
  return {
    id: res.id,
    name: res.name,
  };
};
