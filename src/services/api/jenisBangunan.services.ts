import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const jenisBangunanServices = {
  getJenisBangunan: () => axiosInstance.get(`${endpoint.MASTER}/fungsi/`),
};

export default jenisBangunanServices;
