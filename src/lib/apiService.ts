import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAccessToken,
} from "@/lib/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const refreshToken = getRefreshToken();
        const { data } = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        setAccessToken(data.accessToken);
        originalConfig.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalConfig);
      } catch (err) {
        removeTokens();
        window.location.href = "/";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
