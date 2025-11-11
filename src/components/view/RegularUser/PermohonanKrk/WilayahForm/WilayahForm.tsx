import SectionTitle from "../SectionTitle";
import InputField from "@/components/commons/InputField";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import SearchableMap from "@/components/commons/SearchableMap";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const WilayahForm = (props: PropTypes) => {
  const { form } = props;

  // Get current coordinate values from form
  const currentKoordinat = form.watch("koordinat");

  // Handle when coordinate is selected from map
  const handleCoordinateSelect = (
    lat: number,
    lng: number,
    address: string
  ) => {
    // Format: "lat, lng"
    const coordinateString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    // Update the coordinate field
    form.setValue("koordinat", coordinateString);

    // You can also update other fields if needed
    // For example, if you have separate lat/lng fields:
    // form.setValue("latitude", lat.toString());
    // form.setValue("longitude", lng.toString());
  };

  // Optional: Parse existing coordinate and set initial map position
  const getInitialPosition = (): [number, number] => {
    if (currentKoordinat) {
      const [lat, lng] = currentKoordinat
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
    }
    return [-6.2088, 106.8456]; // Default Jakarta position
  };

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
