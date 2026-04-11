/**
 * Best Practice: Dynamically infer the redirect URI based on the environment.
 * In a PWA, this ensures the callback works whether you are on localhost or production.
 */
const inferRedirectUri = (): string => {
  if (typeof window === 'undefined') return 'http://localhost:5173/callback';
  return `${window.location.origin}/callback`;
};

export const AUTH_CONFIG = {
  issuer: import.meta.env.VITE_AUTH_ISSUER || '',
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID || 'client',
  scope: import.meta.env.VITE_AUTH_SCOPE || 'openid profile email api.read',
  redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI || inferRedirectUri(),

  endpoints: {
    // Session & Security
    csrf: import.meta.env.VITE_AUTH_CSRF_ENDPOINT || '/auth/csrf-token',
    signIn: import.meta.env.VITE_AUTH_SIGN_IN_ENDPOINT || '/auth/sign-in',

    // OAuth2 / PKCE Flow
    authorize:
      import.meta.env.VITE_AUTH_AUTHORIZE_ENDPOINT || '/auth/oauth2/authorize',
    token: import.meta.env.VITE_AUTH_TOKEN_ENDPOINT || '/auth/oauth2/token',

    // Management
    logout: '/auth/logout',
    signUp: '/auth/sign-up',
    resetPassword: '/auth/reset-password',
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
