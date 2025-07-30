import { Instagram, Twitter, Youtube } from "lucide-react";

interface UserHeroProps {
  name: string;
  location: string;
  followers: number;
  plays: number;
  tracksN: number;
  avatarUrl: string | null
}

export function UserHero({
  name,
  location,
  followers,
  tracksN,
  plays,
  avatarUrl,
}: UserHeroProps) {
  return (
    <div className="bg-gray-300 p-4 flex justify-between w-full items-center">
      <div className="text-center flex flex-col items-center">
        <div className="aspect-square w-20 h-20 rounded-full bg-gray-400 cursor-pointer overflow-hidden">
          <img className="object-cover" src={avatarUrl ?? undefined} />
        </div>
        <h5 className="text-xl font-medium">{name}</h5>
        <p className="text-gray-500">{location}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4">
        <div className="font-medium text-right">
          <p>Followers:</p>
          <p>Plays:</p>
          <p>Tracks:</p>
        </div>
        <div>
          <p>{followers}</p>
          <p>{tracksN}</p>
          <p>{plays}</p>
        </div>
        <div className="flex justify-center gap-2 col-span-2">
          <Instagram />
          <Youtube />
          <Twitter />
        </div>
      </div>
    </div>
  );
}
