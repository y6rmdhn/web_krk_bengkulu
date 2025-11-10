import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const identitasSchema = z.object({
  noKtp: z
    .string()
    .min(1, "No. KTP harus diisi")
    .min(16, "No. KTP harus 16 digit")
    .max(16, "No. KTP harus 16 digit")
    .regex(/^\d+$/, "No. KTP harus berupa angka"),
  noTelp: z
    .string()
    .min(1, "No. Telepon harus diisi")
    .min(10, "No. Telepon minimal 10 digit")
    .regex(/^\d+$/, "No. Telepon harus berupa angka"),
  nama: z.string().min(1, "Nama harus diisi").min(2, "Nama minimal 2 karakter"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  alamat: z
    .string()
    .min(1, "Alamat harus diisi")
    .min(5, "Alamat minimal 5 karakter"),
  no: z.string().min(1, "No harus diisi"),
  rt: z
    .string()
    .min(1, "RT harus diisi")
    .regex(/^\d+$/, "RT harus berupa angka"),
  rw: z
    .string()
    .min(1, "RW harus diisi")
    .regex(/^\d+$/, "RW harus berupa angka"),
  jenisKelamin: z.string().min(1, "Jenis kelamin harus diisi"),
  kelurahan: z.string().min(1, "Kelurahan harus diisi"),
  kecamatan: z.string().min(1, "Kecamatan harus diisi"),
  kota: z.string().min(1, "Kota harus diisi"),
});

type IdentitasFormValues = z.infer<typeof identitasSchema>;

const useIdentitasTab = () => {
  const identitasForm = useForm<IdentitasFormValues>({
    resolver: zodResolver(identitasSchema),
    defaultValues: {
      noKtp: "",
      noTelp: "",
      nama: "",
      email: "",
      alamat: "",
      no: "",
      rt: "",
      rw: "",
      jenisKelamin: "",
      kelurahan: "",
      kecamatan: "",
      kota: "",
    },
  });

  return {
    identitasForm,
  };
};

export default useIdentitasTab;
