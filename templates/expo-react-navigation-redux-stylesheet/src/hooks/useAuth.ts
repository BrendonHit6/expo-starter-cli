import { useCallback } from 'react';
import AuthApi, { ILoginCredentials } from '../api/AuthApi';
import EncryptedStore from '../utils/EncryptedStore';
import { useAppDispatch } from '../redux/store';
import { setUser, setLoading, setError } from '../redux/slices/UserSlice';
import { setAuthenticated, setHydrating } from '../redux/slices/AppSlice';
import { performLogout } from '../utils/authActions';

export function useAuth() {
  const dispatch = useAppDispatch();

  const login = useCallback(async (credentials: ILoginCredentials) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const { token, refreshToken, user } = await AuthApi.login(credentials);
      await Promise.all([
        EncryptedStore.setToken(token),
        EncryptedStore.setRefreshToken(refreshToken),
        EncryptedStore.setUser(user),
      ]);
      dispatch(setUser(user));
      dispatch(setAuthenticated(true));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Login failed.'));
    }
  }, [dispatch]);

  const logout = useCallback(() => performLogout(), []);

  const hydrate = useCallback(async () => {
    dispatch(setHydrating(true));
    try {
      const [token, user] = await Promise.all([
        EncryptedStore.getToken(),
        EncryptedStore.getUser(),
      ]);
      dispatch(setUser(user ?? null));
      dispatch(setAuthenticated(!!token && !!user));
    } finally {
      dispatch(setHydrating(false));
    }
  }, [dispatch]);

  return { login, logout, hydrate };
}
