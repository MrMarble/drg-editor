import create from 'zustand';

interface ChangesState {
  changes: number;
  increment: () => void;
  reset: () => void;
}

export default create<ChangesState>()(set => ({
  changes: 0,
  increment: (): void => set(state => ({ changes: state.changes + 1 })),
  reset: (): void => set({ changes: 0 })
}));
