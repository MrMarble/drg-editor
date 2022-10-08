import create from "zustand";
import { U8Array } from "../helpers/uint8array";

interface SaveState {
  isLoaded: boolean;
  save: U8Array;
  name: string;
  setName: (name: string) => void;
  setSave: (save: U8Array) => void;
}

export const useSaveStore = create<SaveState>()((set) => ({
  isLoaded: false,
  save: new U8Array(0),
  name: "",
  setName: (name: string) => set({ name }),
  setSave: (save) => set({ isLoaded: true, save }),
}));
