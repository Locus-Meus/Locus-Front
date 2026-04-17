import { useSessionStore } from '@/entities/session';
import { authApi } from '../api/auth-api';
import { clearStoredPkceContext, getStoredPkceContext } from './pkce-storage';

/**
 * Validates the OAuth2 callback and exchanges the code for a token.
 * In FSD, this is an "Action" that coordinates between an Entity and an API.
 */
export async function completePkceFlow(search: string): Promise<void> {
  const searchParams = new URLSearchParams(search);

  // 1. Extract the code from the URL
  const code = searchParams.get('code');
  if (!code) {
    throw new Error('Authorization code is missing in callback URL.');
  }

  // 2. Validate State (Anti-forgery)
  const { verifier, state: expectedState } = getStoredPkceContext();
  const returnedState = searchParams.get('state');

  if (expectedState && returnedState !== expectedState) {
    throw new Error('OAuth state check failed. Potential security risk.');
  }

  // 3. Verify we have the PKCE Verifier
  if (!verifier) {
    throw new Error(
      'PKCE verifier was not found. Please restart the sign-in flow.',
    );
  }

  // 4. Exchange the code for the final JWT via Java Backend
  const tokenResponse = await authApi.exchangeCodeForToken(code, verifier);

  // 5. Update the Zustand Entity Store
  // We use setAuth to save the token and mark the user as authenticated
  const { setAuth } = useSessionStore.getState();

  setAuth(tokenResponse.access_token, {
    // Note: If Java sends user info in the tokenResponse, map it here
    id: 'placeholder-id',
    email: 'user@example.com',
  });

  // 6. Cleanup sensitive temporary data
  clearStoredPkceContext();
}
