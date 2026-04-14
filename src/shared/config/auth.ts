export const AUTH_CONFIG = {
  issuer: import.meta.env.VITE_AUTH_ISSUER || 'http://localhost:5175',
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID || 'client',
  clientSecret: import.meta.env.VITE_AUTH_CLIENT_SECRET || 'secret',
  scope: import.meta.env.VITE_AUTH_SCOPE || 'openid profile email api.read',
  redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI || 'http://localhost:5175/callback',

  endpoints: {
    // Session & Security
    csrf: import.meta.env.VITE_AUTH_CSRF_ENDPOINT || 'api/csrf-token',
    signIn: import.meta.env.VITE_AUTH_SIGN_IN_ENDPOINT || 'api/sign-in',

    // OAuth2 / PKCE Flow
    authorize:
      import.meta.env.VITE_AUTH_AUTHORIZE_ENDPOINT || 'api/oauth2/authorize',
    token: import.meta.env.VITE_AUTH_TOKEN_ENDPOINT || 'api/oauth2/token',

    // Management
    logout: 'api/logout',
    signUp: 'api/sign-up',
    resetPassword: 'api/reset-password',
  },
} as const;

/**
 * Utility to resolve an endpoint.
 * If the endpoint is relative, it appends the issuer.
 */
export function resolveEndpoint(endpoint: string): string {
  if (endpoint.startsWith('http')) return endpoint;

  const base = AUTH_CONFIG.issuer.endsWith('/')
    ? AUTH_CONFIG.issuer.slice(0, -1)
    : AUTH_CONFIG.issuer;

  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${base}${path}`;
}
