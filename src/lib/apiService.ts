import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  removeTokens,
} from "@/lib/auth";

const api = axios.create({
  baseURL: "http://localhost:3000",
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
    if (error.response?.status === 401) {
      console.log("Running inside status 401");
      const refreshToken = getRefreshToken();
      try {
        const { data } = await axios.post("/auth/refresh", { refreshToken });
        setTokens(data.accessToken, data.refreshToken);
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(error.config);
      } catch (err) {
        removeTokens();
        // window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
