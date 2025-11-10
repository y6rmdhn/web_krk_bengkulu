import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import InputField from "@/components/commons/InputField";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const DataLokasi = (props: PropTypes) => {
  const { form } = props;

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Lokasi" />
      <p className="text-red-600 text-sm">
        Data harus sesuai dengan sertifikat
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        {/* KOLOM KIRI */}
        <div className="space-y-6">
          <InputField
            id="alamat-bangunan"
            label="Alamat Bangunan"
            form={form}
            name="alamatBangunan"
          />
          <div className="grid grid-cols-3 gap-4">
            <InputField
              id="no-bangunan"
              label="No"
              form={form}
              name="noBangunan"
            />
            <InputField
              id="rt-bangunan"
              label="RT"
              form={form}
              name="rtBangunan"
            />
            <InputField
              id="rw-bangunan"
              label="RW"
              form={form}
              name="rwBangunan"
            />
          </div>
          <InputField
            id="luas-tanah"
            label="Luas Tanah"
            form={form}
            name="luasTanah"
          />
          <InputField
            id="letak-antar-jalan"
            label="Letak Antar Jalan"
            form={form}
            name="letakAntarJalan"
          />
          <InputField
            id="sd-jalan"
            label="s/d jalan"
            form={form}
            name="sdJalan"
          />
          <InputField
            id="fungsi-bangunan"
            label="Fungsi Bangunan"
            form={form}
            name="fungsiBangunan"
          />
          <InputField
            id="simb-lama"
            label="SIMB Lama"
            form={form}
            name="simbLama"
          />
          <InputField
            id="dipersimpangan"
            label="Dipersimpangan Jalan?"
            form={form}
            name="dipersimpangan"
          />
        </div>
        {/* KOLOM KANAN */}
        <div className="space-y-6">
          <InputField
            id="no-sertifikat-tanah"
            label="No Sertifikat Tanah"
            form={form}
            name="noSertifikatTanah"
          />
          <InputField
            id="sertifikat-surat"
            label="Sertifikat/Surat Tanah"
            form={form}
            name="sertifikatSurat"
          />
          <InputField id="pbb" label="PBB" form={form} name="pbb" />
          <InputField
            id="hasil-ukur"
            label="Hasil Ukur"
            form={form}
            name="hasilUkur"
          />
          <InputField
            id="lain-lain"
            label="Lain-lain"
            form={form}
            name="lainLain"
          />
        </div>
      </div>
    </div>
  );
};

export default DataLokasi;
