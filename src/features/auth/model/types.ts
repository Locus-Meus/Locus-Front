export interface CsrfToken {
  token: string;
  headerName: string;
  parameterName: string;
}

export interface SignInPayload {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
