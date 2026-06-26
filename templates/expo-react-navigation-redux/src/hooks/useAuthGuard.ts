import { useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import { navigate } from '../navigation/NavigationService';

export function useAuthGuard() {
  const isAuthenticated = useAppSelector(state => state.app.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('Login');
    }
  }, [isAuthenticated]);

  return isAuthenticated;
}
