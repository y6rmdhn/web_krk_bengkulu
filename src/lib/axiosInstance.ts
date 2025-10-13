import axios from "axios";
import environment from "@/config/environment";
import { useAuthStore } from "@/store/useAuthStore";

const headers = {
  "Content-type": "application/json",
};

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
  headers,
  timeout: 60 * 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
