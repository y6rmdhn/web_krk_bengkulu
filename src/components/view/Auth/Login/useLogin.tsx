import authServices from "@/services/api/auth.services";
import type { ILogin } from "@/types/auth";
import session from "@/utils/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
    onSuccess: (data) => {
      form.reset();
      toast.success("Login Success", {
        description: "Anda akan diarahkan ke halaman utama.",
      });
      session.setSession(data?.data?.data?.accessToken);

      setTimeout(() => {
        navigate("/");
      }, 1000);
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
