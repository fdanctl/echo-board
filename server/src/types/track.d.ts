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
  imgUrl: string;
  userId: string;
}

export interface PostTrackRes {
  id: string;
  name: string;
}

export interface TrackInfo {
  id: string;
  url: string;
  name: string;
  genre: {
    id: number;
    name: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  author: {
    id: string;
    name: string;
  };
  stats: {
    TrackPlay: number;
    Like: number;
    Comment: number;
  };
  publishAt: Date;
  price: number;
  bpm: number;
  comments: {
    id: number;
    userId: string;
    createdAt: Date;
    trackId: string;
    content: string;
  }[];
}
