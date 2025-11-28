import authServices from "@/services/api/auth.services";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = () => {
  const getProfile = async () => {
    const result = await authServices.getProfile();

    return result.data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });

  return { dataProfile };
};

export default useGetProfile;
