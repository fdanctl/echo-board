import { Genre, Key, Mood, Tag, TrackType } from "@prisma/client";

export type source = "mood" | "tag" | "genre" | "trackType" | "key";

export interface TrackOptions {
  trackType: TrackType[];
  mood: Mood[];
  tag: Tag[];
  genre: Genre[];
  key: Key[];
}

export interface TrackOptionsDBRes {
  id: number;
  name: string;
  source: source;
}
