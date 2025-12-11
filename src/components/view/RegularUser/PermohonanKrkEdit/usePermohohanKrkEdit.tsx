import permohonanKrkServices from "@/services/api/permohonanKrk";
import { wilayahServices } from "@/services/api/region.services"; // Pastikan import ini ada
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";

// --- SCHEMA & VALIDASI (Sama seperti sebelumnya) ---
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
  // Field hidden untuk nama (opsional di schema, tapi penting di logic)
  provinsi_pemohon_name: z.string().optional(),
  kota_pemohon_name: z.string().optional(),
  kecamatan_pemohon_name: z.string().optional(),
  kelurahan_pemohon_name: z.string().optional(),

  // Data Pemilik (Backend sudah kirim ID, aman)
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
  provinsi_pemilik_name: z.string().optional(),
  kota_pemilik_name: z.string().optional(),
  kecamatan_pemilik_name: z.string().optional(),
  kelurahan_pemilik_name: z.string().optional(),

  // Data Bangunan & Lokasi
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
  kecamatan_lokasi: z.string().min(1),
  kelurahan_lokasi: z.string().min(1),
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

  // --- LOGIC LOAD DATA (BACKEND NAMA -> FORM ID) ---
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
          !key.includes("_name") &&
          !key.includes("provinsi_pemohon") && // Kita handle manual di bawah
          !key.includes("kota_pemohon") &&
          !key.includes("kecamatan_pemohon") &&
          !key.includes("kelurahan_pemohon")
        ) {
          // @ts-ignore
          if (data[key] !== undefined && data[key] !== null) {
            // @ts-ignore
            form.setValue(key, data[key].toString());
          }
        }
      });

      // 2. LOGIC KHUSUS PEMOHON: Cari ID berdasarkan Nama dari Backend
      const findIdByName = (list: any[], name: string) => {
        if (!name) return "";
        // Cari yang namanya sama (case insensitive)
        const item = list.find(
          (i) => i.name.toLowerCase() === name.toLowerCase()
        );
        return item ? item.id : "";
      };

      const loadWilayahPemohon = async () => {
        try {
          // A. PROVINSI (Fetch semua provinsi)
          const resProv = await wilayahServices.getProvinces();
          const provinces = resProv.data;
          const provName = data.provinsi_pemohon; // Backend kirim "BENGKULU"
          const provId = findIdByName(provinces, provName); // Kita cari ID-nya ("17")

          if (provId) {
            form.setValue("provinsi_pemohon", provId); // Set ID di form (untuk Dropdown)

            // B. KOTA (Fetch berdasarkan ID Provinsi yg ketemu)
            const resKota = await wilayahServices.getRegencies(provId);
            const kotaName = data.kota_pemohon;
            const kotaId = findIdByName(resKota.data, kotaName);

            if (kotaId) {
              form.setValue("kota_pemohon", kotaId);

              // C. KECAMATAN
              const resKec = await wilayahServices.getDistricts(kotaId);
              const kecName = data.kecamatan_pemohon;
              const kecId = findIdByName(resKec.data, kecName);

              if (kecId) {
                form.setValue("kecamatan_pemohon", kecId);

                // D. KELURAHAN
                const resKel = await wilayahServices.getVillages(kecId);
                const kelName = data.kelurahan_pemohon;
                const kelId = findIdByName(resKel.data, kelName);

                if (kelId) {
                  form.setValue("kelurahan_pemohon", kelId);
                }
              }
            }
          }
        } catch (error) {
          console.error("Gagal mapping wilayah pemohon:", error);
        }
      };

      // Jalankan fungsi mapping
      loadWilayahPemohon();

      // 3. Wilayah Pemilik (Asumsi Backend kirim ID, jadi langsung set)
      const setRegionId = (prefix: string, field: string) => {
        // @ts-ignore
        const val = data[`${field}_${prefix}`]?.toString() || "";
        // @ts-ignore
        form.setValue(`${field}_${prefix}`, val);
      };
      setRegionId("pemilik", "provinsi");
      setRegionId("pemilik", "kota");
      setRegionId("pemilik", "kecamatan");
      setRegionId("pemilik", "kelurahan");

      // 4. Wilayah Lokasi (Backend kirim Nama, Form juga butuh Nama -> Aman)
      form.setValue("kecamatan_lokasi", data.kecamatan_lokasi || "");
      form.setValue("kelurahan_lokasi", data.kelurahan_lokasi || "");

      // 5. Bangunan & Files
      if (data.fungsiBangunan) {
        form.setValue("fungsi_bangunan_id", data.fungsi_bangunan_id);
        form.setValue("kategori_bangunan_id", data.fungsiBangunan.kategori_id);
      }
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

  // --- LOGIC SUBMIT (FORM ID -> BACKEND NAMA) ---
  const handleEditPermohonan = async (values: PermohonanEditFormValues) => {
    const formData = new FormData();
    const lng = parseFloat(values.longitude);
    const lat = parseFloat(values.latitude);
    const geoJsonData = { type: "Point", coordinates: [lng, lat] };
    formData.append("lokasi", JSON.stringify(geoJsonData));

    // Fungsi Pembantu: Mengambil NAMA berdasarkan ID yang ada di form
    // Ini memastikan yang dikirim ke backend adalah "BENGKULU" bukan "17"
    const appendWilayahByName = async (
      fieldKey: string,
      idValue: string,
      serviceFn: any,
      parentId?: string
    ) => {
      if (!idValue) return;

      try {
        // Fetch data lagi sebentar untuk memastikan kita dapat namanya
        const res = parentId ? await serviceFn(parentId) : await serviceFn();
        const item = res.data.find((d: any) => d.id === idValue);

        if (item) {
          // KETEMU! Kirim Namanya
          formData.append(fieldKey, item.name);
        } else {
          // Fallback: kalau tidak ketemu, kirim value aslinya (siapa tau user ngetik manual/bukan ID)
          formData.append(fieldKey, idValue);
        }
      } catch (e) {
        console.error(`Gagal convert ID ke Nama untuk ${fieldKey}`, e);
        // Tetap kirim value agar tidak error validation di backend
        formData.append(fieldKey, idValue);
      }
    };

    // 1. Convert Wilayah Pemohon (Provinsi -> Kota -> Kec -> Kel)
    // Pakai await agar urut dan data parent tersedia
    await appendWilayahByName(
      "provinsi_pemohon",
      values.provinsi_pemohon,
      wilayahServices.getProvinces
    );
    await appendWilayahByName(
      "kota_pemohon",
      values.kota_pemohon,
      wilayahServices.getRegencies,
      values.provinsi_pemohon
    );
    await appendWilayahByName(
      "kecamatan_pemohon",
      values.kecamatan_pemohon,
      wilayahServices.getDistricts,
      values.kota_pemohon
    );
    await appendWilayahByName(
      "kelurahan_pemohon",
      values.kelurahan_pemohon,
      wilayahServices.getVillages,
      values.kecamatan_pemohon
    );

    // 2. Append Field Lainnya (Kecuali yang sudah dihandle manual)
    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "file_ktp_pemohon" ||
        key === "jenis_layanan_id" ||
        key === "PBB" ||
        key === "file_sertifikat_tanah" ||
        key === "latitude" ||
        key === "longitude" ||
        key.includes("_name") ||
        // Skip wilayah pemohon karena sudah di-append di atas
        [
          "provinsi_pemohon",
          "kota_pemohon",
          "kecamatan_pemohon",
          "kelurahan_pemohon",
        ].includes(key)
      )
        return;

      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    // 3. Files
    if (values.file_ktp_pemohon instanceof File)
      formData.append("KTP-Pemohon", values.file_ktp_pemohon);
    if (values.PBB instanceof File) formData.append("PBB", values.PBB);
    if (values.file_sertifikat_tanah instanceof File)
      formData.append("Sertifikat-Tanah", values.file_sertifikat_tanah);

    // Kirim!
    mutate(formData);
  };

  return { form, onSubmit: handleEditPermohonan, isPending, data, isLoading };
};

export default usePermohonanKrkEdit;
