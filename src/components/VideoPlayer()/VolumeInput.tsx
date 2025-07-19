import type { MediaPlayerInstance } from "@vidstack/react";
import { m } from "motion/react";
import { ButtonVolume } from "./ButtonVolume";

type Props = {
  enterVolumeInput: () => void;
  leaveVolumeInput: () => void;
  player: React.RefObject<MediaPlayerInstance | null>;
  muted: boolean;
  volume: number;
  isVolumeInput: boolean;
};

export const VolumeInput = ({ enterVolumeInput, leaveVolumeInput, player, muted, isVolumeInput, volume }: Props) => {
  return (
    <div className="flex items-center gap-2" onMouseEnter={enterVolumeInput} onMouseLeave={leaveVolumeInput}>
      <ButtonVolume player={player} muted={muted} />
      {isVolumeInput && (
        <m.input
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          key="box"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const vol = parseFloat(e.target.value);
            if (!isNaN(vol) && player.current) {
              player.current.volume = vol;
              player.current.muted = false;
            }
          }}
          className="w-24 h-2 accent-white"
        />
      )}
    </div>
  );
};
