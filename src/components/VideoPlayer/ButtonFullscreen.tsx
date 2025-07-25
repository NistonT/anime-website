import type { MediaPlayerInstance } from "@vidstack/react";
import { Expand, Shrink } from "lucide-react";

type Props = {
  fullscreen: boolean;
  mediaPlayer: React.RefObject<MediaPlayerInstance | null>;
};

export const ButtonFullscreen = ({ fullscreen, mediaPlayer }: Props) => {
  const toggleFullscreen = () => {
    if (fullscreen) {
      mediaPlayer.current?.exitFullscreen();
    } else {
      mediaPlayer.current?.enterFullscreen();
    }
  };

  return (
    <button onClick={toggleFullscreen} type="button" className="text-white">
      {fullscreen ? <Shrink /> : <Expand />}
    </button>
  );
};
