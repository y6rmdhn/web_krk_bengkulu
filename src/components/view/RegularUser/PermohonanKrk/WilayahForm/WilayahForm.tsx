import SectionTitle from "../SectionTitle";
import InputField from "@/components/commons/InputField";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import SearchableMap from "@/components/commons/SearchableMap";
import { SelectFilter } from "@/components/commons/SelectForm/SelectForm";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const zonaKrkOptions = [
  { label: "Zona Permukiman", value: "permukiman" },
  { label: "Zona Perdagangan & Jasa", value: "perdagangan_jasa" },
  { label: "Zona Industri", value: "industri" },
  { label: "Zona Ruang Terbuka Hijau", value: "rth" },
  { label: "Zona Transportasi", value: "transportasi" },
];

const WilayahForm = (props: PropTypes) => {
  const { form } = props;

  const currentKoordinat = form.watch("koordinat");

  const handleCoordinateSelect = (
    lat: number,
    lng: number,
    address: string
  ) => {
    const coordinateString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    form.setValue("koordinat", coordinateString);
  };

  const getInitialPosition = (): [number, number] => {
    if (currentKoordinat) {
      const [lat, lng] = currentKoordinat
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
    }
    return [-6.2088, 106.8456];
  };

  return (
    <div className="space-y-6">
      <SectionTitle title="Pilih Wilayah" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectFilter
          form={form}
          name="layanan"
          label="Layanan"
          options={zonaKrkOptions}
        />
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

      {/* Searchable Map Component */}
      <div className="w-full rounded-md border-2 border-dashed bg-gray-100 p-4">
        <SearchableMap
          onCoordinateSelect={handleCoordinateSelect}
          initialPosition={getInitialPosition()}
        />
      </div>

      <InputField
        id="koordinat"
        label="Koordinat"
        form={form}
        name="koordinat"
        placeholder="Koordinat akan terisi otomatis ketika memilih lokasi di peta"
      />
    </div>
  );
};

export default WilayahForm;
