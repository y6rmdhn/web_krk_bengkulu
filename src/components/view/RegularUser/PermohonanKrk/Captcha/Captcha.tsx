import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
  handleRefreshCaptcha: () => void;
};

const Captcha = (props: PropTypes) => {
  const { form, handleRefreshCaptcha } = props;

  return (
    <div className="space-y-8 pt-6">
      <FormField
        control={form.control}
        name="captcha"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <FormLabel className="sm:w-1/6">Captcha</FormLabel>
              {/* Placeholder untuk gambar Captcha */}
              <div className="p-2 border rounded-md bg-gray-200">
                <span className="font-bold text-2xl tracking-widest italic">
                  4038572
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleRefreshCaptcha}
              >
                C
              </Button>
              <FormControl>
                <Input placeholder="Masukkan captcha..." {...field} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end items-center gap-4 pt-4">
        <Button type="button" variant="destructive" className="px-8 py-5">
          Batal
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-5"
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default Captcha;
