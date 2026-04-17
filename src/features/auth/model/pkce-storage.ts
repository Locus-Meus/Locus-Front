const PKCE_VERIFIER_KEY = 'pkce_verifier';
const PKCE_STATE_KEY = 'pkce_state';

export function storePkceContext(verifier: string, state: string): void {
  sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
  sessionStorage.setItem(PKCE_STATE_KEY, state);
}

export function getStoredPkceContext(): {
  verifier: string | null;
  state: string | null;
} {
  return {
    verifier: sessionStorage.getItem(PKCE_VERIFIER_KEY),
    state: sessionStorage.getItem(PKCE_STATE_KEY),
  };
}

export function clearStoredPkceContext(): void {
  sessionStorage.removeItem(PKCE_VERIFIER_KEY);
  sessionStorage.removeItem(PKCE_STATE_KEY);
}
