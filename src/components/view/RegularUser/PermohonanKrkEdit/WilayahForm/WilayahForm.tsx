import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import SearchableMap from "@/components/commons/SearchableMap";
import { useWilayahData } from "@/hooks/useWilayah";
import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/commons/FormInput";
import type { PermohonanEditFormValues } from "../usePermohohanKrkEdit";

type PropTypes = {
  form: UseFormReturn<PermohonanEditFormValues>;
};

const BENGKULU_PROVINCE_ID = "17";
const BENGKULU_CITY_ID = "1771";

const WilayahForm = (props: PropTypes) => {
  const { form } = props;

  // 1. Ambil NAMA dari form (Karena API mengirim "GADING CEMPAKA")
  const kecamatanNama = form.watch("kecamatan_lokasi");
  const kelurahanNama = form.watch("kelurahan_lokasi");
  const currentLat = form.watch("latitude");
  const currentLng = form.watch("longitude");

  // State untuk ID agar hook villages bisa jalan
  const [activeKecamatanId, setActiveKecamatanId] = useState("");

  const { districts, villages, isDistrictsLoading, isVillagesLoading } =
    useWilayahData(BENGKULU_PROVINCE_ID, BENGKULU_CITY_ID, activeKecamatanId);

  // LOGIK PENTING: Cari ID berdasarkan Nama yang ada di Form
  useEffect(() => {
    if (kecamatanNama && districts.length > 0) {
      const selectedDist = districts.find((d) => d.name === kecamatanNama);
      if (selectedDist) {
        setActiveKecamatanId(selectedDist.id);
      }
    }
  }, [kecamatanNama, districts]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (kecamatanNama && kelurahanNama) {
      setSearchQuery(`${kelurahanNama}, ${kecamatanNama}, Kota Bengkulu`);
    } else if (kecamatanNama) {
      setSearchQuery(`${kecamatanNama}, Kota Bengkulu`);
    }
  }, [kecamatanNama, kelurahanNama]);

  const handleCoordinateSelect = (lat: number, lng: number) => {
    form.setValue("latitude", lat.toFixed(6));
    form.setValue("longitude", lng.toFixed(6));
  };

  const initialMapPosition = useMemo((): [number, number] => {
    if (currentLat && currentLng) {
      const lat = parseFloat(currentLat);
      const lng = parseFloat(currentLng);
      return [lat, lng];
    }
    return [-3.792286, 102.26238];
  }, [currentLat, currentLng]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* KECAMATAN */}
        <FormField
          control={form.control}
          name="kecamatan_lokasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan</FormLabel>
              <Select
                disabled={isDistrictsLoading}
                onValueChange={(value) => {
                  field.onChange(value); // Simpan NAMA
                  form.setValue("kelurahan_lokasi", ""); // Reset child
                }}
                value={field.value} // Value adalah NAMA
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts?.map((district) => (
                    // KEY=ID, VALUE=NAME (Agar sesuai dengan form value)
                    <SelectItem key={district.id} value={district.name}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* KELURAHAN */}
        <FormField
          control={form.control}
          name="kelurahan_lokasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelurahan/Desa</FormLabel>
              <Select
                disabled={!activeKecamatanId || isVillagesLoading}
                onValueChange={field.onChange} // Simpan NAMA
                value={field.value} // Value adalah NAMA
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kelurahan/Desa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {villages?.map((village) => (
                    <SelectItem key={village.id} value={village.name}>
                      {village.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="pt-6">
        <SectionTitle title="Pilih Lokasi Persil Peta" />
        {searchQuery && (
          <p className="text-sm text-gray-600 mt-2">
            Peta akan menampilkan lokasi: <strong>{searchQuery}</strong>
          </p>
        )}
      </div>

      <div className="w-full rounded-md border-2 border-dashed bg-gray-100 p-4">
        <SearchableMap
          onCoordinateSelect={handleCoordinateSelect}
          initialPosition={initialMapPosition}
          initialSearchQuery={searchQuery}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Latitude"
          form={form}
          name="latitude"
          placeholder="Latitude"
        />
        <FormInput
          label="Longitude"
          form={form}
          name="longitude"
          placeholder="Longitude"
        />
      </div>
    </div>
  );
};
export default WilayahForm;
