import permohonanKrkServices from "@/services/api/permohonanKrk";
import { useQuery } from "@tanstack/react-query";

const usePermohonan = () => {
  const getListPermohonan = async () => {
    const status = "PENDING_OPERATOR";

    const result = await permohonanKrkServices.getPermohonanKrk(status);

    return result.data.data;
  };

  const { data: dataListPermohonanKrk, isLoading: isLoadingListPermohonanKrk } =
    useQuery({
      queryKey: ["permohonan-krk"],
      queryFn: getListPermohonan,
    });

  return {
    dataListPermohonanKrk,
    isLoadingListPermohonanKrk,
  };
};

export default usePermohonan;
