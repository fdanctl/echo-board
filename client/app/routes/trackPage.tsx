import { Heart, MessageCircle, Play, Repeat2 } from "lucide-react";
import type { Route } from "./+types/trackPage";
import { SecundaryBtn } from "~/components/SecundaryBtn";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { Input } from "~/components/Input";
import { Navbar } from "~/components/Navbar";
import { getTrack } from "~/services/track";
import { verifyCookie } from "~/lib/validators";
import { useState, type ChangeEvent } from "react";
import { Form } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  console.log(params.track);
  // TODO
  const user = verifyCookie(request);
  console.log("user", user);
  const track = await getTrack(params.track);
  return {
    user,
    track,
  };
}

interface Comment {
  id: number;
  userId: string;
  createdAt: Date;
  trackId: string;
  content: string;
}

export default function Track({ loaderData }: Route.ComponentProps) {
  const track = loaderData.track;
  const user = loaderData.user;
  const [content, setContent] = useState("");
  const [comments, setComments] = useState(track.comments);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddComment = () => {
    // optimistic add
    const newComment: Comment = {
      id: 1,
      userId: user?.sub ?? "fall",
      createdAt: new Date(),
      trackId: track.id,
      content: content,
    };
    setComments((ps) => ps.concat(newComment));
  };

  const handleLike = () => {
    // optimistic add
    setIsLiked((ps) => !ps);
  };

  return (
    <>
      <Navbar />
      {/* HERO */}
      <div className="flex bg-background dark:bg-background-dark justify-between mb-6 p-4">
        <div className="flex gap-3">
          <div className="aspect-square h-50 bg-gray-400 rounded-xs" />
          <div className="flex flex-col justify-between">
            <div className="flex gap-2 mt-3">
              <div className="aspect-square text-accent2 flex items-center justify-center bg-gray-400 w-fit h-fit p-3 rounded-full">
                <Play />
              </div>
              <div>
                <p className="text-xl font-medium whitespace-nowrap text-ellipsis">
                  {track.name}
                </p>
                <p className="text-gray-600 whitespace-nowrap">
                  {track.author.name}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="flex gap-0.5 items-center">
                <Play size={12} fill="#111" />
                <p className="text-xs ">{track.stats.TrackPlay}</p>
              </div>
              <div className="flex gap-1 items-center">
                <Heart size={12} fill="#111" />
                <p className="text-xs ">{track.stats.Like}</p>
              </div>
              <div className="flex gap-1 items-center">
                <MessageCircle size={12} fill="#111" />
                <p className="text-xs ">{track.stats.Comment}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right justify-self-end flex flex-col justify-between">
          <div>
            <p>{track.publishAt.toString()}</p>
            <div className="flex flex-wrap gap-1 justify-end">
              {track.tags.map((e) => (
                <div
                  key={e.id}
                  className="px-2 py-0.5 w-fit bg-gray-400 rounded-full"
                >
                  <p className="text-xs">#{e.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>
              <b>Price: </b>${track.price}
            </p>
            <SecundaryBtn text="Add to cart" />
            <PrimaryBtn text="Buy Now" />
          </div>
        </div>
      </div>

      <div className="flex">
        <div onClick={handleLike}>
          <Heart fill={isLiked ? "#111" : "none"} />
        </div>
        {track.stats.Like}
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-6">
        {/* Comment section */}
        <div>
          <div className="flex justify-between">
            <p className="text-lg mb-5 font-medium">
              {track.stats.Comment} Comments
            </p>
            <p className="text-lg">Sorted by: newest</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="aspect-square w-10 h-10 rounded-full bg-gray-400" />
            <Form className="w-full" onSubmit={handleAddComment}>
              <Input
                id="comment"
                placeholder="Write a comment"
                className="w-full"
                value={content}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setContent(e.target.value)
                }
              />
            </Form>
          </div>
          {comments.map((e) => (
            <div key={e.id} className="mt-5">
              <div className="flex gap-4">
                <div className="aspect-square w-10 h-10 rounded-full bg-gray-400" />
                <div>
                  <p className="text-sm">
                    <b>{e.userId}</b> &#x2022; {e.createdAt.toString()}
                  </p>
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
