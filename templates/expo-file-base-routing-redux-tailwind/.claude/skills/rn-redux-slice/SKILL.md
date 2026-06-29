---
name: rn-redux-slice
description: Create a new Redux Toolkit slice following project conventions (typed hooks, registered reducer, selectors co-located, optional RTK Query endpoint).
---

When asked to add a new Redux slice, follow these rules.

## 1. File location

`src/redux/slices/<feature>Slice.ts` — one file per slice. Naming: `authSlice`, `cartSlice`, `userSlice`.

## 2. Shape

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type <Feature>State = {
  // ...
};

const initialState: <Feature>State = {
  // ...
};

const <feature>Slice = createSlice({
  name: '<feature>',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setValue, reset } = <feature>Slice.actions;
export const select<Feature>Value = (s: RootState) => s.<feature>.value;
export default <feature>Slice.reducer;
```

- Every slice exports a `reset` action.
- Selectors live in the slice file, named `select<Feature><Field>`.
- Never type state as `any` — always declare the State type.

## 3. Register the reducer

Add to `src/redux/store.ts`:

```ts
import <feature>Reducer from './slices/<feature>Slice';

export const store = configureStore({
  reducer: {
    // existing reducers...
    <feature>: <feature>Reducer,
  },
});
```

## 4. Consumption rules

Always use the typed hooks (`useAppDispatch`, `useAppSelector`) from `src/redux/hooks.ts` — never raw `useDispatch` / `useSelector`.

```ts
const value = useAppSelector(selectFeatureValue);
const dispatch = useAppDispatch();
dispatch(setValue('x'));
```

## 5. RTK Query (only for server state)

If the feature is server-backed, prefer an RTK Query endpoint over manual `fetch` + slice:

- Add endpoint to the existing API slice in `src/redux/api/` (or create one if missing).
- Use `useGet<Feature>Query` in hooks; do not duplicate cached data into a slice.

## 6. Checklist

- [ ] File at `src/redux/slices/<feature>Slice.ts`
- [ ] State type explicitly declared
- [ ] `reset` action exists
- [ ] Selectors co-located, named `select<Feature><Field>`
- [ ] Reducer registered in `src/redux/store.ts`
- [ ] Consumers use `useAppDispatch` / `useAppSelector`
- [ ] Server state uses RTK Query, not manual fetch + slice
- [ ] `npx tsc --noEmit` passes
