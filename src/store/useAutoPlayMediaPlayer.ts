import type { MediaPlayerInstance } from "@vidstack/react";
import { create } from "zustand";

interface IAutoPlay {
  isPlaying: boolean;
  toggleAutoPlay: (mediaPlayer: React.RefObject<MediaPlayerInstance | null>, index: string, setActivePlayerId: (id: string) => void) => void;
}

export const useAutoPlayMediaPlayer = create<IAutoPlay>((set) => ({
  isPlaying: false,
  toggleAutoPlay: (mediaPlayer, index, setActivePlayerId) => {
    set((state) => {
      if (state.isPlaying) {
        mediaPlayer.current?.pause();
        return { isPlaying: false };
      } else {
        setActivePlayerId(index);
        mediaPlayer.current?.play();
        return { isPlaying: true };
      }
    });
  },
}));
