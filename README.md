# Create Mobile App

Interactive CLI for scaffolding Expo (React Native) projects with pre-configured routing, state management, and styling.

## Features

- Choose between **Expo Router** (file-based) or **React Navigation** (stack/tabs/drawer)
- Choose between **Redux Toolkit** or **Zustand** for state management
- Choose between **StyleSheet** (native) or **Tailwind / NativeWind v4** for styling
- Optionally include **Claude AI** config (`CLAUDE.md` + `.claude/` + React Native skills bundle)
- Sets project name in `package.json` automatically
- Runs `npm install` after scaffolding

## Prerequisites

- Node.js 18+
- npm

## Usage

```bash
node index.js
```

The CLI will prompt you for:

| Prompt | Options |
|---|---|
| Project name | Any string with latin letters, digits, `_`, `-` |
| Routing | `Expo Router` (file-based) · `React Navigation` |
| State manager | `Redux Toolkit` · `Zustand` |
| Styling | `StyleSheet` (React Native) · `Tailwind` (NativeWind v4) |
| Add Claude config | Yes / No |
| Output path | Directory where the project folder will be created |

After answering all prompts the CLI copies the matching template, updates `package.json`, and runs `npm install`.

## Templates

| Routing | State | Styling | Template folder |
|---|---|---|---|
| Expo Router | Redux Toolkit | StyleSheet | `expo-file-base-routing-redux-stylesheet` |
| Expo Router | Redux Toolkit | Tailwind | `expo-file-base-routing-redux-tailwind` |
| Expo Router | Zustand | StyleSheet | `expo-file-base-routing-zustand-stylesheet` |
| Expo Router | Zustand | Tailwind | `expo-file-base-routing-zustand-tailwind` |
| React Navigation | Redux Toolkit | StyleSheet | `expo-react-navigation-redux-stylesheet` |
| React Navigation | Redux Toolkit | Tailwind | `expo-react-navigation-redux-tailwind` |
| React Navigation | Zustand | StyleSheet | `expo-react-navigation-zustand-stylesheet` |
| React Navigation | Zustand | Tailwind | `expo-react-navigation-zustand-tailwind` |

## Claude Config

When the Claude config option is enabled, the CLI adds:

- `CLAUDE.md` — project-level Claude instructions
- `.claude/` — Claude configuration directory
- `.claude/skills/react-native/` — React Native skills bundle (copied from `react-native-skills-1.0.0`)

## Project Structure

```
CLI/
├── index.js               # Entry point
├── src/
│   ├── constants.js        # Routing, store, styling, and Claude constants
│   ├── prompts.js          # Interactive prompts (@clack/prompts)
│   ├── project.js          # Template copy, package.json update, npm install
│   └── claude.js           # Remove Claude config when not needed
├── templates/             # Ready-to-use Expo project templates
│   ├── expo-file-base-routing-redux-stylesheet/
│   ├── expo-file-base-routing-redux-tailwind/
│   ├── expo-file-base-routing-zustand-stylesheet/
│   ├── expo-file-base-routing-zustand-tailwind/
│   ├── expo-react-navigation-redux-stylesheet/
│   ├── expo-react-navigation-redux-tailwind/
│   ├── expo-react-navigation-zustand-stylesheet/
│   ├── expo-react-navigation-zustand-tailwind/
│   └── react-native-skills-1.0.0/  # Claude React Native skills bundle
└── assets/
    └── logo.jpeg
```

## After Scaffolding

```bash
cd <your-project-name>
npx expo start
```

## Dependencies

- [`@clack/prompts`](https://github.com/bombshell-dev/clack) — interactive terminal prompts
- [`picocolors`](https://github.com/alexeyraspopov/picocolors) — terminal colors
