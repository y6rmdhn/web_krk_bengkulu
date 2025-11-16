import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { ILogin } from "@/types/auth";

const authServices = {
  login: (paylaod: ILogin) =>
    axiosInstance.post(`${endpoint.AUTH}/login`, paylaod),
};

export default authServices;
