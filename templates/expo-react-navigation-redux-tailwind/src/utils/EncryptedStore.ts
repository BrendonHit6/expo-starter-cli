import { IUserInterface } from '../types/UserInterface';

// TODO: replace console stubs with expo-secure-store + AsyncStorage

const EncryptedStore = {
  setToken: async (_token: string): Promise<void> => {
    // await SecureStore.setItemAsync('token', token);
  },
  getToken: async (): Promise<string | null> => {
    // return SecureStore.getItemAsync('token');
    return null;
  },
  setRefreshToken: async (_token: string): Promise<void> => {
    // await SecureStore.setItemAsync('refreshToken', token);
  },
  getRefreshToken: async (): Promise<string | null> => {
    // return SecureStore.getItemAsync('refreshToken');
    return null;
  },
  setUser: async (_user: IUserInterface): Promise<void> => {
    // await AsyncStorage.setItem('user', JSON.stringify(user));
  },
  getUser: async (): Promise<IUserInterface | null> => {
    // const raw = await AsyncStorage.getItem('user');
    // return raw ? JSON.parse(raw) : null;
    return null;
  },
  clear: async (): Promise<void> => {
    // await Promise.all([
    //   SecureStore.deleteItemAsync('token'),
    //   SecureStore.deleteItemAsync('refreshToken'),
    //   AsyncStorage.removeItem('user'),
    // ]);
  },
};

export default EncryptedStore;
