import React, { useState } from "react";

// Типизация для внутреннего API Vidstack
type MediaPlayerInstance = {
  play?(): void;
  pause?(): void;
  seek?(time: number): void;
  setVolume?(volume: number): void;
  currentTime?: number;
  duration?: number;
  paused?: boolean;
  volume?: number;
};

type VideoControllerProps = {
  playerRef: React.RefObject<MediaPlayerInstance | null>;
};

export const VideoController = ({ playerRef }: VideoControllerProps) => {
  const [volume, setVolume] = useState<number>(50);
  const player = playerRef.current;

  const togglePlay = () => {
    if (!player) return;
    if (player.paused) {
      if (typeof player.play === "function") {
        player.play();
      }
    } else {
      if (typeof player.pause === "function") {
        player.pause();
      }
    }
  };

  const seekBackward = () => {
    if (!player || player.currentTime == null) return;
    // console.log(typeof player.seek(20));
    // const newTime = Math.max(0, player.currentTime - 10);
    // if (typeof player.seek === "function") {
    //   player.seek(newTime);
    // }
  };

  const seekForward = () => {
    if (!player || player.currentTime == null || player.duration == null) return;
    const newTime = Math.min(player.duration, player.currentTime + 10);
    player.seek?.(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    if (player && player.setVolume) {
      player.setVolume(newVolume / 100); // Volume в Vidstack от 0 до 1
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div style={{ marginTop: "1rem", textAlign: "center" }}>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={togglePlay}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "none",
            backgroundColor: player?.paused ? "#2ed573" : "#ff4757",
            color: "white",
            cursor: "pointer",
          }}
        >
          {player?.paused ? "▶️ Воспроизвести" : "⏸ Пауза"}
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={seekBackward} style={{ margin: "0 0.5rem" }}>
          ⏪ -10 сек
        </button>
        <button onClick={seekForward} style={{ margin: "0 0.5rem" }}>
          ⏩ +10 сек
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          🔊 Громкость:
          <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} style={{ marginLeft: "10px", width: "80%" }} />
        </label>
        <p>Текущая громкость: {volume}%</p>
      </div>

      <div>
        Текущее время: {formatTime(player?.currentTime || 0)} / {formatTime(player?.duration || 0)}
      </div>
    </div>
  );
};
