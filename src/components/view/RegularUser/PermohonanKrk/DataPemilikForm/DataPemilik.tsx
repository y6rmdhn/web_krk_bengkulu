import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import SectionTitle from "../SectionTitle";
import InputField from "@/components/commons/InputField";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const DataPemilik = (props: PropTypes) => {
  const { form } = props;

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Pemilik Sesuai Sertifikat" />
      <InputField
        id="no-ktp-pemilik"
        label="No KTP"
        form={form}
        name="noKtpPemilik"
      />
      <InputField
        id="nama-pemilik"
        label="Nama"
        form={form}
        name="namaPemilik"
      />
      <InputField
        id="email-pemilik"
        label="Email"
        type="email"
        form={form}
        name="emailPemilik"
      />
      <InputField
        id="no-telp-pemilik"
        label="No Telp"
        type="tel"
        form={form}
        name="noTelpPemilik"
      />
      <InputField
        id="alamat-pemilik"
        label="Alamat"
        form={form}
        name="alamatPemilik"
      />
      <div className="grid grid-cols-3 gap-4">
        <InputField id="no-pemilik" label="No" form={form} name="noPemilik" />
        <InputField id="rt-pemilik" label="RT" form={form} name="rtPemilik" />
        <InputField id="rw-pemilik" label="RW" form={form} name="rwPemilik" />
      </div>
      <InputField
        id="provinsi-pemilik"
        label="Provinsi"
        form={form}
        name="provinsiPemilik"
      />
      <InputField
        id="kota-pemilik"
        label="Kota"
        form={form}
        name="kotaPemilik"
      />
      <InputField
        id="kecamatan-pemilik"
        label="Kecamatan"
        form={form}
        name="kecamatanPemilik"
      />
      <InputField
        id="kelurahan-pemilik"
        label="Kelurahan"
        form={form}
        name="kelurahanPemilik"
      />
    </div>
  );
};

export default DataPemilik;
