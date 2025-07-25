import type { MediaPlayerInstance } from "@vidstack/react";

type Props = {
  duration: number;
  currentTime: number;
  player: React.RefObject<MediaPlayerInstance | null>;
};

export const VideoRewind = ({ duration, currentTime, player }: Props) => {
  return (
    <div>
      <div>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(event) => {
            const time = parseFloat(event.target.value);
            if (!isNaN(time) && player.current) {
              player.current.currentTime = time;
            }
          }}
          className="w-full relative overflow-hidden z-20 border-none h-1 hover:h-2.5 transition-all accent-main"
        />
      </div>
    </div>
  );
};
