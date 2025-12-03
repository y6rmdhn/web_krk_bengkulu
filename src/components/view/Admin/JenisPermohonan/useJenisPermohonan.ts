import jenisPermohonanServices from "@/services/api/jenisPermohonan.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const jenisPermohonanSchema = z.object({
  kode: z.string().min(1, { message: "Kode permohonan wajib diisi" }),
  nama: z.string().min(1, { message: "Nama permohonan wajib diisi" }),
  is_active: z.string().min(1, { message: "Status wajib diisi" }),
});

export type JenisPermohonanSchema = z.infer<typeof jenisPermohonanSchema>;

const useJenisPermohonan = () => {
  const [editData, setEditData] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      nama: "",
      kode: "",
      is_active: "",
    },
    resolver: zodResolver(jenisPermohonanSchema),
  });

  const getListPermohonan = async () => {
    const result = await jenisPermohonanServices.getJenisPermohonan();
    return result.data.data;
  };

  const {
    data: dataListJenisPermohonan,
    isLoading: isLoadingListJenisPermohonan,
  } = useQuery({
    queryKey: ["JenisPermohonan"],
    queryFn: getListPermohonan,
  });

  // --- EDIT MUTATION ---
  const editJenisPermohonan = async (payload: JenisPermohonanSchema) => {
    const result = await jenisPermohonanServices.putJenisPermohonan(
      editData.id,
      payload
    );
    return result.data;
  };

  const { mutate: mutateEditPermohonan, isPending: isPendingEditPermohonan } =
    useMutation({
      mutationFn: editJenisPermohonan,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["JenisPermohonan"] });
        handleCancel();
        toast.success("Berhasil mengubah data permohonan");
      },
    });

  const handleEditJenisPermohonan = (values: JenisPermohonanSchema) => {
    mutateEditPermohonan(values);
  };

  // --- CREATE MUTATION ---
  const createJenisPermohonan = async (payload: JenisPermohonanSchema) => {
    const result = await jenisPermohonanServices.postJenisPermohonan(payload);
    return result.data;
  };

  const {
    mutate: mutateAddJenisPermohonan,
    isPending: isPendingAddJenisPermohonan,
  } = useMutation({
    mutationFn: createJenisPermohonan,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || "Terjadi kesalahan server");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["JenisPermohonan"] });
      handleCancel();
      toast.success("Berhasil menambahkan data permohonan");
    },
  });

  const handleAddJenisPermohonan = (values: JenisPermohonanSchema) => {
    mutateAddJenisPermohonan(values);
  };

  // --- DELETE MUTATION ---
  const deleteJenisPermohonan = async (id: string) => {
    const result = await jenisPermohonanServices.deleteJenisPermohonan(id);
    return result.data;
  };

  const {
    mutate: mutateDeleteJenisPermohonan,
    isPending: isPendingDeleteJenisPermohonan,
  } = useMutation({
    mutationFn: deleteJenisPermohonan,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || "Terjadi kesalahan server");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["JenisPermohonan"] });
      toast.success("Berhasil menghapus data permohonan");
    },
  });

  const handleDeleteJenisPermohonan = (id: string) => {
    mutateDeleteJenisPermohonan(id);
  };

  // --- HANDLERS UTAMA ---

  const handleCreateClick = () => {
    setEditData(null);
    setIsCreating(true);
    form.reset({
      nama: "",
      kode: "",
      is_active: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditClick = (item: any) => {
    setIsCreating(false);
    setEditData({ ...item });

    form.reset({
      kode: item.kode,
      nama: item.nama,
      is_active: item.is_active ? "true" : "false",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditData(null);
    setIsCreating(false);
    form.reset({
      nama: "",
      kode: "",
      is_active: "",
    });
  };

  return {
    editData,
    setEditData,
    isCreating,
    form,
    dataListJenisPermohonan,
    isLoadingListJenisPermohonan,
    // Edit
    isPendingEditPermohonan,
    handleEditJenisPermohonan,
    handleEditClick,
    // Add
    isPendingAddJenisPermohonan,
    handleAddJenisPermohonan,
    handleCreateClick,
    // Delete
    isPendingDeleteJenisPermohonan,
    handleDeleteJenisPermohonan,
    // General
    handleCancel,
  };
};

export default useJenisPermohonan;
