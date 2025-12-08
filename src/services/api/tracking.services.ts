import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const trackingServices = {
  getTracking: (nomor: string) =>
    axiosInstance.get(`public/${endpoint.TRACKING}?nomor=${nomor}`),
};

export default trackingServices;
