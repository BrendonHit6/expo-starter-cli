import { performLogout } from '../utils/authActions';
import { requestInterceptor } from './requestInterceptor';
import { responseInterceptor } from './responseInterceptor';
import AuthApi from './AuthApi';
import EncryptedStore from '../utils/EncryptedStore';

const BASE_URL = 'https://api.example.com';

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = await EncryptedStore.getRefreshToken();
  if (!refreshToken) return false;

  try {
    const { token, refreshToken: newRefreshToken } = await AuthApi.refresh(refreshToken);
    await Promise.all([
      EncryptedStore.setToken(token),
      EncryptedStore.setRefreshToken(newRefreshToken),
    ]);
    return true;
  } catch {
    return false;
  }
}

async function request<T>(method: string, url: string, body?: unknown): Promise<T> {
  const config = await requestInterceptor({ headers: { 'Content-Type': 'application/json' } });

  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: config.headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      const retryConfig = await requestInterceptor({ headers: { 'Content-Type': 'application/json' } });
      const retryResponse = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: retryConfig.headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
      return retryResponse.json() as Promise<T>;
    }

    void performLogout();
    throw new Error('Session expired. Please log in again.');
  }

  responseInterceptor(response.status);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const apiClient = {
  get: <T>(url: string) => request<T>('GET', url),
  post: <T>(url: string, body: unknown) => request<T>('POST', url, body),
  put: <T>(url: string, body: unknown) => request<T>('PUT', url, body),
  delete: <T>(url: string) => request<T>('DELETE', url),
};

export default apiClient;
