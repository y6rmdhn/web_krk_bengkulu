import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { IBerkas } from "@/types/berkas";

const berkasServices = {
  // Master Data
  getMasterData: () => axiosInstance.get(`${endpoint.MASTER}/berkas/`),
  createMasterData: (payload: IBerkas) =>
    axiosInstance.post(`${endpoint.MASTER}/berkas/`, payload),
  putMasterData: (id: string, payload: IBerkas) =>
    axiosInstance.put(`${endpoint.MASTER}/berkas/${id}`, payload),
  deleteMasterData: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/berkas/${id}`),

  // Upload Berkas
  getListBerkas: () => axiosInstance.get(`attachments/profile/`),
  uploadBerkas: (payload: FormData) =>
    axiosInstance.post(`attachments/profile/`, payload),
};

export default berkasServices;
