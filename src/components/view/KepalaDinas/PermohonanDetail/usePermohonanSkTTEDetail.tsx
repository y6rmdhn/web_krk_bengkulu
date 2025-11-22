import permohonanKrkServices from "@/services/api/permohonanKrk";
import { useQuery } from "@tanstack/react-query";

const usePermohonanSkTTEDetail = (id: string) => {
  const getDetailPermohonan = async (id: string) => {
    const result = await permohonanKrkServices.getDetailPermohonanKrk(id);

    return result.data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["detail-permohonan-krk"],
    queryFn: () => getDetailPermohonan(id),
    enabled: !!id,
  });

  const getDetailPermohonanHistory = async (id: string) => {
    const result = await permohonanKrkServices.getDetailPermohonanHistory(id);

    return result.data.data;
  };

  const { data: dataDetailHistory, isLoading: isLoadingDetailHistory } =
    useQuery({
      queryKey: ["detail-permohonan-history"],
      queryFn: () => getDetailPermohonanHistory(id),
      enabled: !!id,
    });

  return {
    data,
    isLoading,
    dataDetailHistory,
    isLoadingDetailHistory,
  };
};

export default usePermohonanSkTTEDetail;
