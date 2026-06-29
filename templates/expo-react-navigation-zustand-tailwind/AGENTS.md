# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

## Stack

- **Expo** ~56.0.12 · **React Native** 0.85 · **React** 19 · **TypeScript** strict
- **Navigation** React Navigation v7 — native-stack (root auth gate) + bottom tabs + drawer
- **State** Zustand v5 — three stores: `appStore`, `userStore`, `toastStore`
- **API** custom fetch-based `apiClient` with request/response interceptors and automatic 401 → token refresh → retry
- **Auth storage** `EncryptedStore` (never AsyncStorage for tokens or user data)
- **Icons** `@expo/vector-icons` (Ionicons)
- **Styling** **NativeWind v4** (Tailwind for React Native) — utility classes via `className`. No `StyleSheet.create()`, no inline `style={}` except for dynamic numeric values (size, animated opacity, etc.)

## Code rules

- Functional components everywhere. `ErrorBoundary` is the **only** allowed class component.
- All business logic lives in custom hooks (`src/hooks/`), never in screen or component files.
- Use Zustand store hooks (`useAppStore`, `useUserStore`, `useToastStore`) from `src/store/` — always select a single slice: `useAppStore(state => state.isAuthenticated)`.
- For imperative access outside React (e.g. `authActions`, `responseInterceptor`) use `useXxxStore.getState()`.
- Every screen uses `<ScreenWrapper>` as its root element.
- All API calls go through `apiClient` (`src/api/apiClient.ts`), not raw `fetch`.
- Show global feedback via `useToastStore.getState().showToast(...)` — never `Alert.alert`.
- Log via `Logger` (`src/utils/Logger.ts`) — never `console.log` directly.

## File convention

Every screen and shared component lives in its own folder:

```
ComponentName/
  ComponentName.tsx   ← component only, no logic, Tailwind classes via className
  helper.ts           ← pure functions: formatting, derived values, className mappers
  index.ts            ← barrel: export { default } from './ComponentName'
```

## Project structure

```
src/
  api/
    apiClient.ts          ← fetch wrapper: get/post/put/delete + 401 refresh + retry
    requestInterceptor.ts ← attaches Bearer token from EncryptedStore
    responseInterceptor.ts
    AuthApi.ts            ← login(credentials), refresh(token)
    UserApi.ts
    urls.ts               ← API endpoint constants

  components/             ← shared UI (Button, Input, Avatar, Toast, Loader, ScreenWrapper, SplashScreen, ErrorBoundary)

  hooks/
    useAuth.ts            ← login / logout / hydrate
    useAuthGuard.ts       ← redirect unauthenticated users
    useAppState.ts        ← foreground/background lifecycle
    useKeyboard.ts        ← keyboard height + visibility
    useBackHandler.ts     ← Android back button override

  navigation/
    Route.tsx             ← RootStackParamList + auth-gated stack (Login | App)
    BottomTabsNavigator.tsx ← BottomTabParamList: Home / Notifications / Profile / Settings
    DrawerNavigator.tsx   ← DrawerParamList: same four screens + custom header/footer
    NavigationContainer.tsx ← hydration gate (SplashScreen while isHydrating) + Toast overlay
    NavigationService.ts  ← navigate() / goBack() / getRouteName() for use outside React
    linking.ts            ← deep link prefix myapp:// + screen paths

  store/
    appStore.ts           ← isAuthenticated · isHydrating · currentRoute
    userStore.ts          ← user · isLoading · error
    toastStore.ts         ← message · visible · type (success | error | info)

  screens/                ← LoginScreen · HomeScreen · ProfileScreen · NotificationsScreen · SettingsScreen

  theme/
    index.ts              ← colors · spacing · fontSize · fontWeight · borderRadius · zIndex

  types/
    UserInterface.ts
    MediaInterface.ts
    AppConfigInterface.ts

  utils/
    EncryptedStore.ts     ← getToken/setToken/getRefreshToken/setRefreshToken/getUser/setUser/clear
    authActions.ts        ← performLogout (clears store + EncryptedStore)
    Logger.ts             ← log / warn / error (wraps console with prefix)
    Analytics.ts
    ErrorManager.ts
    DateTimeUtils.ts
    CommonUtils.ts
    string.ts
    constants.ts
    enums.ts
```

## Navigation architecture

```
App.tsx
  ErrorBoundary
    NavigationContainer          ← shows SplashScreen while isHydrating === true
      RNNavigationContainer      ← syncs currentRoute to Zustand on every state change
        Route (RootStack)
          Login                  ← isAuthenticated === false
          App → BottomTabsNavigator (or DrawerNavigator)
                  Home · Notifications · Profile · Settings
      Toast                      ← global overlay, z-index above everything
```

- `RootStackParamList` is the single source of truth for typed navigation — all new screens must be added here.
- `NavigationService.navigate()` is for imperative navigation outside the React tree (e.g. from `authActions`).
- Deep links: `myapp://login`, `myapp://home`, `myapp://notifications`, `myapp://profile`, `myapp://settings`.

## Zustand stores

| Store | Key state | Key actions |
|-------|-----------|-------------|
| `useAppStore` | `isAuthenticated`, `isHydrating`, `currentRoute` | `setAuthenticated`, `setHydrating`, `setCurrentRoute` |
| `useUserStore` | `user`, `isLoading`, `error` | `setUser`, `clearUser`, `setLoading`, `setError` |
| `useToastStore` | `message`, `visible`, `type` | `showToast({ message, type? })`, `hideToast` |

## Theme tokens

Design tokens live in **two places**:

1. `tailwind.config.js` — colors exposed as Tailwind utilities (`bg-primary`, `text-error`, `border-border`, `bg-overlay-dark`, ...). Spacing/sizing use the default Tailwind scale (e.g. `p-4` = 16px, `mb-2` = 8px).
2. `src/theme/index.ts` — same values as raw JS constants, for code paths that need numeric tokens (animations, dynamic style props, navigator options).

Rule of thumb: prefer Tailwind classes in JSX. Use `src/theme` only when a value must be a number at runtime (e.g. `tabBarActiveTintColor`, `Animated.Value`, computed `width/height`).

## Auth flow

1. App starts → `NavigationContainer` calls `hydrate()` → reads token + user from `EncryptedStore`
2. `isHydrating === true` → `SplashScreen` shown
3. `isHydrating === false` → `Route` renders `Login` or `App` based on `isAuthenticated`
4. `apiClient` auto-refreshes expired tokens (401 → `AuthApi.refresh` → retry) before calling logout

## Commands

```bash
npx expo start          # dev server
npx expo start --ios    # iOS simulator
npx expo start --android
npx expo start --web
npx tsc --noEmit        # type check — run before every commit
```
