import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { useSessionStore } from '@/entities/session';

export class BaseApiClient {
  protected axios: AxiosInstance;

  constructor(baseURL: string = '') {
    this.axios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Inject Token
    this.axios.interceptors.request.use((config) => {
      const token = useSessionStore.getState().token;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle Auth Errors
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          useSessionStore.getState().logout();
          window.location.href = '/sign-in';
        }
        return Promise.reject(error);
      },
    );
  }

  // Java-like helper methods
  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.axios.get<T>(url, config);
    return data;
  }

  protected async post<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const { data } = await this.axios.post<T>(url, body, config);
    return data;
  }
}
