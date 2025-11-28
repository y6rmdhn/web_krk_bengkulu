import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { IBerkas } from "@/types/berkas";

const berkasServices = {
  getMasterData: () => axiosInstance.get(`${endpoint.MASTER}/berkas/`),
  getListBerkas: () => axiosInstance.get(`attachments/profile/`),
  createMasterData: (payload: IBerkas) =>
    axiosInstance.post(`${endpoint.MASTER}/berkas/`, payload),
  uploadBerkas: (payload: FormData) =>
    axiosInstance.post(`attachments/profile/`, payload),
};

export default berkasServices;
