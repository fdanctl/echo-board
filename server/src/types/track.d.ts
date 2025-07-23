import { Track } from "@prisma/client";

export interface PostTrackReq {
  name: string;
  trackType: string;
  genre: string;
  mood: string;
  tags: string[];
  bpm: string;
  price: string;
}

export interface PostTrack {
  name: string;
  trackType: number;
  genre: number;
  mood: number;
  tags: number[];
  bpm: number;
  price: number;
}

export interface NewTrack {
  name: string;
  trackTypeId: number;
  genreId: number;
  moodId: number;
  tagsId: number[];
  bpm: number;
  price: number;
  trackUrl: string;
  userId: string;
}

export interface PostTrackRes {
  id: string;
  name: string;
}
