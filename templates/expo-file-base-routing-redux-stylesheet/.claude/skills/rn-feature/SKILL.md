---
name: rn-feature
description: Scaffold a new Expo Router screen or feature module with the route file, folder structure, Redux slice, hooks, types, and styles following this project's architecture.
---

When creating a new screen or feature module, follow these steps exactly:

## 1. Route file (Expo Router)

Add the route under the appropriate group in `src/app/`:

- **Authenticated screen** → `src/app/(app)/<feature>.tsx`
- **Auth-flow screen** → `src/app/(auth)/<feature>.tsx`
- **Nested route** → `src/app/(app)/<feature>/index.tsx` (plus optional `_layout.tsx` for stack/tabs)

The route file should be thin — import the screen component from `src/screens/` and render it:

```ts
import <FeatureName>Screen from '@/screens/<FeatureName>Screen';
export default <FeatureName>Screen;
```

For a new tab, also register it in `src/app/(app)/_layout.tsx` (add `<Tabs.Screen name="<feature>" />` and an entry in `TAB_ICONS`).

## 2. Screen component directory

```
src/screens/<FeatureName>Screen/
  ├── <FeatureName>Screen.tsx   # Component (functional, no business logic)
  ├── styles.ts                 # StyleSheet.create() — no inline styles
  ├── helper.ts                 # Pure helper functions
  └── index.ts                  # Barrel: export { default } from './<FeatureName>Screen'
```

For a **shared component**: same layout under `src/components/<ComponentName>/`.

## 3. Redux slice (if the feature has shared or persistent state)

Create `src/redux/slices/<Feature>Slice.ts`:
- Use `createSlice` from `@reduxjs/toolkit`
- Define state interface in the slice file
- Export actions and the reducer as default
- Register the reducer in `src/redux/store.ts`

## 4. Custom hook (required)

Create `src/hooks/use<Feature>.ts`:
- All business logic lives here — never in the route or screen component
- Use `useAppDispatch` and `useAppSelector` (never raw `useDispatch`/`useSelector`)
- API calls go through `src/api/` modules
- Return only what the component needs
- For navigation use `useRouter()` from `expo-router` inside the hook

## 5. Linking / deep links

Expo Router auto-generates deep links from the file path — no central registry to update. Verify the path matches the file location: `src/app/(app)/profile.tsx` → `myapp:///profile`.

## 6. Checklist before finishing

- [ ] Run `npx tsc --noEmit` — zero type errors
- [ ] Screen uses `<ScreenWrapper>` as root element
- [ ] No inline styles anywhere
- [ ] Business logic is in a hook, not the component or route file
- [ ] Route file is a thin re-export of the screen component
- [ ] `index.ts` barrel export exists
- [ ] If it's a new tab, registered in `(app)/_layout.tsx` with an icon
