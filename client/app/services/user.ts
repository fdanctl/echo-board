import type { ApiResponse } from "~/types/api";
import { BASE_URL } from "./api";
import type { UserInfo } from "~/types/user";

export const getUserInfo = async (username: string) => {
  const res = await fetch(`${BASE_URL}/user/${username}`, {
    method: "GET",
  });

  const json = (await res.json()) as ApiResponse<UserInfo>;

  if (json.success) {
    console.log(json.data)
    return json.data;
  } else {
    throw new Error(`Failed to fetch: ${json.error}`);
  }
};
