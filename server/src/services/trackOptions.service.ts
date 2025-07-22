import { TrackType } from "@prisma/client";
import { source, TrackOptions } from "../types/trackOptions";
import { readAllTrackOptions } from "../models/trackOptions.model";

export const getAllTrackOptionsService = async () => {
  const options = await readAllTrackOptions();

  const filterOptions = (source: source) => {
    return options
      .filter((e) => e.source === source)
      .map((e) => ({ id: e.id, name: e.name }));
  };

  const trackOptions: TrackOptions = {
    trackType: Object.values(TrackType),
    mood: filterOptions("mood"),
    tag: filterOptions("tag"),
    genre: filterOptions("genre"),
  };

  return trackOptions;
};
