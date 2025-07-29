import { Outlet } from "react-router";
import { Navbar } from "~/components/Navbar";
import { TrackBar } from "~/components/TrackBar";
import { useTrackContext } from "~/context/TrackContext";

export default function PlayerLayout() {
  const { currTrack } = useTrackContext();

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div className="overflow-y-auto">
        <Outlet />
      </div>
      {currTrack && (
        <TrackBar
          trackUrl={currTrack.url}
          trackImg={currTrack.imgUrl}
          trackName={currTrack.name}
          artist={currTrack.author.name}
          bpm={currTrack.bpm}
          isLiked={currTrack.isLikedByUser || false}
          price={currTrack.price}
        />
      )}
    </div>
  );
}
