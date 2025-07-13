import { create } from "zustand";

interface IPlayerStore {
  activePlayerId: string | null;
  setActivePlayerId: (id: string | null) => void;
}

export const usePlayerStore = create<IPlayerStore>((set) => ({
  activePlayerId: null,
  setActivePlayerId: (id) => set({ activePlayerId: id }),
}));
