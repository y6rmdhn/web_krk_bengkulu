import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Save } from "lucide-react";
import useIdentitasTab from "./useIdentitas";
import FormInput from "@/components/commons/FormInput";

const IdentitasTab = () => {
  const { identitasForm, handleUpdateProfile, isPendingUpdateProfile } =
    useIdentitasTab();

  return (
    <Card className="rounded-lg shadow-sm border-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900">
          Data Identitas
        </CardTitle>
        <CardDescription className="text-gray-600">
          Lengkapi data identitas diri Anda dengan informasi yang valid dan
          akurat
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <Form {...identitasForm}>
          <form
            onSubmit={identitasForm.handleSubmit(handleUpdateProfile)}
            className="space-y-6"
          >
            {/* Section Informasi Pribadi */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Informasi Pribadi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  form={identitasForm}
                  label="No. KTP"
                  name="nik"
                  placeholder="Masukkan 16 digit nomor KTP"
                />
                <FormInput
                  form={identitasForm}
                  label="No. Telepon"
                  name="phone"
                  placeholder="Contoh: 081234567890"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  form={identitasForm}
                  label="Nama Lengkap"
                  name="name"
                  placeholder="Masukkan nama lengkap sesuai KTP"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  form={identitasForm}
                  label="Email"
                  name="email"
                  placeholder="nama@contoh.com"
                  type="email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={identitasForm.control}
                  name="jenis_kelamin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section Alamat */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                Alamat Tempat Tinggal
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  form={identitasForm}
                  label="Alamat Lengkap"
                  name="alamat"
                  placeholder="Masukkan jalan, gang, nomor rumah, dll."
                  type="textarea"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormInput
                  form={identitasForm}
                  label="No Rumah"
                  name="no_rumah"
                  placeholder="Nomor"
                />
                <FormInput
                  form={identitasForm}
                  label="RT"
                  name="rt"
                  placeholder="001"
                />
                <FormInput
                  form={identitasForm}
                  label="RW"
                  name="rw"
                  placeholder="002"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormInput
                  form={identitasForm}
                  label="Kelurahan/Desa"
                  name="kelurahan"
                  placeholder="Nama Kelurahan"
                />
                <FormInput
                  form={identitasForm}
                  label="Kecamatan"
                  name="kecamatan"
                  placeholder="Nama Kecamatan"
                />
                <FormInput
                  form={identitasForm}
                  label="Kota/Kabupaten"
                  name="kota"
                  placeholder="Nama Kota/Kabupaten"
                />
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                className="px-6"
                // disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-[#2451AA] hover:bg-[#1D4ED8] px-8 gap-2"
                disabled={
                  isPendingUpdateProfile || !identitasForm.formState.isDirty
                }
              >
                {isPendingUpdateProfile ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default IdentitasTab;
