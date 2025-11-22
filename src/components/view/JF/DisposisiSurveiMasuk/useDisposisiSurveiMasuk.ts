import permohonanKrkServices from "@/services/api/permohonanKrk";
import { useQuery } from "@tanstack/react-query";

const useDisposisiSurveiMasuk = () => {
  const getListPermohonan = async () => {
    const result = await permohonanKrkServices.getPermohonanKrk();

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

export default useDisposisiSurveiMasuk;
