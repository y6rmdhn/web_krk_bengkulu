import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const jenisPermohonanServices = {
  getJenisPermohonan: () => axiosInstance.get(`${endpoint.MASTER}/permohonan/`),
  postJenisPermohonan: (payload: JenisPermohonanSchema) =>
    axiosInstance.post(`${endpoint.MASTER}/permohonan/`, payload),
  putJenisPermohonan: (id: string, payload: JenisPermohonanSchema) =>
    axiosInstance.put(`${endpoint.MASTER}/permohonan/${id}`, payload),
  deleteJenisPermohonan: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/permohonan/${id}`),
};

export default jenisPermohonanServices;
