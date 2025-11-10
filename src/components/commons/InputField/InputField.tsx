import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

export default function InputField({
  id,
  label,
  placeholder,
  className = "",
  type = "text",
  form,
  name,
}: {
  id: string;
  label: string;
  placeholder?: string;
  className?: string;
  type?: string;
  form: any;
  name: any;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={`space-y-2 ${className}`}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              id={id}
              placeholder={placeholder || `Masukkan ${label.toLowerCase()}...`}
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
