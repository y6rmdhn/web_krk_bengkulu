import jenisLayananServices from "@/services/api/jenisLayanan.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const jenisLayananSchema = z.object({
  kode: z.string().min(1, { message: "Kode layanan wajib diisi" }),
  nama: z.string().min(1, { message: "Nama layanan wajib diisi" }),
  estimasi_hari: z.coerce
    .number({ error: () => ({ message: "Estimasi harus angka" }) })
    .min(1, { message: "Minimal 1 hari" }),
  is_active: z.enum(["true", "false"]).transform((value) => value === "true"),
});

export type JenisLayananSchema = z.infer<typeof jenisLayananSchema>;

const useJenisLayanan = () => {
  const [editData, setEditData] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      nama: "",
      kode: "",
      estimasi_hari: 1,
      is_active: "true", // Default true biar UX lebih enak
    },
    resolver: zodResolver(jenisLayananSchema),
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        kode: editData.kode,
        nama: editData.nama,
        estimasi_hari: editData.estimasi_hari,
        is_active: editData.is_active ? "true" : "false",
      });
      setIsCreating(false);
    }
  }, [editData, form]);

  const getListLayanan = async () => {
    const result = await jenisLayananServices.getJenisLayanan();
    return result.data.data;
  };

  const { data: dataListJenisLayanan, isLoading: isLoadingListJenisLayanan } =
    useQuery({
      queryKey: ["JenisLayanan"],
      queryFn: getListLayanan,
    });

  // --- EDIT MUTATION ---
  const editJenisLayanan = async (payload: JenisLayananSchema) => {
    const result = await jenisLayananServices.putJenisLayanan(
      editData.id,
      payload
    );
    return result.data;
  };

  const { mutate: mutateEditLayanan, isPending: isPendingEditLayanan } =
    useMutation({
      mutationFn: editJenisLayanan,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["JenisLayanan"] });
        handleCancel();
        toast.success("Berhasil mengubah data layanan");
      },
    });

  const handleEditJenisLayanan = (values: JenisLayananSchema) => {
    mutateEditLayanan(values);
  };

  // --- CREATE MUTATION ---
  const createJenisLayanan = async (payload: JenisLayananSchema) => {
    const result = await jenisLayananServices.postJenisLayanan(payload);
    return result.data;
  };

  const { mutate: mutateAddJenisLayanan, isPending: isPendingAddJenisLayanan } =
    useMutation({
      mutationFn: createJenisLayanan,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["JenisLayanan"] });
        handleCancel();
        toast.success("Berhasil menambahkan data layanan");
      },
    });

  const handleAddJenisLayanan = (values: JenisLayananSchema) => {
    mutateAddJenisLayanan(values);
  };

  // --- DELETE MUTATION ---
  // PERBAIKAN: Terima parameter ID disini
  const deleteJenisLayanan = async (id: string | number) => {
    const result = await jenisLayananServices.deleteJenisLayanan(id);
    return result.data;
  };

  const {
    mutate: mutateDeleteJenisLayanan,
    isPending: isPendingDeleteJenisLayanan,
  } = useMutation({
    mutationFn: deleteJenisLayanan,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || "Terjadi kesalahan server");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["JenisLayanan"] });
      // Tidak perlu handleCancel() karena delete biasanya pake dialog terpisah
      toast.success("Berhasil menghapus data layanan");
    },
  });

  // PERBAIKAN: Wrapper function terima ID
  const handleDeleteJenisLayanan = (id: string | number) => {
    mutateDeleteJenisLayanan(id);
  };

  // --- HANDLERS UTAMA ---

  const handleCreateClick = () => {
    setEditData(null);
    setIsCreating(true);
    form.reset({
      nama: "",
      kode: "",
      estimasi_hari: 1,
      is_active: "true",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditClick = (item: any) => {
    setIsCreating(false);
    setEditData({ ...item });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditData(null);
    setIsCreating(false);
    form.reset({
      nama: "",
      kode: "",
      estimasi_hari: 1,
      is_active: "true",
    });
  };

  return {
    editData,
    setEditData,
    isCreating,
    form,
    dataListJenisLayanan,
    isLoadingListJenisLayanan,
    // Edit
    isPendingEditLayanan,
    handleEditJenisLayanan,
    handleEditClick,
    // Add
    isPendingAddJenisLayanan,
    handleAddJenisLayanan,
    handleCreateClick,
    // Delete
    isPendingDeleteJenisLayanan,
    handleDeleteJenisLayanan,
    // General
    handleCancel,
  };
};

export default useJenisLayanan;
