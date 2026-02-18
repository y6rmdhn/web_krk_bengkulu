// Lokasi: src/components/view/RegularUser/PermohonanKrk/DataLokasiForm/DataLokasi.tsx

import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useState, useEffect } from "react";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import InputFile from "@/components/commons/InputFile";
import FormInput from "@/components/commons/FormInput";
import FormFieldSelect from "@/components/commons/FormFieldSelect";
import useDataLocation from "./useDataLocation";
import WilayahForm from "../WilayahForm/WilayahForm";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
  profileBerkas?: any[];
};

const DataLokasi = (props: PropTypes) => {
  const { form, profileBerkas } = props;

  // Helper: cari berkas profil berdasarkan nama master berkas
  const findBerkasByNama = (nama: string) =>
    profileBerkas?.find((b: any) => b.masterBerkas?.nama === nama) || null;

  const [sertifikatFile, setSertifikatFile] = useState<File | null>(null);
  const [PpbFile, setPpbFile] = useState<File | null>(null);
  // 1. Tambahkan State untuk Rencana Tapak
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
    if (form.getValues("fungsi_bangunan_id")) {
      form.setValue("fungsi_bangunan_id", "");
    }
  }, [selectedKategoriId, form]);

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Lokasi" />
      <p className="text-red-600 text-sm">
        Data harus sesuai dengan sertifikat
      </p>

      <WilayahForm form={form} />

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

          {/* INPUT KATEGORI (PARENT) */}
          <FormFieldSelect
            form={form}
            name="kategori_bangunan_id"
            label="Jenis Kategori Bangunan"
            placeholder={
              isLoadingDataKategoriBangunan
                ? "Memuat..."
                : "--Pilih Kategori Fungsi Bangunan--"
            }
            options={
              dataJenisKategoriBangunan?.map(
                (item: { nama: string; id: string }) => ({
                  label: item.nama,
                  value: item.id,
                }),
              ) || []
            }
          />

          {/* INPUT FUNGSI (CHILD) */}
          <FormFieldSelect
            form={form}
            name="fungsi_bangunan_id"
            label="Jenis Bangunan"
            disabled={!selectedKategoriId || isLoadingDataBangunan}
            placeholder={
              isLoadingDataBangunan
                ? "Memuat..."
                : !selectedKategoriId
                  ? "--Pilih Kategori Terlebih Dahulu--"
                  : "--Pilih Fungsi Bangunan--"
            }
            options={
              filteredFungsiBangunan.map(
                (item: { nama: string; id: string }) => ({
                  label: item.nama,
                  value: item.id,
                }),
              ) || []
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
            existingBerkas={findBerkasByNama("Sertifikat Tanah")}
          />

          <FormInput
            form={form}
            label="No PBB"
            name="no_pbb"
            placeholder="Masukan No PBB"
          />

          <InputFile
            form={form}
            label="Upload PBB"
            name="PBB"
            accept=".pdf"
            selectedFile={PpbFile}
            setSelectedFile={setPpbFile}
            existingBerkas={findBerkasByNama("Bukti Pembayaran PBB Tahun Berjalan")}
          />

          {/* 2. Tambahkan Input File Rencana Tapak */}
          <InputFile
            form={form}
            label="Rencana Tapak"
            name="RENCANA_TAPAK"
            accept=".pdf"
            selectedFile={rencanaTapakFile}
            setSelectedFile={setRencanaTapakFile}
            existingBerkas={findBerkasByNama("Rencana Tapak")}
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
