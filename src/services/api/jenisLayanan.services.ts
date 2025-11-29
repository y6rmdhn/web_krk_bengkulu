import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { JenisLayananSchema } from "@/components/view/Admin/JenisLayanan/useJenisLayanan";

const jenisLayananServices = {
  getJenisLayanan: () => axiosInstance.get(`${endpoint.MASTER}/layanan/`),
  postJenisLayanan: (payload: JenisLayananSchema) =>
    axiosInstance.post(`${endpoint.MASTER}/layanan/`, payload),
  putJenisLayanan: (id: string, payload: JenisLayananSchema) =>
    axiosInstance.put(`${endpoint.MASTER}/layanan/${id}`, payload),
  deleteJenisLayanan: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/layanan/${id}`),
};

export default jenisLayananServices;
