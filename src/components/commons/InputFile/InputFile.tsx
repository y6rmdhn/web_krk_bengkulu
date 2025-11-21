import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InputFile({
  label,
  form,
  name,
  accept = ".pdf,.docx,.doc",
  selectedFile,
  setSelectedFile,
}: {
  label: string;
  form: any;
  name: string; // Ganti any jadi string biar aman
  accept?: string;
  selectedFile?: File | null;
  setSelectedFile?: (file: File | null) => void;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-3">
              {!selectedFile ? (
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
                      const file = event.target.files && event.target.files[0];
                      if (file) {
                        onChange(file);
                        setSelectedFile?.(file); // Update state preview lokal
                      }
                    }}
                  />
                </div>
              ) : (
                /* AREA PREVIEW FILE (JIKA SUDAH PILIH) */
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
                      onChange(undefined); // PERBAIKAN: Reset form value jadi undefined/null
                      setSelectedFile?.(null); // Reset preview lokal
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
