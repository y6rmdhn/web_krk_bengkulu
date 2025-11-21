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
  // Props untuk radio
  radioOptions?: { value: string; label: string }[];
  radioDirection?: "horizontal" | "vertical";
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
  // Props untuk radio
  radioOptions = [],
  radioDirection = "horizontal",
}: FormInputProps<T>) {
  const isPasswordType = type === "password";
  const isRadioType = type === "radio";
  const inputType = isPasswordType && showPassword ? "text" : type;

  const error = form.formState.errors[name];

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {/* Label untuk non-radio */}
          {!isRadioType && (
            <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
              {labelIcon}
              {label}
            </FormLabel>
          )}

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
              ) : isRadioType ? (
                // Radio Group
                <div
                  className={cn(
                    "flex gap-4 mt-2",
                    radioDirection === "vertical" ? "flex-col" : "flex-row"
                  )}
                >
                  {radioOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex items-center space-x-2 cursor-pointer",
                        "hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                      )}
                    >
                      <input
                        type="radio"
                        value={option.value}
                        checked={field.value === option.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={cn(
                          "text-blue-600 focus:ring-blue-500",
                          error && "border-red-500"
                        )}
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              ) : (
                // Input biasa (text, password, email, dll)
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

          {/* Label untuk radio (ditempatkan setelah input) */}
          {isRadioType && (
            <FormLabel className="text-gray-700 font-medium flex items-center gap-2">
              {labelIcon}
              {label}
            </FormLabel>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
