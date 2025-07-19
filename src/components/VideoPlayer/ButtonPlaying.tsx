import { useAutoPlayMediaPlayer } from "@/store/useAutoPlayMediaPlayer";
import { useMediaPlayerAndIndex } from "@/store/useMediaPlayerAndIndex";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Pause, Play } from "lucide-react";

export const ButtonPlaying = () => {
  const { index, mediaPlayer } = useMediaPlayerAndIndex();
  const { isPlaying, toggleAutoPlay } = useAutoPlayMediaPlayer();
  const { setActivePlayerId } = usePlayerStore();

  if (!mediaPlayer || !index) return null;

  return (
    <button
      className="text-white"
      onClick={() => {
        toggleAutoPlay(mediaPlayer, index, setActivePlayerId);
      }}
      type="button"
    >
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};
