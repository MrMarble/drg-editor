import create from "zustand";

interface ChangesState {
  changes: number;
  increment: () => void;
  reset: () => void;
}

export const useChangesStore = create<ChangesState>()((set) => ({
  changes: 0,
  increment: () => set((state) => ({ changes: state.changes + 1 })),
  reset: () => set({ changes: 0 }),
}));
