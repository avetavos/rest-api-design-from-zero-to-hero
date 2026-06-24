# REST API Design — From Zero to Hero

A bilingual (EN/TH), standalone, beginner→advanced course on **designing RESTful HTTP APIs**, taught with **TypeScript**. From HTTP/REST foundations through resource & URI design, method semantics, status codes & error shapes (RFC 9457 problem+json), collection querying, versioning/caching, security, and OpenAPI + a working Hono implementation. Logic snippets run in the browser; full API servers open in StackBlitz. Diagrams are **Mermaid**, and there's a **read-mode** toggle.

All content is original.

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Site framework | [Astro 6](https://astro.build) + [Starlight 0.40](https://starlight.astro.build) |
| UI islands | [Preact](https://preactjs.com) (via `@astrojs/preact`) |
| Hands-on | **`<NodeRunner>`** runs JS in a sandboxed iframe with console capture (logic snippets). `stackblitz` mode opens a runnable **Hono** TypeScript API (`node-runner.ts` builds the project; lesson `code` defines routes on a pre-declared `app`). |
| Diagrams | Client-side, theme-aware **Mermaid** (`<Mermaid>` + `public/enhance.js`) |
| Reading | **Read-mode** toggle (hides sidebar/TOC, widens content) via `public/enhance.js` |
| Unit tests | [Vitest](https://vitest.dev) + `@testing-library/preact` |
| i18n | Starlight built-in, `defaultLocale: 'en'`, locales: `en` + `th` |

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build production site to ./dist/
npm run preview    # Preview the production build locally
npm test           # Run Vitest unit tests
```

## Content Structure

```
src/content/docs/
  en/                              # English — served at /en/...
    http-and-rest/                 # request/response, methods, status codes, REST constraints
    resource-and-uri-design/       # modeling resources, URI naming, nesting, consistency
    methods-crud-idempotency/      # GET/POST/PUT/PATCH/DELETE, idempotency, bulk & async
    status-and-errors/             # status codes, problem+json, validation, error handling
    collections-querying/          # pagination, filtering, sorting, field selection, search
    versioning-caching/            # versioning, content negotiation, ETags, conditional requests
    security/                      # authn/authz, JWT/OAuth2, CORS, rate limiting, validation
    docs-testing-building/         # OpenAPI, testing, a Hono implementation, recap
    index.mdx                      # EN landing (splash)
  th/                              # Thai — served at /th/...
    (same module directories)
    index.mdx
```

### Components & Lesson Template

- **`NodeRunner.tsx`** `{ code, node? }` — sandboxed-iframe JS runner with console capture; `stackblitz` mode builds a runnable Hono API via `node-runner.ts`. Hoist runnable code as `export const ...Code` and pass to `<NodeRunner code={...} />` (add `stackblitz` for a Hono server).
- **`Mermaid.astro`** `{ code, title }`, **`Callout.astro`** `{ title }`, **`Quiz.tsx`** `{ id, questions }` (0-based `answer`, field `q`), **`ProgressTracker.tsx`** `{ id }`.

Per-lesson order: frontmatter → imports → concept intro → prose (fenced `ts`/`http`/`json` + `<Mermaid>`) → `export const ...Code` + `<NodeRunner>` (where runnable) → `<Callout>` → `<Quiz>` → `<ProgressTracker>` (last). IDs follow `<module>/<slug>`.

> **⚠️ Authoring notes:**
> - **In `export const` snippets:** escape `${`→`\${` and nested backticks as `` \` ``; double-escape `\\n`. Fenced blocks are literal. HTTP messages go in fenced ` ```http ` blocks.
> - **Never a bare `{...}`/`${...}` in prose** — keep JS/JSON/HTTP in code spans / fenced blocks / `export const`. **Diagrams are Mermaid, not ASCII.**
> - **Internal links include the base path and matching locale** (`/rest-api-design-from-zero-to-hero/en/...` on EN pages, `/th/...` on TH pages).
> - Use **current REST/HTTP practice** (RFC 9457 problem+json, cursor pagination, OAuth2/OIDC, ETags/conditional requests, OpenAPI 3.1).

## Deployment

Fully static → `dist/`. Base path in `astro.config.mjs`: `site: 'https://avetavos.github.io'`, `base: '/rest-api-design-from-zero-to-hero'`.

Deployed to GitHub Pages via **branch-source** (`gh-pages`): build `dist/`, add `.nojekyll`, push to `gh-pages`, set **Settings → Pages → Source: Deploy from a branch → `gh-pages` / `/`**, then **request a Pages build** (`gh api -X POST repos/<owner>/<repo>/pages/builds`) — flipping the source alone does not trigger one. If you change `base`, update the base-prefixed links in `src/content/docs/{en,th}/index.mdx`.
