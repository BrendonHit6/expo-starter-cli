import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { navigationRef } from './NavigationService';
import linking from './linking';
import Route from './Route';
import Toast from '../components/Toast';
import { setCurrentRoute } from '../redux/slices/AppSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useAuth } from '../hooks/useAuth';
import SplashScreen from '../components/SplashScreen';

export default function NavigationContainer() {
  const dispatch = useAppDispatch();
  const { hydrate } = useAuth();
  const isHydrating = useAppSelector(state => state.app.isHydrating);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const syncRoute = useCallback(() => {
    const route = navigationRef.getCurrentRoute()?.name ?? '';
    dispatch(setCurrentRoute(route));
  }, [dispatch]);

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
