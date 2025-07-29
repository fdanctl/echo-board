import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  MoreHorizontal,
} from "lucide-react";
import { PrimaryBtn } from "./PrimaryBtn";
import { formatPrice } from "~/lib/utils";

interface CustomSliderProps {
  value: number;
  onChange: (v: number[]) => void;
  max?: number;
  className?: string;
}

function CustomSlider({
  value,
  onChange,
  max = 100,
  className = "",
}: CustomSliderProps) {
  return (
    <input
      type="range"
      min={0}
      max={max}
      value={value}
      onChange={(e) => onChange([Number(e.target.value)])}
      className={`w-full h-2 rounded-lg appearance-none bg-gray-300 accent-[#5bc0be] ${className}`}
    />
  );
}

interface TrackBarProps {
  trackUrl: string;
  trackImg: string;
  trackName: string;
  artist: string;
  bpm: number;
  isLiked: boolean;
  price: number;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
  onLikeToggle?: () => void;
  onVolumeChange?: (v: number) => void;
  onMore?: () => void;
}

export function TrackBar({
  trackUrl,
  trackImg,
  trackName,
  artist,
  bpm,
  isLiked,
  price,
  onSkipBack,
  onSkipForward,
  onLikeToggle,
  onVolumeChange,
  onMore,
}: TrackBarProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const onTimeUpdate = () => setProgress(audio.currentTime);

      audio.addEventListener("timeupdate", onTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
      };
    }
  }, []);

  return (
    <div className="w-full h-24 bg-slate-700 dark:bg-slate-950 border-t border-slate-300 text-white flex items-center justify-between px-4 shadow-lg">
      <audio ref={audioRef} autoPlay src={`http://localhost:4000${trackUrl}`} />

      {/* Left Section */}
      <div className="flex items-center gap-4 w-1/3">
        <img
          src={`http://localhost:4000${trackImg}`}
          className="w-16 h-16 aspect-square rounded object-cover"
        />
        <div>
          <p className="font-semibold text-sm">{trackName}</p>
          <p className="text-xs text-gray-400">
            {artist} • {bpm} BPM
          </p>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="flex items-center gap-4">
          <button onClick={onSkipBack}>
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button onClick={onSkipForward}>
            <SkipForward size={20} />
          </button>
        </div>
        <CustomSlider
          value={progress}
          onChange={(val) => setProgress(val[0])}
          max={100}
          className="mt-2"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 w-1/3 justify-end">
        <button onClick={onLikeToggle}>
          <Heart
            size={20}
            className={isLiked ? "text-red-500" : "text-white"}
            fill={isLiked ? "#ef4444" : "none"}
          />
        </button>
        <Volume2 size={20} />
        <button onClick={onMore}>
          <MoreHorizontal size={20} />
        </button>
        <PrimaryBtn
          className="text-sm"
          text={`$${formatPrice(price).toString()}`}
        />
      </div>
    </div>
  );
}
