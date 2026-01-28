import { useQuery } from "@tanstack/react-query";
import permohonanKrkServices from "@/services/api/permohonanKrk";

export const usePreviewSk = (id: string) => {
  const getSk = async () => {
    const result = await permohonanKrkServices.getSuratSk(id);
    return result.data;
  };

  const {
    data: dataSk,
    isLoading: isLoadingSk,
    isError,
  } = useQuery({
    queryKey: ["preview-sk-page", id],
    queryFn: getSk,
    enabled: !!id,
    retry: 1,
  });

  return {
    dataSk,
    isLoadingSk,
    isError,
  };
};
