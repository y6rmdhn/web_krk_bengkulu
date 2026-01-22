import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";
import type { IUserRoles } from "@/types/role";

const userRoleServices = {
  getUserRoles: () => axiosInstance.get(`${endpoint.ADMIN}/user-roles/`),

  assignRole: (payload: IUserRoles) =>
    axiosInstance.post(`${endpoint.ADMIN}/user-roles/assign`, payload),
  unAssignRole: (payload: IUserRoles) =>
    axiosInstance.post(`${endpoint.ADMIN}/user-roles/unassign`, payload),
};

export default userRoleServices;
