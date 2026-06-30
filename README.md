# Create Mobile App

Interactive CLI for scaffolding Expo (React Native) projects with pre-configured routing, state management, and styling.

## Features

- Choose between **Expo Router** (file-based) or **React Navigation** (stack/tabs/drawer)
- Choose between **Redux Toolkit** or **Zustand** for state management
- Choose between **StyleSheet** (native) or **Tailwind / NativeWind v4** for styling
- Optionally include **Claude AI** config (`CLAUDE.md` + `.claude/` + React Native skills bundle)
- Sets project name in `package.json` automatically
- Runs package manager install after scaffolding

## Prerequisites

- Node.js 18+
- npm

## Usage

```bash
npm start
```

The CLI will prompt you for:

| Prompt | Options |
|---|---|
| Project name | Any string with latin letters, digits, `_`, `-` |
| Routing | `Expo Router` (file-based) · `React Navigation` |
| State manager | `Redux Toolkit` · `Zustand` |
| Styling | `StyleSheet` (React Native) · `Tailwind` (NativeWind v4) |
| Add Claude config | Yes / No |
| Package manager | `npm` · `yarn` · `bun` (shows only installed ones) |
| Output path | Directory where the project folder will be created |

### Presets

Skip all prompts by passing a preset name:

```bash
npm start -- my-app --preset expo-router-redux-tailwind
```

Available presets:

| Preset | Routing | State | Styling |
|---|---|---|---|
| `expo-router-redux-tailwind` | Expo Router | Redux Toolkit | Tailwind |
| `expo-router-redux-stylesheet` | Expo Router | Redux Toolkit | StyleSheet |
| `expo-router-zustand-tailwind` | Expo Router | Zustand | Tailwind |
| `expo-router-zustand-stylesheet` | Expo Router | Zustand | StyleSheet |
| `react-navigation-redux-tailwind` | React Navigation | Redux Toolkit | Tailwind |
| `react-navigation-redux-stylesheet` | React Navigation | Redux Toolkit | StyleSheet |
| `react-navigation-zustand-tailwind` | React Navigation | Zustand | Tailwind |
| `react-navigation-zustand-stylesheet` | React Navigation | Zustand | StyleSheet |

### Options

| Option | Description |
|---|---|
| `--preset <name>` | Skip all prompts, use a preset configuration |
| `--dry-run` | Show what would be created without writing any files |
| `--skip-install` | Skip running package manager install |
| `--version`, `-v` | Print version |
| `--help`, `-h` | Print help |

### Help

```bash
npm run help
npm start help
```

### Dry run

Preview what will be created without touching the filesystem:

```bash
npm start -- my-app --preset expo-router-redux-tailwind --dry-run
```

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
├── index.js               # Entry point, arg parsing, main flow
├── src/
│   ├── constants.js        # Routing, store, styling, presets, and Claude constants
│   ├── prompts.js          # Interactive prompts (@clack/prompts)
│   ├── project.js          # Template copy, package.json update, install
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
