// Lokasi: src/components/view/RegularUser/PermohonanKrkEdit/DataLokasiForm/DataLokasi.tsx

import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useState, useEffect } from "react";
import InputFile from "@/components/commons/InputFile";
import FormInput from "@/components/commons/FormInput";
import FormFieldSelect from "@/components/commons/FormFieldSelect";
import useDataLocation from "./useDataLocation";
import WilayahForm from "../WilayahForm/WilayahForm";
import type { PermohonanEditFormValues } from "../usePermohohanKrkEdit";

type PropTypes = {
  form: UseFormReturn<PermohonanEditFormValues>;
};

const DataLokasi = (props: PropTypes) => {
  const { form } = props;
  const [sertifikatFile, setSertifikatFile] = useState<File | null>(null);
  const [PpbFile, setPpbFile] = useState<File | null>(null);
  // 1. Tambahkan state untuk Rencana Tapak
  const [rencanaTapakFile, setRencanaTapakFile] = useState<File | null>(null);

  const {
    dataJenisBangunan,
    isLoadingDataBangunan,
    dataJenisKategoriBangunan,
    isLoadingDataKategoriBangunan,
  } = useDataLocation();

  const selectedKategoriId = useWatch({
    control: form.control,
    name: "kategori_bangunan_id",
  });

  const filteredFungsiBangunan =
    dataJenisBangunan?.filter(
      (item: any) => item.kategori_id === selectedKategoriId,
    ) || [];

  useEffect(() => {
    if (form.getFieldState("kategori_bangunan_id").isDirty) {
      form.setValue("fungsi_bangunan_id", "");
    }
  }, [selectedKategoriId, form]);

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Lokasi" />
      <p className="text-red-600 text-sm">
        Data harus sesuai dengan sertifikat
      </p>

      {/* Wilayah Form (Kecamatan/Kelurahan Lokasi) */}
      <WilayahForm form={form} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        <div className="space-y-6">
          <FormInput
            form={form}
            label="Alamat Bangunan"
            name="alamat_bangunan"
            placeholder="Masukan alamat bangunan"
            type="text"
          />
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              form={form}
              label="No"
              name="no_lokasi"
              placeholder="No"
            />
            <FormInput
              form={form}
              label="RT"
              name="rt_lokasi"
              placeholder="00"
            />
            <FormInput
              form={form}
              label="RW"
              name="rw_lokasi"
              placeholder="00"
            />
          </div>
          <FormInput
            form={form}
            label="Luas Tanah (m²)"
            name="luas_tanah_m2"
            type="number"
            placeholder="0"
          />
          <FormInput
            form={form}
            label="Letak Jalan Utama"
            name="letak_jalan_utama"
            placeholder="Nama Jalan Utama"
          />
          <FormInput
            form={form}
            label="Letak Jalan Sekunder"
            name="letak_jalan_sekunder"
            placeholder="Nama Jalan Sekunder (s/d Jalan)"
          />

          <FormFieldSelect
            form={form}
            name="kategori_bangunan_id"
            label="Jenis Kategori Bangunan"
            placeholder={
              isLoadingDataKategoriBangunan ? "Memuat..." : "--Pilih Kategori--"
            }
            options={
              dataJenisKategoriBangunan?.map((item: any) => ({
                label: item.nama,
                value: item.id,
              })) || []
            }
          />

          <FormFieldSelect
            form={form}
            name="fungsi_bangunan_id"
            label="Jenis Bangunan"
            disabled={!selectedKategoriId || isLoadingDataBangunan}
            placeholder={
              isLoadingDataBangunan ? "Memuat..." : "--Pilih Fungsi--"
            }
            options={
              filteredFungsiBangunan.map((item: any) => ({
                label: item.nama,
                value: item.id,
              })) || []
            }
          />

          <FormFieldSelect
            form={form}
            name="persimpangan_jalan"
            label="Dipersimpangan Jalan?"
            placeholder="--Pilih Opsi--"
            options={[
              { label: "Ya", value: "Ya" },
              { label: "Tidak", value: "Tidak" },
            ]}
          />
        </div>

        <div className="space-y-6">
          <FormInput
            form={form}
            label="No Sertifikat Tanah"
            name="no_sertifikat_tanah"
            placeholder="Masukan No Sertifikat"
          />
          <InputFile
            form={form}
            label="Sertifikat/Surat Tanah"
            name="file_sertifikat_tanah"
            accept=".pdf"
            selectedFile={sertifikatFile}
            setSelectedFile={setSertifikatFile}
          />
          <FormInput
            form={form}
            label="No Pbb"
            name="no_pbb"
            placeholder="Masukan No Pbb"
          />
          <InputFile
            form={form}
            label="Upload PBB"
            name="PBB"
            accept=".pdf"
            selectedFile={PpbFile}
            setSelectedFile={setPpbFile}
          />

          {/* 2. Tambahkan Input File Rencana Tapak */}
          <InputFile
            form={form}
            label="Rencana Tapak"
            name="RENCANA_TAPAK"
            accept=".pdf"
            selectedFile={rencanaTapakFile}
            setSelectedFile={setRencanaTapakFile}
          />

          <FormInput
            form={form}
            label="Hasil Ukur"
            name="hasil_ukur"
            placeholder="Masukan Hasil Ukur"
          />
        </div>
      </div>
    </div>
  );
};
export default DataLokasi;
