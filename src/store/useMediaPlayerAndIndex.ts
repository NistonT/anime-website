import type { MediaPlayerInstance } from "@vidstack/react";
import { create } from "zustand";

interface IMediaPlayerAndIndex {
  mediaPlayer: React.RefObject<MediaPlayerInstance | null> | null;
  index: string | null;
  setMediaPlayer: (mediaPlayer: React.RefObject<MediaPlayerInstance | null>) => void;
  setIndex: (index: string) => void;
}

export const useMediaPlayerAndIndex = create<IMediaPlayerAndIndex>((set) => ({
  mediaPlayer: null,
  index: null,
  setMediaPlayer: (media) => set(() => ({ mediaPlayer: media })),
  setIndex: (indexPlayer) => set(() => ({ index: indexPlayer })),
}));
