import { BASE_URL } from "./api";

export const postTrack = (data: FormData) => {
  return fetch(`${BASE_URL}/tracks/new`, {
    method: "POST",
    credentials: "include",
    body: data
  });
  }

