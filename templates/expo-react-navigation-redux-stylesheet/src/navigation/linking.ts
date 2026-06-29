import { LinkingOptions } from '@react-navigation/native';

const linking: LinkingOptions<any> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Login: 'login',
      App: {
        screens: {
          Home: 'home',
          Notifications: 'notifications',
          Profile: 'profile',
          Settings: 'settings',
        },
      },
    },
  },
};

export default linking;
