import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(onChange?: (status: AppStateStatus) => void) {
  const current = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', next => {
      current.current = next;
      onChange?.(next);
    });
    return () => subscription.remove();
  }, [onChange]);

  return current.current;
}

export function useAppForeground(onForeground: () => void) {
  const current = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', next => {
      if (current.current.match(/inactive|background/) && next === 'active') {
        onForeground();
      }
      current.current = next;
    });
    return () => subscription.remove();
  }, [onForeground]);
}
