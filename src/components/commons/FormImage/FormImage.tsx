import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { FileImage } from "lucide-react";
import { getImageData } from "@/lib/utils";

export default function InputImage({
  label,
  form,
  name,
  preview,
  setPreview,
}: {
  label: string;
  form: any;
  name: any;
  preview?: {
    file: File;
    displayUrl: string;
  };
  setPreview?: (preview: { file: File; displayUrl: string }) => void;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...rest } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={preview?.displayUrl}
                  alt="preview"
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  <FileImage className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>

              <Input
                type="file"
                name={rest.name}
                ref={rest.ref}
                onBlur={rest.onBlur}
                disabled={rest.disabled}
                onChange={async (event) => {
                  onChange(event);
                  const { file, displayUrl } = getImageData(event);
                  if (file) {
                    setPreview?.({ file, displayUrl });
                  }
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
