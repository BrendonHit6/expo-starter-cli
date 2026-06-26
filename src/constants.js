const ROUTING = {
  EXPO_ROUTER: 'expo-router',
  REACT_NAVIGATION: 'react-navigation',
};

const STORE = {
  REDUX: 'redux',
  ZUSTAND: 'zustand',
};

const ROUTING_LABEL = {
  [ROUTING.EXPO_ROUTER]: 'Expo Router      (file-based, app/)',
  [ROUTING.REACT_NAVIGATION]: 'React Navigation (stack / tabs / drawer)',
};

const STORE_LABEL = {
  [STORE.REDUX]: 'Redux Toolkit',
  [STORE.ZUSTAND]: 'Zustand',
};

const CLAUDE_FILES = {
  CONFIG_FILE: 'CLAUDE.md',
  CONFIG_DIR: '.claude',
};

module.exports = { ROUTING, STORE, ROUTING_LABEL, STORE_LABEL, CLAUDE_FILES };
