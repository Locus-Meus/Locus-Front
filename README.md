# Locus Front

Mobile-first gallery web app — an installable PWA built on React 19 and TypeScript,
authenticating against a Java/Spring authorization server over OAuth2 with PKCE.

> Companion admin console: [Locus-Admin-FE](https://github.com/Locus-Meus/Locus-Admin-FE)

## Stack

| Area | Choice |
|---|---|
| Framework | React 19, TypeScript 5.7, Vite 6 |
| Routing | React Router 7 |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 |
| Styling | Tailwind CSS 3, Radix UI primitives |
| i18n | i18next — English, Spanish, Russian |
| PWA | `vite-plugin-pwa`, auto-update service worker |
| Auth | OAuth2 Authorization Code + PKCE (`pkce-challenge`) |

## Architecture

Laid out in [Feature-Sliced Design](https://feature-sliced.design/) so dependencies
only ever point downward:

```
src/
├─ app/        providers, router, global styles, RequireAuth guard
├─ pages/      route-level screens (gallery, sign-in, callback, verify-email)
├─ features/   auth, content — user-facing capabilities
├─ entities/   session — business entities
└─ shared/     api client, ui primitives, i18n, config, lib
```

Each slice exposes a public `index.ts`; nothing reaches into another slice's internals.

## Authentication

Browser-redirect **Authorization Code flow with PKCE**, chosen so no client secret
is ever shipped in front-end code.

1. `navigateToLogin()` generates a PKCE verifier/challenge (S256) and an OAuth `state`.
2. Both are persisted to session storage, then the browser redirects to the
   authorization server's `/oauth2/authorize`.
3. The `/callback` route validates the returned `state` against what was stored —
   rejecting the response if it does not match — and exchanges the code plus the
   original verifier for tokens.
4. `silent-auth.ts` refreshes the session in a hidden iframe, so a user is not
   bounced to a login screen mid-session.
5. `redirect-storage.ts` remembers where the user was heading, and returns them
   there after login rather than dropping them on a default page.

Relevant code: [`src/features/auth/model/`](src/features/auth/model/).

All API traffic goes through `BaseApiClient` ([`src/shared/api/`](src/shared/api/)),
which attaches auth headers, normalises errors, and handles HTTP 401 globally by
clearing the local session and redirecting — so no feature reimplements that.

## Running locally

Requires Node.js 20+ and the backend running on `:8888` (see `vite.config.ts` proxy).

```bash
npm install
npm run dev      # http://localhost:5175
```

| Script | Purpose |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

Auth endpoints are configurable via `VITE_AUTH_*` environment variables.

## Notes for AI agents

[`AGENTS.md`](AGENTS.md) carries the project's startup rules and conventions;
[`agents/auth.md`](agents/auth.md) documents the auth flow in depth. Read both
before changing anything auth-related.
