import kategoriFungsiBangunanServices from "@/services/api/kategoriFungsiBangunan.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const jenisKategoriFungsiBangunan = z.object({
  nama: z.string().min(1, { message: "Nama kategori wajib diisi" }),
});

export type JenisKategoriFungsiBangunan = z.infer<
  typeof jenisKategoriFungsiBangunan
>;

const useJenisKategoriFungsiBangunan = () => {
  const [editData, setEditData] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      nama: "",
    },
    resolver: zodResolver(jenisKategoriFungsiBangunan),
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        nama: editData.nama,
      });
      setIsCreating(false);
    }
  }, [editData, form]);

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

  // --- EDIT MUTATION ---
  const editJenisKategoriFungsiBangunan = async (
    payload: JenisKategoriFungsiBangunan
  ) => {
    const result =
      await kategoriFungsiBangunanServices.putKategoriFungsiBangunan(
        editData.id,
        payload
      );
    return result.data;
  };

  const { mutate: mutateEditKategori, isPending: isPendingEditKategori } =
    useMutation({
      mutationFn: editJenisKategoriFungsiBangunan,
      onError(error) {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;
          toast.error(message || "Terjadi kesalahan server");
        } else {
          toast.error(error.message);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["KategoriFungsiBangunan"] });
        handleCancel();
        toast.success("Berhasil mengubah data kategori");
      },
    });

  const handleEditJenisKategoriFungsiBangunan = (
    values: JenisKategoriFungsiBangunan
  ) => {
    mutateEditKategori(values);
  };

  // --- CREATE MUTATION ---
  const createJenisKategoriFungsiBangunan = async (
    payload: JenisKategoriFungsiBangunan
  ) => {
    const result =
      await kategoriFungsiBangunanServices.postKategoriFungsiBangunan(payload);
    return result.data;
  };

  const {
    mutate: mutateAddJenisKategori,
    isPending: isPendingAddJenisKategori,
  } = useMutation({
    mutationFn: createJenisKategoriFungsiBangunan,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || "Terjadi kesalahan server");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["KategoriFungsiBangunan"] });
      handleCancel();
      toast.success("Berhasil menambahkan data kategori");
    },
  });

  const handleAddJenisKategori = (values: JenisKategoriFungsiBangunan) => {
    mutateAddJenisKategori(values);
  };

  // --- DELETE MUTATION ---
  const deleteJenisKategori = async (id: string) => {
    const result =
      await kategoriFungsiBangunanServices.deleteKategoriFungsiBangunan(id);
    return result.data;
  };

  const {
    mutate: mutateDeleteJenisKategori,
    isPending: isPendingDeleteJenisKategori,
  } = useMutation({
    mutationFn: deleteJenisKategori,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message || "Terjadi kesalahan server");
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["KategoriFungsiBangunan"] });
      toast.success("Berhasil menghapus data kategori");
    },
  });

  const handleDeleteJenisKategori = (id: string) => {
    mutateDeleteJenisKategori(id);
  };

  // --- HANDLERS UTAMA ---

  const handleCreateClick = () => {
    setEditData(null);
    setIsCreating(true);
    form.reset({
      nama: "",
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
    });
  };

  return {
    editData,
    setEditData,
    isCreating,
    form,
    dataListKategoriFungsiBangunan,
    isLoadingListKategoriFungsiBangunan,
    // Edit
    isPendingEditKategori,
    handleEditJenisKategoriFungsiBangunan,
    handleEditClick,
    // Add
    isPendingAddJenisKategori,
    handleAddJenisKategori,
    handleCreateClick,
    // Delete
    isPendingDeleteJenisKategori,
    handleDeleteJenisKategori,
    // General
    handleCancel,
  };
};

export default useJenisKategoriFungsiBangunan;
