import trackingServices from "@/services/api/tracking.services";
import { useQuery } from "@tanstack/react-query";

const useDetailPermohonan = (id: string) => {
  const getDetailPermohonan = async (id: string) => {
    const result = await trackingServices.getTracking(id);

    return result.data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["detail-permohonan-krk"],
    queryFn: () => getDetailPermohonan(id),
    enabled: !!id,
  });

  console.log(data);

  return {
    data,
    isLoading,
  };
};

export default useDetailPermohonan;
