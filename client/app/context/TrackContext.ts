import { createContext, useContext } from "react";
import type { TrackInfo } from "~/types/tracks";

export const TrackContext = createContext<
  { currTrack: TrackInfo | null; changeCurrTrack: (track: TrackInfo) => void } | undefined
>(undefined);

export function useTrackContext() {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error("ThemeContext must be used within a ThemeContext.Provider");
  }
  return context;
}
