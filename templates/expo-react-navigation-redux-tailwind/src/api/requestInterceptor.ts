import EncryptedStore from '../utils/EncryptedStore';

export interface IRequestConfig {
  headers: Record<string, string>;
}

export async function requestInterceptor(config: IRequestConfig): Promise<IRequestConfig> {
  const token = await EncryptedStore.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}
