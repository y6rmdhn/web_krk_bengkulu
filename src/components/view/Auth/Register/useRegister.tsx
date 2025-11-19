import authServices from "@/services/api/auth.services";
import type { IResgister } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const registerSchema = z
  .object({
    nik: z
      .string()
      .min(1, "No. KTP harus diisi")
      .min(16, "No. KTP harus 16 digit")
      .max(16, "No. KTP harus 16 digit")
      .regex(/^\d+$/, "No. KTP harus berupa angka"),
    name: z
      .string()
      .min(1, "Name harus diisi")
      .min(3, "Name minimal 3 karakter"),
    email: z
      .string()
      .min(1, "Email harus diisi")
      .email("Format email tidak valid"),
    phone: z
      .string()
      .min(1, "No. Telepon harus diisi")
      .min(10, "No. Telepon minimal 10 digit")
      .regex(/^\d+$/, "No. Telepon harus berupa angka"),
    password: z
      .string()
      .min(1, "Password harus diisi")
      .min(8, "Password minimal 8 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password harus mengandung huruf besar, huruf kecil, dan angka"
      ),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const useRegister = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nik: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const register = async (payload: IResgister) => {
    const result = await authServices.register(payload);

    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: register,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      localStorage.setItem("email", form.getValues("email"));
      form.reset();
      toast.success("Registrasi berhasil");
      navigate("/success-register");
    },
  });

  const handleRegister = (values: IResgister) => {
    mutateRegister(values);
  };

  return {
    form,
    isPendingRegister,
    handleRegister,
  };
};

export default useRegister;
