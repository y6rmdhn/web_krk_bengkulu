import permohonanKrkServices from "@/services/api/permohonanKrk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const fileSchema = z
  .instanceof(File, { message: "File wajib diunggah" })
  .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB") // Limit 5MB
  .refine(
    (file) =>
      ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
    "Format file harus PDF, JPG, atau PNG"
  );

const permohonanSchema = z.object({
  // Seksi 1: Pilih Wilayah & Peta
  jenis_layanan_id: z.string().min(1, "Layanan harus diisi"),
  latitude: z.string().min(1, "Koordinat harus diisi"),
  longitude: z.string().min(1, "Koordinat harus diisi"),

  // Seksi 2: Data Pemohon
  no_ktp_pemohon: z
    .string()
    .min(16, "No KTP harus 16 digit")
    .max(16, "No KTP harus 16 digit")
    .regex(/^\d+$/, "No KTP harus berupa angka"),
  nama_pemohon: z.string().min(1, "Nama pemohon harus diisi"), // Fixed typo: pemomohon -> pemohon
  email_pemohon: z.string().email("Format email tidak valid"),
  no_hp_pemohon: z
    .string()
    .min(10, "No telepon minimal 10 digit")
    .regex(/^\d+$/, "No telepon harus berupa angka"),
  alamat_pemohon: z.string().min(1, "Alamat pemohon harus diisi"),
  no_lokasi_pemohon: z.string().min(1, "No harus diisi"),
  rt_lokasi_pemohon: z.string().regex(/^\d+$/, "RT harus angka"),
  rw_lokasi_pemohon: z.string().regex(/^\d+$/, "RW harus angka"),
  provinsi_pemohon: z.string().min(1, "Provinsi pemohon harus diisi"),
  kota_pemohon: z.string().min(1, "Kota pemohon harus diisi"),
  kecamatan_pemohon: z.string().min(1, "Kecamatan pemohon harus diisi"),
  kelurahan_pemohon: z.string().min(1, "Kelurahan pemohon harus diisi"),

  // FILE 1: KTP PEMOHON (Sesuai Gambar: KTP-Pemohon)
  file_ktp_pemohon: fileSchema,

  // Seksi 2: Data Pemilik
  no_ktp_pemilik: z
    .string()
    .min(16, "No KTP harus 16 digit")
    .max(16, "No KTP harus 16 digit")
    .regex(/^\d+$/, "No KTP harus berupa angka"),
  email_pemilik: z.string().email("Format email tidak valid"),
  no_hp_pemilik: z
    .string()
    .min(10, "No telepon minimal 10 digit")
    .regex(/^\d+$/, "No telepon harus berupa angka"),
  alamat_pemilik: z.string().min(1, "Alamat pemilik harus diisi"),
  no_lokasi_pemilik: z.string().min(1, "No harus diisi"),
  rt_lokasi_pemilik: z.string().regex(/^\d+$/, "RT harus angka"),
  rw_lokasi_pemilik: z.string().regex(/^\d+$/, "RW harus angka"),
  provinsi_pemilik: z.string().min(1, "Provinsi pemilik harus diisi"),
  kota_pemilik: z.string().min(1, "Kota pemilik harus diisi"),
  kecamatan_pemilik: z.string().min(1, "Kecamatan pemilik harus diisi"),
  kelurahan_pemilik: z.string().min(1, "Kelurahan pemilik harus diisi"),

  // Seksi 3: Data Lokasi
  alamat_bangunan: z.string().min(1, "Alamat bangunan harus diisi"),
  no_lokasi: z.string().min(1, "No bangunan harus diisi"),
  rt_lokasi: z.string().regex(/^\d+$/, "RT harus angka"),
  rw_lokasi: z.string().regex(/^\d+$/, "RW harus angka"),
  luas_tanah_m2: z.string().min(1, "Luas tanah harus diisi"),
  letak_jalan_utama: z.string().min(1, "Letak antar jalan harus diisi"),
  letak_jalan_sekunder: z.string().min(1, "s/d jalan harus diisi"),
  fungsi_bangunan_id: z.string().min(1, "Fungsi bangunan harus diisi"),
  persimpangan_jalan: z.string().min(1, "Field ini harus diisi"),
  no_sertifikat_tanah: z.string().min(1, "No sertifikat tanah harus diisi"),
  hasil_ukur: z.string().min(1, "Hasil ukur harus diisi"),

  // FILE 2, 3, 4 (Sesuai Gambar)
  SIMB: fileSchema, // Untuk Key: SIMB
  file_sertifikat_tanah: fileSchema, // Untuk Key: Sertifikat-Tanah
  PBB: fileSchema, // Untuk Key: PBB
});

export type PermohonanFormValues = z.infer<typeof permohonanSchema>;

const usePermohohanKrk = () => {
  const form = useForm<PermohonanFormValues>({
    resolver: zodResolver(permohonanSchema),
    defaultValues: {
      jenis_layanan_id: "",
      latitude: "",
      longitude: "",

      no_ktp_pemohon: "",
      nama_pemohon: "", // Fixed
      email_pemohon: "",
      no_hp_pemohon: "",
      alamat_pemohon: "",
      no_lokasi_pemohon: "",
      rt_lokasi_pemohon: "",
      rw_lokasi_pemohon: "",
      provinsi_pemohon: "",
      kota_pemohon: "",
      kecamatan_pemohon: "",
      kelurahan_pemohon: "",
      // File defaultnya undefined/null, tidak perlu string kosong

      no_ktp_pemilik: "",
      email_pemilik: "",
      no_hp_pemilik: "",
      alamat_pemilik: "",
      no_lokasi_pemilik: "",
      rt_lokasi_pemilik: "",
      rw_lokasi_pemilik: "",
      provinsi_pemilik: "",
      kota_pemilik: "",
      kecamatan_pemilik: "",
      kelurahan_pemilik: "",

      alamat_bangunan: "",
      no_lokasi: "",
      rt_lokasi: "",
      rw_lokasi: "",
      luas_tanah_m2: "",
      letak_jalan_utama: "",
      letak_jalan_sekunder: "",
      fungsi_bangunan_id: "",
      persimpangan_jalan: "",
      no_sertifikat_tanah: "",
      hasil_ukur: "",
    },
  });

  const permohonan = async (payload: FormData) => {
    const result = await permohonanKrkServices.permohonan(payload);
    return result;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: permohonan,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || "Terjadi kesalahan";
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil mengajukan permohonan KRK");
    },
  });

  const handleCreatePermohonan = (values: PermohonanFormValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        key !== "file_ktp_pemohon" &&
        key !== "file_pbb" &&
        key !== "file_sertifikat_tanah" &&
        key !== "file_simb" &&
        value !== undefined &&
        value !== null
      ) {
        formData.append(key, value as string);
      }
    });

    if (values.file_ktp_pemohon) {
      formData.append("KTP-Pemohon", values.file_ktp_pemohon);
    }
    if (values.PBB) {
      formData.append("PBB", values.PBB);
    }
    if (values.file_sertifikat_tanah) {
      formData.append("Sertifikat-Tanah", values.file_sertifikat_tanah);
    }
    if (values.SIMB) {
      formData.append("SIMB", values.SIMB);
    }

    mutate(formData);
  };

  const handleRefreshCaptcha = () => {
    console.log("Refresh captcha logic here");
  };

  return {
    form,
    onSubmit: handleCreatePermohonan,
    handleRefreshCaptcha,
    isPending,
  };
};

export default usePermohohanKrk;
