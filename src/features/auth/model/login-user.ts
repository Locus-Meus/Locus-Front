import { authApi } from '../api/auth-api';
import { pkceService } from './pkce';
import { AUTH_CONFIG } from '@/shared/config/auth';

export const loginUser = async () => {
  try {
    // 1. Get CSRF from Java
    const csrf = await authApi.getCsrfToken();

    // 3. Prepare PKCE context
    const { challenge, state } = await pkceService.generateContext();

    // 4. Construct the Java Auth Server URL
    // We use URLSearchParams for clean, safe encoding
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: AUTH_CONFIG.clientId,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      state: state,
      scope: AUTH_CONFIG.scope || 'openid profile',
      redirect_uri: AUTH_CONFIG.redirectUri,
    });

    const authUrl = `${AUTH_CONFIG.endpoints.authorize}?${params.toString()}`;

    // 5. Redirect to initiate the Auth Code exchange
    window.location.href = authUrl;
  } catch (error) {
    console.error('Login Flow Error:', error);
    throw new Error('Authentication failed. Please check your credentials.');
  }
};
