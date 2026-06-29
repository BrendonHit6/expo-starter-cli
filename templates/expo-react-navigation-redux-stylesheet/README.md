# expo-react-navigation-redux

Production-ready Expo template with React Navigation v7 and Redux Toolkit. Includes auth flow, deep linking, a custom API client with token refresh, global toast, and a strict component/screen convention — ready to clone and build on.

## Stack

| Layer | Library |
|-------|---------|
| Framework | Expo ~56.0.12 / React Native 0.85 / React 19 |
| Navigation | React Navigation v7 (native-stack + bottom tabs + drawer) |
| State | Redux Toolkit v2 |
| Language | TypeScript (strict) |
| Icons | @expo/vector-icons (Ionicons) |

## Getting started

```bash
# 1. Clone and install
git clone <repo-url>
cd expo-react-navigation-redux
npm install

# 2. Set your API base URL
# src/api/apiClient.ts → BASE_URL

# 3. Set your deep link scheme
# src/navigation/linking.ts → prefixes
# app.json → scheme

# 4. Start
npx expo start
```

## Project structure

```
src/
  api/            API client (fetch-based), interceptors, endpoint modules
  components/     Shared UI: Button, Input, Avatar, Toast, Loader, ScreenWrapper, ErrorBoundary, SplashScreen
  hooks/          Business logic hooks: useAuth, useAuthGuard, useAppState, useKeyboard, useBackHandler
  navigation/     Route, BottomTabsNavigator, DrawerNavigator, NavigationService, deep linking
  redux/          Store + slices: app · user · toast
  screens/        Login, Home, Profile, Notifications, Settings
  theme/          Design tokens: colors, spacing, fontSize, fontWeight, borderRadius, zIndex
  types/          Global TypeScript interfaces
  utils/          EncryptedStore, Logger, Analytics, ErrorManager, authActions, helpers
```

## Auth flow

1. App starts → `useAuth.hydrate()` reads token + user from `EncryptedStore`
2. `SplashScreen` shown while `isHydrating === true`
3. Root stack shows `Login` or the main app based on `isAuthenticated`
4. `apiClient` auto-refreshes expired tokens on 401 and retries the original request — on failure it calls `performLogout()` and clears all stored credentials

## Navigation

```
RootStack (native-stack)
  Login                         ← unauthenticated
  App
    BottomTabsNavigator         ← Home · Notifications · Profile · Settings
    DrawerNavigator             ← same four screens + custom drawer with user avatar and logout
```

- **Deep links** — `myapp://login`, `myapp://home`, `myapp://notifications`, `myapp://profile`, `myapp://settings`
- **Imperative navigation** outside React — `NavigationService.navigate()` / `NavigationService.goBack()`
- **Navigation types** — extend `RootStackParamList` in `src/navigation/Route.tsx` when adding screens

## Redux store

| Slice | Purpose |
|-------|---------|
| `app` | `isAuthenticated`, `isHydrating`, `currentRoute` |
| `user` | `user`, `isLoading`, `error` |
| `toast` | `message`, `visible`, `type` — driven by `showToast` / `hideToast` |

Always use typed hooks: `useAppSelector` / `useAppDispatch` from `src/redux/store`.

## Component convention

Every screen and shared component follows this four-file layout:

```
ComponentName/
  ComponentName.tsx   ← JSX only, no business logic
  styles.ts           ← StyleSheet.create() with theme tokens
  helper.ts           ← pure functions (formatting, derived values)
  index.ts            ← barrel export
```

## Conventions

- Business logic → custom hook, never inside a component
- Global feedback → `showToast` dispatch, never `Alert.alert`
- Logging → `Logger.log/warn/error`, never `console.log`
- Sensitive storage → `EncryptedStore`, never `AsyncStorage`
- Styles → `StyleSheet.create()` with theme tokens, never inline or hardcoded values

## Adding a new screen

1. Create `src/screens/NewScreen/` with the four-file layout above
2. Add `NewScreen` to `RootStackParamList` in `src/navigation/Route.tsx`
3. Register the screen in the appropriate navigator
4. Add a deep link path in `src/navigation/linking.ts`
5. Run `npx tsc --noEmit` — zero errors before committing

## Commands

```bash
npx expo start            # dev server
npx expo start --ios      # iOS simulator
npx expo start --android  # Android emulator
npx expo start --web      # web
npx tsc --noEmit          # type check
```
