import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const pengaduanSchema = z.object({
  judul: z
    .string()
    .min(1, "Judul pengaduan harus diisi")
    .min(5, "Judul pengaduan minimal 5 karakter")
    .max(100, "Judul pengaduan maksimal 100 karakter"),
  layanan: z.string().min(1, "Layanan harus dipilih"),
  pengaduan: z
    .string()
    .min(1, "Detail pengaduan harus diisi")
    .min(10, "Detail pengaduan minimal 10 karakter")
    .max(1000, "Detail pengaduan maksimal 1000 karakter"),
});

type PengaduanFormValues = z.infer<typeof pengaduanSchema>;

const usePengaduan = () => {
  const form = useForm<PengaduanFormValues>({
    resolver: zodResolver(pengaduanSchema),
    defaultValues: {
      judul: "",
      layanan: "",
      pengaduan: "",
    },
  });

  return {
    form,
  };
};

export default usePengaduan;
