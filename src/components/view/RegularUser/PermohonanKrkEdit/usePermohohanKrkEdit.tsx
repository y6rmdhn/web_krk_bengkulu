import permohonanKrkServices from "@/services/api/permohonanKrk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

const fileSchemaEdit = z
  .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
  .optional()
  .refine((val) => {
    if (val instanceof File) {
      return (
        val.size <= 5 * 1024 * 1024 &&
        ["application/pdf", "image/jpeg", "image/png"].includes(val.type)
      );
    }
    return true;
  }, "Format harus PDF/JPG/PNG dan maksimal 5MB");

const baseSchemaFields = {
  jenis_layanan_id: z.string().min(1, "Layanan harus diisi"),
  latitude: z.string().min(1, "Koordinat harus diisi"),
  longitude: z.string().min(1, "Koordinat harus diisi"),

  // Data Pemohon
  no_ktp_pemohon: z
    .string()
    .min(16)
    .max(16)
    .regex(/^\d+$/, "No KTP harus angka"),
  nama_pemohon: z.string().min(1, "Nama pemohon harus diisi"),
  email_pemohon: z.string().email("Format email tidak valid"),
  no_hp_pemohon: z.string().min(10).regex(/^\d+$/, "No telepon harus angka"),
  alamat_pemohon: z.string().min(1, "Alamat pemohon harus diisi"),
  no_lokasi_pemohon: z.string().min(1, "No harus diisi"),
  rt_lokasi_pemohon: z.string().regex(/^\d+$/, "RT harus angka"),
  rw_lokasi_pemohon: z.string().regex(/^\d+$/, "RW harus angka"),
  provinsi_pemohon: z.string().min(1, "Provinsi pemohon harus diisi"),
  kota_pemohon: z.string().min(1, "Kota pemohon harus diisi"),
  kecamatan_pemohon: z.string().min(1, "Kecamatan pemohon harus diisi"),
  kelurahan_pemohon: z.string().min(1, "Kelurahan pemohon harus diisi"),

  // Data Pemilik
  nama_pemilik: z.string().min(1, "Nama pemilik harus diisi"),
  no_ktp_pemilik: z
    .string()
    .min(16)
    .max(16)
    .regex(/^\d+$/, "No KTP harus angka"),
  email_pemilik: z.string().email("Format email tidak valid"),
  no_hp_pemilik: z.string().min(10).regex(/^\d+$/, "No telepon harus angka"),
  alamat_pemilik: z.string().min(1, "Alamat pemilik harus diisi"),
  no_lokasi_pemilik: z.string().min(1, "No harus diisi"),
  rt_lokasi_pemilik: z.string().regex(/^\d+$/, "RT harus angka"),
  rw_lokasi_pemilik: z.string().regex(/^\d+$/, "RW harus angka"),
  provinsi_pemilik: z.string().min(1, "Provinsi pemilik harus diisi"),
  kota_pemilik: z.string().min(1, "Kota pemilik harus diisi"),
  kecamatan_pemilik: z.string().min(1, "Kecamatan pemilik harus diisi"),
  kelurahan_pemilik: z.string().min(1, "Kelurahan pemilik harus diisi"),

  // Data Bangunan & Tanah
  alamat_bangunan: z.string().min(1, "Alamat bangunan harus diisi"),
  no_lokasi: z.string().min(1, "No bangunan harus diisi"),
  rt_lokasi: z.string().regex(/^\d+$/, "RT harus angka"),
  rw_lokasi: z.string().regex(/^\d+$/, "RW harus angka"),
  luas_tanah_m2: z.string().min(1, "Luas tanah harus diisi"),
  letak_jalan_utama: z.string().min(1, "Letak antar jalan harus diisi"),
  letak_jalan_sekunder: z.string().min(1, "s/d jalan harus diisi"),
  fungsi_bangunan_id: z.string().min(1, "Fungsi bangunan harus diisi"),
  kategori_bangunan_id: z
    .string()
    .min(1, "Kategori Fungsi bangunan harus diisi"),
  persimpangan_jalan: z.string().min(1, "Field ini harus diisi"),
  no_sertifikat_tanah: z.string().min(1, "No sertifikat tanah harus diisi"),
  hasil_ukur: z.string().min(1, "Hasil ukur harus diisi"),
};

// Schema Final untuk Edit
const permohonanSchema = z.object({
  ...baseSchemaFields,
  file_ktp_pemohon: fileSchemaEdit,
  file_sertifikat_tanah: fileSchemaEdit,
  PBB: fileSchemaEdit,
});

const usePermohonanKrkEdit = (id: string) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(permohonanSchema),
    defaultValues: {
      latitude: "",
      longitude: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["permohonan-krk-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID Permohonan tidak ditemukan");
      const result = await permohonanKrkServices.getDetailPermohonanKrk(id);
      return result.data.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      let lat = "";
      let lng = "";

      if (data.geom && data.geom.coordinates) {
        lng = data.geom.coordinates[0];
        lat = data.geom.coordinates[1];
      } else {
        lat = data.latitude;
        lng = data.longitude;
      }

      form.setValue("latitude", lat?.toString() || "");
      form.setValue("longitude", lng?.toString() || "");

      Object.keys(baseSchemaFields).forEach((key) => {
        if (key !== "latitude" && key !== "longitude") {
          // @ts-ignore
          if (data[key] !== undefined && data[key] !== null) {
            // @ts-ignore
            form.setValue(key, data[key].toString());
          }
        }
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

      const getFilePath = (kode: string) => {
        if (!data.attachments || !Array.isArray(data.attachments)) return "";
        const file = data.attachments.find(
          (item: any) => item.masterBerkas?.kode === kode
        );
        return file?.file_path || "";
      };

      const ktpPath = getFilePath("KTP-Pemohon");
      const pbbPath = getFilePath("PBB");
      const sertifikatPath = getFilePath("Sertifikat-Tanah");

      if (ktpPath) form.setValue("file_ktp_pemohon", ktpPath);
      if (pbbPath) form.setValue("PBB", pbbPath);
      if (sertifikatPath)
        form.setValue("file_sertifikat_tanah", sertifikatPath);
    }
  }, [data, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: FormData) => {
      return await permohonanKrkServices.editPermohonan(id, payload);
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || "Terjadi kesalahan";
        toast.error(message);
      } else {
        toast.error((error as any).message);
      }
    },
    onSuccess: () => {
      toast.success("Berhasil mengupdate permohonan KRK");
      navigate("/riwayat-permohonan");
    },
  });

  const handleEditPermohonan = (values: any) => {
    const formData = new FormData();

    const lng = parseFloat(values.longitude);
    const lat = parseFloat(values.latitude);
    const geoJsonData = {
      type: "Point",
      coordinates: [lng, lat],
    };

    formData.append("lokasi", JSON.stringify(geoJsonData));

    Object.entries(values).forEach(([key, value]) => {
      if (
        key !== "file_ktp_pemohon" &&
        key !== "PBB" &&
        key !== "file_sertifikat_tanah" &&
        key !== "latitude" &&
        key !== "longitude" &&
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

    mutate(formData);
  };

  const handleRefreshCaptcha = () => {};

  return {
    form,
    onSubmit: handleEditPermohonan,
    handleRefreshCaptcha,
    isPending,
    data,
    isLoading,
  };
};

export default usePermohonanKrkEdit;
