import jenisBangunanServices from "@/services/api/jenisBangunan.services";
import { useQuery } from "@tanstack/react-query";

const useDataLocation = () => {
  const dataLocation = async () => {
    const result = await jenisBangunanServices.getJenisBangunan();

    return result.data.data;
  };

  const { data: dataJenisBangunan, isLoading: isLoadingDataBangunan } =
    useQuery({
      queryKey: ["data-location"],
      queryFn: dataLocation,
    });

  return {
    dataJenisBangunan,
    isLoadingDataBangunan,
  };
};

export default useDataLocation;
