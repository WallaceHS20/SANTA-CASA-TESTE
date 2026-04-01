import axios from 'axios';

export const ServiceApi  = axios.create({
  baseURL: 'http://localhost:3000',

});

ServiceApi.interceptors.request.use((config) => {
  const userId = localStorage.getItem('@SantaCasa:userId');
  if (userId) {
    config.headers['x-user-id'] = userId;
  }
  return config;
});