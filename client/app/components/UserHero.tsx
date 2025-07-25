import { Instagram, Twitter, Youtube } from "lucide-react";

export function UserHero() {
  return (
    <div className="bg-gray-300 flex justify-between w-full items-center">
      <div className="text-center">
        <div className="aspect-square w-20 h-20 rounded-full bg-gray-400 cursor-pointer overflow-hidden">
          <img className="object-cover" src={undefined} />
        </div>
        <h5 className="text-xl font-medium">[Name]</h5>
        <p className="text-gray-500">[Location]</p>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4">
        <div className="font-medium text-right">
          <p>Followers:</p>
          <p>Plays:</p>
          <p>Tracks:</p>
        </div>
        <div>
          <p>[999]</p>
          <p>[999]</p>
          <p>[999]</p>
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
