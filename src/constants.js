const ROUTING = {
  EXPO_ROUTER: 'expo-router',
  REACT_NAVIGATION: 'react-navigation',
};

const STORE = {
  REDUX: 'redux',
  ZUSTAND: 'zustand',
};

const STYLING = {
  STYLESHEET: 'stylesheet',
  TAILWIND: 'tailwind',
};

const ROUTING_LABEL = {
  [ROUTING.EXPO_ROUTER]: 'Expo Router      (file-based, app/)',
  [ROUTING.REACT_NAVIGATION]: 'React Navigation (stack / tabs / drawer)',
};

const STORE_LABEL = {
  [STORE.REDUX]: 'Redux Toolkit',
  [STORE.ZUSTAND]: 'Zustand',
};

const STYLING_LABEL = {
  [STYLING.STYLESHEET]: 'StyleSheet (React Native)',
  [STYLING.TAILWIND]: 'Tailwind (NativeWind v4)',
};

const PKG_MANAGER = {
  NPM: 'npm',
  YARN: 'yarn',
  BUN: 'bun',
};

const PKG_MANAGER_LABEL = {
  [PKG_MANAGER.NPM]: 'npm',
  [PKG_MANAGER.YARN]: 'yarn',
  [PKG_MANAGER.BUN]: 'bun',
};

const CLAUDE_FILES = {
  CONFIG_FILE: 'CLAUDE.md',
  CONFIG_DIR: '.claude',
  SKILLS_DIR: '.claude/skills',
};

const SKILLS = {
  REACT_NATIVE: {
    source: 'react-native-skills-1.0.0',
    target: 'react-native-skills',
  },
};

const PRESETS = {
  'expo-router-redux-tailwind':          { routing: ROUTING.EXPO_ROUTER,      store: STORE.REDUX,   styling: STYLING.TAILWIND },
  'expo-router-redux-stylesheet':        { routing: ROUTING.EXPO_ROUTER,      store: STORE.REDUX,   styling: STYLING.STYLESHEET },
  'expo-router-zustand-tailwind':        { routing: ROUTING.EXPO_ROUTER,      store: STORE.ZUSTAND, styling: STYLING.TAILWIND },
  'expo-router-zustand-stylesheet':      { routing: ROUTING.EXPO_ROUTER,      store: STORE.ZUSTAND, styling: STYLING.STYLESHEET },
  'react-navigation-redux-tailwind':     { routing: ROUTING.REACT_NAVIGATION, store: STORE.REDUX,   styling: STYLING.TAILWIND },
  'react-navigation-redux-stylesheet':   { routing: ROUTING.REACT_NAVIGATION, store: STORE.REDUX,   styling: STYLING.STYLESHEET },
  'react-navigation-zustand-tailwind':   { routing: ROUTING.REACT_NAVIGATION, store: STORE.ZUSTAND, styling: STYLING.TAILWIND },
  'react-navigation-zustand-stylesheet': { routing: ROUTING.REACT_NAVIGATION, store: STORE.ZUSTAND, styling: STYLING.STYLESHEET },
};

module.exports = { ROUTING, STORE, STYLING, PKG_MANAGER, ROUTING_LABEL, STORE_LABEL, STYLING_LABEL, PKG_MANAGER_LABEL, CLAUDE_FILES, SKILLS, PRESETS };
