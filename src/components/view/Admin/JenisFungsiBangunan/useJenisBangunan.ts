import jenisBangunanServices from "@/services/api/jenisBangunan.services";
import kategoriFungsiBangunanServices from "@/services/api/kategoriFungsiBangunan.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const jenisFungsiBangunanSchema = z.object({
  kode: z.string().min(1, { message: "Kode permohonan wajib diisi" }),
  nama: z.string().min(1, { message: "Nama fungsi bangunan wajib diisi" }),
  kategori_id: z.string().min(1, { message: "Kategori wajib dipilih" }),
});

export type IJenisFungsiBangunanSchema = z.infer<
  typeof jenisFungsiBangunanSchema
>;

const useJenisBangunan = () => {
  const [editData, setEditData] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<IJenisFungsiBangunanSchema>({
    defaultValues: {
      nama: "",
      kode: "",
      kategori_id: "",
    },
    resolver: zodResolver(jenisFungsiBangunanSchema),
  });

  const getListKategoriFungsiBangunan = async () => {
    const result =
      await kategoriFungsiBangunanServices.getKategoriFungsiBangunan();
    return result.data.data;
  };

  const {
    data: dataListKategoriFungsiBangunan,
    isLoading: isLoadingListKategoriFungsiBangunan,
  } = useQuery({
    queryKey: ["KategoriFungsiBangunan"],
    queryFn: getListKategoriFungsiBangunan,
  });

  useEffect(() => {
    if (editData && dataListKategoriFungsiBangunan) {
      form.reset({
        kode: editData.kode,
        nama: editData.nama,
        kategori_id: String(editData.kategori_id),
      });

      setIsCreating(false);
    }
  }, [editData, form, dataListKategoriFungsiBangunan]);

  const getListFungsiBangunan = async () => {
    const result = await jenisBangunanServices.getJenisBangunan();
    return result.data.data;
  };

  const { data: dataListJenisBangunan, isLoading: isLoadingListJenisBangunan } =
    useQuery({
      queryKey: ["JenisBangunan"],
      queryFn: getListFungsiBangunan,
    });

  // --- EDIT MUTATION ---
  const editJenisBangunan = async (payload: IJenisFungsiBangunanSchema) => {
    const result = await jenisBangunanServices.putFungsiBangunan(
      editData.id,
      payload
    );
    return result.data;
  };

  const { mutate: mutateEditBangunan, isPending: isPendingEditBangunan } =
    useMutation({
      mutationFn: editJenisBangunan,
      onError(error: any) {
        // Type 'any' atau 'AxiosError'
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["JenisBangunan"] });
        handleCancel();
        toast.success("Berhasil mengubah data fungsi bangunan");
      },
    });

  const handleEditJenisBangunan = (values: IJenisFungsiBangunanSchema) => {
    mutateEditBangunan(values);
  };

  // --- CREATE MUTATION ---
  const createJenisBangunan = async (payload: IJenisFungsiBangunanSchema) => {
    const result = await jenisBangunanServices.postFungsiBangunan(payload);
    return result.data;
  };

  const {
    mutate: mutateAddJenisBangunan,
    isPending: isPendingAddJenisBangunan,
  } = useMutation({
    mutationFn: createJenisBangunan,
    onError(error: any) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || "Terjadi kesalahan server");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["JenisBangunan"] });
      handleCancel();
      toast.success("Berhasil menambahkan data jenis bangunan");
    },
  });

  const handleAddJenisBangunan = (values: IJenisFungsiBangunanSchema) => {
    mutateAddJenisBangunan(values);
  };

  // --- DELETE MUTATION ---
  const deleteJenisBangunan = async (id: string) => {
    const result = await jenisBangunanServices.deleteFungsiBangunan(id);
    return result.data;
  };

  const {
    mutate: mutateDeleteJenisBangunan,
    isPending: isPendingDeleteJenisBangunan,
  } = useMutation({
    mutationFn: deleteJenisBangunan,
    onError(error: any) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || "Terjadi kesalahan server");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["JenisBangunan"] });
      toast.success("Berhasil menghapus data jenis bangunan");
    },
  });

  const handleDeleteJenisBangunan = (id: string) => {
    mutateDeleteJenisBangunan(id);
  };

  // --- HANDLERS UTAMA ---

  const handleCreateClick = () => {
    setEditData(null);
    setIsCreating(true);
    form.reset({
      nama: "",
      kode: "",
      kategori_id: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditClick = (item: any) => {
    setIsCreating(false);
    setEditData({ ...item });

    form.reset({
      kode: item.kode,
      nama: item.nama,
      kategori_id: String(item.kategori_id),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditData(null);
    setIsCreating(false);
    form.reset({
      nama: "",
      kode: "",
      kategori_id: "",
    });
  };

  return {
    editData,
    setEditData,
    isCreating,
    form,
    dataListJenisBangunan,
    isLoadingListJenisBangunan,

    // --- PERBAIKAN 2: Return Data Kategori ---
    dataListKategoriFungsiBangunan,
    isLoadingListKategoriFungsiBangunan,

    // Edit
    isPendingEditBangunan,
    handleEditJenisBangunan,
    handleEditClick,
    // Add
    isPendingAddJenisBangunan,
    handleAddJenisBangunan,
    handleCreateClick,
    // Delete
    isPendingDeleteJenisBangunan,
    handleDeleteJenisBangunan,
    // General
    handleCancel,
  };
};

export default useJenisBangunan;
