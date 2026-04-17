import { pkceService } from './pkce';
import { AUTH_CONFIG } from '@/shared/config/auth';
import { resolveEndpoint } from '@/shared/config/auth';

export const navigateToLogin = async () => {
  try {
    const { challenge, state } = await pkceService.generateContext();

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: AUTH_CONFIG.clientId,
      redirect_uri: AUTH_CONFIG.redirectUri,
      scope: AUTH_CONFIG.scope || 'openid profile read',
      code_challenge: challenge,
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
