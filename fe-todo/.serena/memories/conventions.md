# Conventions

## TypeScript / React

- Strict mode on. No `any`, no implicit `undefined` returns.
- Route files export: `meta`, `clientLoader`, `clientLoader.hydrate`, `HydrateFallback`, `clientAction`, default component.
- Sub-components (e.g. `TodoItem`) defined in same file as the route, not extracted unless reused elsewhere.
- Two `useFetcher()` instances per list item — one per mutation kind — to allow independent optimistic state.

## Styling

- Zero Tailwind utility classes in component JSX. All styles via custom `.todo-*` CSS classes in `app/app.css`.
- Design tokens defined in `@theme {}` block; custom classes use raw hex values (not CSS variables).
- `@starting-style` used for enter animations (no JS animation library).
- CSS specificity rule: lower-specificity selectors must appear before higher-specificity compound selectors targeting the same property.

## Biome (formatter)

- Indent: tabs.
- Quotes: double.
- Semicolons: none (omit).
- Import organization: auto via Biome assist (`organizeImports: "on"`).
- Path alias: `@/*` → `./app/*` (tsconfig paths).

## API Client

- All fetch calls go through `app/lib/api.ts` — never raw `fetch` in route files.
- `Todo` interface is the canonical shape; backend must match `{ id, title, completed, created_at }`.
- HTTP errors throw `Error`; callers catch in `clientLoader`/`clientAction` and return `{ error }`.
