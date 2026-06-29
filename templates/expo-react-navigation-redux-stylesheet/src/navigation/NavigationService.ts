import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from './Route';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function goBack() {
  return navigationRef?.goBack();
}

export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  if (navigationRef.isReady()) {
    (navigationRef.navigate as (name: T, params?: RootStackParamList[T]) => void)(name, params);
  }
}

function push(_routeName: string, _params?: Record<string, any>) {
  throw new Error('Missing implementation of push');
}

function reset(_routeName: string) {
  throw new Error('Missing implementation of reset');
}

function getCurrentRoute() {
  throw new Error('Missing implementation of getCurrentRoute');
}

const getRouteName = () => navigationRef.getCurrentRoute()?.name ?? '';

const NavigationService = { navigate, push, goBack, reset, getCurrentRoute, getRouteName };

export default NavigationService;
