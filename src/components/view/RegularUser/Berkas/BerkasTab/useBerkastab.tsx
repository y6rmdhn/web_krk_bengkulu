import berkasServices from "@/services/api/berkas.services";
import type { IBerkas } from "@/types/berkas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const berkasSchema = z.object({
  kode: z.string().min(1, "kode berkas harus diisi"),
  nama: z.string().min(1, "nama harus diisi"),
});

type BerkasFormValues = z.infer<typeof berkasSchema>;

const useBerkasTab = () => {
  const form = useForm<BerkasFormValues>({
    resolver: zodResolver(berkasSchema),
    defaultValues: {
      kode: "",
      nama: "",
    },
  });

  const getBerkasMaster = async () => {
    const result = await berkasServices.getMasterData();

    return result.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["MasterData"],
    queryFn: getBerkasMaster,
  });

  const createBerkasMaster = async (payload: IBerkas) => {
    const result = await berkasServices.createMasterData(payload);

    return result.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createBerkasMaster,
    onError(error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        toast.error(message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      form.reset();
      toast.success("Berhasil menambahkan data master berkas");
    },
  });

  const handleSubmitData = (values: BerkasFormValues) => {
    mutate(values);
  };

  return {
    data,
    isLoading,
    handleSubmitData,
    isPending,
    form,
  };
};

export default useBerkasTab;
