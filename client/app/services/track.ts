import type { ApiResponse } from "~/types/api";
import { BASE_URL, BASE_URL_CLIENT } from "./api";
import type { Filters, TrackInfo } from "~/types/tracks";

export const postTrack = async (data: FormData) => {
  return await fetch(`${BASE_URL_CLIENT}/tracks/new`, {
    method: "POST",
    credentials: "include",
    body: data,
  });
};

export const getTracks = async (filters: Filters) => {
  const res = await fetch(`${BASE_URL}/tracks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });

  const json = (await res.json()) as ApiResponse<TrackInfo[]>;

  if (json.success) {
    return json.data;
  } else {
    throw new Error(`Failed to fetch: ${json.error}`);
  }
};

export const getTrack = async (id: string, cookie: string | null) => {
  const headers: HeadersInit = {};

  if (cookie) {
    headers["cookie"] = cookie;
  }

  const res = await fetch(`${BASE_URL}/tracks/${id}`, {
    method: "GET",
    headers,
  });

  const json = (await res.json()) as ApiResponse<TrackInfo>;

  if (json.success) {
    return json.data;
  } else {
    throw new Error(`Failed to fetch: ${json.error}`);
  }
};

export const getUserTracks = async (username: string) => {
  const res = await fetch(`${BASE_URL}/tracks/user/${username}`, {
    method: "GET",
  });

  const json = (await res.json()) as ApiResponse<TrackInfo[]>;

  if (json.success) {
    return json.data;
  } else {
    throw new Error(`Failed to fetch: ${json.error}`);
  }
};

export const commentTrack = async (content: string, id: string) => {
  return await fetch(`${BASE_URL_CLIENT}/tracks/${id}/comment`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content }),
  });
};

export const likeTrack = async (id: string) => {
  return await fetch(`${BASE_URL_CLIENT}/tracks/${id}/like`, {
    method: "POST",
    credentials: "include",
  });
};

export const unlikeTrack = async (id: string) => {
  return await fetch(`${BASE_URL_CLIENT}/tracks/${id}/unlike`, {
    method: "POST",
    credentials: "include",
  });
};

export const playTrack = async (id: string) => {
  return await fetch(`${BASE_URL_CLIENT}/tracks/${id}/play`, {
    method: "POST",
    credentials: "include",
  });
};
