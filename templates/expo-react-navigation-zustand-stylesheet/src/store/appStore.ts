import { create } from 'zustand';

interface IAppState {
  isAuthenticated: boolean;
  isHydrating: boolean;
  currentRoute: string;
  setAuthenticated: (value: boolean) => void;
  setHydrating: (value: boolean) => void;
  setCurrentRoute: (route: string) => void;
}

export const useAppStore = create<IAppState>((set) => ({
  isAuthenticated: false,
  isHydrating: true,
  currentRoute: '',
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setHydrating: (value) => set({ isHydrating: value }),
  setCurrentRoute: (route) => set({ currentRoute: route }),
}));
