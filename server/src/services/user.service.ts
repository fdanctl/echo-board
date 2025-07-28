import { readOneUserByUsername } from "../models/user.model";
import { UserInfo } from "../types/user";
import ApiError from "../utils/apiError";

export const getUserInfo = async (username: string) => {
  const user = await readOneUserByUsername(username);
  if (user === null) {
    throw new ApiError(400, "No user with that username found");
  }

  console.log("userInfo", user)

  const userInfo: UserInfo = {
    name: user.name,
    username: user.username,
    location: user.location,
    followers: 0,
    tracksN: user._count.Track,
    plays: user.Track.reduce((acc, play) => acc + play._count.TrackPlay, 0),
  };

  return userInfo;
};
