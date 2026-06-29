---
description: Pre-flight checks before pushing or building — lint, typecheck, tests.
---

Run the full pre-ship check sequence on the current branch. Stop at the first failure and report the smallest reproduction.

1. `npx tsc --noEmit` — type check
2. `npx eslint . --max-warnings=0` — lint with zero-warning policy
3. `npx jest --passWithNoTests` — unit tests
4. `git status` — confirm there are no untracked files that should be committed

If all pass, print: `Ready to ship. Next: git push or eas build --profile <profile>`.

Do **not** run `eas build` or `git push` automatically — the user triggers those manually.
