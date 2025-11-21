import axiosInstance from "@/lib/axiosInstance";
import endpoint from "./endpoint";

const permohonanKrkServices = {
  permohonan: (paylaod: FormData) =>
    axiosInstance.post(`${endpoint.PEMOHON}/permohonan/`, paylaod),
};

export default permohonanKrkServices;
