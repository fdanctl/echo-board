import { formatPrice } from "~/lib/utils";
import { PrimaryBtn } from "./PrimaryBtn";
import { useNavigate } from "react-router";
import { Play } from "lucide-react";

interface TrackCardProps {
  id: string;
  trackUrl: string;
  thumbnailUrl: string;
  title: string;
  author: string;
  price: number;
  onPlayClick?: () => void;
}

export function TrackCard({
  id,
  trackUrl,
  thumbnailUrl,
  title,
  author,
  price,
  onPlayClick,
}: TrackCardProps) {
  const navigate = useNavigate();
  return (
    <div className="group hover:bg-accent2/40 border border-transparent hover:border-accent2/45 px-3 py-4 rounded">
      <div
        className="w-full aspect-square bg-gray-500 relative rounded-xs"
        onClick={() => navigate(`/track/${id}`)}
      >
        <img
          className="object-cover w-full h-full"
          src={`http://localhost:4000${thumbnailUrl}`}
        />
        <div className="hidden p-3 rounded-full group-hover:block duration-150 bg-accent2/20 w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent2 hover:bg-accent2/50">
          <Play fill="#d97e14" onClick={onPlayClick} />
        </div>
      </div>
      <h6
        className="truncate font-medium mt-1 cursor-pointer"
        onClick={() => navigate(`/track/${id}`)}
      >
        {title}
      </h6>
      <p className="text-xs text-gray-600 mb-2">{author}</p>
      <PrimaryBtn
        text={`$${formatPrice(price).toString()}`}
        className="w-full"
        onClick={() => console.log("hello")}
      />
    </div>
  );
}
