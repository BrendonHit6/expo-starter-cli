# Create Mobile App

Interactive CLI for scaffolding Expo (React Native) projects with pre-configured routing and state management.

## Features

- Choose between **Expo Router** (file-based) or **React Navigation** (stack/tabs/drawer)
- Choose between **Redux Toolkit** or **Zustand** for state management
- Optionally include **Claude AI** config (`CLAUDE.md` + `.claude/`)
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
| Add Claude config | Yes / No |
| Output path | Directory where the project folder will be created |

After answering all prompts the CLI copies the matching template, updates `package.json`, and runs `npm install`.

## Templates

| Routing | State | Template folder |
|---|---|---|
| Expo Router | Redux Toolkit | `expo-file-base-routing-redux` |
| Expo Router | Zustand | `expo-file-base-routing-zustand` |
| React Navigation | Redux Toolkit | `expo-react-navigation-redux` |
| React Navigation | Zustand | `expo-react-navigation-zustand` |

## Project Structure

```
CLI/
├── index.js               # Entry point
├── src/
│   ├── prompts.js         # Interactive prompts (@clack/prompts)
│   ├── project.js         # Template copy, package.json update, npm install
│   └── claude.js          # Remove Claude config when not needed
├── templates/             # Ready-to-use Expo project templates
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
