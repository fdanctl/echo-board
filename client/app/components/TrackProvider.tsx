import { useState, type ReactNode } from "react";
import { TrackContext } from "~/context/TrackContext";
import { useUserContext } from "~/context/UserContext";
import { playTrack } from "~/services/track";
import type { TrackInfo } from "~/types/tracks";

export function TrackProvider({ children }: { children: ReactNode }) {
  const [currTrack, setCurrTrack] = useState<TrackInfo | null>(null)

  const changeCurrTrack = (newTrack: TrackInfo) => {
    setCurrTrack(newTrack);
    // TODO add one play
    playTrack(newTrack.id)
  };

  return (
    <TrackContext.Provider value={{ currTrack, changeCurrTrack }}>
      {children}
    </TrackContext.Provider>
  );
}
