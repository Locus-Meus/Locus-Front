# Auth Knowledge

## Current Direction

- Authentication is being moved to Java backend.
- Local frontend auth pages for sign-up/reset-password were removed.
- Public auth entry is now a welcome-style sign-in page at `/` (also reachable by `/sign-in`).

## Current Flow

- Sign In button calls `navigateToLogin()` from:
  - `src/features/auth/model/navigate-to-login.ts`
- `navigateToLogin()`:
  - Generates PKCE context (`code_challenge`, `state`) via `pkceService`.
  - Builds OAuth2 authorize URL and redirects browser.

## OAuth2 Authorize Query Shape

Default target:
- `http://localhost:8888/oauth2/authorize`

Query params used:
- `response_type=code`
- `client_id=react-client`
- `redirect_uri=http://localhost:5175/callback`
- `scope=openid%20profile%20read`
- `code_challenge=<generated>`
- `code_challenge_method=S256`
- `state=<generated>`

Notes:
- Scope is encoded with `%20` separators.
- Authorize endpoint can be overridden by `VITE_AUTH_AUTHORIZE_ENDPOINT`.

## Config Source

Auth config is centralized in:
- `src/shared/config/auth.ts`

Important defaults:
- `issuer`: `http://localhost:8888`
- `clientId`: `react-client`
- `redirectUri`: `http://localhost:5175/callback`
- `scope`: `openid profile read`
- `endpoints.authorize`: `http://localhost:8888/oauth2/authorize`

## Related Routing/Guards

- Router: `src/app/providers/router.tsx`
  - Public: `/`, `/sign-in`, `/callback`
  - Protected: `/gallery`
- Guard: `src/app/providers/require-auth.tsx`
  - Redirects unauthenticated users to `/`.
- Base API client: `src/shared/api/base-api-client.ts`
  - On 401, clears session and redirects to `/`.

## Removed Local Auth UI

Removed files include local forms/pages:
- `src/features/auth/ui/sign-in-form.tsx`
- `src/features/auth/ui/sign-up-form.tsx`
- `src/features/auth/ui/reset-password-form.tsx`
- `src/pages/sign-up/*`
- `src/pages/reset-password/*`

## Open Questions (For Future Updates)

- Final Java sign-up URL/UX contract (currently welcome button redirects via `AUTH_CONFIG.endpoints.signUp`).
- Whether token exchange remains in frontend callback handler or fully moves server-side.
