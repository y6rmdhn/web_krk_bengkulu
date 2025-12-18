import authServices from "@/services/api/auth.services";
import { wilayahServices } from "@/services/api/region.services"; // Pastikan import ini ada
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// --- 1. Helper Function: Title Case ---
// Mengubah "KOTA BENGKULU" -> "Kota Bengkulu"
const toTitleCase = (str: string) => {
  if (!str) return "";
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (a) {
    return a.toUpperCase();
  });
};

export const identitasSchema = z.object({
  nik: z
    .string()
    .min(16, "NIK harus 16 digit")
    .max(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK harus berupa angka"),
  name: z
    .string()
    .min(1, "Nama lengkap harus diisi")
    .min(2, "Nama lengkap minimal 2 karakter"),
  email: z
    .string()
    .email("Format email tidak valid")
    .min(1, "Email harus diisi"),
  phone: z
    .string()
    .min(10, "No. telepon minimal 10 digit")
    .max(13, "No. telepon maksimal 13 digit")
    .regex(/^\d+$/, "No. telepon harus berupa angka"),
  alamat: z
    .string()
    .min(1, "Alamat harus diisi")
    .min(5, "Alamat minimal 5 karakter"),
  rt: z
    .string()
    .min(3, "RT harus 3 digit")
    .max(3, "RT harus 3 digit")
    .regex(/^\d+$/, "RT harus berupa angka"),
  rw: z
    .string()
    .min(3, "RW harus 3 digit")
    .max(3, "RW harus 3 digit")
    .regex(/^\d+$/, "RW harus berupa angka"),
  no_rumah: z
    .string()
    .min(1, "No. rumah harus diisi")
    .max(10, "No. rumah maksimal 10 karakter"),
  kelurahan: z.string().min(1, "Kelurahan harus diisi"),
  kecamatan: z.string().min(1, "Kecamatan harus diisi"),
  kota: z.string().min(1, "Kota harus diisi"),
  jenis_kelamin: z
    .string()
    .refine((value) => value === "Laki-laki" || value === "Perempuan", {
      message: "Pilih jenis kelamin: Laki-laki atau Perempuan",
    }),
});

export type IdentitasFormValues = z.infer<typeof identitasSchema>;

// ID Provinsi Bengkulu (Default, sesuaikan jika user bisa dari luar provinsi)
const PROVINSI_BENGKULU_ID = "17";

const useIdentitasTab = () => {
  const queryClient = useQueryClient();
  const isInitializedRef = useRef(false);

  const identitasForm = useForm<IdentitasFormValues>({
    resolver: zodResolver(identitasSchema),
    defaultValues: {
      nik: "",
      name: "",
      email: "",
      phone: "",
      alamat: "",
      rt: "",
      rw: "",
      no_rumah: "",
      kelurahan: "",
      kecamatan: "",
      kota: "",
      jenis_kelamin: "Laki-laki",
    },
  });

  const getProfile = async () => {
    const result = await authServices.getProfile();
    return result.data.data;
  };

  const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["GetProfileBerkas"],
    queryFn: getProfile,
    staleTime: 0,
    refetchOnMount: "always",
  });

  // --- 2. Helper Logic: Cari ID Wilayah ---
  // Mencari ID berdasarkan kecocokan ID (prioritas) atau Nama (fallback)
  const findRegionId = (list: any[], value: any) => {
    if (!value) return "";
    const valString = value.toString().toLowerCase();

    // 1. Cek by ID
    const matchById = list.find((item) => item.id.toString() === valString);
    if (matchById) return matchById.id;

    // 2. Cek by Name
    const matchByName = list.find(
      (item) => item.name.toLowerCase() === valString
    );
    return matchByName ? matchByName.id : "";
  };

  // --- 3. LOAD DATA (Hanya sekali jalan saat data ready) ---
  useEffect(() => {
    if (dataProfile && !isInitializedRef.current) {
      const loadDataWithRegions = async () => {
        // A. Set Field Biasa
        const { kota, kecamatan, kelurahan, ...restData } = dataProfile;
        Object.entries(restData).forEach(([key, value]) => {
          identitasForm.setValue(key as any, value?.toString() || "");
        });

        // B. Set Wilayah (Mapping Name -> ID agar dropdown jalan)
        try {
          // 1. Load Kota (Default Provinsi Bengkulu atau sesuaikan)
          // Jika tidak ada provinsi di dataProfile, kita asumsikan Bengkulu (17)
          const resKota =
            await wilayahServices.getRegencies(PROVINSI_BENGKULU_ID);
          const kotaId = findRegionId(resKota.data, dataProfile.kota);

          if (kotaId) {
            identitasForm.setValue("kota", kotaId);

            // 2. Load Kecamatan
            const resKec = await wilayahServices.getDistricts(kotaId);
            const kecId = findRegionId(resKec.data, dataProfile.kecamatan);

            if (kecId) {
              // Delay sedikit agar React Hook Form mendeteksi perubahan state kota
              setTimeout(async () => {
                identitasForm.setValue("kecamatan", kecId);

                // 3. Load Kelurahan
                const resKel = await wilayahServices.getVillages(kecId);
                const kelId = findRegionId(resKel.data, dataProfile.kelurahan);

                if (kelId) {
                  setTimeout(() => {
                    identitasForm.setValue("kelurahan", kelId);
                  }, 100);
                }
              }, 100);
            }
          }
        } catch (error) {
          console.error("Gagal load wilayah profile:", error);
        }
      };

      loadDataWithRegions();
      isInitializedRef.current = true;
    }
  }, [dataProfile, identitasForm]);

  const updateProfile = async (values: IdentitasFormValues) => {
    // --- 4. PREPARE SUBMIT: Convert ID -> Title Case Name ---
    const payload = { ...values };

    // Helper untuk mencari nama dari ID & Format Title Case
    const getRegionName = async (
      id: string,
      fetchFn: any,
      parentId?: string
    ) => {
      try {
        if (!id) return "";
        const res = parentId ? await fetchFn(parentId) : await fetchFn();
        const item = res.data.find((d: any) => d.id === id);
        // Jika ketemu, return Nama (Title Case), jika tidak return value as is
        return item ? toTitleCase(item.name) : toTitleCase(id);
      } catch (e) {
        return toTitleCase(id);
      }
    };

    // Kita harus fetch ulang namanya berdasarkan ID yang dipilih di form
    // Karena form menyimpan ID, tapi backend minta NAMA.

    // A. Kota
    if (values.kota) {
      // Kita asumsikan provinsi default (17) untuk cari nama kota
      payload.kota = await getRegionName(
        values.kota,
        wilayahServices.getRegencies,
        PROVINSI_BENGKULU_ID
      );
    }

    // B. Kecamatan
    if (values.kecamatan) {
      // Perlu ID kota (values.kota) untuk fetch kecamatan
      payload.kecamatan = await getRegionName(
        values.kecamatan,
        wilayahServices.getDistricts,
        values.kota // ID Kota yg ada di form saat ini
      );
    }

    // C. Kelurahan
    if (values.kelurahan) {
      // Perlu ID kecamatan (values.kecamatan) untuk fetch kelurahan
      payload.kelurahan = await getRegionName(
        values.kelurahan,
        wilayahServices.getVillages,
        values.kecamatan // ID Kecamatan yg ada di form saat ini
      );
    }

    // Format juga Nama Lengkap dan Alamat biar rapi (Opsional)
    payload.name = toTitleCase(values.name);
    payload.alamat = toTitleCase(values.alamat);

    const result = await authServices.updateProfile(payload);
    return result.data;
  };

  const { mutate: mutateUpdateProfile, isPending: isPendingUpdateProfile } =
    useMutation({
      mutationFn: updateProfile,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message);
        } else {
          toast.error((error as any).message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["GetProfile"] });
        toast.success("Update Profile Success");
      },
    });

  const handleUpdateProfile = (values: IdentitasFormValues) => {
    mutateUpdateProfile(values);
  };

  return {
    identitasForm,
    isPendingUpdateProfile,
    handleUpdateProfile,
    dataProfile,
    isLoadingProfile,
  };
};

export default useIdentitasTab;
