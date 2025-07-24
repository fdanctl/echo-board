export type source = "mood" | "tag" | "genre" | "trackType" | "key";

export interface Options {
  id: number;
  name: string;
}

export interface TrackOptions {
  trackType: Options[];
  mood: Options[];
  tag: Options[];
  genre: Options[];
  key: Options[];
}

export interface TrackOptionsDBRes {
  id: number;
  name: string;
  source: source;
}
