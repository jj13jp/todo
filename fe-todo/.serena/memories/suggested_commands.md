# Suggested Commands

## Development

```bash
pnpm dev          # dev server (react-router dev)
pnpm build        # production build (react-router build)
pnpm start        # serve production build
pnpm typecheck    # react-router typegen && tsc (generates .react-router/types first)
pnpm format       # biome format --write app/**/*
```

## Lint / Check (not in package.json scripts — run directly)

```bash
pnpm exec biome check --write --unsafe <file>   # format + lint + fix a file
pnpm exec biome check app/                      # check whole app dir
```

## Notes

- `pnpm typecheck` must run `react-router typegen` first to regenerate `+types/*` route type files; always use the script, not bare `tsc`.
- No test runner configured yet.
