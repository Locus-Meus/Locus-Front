import { BaseApiClient } from '@/shared/api/base-api-client';
import { AUTH_CONFIG } from '@/shared/config/auth';
import type {
  CsrfToken,
  SignInPayload,
  AuthTokenResponse,
  SignUpPayload,
  ResetPasswordPayload,
} from '../model/types';

class AuthApi extends BaseApiClient {
  constructor() {
    super(AUTH_CONFIG.issuer || '/api');
  }

  public async heartbeat(): Promise<void> {
    return this.get<void>('/v1/api/heartbeat');
  }

  public async getCsrfToken(): Promise<CsrfToken> {
    return this.get<CsrfToken>(AUTH_CONFIG.endpoints.csrf, {
      skipAuthHandling: true,
    });
  }

  public async signUp(payload: SignUpPayload, csrf: CsrfToken): Promise<void> {
    return this.post(
      AUTH_CONFIG.endpoints.signUp,
      {
        login: payload.email,
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
        birthDate: payload.birthDate,
        phone: payload.phone ?? '',
        language: payload.language,
      },
      {
        headers: {
          [csrf.headerName]: csrf.token,
        },
        skipAuthHandling: true,
      },
    );
  }

  public async signIn(payload: SignInPayload, csrf: CsrfToken): Promise<void> {
    const params = new URLSearchParams();
    params.set('username', payload.username);
    params.set('password', payload.password);
    params.set(csrf.parameterName, csrf.token);

    return this.post(AUTH_CONFIG.endpoints.signIn, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      skipAuthHandling: true,
    });
  }

  public async requestPasswordReset(
    payload: ResetPasswordPayload,
    csrf: CsrfToken,
  ): Promise<void> {
    return this.post(AUTH_CONFIG.endpoints.resetPassword, payload, {
      headers: {
        [csrf.headerName]: csrf.token,
      },
      skipAuthHandling: true,
    });
  }

  public async exchangeCodeForToken(
    code: string,
    verifier: string,
    redirectUri: string = AUTH_CONFIG.redirectUri,
  ): Promise<AuthTokenResponse> {
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('code', code);
    params.set('code_verifier', verifier);
    params.set('redirect_uri', redirectUri);
    params.set('client_id', AUTH_CONFIG.clientId);
    // params.set('client_secret', AUTH_CONFIG.clientSecret);

    return this.post<AuthTokenResponse>(AUTH_CONFIG.endpoints.token, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      skipAuthHandling: true,
    });
  }
}

export const authApi = new AuthApi();
