import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { IBerkas } from "@/types/berkas";

const berkasServices = {
  getMasterData: () => axiosInstance.get(`${endpoint.MASTER}/berkas/`),
  createMasterData: (payload: IBerkas) =>
    axiosInstance.post(`${endpoint.MASTER}/berkas/`, payload),
};

export default berkasServices;
