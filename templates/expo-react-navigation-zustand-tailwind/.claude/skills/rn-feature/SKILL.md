---
name: rn-feature
description: Scaffold a new React Native screen or feature module with the folder structure, Zustand store, hooks, types, styles, and tests following this project's architecture.
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

## 2. Zustand store (if the feature has shared or persistent state)

Create `src/store/<feature>Store.ts`:
- Use `create` from `zustand`
- Define state interface and actions in the same file
- Export the hook as `use<Feature>Store`
- For imperative access outside React, use `use<Feature>Store.getState()`
- Keep the store flat — co-locate actions with state, no separate reducer files

## 3. Custom hook (required)

Create `src/hooks/use<Feature>.ts`:
- All business logic lives here — never in the screen component
- Select Zustand state with single-slice selectors: `useXxxStore(state => state.value)` (never select the whole store)
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
- [ ] Zustand selectors target a single slice (no whole-store selects)
- [ ] `index.ts` barrel export exists
