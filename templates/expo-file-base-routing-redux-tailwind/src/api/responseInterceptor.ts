import { store } from '../redux/store';
import { showToast } from '../redux/slices/ToastSlice';

export function responseInterceptor(status: number): void {
  if (status >= 500) {
    store.dispatch(showToast({ message: 'Server error. Please try again.', type: 'error' }));
  }
}
