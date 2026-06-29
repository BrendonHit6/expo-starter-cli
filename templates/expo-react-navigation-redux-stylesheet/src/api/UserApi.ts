import apiClient from './apiClient';
import URLs from './urls';

const UserApi = {
  getProfile: () => apiClient.get(URLs.user.getProfile),
  updateProfile: (data: unknown) => apiClient.post(URLs.user.updateProfile, data),
};

export default UserApi;
