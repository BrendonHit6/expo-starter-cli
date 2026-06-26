import React, { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/hooks/useAuth';
import ErrorBoundary from '@/components/ErrorBoundary';
import Toast from '@/components/Toast';

SplashScreen.preventAutoHideAsync();

function AuthGate() {
  const router = useRouter();
  const segments = useSegments();
  const { hydrate } = useAuth();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const isHydrating = useAppStore((state) => state.isHydrating);

  useEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    if (isHydrating) return;

    void SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(app)/');
    }
  }, [isAuthenticated, isHydrating, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <AuthGate />
      <Toast />
    </ErrorBoundary>
  );
}
