import jenisBangunanServices from "@/services/api/jenisBangunan.services";
import kategoriFungsiBangunanServices from "@/services/api/kategoriFungsiBangunan.services";
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

  const dataKategoriBangunan = async () => {
    const result =
      await kategoriFungsiBangunanServices.getKategoriFungsiBangunan();

    return result.data.data;
  };

  const {
    data: dataJenisKategoriBangunan,
    isLoading: isLoadingDataKategoriBangunan,
  } = useQuery({
    queryKey: ["DataKategoriBangunan"],
    queryFn: dataKategoriBangunan,
  });

  return {
    dataJenisBangunan,
    isLoadingDataBangunan,
    dataJenisKategoriBangunan,
    isLoadingDataKategoriBangunan,
  };
};

export default useDataLocation;
