import authServices from "@/services/api/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const identitasSchema = z.object({
  nik: z
    .string()
    .min(16, "NIK harus 16 digit")
    .max(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK harus berupa angka"),
  name: z
    .string()
    .min(1, "Nama lengkap harus diisi")
    .min(2, "Nama lengkap minimal 2 karakter"),
  email: z
    .string()
    .email("Format email tidak valid")
    .min(1, "Email harus diisi"),
  phone: z
    .string()
    .min(10, "No. telepon minimal 10 digit")
    .max(13, "No. telepon maksimal 13 digit")
    .regex(/^\d+$/, "No. telepon harus berupa angka"),
  alamat: z
    .string()
    .min(1, "Alamat harus diisi")
    .min(5, "Alamat minimal 5 karakter"),
  rt: z
    .string()
    .min(3, "RT harus 3 digit")
    .max(3, "RT harus 3 digit")
    .regex(/^\d+$/, "RT harus berupa angka"),
  rw: z
    .string()
    .min(3, "RW harus 3 digit")
    .max(3, "RW harus 3 digit")
    .regex(/^\d+$/, "RW harus berupa angka"),
  no_rumah: z
    .string()
    .min(1, "No. rumah harus diisi")
    .max(10, "No. rumah maksimal 10 karakter"),
  kelurahan: z
    .string()
    .min(1, "Kelurahan harus diisi")
    .min(3, "Kelurahan minimal 3 karakter"),
  kecamatan: z
    .string()
    .min(1, "Kecamatan harus diisi")
    .min(3, "Kecamatan minimal 3 karakter"),
  kota: z.string().min(1, "Kota harus diisi").min(3, "Kota minimal 3 karakter"),
  jenis_kelamin: z
    .string()
    .refine((value) => value === "Laki-laki" || value === "Perempuan", {
      message: "Pilih jenis kelamin: Laki-laki atau Perempuan",
    }),
});

export type IdentitasFormValues = z.infer<typeof identitasSchema>;

const useIdentitasTab = () => {
  const queryClient = useQueryClient();

  const identitasForm = useForm<IdentitasFormValues>({
    resolver: zodResolver(identitasSchema),
    defaultValues: {
      nik: "",
      name: "",
      email: "",
      phone: "",
      alamat: "",
      rt: "",
      rw: "",
      no_rumah: "",
      kelurahan: "",
      kecamatan: "",
      kota: "",
      jenis_kelamin: "Laki-laki",
    },
  });

  const getProfile = async () => {
    const result = await authServices.getProfile();

    return result.data.data;
  };

  const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["GetProfile"],
    queryFn: getProfile,
  });

  const updateProfile = async (values: IdentitasFormValues) => {
    const result = await authServices.updateProfile(values);

    return result.data;
  };

  useEffect(() => {
    if (dataProfile) {
      identitasForm.reset({
        nik: dataProfile.nik || "",
        name: dataProfile.name || "",
        email: dataProfile.email || "",
        phone: dataProfile.phone || "",
        alamat: dataProfile.alamat || "",
        rt: dataProfile.rt || "",
        rw: dataProfile.rw || "",
        no_rumah: dataProfile.no_rumah || "",
        kelurahan: dataProfile.kelurahan || "",
        kecamatan: dataProfile.kecamatan || "",
        kota: dataProfile.kota || "",
        jenis_kelamin: dataProfile.jenis_kelamin || "Laki-laki",
      });
    }
  }, [dataProfile, identitasForm]);

  const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile } =
    useMutation({
      mutationFn: updateProfile,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message);
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        identitasForm.reset();
        queryClient.invalidateQueries({ queryKey: ["GetProfile"] });
        toast.success("Update Profile Success");
      },
    });

  const handleUpdateProfile = (values: IdentitasFormValues) => {
    mutateUpdateProfile(values);
  };

  return {
    identitasForm,
    isPendingUpdateProfile,
    handleUpdateProfile,

    dataProfile,
    isLoadingProfile,
  };
};

export default useIdentitasTab;
