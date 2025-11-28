import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import authServices from "@/services/api/auth.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import session from "@/utils/session";
import type { ILogout } from "@/types/auth";

const forgotPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Password lama wajib diisi"),
    newPassword: z
      .string()
      .min(8, "Password baru minimal 8 karakter")
      .regex(/[A-Z]/, "Password harus mengandung minimal 1 huruf besar")
      .regex(/[a-z]/, "Password harus mengandung minimal 1 huruf kecil")
      .regex(/[0-9]/, "Password harus mengandung minimal 1 angka")
      .regex(
        /[\W_]/,
        "Password harus mengandung minimal 1 simbol (@, #, $, dll)"
      ),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Password baru tidak boleh sama dengan password lama",
    path: ["newPassword"],
  });

export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export function useForgotPassword() {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const updatePassword = async (data: ForgotPasswordForm) => {
    const result = await authServices.resetPassword(data);
    return result.data;
  };

  const {
    mutate: mutateResetPassword,
    isPending: isPendingResetPassword,
    isSuccess,
  } = useMutation({
    mutationFn: updatePassword,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      form.reset();
      toast.success("Password berhasil diperbarui");
    },
  });

  const handleForgotPassword = (values: ForgotPasswordForm) => {
    mutateResetPassword(values);
  };

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
      toast.success("Logout successful");
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
    form,
    handleForgotPassword,
    isPendingResetPassword,
    isSuccess,
    handleLogout,
  };
}
