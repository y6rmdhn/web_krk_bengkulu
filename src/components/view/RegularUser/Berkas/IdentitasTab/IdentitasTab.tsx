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
import { useWilayahData } from "@/hooks/useWilayah";

// ID Provinsi Bengkulu (Standar BPS = 17).
// Ganti value ini jika di database wilayahmu ID-nya beda.
const BENGKULU_PROVINCE_ID = "17";

const IdentitasTab = () => {
  const { identitasForm, handleUpdateProfile, isPendingUpdateProfile } =
    useIdentitasTab();

  // 1. Watch perubahan value (Provinsi di-skip, langsung Kota)
  const selectedKota = identitasForm.watch("kota");
  const selectedKecamatan = identitasForm.watch("kecamatan");

  // 2. Panggil Hook Wilayah
  // Parameter pertama langsung kita isi ID Bengkulu
  const { regencies, districts, villages } = useWilayahData(
    BENGKULU_PROVINCE_ID,
    selectedKota ? String(selectedKota) : "",
    selectedKecamatan ? String(selectedKecamatan) : ""
  );

  // 3. Mapping Options (Province option dihapus karena tidak dipakai)
  const regencyOptions = regencies.map((r) => ({ label: r.name, value: r.id }));
  const districtOptions = districts.map((d) => ({
    label: d.name,
    value: d.id,
  }));
  const villageOptions = villages.map((v) => ({ label: v.name, value: v.id }));

  // 4. Handle Logic Cascading
  const handleSelectChange = (
    value: string,
    onChange: (val: any) => void,
    options: { label: string; value: string | number }[],
    resetFields: string[]
  ) => {
    // Reset field di bawahnya saat parent berubah
    resetFields.forEach((field) => identitasForm.setValue(field as any, ""));

    const matchedOption = options.find((opt) => opt.value.toString() === value);
    const parsedValue =
      typeof matchedOption?.value === "number" ? Number(value) : value;

    onChange(parsedValue);
  };

  return (
    <Card className="rounded-lg shadow-sm border-0 bg-white">
      <CardHeader className="pb-4 px-4 md:px-6">
        <CardTitle className="text-lg md:text-xl font-semibold text-gray-900">
          Data Identitas
        </CardTitle>
        <CardDescription className="text-sm text-gray-600">
          Lengkapi data identitas diri Anda dengan informasi yang valid dan
          akurat
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 md:p-6">
        <Form {...identitasForm}>
          <form
            onSubmit={identitasForm.handleSubmit(handleUpdateProfile)}
            className="space-y-6"
          >
            {/* --- Section Informasi Pribadi (Tidak Berubah) --- */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-medium text-gray-900 border-b pb-2">
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

            {/* --- Section Alamat --- */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-medium text-gray-900 border-b pb-2">
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

              {/* Implementasi Wilayah Cascading (Mulai dari Kota) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. KOTA / KABUPATEN (Otomatis list kota di Bengkulu) */}
                <FormField
                  control={identitasForm.control}
                  name="kota"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kota/Kabupaten <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        key={`kota-${regencyOptions.length}`}
                        onValueChange={(val) =>
                          handleSelectChange(
                            val,
                            field.onChange,
                            regencyOptions,
                            ["kecamatan", "kelurahan"]
                          )
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kota/Kabupaten" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {regencyOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value.toString()}
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 2. KECAMATAN */}
                <FormField
                  control={identitasForm.control}
                  name="kecamatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kecamatan <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        key={`kecamatan-${districtOptions.length}`}
                        disabled={!selectedKota} // Disable kalau kota belum dipilih
                        onValueChange={(val) =>
                          handleSelectChange(
                            val,
                            field.onChange,
                            districtOptions,
                            ["kelurahan"]
                          )
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kecamatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {districtOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value.toString()}
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 3. KELURAHAN */}
                <FormField
                  control={identitasForm.control}
                  name="kelurahan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kelurahan/Desa <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        key={`kelurahan-${villageOptions.length}`}
                        disabled={!selectedKecamatan} // Disable kalau kecamatan belum dipilih
                        onValueChange={(val) =>
                          handleSelectChange(
                            val,
                            field.onChange,
                            villageOptions,
                            []
                          )
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Kelurahan/Desa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[200px]">
                          {villageOptions.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value.toString()}
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-col-reverse md:flex-row justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-auto px-6"
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-[#2451AA] hover:bg-[#1D4ED8] w-full md:w-auto px-8 gap-2"
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
