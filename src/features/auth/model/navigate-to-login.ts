import pkceChallenge from 'pkce-challenge';
import { AUTH_CONFIG } from '@/shared/config/auth';
import { resolveEndpoint } from '@/shared/config/auth';
import { storePkceContext } from './pkce-storage';

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

function generateState(length = 32): string {
  const values = new Uint8Array(length);
  globalThis.crypto.getRandomValues(values);
  return Array.from(values, (x) => CHARSET[x % CHARSET.length]).join('');
}

export const navigateToLogin = async () => {
  try {
    const state = generateState();
    const challenge = await pkceChallenge(64, 'S256');
    storePkceContext(challenge.code_verifier, state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: AUTH_CONFIG.clientId,
      redirect_uri: AUTH_CONFIG.redirectUri,
      scope: AUTH_CONFIG.scope || 'openid profile read',
      code_challenge: challenge.code_challenge,
      code_challenge_method: 'S256',
      state: state,
    });

    const query = params.toString().replace(/\+/g, '%20');
    const authUrl = `${resolveEndpoint(AUTH_CONFIG.endpoints.authorize)}?${query}`;

    window.location.href = authUrl;
  } catch (error) {
    console.error('Login Flow Error:', error);
    throw new Error('Authentication failed. Please check your credentials.');
  }
};
