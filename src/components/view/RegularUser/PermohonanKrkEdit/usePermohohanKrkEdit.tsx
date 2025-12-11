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

// Konstanta untuk wilayah Bengkulu
// const BENGKULU_PROVINCE_ID = "17";
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

  // --- LOGIC LOAD DATA ---
  useEffect(() => {
    if (data) {
      console.log("Data dari API:", {
        kecamatan_lokasi: data.kecamatan_lokasi,
        kelurahan_lokasi: data.kelurahan_lokasi,
        wilayah_lokasi: `${data.kelurahan_lokasi}, ${data.kecamatan_lokasi}`,
      });

      // A. Koordinat
      let lat = data.latitude;
      let lng = data.longitude;
      if (data.geom && data.geom.coordinates) {
        lng = data.geom.coordinates[0];
        lat = data.geom.coordinates[1];
      }
      form.setValue("latitude", lat?.toString() || "");
      form.setValue("longitude", lng?.toString() || "");

      // B. Field Standar (Exclude wilayah agar tidak bentrok)
      const excludedFields = [
        "latitude",
        "longitude",
        "provinsi_pemohon",
        "kota_pemohon",
        "kecamatan_pemohon",
        "kelurahan_pemohon",
        "provinsi_pemilik",
        "kota_pemilik",
        "kecamatan_pemilik",
        "kelurahan_pemilik",
        "kecamatan_lokasi",
        "kelurahan_lokasi",
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

      // C. LOGIC PEMOHON (Reverse Lookup + TIMEOUT untuk mengatasi Race Condition)
      const findIdByName = (list: any[], name: string) => {
        if (!name) return "";
        const item = list.find(
          (i) => i.name.toLowerCase() === name.toLowerCase()
        );
        return item ? item.id : "";
      };

      const loadWilayahPemohon = async () => {
        try {
          // 1. Provinsi
          const resProv = await wilayahServices.getProvinces();
          const provId = findIdByName(resProv.data, data.provinsi_pemohon);

          if (provId) {
            form.setValue("provinsi_pemohon", provId);

            // 2. Kota (Tunggu fetch)
            const resKota = await wilayahServices.getRegencies(provId);
            const kotaId = findIdByName(resKota.data, data.kota_pemohon);

            if (kotaId) {
              // Gunakan Timeout agar reset dari Provinsi selesai dulu
              setTimeout(async () => {
                form.setValue("kota_pemohon", kotaId);

                // 3. Kecamatan
                const resKec = await wilayahServices.getDistricts(kotaId);
                const kecId = findIdByName(resKec.data, data.kecamatan_pemohon);

                if (kecId) {
                  // Timeout lagi untuk menunggu reset dari Kota selesai
                  setTimeout(async () => {
                    form.setValue("kecamatan_pemohon", kecId);

                    // 4. Kelurahan
                    const resKel = await wilayahServices.getVillages(kecId);
                    const kelId = findIdByName(
                      resKel.data,
                      data.kelurahan_pemohon
                    );

                    if (kelId) {
                      // Timeout terakhir
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

      // D. LOGIC PEMILIK (Pake Timeout juga biar aman dari Reset)
      const loadWilayahPemilik = async () => {
        try {
          const provId = data.provinsi_pemilik?.toString();
          if (provId) {
            form.setValue("provinsi_pemilik", provId);

            // Fetch regencies
            await wilayahServices.getRegencies(provId);
            const kotaId = data.kota_pemilik?.toString();

            if (kotaId) {
              setTimeout(async () => {
                form.setValue("kota_pemilik", kotaId);

                // Fetch districts
                await wilayahServices.getDistricts(kotaId);
                const kecId = data.kecamatan_pemilik?.toString();

                if (kecId) {
                  setTimeout(async () => {
                    form.setValue("kecamatan_pemilik", kecId);

                    // Fetch villages
                    await wilayahServices.getVillages(kecId);
                    const kelId = data.kelurahan_pemilik?.toString();

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

      // E. LOGIC WILAYAH LOKASI (Kecamatan & Kelurahan Lokasi Bangunan)
      const loadWilayahLokasi = async () => {
        try {
          const kecamatanLokasiNama = data.kecamatan_lokasi;
          const kelurahanLokasiNama = data.kelurahan_lokasi;

          console.log("Memproses wilayah lokasi:", {
            kecamatan: kecamatanLokasiNama,
            kelurahan: kelurahanLokasiNama,
          });

          if (!kecamatanLokasiNama) {
            console.warn("Nama kecamatan lokasi tidak ditemukan di data API");
            return;
          }

          // 1. Ambil semua kecamatan di Kota Bengkulu
          const resKec = await wilayahServices.getDistricts(BENGKULU_CITY_ID);
          console.log(
            "Kecamatan tersedia:",
            resKec.data.map((k: any) => k.name)
          );

          // 2. Cari kecamatan yang sesuai (case insensitive)
          const kecamatanLokasi = resKec.data.find(
            (kec: any) =>
              kec.name.toLowerCase() === kecamatanLokasiNama.toLowerCase()
          );

          if (kecamatanLokasi) {
            console.log("Kecamatan ditemukan:", kecamatanLokasi);

            // Set nama kecamatan ke form (bukan ID)
            setTimeout(() => {
              form.setValue("kecamatan_lokasi", kecamatanLokasi.name);

              // 3. Cari kelurahan jika ada nama kelurahan
              if (kelurahanLokasiNama) {
                wilayahServices
                  .getVillages(kecamatanLokasi.id)
                  .then((resKel) => {
                    console.log(
                      "Kelurahan tersedia:",
                      resKel.data.map((k: any) => k.name)
                    );

                    const kelurahanLokasi = resKel.data.find(
                      (kel: any) =>
                        kel.name.toLowerCase() ===
                        kelurahanLokasiNama.toLowerCase()
                    );

                    if (kelurahanLokasi) {
                      console.log("Kelurahan ditemukan:", kelurahanLokasi);
                      // Set nama kelurahan ke form (bukan ID)
                      setTimeout(() => {
                        form.setValue("kelurahan_lokasi", kelurahanLokasi.name);
                      }, 100);
                    } else {
                      console.warn(
                        "Kelurahan tidak ditemukan:",
                        kelurahanLokasiNama
                      );
                    }
                  })
                  .catch((error) => {
                    console.error("Error fetching kelurahan:", error);
                  });
              }
            }, 200); // Delay untuk memastikan form siap
          } else {
            console.warn("Kecamatan tidak ditemukan:", kecamatanLokasiNama);
            // Tetap set nama dari API jika tidak ditemukan match
            setTimeout(() => {
              form.setValue("kecamatan_lokasi", kecamatanLokasiNama);
              if (kelurahanLokasiNama) {
                form.setValue("kelurahan_lokasi", kelurahanLokasiNama);
              }
            }, 200);
          }
        } catch (error) {
          console.error("Gagal mapping wilayah lokasi:", error);
          // Fallback: set langsung dari data API
          setTimeout(() => {
            if (data.kecamatan_lokasi) {
              form.setValue("kecamatan_lokasi", data.kecamatan_lokasi);
            }
            if (data.kelurahan_lokasi) {
              form.setValue("kelurahan_lokasi", data.kelurahan_lokasi);
            }
          }, 200);
        }
      };

      // Jalankan semua fungsi loading secara berurutan dengan delay
      setTimeout(() => {
        loadWilayahPemohon();
        setTimeout(() => {
          loadWilayahPemilik();
          setTimeout(() => {
            loadWilayahLokasi();
          }, 300);
        }, 300);
      }, 300);

      // F. Data Lainnya
      if (data.fungsiBangunan) {
        form.setValue("fungsi_bangunan_id", data?.fungsi_bangunan_id);
        form.setValue("kategori_bangunan_id", data?.fungsiBangunan.kategori_id);
      }

      // G. File Attachments
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

      // Set file paths dengan timeout untuk menghindari race condition
      setTimeout(() => {
        if (ktpPath) form.setValue("file_ktp_pemohon", ktpPath);
        if (pbbPath) form.setValue("PBB", pbbPath);
        if (sertifikatPath)
          form.setValue("file_sertifikat_tanah", sertifikatPath);
      }, 500);
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
        if (item) formData.append(fieldKey, item.name);
        else formData.append(fieldKey, idValue);
      } catch (e) {
        formData.append(fieldKey, idValue);
      }
    };

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

    // Append wilayah lokasi (kecamatan_lokasi dan kelurahan_lokasi sudah dalam bentuk nama)
    if (values.kecamatan_lokasi) {
      formData.append("kecamatan_lokasi", values.kecamatan_lokasi);
    }
    if (values.kelurahan_lokasi) {
      formData.append("kelurahan_lokasi", values.kelurahan_lokasi);
    }

    const excludeSubmitKeys = [
      "file_ktp_pemohon",
      "PBB",
      "file_sertifikat_tanah",
      "latitude",
      "longitude",
      "jenis_layanan_id",
      "provinsi_pemohon",
      "kota_pemohon",
      "kecamatan_pemohon",
      "kelurahan_pemohon",
      "kecamatan_lokasi",
      "kelurahan_lokasi",
    ];

    Object.entries(values).forEach(([key, value]) => {
      if (excludeSubmitKeys.includes(key) || key.includes("_name")) return;
      if (value !== undefined && value !== null) {
        formData.append(key, value as string);
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
