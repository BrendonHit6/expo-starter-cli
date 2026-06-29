import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import linking from './linking';
import Route from './Route';
import Toast from '../components/Toast';
import { useAppStore } from '../store/appStore';
import { useAuth } from '../hooks/useAuth';
import SplashScreen from '../components/SplashScreen';

export default function NavigationContainer() {
  const { hydrate } = useAuth();
  const isHydrating = useAppStore(state => state.isHydrating);
  const setCurrentRoute = useAppStore(state => state.setCurrentRoute);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const syncRoute = useCallback(() => {
    const route = navigationRef.getCurrentRoute()?.name ?? '';
    setCurrentRoute(route);
  }, [setCurrentRoute]);

  if (isHydrating) {
    return <SplashScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <RNNavigationContainer ref={navigationRef} linking={linking} onReady={syncRoute} onStateChange={syncRoute}>
        <Route />
      </RNNavigationContainer>
      <Toast />
    </View>
  );
}
