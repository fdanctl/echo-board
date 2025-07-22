import { Genre, Mood, Tag, TrackType } from "@prisma/client";

export type source = "mood" | "tag" | "genre" | "trackType";

export interface TrackOptions {
  trackType: TrackType[];
  mood: Mood[];
  tag: Tag[];
  genre: Genre[];
}

export interface TrackOptionsDBRes {
  id: number;
  name: string;
  source: source
}
