import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import InputFile from "@/components/commons/InputFile";
import FormInput from "@/components/commons/FormInput";
import FormFieldSelect from "@/components/commons/FormFieldSelect";
import { useWilayahData } from "@/hooks/useWilayah";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const DataPemohonForm = (props: PropTypes) => {
  const { form } = props;
  const [fileDoc, setFileDoc] = useState<File | null>(null);

  // 1. Watch value dari parent region untuk mentrigger fetch data child
  const selectedProvinsi = form.watch("provinsi_pemohon");
  const selectedKota = form.watch("kota_pemohon");
  const selectedKecamatan = form.watch("kecamatan_pemohon");

  // 2. Panggil Hook Wilayah
  const {
    provinces,
    regencies,
    districts,
    villages,
    isProvincesLoading,
    isRegenciesLoading,
    isDistrictsLoading,
    isVillagesLoading,
  } = useWilayahData(selectedProvinsi, selectedKota, selectedKecamatan);

  // 3. Logic Reset Cascading (Penting!)
  // Kalau Provinsi berubah, reset Kota, Kecamatan, Kelurahan
  useEffect(() => {
    form.setValue("kota_pemohon", "");
    form.setValue("kecamatan_pemohon", "");
    form.setValue("kelurahan_pemohon", "");
  }, [selectedProvinsi, form]);

  // Kalau Kota berubah, reset Kecamatan, Kelurahan
  useEffect(() => {
    form.setValue("kecamatan_pemohon", "");
    form.setValue("kelurahan_pemohon", "");
  }, [selectedKota, form]);

  // Kalau Kecamatan berubah, reset Kelurahan
  useEffect(() => {
    form.setValue("kelurahan_pemohon", "");
  }, [selectedKecamatan, form]);

  // 4. Mapping data API ke format Options {label, value}
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

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Pemohon" />

      {/* Identitas Dasar */}
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

      {/* Alamat */}
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

      {/* Wilayah Cascading Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormFieldSelect
          form={form}
          name="provinsi_pemohon"
          label="Provinsi"
          placeholder="Pilih Provinsi"
          options={provinceOptions}
          disabled={isProvincesLoading}
          required
        />

        <FormFieldSelect
          form={form}
          name="kota_pemohon"
          label="Kota/Kabupaten"
          placeholder="Pilih Kota/Kabupaten"
          options={regencyOptions}
          disabled={!selectedProvinsi || isRegenciesLoading}
          required
        />

        <FormFieldSelect
          form={form}
          name="kecamatan_pemohon"
          label="Kecamatan"
          placeholder="Pilih Kecamatan"
          options={districtOptions}
          disabled={!selectedKota || isDistrictsLoading}
          required
        />

        <FormFieldSelect
          form={form}
          name="kelurahan_pemohon"
          label="Kelurahan/Desa"
          placeholder="Pilih Kelurahan/Desa"
          options={villageOptions}
          disabled={!selectedKecamatan || isVillagesLoading}
          required
        />
      </div>

      {/* Upload File */}
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
