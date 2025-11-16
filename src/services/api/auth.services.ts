import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { ILogin, ILogout } from "@/types/auth";

const authServices = {
  login: (paylaod: ILogin) =>
    axiosInstance.post(`${endpoint.AUTH}/login`, paylaod),
  getProfile: () => axiosInstance.get(`${endpoint.AUTH}/me`),
  logout: (paylaod: ILogout) =>
    axiosInstance.post(`${endpoint.AUTH}/logout`, paylaod),
};

export default authServices;
