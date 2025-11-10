import SectionTitle from "../SectionTitle";
import InputField from "@/components/commons/InputField";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const WilayahForm = (props: PropTypes) => {
  const { form } = props;

  return (
    <div className="space-y-6">
      <SectionTitle title="Pilih Wilayah" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InputField id="layanan" label="Layanan" form={form} name="layanan" />
        <InputField
          id="kecamatan-wilayah"
          label="Kecamatan"
          form={form}
          name="kecamatanWilayah"
        />
        <InputField
          id="kelurahan-wilayah"
          label="Kelurahan"
          form={form}
          name="kelurahanWilayah"
        />
      </div>

      <div className="pt-6">
        <SectionTitle title="Pilih Lokasi Persil Peta" />
      </div>
      <Input id="search-maps" placeholder="Search Google Maps" />
      {/* Placeholder untuk Peta Google */}
      <div className="w-full h-80 rounded-md border-2 border-dashed bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Google Maps Component Placeholder</p>
      </div>
      <InputField
        id="koordinat"
        label="Koordinat"
        form={form}
        name="koordinat"
      />
    </div>
  );
};

export default WilayahForm;
