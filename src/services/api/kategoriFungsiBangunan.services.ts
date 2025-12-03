import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { JenisKategoriFungsiBangunan } from "@/components/view/Admin/KategoriFungsiBangunan/useKategoriFungsiBangunan";

const kategoriFungsiBangunanServices = {
  getKategoriFungsiBangunan: () =>
    axiosInstance.get(`${endpoint.MASTER}/kategori-fungsi/`),
  postKategoriFungsiBangunan: (payload: JenisKategoriFungsiBangunan) =>
    axiosInstance.post(`${endpoint.MASTER}/kategori-fungsi/`, payload),
  putKategoriFungsiBangunan: (
    id: string,
    payload: JenisKategoriFungsiBangunan
  ) => axiosInstance.put(`${endpoint.MASTER}/kategori-fungsi/${id}`, payload),
  deleteKategoriFungsiBangunan: (id: string) =>
    axiosInstance.delete(`${endpoint.MASTER}/kategori-fungsi/${id}`),
};

export default kategoriFungsiBangunanServices;
