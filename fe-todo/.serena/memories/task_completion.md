# Task Completion Checklist

Run these in order after any coding change:

```bash
pnpm typecheck   # type errors — must pass clean
pnpm build       # build errors — must pass clean
pnpm format      # auto-fix formatting (Biome)
```

If only CSS changed, `pnpm typecheck` can be skipped; `pnpm build` still validates the CSS pipeline.

## Biome warnings to watch

- CSS "Descending specificity" warning (lint): lower-specificity selectors must come before compound selectors targeting the same property.
- `filter` option in `vite-plugin-babel` is deprecated — use `include` instead (already fixed in vite.config.ts).

## No tests yet

No test runner is configured. Manual browser verification via `pnpm dev` is the only runtime check available.
