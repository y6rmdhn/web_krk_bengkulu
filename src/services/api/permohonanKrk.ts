import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const permohonanKrkServices = {
  permohonan: (paylaod: FormData) =>
    axiosInstance.post(`${endpoint.PEMOHON}/permohonan/`, paylaod),
  editPermohonan: (id: string, paylaod: FormData) =>
    axiosInstance.put(`${endpoint.PEMOHON}/permohonan/${id}`, paylaod),
  getPermohonanKrk: (status?: string) =>
    axiosInstance.get(`${endpoint.PEMOHON}/permohonan/?status=${status}`),
  getDetailPermohonanKrk: (id: string) =>
    axiosInstance.get(`${endpoint.PEMOHON}/permohonan/${id}`),
  getDetailPermohonanHistory: (id: string) =>
    axiosInstance.get(`${endpoint.PEMOHON}/permohonan/${id}/history`),
  getSuratSk: (id: string) => {
    return axiosInstance.get(`/pemohon/permohonan/${id}/preview`, {
      responseType: "blob",
    });
  },
};

export default permohonanKrkServices;
