import { store } from '../redux/store';
import { clearUser } from '../redux/slices/UserSlice';
import { setAuthenticated } from '../redux/slices/AppSlice';
import EncryptedStore from './EncryptedStore';

export async function performLogout(): Promise<void> {
  await EncryptedStore.clear();
  store.dispatch(clearUser());
  store.dispatch(setAuthenticated(false));
}
