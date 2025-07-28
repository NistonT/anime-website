import { useMediaPlayerLatest } from "@/store/useMediaPlayerLatest";
import type { MediaPlayerInstance } from "@vidstack/react";
import { Expand, Shrink } from "lucide-react";

type Props = {
  fullscreen: boolean;
  player: React.RefObject<MediaPlayerInstance | null>;
};

export const ButtonFullscreen = ({ fullscreen, player }: Props) => {
  const { setSettingPlayer } = useMediaPlayerLatest();

  const toggleFullscreen = () => {
    if (fullscreen) {
      player.current?.exitFullscreen();
      setSettingPlayer(false);
    } else {
      player.current?.enterFullscreen();
      setSettingPlayer(false);
    }
  };

  return (
    <button onClick={toggleFullscreen} type="button" className="text-white">
      {fullscreen ? <Shrink /> : <Expand />}
    </button>
  );
};
