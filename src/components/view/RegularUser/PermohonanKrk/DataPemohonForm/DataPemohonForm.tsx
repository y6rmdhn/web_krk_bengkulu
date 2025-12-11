import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import InputFile from "@/components/commons/InputFile";
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

const DataPemohonForm = (props: PropTypes) => {
  const { form } = props;
  const [fileDoc, setFileDoc] = useState<File | null>(null);

  const selectedProvinsi = form.watch("provinsi_pemohon");
  const selectedKota = form.watch("kota_pemohon");
  const selectedKecamatan = form.watch("kecamatan_pemohon");

  const { provinces, regencies, districts, villages, isProvincesLoading } =
    useWilayahData(selectedProvinsi, selectedKota, selectedKecamatan);

  // Reset logic saat parent berubah
  useEffect(() => {
    form.setValue("kota_pemohon", "");
    form.setValue("kota_pemohon_name", ""); // Reset nama juga
    form.setValue("kecamatan_pemohon", "");
    form.setValue("kecamatan_pemohon_name", "");
    form.setValue("kelurahan_pemohon", "");
    form.setValue("kelurahan_pemohon_name", "");
  }, [selectedProvinsi, form]);

  useEffect(() => {
    form.setValue("kecamatan_pemohon", "");
    form.setValue("kecamatan_pemohon_name", "");
    form.setValue("kelurahan_pemohon", "");
    form.setValue("kelurahan_pemohon_name", "");
  }, [selectedKota, form]);

  useEffect(() => {
    form.setValue("kelurahan_pemohon", "");
    form.setValue("kelurahan_pemohon_name", "");
  }, [selectedKecamatan, form]);

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

  // Helper function untuk handle perubahan dan set ID + Nama
  const handleSelectChange = (
    value: string,
    fieldKey: keyof PermohonanFormValues,
    nameKey: keyof PermohonanFormValues,
    options: { label: string; value: string | number }[]
  ) => {
    // 1. Set ID ke form (untuk logic cascading)
    form.setValue(fieldKey, value);

    // 2. Cari Label/Nama berdasarkan ID
    const selectedOption = options.find(
      (opt) => opt.value.toString() === value
    );
    if (selectedOption) {
      // 3. Set Nama ke form (untuk dikirim ke API)
      form.setValue(nameKey, selectedOption.label);
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Pemohon" />

      {/* Identitas Dasar (Sama seperti sebelumnya) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          form={form}
          label="No KTP"
          name="no_ktp_pemohon"
          placeholder="Masukan No KTP"
          type="text"
        />
        <FormInput
          form={form}
          label="Nama Pemohon"
          name="nama_pemohon"
          placeholder="Masukan Nama Lengkap"
          type="text"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          form={form}
          label="Email"
          name="email_pemohon"
          placeholder="contoh@email.com"
          type="email"
        />
        <FormInput
          form={form}
          label="No HP/WA"
          name="no_hp_pemohon"
          placeholder="08xxxxxxxxxx"
          type="tel"
        />
      </div>

      <FormInput
        form={form}
        label="Alamat Lengkap"
        name="alamat_pemohon"
        placeholder="Nama Jalan, Gang, dsb."
        type="text"
      />

      <div className="grid grid-cols-3 gap-4">
        <FormInput
          form={form}
          label="No Rumah"
          name="no_lokasi_pemohon"
          placeholder="No"
        />
        <FormInput
          form={form}
          label="RT"
          name="rt_lokasi_pemohon"
          placeholder="000"
        />
        <FormInput
          form={form}
          label="RW"
          name="rw_lokasi_pemohon"
          placeholder="000"
        />
      </div>

      {/* Wilayah Cascading Manual Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* PROVINSI */}
        <FormField
          control={form.control}
          name="provinsi_pemohon"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-2 flex-col">
              <FormLabel>
                Provinsi <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                disabled={isProvincesLoading}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "provinsi_pemohon",
                    "provinsi_pemohon_name",
                    provinceOptions
                  )
                }
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Provinsi" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinceOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* KOTA */}
        <FormField
          control={form.control}
          name="kota_pemohon"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-2 flex-col">
              <FormLabel>
                Kota/Kabupaten <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                disabled={!selectedProvinsi}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "kota_pemohon",
                    "kota_pemohon_name",
                    regencyOptions
                  )
                }
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kota/Kabupaten" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regencyOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* KECAMATAN */}
        <FormField
          control={form.control}
          name="kecamatan_pemohon"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-2 flex-col">
              <FormLabel>
                Kecamatan <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                disabled={!selectedKota}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "kecamatan_pemohon",
                    "kecamatan_pemohon_name",
                    districtOptions
                  )
                }
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districtOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* KELURAHAN */}
        <FormField
          control={form.control}
          name="kelurahan_pemohon"
          render={({ field }) => (
            <FormItem className="flex items-start gap-y-2 flex-col">
              <FormLabel>
                Kelurahan/Desa <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                disabled={!selectedKecamatan}
                onValueChange={(val) =>
                  handleSelectChange(
                    val,
                    "kelurahan_pemohon",
                    "kelurahan_pemohon_name",
                    villageOptions
                  )
                }
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kelurahan/Desa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {villageOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value.toString()}>
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

      <InputFile
        form={form}
        label="Upload KTP"
        name="file_ktp_pemohon"
        accept=".pdf,.jpg,.jpeg,.png"
        selectedFile={fileDoc}
        setSelectedFile={setFileDoc}
      />
    </div>
  );
};

export default DataPemohonForm;
