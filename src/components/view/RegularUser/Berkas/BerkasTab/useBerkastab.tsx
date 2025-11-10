import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const berkasSchema = z.object({
  jenisBerkas: z.string().min(1, "Jenis berkas harus diisi"),
  keterangan: z.string().min(1, "Keterangan harus diisi"),
});

type BerkasFormValues = z.infer<typeof berkasSchema>;

const useBerkasTab = () => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const berkasForm = useForm<BerkasFormValues>({
    resolver: zodResolver(berkasSchema),
    defaultValues: {
      jenisBerkas: "",
      keterangan: "",
    },
  });

  function onSubmitBerkas(data: BerkasFormValues) {
    console.log("Data Berkas:", data);
    // Handle berkas form submission
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      const fileUrl = URL.createObjectURL(file);
      setPreviewFile(fileUrl);
    }
  };

  return {
    previewFile,
    berkasForm,
    onSubmitBerkas,
    handleFileUpload,
  };
};

export default useBerkasTab;
