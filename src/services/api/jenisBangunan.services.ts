import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { IJenisFungsiBangunanSchema } from "@/components/view/Admin/JenisFungsiBangunan/useJenisBangunan";

const jenisBangunanServices = {
  getJenisBangunan: () => axiosInstance.get(`${endpoint.MASTER}/fungsi/`),
  postFungsiBangunan: (payload: IJenisFungsiBangunanSchema) =>
    axiosInstance.post(`${endpoint.MASTER}/fungsi/`, payload),
  putFungsiBangunan: (id: string, payload: IJenisFungsiBangunanSchema) =>
    axiosInstance.put(`${endpoint.MASTER}/fungsi/${id}`, payload),
  deleteFungsiBangunan: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/fungsi/${id}`),
};

export default jenisBangunanServices;
