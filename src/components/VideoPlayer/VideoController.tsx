import React, { useEffect, useRef, useState } from "react";

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
  const [volume, setVolume] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  // Обновляем состояние плеера
  useEffect(() => {
    if (!playerRef.current) return;

    const player = playerRef.current;

    // Установка начальных значений
    if (player.volume !== undefined) {
      setVolume(player.volume);
    }
    if (player.paused !== undefined) {
      setIsPlaying(!player.paused);
    }
    if (player.duration !== undefined) {
      setDuration(player.duration);
    }

    // Функция для обновления времени
    const updateTime = () => {
      if (player.currentTime !== undefined) {
        setCurrentTime(player.currentTime);
      }
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    // Запускаем обновление времени
    animationFrameRef.current = requestAnimationFrame(updateTime);

    // Очистка при размонтировании
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [playerRef]);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;

    if (player.paused) {
      player.play?.();
      setIsPlaying(true);
    } else {
      player.pause?.();
      setIsPlaying(false);
    }
  };

  const seekBackward = () => {
    const player = playerRef.current;
    if (!player) return;
    const newTime = Math.max(currentTime - 10, 0);
    player.seek?.(newTime);
    setCurrentTime(newTime);
  };

  const seekForward = () => {
    const player = playerRef.current;
    if (!player || duration === 0) return;
    const newTime = Math.min(currentTime + 10, duration);
    player.seek?.(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    playerRef.current?.setVolume?.(newVolume);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    playerRef.current?.seek?.(newTime);
  };

  // Форматирование времени в MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div style={{ marginTop: "1rem", textAlign: "center" }}>
      <button onClick={togglePlay}>{isPlaying ? "⏸ Пауза" : "▶️ Воспроизвести"}</button>

      <div>
        <button onClick={seekBackward}>⏪ -10 сек</button>
        <button onClick={seekForward}>⏩ +10 сек</button>
      </div>

      <div>
        <input type="range" min="0" max={duration || 100} step="0.1" value={currentTime} onChange={handleTimeChange} style={{ width: "100%" }} />
        <div>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      <div>
        Громкость:
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
        {Math.round(volume * 100)}%
      </div>
    </div>
  );
};
