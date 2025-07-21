import type { ApiResponse } from "~/types/api";
import { refresh } from "./auth";

export const BASE_URL = "http://localhost:4000/api";

export const authenticatedFetch = async <T>(
  fetchFn: () => Promise<Response> 
): Promise<T> => {
  let res = await fetchFn();

  if (res.status === 401) {
    const refreshed = await refresh();
    if (refreshed) {
      res = await fetchFn();
    } else {
      throw new Error("Session expired");
    }
  }

  const json = (await res.json()) as ApiResponse<T>;

  if (json.success) {
    return json.data;
  } else {
    throw new Error(`Failed to fetch: ${json.error}`);
  }
};
