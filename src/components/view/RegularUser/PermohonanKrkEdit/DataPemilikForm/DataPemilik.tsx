import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import FormInput from "@/components/commons/FormInput";
import { useWilayahData } from "@/hooks/useWilayah";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PermohonanEditFormValues } from "../usePermohohanKrkEdit";

type PropTypes = {
  form: UseFormReturn<PermohonanEditFormValues>;
};

const DataPemilik = (props: PropTypes) => {
  const { form } = props;

  // Watch ID (Karena API kirim ID)
  const selectedProvinsi = form.watch("provinsi_pemilik");
  const selectedKota = form.watch("kota_pemilik");
  const selectedKecamatan = form.watch("kecamatan_pemilik");

  const { provinces, regencies, districts, villages, isProvincesLoading } =
    useWilayahData(
      selectedProvinsi ? String(selectedProvinsi) : "",
      selectedKota ? String(selectedKota) : "",
      selectedKecamatan ? String(selectedKecamatan) : ""
    );

  const provinceOptions = provinces.map((p) => ({
    label: p.name,
    value: p.id,
  }));
  const regencyOptions = regencies.map((r) => ({ label: r.name, value: r.id }));
  const districtOptions = districts.map((d) => ({
    label: d.name,
    value: d.id,
  }));
  const villageOptions = villages.map((v) => ({ label: v.name, value: v.id }));

  const handleSelectChange = (
    value: string,
    // @ts-ignore
    fieldKey: keyof PermohonanEditFormValues, // e.g., 'kota_pemilik'
    nameKey: keyof PermohonanEditFormValues, // e.g., 'kota_pemilik_name'
    onChange: (val: any) => void,
    options: { label: string; value: string | number }[],
    resetFields: (keyof PermohonanEditFormValues)[]
  ) => {
    // 1. Reset Child
    resetFields.forEach((field) => form.setValue(field, ""));

    // 2. Simpan ID ke Form (agar dropdown terpilih)
    const matchedOption = options.find((opt) => opt.value.toString() === value);
    const parsedValue =
      typeof matchedOption?.value === "number" ? Number(value) : value;
    onChange(parsedValue);

    // 3. Simpan NAMA ke Hidden Field (untuk dikirim saat submit jika ada perubahan)
    if (matchedOption) {
      // @ts-ignore
      form.setValue(nameKey, matchedOption.label, { shouldDirty: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* HIDDEN INPUTS (PENTING untuk menangkap nama saat diedit) */}
      <input type="hidden" {...form.register("provinsi_pemilik_name")} />
      <input type="hidden" {...form.register("kota_pemilik_name")} />
      <input type="hidden" {...form.register("kecamatan_pemilik_name")} />
      <input type="hidden" {...form.register("kelurahan_pemilik_name")} />

      <SectionTitle title="Data Pemilik Sesuai Sertifikat" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          form={form}
          label="No KTP"
          name="no_ktp_pemilik"
          placeholder="Masukan No KTP"
        />
        <FormInput
          form={form}
          label="Nama Pemilik"
          name="nama_pemilik"
          placeholder="Masukan Nama"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          form={form}
          label="Email"
          name="email_pemilik"
          placeholder="contoh@email.com"
          type="email"
        />
        <FormInput
          form={form}
          label="No HP/WA"
          name="no_hp_pemilik"
          placeholder="08xxx"
          type="tel"
        />
      </div>
      <FormInput
        form={form}
        label="Alamat Lengkap"
        name="alamat_pemilik"
        placeholder="Nama Jalan"
      />
      <div className="grid grid-cols-3 gap-4">
        <FormInput
          form={form}
          label="No Rumah"
          name="no_lokasi_pemilik"
          placeholder="No"
        />
        <FormInput
          form={form}
          label="RT"
          name="rt_lokasi_pemilik"
          placeholder="00"
        />
        <FormInput
          form={form}
          label="RW"
          name="rw_lokasi_pemilik"
          placeholder="00"
        />
      </div>

      {/* Wilayah Cascading (Value = ID, tapi simpan Nama via handleSelectChange) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PROVINSI */}
        <FormField
          control={form.control}
          name="provinsi_pemilik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provinsi</FormLabel>
              <Select
                disabled={isProvincesLoading}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "provinsi_pemilik",
                    "provinsi_pemilik_name",
                    field.onChange,
                    provinceOptions,
                    ["kota_pemilik", "kecamatan_pemilik", "kelurahan_pemilik"]
                  )
                }
                value={field.value?.toString()} // Value adalah ID
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Provinsi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {provinceOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* KOTA */}
        <FormField
          control={form.control}
          name="kota_pemilik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kota/Kabupaten</FormLabel>
              <Select
                disabled={!selectedProvinsi}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "kota_pemilik",
                    "kota_pemilik_name",
                    field.onChange,
                    regencyOptions,
                    ["kecamatan_pemilik", "kelurahan_pemilik"]
                  )
                }
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kota" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {regencyOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* KECAMATAN */}
        <FormField
          control={form.control}
          name="kecamatan_pemilik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan</FormLabel>
              <Select
                disabled={!selectedKota}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "kecamatan_pemilik",
                    "kecamatan_pemilik_name",
                    field.onChange,
                    districtOptions,
                    ["kelurahan_pemilik"]
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
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        {/* KELURAHAN */}
        <FormField
          control={form.control}
          name="kelurahan_pemilik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelurahan</FormLabel>
              <Select
                disabled={!selectedKecamatan}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "kelurahan_pemilik",
                    "kelurahan_pemilik_name",
                    field.onChange,
                    villageOptions,
                    []
                  )
                }
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kelurahan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {villageOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
export default DataPemilik;
