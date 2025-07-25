import { create } from "zustand";

interface IAutoPlay {
  isPlaying: boolean;
  setPlaying: (value: boolean) => void;
}

export const useAutoPlayMediaPlayer = create<IAutoPlay>((set) => ({
  isPlaying: false,
  setPlaying: (value) => set(() => ({ isPlaying: value })),
}));
