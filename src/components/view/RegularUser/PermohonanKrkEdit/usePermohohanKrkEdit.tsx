import permohonanKrkServices from "@/services/api/permohonanKrk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

// ... (schema fileSchemaEdit dan baseSchemaFields SAMA SEPERTI SEBELUMNYA) ...
// Pastikan bagian schema ini ada di kodemu (saya skip biar tidak kepanjangan)

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
  jenis_layanan_id: z.string().optional(),
  latitude: z.string().min(1, "Koordinat harus diisi"),
  longitude: z.string().min(1, "Koordinat harus diisi"),

  // Data Pemohon
  no_ktp_pemohon: z.string().min(16).max(16).regex(/^\d+$/),
  nama_pemohon: z.string().min(1),
  email_pemohon: z.string().email(),
  no_hp_pemohon: z.string().min(10).regex(/^\d+$/),
  alamat_pemohon: z.string().min(1),
  no_lokasi_pemohon: z.string().min(1),
  rt_lokasi_pemohon: z.string().regex(/^\d+$/),
  rw_lokasi_pemohon: z.string().regex(/^\d+$/),
  provinsi_pemohon: z.string().min(1),
  kota_pemohon: z.string().min(1),
  kecamatan_pemohon: z.string().min(1),
  kelurahan_pemohon: z.string().min(1),
  // Hidden Names
  provinsi_pemohon_name: z.string().optional(),
  kota_pemohon_name: z.string().optional(),
  kecamatan_pemohon_name: z.string().optional(),
  kelurahan_pemohon_name: z.string().optional(),

  // Data Pemilik
  nama_pemilik: z.string().min(1),
  no_ktp_pemilik: z.string().min(16).max(16).regex(/^\d+$/),
  email_pemilik: z.string().email(),
  no_hp_pemilik: z.string().min(10).regex(/^\d+$/),
  alamat_pemilik: z.string().min(1),
  no_lokasi_pemilik: z.string().min(1),
  rt_lokasi_pemilik: z.string().regex(/^\d+$/),
  rw_lokasi_pemilik: z.string().regex(/^\d+$/),
  provinsi_pemilik: z.string().min(1),
  kota_pemilik: z.string().min(1),
  kecamatan_pemilik: z.string().min(1),
  kelurahan_pemilik: z.string().min(1),
  // Hidden Names
  provinsi_pemilik_name: z.string().optional(),
  kota_pemilik_name: z.string().optional(),
  kecamatan_pemilik_name: z.string().optional(),
  kelurahan_pemilik_name: z.string().optional(),

  // Data Bangunan & Lokasi (Ini yang NAMA)
  alamat_bangunan: z.string().min(1),
  no_lokasi: z.string().min(1),
  rt_lokasi: z.string().regex(/^\d+$/),
  rw_lokasi: z.string().regex(/^\d+$/),
  luas_tanah_m2: z.string().min(1),
  letak_jalan_utama: z.string().min(1),
  letak_jalan_sekunder: z.string().min(1),
  fungsi_bangunan_id: z.string().min(1),
  kategori_bangunan_id: z.string().min(1),
  persimpangan_jalan: z.string().min(1),
  no_sertifikat_tanah: z.string().min(1),
  hasil_ukur: z.string().min(1),
  no_pbb: z.string().min(1),
  kecamatan_lokasi: z.string().min(1), // Ini NAMA
  kelurahan_lokasi: z.string().min(1), // Ini NAMA
};

const permohonanSchema = z.object({
  ...baseSchemaFields,
  file_ktp_pemohon: fileSchemaEdit,
  file_sertifikat_tanah: fileSchemaEdit,
  PBB: fileSchemaEdit,
});

export type PermohonanEditFormValues = z.infer<typeof permohonanSchema>;

const usePermohonanKrkEdit = (id: string) => {
  const navigate = useNavigate();

  const form = useForm<PermohonanEditFormValues>({
    resolver: zodResolver(permohonanSchema),
    defaultValues: {
      latitude: "",
      longitude: "",
      provinsi_pemohon_name: "",
      kota_pemohon_name: "",
      kecamatan_pemohon_name: "",
      kelurahan_pemohon_name: "",
      provinsi_pemilik_name: "",
      kota_pemilik_name: "",
      kecamatan_pemilik_name: "",
      kelurahan_pemilik_name: "",
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
      // 1. Koordinat & Field Dasar
      let lat = data.latitude;
      let lng = data.longitude;
      if (data.geom && data.geom.coordinates) {
        lng = data.geom.coordinates[0];
        lat = data.geom.coordinates[1];
      }
      form.setValue("latitude", lat?.toString() || "");
      form.setValue("longitude", lng?.toString() || "");

      // Loop field standar
      Object.keys(baseSchemaFields).forEach((key) => {
        if (
          key !== "latitude" &&
          key !== "longitude" &&
          !key.includes("_name")
        ) {
          // @ts-ignore
          if (data[key] !== undefined && data[key] !== null) {
            // @ts-ignore
            form.setValue(key, data[key].toString());
          }
        }
      });

      // 2. KHUSUS WILAYAH LOKASI (MAP) -> API Kirim NAMA, Form Butuh NAMA
      // Ini harus eksplisit agar Select di WilayahForm terisi
      form.setValue("kecamatan_lokasi", data.kecamatan_lokasi || "");
      form.setValue("kelurahan_lokasi", data.kelurahan_lokasi || "");

      // 3. KHUSUS WILAYAH PEMOHON & PEMILIK -> API Kirim ID/KODE, Form Butuh ID
      const setRegionId = (prefix: string, field: string) => {
        // @ts-ignore
        const val = data[`${field}_${prefix}`]?.toString() || "";
        // Set ke field utama (misal: kecamatan_pemilik) agar dropdown ID terpilih
        // @ts-ignore
        form.setValue(`${field}_${prefix}`, val);

        // Note: Kita tidak set _name di sini karena API kirim ID.
        // _name akan terisi jika user mengubah dropdown (onChange).
      };

      setRegionId("pemohon", "provinsi");
      setRegionId("pemohon", "kota");
      setRegionId("pemohon", "kecamatan");
      setRegionId("pemohon", "kelurahan");

      setRegionId("pemilik", "provinsi");
      setRegionId("pemilik", "kota");
      setRegionId("pemilik", "kecamatan");
      setRegionId("pemilik", "kelurahan");

      // 4. Bangunan (Kategori & Fungsi)
      if (data.fungsiBangunan) {
        form.setValue("fungsi_bangunan_id", data.fungsi_bangunan_id);
        form.setValue("kategori_bangunan_id", data.fungsiBangunan.kategori_id);
      }

      // 5. Files
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
        toast.error(error.response?.data?.message || "Terjadi kesalahan");
      } else {
        toast.error((error as any).message);
      }
    },
    onSuccess: () => {
      toast.success("Berhasil mengupdate permohonan KRK");
      navigate("/riwayat-permohonan");
    },
  });

  const handleEditPermohonan = (values: PermohonanEditFormValues) => {
    const formData = new FormData();
    const lng = parseFloat(values.longitude);
    const lat = parseFloat(values.latitude);
    const geoJsonData = { type: "Point", coordinates: [lng, lat] };
    formData.append("lokasi", JSON.stringify(geoJsonData));

    // List field yang mengandung wilayah ID (Pemilik & Pemohon)
    const idRegionKeys = [
      "provinsi_pem",
      "kota_pem",
      "kecamatan_pem",
      "kelurahan_pem",
    ];

    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "file_ktp_pemohon" ||
        key === "jenis_layanan_id" ||
        key === "PBB" ||
        key === "file_sertifikat_tanah" ||
        key === "latitude" ||
        key === "longitude" ||
        key.includes("_name")
      )
        return;

      // Logic Khusus: Jika key adalah wilayah Pemilik/Pemohon (ID)
      const isIdRegion = idRegionKeys.some((k) => key.startsWith(k));

      if (isIdRegion && value) {
        const nameKey = `${key}_name` as keyof PermohonanEditFormValues;
        // @ts-ignore
        const nameValue = values[nameKey];

        // Jika user mengubah dropdown, nameValue ada -> Kirim Nama
        if (nameValue) {
          formData.append(key, nameValue);
        } else {
          // Jika user TIDAK mengubah, nameValue kosong.
          // API butuh Nama. Tapi kita cuma punya ID (value).
          // Disini dilemanya: Kalau API edit support terima ID, kirim ID (value).
          // Kalau API Edit WAJIB Nama, logic ini beresiko jika user tidak edit wilayah.
          // Asumsi: API Edit cukup pintar menerima ID jika data tidak berubah, atau kita kirim value as-is.
          formData.append(key, value as string);
        }
      } else {
        // Field lain (termasuk kecamatan_lokasi yang sudah berupa Nama)
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      }
    });

    if (values.file_ktp_pemohon instanceof File)
      formData.append("KTP-Pemohon", values.file_ktp_pemohon);
    if (values.PBB instanceof File) formData.append("PBB", values.PBB);
    if (values.file_sertifikat_tanah instanceof File)
      formData.append("Sertifikat-Tanah", values.file_sertifikat_tanah);

    mutate(formData);
  };

  return { form, onSubmit: handleEditPermohonan, isPending, data, isLoading };
};

export default usePermohonanKrkEdit;
