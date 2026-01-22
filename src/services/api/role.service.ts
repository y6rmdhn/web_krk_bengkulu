import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { IRole } from "@/types/role";

const roleServices = {
  getRoles: () => axiosInstance.get(`${endpoint.ADMIN}/roles/`),

  createRole: (payload: IRole) =>
    axiosInstance.post(`${endpoint.ADMIN}/roles/`, payload),

  updateRole: (id: string, payload: IRole) =>
    axiosInstance.put(`${endpoint.ADMIN}/roles/${id}`, payload),

  deleteRole: (id: string) =>
    axiosInstance.delete(`${endpoint.ADMIN}/roles/${id}`),
};

export default roleServices;
