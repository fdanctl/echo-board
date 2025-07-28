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
  imgUrl: string;
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
    username: string;
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
    User: {
      name: string;
      username: string;
      avatarUrl: string | null;
    };
    id: number;
    userId: string;
    createdAt: Date;
    trackId: string;
    content: string;
  }[];
}

export interface TrackInfo2 {
  // temp TODO DELETE
  id: string;
  url: string;
  imgUrl: string;
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
    username: string;
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
    User: {
      name: string;
      username: string;
      avatarUrl: string | null;
    };
    id: number;
    userId: string;
    createdAt: Date;
    trackId: string;
    content: string;
  }[];
  isLikedByUser: boolean;
}
export interface TrackCommentReq {
  content: string;
}

export interface NewTrackComment extends TrackCommentReq {
  userId: string;
  trackId: string;
}

export interface Filters {
  q: string;
  trackTypes: number[];
  moods: number[];
  genres: number[];
  tags: number[];
  keys: number[];
}
