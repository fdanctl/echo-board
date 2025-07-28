import type { ApiResponse } from "~/types/api";
import { BASE_URL } from "./api";
import type { TrackOptions } from "~/types/trackOptions";

export const getTrackOptions = async () => {
  const res = await fetch(`${BASE_URL}/track-options`);
  console.log("server loader");

  const json = (await res.json()) as ApiResponse<TrackOptions>;

  if (json.success) {
    return json.data;
  } else {
    throw new Error(`Failed to fetch: ${json.error}`);
  }
}
