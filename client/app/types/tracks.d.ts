export interface TrackForm {
  file: File;
  name: string;
  trackType: number;
  genre: number;
  mood: number;
  tags: number[];
  bpm: number;
  price: number;
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
