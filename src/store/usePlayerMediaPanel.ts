import type { IEpisode } from "@/types/types";
import { create } from "zustand";

// const [listEpisode, setListEpisode] = useState<IListPlayer[] | null>(null);
// const [currentEpisode, setCurrentEpisode] = useState<IHls | null>(null);
// const episodeSelection = (label: string, episode: IListPlayer) => {
//   setSelectedEpisode(label);
//   handlerCurrentEpisode(episode.hls);
//   leavePlayerPanel();
//   closeListEpisode();
//   closeSettingQualitiesPlayer();
//   setPlaying(false);
// };
// const handlerCurrentEpisode = (episode: IHls) => {
//   setCurrentEpisode(episode);
// };

// const [selectedEpisode, setSelectedEpisode] = useState<string>("");

interface IPlayerMediaPanel {
  isPlayerPanel: boolean;
  isOpenSettingPlayer: boolean;
  isOpenSettingQualitiesPlayer: boolean;
  isOpenListEpisode: boolean;
  isVolumeInput: boolean;

  selectedEpisode: string;

  listEpisode: IEpisode[] | null;
  currentEpisode: IEpisode | null;

  episodeSelection: (label: string, episode: IEpisode) => void;
  handlerCurrentEpisode: (episode: IEpisode) => void;

  setIsPlayerPanel: (value: boolean) => void;
  setIsOpenSettingPlayer: (value: boolean) => void;
  setIsOpenSettingQualitiesPlayer: (value: boolean) => void;
  setIsOpenListEpisode: (value: boolean) => void;
  setIsVolumeInput: (value: boolean) => void;
  setSelectedEpisode: (value: string) => void;
  setListEpisode: (value: IEpisode[]) => void;

  enterPlayerPanel: () => void;
  leavePlayerPanel: () => void;
  closeSettingPanel: () => void;
  closeListEpisode: () => void;
  openListEpisode: () => void;
  toggleOpenListEpisode: () => void;
  openSettingQualitiesPlayer: () => void;
  closeSettingQualitiesPlayer: () => void;
  enterVolumeInput: () => void;
  leaveVolumeInput: () => void;
  toggleOpenSettingPlayer: () => void;
}

export const usePlayerMediaPanel = create<IPlayerMediaPanel>((set) => ({
  isPlayerPanel: false,
  isOpenSettingPlayer: false,
  isOpenSettingQualitiesPlayer: false,
  isOpenListEpisode: false,
  isVolumeInput: false,

  selectedEpisode: "",

  listEpisode: null,
  currentEpisode: null,

  episodeSelection: (label: string, episode: IEpisode) =>
    set(() => ({
      selectedEpisode: label,
      currentEpisode: episode,
      isPlayerPanel: false,
      isOpenSettingPlayer: false,
      isOpenListEpisode: false,
      isOpenSettingQualitiesPlayer: false,
    })),
  handlerCurrentEpisode: (episode: IEpisode) => set(() => ({ currentEpisode: episode })),

  setIsPlayerPanel: (value) => set(() => ({ isPlayerPanel: value })),
  setIsOpenSettingPlayer: (value) => set(() => ({ isOpenSettingPlayer: value })),
  setIsOpenSettingQualitiesPlayer: (value) => set(() => ({ isOpenSettingQualitiesPlayer: value })),
  setIsOpenListEpisode: (value) => set(() => ({ isOpenListEpisode: value })),
  setIsVolumeInput: (value) => set(() => ({ isVolumeInput: value })),
  setSelectedEpisode: (value) => set(() => ({ selectedEpisode: value })),
  setListEpisode: (value) => set(() => ({ listEpisode: value })),

  enterPlayerPanel: () => set({ isPlayerPanel: true }),
  leavePlayerPanel: () => set({ isPlayerPanel: false, isOpenSettingPlayer: false }),
  closeSettingPanel: () => set({ isOpenSettingPlayer: false }),
  closeListEpisode: () => set({ isOpenListEpisode: false }),
  openListEpisode: () => set({ isOpenListEpisode: true }),
  toggleOpenListEpisode: () => set((state) => ({ isOpenListEpisode: !state.isOpenListEpisode })),
  openSettingQualitiesPlayer: () => set({ isOpenSettingQualitiesPlayer: true }),
  closeSettingQualitiesPlayer: () => set({ isOpenSettingQualitiesPlayer: false }),
  enterVolumeInput: () => set({ isVolumeInput: true }),
  leaveVolumeInput: () => set({ isVolumeInput: false }),
  toggleOpenSettingPlayer: () =>
    set((state) => ({
      isOpenSettingPlayer: !state.isOpenSettingPlayer,
      isOpenSettingQualitiesPlayer: state.isOpenSettingQualitiesPlayer ? false : state.isOpenSettingQualitiesPlayer,
    })),
}));
