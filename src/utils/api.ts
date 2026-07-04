import axios, { AxiosInstance, AxiosError } from 'axios';

interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

class ApiClient {
  private instance: AxiosInstance;
  private token: string | null = null;

  constructor(config: ApiConfig = {}) {
    this.instance = axios.create({
      baseURL: config.baseURL || '/api',
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    // Add request interceptor for auth
    this.instance.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private handleUnauthorized() {
    // Redirect to login or refresh token
    window.location.href = '/login';
  }

  async get<T>(url: string, config?: any) {
    return this.instance.get<T>(url, config);
  }

  async post<T>(url: string, data?: any, config?: any) {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(url: string, data?: any, config?: any) {
    return this.instance.put<T>(url, data, config);
  }

  async delete<T>(url: string, config?: any) {
    return this.instance.delete<T>(url, config);
  }

  async patch<T>(url: string, data?: any, config?: any) {
    return this.instance.patch<T>(url, data, config);
  }
}

export const apiClient = new ApiClient({
  baseURL: '/api/v1',
  timeout: 30000,
});
