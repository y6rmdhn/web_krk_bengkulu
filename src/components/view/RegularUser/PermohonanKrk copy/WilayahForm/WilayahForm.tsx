import SectionTitle from "../SectionTitle";
import InputField from "@/components/commons/InputField";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
import SearchableMap from "@/components/commons/SearchableMap";
import { useWilayahData } from "@/hooks/useWilayah";
import { useEffect, useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useWilayahForm from "./useWilayahForm";
import FormFieldSelect from "@/components/commons/FormFieldSelect";

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

// ID untuk Bengkulu
const BENGKULU_PROVINCE_ID = "17";
const BENGKULU_CITY_ID = "1771";

const WilayahForm = (props: PropTypes) => {
  const { form } = props;
  const { dataJenisLayanan, isLoadingDataLayanan } = useWilayahForm();

  const currentLat = form.watch("latitude");
  const currentLng = form.watch("longitude");

  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("");
  const [selectedKelurahan, setSelectedKelurahan] = useState<string>("");

  const { districts, villages, isDistrictsLoading, isVillagesLoading } =
    useWilayahData(BENGKULU_PROVINCE_ID, BENGKULU_CITY_ID, selectedKecamatan);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleKecamatanChange = (value: string) => {
    setSelectedKecamatan(value);
    setSelectedKelurahan("");
  };

  useEffect(() => {
    if (selectedKecamatan && selectedKelurahan) {
      const kecamatan = districts.find((d) => d.id === selectedKecamatan);
      const kelurahan = villages.find((v) => v.id === selectedKelurahan);

      if (kecamatan && kelurahan) {
        const query = `${kelurahan.name}, ${kecamatan.name}, Kota Bengkulu`;
        setSearchQuery(query);
      }
    } else if (selectedKecamatan) {
      const kecamatan = districts.find((d) => d.id === selectedKecamatan);
      if (kecamatan) {
        const query = `${kecamatan.name}, Kota Bengkulu`;
        setSearchQuery(query);
      }
    }
  }, [selectedKecamatan, selectedKelurahan, districts, villages]);

  const handleCoordinateSelect = (
    lat: number,
    lng: number,
    address: string
  ) => {
    const latString = lat.toFixed(6);
    const lngString = lng.toFixed(6);

    if (form.getValues("latitude") !== latString) {
      form.setValue("latitude", latString);
    }
    if (form.getValues("longitude") !== lngString) {
      form.setValue("longitude", lngString);
    }
  };

  const initialMapPosition = useMemo((): [number, number] => {
    if (currentLat && currentLng) {
      const lat = parseFloat(currentLat);
      const lng = parseFloat(currentLng);

      if (!isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
    }
    return [-3.792286, 102.26238];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <SectionTitle title="Pilih Wilayah" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        <FormFieldSelect
          form={form}
          name="jenis_layanan_id"
          label="Layanan"
          placeholder={isLoadingDataLayanan ? "Memuat..." : "--Pilih Layanan--"}
          options={
            dataJenisLayanan?.map((item: { nama: string; id: string }) => ({
              label: item.nama,
              value: item.id,
            })) || []
          }
        />

        <div className="flex gap-5 items-center justify-between">
          <Label>Kecamatan</Label>
          <Select
            onValueChange={handleKecamatanChange}
            value={selectedKecamatan}
            disabled={isDistrictsLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kecamatan" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {districts?.map((district) => (
                <SelectItem key={district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-5 items-center justify-between">
          <Label>Kelurahan/Desa</Label>
          <Select
            onValueChange={setSelectedKelurahan}
            value={selectedKelurahan}
            disabled={!selectedKecamatan || isVillagesLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kelurahan/Desa" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {villages?.map((village) => (
                <SelectItem key={village.id} value={village.id}>
                  {village.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
        <InputField
          id="latitude"
          label="Latitude"
          form={form}
          name="latitude"
          placeholder="Latitude akan terisi otomatis"
        />
        <InputField
          id="longitude"
          label="Longitude"
          form={form}
          name="longitude"
          placeholder="Longitude akan terisi otomatis"
        />
      </div>
    </div>
  );
};

export default WilayahForm;
