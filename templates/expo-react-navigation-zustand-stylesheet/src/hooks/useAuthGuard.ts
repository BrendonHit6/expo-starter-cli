import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { navigate } from '../navigation/NavigationService';

export function useAuthGuard() {
  const isAuthenticated = useAppStore(state => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('Login');
    }
  }, [isAuthenticated]);

  return isAuthenticated;
}
