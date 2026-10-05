import { api } from './api';
export const profileService = {
  async saveProfile(profile) { const { data } = await api.put('/user/profile', profile); return data; },
  async getProfile() { const { data } = await api.get('/user/profile'); return data; }
};
