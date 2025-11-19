import authServices from "@/services/api/auth.services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const useSuccessRegister = () => {
  const successRegister = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      throw new Error("Email tidak ditemukan di localStorage");
    }

    const payload = {
      email: email,
    };

    const result = await authServices.resendVerifyCode(payload);
    return result;
  };

  const {
    mutate: mutateResendVerifyEmail,
    isPending: isPendingResendVerifyEmail,
  } = useMutation({
    mutationFn: successRegister,
    onError(error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
    },
    onSuccess: () => {
      toast.success("Kode verifikasi berhasil dikirim ulang ke email Anda");
    },
  });

  const handleResendVerifyEmail = () => {
    mutateResendVerifyEmail();
  };

  return {
    handleResendVerifyEmail,
    isPendingResendVerifyEmail,
  };
};

export default useSuccessRegister;
