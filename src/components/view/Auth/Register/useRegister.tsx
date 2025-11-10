import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const registerSchema = z
  .object({
    noKtp: z
      .string()
      .min(1, "No. KTP harus diisi")
      .min(16, "No. KTP harus 16 digit")
      .max(16, "No. KTP harus 16 digit")
      .regex(/^\d+$/, "No. KTP harus berupa angka"),
    username: z
      .string()
      .min(1, "Username harus diisi")
      .min(3, "Username minimal 3 karakter")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username hanya boleh mengandung huruf, angka, dan underscore"
      ),
    email: z
      .string()
      .min(1, "Email harus diisi")
      .email("Format email tidak valid"),
    telp: z
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
    confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      noKtp: "",
      username: "",
      email: "",
      telp: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsLoading(false);
  }

  return {
    form,
    onSubmit,
    isLoading,
  };
};

export default useRegister;
