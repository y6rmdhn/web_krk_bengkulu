import axios from "axios";
import environment from "@/config/environment";
import session from "@/utils/session";

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = session.getSession();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      session.clearSession();

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
