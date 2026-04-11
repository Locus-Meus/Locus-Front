const PKCE_VERIFIER_KEY = 'pkce_verifier';
const PKCE_STATE_KEY = 'pkce_state';
const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

const crypto = globalThis.crypto;

function toBase64Url(array: Uint8Array): string {
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function generateRandomString(length: number): string {
  const values = new Uint8Array(length);
  crypto.getRandomValues(values);
  return Array.from(values, (x) => CHARSET[x % CHARSET.length]).join('');
}

export const pkceService = {
  generateContext: async () => {
    const verifier = generateRandomString(64);
    const state = generateRandomString(32);

    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const challenge = toBase64Url(new Uint8Array(hash));

    sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
    sessionStorage.setItem(PKCE_STATE_KEY, state);

    return { challenge, state };
  },

  getStored: () => ({
    verifier: sessionStorage.getItem(PKCE_VERIFIER_KEY),
    state: sessionStorage.getItem(PKCE_STATE_KEY),
  }),

  clear: () => {
    sessionStorage.removeItem(PKCE_VERIFIER_KEY);
    sessionStorage.removeItem(PKCE_STATE_KEY);
  },
};
