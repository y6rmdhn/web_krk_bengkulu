import roleServices from "@/services/api/role.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "Nama role wajib diisi"),
  is_active: z.boolean(),
});

export type IRoleSchema = z.infer<typeof roleSchema>;

const useRole = () => {
  const queryClient = useQueryClient();
  const [editData, setEditData] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<IRoleSchema>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      is_active: true,
    },
  });

  // ===== GET LIST ROLE =====
  const getRoles = async () => {
    const res = await roleServices.getRoles();
    return res.data.data;
  };

  const { data: roleList, isLoading } = useQuery({
    queryKey: ["Roles"],
    queryFn: getRoles,
  });

  // ===== CREATE =====
  const createRole = async (payload: IRoleSchema) => {
    const res = await roleServices.createRole(payload);
    return res.data;
  };

  // Ganti ke mutateAsync agar bisa di-await
  const { mutateAsync: addRole, isPending: isPendingAdd } = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      // Jangan reset form/state disini, biarkan UI yang mengatur tutup modal
      toast.success("Role berhasil ditambahkan");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Gagal menambah role");
      }
    },
  });

  // ===== UPDATE =====
  const updateRole = async (payload: IRoleSchema) => {
    // Guard clause: Pastikan editData ada
    if (!editData?.id) throw new Error("ID tidak ditemukan");
    const res = await roleServices.updateRole(editData.id, payload);
    return res.data;
  };

  // Ganti ke mutateAsync
  const { mutateAsync: editRole, isPending: isPendingEdit } = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      toast.success("Role berhasil diubah");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Gagal mengubah role");
      }
    },
  });

  // ===== DELETE =====
  const deleteRole = async (id: string) => {
    // Pastikan tipe ID sesuai (number/string)
    const res = await roleServices.deleteRole(`${id}`);
    return res.data;
  };

  const { mutate: removeRole } = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Roles"] });
      toast.success("Role berhasil dihapus");
    },
  });

  // ===== HANDLER =====
  // Ubah jadi async agar UI bisa menunggu proses selesai
  const handleSubmit = async (values: IRoleSchema) => {
    try {
      if (isCreating) {
        await addRole(values);
      } else {
        await editRole(values);
      }
      // Kita return true jika sukses
      handleCancel(); // Reset form setelah sukses
      return true;
    } catch {
      // Jika error, return false
      return false;
    }
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setEditData(null);
    form.reset({ name: "", is_active: true });
  };

  const handleEditClick = (item: any) => {
    setIsCreating(false);
    setEditData(item);
    form.reset({
      name: item.name,
      is_active: item.is_active,
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditData(null);
    form.reset({ name: "", is_active: true });
  };

  return {
    roleList,
    isLoading,
    form,
    editData,
    isCreating, // Wajib dipakai untuk logic if/else di handleSubmit
    isPending: isPendingAdd || isPendingEdit, // Gabungan loading state
    handleSubmit,
    handleCreateClick,
    handleEditClick,
    removeRole,
    handleCancel,
  };
};

export default useRole;
