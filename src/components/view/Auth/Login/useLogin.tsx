import authServices from "@/services/api/auth.services";
import type { ILogin } from "@/types/auth";
import session from "@/utils/session";
import { zodResolver } from "@hookform/resolvers/zod";
// 1. Tambahkan import useQueryClient
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const useLogin = () => {
  const navigate = useNavigate();
  // 2. Inisialisasi queryClient
  const queryClient = useQueryClient();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginServices = async (payload: ILogin) => {
    const result = await authServices.login(payload);
    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginServices,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: async (data) => {
      form.reset();

      const token = data?.data?.data?.accessToken;
      session.setSession(token);

      // 3. TAMBAHKAN BARIS INI: Hapus semua cache query lama
      // Ini memaksa semua useQuery di halaman tujuan untuk fetch ulang (refetch)
      // karena cache dianggap kosong/invalid.
      queryClient.removeQueries();

      toast.success("Login Success", {
        description: "Memeriksa role akun anda...",
      });

      try {
        const profileRes = await authServices.getProfile();
        const roles = profileRes.data.data.roles.map((r: any) => r.name);

        let targetPath = "/";

        if (roles.includes("admin")) {
          targetPath = "/admin/jenis-layanan";
        } else if (roles.includes("Operator")) {
          targetPath = "/operator/permohonan-krk";
        } else if (roles.includes("Surveyor Lapangan")) {
          targetPath = "/jf/disposisi-survei-masuk";
        } else if (roles.includes("Kepala Dinas")) {
          targetPath = "/kepala-dinas/permohonan-sk-tte";
        } else {
          targetPath = "/";
        }

        setTimeout(() => {
          navigate(targetPath);
        }, 1000);
      } catch (error) {
        console.error("Gagal mengambil profil user:", error);
        toast.error("Gagal memuat data profil, mengalihkan ke halaman utama.");
        navigate("/");
      }
    },
  });

  const handleLogin = (values: ILogin) => {
    if (!captchaValue) {
      toast.error("Silakan centang Captcha terlebih dahulu!");
      return;
    }

    mutateLogin(values);
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  return {
    handleLogin,
    isPendingLogin,
    form,
    onCaptchaChange,
    captchaValue,
  };
};

export default useLogin;
