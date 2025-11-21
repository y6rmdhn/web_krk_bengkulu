import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import InputFile from "@/components/commons/InputFile";
import FormInput from "@/components/commons/FormInput";
import { useState } from "react";
import FormFieldSelect from "@/components/commons/FormFieldSelect";
import useDataLocation from "./useDataLocation";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const DataLokasi = (props: PropTypes) => {
  const { form } = props;

  // State untuk file preview (opsional, tergantung implementasi InputFile kamu)
  const [simbFile, setSimbFile] = useState<File | null>(null);
  const [sertifikatFile, setSertifikatFile] = useState<File | null>(null);
  const [PpbFile, setPpbFile] = useState<File | null>(null);
  const { dataJenisBangunan, isLoadingDataBangunan } = useDataLocation();

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Lokasi" />
      <p className="text-red-600 text-sm">
        Data harus sesuai dengan sertifikat
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        {/* KOLOM KIRI */}
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
            name="fungsi_bangunan_id"
            label="Jenis Bangunan"
            placeholder={
              isLoadingDataBangunan ? "Memuat..." : "--Pilih Fungsi Bangunan--"
            }
            options={
              dataJenisBangunan?.map((item: { nama: string; id: string }) => ({
                label: item.nama,
                value: item.id,
              })) || []
            }
          />

          <InputFile
            form={form}
            label="Upload SIMB"
            name="SIMB"
            accept=".pdf"
            selectedFile={simbFile}
            setSelectedFile={setSimbFile}
          />

          <FormFieldSelect
            form={form}
            name="persimpangan_jalan"
            label="Dipersimpangan Jalan?"
            placeholder="--Pilih Fungsi Bangunan--"
            options={[
              { label: "Ya", value: "Ya" },
              { label: "Tidak", value: "Tidak" },
            ]}
          />
        </div>

        {/* KOLOM KANAN */}
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

          <InputFile
            form={form}
            label="Upload PBB"
            name="PBB"
            accept=".pdf"
            selectedFile={PpbFile}
            setSelectedFile={setPpbFile}
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
