import { Heart, Play, Repeat2 } from "lucide-react";
import type { Route } from "./+types/trackPage";
import { SecundaryBtn } from "~/components/SecundaryBtn";
import { PrimaryBtn } from "~/components/PrimaryBtn";
import { Input } from "~/components/Input";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  console.log(params.track);
  // TODO
}

export default function Track() {
  return (
    <>
      {/* HERO */}
      <div className="flex bg-background dark:bg-background-dark justify-between mb-6">
        <div className="flex gap-2">
          <div className="aspect-square h-50 bg-gray-400" />
          <div className="flex flex-col justify-between">
            <div className="flex gap-2">
              <div className="aspect-square text-accent2 flex items-center justify-center bg-gray-400 w-fit h-fit p-3 rounded-full">
                <Play />
              </div>
              <div>
                <p className="text-xl font-medium">[Track Tittle]</p>
                <p className="text-gray-600">[Author]</p>
              </div>
            </div>
            <div className="flex gap-1">
              <div className="flex gap-0.5 items-center">
                <Play size={12} fill="#111" />
                <p className="text-xs ">[xxx]</p>
              </div>
              <div className="flex gap-1 items-center">
                <Heart size={12} fill="#111" />
                <p className="text-xs ">[xxx]</p>
              </div>
              <div className="flex gap-1 items-center">
                <Repeat2 size={12} fill="#111" />
                <p className="text-xs ">[xxx]</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right justify-self-end flex flex-col justify-between">
          <div>
            <p>[x] day ago</p>
            <div className="flex flex-wrap justify-end">
              <div className="px-2 py-0.5 w-fit bg-gray-400 rounded-full">
                <p className="text-xs">[tag]</p>
              </div>
            </div>
          </div>
          <div>
            <SecundaryBtn text="Add to cart" />
            <PrimaryBtn text="Buy Now" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto]">
        {/* Comment section */}
        <div>
          <div className="flex justify-between">
            <p className="text-lg mb-5 font-medium">[xxx] Comments</p>
            <p className="text-lg">Sorted by: oldest</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="aspect-square w-10 h-10 rounded-full bg-gray-400" />
            <Input
              id="comment"
              placeholder="Write a comment"
              className="w-full"
            />
          </div>
          <div className="mt-5">
            <div className="flex gap-4">
              <div className="aspect-square w-10 h-10 rounded-full bg-gray-400" />
              <div>
                <p className="text-sm">
                  <b>[author]</b> &#x2022; [x] days ago
                </p>
                <p className="mt-2">[This is a very productive comment]</p>
              </div>
            </div>
          </div>
        </div>

        {/* sugest section */}
        <div>
          <p>Sugestions</p>
          <div className="flex gap-1">
            <div className="aspect-square h-11 w-11 bg-gray-500" />
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
