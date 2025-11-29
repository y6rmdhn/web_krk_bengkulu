import permohonanKrkServices from "@/services/api/permohonanKrk";
import { useQuery } from "@tanstack/react-query";

const useDetailPermohonan = (id: string) => {
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

  const getSk = async (id: string) => {
    const result = await permohonanKrkServices.getSuratSk(id);
    return result.data;
  };

  const { data: dataSk, isLoading: isLoadingSk } = useQuery({
    queryKey: ["detail-sk-preview", id],
    queryFn: () => getSk(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    dataDetailHistory,
    isLoadingDetailHistory,
    dataSk,
    isLoadingSk,
  };
};

export default useDetailPermohonan;
