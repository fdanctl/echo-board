import type { ApiResponse } from "~/types/api";
import type { VideosResponse } from "~/types/video";
import { BASE_URL } from "./api";

export const uploadVideo = async (data: FormData) => {
  const file = data.get("file") as File;
  // const url = data.get("url") as string;
  data.delete("uploadType");

  if (file) {
    data.append("uploadType", "LOCAL");
  } else {
    data.append("uploadType", "URL");
  }

  return await fetch(`${BASE_URL}/videos/upload`, {
    method: "POST",
    credentials: "include",
    body: data,
  });
};
