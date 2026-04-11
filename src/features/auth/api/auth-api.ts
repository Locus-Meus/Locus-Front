import { BaseApiClient } from '@/shared/api/base-api-client';
import { AUTH_CONFIG } from '@/shared/config/auth';
import type {
  CsrfToken,
  SignInPayload,
  AuthTokenResponse,
} from '../model/types';

class AuthApi extends BaseApiClient {
  constructor() {
    super(AUTH_CONFIG.issuer || '/api');
  }

  public async getCsrfToken(): Promise<CsrfToken> {
    return this.get<CsrfToken>(AUTH_CONFIG.endpoints.csrf);
  }

  public async signIn(payload: SignInPayload, csrf: CsrfToken): Promise<void> {
    const params = new URLSearchParams();
    params.set('username', payload.username);
    params.set('password', payload.password);
    params.set(csrf.parameterName, csrf.token);

    return this.post(AUTH_CONFIG.endpoints.signIn, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }

  public async exchangeCodeForToken(
    code: string,
    verifier: string,
  ): Promise<AuthTokenResponse> {
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('code', code);
    params.set('code_verifier', verifier);
    params.set('redirect_uri', AUTH_CONFIG.redirectUri);
    params.set('client_id', AUTH_CONFIG.clientId);

    return this.post<AuthTokenResponse>(AUTH_CONFIG.endpoints.token, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}

export const authApi = new AuthApi();
