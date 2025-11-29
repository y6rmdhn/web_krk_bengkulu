import permohonanKrkServices from "@/services/api/permohonanKrk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const fileSchemaRequired = z
  .instanceof(File, { message: "File wajib diunggah" })
  .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB")
  .refine(
    (file) =>
      ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
    "Format file harus PDF, JPG, atau PNG"
  );

const fileSchemaOptional = z
  .instanceof(File)
  .refine((file) => file.size <= 5 * 1024 * 1024, "Ukuran file maksimal 5MB")
  .refine(
    (file) =>
      ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
    "Format file harus PDF, JPG, atau PNG"
  )
  .optional();

const baseSchemaFields = {
  jenis_layanan_id: z.string().min(1, "Layanan harus diisi"),
  latitude: z.string().min(1, "Koordinat harus diisi"),
  longitude: z.string().min(1, "Koordinat harus diisi"),

  no_ktp_pemohon: z
    .string()
    .min(16, "No KTP harus 16 digit")
    .max(16, "No KTP harus 16 digit")
    .regex(/^\d+$/, "No KTP harus berupa angka"),
  nama_pemohon: z.string().min(1, "Nama pemohon harus diisi"),
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
};

const permohonanSchemaCreate = z.object({
  ...baseSchemaFields,
  file_ktp_pemohon: fileSchemaRequired,
  SIMB: fileSchemaRequired,
  file_sertifikat_tanah: fileSchemaRequired,
  PBB: fileSchemaRequired,
});

const permohonanSchemaEdit = z.object({
  ...baseSchemaFields,
  file_ktp_pemohon: fileSchemaOptional,
  SIMB: fileSchemaOptional,
  file_sertifikat_tanah: fileSchemaOptional,
  PBB: fileSchemaOptional,
});

const createPermohonanSchema = (isEdit: boolean) => {
  return isEdit ? permohonanSchemaEdit : permohonanSchemaCreate;
};

const usePermohonanKrkEdit = (id?: string) => {
  const isEdit = !!id;

  const form = useForm({
    resolver: zodResolver(createPermohonanSchema(isEdit)),
    defaultValues: {
      jenis_layanan_id: "",
      latitude: "",
      longitude: "",
      no_ktp_pemohon: "",
      nama_pemohon: "",
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

  const navigate = useNavigate();

  const getById = async (id: string) => {
    const result = await permohonanKrkServices.getDetailPermohonanKrk(id);
    return result.data.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["permohonan-krk", id],
    queryFn: () => getById(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data && isEdit) {
      const textFields = [
        "jenis_layanan_id",
        "latitude",
        "longitude",
        "no_ktp_pemohon",
        "nama_pemohon",
        "email_pemohon",
        "no_hp_pemohon",
        "alamat_pemohon",
        "no_lokasi_pemohon",
        "rt_lokasi_pemohon",
        "rw_lokasi_pemohon",
        "no_ktp_pemilik",
        "email_pemilik",
        "no_hp_pemilik",
        "alamat_pemilik",
        "no_lokasi_pemilik",
        "rt_lokasi_pemilik",
        "rw_lokasi_pemilik",
        "alamat_bangunan",
        "no_lokasi",
        "rt_lokasi",
        "rw_lokasi",
        "luas_tanah_m2",
        "letak_jalan_utama",
        "letak_jalan_sekunder",
        "fungsi_bangunan_id",
        "persimpangan_jalan",
        "no_sertifikat_tanah",
        "hasil_ukur",
      ];

      textFields.forEach((field) => {
        // @ts-ignore - ignore type check for dynamic loop
        form.setValue(field, data[field]?.toString() || "");
      });

      form.setValue(
        "provinsi_pemohon",
        data.provinsi_pemohon?.toString() || ""
      );
      form.setValue(
        "provinsi_pemilik",
        data.provinsi_pemilik?.toString() || ""
      );

      setTimeout(() => {
        form.setValue("kota_pemohon", data.kota_pemohon?.toString() || "");
        form.setValue("kota_pemilik", data.kota_pemilik?.toString() || "");
      }, 1000);

      setTimeout(() => {
        form.setValue(
          "kecamatan_pemohon",
          data.kecamatan_pemohon?.toString() || ""
        );
        form.setValue(
          "kecamatan_pemilik",
          data.kecamatan_pemilik?.toString() || ""
        );
      }, 2000);

      setTimeout(() => {
        form.setValue(
          "kelurahan_pemohon",
          data.kelurahan_pemohon?.toString() || ""
        );
        form.setValue(
          "kelurahan_pemilik",
          data.kelurahan_pemilik?.toString() || ""
        );
      }, 3000);
    }
  }, [data, isEdit, form]);

  const permohonan = async (payload: FormData) => {
    const result = await permohonanKrkServices.editPermohonan(id!, payload);
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
      toast.success("Berhasil mengupdate permohonan KRK");
      navigate("/riwayat-permohonan");
    },
  });

  const handleCreatePermohonan = (values: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (
        key !== "file_ktp_pemohon" &&
        key !== "PBB" &&
        key !== "file_sertifikat_tanah" &&
        key !== "SIMB" &&
        value !== undefined &&
        value !== null
      ) {
        formData.append(key, value as string);
      }
    });

    if (values.file_ktp_pemohon instanceof File) {
      formData.append("KTP-Pemohon", values.file_ktp_pemohon);
    }
    if (values.PBB instanceof File) {
      formData.append("PBB", values.PBB);
    }
    if (values.file_sertifikat_tanah instanceof File) {
      formData.append("Sertifikat-Tanah", values.file_sertifikat_tanah);
    }
    if (values.SIMB instanceof File) {
      formData.append("SIMB", values.SIMB);
    }

    mutate(formData);
  };

  const handleRefreshCaptcha = () => {};

  return {
    form,
    onSubmit: handleCreatePermohonan,
    handleRefreshCaptcha,
    isPending,
    data,
    isLoading,
    isEdit,
  };
};

export default usePermohonanKrkEdit;
