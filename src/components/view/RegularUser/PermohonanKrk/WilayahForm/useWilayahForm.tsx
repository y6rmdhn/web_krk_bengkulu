import jenisLayananServices from "@/services/api/jenisLayanan.services";
import { useQuery } from "@tanstack/react-query";

const useWilayahForm = () => {
  const dataLayanan = async () => {
    const result = await jenisLayananServices.getJenisLayanan();

    return result.data.data;
  };

  const { data: dataJenisLayanan, isLoading: isLoadingDataLayanan } = useQuery({
    queryKey: ["data-layanan"],
    queryFn: dataLayanan,
  });

  return {
    dataJenisLayanan,
    isLoadingDataLayanan,
  };
};

export default useWilayahForm;
