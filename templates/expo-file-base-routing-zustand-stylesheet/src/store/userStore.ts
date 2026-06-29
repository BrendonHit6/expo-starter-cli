import { create } from 'zustand';
import { IUserInterface } from '../types/UserInterface';

interface IUserState {
  user: IUserInterface | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: IUserInterface | null) => void;
  clearUser: () => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<IUserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, error: null }),
  clearUser: () => set({ user: null, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
}));
