---
name: rn-feature
description: Scaffold a new React Native screen or feature module with the folder structure, Redux slice, hooks, types, styles, and tests following this project's architecture.
---

When creating a new screen or feature module, follow these steps exactly:

## 1. Directory structure

For a **screen** (routed view):
```
src/screens/<FeatureName>Screen/
  ├── <FeatureName>Screen.tsx   # Screen component (functional, no business logic)
  ├── styles.ts                 # StyleSheet.create() — no inline styles
  ├── helper.ts                 # Pure helper functions (formatting, derived data)
  └── index.ts                  # Barrel export: export { default } from './<FeatureName>Screen'
```

For a **shared component**:
```
src/components/<ComponentName>/
  ├── <ComponentName>.tsx
  ├── styles.ts
  ├── helper.ts
  └── index.ts
```

## 2. Redux slice (if the feature has server or persistent state)

Create `src/redux/slices/<Feature>Slice.ts`:
- Use `createSlice` from `@reduxjs/toolkit`
- Define state interface in the slice file
- Export actions and the reducer as default
- Register the reducer in `src/redux/store.ts`

## 3. Custom hook (required)

Create `src/hooks/use<Feature>.ts`:
- All business logic lives here — never in the screen component
- Use `useAppDispatch` and `useAppSelector` (never raw `useDispatch`/`useSelector`)
- API calls go through `src/api/` modules
- Return only what the component needs

## 4. Navigation type

If the screen is navigable, extend `RootStackParamList` in `src/navigation/Route.tsx`:
```ts
export type RootStackParamList = {
  // existing routes...
  <FeatureName>: { id?: string } | undefined;
};
```

## 5. Checklist before finishing

- [ ] Run `npx tsc --noEmit` — zero type errors
- [ ] Screen uses `<ScreenWrapper>` as root element
- [ ] No inline styles anywhere
- [ ] Business logic is in a hook, not the component
- [ ] `index.ts` barrel export exists
