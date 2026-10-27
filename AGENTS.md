<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Product

- OpenDayCare is a daycare app with two roles: `guardería` / staff and `familia` / parent.
- UI copy is Spanish (Rioplatense, voseo), matching the designs.
- `app/` is still the create-next-app starter. The target UI is in `references/pantallas/*.dc.html` (start at `index.dc.html`) with visual references in `references/screenshots/`. Treat these as the design source of truth; they are static prototypes, not code to import.

## Commands

- `npm run dev` — dev server (Turbopack).
- `npm run build` — production build.
- `npm run lint` — ESLint only. `next lint` was removed in Next 16; never call it.
- No test runner or typecheck script is configured. Typecheck with `npx tsc --noEmit`.

## Next.js 16.4 specifics

- Consult the version-matched docs in `node_modules/next/dist/docs/` before using APIs. For rendering behavior read `01-app/01-getting-started/08-caching.md` and `01-app/02-guides/prefetching.md`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, so PPR and partial prefetching are active. Uncached data (`cookies()`, `headers()`, `searchParams`, uncached `fetch`, runtime APIs) must be inside `<Suspense>` or cached with `"use cache"`; otherwise prerendering blocks or fails. Don't use removed legacy PPR flags.
- `PageProps<'/path'>`, `LayoutProps<'/path'>`, and `RouteContext<'/path'>` are global helpers — do not import them.
- `@/*` maps to the repository root; there is no `src/`.
- Tailwind v4 is wired through `@tailwindcss/turbopack`; there is no `tailwind.config.*`. Theme tokens live in `app/globals.css` via `@theme`. The designs use Fredoka + Nunito, while the starter still uses Geist.
- `next dev` rewrites the managed blocks at the top of this file and may add an agent-feedback block because `experimental.agentFeedback` is enabled. Keep those blocks and commit `AGENTS.md` with related work.

## Spec workflow

- Large features go through the `spec` skill (`/spec`), then `spec-impl` (`/spec-impl NN-slug`). Specs live in `specs/NN-slug.md` (the folder does not exist yet); implementation requires a status meaning Approved and creates branch `spec-NN-slug`.
- `/spec` writes no code. `/spec-impl` pauses for diff review after each plan step. Do not commit or otherwise change git state unless the user explicitly asks.

## Tools

- Playwright artifacts and screenshots must go in `.playwright-mcp/` (gitignored).
- Use Context7 MCP for third-party library docs; use the bundled Next docs for Next.js.

## Code rules
- Use clean code, names, methods, variables, etc. in English language.

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
