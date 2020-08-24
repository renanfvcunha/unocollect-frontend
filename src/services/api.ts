import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;
if (process.env.NODE_ENV === 'development') {
  api = axios.create({
    baseURL: 'http://localhost:3333',
  });
} else {
  api = axios.create({
    baseURL: 'https://api.unocollect.com.br',
  });
}

export default api;
