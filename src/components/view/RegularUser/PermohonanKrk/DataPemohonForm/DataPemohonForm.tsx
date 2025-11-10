import SectionTitle from "../SectionTitle";
import InputField from "@/components/commons/InputField";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const DataPemohonForm = (props: PropTypes) => {
  const { form } = props;

  return (
    <div className="space-y-6">
      <SectionTitle title="Data Pemohon" />
      <InputField
        id="no-ktp-pemohon"
        label="No KTP"
        form={form}
        name="noKtpPemohon"
      />
      <InputField
        id="nama-pemohon"
        label="Nama"
        form={form}
        name="namaPemohon"
      />
      <InputField
        id="email-pemohon"
        label="Email"
        type="email"
        form={form}
        name="emailPemohon"
      />
      <InputField
        id="no-telp-pemohon"
        label="No Telp"
        type="tel"
        form={form}
        name="noTelpPemohon"
      />
      <InputField
        id="alamat-pemohon"
        label="Alamat"
        form={form}
        name="alamatPemohon"
      />
      <div className="grid grid-cols-3 gap-4">
        <InputField id="no-pemohon" label="No" form={form} name="noPemohon" />
        <InputField id="rt-pemohon" label="RT" form={form} name="rtPemohon" />
        <InputField id="rw-pemohon" label="RW" form={form} name="rwPemohon" />
      </div>
      <InputField
        id="provinsi-pemohon"
        label="Provinsi"
        form={form}
        name="provinsiPemohon"
      />
      <InputField
        id="kota-pemohon"
        label="Kota"
        form={form}
        name="kotaPemohon"
      />
      <InputField
        id="kecamatan-pemohon"
        label="Kecamatan"
        form={form}
        name="kecamatanPemohon"
      />
      <InputField
        id="kelurahan-pemohon"
        label="Kelurahan"
        form={form}
        name="kelurahanPemohon"
      />
      {/* Di aplikasi nyata, ini adalah komponen upload file */}
      <FormField
        control={form.control}
        name="pemohonPemilik"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Upload KTP</FormLabel>
            <FormControl>
              <Input type="file" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <InputField
        id="pemohon-pemilik"
        label="Pemohon adalah pemilik?"
        form={form}
        name="pemohonPemilik"
      />
    </div>
  );
};

export default DataPemohonForm;
