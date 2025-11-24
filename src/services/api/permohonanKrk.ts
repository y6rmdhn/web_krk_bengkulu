import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const permohonanKrkServices = {
  permohonan: (paylaod: FormData) =>
    axiosInstance.post(`${endpoint.PEMOHON}/permohonan/`, paylaod),
  editPermohonan: (id: string, paylaod: FormData) =>
    axiosInstance.put(`${endpoint.PEMOHON}/permohonan/${id}`, paylaod),
  getPermohonanKrk: () => axiosInstance.get(`${endpoint.PEMOHON}/permohonan/`),
  getDetailPermohonanKrk: (id: string) =>
    axiosInstance.get(`${endpoint.PEMOHON}/permohonan/${id}`),
  getDetailPermohonanHistory: (id: string) =>
    axiosInstance.get(`${endpoint.PEMOHON}/permohonan/${id}/history`),
};

export default permohonanKrkServices;
