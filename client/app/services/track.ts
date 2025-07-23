import type { TrackForm } from "~/types/tracks";
import { BASE_URL } from "./api";

export const postTrack = (data: TrackForm) => {
  return fetch(`${BASE_URL}/tracks/new`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data)
  });
  }

