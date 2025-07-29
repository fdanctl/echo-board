import { Heart, MessageCircle, Play, Repeat2 } from "lucide-react";
import type { Route } from "./+types/trackPage";
import { SecundaryBtn } from "~/components/SecundaryBtn";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { Input } from "~/components/Input";
import { Navbar } from "~/components/Navbar";
import {
  commentTrack,
  getTrack,
  likeTrack,
  unlikeTrack,
} from "~/services/track";
import { verifyCookie } from "~/lib/validators";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Form, redirect, useNavigate } from "react-router";
import { logout, refresh } from "~/services/auth";
import moment from "moment";
import { formatPrice } from "~/lib/utils";
import { authenticatedFetch } from "~/services/api";
import { parse } from "cookie";
import type { AuthResponse } from "~/types/auth";
import { useTrackContext } from "~/context/TrackContext";
import { useUserContext } from "~/context/UserContext";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  // TODO
  const url = new URL(request.url);

  const cookieHeader = request.headers.get("cookie");

  let decoded;
  if (cookieHeader) {
    decoded = verifyCookie(request);
  }
  console.log("decoded", decoded);
  if (cookieHeader && !decoded) {
    return redirect(`/api/auth/refresh?redirect=${url.href}`);
  }

  const track = await getTrack(params.track, cookieHeader);
  return {
    track,
  };
}

interface Comment {
  id: number;
  userId: string;
  createdAt: Date;
  trackId: string;
  User: {
    username: string;
    name: string;
    avatarUrl: string | null;
  };
  content: string;
}

export default function Track({ loaderData }: Route.ComponentProps) {
  const track = loaderData.track;
  const { user } = useUserContext();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState(track.comments);
  const [isLiked, setIsLiked] = useState(track.isLikedByUser);
  const { changeCurrTrack } = useTrackContext();
  const navigate = useNavigate();

  console.log(user);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const newUser = await refresh();
  //     setUser(newUser);
  //   };

  //   if (!user) {
  //     fetchUser();
  //   }
  // }, []);

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // optimistic add
    if (user) {
      const newComment: Comment = {
        id: comments.length + 1,
        userId: user?.id ?? "fall",
        createdAt: new Date(),
        User: {
          name: user?.name || "fall",
          username: user?.username || "fall",
          avatarUrl: user?.avatarUrl || null,
        },
        trackId: track.id,
        content: content,
      };
      setComments((ps) => [newComment].concat(ps));
      authenticatedFetch(() => commentTrack(content, track.id));
      setContent("");
    } else {
      console.log("please login");
    }
  };

  const handleLike = () => {
    // optimistic add
    if (user) {
      const cb = isLiked
        ? () => unlikeTrack(track.id)
        : () => likeTrack(track.id);

      setIsLiked((ps) => !ps);
      authenticatedFetch<{ message: string }>(cb);
    } else {
      console.log("please login");
    }
  };

  return (
    <>
      {/* HERO */}
      <div className="flex bg-slate-100 dark:bg-slate-600 justify-between mb-6 p-4">
        <div className="flex gap-3">
          <div className="aspect-square h-50 bg-gray-400 rounded-xs">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:4000${track.imgUrl}`}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div
              className="flex gap-2 mt-3"
              onClick={() => changeCurrTrack(track)}
            >
              <div className="aspect-square text-accent2 flex items-center justify-center bg-gray-400 w-fit h-fit p-3 rounded-full">
                <Play />
              </div>
              <div>
                <p className="text-xl font-medium truncate">{track.name}</p>
                <p
                  className="text-gray-600 whitespace-nowrap cursor-pointer"
                  onClick={() => navigate(`/user/${track.author.username}`)}
                >
                  {track.author.name}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="flex gap-0.5 items-center">
                <Play size={12} fill="none" />
                <p className="text-xs ">{track.stats.TrackPlay}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Heart size={12} fill="none" />
                <p className="text-xs ">{track.stats.Like}</p>
              </div>
              <div className="flex gap-1 items-center">
                <MessageCircle size={12} fill="none" />
                <p className="text-xs ">{track.stats.Comment}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right justify-self-end flex flex-col justify-between">
          <div>
            <p>{moment(track.publishAt).fromNow()}</p>
            <div className="flex flex-wrap gap-1 justify-end">
              {track.tags.map((e) => (
                <div
                  key={e.id}
                  className="whitespace-nowrap px-2 py-0.5 w-fit bg-gray-400 rounded-full cursor-pointer"
                  onClick={() => navigate(`/?tags=${e.id}`)}
                >
                  <p className="text-xs">#{e.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>
              <b>Price: </b>${formatPrice(track.price)}
            </p>
            <SecundaryBtn text="Add to cart" />
            <PrimaryBtn text="Buy Now" />
          </div>
        </div>
      </div>

      <div className="flex px-2">
        <div onClick={handleLike}>
          <Heart
            className={`${isLiked && "text-red-500"}`}
            fill={isLiked ? "#ef4444" : "none"}
          />
        </div>
        {track.stats.Like}
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-6 px-2">
        {/* Comment section */}
        <div>
          <div className="flex justify-between">
            <p className="text-lg mb-5 font-medium">
              {track.stats.Comment} Comments
            </p>
            <p className="text-lg">Sorted by: newest</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="aspect-square w-10 h-10 rounded-full bg-gray-400 cursor-pointer overflow-hidden">
              <img
                className="object-cover"
                src={user?.avatarUrl ?? undefined}
              />
            </div>
            <form className="w-full" onSubmit={handleAddComment}>
              <Input
                id="comment"
                placeholder="Write a comment"
                className="w-full"
                value={content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setContent(e.target.value)
                }
              />
            </form>
          </div>
          {comments.map((e) => (
            <div key={e.id} className="mt-5">
              <div className="flex gap-4">
                <div
                  className="aspect-square w-10 h-10 rounded-full bg-gray-400 cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/user/${e.User.username}`)}
                >
                  <img
                    className="object-cover"
                    src={e.User.avatarUrl ?? undefined}
                  />
                </div>
                <div>
                  <div
                    className="cursor-pointer text-sm flex gap-1"
                    onClick={() => navigate(`/user/${e.User.username}`)}
                  >
                    <p className="font-medium">{e.User.name}</p>
                    <p className="text-gray-500">@{e.User.username}</p>
                    <p className="text-gray-500">&#x2022;</p>
                    <p className="text-gray-500">
                      {moment(e.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className="mt-2">{e.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* sugest section */}
        <div className="">
          <p className="text-lg mb-5">Related Tracks</p>
          <div className="flex gap-1">
            <div className="aspect-square h-11 w-11 bg-gray-500 rounded-xs" />
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium">[title]</p>
                <p className="text-[0.5rem]">[author]</p>
              </div>
              <div className="flex gap-1">
                <div className="flex gap-0.5 items-center">
                  <Play size={10} fill="#111" />
                  <p className="text-[0.5rem]">[xxx]</p>
                </div>
                <div className="flex gap-1 items-center">
                  <Heart size={10} fill="#111" />
                  <p className="text-[0.5rem]">[xxx]</p>
                </div>
                <div className="flex gap-1 items-center">
                  <Repeat2 size={10} fill="#111" />
                  <p className="text-[0.5rem]">[xxx]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
