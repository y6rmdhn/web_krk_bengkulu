import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const jenisLayananServices = {
  getJenisLayanan: () => axiosInstance.get(`${endpoint.MASTER}/layanan/`),
};

export default jenisLayananServices;
