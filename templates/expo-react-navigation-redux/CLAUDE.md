@AGENTS.md

## Stack

- **Expo** ~56.0.12 · **React Native** 0.85 · **React** 19 · **TypeScript** strict
- **Navigation** React Navigation v7 — native-stack (root auth gate) + bottom tabs + drawer
- **State** Redux Toolkit v2 — three slices: `app`, `user`, `toast`
- **API** custom fetch-based `apiClient` with request/response interceptors and automatic 401 → token refresh → retry
- **Auth storage** `EncryptedStore` (never AsyncStorage for tokens or user data)
- **Icons** `@expo/vector-icons` (Ionicons)
- **Styling** `StyleSheet.create()` only — no inline styles, no Tailwind

## Code rules

- Functional components everywhere. `ErrorBoundary` is the **only** allowed class component.
- All business logic lives in custom hooks (`src/hooks/`), never in screen or component files.
- Use `useAppDispatch` / `useAppSelector` from `src/redux/store` — never raw `useDispatch` / `useSelector`.
- Every screen uses `<ScreenWrapper>` as its root element.
- All API calls go through `apiClient` (`src/api/apiClient.ts`), not raw `fetch`.
- Show global feedback via `showToast` dispatch — never `Alert.alert`.
- Log via `Logger` (`src/utils/Logger.ts`) — never `console.log` directly.

## File convention

Every screen and shared component lives in its own folder:

```
ComponentName/
  ComponentName.tsx   ← component only, no logic
  styles.ts           ← StyleSheet.create(), uses theme tokens
  helper.ts           ← pure functions: formatting, derived values
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

  redux/
    store.ts              ← configureStore + RootState + AppDispatch + typed hooks
    slices/
      AppSlice.ts         ← isAuthenticated · isHydrating · currentRoute
      UserSlice.ts        ← user · isLoading · error
      ToastSlice.ts       ← message · visible · type (success | error | info)

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
    Provider (Redux)
      NavigationContainer          ← shows SplashScreen while isHydrating === true
        RNNavigationContainer      ← syncs currentRoute to Redux on every state change
          Route (RootStack)
            Login                  ← isAuthenticated === false
            App → BottomTabsNavigator (or DrawerNavigator)
                    Home · Notifications · Profile · Settings
        Toast                      ← global overlay, z-index above everything
```

- `RootStackParamList` is the single source of truth for typed navigation — all new screens must be added here.
- `NavigationService.navigate()` is for imperative navigation outside the React tree (e.g. from `authActions`).
- Deep links: `myapp://login`, `myapp://home`, `myapp://notifications`, `myapp://profile`, `myapp://settings`.

## Redux slices

| Slice | Key state | Key actions |
|-------|-----------|-------------|
| `app` | `isAuthenticated`, `isHydrating`, `currentRoute` | `setAuthenticated`, `setHydrating`, `setCurrentRoute` |
| `user` | `user`, `isLoading`, `error` | `setUser`, `clearUser`, `setLoading`, `setError` |
| `toast` | `message`, `visible`, `type` | `showToast({ message, type? })`, `hideToast` |

## Theme tokens

Always import from `src/theme` — never hardcode values.

```ts
import { colors, spacing, fontSize, fontWeight, borderRadius, zIndex } from '../../theme';
```

## Auth flow

1. App starts → `NavigationContainer` calls `hydrate()` → reads token + user from `EncryptedStore`
2. `isHydrating === true` → `SplashScreen` shown
3. `isHydrating === false` → `Route` renders `Login` or `App` based on `isAuthenticated`
4. `apiClient` auto-refreshes expired tokens (401 → `AuthApi.refresh` → retry) before dispatching logout

## Commands

```bash
npx expo start          # dev server
npx expo start --ios    # iOS simulator
npx expo start --android
npx expo start --web
npx tsc --noEmit        # type check — run before every commit
```
