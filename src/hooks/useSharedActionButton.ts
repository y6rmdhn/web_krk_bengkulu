import disposisiServices from "@/services/api/disposisi.Services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Menggabungkan semua kemungkinan payload
export interface UnifiedAcceptPayload {
  catatan: string;
  // Operator
  nextAction?: string;
  // Jabatan Fungsional
  geom?: string[];
  gsp?: string;
  gsb?: string;
  kdb?: string;
  klb?: string;
  kdh?: string;
  tb_max?: string;
  tb_min?: string;
}

export interface UnifiedRejectPayload {
  alasan_penolakan: string;
}

export type RoleType = "OPERATOR" | "JF" | "KADIS";

const useSharedActionButton = (id: string, role: RoleType) => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["detail-permohonan-krk"] });
    queryClient.invalidateQueries({ queryKey: ["detail-permohonan-history"] });
  };

  // Set default values menyesuaikan Role
  const acceptDefaultValues: UnifiedAcceptPayload = { catatan: "" };
  if (role === "OPERATOR") {
    acceptDefaultValues.nextAction = "DEFAULT";
  } else if (role === "JF") {
    acceptDefaultValues.geom = ["", ""];
    acceptDefaultValues.gsp = "";
    acceptDefaultValues.gsb = "";
    acceptDefaultValues.kdb = "";
    acceptDefaultValues.klb = "";
    acceptDefaultValues.kdh = "";
    acceptDefaultValues.tb_max = "";
    acceptDefaultValues.tb_min = "";
  }

  const formAccept = useForm<UnifiedAcceptPayload>({
    defaultValues: acceptDefaultValues,
  });

  const formRevisiReject = useForm<UnifiedRejectPayload>({
    defaultValues: { alasan_penolakan: "" },
  });

  const { mutate: acceptAction, isPending: isPendingAccept } = useMutation({
    mutationFn: async (payload: UnifiedAcceptPayload) => {
      const finalPayload = { ...payload };
      if (finalPayload.nextAction === "DEFAULT") {
        finalPayload.nextAction = "";
      }
      return await disposisiServices.approve(id, finalPayload);
    },
    onError: (error) => {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      toast.error(msg || "Gagal menyetujui disposisi");
    },
    onSuccess: () => {
      toast.success("Berhasil menyetujui disposisi!");
      formAccept.reset(acceptDefaultValues);
      refreshData();
    },
  });

  const { mutate: revisiAction, isPending: isPendingRevisi } = useMutation({
    mutationFn: async (payload: UnifiedAcceptPayload) => {
      return await disposisiServices.revisi(id, payload);
    },
    onError: (error) => {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      toast.error(msg || "Gagal mengirim revisi");
    },
    onSuccess: () => {
      toast.success("Berhasil mengirim revisi!");
      formRevisiReject.reset();
      refreshData();
    },
  });

  const { mutate: rejectAction, isPending: isPendingReject } = useMutation({
    mutationFn: async (payload: UnifiedRejectPayload) => {
      return await disposisiServices.reject(id, payload);
    },
    onError: (error) => {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message
          : error.message;
      toast.error(msg || "Gagal menolak disposisi");
    },
    onSuccess: () => {
      toast.success("Berhasil menolak disposisi!");
      formRevisiReject.reset();
      refreshData();
    },
  });

  return {
    formAccept,
    formRevisiReject,
    actions: {
      onAccept: formAccept.handleSubmit((data) => acceptAction(data)),
      onRevisi: formAccept.handleSubmit((data) => revisiAction(data)),
      onReject: formRevisiReject.handleSubmit((data) => rejectAction(data)),
    },
    state: {
      isPendingAccept,
      isPendingRevisi,
      isPendingReject,
    },
  };
};

export default useSharedActionButton;
