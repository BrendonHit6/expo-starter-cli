import { create } from 'zustand';

interface IToastState {
  message: string;
  visible: boolean;
  type: 'success' | 'error' | 'info';
  showToast: (params: { message: string; type?: 'success' | 'error' | 'info' }) => void;
  hideToast: () => void;
}

export const useToastStore = create<IToastState>((set) => ({
  message: '',
  visible: false,
  type: 'info',
  showToast: ({ message, type = 'info' }) => set({ message, type, visible: true }),
  hideToast: () => set({ visible: false }),
}));
