# Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Language | TypeScript | ^5.9.3 (strict mode) |
| UI | React | ^19.2.6 |
| Framework | React Router | 7.16.0 |
| Build | Vite | ^8.0.3 |
| Styling | Tailwind CSS v4 | ^4.2.2 (via @tailwindcss/vite) |
| Lint/Format | Biome | 2.4.16 |
| Package manager | pnpm | (workspace: pnpm-workspace.yaml) |
| React Compiler | babel-plugin-react-compiler | 1.0.0 (via vite-plugin-babel) |
| Container | Docker | Dockerfile present |

## Key version-sensitive notes

- Tailwind v4: config lives in CSS (`@theme {}` in `app/app.css`), not `tailwind.config.js`.
- React Router v7: uses `flatRoutes()` from `@react-router/fs-routes`; route types auto-generated into `.react-router/types/`.
- React Compiler applied to all `.[jt]sx?` files via `include` option (not deprecated `filter`).
- `VITE_*` env vars are baked in at build time; exposed as `import.meta.env.VITE_*`.
