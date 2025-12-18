import permohonanKrkServices from "@/services/api/permohonanKrk";
import { wilayahServices } from "@/services/api/region.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
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

// --- 1. DEFINISI SCHEMA (Validasi) ---

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

  // Hidden fields
  provinsi_pemohon_name: z.string().optional(),
  kota_pemohon_name: z.string().optional(),
  kecamatan_pemohon_name: z.string().optional(),
  kelurahan_pemohon_name: z.string().optional(),
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

// --- 2. MAIN HOOK ---

// ID Kota Bengkulu (Sesuaikan jika berbeda)
const BENGKULU_CITY_ID = "1771";

const usePermohonanKrkEdit = (id: string) => {
  const navigate = useNavigate();

  const form = useForm<PermohonanEditFormValues>({
    resolver: zodResolver(permohonanSchema),
    defaultValues: {
      latitude: "",
      longitude: "",
      kecamatan_lokasi: "",
      kelurahan_lokasi: "",
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

  // --- LOGIC HELPER PENCARIAN ID WILAYAH ---
  const findRegionId = (list: any[], value: any) => {
    if (!value) return "";
    const valString = value.toString().toLowerCase();

    // 1. Coba cari yang ID-nya persis sama
    const matchById = list.find((item) => item.id.toString() === valString);
    if (matchById) return matchById.id;

    // 2. Kalau gak ketemu ID, cari yang NAMANYA mirip (Case Insensitive)
    const matchByName = list.find(
      (item) => item.name.toLowerCase() === valString
    );
    return matchByName ? matchByName.id : "";
  };

  // --- LOGIC LOAD DATA ---
  useEffect(() => {
    if (data) {
      console.log("Data Detail Loaded:", data);

      // A. Koordinat
      let lat = data.latitude;
      let lng = data.longitude;
      if (data.geom && data.geom.coordinates) {
        lng = data.geom.coordinates[0];
        lat = data.geom.coordinates[1];
      }
      form.setValue("latitude", lat?.toString() || "");
      form.setValue("longitude", lng?.toString() || "");

      // B. Field Standar
      const excludedFields = [
        "latitude",
        "longitude",
        // Exclude Wilayah Pemohon & Pemilik
        "provinsi_pemohon",
        "kota_pemohon",
        "kecamatan_pemohon",
        "kelurahan_pemohon",
        "provinsi_pemilik",
        "kota_pemilik",
        "kecamatan_pemilik",
        "kelurahan_pemilik",
        // Exclude Wilayah Lokasi
        "kecamatan_lokasi",
        "kelurahan_lokasi",
        // Exclude Bangunan
        "fungsi_bangunan_id",
        "kategori_bangunan_id",
      ];

      Object.keys(baseSchemaFields).forEach((key) => {
        if (!excludedFields.includes(key) && !key.includes("_name")) {
          // @ts-ignore
          if (data[key] !== undefined && data[key] !== null) {
            // @ts-ignore
            form.setValue(key, data[key].toString());
          }
        }
      });

      // C. LOGIC PEMOHON
      const loadWilayahPemohon = async () => {
        try {
          const resProv = await wilayahServices.getProvinces();
          const provId = findRegionId(resProv.data, data.provinsi_pemohon);

          if (provId) {
            form.setValue("provinsi_pemohon", provId);
            const resKota = await wilayahServices.getRegencies(provId);
            const kotaId = findRegionId(resKota.data, data.kota_pemohon);

            if (kotaId) {
              setTimeout(async () => {
                form.setValue("kota_pemohon", kotaId);
                const resKec = await wilayahServices.getDistricts(kotaId);
                const kecId = findRegionId(resKec.data, data.kecamatan_pemohon);

                if (kecId) {
                  setTimeout(async () => {
                    form.setValue("kecamatan_pemohon", kecId);
                    const resKel = await wilayahServices.getVillages(kecId);
                    const kelId = findRegionId(
                      resKel.data,
                      data.kelurahan_pemohon
                    );

                    if (kelId) {
                      setTimeout(() => {
                        form.setValue("kelurahan_pemohon", kelId);
                      }, 100);
                    }
                  }, 100);
                }
              }, 100);
            }
          }
        } catch (error) {
          console.error("Gagal mapping wilayah pemohon:", error);
        }
      };

      // D. LOGIC PEMILIK
      const loadWilayahPemilik = async () => {
        try {
          const resProv = await wilayahServices.getProvinces();
          const provId = findRegionId(resProv.data, data.provinsi_pemilik);
          const finalProvId = provId || data.provinsi_pemilik?.toString();

          if (finalProvId) {
            form.setValue("provinsi_pemilik", finalProvId);
            const resKota = await wilayahServices.getRegencies(finalProvId);
            const kotaId = findRegionId(resKota.data, data.kota_pemilik);

            if (kotaId) {
              setTimeout(async () => {
                form.setValue("kota_pemilik", kotaId);
                const resKec = await wilayahServices.getDistricts(kotaId);
                const kecId = findRegionId(resKec.data, data.kecamatan_pemilik);

                if (kecId) {
                  setTimeout(async () => {
                    form.setValue("kecamatan_pemilik", kecId);
                    const resKel = await wilayahServices.getVillages(kecId);
                    const kelId = findRegionId(
                      resKel.data,
                      data.kelurahan_pemilik
                    );

                    if (kelId) {
                      setTimeout(() => {
                        form.setValue("kelurahan_pemilik", kelId);
                      }, 100);
                    }
                  }, 100);
                }
              }, 100);
            }
          }
        } catch (error) {
          console.error("Gagal load wilayah pemilik:", error);
        }
      };

      // E. LOGIC WILAYAH LOKASI
      const loadWilayahLokasi = async () => {
        try {
          const kecamatanLokasiNama = data.kecamatan_lokasi;
          const kelurahanLokasiNama = data.kelurahan_lokasi;

          if (!kecamatanLokasiNama) return;

          const resKec = await wilayahServices.getDistricts(BENGKULU_CITY_ID);
          const kecamatanLokasi = resKec.data.find(
            (kec: any) =>
              kec.name.toLowerCase() === kecamatanLokasiNama.toLowerCase()
          );

          if (kecamatanLokasi) {
            setTimeout(() => {
              form.setValue("kecamatan_lokasi", kecamatanLokasi.name);

              if (kelurahanLokasiNama) {
                wilayahServices
                  .getVillages(kecamatanLokasi.id)
                  .then((resKel) => {
                    const kelurahanLokasi = resKel.data.find(
                      (kel: any) =>
                        kel.name.toLowerCase() ===
                        kelurahanLokasiNama.toLowerCase()
                    );

                    if (kelurahanLokasi) {
                      setTimeout(() => {
                        form.setValue("kelurahan_lokasi", kelurahanLokasi.name);
                      }, 100);
                    } else {
                      form.setValue("kelurahan_lokasi", kelurahanLokasiNama);
                    }
                  });
              }
            }, 200);
          } else {
            form.setValue("kecamatan_lokasi", kecamatanLokasiNama);
          }
        } catch (error) {
          console.error("Gagal mapping wilayah lokasi:", error);
          if (data.kecamatan_lokasi)
            form.setValue("kecamatan_lokasi", data.kecamatan_lokasi);
          if (data.kelurahan_lokasi)
            form.setValue("kelurahan_lokasi", data.kelurahan_lokasi);
        }
      };

      loadWilayahPemohon();
      setTimeout(loadWilayahPemilik, 300);
      setTimeout(loadWilayahLokasi, 600);

      // F. DATA BANGUNAN
      if (data.fungsiBangunan) {
        const kategoriId = data.fungsiBangunan.kategori_id;
        form.setValue("kategori_bangunan_id", kategoriId);

        setTimeout(() => {
          const fungsiId = data.fungsi_bangunan_id || data.fungsiBangunan.id;
          if (fungsiId) {
            form.setValue("fungsi_bangunan_id", fungsiId);
          }
        }, 500);
      }

      // G. FILE ATTACHMENTS
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

      setTimeout(() => {
        if (ktpPath) form.setValue("file_ktp_pemohon", ktpPath);
        if (pbbPath) form.setValue("PBB", pbbPath);
        if (sertifikatPath)
          form.setValue("file_sertifikat_tanah", sertifikatPath);
      }, 800);
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

  const handleEditPermohonan = async (values: PermohonanEditFormValues) => {
    const formData = new FormData();
    const lng = parseFloat(values.longitude);
    const lat = parseFloat(values.latitude);
    const geoJsonData = { type: "Point", coordinates: [lng, lat] };
    formData.append("lokasi", JSON.stringify(geoJsonData));

    // --- Helper Logic Submit: Convert ID -> Nama (Title Case) ---
    const appendWilayahByName = async (
      fieldKey: string,
      idValue: string,
      serviceFn: any,
      parentId?: string
    ) => {
      if (!idValue) return;
      try {
        const res = parentId ? await serviceFn(parentId) : await serviceFn();
        const item = res.data.find((d: any) => d.id === idValue);

        // JIKA KETEMU, KIRIM NAMA (DIFORMAT TITLE CASE)
        if (item) formData.append(fieldKey, toTitleCase(item.name));
        // JIKA TIDAK KETEMU, KIRIM VALUE ASLI (DIFORMAT TITLE CASE)
        else formData.append(fieldKey, toTitleCase(idValue));
      } catch (e) {
        formData.append(fieldKey, toTitleCase(idValue));
      }
    };

    // 1. Wilayah Pemohon (Fetch ulang nama berdasarkan ID)
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

    // 2. Wilayah Pemilik (Fetch ulang nama berdasarkan ID - INI PENTING KARENA FORM NYIMPEN ID)
    await appendWilayahByName(
      "provinsi_pemilik",
      values.provinsi_pemilik,
      wilayahServices.getProvinces
    );
    await appendWilayahByName(
      "kota_pemilik",
      values.kota_pemilik,
      wilayahServices.getRegencies,
      values.provinsi_pemilik
    );
    await appendWilayahByName(
      "kecamatan_pemilik",
      values.kecamatan_pemilik,
      wilayahServices.getDistricts,
      values.kota_pemilik
    );
    await appendWilayahByName(
      "kelurahan_pemilik",
      values.kelurahan_pemilik,
      wilayahServices.getVillages,
      values.kecamatan_pemilik
    );

    // 3. Wilayah Lokasi (Value form sudah Nama, tinggal format Title Case)
    if (values.kecamatan_lokasi) {
      formData.append("kecamatan_lokasi", toTitleCase(values.kecamatan_lokasi));
    }
    if (values.kelurahan_lokasi) {
      formData.append("kelurahan_lokasi", toTitleCase(values.kelurahan_lokasi));
    }

    // 4. Exclude Keys yang sudah di-handle manual di atas
    const excludeSubmitKeys = [
      "file_ktp_pemohon",
      "PBB",
      "file_sertifikat_tanah",
      "latitude",
      "longitude",
      "jenis_layanan_id",
      // Exclude Pemohon
      "provinsi_pemohon",
      "kota_pemohon",
      "kecamatan_pemohon",
      "kelurahan_pemohon",
      // Exclude Pemilik (TAMBAHAN PENTING)
      "provinsi_pemilik",
      "kota_pemilik",
      "kecamatan_pemilik",
      "kelurahan_pemilik",
      // Exclude Lokasi
      "kecamatan_lokasi",
      "kelurahan_lokasi",
    ];

    // 5. Append Sisa Field (dan format Title Case jika string)
    Object.entries(values).forEach(([key, value]) => {
      if (excludeSubmitKeys.includes(key) || key.includes("_name")) return;
      if (value !== undefined && value !== null) {
        // Opsional: Format nama orang dan alamat jadi Title Case juga
        if (key.includes("nama") || key.includes("alamat")) {
          formData.append(key, toTitleCase(value as string));
        } else {
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
