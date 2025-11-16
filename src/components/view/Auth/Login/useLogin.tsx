import authServices from "@/services/api/auth.services";
import type { ILogin } from "@/types/auth";
import session from "@/utils/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password harus diisi"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const useLogin = () => {
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
      toast.error(error.message);
      console.log(error.message);
    },
    onSuccess: (data) => {
      toast.success("Login Success");
      session.setSession(data?.data?.accessToken);
    },
  });

  const handleLogin = (values: ILogin) => {
    mutateLogin(values);
    console.log(values);
  };

  return {
    handleLogin,
    isPendingLogin,
    form,
  };
};

export default useLogin;
