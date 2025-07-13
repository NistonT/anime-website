import type { MediaPlayerInstance } from "@vidstack/react";
import { Pause, Play } from "lucide-react";
import { useEffect } from "react";

type Props = {
  toggleAutoPlay: () => void;
  isPlaying: boolean;
  player: React.RefObject<MediaPlayerInstance | null>;
};

export const ButtonPlaying = ({ toggleAutoPlay, isPlaying, player }: Props) => {
  useEffect(() => {
    console.log(player.current?.paused);
  }, [player]);

  return (
    <button className="text-white" onClick={toggleAutoPlay} type="button">
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
