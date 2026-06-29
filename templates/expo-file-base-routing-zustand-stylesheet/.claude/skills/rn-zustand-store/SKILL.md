---
name: rn-zustand-store
description: Create a new Zustand store following project conventions (single-slice selectors, action co-location, no whole-store reads, optional persistence).
---

When asked to add a new Zustand store, follow these rules.

## 1. File location

`src/store/<feature>Store.ts` — one file per store. Names: `appStore`, `userStore`, `toastStore`, etc. The hook export is always `use<Feature>Store`.

## 2. Shape

```ts
import { create } from 'zustand';

type <Feature>State = {
  // state fields (no functions)
};

type <Feature>Actions = {
  // setters and action functions
};

type <Feature>Store = <Feature>State & <Feature>Actions;

const initialState: <Feature>State = {
  // ...
};

export const use<Feature>Store = create<<Feature>Store>((set, get) => ({
  ...initialState,
  // actions
  reset: () => set(initialState),
}));
```

- State and actions are co-located in a single object.
- Always include a `reset` action that restores `initialState`.
- Never define a separate reducer file.

## 3. Persistence (only if required)

Use `zustand/middleware` `persist` with `AsyncStorage` (or `expo-secure-store` for sensitive data):

```ts
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const use<Feature>Store = create<<Feature>Store>()(
  persist(
    (set) => ({ ...initialState /* actions */ }),
    {
      name: '<feature>-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ /* only persist these fields */ }),
    },
  ),
);
```

Sensitive tokens → `expo-secure-store`, never `AsyncStorage`.

## 4. Consumption rules

In components and hooks:

```ts
// GOOD — single slice
const value = useFeatureStore((s) => s.value);
const setValue = useFeatureStore((s) => s.setValue);

// BAD — selects whole store, re-renders on every change
const store = useFeatureStore();
```

For imperative access (event handlers, non-React code):

```ts
useFeatureStore.getState().setValue(x);
```

## 5. Checklist

- [ ] File at `src/store/<feature>Store.ts`
- [ ] `reset` action restores `initialState`
- [ ] No whole-store selects anywhere
- [ ] Persistence configured only if state must survive cold start
- [ ] Sensitive data uses `expo-secure-store`, not `AsyncStorage`
- [ ] `npx tsc --noEmit` passes
