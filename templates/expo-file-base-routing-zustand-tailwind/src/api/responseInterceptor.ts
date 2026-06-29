import { useToastStore } from '../store/toastStore';

export function responseInterceptor(status: number): void {
  if (status >= 500) {
    useToastStore.getState().showToast({ message: 'Server error. Please try again.', type: 'error' });
  }
}
