import { IUserInterface } from '../types/UserInterface';

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  refreshToken: string;
  user: IUserInterface;
}

export interface IRefreshResponse {
  token: string;
  refreshToken: string;
}

const BASE_URL = 'https://api.example.com';

const AuthApi = {
  login: async (credentials: ILoginCredentials): Promise<IAuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (credentials.password === 'wrong') {
      throw new Error('Invalid email or password.');
    }

    return {
      token: `mock-jwt-${Date.now()}`,
      refreshToken: `mock-refresh-${Date.now()}`,
      user: {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
        createdAt: new Date().toISOString(),
      },
    };
  },

  // Uses fetch directly (not apiClient) to avoid circular dependency
  refresh: async (refreshToken: string): Promise<IRefreshResponse> => {
    const response = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed.');
    }

    return response.json();
  },
};

export default AuthApi;
