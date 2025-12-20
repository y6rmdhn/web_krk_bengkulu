import berkasServices from "@/services/api/berkas.services";
import permohonanKrkServices from "@/services/api/permohonanKrk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

// --- HELPER: Title Case (Huruf depan besar) ---
const toTitleCase = (str: string) => {
  if (!str) return "";
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (a) {
    return a.toUpperCase();
  });
};

export const fileSchema = z
  .instanceof(File, { message: "File wajib diunggah" })
  .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB")
  .refine(
    (file) =>
      ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
    "Format file harus PDF, JPG, atau PNG"
  );

const permohonanSchema = z.object({
  jenis_layanan_id: z.string().optional(),
  latitude: z.string().min(1, "Koordinat harus diisi"),
  longitude: z.string().min(1, "Koordinat harus diisi"),

  // --- DATA PEMOHON ---
  no_ktp_pemohon: z.string().min(16).max(16),
  nama_pemohon: z.string().min(1, "Nama pemohon harus diisi"),
  email_pemohon: z.string().email(),
  no_hp_pemohon: z.string().min(10),
  alamat_pemohon: z.string().min(1),
  no_lokasi_pemohon: z.string().min(1),
  rt_lokasi_pemohon: z.string(),
  rw_lokasi_pemohon: z.string(),

  // Field ID (Untuk Logic Cascading)
  provinsi_pemohon: z.string().min(1),
  kota_pemohon: z.string().min(1),
  kecamatan_pemohon: z.string().min(1),
  kelurahan_pemohon: z.string().min(1),

  // Field Nama (Untuk Dikirim ke API) - Hidden Fields
  provinsi_pemohon_name: z.string().optional(),
  kota_pemohon_name: z.string().optional(),
  kecamatan_pemohon_name: z.string().optional(),
  kelurahan_pemohon_name: z.string().optional(),

  file_ktp_pemohon: fileSchema,

  // --- DATA PEMILIK ---
  nama_pemilik: z.string().min(1),
  no_ktp_pemilik: z.string().min(16).max(16),
  email_pemilik: z.string().email(),
  no_hp_pemilik: z.string().min(10),
  alamat_pemilik: z.string().min(1),
  no_lokasi_pemilik: z.string().min(1),
  rt_lokasi_pemilik: z.string(),
  rw_lokasi_pemilik: z.string(),

  // Field ID (Untuk Logic Cascading)
  provinsi_pemilik: z.string().min(1),
  kota_pemilik: z.string().min(1),
  kecamatan_pemilik: z.string().min(1),
  kelurahan_pemilik: z.string().min(1),

  // Field Nama (Untuk Dikirim ke API)
  provinsi_pemilik_name: z.string().optional(),
  kota_pemilik_name: z.string().optional(),
  kecamatan_pemilik_name: z.string().optional(),
  kelurahan_pemilik_name: z.string().optional(),

  // --- DATA BANGUNAN ---
  alamat_bangunan: z.string().min(1),
  no_lokasi: z.string().min(1),
  rt_lokasi: z.string(),
  rw_lokasi: z.string(),
  luas_tanah_m2: z.string().min(1),
  letak_jalan_utama: z.string().min(1),
  letak_jalan_sekunder: z.string().min(1),
  fungsi_bangunan_id: z.string().min(1),
  kategori_bangunan_id: z.string().min(1),
  persimpangan_jalan: z.string().min(1),
  no_sertifikat_tanah: z.string().min(1),
  hasil_ukur: z.string().min(1),
  no_pbb: z.string().min(1),

  // Lokasi Bangunan (Biasanya ini juga perlu nama/ID, sesuaikan jika perlu)
  kecamatan_lokasi: z.string().min(1),
  kelurahan_lokasi: z.string().min(1),

  file_sertifikat_tanah: fileSchema,
  PBB: fileSchema,
});

export type PermohonanFormValues = z.infer<typeof permohonanSchema>;

const usePermohohanKrk = () => {
  const form = useForm<PermohonanFormValues>({
    resolver: zodResolver(permohonanSchema),
    defaultValues: {
      provinsi_pemohon: "",
      kota_pemohon: "",
      kecamatan_pemohon: "",
      kelurahan_pemohon: "",
      provinsi_pemohon_name: "", // Init empty
      kota_pemohon_name: "",
      kecamatan_pemohon_name: "",
      kelurahan_pemohon_name: "",

      provinsi_pemilik: "",
      kota_pemilik: "",
      kecamatan_pemilik: "",
      kelurahan_pemilik: "",
      provinsi_pemilik_name: "", // Init empty
      kota_pemilik_name: "",
      kecamatan_pemilik_name: "",
      kelurahan_pemilik_name: "",
    },
  });

  const navigate = useNavigate();

  const { data: masterBerkas, isLoading: isLoadingMaster } = useQuery({
    queryKey: ["master-berkas"],
    queryFn: berkasServices.getMasterData,
  });

  const { data: userBerkas, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user-berkas"],
    queryFn: berkasServices.getListBerkas,
  });

  const requiredList = masterBerkas?.data.data || [];
  const uploadedList = userBerkas?.data.data || [];

  const totalRequired = requiredList.length;

  const totalUploaded = requiredList.filter((reqItem: any) =>
    uploadedList.some((upItem: any) => upItem.master_berkas_id === reqItem.id)
  ).length;

  const isEligible = totalRequired > 0 && totalUploaded === totalRequired;
  const progressString = `${totalUploaded}/${totalRequired}`;
  const isLoadingCheck = isLoadingMaster || isLoadingUser;

  const permohonan = async (payload: FormData) => {
    const result = await permohonanKrkServices.permohonan(payload);
    return result;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: permohonan,
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Terjadi kesalahan");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil mengajukan permohonan KRK");
      navigate("/riwayat-permohonan");
    },
  });

  const handleCreatePermohonan = (values: PermohonanFormValues) => {
    const formData = new FormData();

    const lng = parseFloat(values.longitude);
    const lat = parseFloat(values.latitude);

    const geoJsonData = {
      type: "Point",
      coordinates: [lng, lat],
    };

    formData.append("lokasi", JSON.stringify(geoJsonData));

    // List field wilayah yang perlu diganti ID-nya menjadi NAMA saat dikirim
    const regionFields = [
      "provinsi_pemohon",
      "kota_pemohon",
      "kecamatan_pemohon",
      "kelurahan_pemohon",
      "provinsi_pemilik",
      "kota_pemilik",
      "kecamatan_pemilik",
      "kelurahan_pemilik",
    ];

    Object.entries(values).forEach(([key, value]) => {
      // Skip file dan field khusus
      if (
        key !== "file_ktp_pemohon" &&
        key !== "jenis_layanan_id" &&
        key !== "PBB" &&
        key !== "file_sertifikat_tanah" &&
        key !== "latitude" &&
        key !== "longitude" &&
        !key.includes("_name") && // Jangan kirim field _name mentah-mentah
        value !== undefined &&
        value !== null
      ) {
        // LOGIKA UTAMA: Jika key adalah wilayah, ambil value dari field _name DAN FORMAT KE TITLE CASE
        if (regionFields.includes(key)) {
          const nameKey = `${key}_name` as keyof PermohonanFormValues;
          const rawName = (values[nameKey] as string) || (value as string);

          // FORMAT DI SINI
          formData.append(key, toTitleCase(rawName));
        }
        // TAMBAHAN: FORMAT JUGA WILAYAH LOKASI
        else if (key === "kecamatan_lokasi" || key === "kelurahan_lokasi") {
          formData.append(key, toTitleCase(value as string));
        }
        // TAMBAHAN OPSIONAL: FORMAT ALAMAT DAN NAMA ORANG JUGA
        else if (key.includes("nama") || key.includes("alamat")) {
          formData.append(key, toTitleCase(value as string));
        } else {
          formData.append(key, value as string);
        }
      }
    });

    // Append Files
    if (values.file_ktp_pemohon instanceof File) {
      formData.append("KTP-Pemohon", values.file_ktp_pemohon);
    }
    if (values.PBB instanceof File) {
      formData.append("PBB", values.PBB);
    }
    if (values.file_sertifikat_tanah instanceof File) {
      formData.append("Sertifikat-Tanah", values.file_sertifikat_tanah);
    }

    mutate(formData);
  };

  return {
    form,
    onSubmit: handleCreatePermohonan,
    isPending,
    isEligible,
    progressString,
    isLoadingCheck,
    totalRequired,
    totalUploaded,
  };
};

export default usePermohohanKrk;
