import authServices from "@/services/api/auth.services";
import type { ILogout } from "@/types/auth";
import session from "@/utils/session";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useMainLayoutNavbar = () => {
  const isAuth = session.getSession();

  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: !!isAuth,
  });

  const logout = async (payload: ILogout) => {
    const result = await authServices.logout(payload);

    return result;
  };

  const { mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      session.clearSession();
      window.location.href = "/";
    },
  });

  const handleLogout = () => {
    const payload = {
      userId: dataProfile?.email,
    };

    mutateLogout(payload);
  };

  return {
    dataProfile,
    handleLogout,
  };
};

export default useMainLayoutNavbar;
