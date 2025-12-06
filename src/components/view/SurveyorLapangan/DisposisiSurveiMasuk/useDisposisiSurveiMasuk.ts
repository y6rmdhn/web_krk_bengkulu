import permohonanKrkServices from "@/services/api/permohonanKrk";
import { useQuery } from "@tanstack/react-query";

const useDisposisiSurveiMasuk = () => {
  const getListPermohonan = async () => {
    const status = "PENDING_SURVEYOR";

    const result = await permohonanKrkServices.getPermohonanKrk(status);

    return result.data.data;
  };

  const { data: dataListPermohonanKrk, isLoading: isLoadingListPermohonanKrk } =
    useQuery({
      queryKey: ["permohonan-krk"],
      queryFn: getListPermohonan,
    });

  console.log(dataListPermohonanKrk);

  return {
    dataListPermohonanKrk,
    isLoadingListPermohonanKrk,
  };
};

export default useDisposisiSurveiMasuk;
