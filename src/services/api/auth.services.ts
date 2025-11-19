import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { ILogin, ILogout, IResgister, IVerifyEmail } from "@/types/auth";

const authServices = {
  login: (paylaod: ILogin) =>
    axiosInstance.post(`${endpoint.AUTH}/login`, paylaod),
  register: (paylaod: IResgister) =>
    axiosInstance.post(`${endpoint.AUTH}/register`, paylaod),
  resendVerifyCode: (paylaod: IVerifyEmail) =>
    axiosInstance.post(`${endpoint.AUTH}/resend-email`, paylaod),
  getProfile: () => axiosInstance.get(`${endpoint.AUTH}/me`),
  logout: (paylaod: ILogout) =>
    axiosInstance.post(`${endpoint.AUTH}/logout`, paylaod),
};

export default authServices;
