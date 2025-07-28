import { create } from "zustand";

interface IMediaPlayerLatest {
  isSettingPlayer: boolean;
  isSettingQualitiesPlayer: boolean;

  setSettingPlayer: (value: boolean) => void;
  setSettingQualitiesPlayer: (value: boolean) => void;
}

export const useMediaPlayerLatest = create<IMediaPlayerLatest>((set) => ({
  isSettingPlayer: false,
  isSettingQualitiesPlayer: false,

  setSettingPlayer: (value) => set({ isSettingPlayer: value }),
  setSettingQualitiesPlayer: (value) => set({ isSettingQualitiesPlayer: value }),
}));
