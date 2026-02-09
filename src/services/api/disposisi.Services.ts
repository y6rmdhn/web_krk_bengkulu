import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const disposisiServices = {
  approve: (id: string, payload: any) =>
    axiosInstance.put(
      `${endpoint.STAF}/${endpoint.DISPOSISI}/${id}/approve`,
      payload,
    ),
  reject: (id: string, payload: { alasan_penolakan: string }) =>
    axiosInstance.put(
      `${endpoint.STAF}/${endpoint.DISPOSISI}/${id}/reject`,
      payload,
    ),
  revisi: (id: string, payload: any) =>
    axiosInstance.put(
      `${endpoint.STAF}/${endpoint.DISPOSISI}/${id}/revisi`,
      payload,
    ),
};

export default disposisiServices;
