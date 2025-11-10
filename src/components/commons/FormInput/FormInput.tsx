import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  labelIcon?: ReactNode;
  className?: string;
  inputClassName?: string;
}

export default function FormInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  showPassword,
  onTogglePassword,
  labelIcon,
  className = "",
  inputClassName = "",
}: FormInputProps<T>) {
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  const error = form.formState.errors[name];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
            {labelIcon}
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              {type === "textarea" ? (
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  autoComplete="off"
                  className={cn(
                    "resize-none",
                    inputClassName,
                    error &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/20!"
                  )}
                />
              ) : (
                <Input
                  {...field}
                  type={inputType}
                  placeholder={placeholder}
                  autoComplete="off"
                  className={cn(
                    isPasswordType ? "pr-10" : "",
                    inputClassName,
                    error &&
                      "border-red-500 focus:border-red-500! focus:ring-red-500/20!"
                  )}
                />
              )}

              {/* Toggle Password Button */}
              {isPasswordType && onTogglePassword && (
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
