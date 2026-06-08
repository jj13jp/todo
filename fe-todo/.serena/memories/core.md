# todo-frontend — Core

Single-page Todo app (frontend only). Connects to an external REST API via `VITE_API_BASE_URL`.

## Source Map

```
app/
  lib/api.ts        — typed API client (Todo interface, api.todos.{list,create,update,delete})
  routes/_index.tsx — main Todo page (clientLoader + clientAction + TodoItem component)
  root.tsx          — root layout (Google Fonts: Cormorant Garamond + JetBrains Mono)
  app.css           — design system + component styles (no Tailwind utilities, all custom .todo-* classes)
  routes.ts         — React Router v7 flat file-based route config (flatRoutes())
.env / .env.example — VITE_API_BASE_URL=http://localhost:3000
vite.config.ts      — Vite + React Router + Tailwind + React Compiler (babel-plugin-react-compiler)
biome.json          — linter/formatter config
react-router.config.ts — SSR enabled, v8 future flags on
```

## Project-Wide Invariants

- SSR is enabled (`ssr: true`). Data fetching uses `clientLoader` (not `loader`) because the API URL is client-side.
- `clientLoader.hydrate = true` forces client fetch on initial hydration; `HydrateFallback` covers loading state.
- All mutations go through `clientAction` with an `intent` field (`create` | `toggle` | `delete`).
- Optimistic UI: each `TodoItem` uses two independent `useFetcher()` instances (toggle + delete).
- No test framework configured yet.

See `mem:tech_stack`, `mem:conventions`, `mem:suggested_commands`, `mem:task_completion`.
