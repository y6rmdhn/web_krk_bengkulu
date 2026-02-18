import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileText, X, FolderOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import environment from "@/config/environment";

type ExistingBerkasItem = {
  id: string;
  nama_file: string;
  file_path: string;
  masterBerkas?: { nama: string };
};

export default function InputFile({
  label,
  form,
  name,
  accept = ".pdf,.docx,.doc",
  selectedFile,
  setSelectedFile,
  existingBerkas,
}: {
  label: string;
  form: any;
  name: string;
  accept?: string;
  selectedFile?: File | null;
  setSelectedFile?: (file: File | null) => void;
  existingBerkas?: ExistingBerkasItem | null;
}) {
  const [isFetchingFile, setIsFetchingFile] = useState(false);

  const handleUseExistingBerkas = async (onChange: (file: File) => void) => {
    if (!existingBerkas) return;

    setIsFetchingFile(true);
    try {
      const fileUrl = `${environment.API_URL_PDF}/${existingBerkas.file_path}`;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const fileName = existingBerkas.nama_file || "berkas-profil.pdf";
      const file = new File([blob], fileName, { type: blob.type });

      onChange(file);
      setSelectedFile?.(file);
    } catch (error) {
      console.error("Gagal mengambil berkas dari profil:", error);
    } finally {
      setIsFetchingFile(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <p className="text-[12px] text-gray-500 -mt-1 mb-2">
            Format: PDF/JPG. Maksimal ukuran file: 5MB.
          </p>
          <FormControl>
            <div className="flex flex-col gap-3">
              {!selectedFile ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* INPUT FILE */}
                    <Input
                      {...fieldProps}
                      type="file"
                      accept={accept}
                      onChange={(event) => {
                        const file =
                          event.target.files && event.target.files[0];
                        if (file) {
                          onChange(file);
                          setSelectedFile?.(file);
                        }
                      }}
                    />
                  </div>

                  {/* TOMBOL GUNAKAN BERKAS PROFIL */}
                  {existingBerkas && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isFetchingFile}
                      className="w-full gap-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      onClick={() => handleUseExistingBerkas(onChange)}
                    >
                      {isFetchingFile ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Mengambil berkas...
                        </>
                      ) : (
                        <>
                          <FolderOpen className="h-4 w-4" />
                          Gunakan Berkas dari Profil
                        </>
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between rounded-md border p-3 bg-blue-50/50 dark:bg-blue-900/20">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate max-w-[200px]">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-100"
                    onClick={() => {
                      onChange(undefined);
                      setSelectedFile?.(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
