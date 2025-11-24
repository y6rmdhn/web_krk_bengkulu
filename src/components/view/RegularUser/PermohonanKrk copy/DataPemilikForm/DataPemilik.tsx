import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import FormInput from "@/components/commons/FormInput";
import { useWilayahData } from "@/hooks/useWilayah";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const DataPemilik = (props: PropTypes) => {
  const { form } = props;

  // 1. Watch values
  const selectedProvinsi = form.watch("provinsi_pemilik");
  const selectedKota = form.watch("kota_pemilik");
  const selectedKecamatan = form.watch("kecamatan_pemilik");

  // 2. Hook Wilayah (Pastikan pakai versi hook yang sudah ada String() normalization)
  const { provinces, regencies, districts, villages, isProvincesLoading } =
    useWilayahData(
      selectedProvinsi ? String(selectedProvinsi) : "",
      selectedKota ? String(selectedKota) : "",
      selectedKecamatan ? String(selectedKecamatan) : ""
    );

  // 3. Helper Options
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

  // 4. Handler Ganti Manual
  const handleSelectChange = (
    value: string,
    onChange: (val: any) => void,
    options: { label: string; value: string | number }[],
    resetFields: (keyof PermohonanFormValues)[]
  ) => {
    resetFields.forEach((field) => form.setValue(field, ""));
    const matchedOption = options.find((opt) => opt.value.toString() === value);
    const parsedValue =
      typeof matchedOption?.value === "number" ? Number(value) : value;
    onChange(parsedValue);
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Pemilik Sesuai Sertifikat" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          form={form}
          label="No KTP"
          name="no_ktp_pemilik"
          placeholder="Masukan No KTP Pemilik"
          type="text"
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
          placeholder="08xxxxxxxxxx"
          type="tel"
        />
      </div>

      <FormInput
        form={form}
        label="Alamat Lengkap"
        name="alamat_pemilik"
        placeholder="Nama Jalan, Gang, dsb."
        type="text"
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
          placeholder="000"
        />
        <FormInput
          form={form}
          label="RW"
          name="rw_lokasi_pemilik"
          placeholder="000"
        />
      </div>

      {/* Wilayah Cascading Manual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. PROVINSI */}
        <FormField
          control={form.control}
          name="provinsi_pemilik"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-5 flex-col lg:flex-row">
              <FormLabel className="w-full text-xs sm:text-sm mt-0 lg:mt-2">
                Provinsi <span className="text-red-500">*</span>
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <Select
                  key={`provinsi-${provinceOptions.length}`}
                  disabled={isProvincesLoading}
                  onValueChange={(val) =>
                    handleSelectChange(val, field.onChange, provinceOptions, [
                      "kota_pemilik",
                      "kecamatan_pemilik",
                      "kelurahan_pemilik",
                    ])
                  }
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full text-xs">
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
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* 2. KOTA */}
        <FormField
          control={form.control}
          name="kota_pemilik"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-5 flex-col lg:flex-row">
              <FormLabel className="w-full text-xs sm:text-sm mt-0 lg:mt-2">
                Kota/Kabupaten <span className="text-red-500">*</span>
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <Select
                  // KEY INI PENTING
                  key={`kota-${regencyOptions.length}`}
                  onValueChange={(val) =>
                    handleSelectChange(val, field.onChange, regencyOptions, [
                      "kecamatan_pemilik",
                      "kelurahan_pemilik",
                    ])
                  }
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Pilih Kota/Kabupaten" />
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
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* 3. KECAMATAN */}
        <FormField
          control={form.control}
          name="kecamatan_pemilik"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-5 flex-col lg:flex-row">
              <FormLabel className="w-full text-xs sm:text-sm mt-0 lg:mt-2">
                Kecamatan <span className="text-red-500">*</span>
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <Select
                  // KEY INI PENTING
                  key={`kecamatan-${districtOptions.length}`}
                  onValueChange={(val) =>
                    handleSelectChange(val, field.onChange, districtOptions, [
                      "kelurahan_pemilik",
                    ])
                  }
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full text-xs">
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
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* 4. KELURAHAN */}
        <FormField
          control={form.control}
          name="kelurahan_pemilik"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-5 flex-col lg:flex-row">
              <FormLabel className="w-full text-xs sm:text-sm mt-0 lg:mt-2">
                Kelurahan/Desa <span className="text-red-500">*</span>
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <Select
                  // KEY INI PENTING
                  key={`kelurahan-${villageOptions.length}`}
                  onValueChange={(val) =>
                    handleSelectChange(val, field.onChange, villageOptions, [])
                  }
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Pilih Kelurahan/Desa" />
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
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DataPemilik;
