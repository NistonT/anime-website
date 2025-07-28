import type { MediaPlayerInstance } from "@vidstack/react";
import { Volume2, VolumeOff } from "lucide-react";

type Props = {
  player: React.RefObject<MediaPlayerInstance | null>;
  muted: boolean;
};

export const ButtonVolume = ({ player, muted }: Props) => {
  return (
    <button
      onClick={() => {
        if (player.current) {
          player.current.muted = !player.current.muted;
        }
      }}
      className="text-white hover:text-gray-300"
    >
      {muted ? <VolumeOff /> : <Volume2 />}
    </button>
  );
};
