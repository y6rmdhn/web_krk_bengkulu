import berkasServices from "@/services/api/berkas.services";
import type { IBerkas } from "@/types/berkas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { fileSchema } from "../../PermohonanKrk/usePermohohanKrk";

const berkasSchema = z.object({
  kode: z.string().min(1, "kode berkas harus diisi"),
  nama: z.string().min(1, "nama harus diisi"),
});

type BerkasFormValues = z.infer<typeof berkasSchema>;

const uploadBerkasSchema = z.object({
  file: fileSchema,
  master_berkas_id: z.string().min(1, "nama berkas harus di isi"),
});

type UploadBerkasFormValues = z.infer<typeof uploadBerkasSchema>;

const useBerkasTab = () => {
  const queryClient = useQueryClient();

  const form = useForm<BerkasFormValues>({
    resolver: zodResolver(berkasSchema),
    defaultValues: {
      kode: "",
      nama: "",
    },
  });

  const uploadFormBerkas = useForm<UploadBerkasFormValues>({
    resolver: zodResolver(uploadBerkasSchema),
    defaultValues: {
      master_berkas_id: "",
    },
  });

  const getBerkasMaster = async () => {
    const result = await berkasServices.getMasterData();

    return result.data.data;
  };

  const { data: dataMaster, isLoading: isLoadingDataMaster } = useQuery({
    queryKey: ["MasterData"],
    queryFn: getBerkasMaster,
  });

  const getBerkasListBerkas = async () => {
    const result = await berkasServices.getListBerkas();

    return result.data.data;
  };

  const { data: dataListBerkas, isLoading: isLoadingDataListBerkas } = useQuery(
    {
      queryKey: ["ListBerkas"],
      queryFn: getBerkasListBerkas,
    }
  );

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

  const uploadBerkas = async (payload: FormData) => {
    const result = await berkasServices.uploadBerkas(payload);

    return result.data;
  };

  const { mutate: mutateUploadBerkas, isPending: isPendingUploadBerkas } =
    useMutation({
      mutationFn: uploadBerkas,
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
        toast.success("Berhasil upload berkas");
        queryClient.invalidateQueries({ queryKey: ["ListBerkas"] });
      },
    });

  const handleUploadBerkas = (values: UploadBerkasFormValues) => {
    const formData = new FormData();

    formData.append("file", values.file);
    formData.append("master_berkas_id", values.master_berkas_id);

    mutateUploadBerkas(formData);
  };

  return {
    form,
    uploadFormBerkas,
    dataMaster,
    isLoadingDataMaster,
    handleSubmitData,
    isPending,
    handleUploadBerkas,
    isPendingUploadBerkas,
    dataListBerkas,
    isLoadingDataListBerkas,
  };
};

export default useBerkasTab;
