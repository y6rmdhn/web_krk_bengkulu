import SectionTitle from "../SectionTitle";
import type { UseFormReturn } from "react-hook-form";
import type { PermohonanFormValues } from "../usePermohohanKrk";
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

type PropTypes = {
  form: UseFormReturn<PermohonanFormValues>;
};

const BENGKULU_PROVINCE_ID = "17";
const BENGKULU_CITY_ID = "1771";

const WilayahForm = (props: PropTypes) => {
  const { form } = props;

  // 1. Ambil NAMA dari form (karena sekarang kita simpan nama)
  const kecamatanNama = form.watch("kecamatan_lokasi");
  const kelurahanNama = form.watch("kelurahan_lokasi");
  const currentLat = form.watch("latitude");
  const currentLng = form.watch("longitude");

  // 2. LOGIKA TAMBAHAN: Kita butuh ID untuk request API desa,
  // tapi form nyimpannya Nama. Jadi kita cari ID-nya dulu.
  // Note: districts diambil dari hook di bawah, jadi kita perlu trik sedikit
  // agar tidak circular dependency, kita panggil hook dulu.

  // Masalah: useWilayahData butuh kecamatanId untuk fetch villages.
  // Solusi: Kita tidak bisa cari ID kalau districts belum ada.
  // Jadi flow-nya:
  // Load Districts -> User pilih Nama -> Kita cari ID dari Nama -> Load Villages

  // State sementara untuk ID kecamatan agar hook villages jalan
  const [activeKecamatanId, setActiveKecamatanId] = useState("");

  const { districts, villages, isDistrictsLoading, isVillagesLoading } =
    useWilayahData(BENGKULU_PROVINCE_ID, BENGKULU_CITY_ID, activeKecamatanId);

  // Effect: Setiap kali nama kecamatan di form berubah, cari ID-nya
  useEffect(() => {
    if (kecamatanNama && districts.length > 0) {
      const selectedDist = districts.find((d) => d.name === kecamatanNama);
      if (selectedDist) {
        setActiveKecamatanId(selectedDist.id);
      }
    } else if (!kecamatanNama) {
      setActiveKecamatanId("");
    }
  }, [kecamatanNama, districts]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Update query peta berdasarkan NAMA
  useEffect(() => {
    if (kecamatanNama && kelurahanNama) {
      const query = `${kelurahanNama}, ${kecamatanNama}, Kota Bengkulu`;
      setSearchQuery(query);
    } else if (kecamatanNama) {
      const query = `${kecamatanNama}, Kota Bengkulu`;
      setSearchQuery(query);
    }
  }, [kecamatanNama, kelurahanNama]);

  const handleCoordinateSelect = (lat: number, lng: number) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* FIELD KECAMATAN */}
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
                  form.setValue("kelurahan_lokasi", ""); // Reset kelurahan
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kecamatan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {districts?.map((district) => (
                    // PERUBAHAN DISINI: value={district.name}
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

        {/* FIELD KELURAHAN */}
        <FormField
          control={form.control}
          name="kelurahan_lokasi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelurahan/Desa</FormLabel>
              {/* Disable jika activeKecamatanId kosong (artinya nama kecamatan belum valid/dipilih) */}
              <Select
                disabled={!activeKecamatanId || isVillagesLoading}
                onValueChange={field.onChange} // Simpan NAMA
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kelurahan/Desa" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[200px]">
                  {villages?.map((village) => (
                    // PERUBAHAN DISINI: value={village.name}
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
          placeholder="Latitude akan terisi otomatis"
        />
        <FormInput
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
