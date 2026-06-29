---
name: rn-expo-route
description: Add a new Expo Router route (screen, nested stack, or tab) with correct group placement, layout registration, deep-link verification, and thin route file.
---

When asked to add a new route, follow these rules.

## 1. Decide the group

- **Authenticated** (user must be signed in) → `src/app/(app)/<route>.tsx`
- **Auth flow** (sign-in, register, forgot password) → `src/app/(auth)/<route>.tsx`
- **Modal / overlay** → `src/app/(app)/<route>.tsx` with `presentation: 'modal'` in `<Stack.Screen options>`
- **Nested stack** → `src/app/(app)/<feature>/_layout.tsx` + `index.tsx` + child routes

## 2. Route file is THIN

The file under `src/app/` only re-exports the screen — no logic, no styles:

```tsx
import <FeatureName>Screen from '@/screens/<FeatureName>Screen';
export default <FeatureName>Screen;
```

If the route needs `Stack.Screen` options (title, modal, gestures), set them in the parent `_layout.tsx`, not inline in the route.

## 3. Register in layout (tabs / stacks)

For a new **tab**, edit `src/app/(app)/_layout.tsx`:
- Add `<Tabs.Screen name="<route>" options={{ title: '...' }} />`
- Add an icon entry in the `TAB_ICONS` map

For a new **stack screen inside an existing stack**, no registration needed — Expo Router discovers it from the file path.

## 4. Dynamic routes

- Single param: `[id].tsx` → access via `useLocalSearchParams<{ id: string }>()`
- Catch-all: `[...slug].tsx` → `slug: string[]`
- Always type `useLocalSearchParams` — never leave it as `any`.

## 5. Navigation

Use `useRouter()` from `expo-router` inside a hook (`src/hooks/use<Feature>.ts`), never inline in the screen. Prefer `router.push` for new screens, `router.replace` for auth transitions, `router.back` for dismissals.

## 6. Deep links

Expo Router derives deep links from the file path. Verify:
- `src/app/(app)/profile.tsx` → `myapp:///profile`
- `src/app/(app)/post/[id].tsx` → `myapp:///post/123`

Groups in parens (`(app)`, `(auth)`) do **not** appear in the URL.

If the route accepts params from a deep link, validate them in the hook before use — never pass raw deep-link strings to `fetch`, navigation, or WebViews.

## 7. Checklist

- [ ] Correct group: `(app)` vs `(auth)`
- [ ] Route file is a thin re-export of the screen
- [ ] Tab routes registered in `(app)/_layout.tsx` with icon
- [ ] Dynamic params typed via `useLocalSearchParams<...>()`
- [ ] Navigation calls live in a hook, not the screen body
- [ ] Deep-link params validated before use
- [ ] `npx tsc --noEmit` passes
