import { useAutoPlayMediaPlayer } from "@/store/useAutoPlayMediaPlayer";

import { usePlayerStore } from "@/store/usePlayerStore";
import type { MediaPlayerInstance } from "@vidstack/react";
import { Pause, Play } from "lucide-react";

type Props = {
  mediaPlayer: React.RefObject<MediaPlayerInstance | null>;
  index: string;
};

export const ButtonPlaying = ({ mediaPlayer, index }: Props) => {
  const { isPlaying, setPlaying } = useAutoPlayMediaPlayer();
  const { setActivePlayerId } = usePlayerStore();

  const handlerToggleAutoPlay = () => {
    if (isPlaying) {
      mediaPlayer?.current?.pause();
      setPlaying(false);
    } else {
      setActivePlayerId(index);
      mediaPlayer?.current?.play();
      setPlaying(true);
    }
  };

  if (!mediaPlayer || !index) return null;

  return (
    <button className="text-white" type="button" onClick={handlerToggleAutoPlay}>
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
