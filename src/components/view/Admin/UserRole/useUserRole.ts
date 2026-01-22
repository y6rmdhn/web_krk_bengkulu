import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";

// Import Service
import userRoleServices from "@/services/api/userRole.service";
import roleServices from "@/services/api/role.service";

// Schema Validasi
export const userRoleSchema = z.object({
  userId: z.string().min(1, "User wajib dipilih"),
  roleId: z.string().min(1, "Role wajib dipilih"),
});

export type IUserRoleSchema = z.infer<typeof userRoleSchema>;

const useUserRole = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<IUserRoleSchema>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      userId: "",
      roleId: "",
    },
  });

  // --- 1. GET DATA LIST USER (Untuk Select User) ---
  const { data: userList, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const res = await userRoleServices.getUserRoles();
      return res.data.data; // Sesuaikan response API kamu
    },
  });

  // --- 2. GET DATA LIST ROLE (Untuk Select Role) ---
  const { data: roleList, isLoading: isLoadingRoles } = useQuery({
    queryKey: ["Roles"],
    queryFn: async () => {
      const res = await roleServices.getRoles();
      return res.data.data;
    },
  });

  // --- 3. GET DATA USER ROLES (Untuk Tabel Utama) ---
  const { data: userRoleList, isLoading: isLoadingUserRoles } = useQuery({
    queryKey: ["UserRoles"],
    queryFn: async () => {
      const res = await userRoleServices.getUserRoles();
      return res.data.data;
    },
  });

  // --- MUTATION: ASSIGN ROLE ---
  const { mutateAsync: assignRole, isPending: isSubmitting } = useMutation({
    mutationFn: async (payload: IUserRoleSchema) => {
      return await userRoleServices.assignRole(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["UserRoles"] });
      toast.success("Role berhasil diberikan ke user");
      handleCloseDialog();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Gagal assign role");
      }
    },
  });

  // --- HANDLERS ---
  const handleOpenDialog = () => setIsDialogOpen(true);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    form.reset();
  };

  const handleSubmit = async (data: IUserRoleSchema) => {
    await assignRole(data);
  };

  return {
    form,
    // Data Lists
    userList,
    roleList,
    userRoleList,
    // Loading States
    isLoading: isLoadingUsers || isLoadingRoles || isLoadingUserRoles,
    isSubmitting,
    // Modal State
    isDialogOpen,
    setIsDialogOpen,
    handleOpenDialog,
    handleSubmit,
  };
};

export default useUserRole;
