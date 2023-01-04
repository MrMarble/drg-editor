import create from 'zustand';
import { U8Array } from '../helpers';

interface SaveState {
  isLoaded: boolean;
  save: U8Array;
  name: string;
  setName: (name: string) => void;
  setSave: (save: U8Array) => void;
}

export default create<SaveState>()(set => ({
  isLoaded: false,
  save: new U8Array(0),
  name: '',
  setName: (name: string): void => set({ name }),
  setSave: (save): void => set({ isLoaded: true, save })
}));
