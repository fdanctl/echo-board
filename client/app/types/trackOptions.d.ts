export type source = "mood" | "tag" | "genre";

export interface Options {
  id: number;
  name: string;
}

export interface TrackOptions {
  trackType: TrackType[];
  mood: Options[];
  tag: Options[];
  genre: Options[];
}

export interface TrackOptionsDBRes {
  id: number;
  name: string;
  source: source
}

