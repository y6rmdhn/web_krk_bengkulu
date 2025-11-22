import disposisiServices from "@/services/api/disposisi.Services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// Tipe data dipisahkan agar jelas
export interface AcceptPayload {
  catatan: string;
}

export interface RevisiAndRejectPayload {
  alasan_penolakan: string;
}

const useActionButton = (id: string) => {
  const queryClient = useQueryClient();

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["detail-permohonan-krk"] });
    queryClient.invalidateQueries({ queryKey: ["detail-permohonan-history"] });
  };

  const formAccept = useForm<AcceptPayload>({
    defaultValues: { catatan: "" },
  });

  const formRevisiReject = useForm<RevisiAndRejectPayload>({
    defaultValues: { alasan_penolakan: "" },
  });

  const { mutate: acceptAction, isPending: isPendingAccept } = useMutation({
    mutationFn: async (payload: AcceptPayload) => {
      return await disposisiServices.approve(id, payload);
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
      formAccept.reset();
      refreshData();
    },
  });

  const { mutate: revisiAction, isPending: isPendingRevisi } = useMutation({
    mutationFn: async (payload: AcceptPayload) => {
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
    mutationFn: async (payload: RevisiAndRejectPayload) => {
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

export default useActionButton;
