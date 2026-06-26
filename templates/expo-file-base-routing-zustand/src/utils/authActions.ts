import { useAppStore } from '../store/appStore';
import { useUserStore } from '../store/userStore';
import EncryptedStore from './EncryptedStore';

export async function performLogout(): Promise<void> {
  await EncryptedStore.clear();
  useUserStore.getState().clearUser();
  useAppStore.getState().setAuthenticated(false);
}
