import permohonanKrkServices from "@/services/api/permohonanKrk";
import { useQuery } from "@tanstack/react-query";

const usePermohonan = () => {
  const getListPermohonan = async () => {
    const status = "APPROVED";

    const result = await permohonanKrkServices.getPermohonanKrk(status);

    return result.data.data;
  };

  const { data: dataListPermohonanKrk, isLoading: isLoadingListPermohonanKrk } =
    useQuery({
      queryKey: ["PermohonanSelesai"],
      queryFn: getListPermohonan,
    });

  return {
    dataListPermohonanKrk,
    isLoadingListPermohonanKrk,
  };
};

export default usePermohonan;
