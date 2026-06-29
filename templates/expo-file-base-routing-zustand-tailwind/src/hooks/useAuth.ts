import { useCallback } from 'react';
import AuthApi, { ILoginCredentials } from '../api/AuthApi';
import EncryptedStore from '../utils/EncryptedStore';
import { useUserStore } from '../store/userStore';
import { useAppStore } from '../store/appStore';
import { performLogout } from '../utils/authActions';

export function useAuth() {
  const { setUser, setLoading, setError } = useUserStore();
  const { setAuthenticated, setHydrating } = useAppStore();

  const login = useCallback(async (credentials: ILoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const { token, refreshToken, user } = await AuthApi.login(credentials);
      await Promise.all([
        EncryptedStore.setToken(token),
        EncryptedStore.setRefreshToken(refreshToken),
        EncryptedStore.setUser(user),
      ]);
      setUser(user);
      setAuthenticated(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed.');
    }
  }, []);

  const logout = useCallback(() => performLogout(), []);

  const hydrate = useCallback(async () => {
    setHydrating(true);
    try {
      const [token, user] = await Promise.all([
        EncryptedStore.getToken(),
        EncryptedStore.getUser(),
      ]);
      setUser(user ?? null);
      setAuthenticated(!!token && !!user);
    } finally {
      setHydrating(false);
    }
  }, []);

  return { login, logout, hydrate };
}
