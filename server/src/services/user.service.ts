import { readOneUserByUsername } from "../models/user.model";
import { UserInfo } from "../types/user";
import ApiError from "../utils/apiError";

export const getUserInfo = async (username: string) => {
  const user = await readOneUserByUsername(username);
  if (user === null) {
    throw new ApiError(400, "No user with that username found");
  }

  const userInfo: UserInfo = {
    name: user.name,
    username: user.username,
    location: user.location,
    tracks: user._count.Track,
    likes: 0,
    plays: 0,
  };

  if (user._count.Track > 0) {
    // TODO all tracks likes and plays
  }

  return userInfo;
};
