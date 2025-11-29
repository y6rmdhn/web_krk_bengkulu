import berkasServices from "@/services/api/berkas.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const berkasSchema = z.object({
  kode: z.string().min(1, { message: "Kode layanan wajib diisi" }),
  nama: z.string().min(1, { message: "Nama layanan wajib diisi" }),
});

export type BerkasSchema = z.infer<typeof berkasSchema>;

const useBerkas = () => {
  const [editData, setEditData] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      nama: "",
      kode: "",
    },
    resolver: zodResolver(berkasSchema),
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        kode: editData.kode,
        nama: editData.nama,
      });
      setIsCreating(false);
    }
  }, [editData, form]);

  const getListMasterDataBerkas = async () => {
    const result = await berkasServices.getMasterData();
    return result.data.data;
  };

  const { data: dataListJenisLayanan, isLoading: isLoadingListJenisLayanan } =
    useQuery({
      queryKey: ["BerkasMasterData"],
      queryFn: getListMasterDataBerkas,
    });

  // --- EDIT MUTATION ---
  const editBerkas = async (payload: BerkasSchema) => {
    const result = await berkasServices.putMasterData(editData.id, payload);
    return result.data;
  };

  const { mutate: mutateEditBerkas, isPending: isPendingEditBerkas } =
    useMutation({
      mutationFn: editBerkas,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["BerkasMasterData"] });
        handleCancel();
        toast.success("Berhasil mengubah data berkas");
      },
    });

  const handleEditBerkas = (values: BerkasSchema) => {
    mutateEditBerkas(values);
  };

  // --- CREATE MUTATION ---
  const createBerkas = async (payload: BerkasSchema) => {
    const result = await berkasServices.createMasterData(payload);
    return result.data;
  };

  const { mutate: mutateAddBerkas, isPending: isPendingAddBerkas } =
    useMutation({
      mutationFn: createBerkas,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["BerkasMasterData"] });
        handleCancel();
        toast.success("Berhasil menambahkan data berkas");
      },
    });

  const handleAddBerkas = (values: BerkasSchema) => {
    mutateAddBerkas(values);
  };

  // --- DELETE MUTATION ---
  // PERBAIKAN: Terima parameter ID disini
  const deleteBerkas = async (id: string) => {
    const result = await berkasServices.deleteMasterData(id);
    return result.data;
  };

  const { mutate: mutateDeleteBerkas, isPending: isPendingDeleteBerkas } =
    useMutation({
      mutationFn: deleteBerkas,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["BerkasMasterData"] });
        toast.success("Berhasil menghapus data layanan");
      },
    });

  // PERBAIKAN: Wrapper function terima ID
  const handleDeleteBerkas = (id: string) => {
    mutateDeleteBerkas(id);
  };

  // --- HANDLERS UTAMA ---

  const handleCreateClick = () => {
    setEditData(null);
    setIsCreating(true);
    form.reset({
      nama: "",
      kode: "",
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
    isPendingEditBerkas,
    handleEditBerkas,
    handleEditClick,
    // Add
    isPendingAddBerkas,
    handleAddBerkas,
    handleCreateClick,
    // Delete
    isPendingDeleteBerkas,
    handleDeleteBerkas,
    // General
    handleCancel,
  };
};

export default useBerkas;
