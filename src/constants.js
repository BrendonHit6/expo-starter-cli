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

module.exports = { ROUTING, STORE, STYLING, ROUTING_LABEL, STORE_LABEL, STYLING_LABEL, CLAUDE_FILES, SKILLS };
