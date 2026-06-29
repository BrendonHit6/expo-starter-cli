# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

## Stack

- **Expo** ~56.0.12 · **React Native** 0.85 · **React** 19 · **TypeScript** strict
- **Navigation** Expo Router ~56.2 — file-based routing under `src/app/`, route groups `(auth)` and `(app)`, auth gate in root `_layout.tsx`
- **State** Redux Toolkit v2 — three slices: `app`, `user`, `toast`
- **API** custom fetch-based `apiClient` with request/response interceptors and automatic 401 → token refresh → retry
- **Auth storage** `EncryptedStore` (never AsyncStorage for tokens or user data)
- **Icons** `@expo/vector-icons` (Ionicons)
- **Styling** **NativeWind v4** (Tailwind for React Native) — utility classes via `className`. No `StyleSheet.create()`, no inline `style={}` except for dynamic numeric values (size, animated opacity, etc.)

## Code rules

- Functional components everywhere. `ErrorBoundary` is the **only** allowed class component.
- All business logic lives in custom hooks (`src/hooks/`), never in route or component files.
- Use `useAppDispatch` / `useAppSelector` from `src/redux/store` — never raw `useDispatch` / `useSelector`.
- Every route component uses `<ScreenWrapper>` as its root element.
- All API calls go through `apiClient` (`src/api/apiClient.ts`), not raw `fetch`.
- Show global feedback via `showToast` dispatch — never `Alert.alert`.
- Log via `Logger` (`src/utils/Logger.ts`) — never `console.log` directly.
- Use `@/` path alias for absolute imports from `src/`.

## File convention

Every route component and shared component lives in its own folder:

```
ComponentName/
  ComponentName.tsx   ← component only, no logic, Tailwind classes via className
  helper.ts           ← pure functions: formatting, derived values, className mappers
  index.ts            ← barrel: export { default } from './ComponentName'
```

Route files in `src/app/` are thin — they import a screen component from `src/screens/` (or define one inline) and render it.

## Project structure

```
src/
  app/                       ← Expo Router file-based routes
    _layout.tsx              ← root: ErrorBoundary + Provider + AuthGate + Toast
    +not-found.tsx           ← 404 fallback
    (auth)/
      _layout.tsx            ← auth-group layout (Stack, no header)
      login.tsx              ← /login
    (app)/
      _layout.tsx            ← Tabs navigator: index / notifications / profile / settings
      index.tsx              ← /(app)/ → Home
      notifications.tsx
      profile.tsx
      settings.tsx

  api/
    apiClient.ts             ← fetch wrapper: get/post/put/delete + 401 refresh + retry
    requestInterceptor.ts    ← attaches Bearer token from EncryptedStore
    responseInterceptor.ts
    AuthApi.ts               ← login(credentials), refresh(token)
    UserApi.ts
    urls.ts                  ← API endpoint constants

  components/                ← shared UI (Button, Input, Avatar, Toast, Loader, ScreenWrapper, ErrorBoundary)

  hooks/
    useAuth.ts               ← login / logout / hydrate
    useAppState.ts           ← foreground/background lifecycle
    useKeyboard.ts           ← keyboard height + visibility
    useBackHandler.ts        ← Android back button override

  redux/
    store.ts                 ← configureStore + RootState + AppDispatch + typed hooks
    slices/
      AppSlice.ts            ← isAuthenticated · isHydrating
      UserSlice.ts           ← user · isLoading · error
      ToastSlice.ts          ← message · visible · type (success | error | info)

  theme/
    index.ts                 ← colors · spacing · fontSize · fontWeight · borderRadius · zIndex

  types/
    UserInterface.ts
    MediaInterface.ts
    AppConfigInterface.ts

  utils/
    EncryptedStore.ts        ← getToken/setToken/getRefreshToken/setRefreshToken/getUser/setUser/clear
    authActions.ts           ← performLogout (clears store + EncryptedStore)
    Logger.ts                ← log / warn / error (wraps console with prefix)
    Analytics.ts
    ErrorManager.ts
    DateTimeUtils.ts
    CommonUtils.ts
    string.ts
    constants.ts
    enums.ts
```

## Routing architecture (Expo Router)

```
src/app/_layout.tsx (root)
  ErrorBoundary
    Provider (Redux)
      AuthGate                    ← hydrate() on mount, redirect via useRouter+useSegments
        Slot                      ← renders matched (auth) or (app) layout
      Toast                       ← global overlay, z-index above everything

(auth)/_layout.tsx → Stack (header hidden) → login
(app)/_layout.tsx  → Tabs              → index / notifications / profile / settings
```

- **Auth gating** lives in `AuthGate` inside root `_layout.tsx`: on each `segments` change, it redirects to `/(auth)/login` if unauth, or `/(app)/` if authed but in auth group.
- **Splash** is held with `SplashScreen.preventAutoHideAsync()` until `isHydrating === false`.
- **Deep links** are auto-derived from the file structure: `myapp:///login`, `myapp:///profile`, etc.
- **Adding a new route** = creating a new `.tsx` file in `src/app/(app)/` or `(auth)/`. No central route registry to update.

## Redux slices

| Slice | Key state | Key actions |
|-------|-----------|-------------|
| `app` | `isAuthenticated`, `isHydrating` | `setAuthenticated`, `setHydrating` |
| `user` | `user`, `isLoading`, `error` | `setUser`, `clearUser`, `setLoading`, `setError` |
| `toast` | `message`, `visible`, `type` | `showToast({ message, type? })`, `hideToast` |

## Theme tokens

Design tokens live in **two places**:

1. `tailwind.config.js` — colors exposed as Tailwind utilities (`bg-primary`, `text-error`, `border-border`, `bg-overlay-dark`, ...). Spacing/sizing use the default Tailwind scale (e.g. `p-4` = 16px, `mb-2` = 8px).
2. `src/theme/index.ts` — same values as raw JS constants, for code paths that need numeric tokens (animations, dynamic style props, navigator options).

Rule of thumb: prefer Tailwind classes in JSX. Use `src/theme` only when a value must be a number at runtime (e.g. `tabBarActiveTintColor`, `Animated.Value`, computed `width/height`).

## Auth flow

1. App starts → root `_layout.tsx` mounts → `AuthGate` calls `hydrate()` → reads token + user from `EncryptedStore`
2. `isHydrating === true` → splash held visible
3. `isHydrating === false` → `SplashScreen.hideAsync()` + redirect based on `isAuthenticated` and current `segments[0]`
4. `apiClient` auto-refreshes expired tokens (401 → `AuthApi.refresh` → retry) before dispatching logout

## Commands

```bash
npx expo start          # dev server
npx expo start --ios    # iOS simulator
npx expo start --android
npx expo start --web
npx tsc --noEmit        # type check — run before every commit
```
