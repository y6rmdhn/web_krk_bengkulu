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
  const [isInitialized, setIsInitialized] = useState(false);

  const { districts, villages, isDistrictsLoading, isVillagesLoading } =
    useWilayahData(BENGKULU_PROVINCE_ID, BENGKULU_CITY_ID, activeKecamatanId);

  // Debug: Log data wilayah
  useEffect(() => {
    console.log("WilayahForm State:", {
      kecamatanNama,
      kelurahanNama,
      activeKecamatanId,
      districtsCount: districts.length,
      villagesCount: villages.length,
      villages: villages.map((v) => v.name),
    });
  }, [kecamatanNama, kelurahanNama, activeKecamatanId, districts, villages]);

  // LOGIK PENTING: Cari ID berdasarkan Nama yang ada di Form
  useEffect(() => {
    if (kecamatanNama && districts.length > 0) {
      console.log(
        "Mencari kecamatan:",
        kecamatanNama,
        "dari",
        districts.length,
        "kecamatan"
      );

      const selectedDist = districts.find(
        (d) => d.name.toLowerCase() === kecamatanNama.toLowerCase()
      );

      if (selectedDist) {
        console.log("Kecamatan ditemukan, ID:", selectedDist.id);
        setActiveKecamatanId(selectedDist.id);

        // Auto-select kelurahan jika ada dan belum di-set
        if (kelurahanNama && villages.length > 0 && !isInitialized) {
          const selectedVillage = villages.find(
            (v) => v.name.toLowerCase() === kelurahanNama.toLowerCase()
          );

          if (selectedVillage) {
            console.log("Kelurahan ditemukan:", selectedVillage.name);
            // Periksa apakah nilai sudah sesuai, jika tidak baru di-set
            const currentValue = form.getValues("kelurahan_lokasi");
            if (currentValue !== selectedVillage.name) {
              setTimeout(() => {
                form.setValue("kelurahan_lokasi", selectedVillage.name);
                setIsInitialized(true);
              }, 100);
            } else {
              setIsInitialized(true);
            }
          } else {
            console.warn("Kelurahan tidak ditemukan:", kelurahanNama);
            setIsInitialized(true);
          }
        } else if (!kelurahanNama) {
          setIsInitialized(true);
        }
      } else {
        console.warn("Kecamatan tidak ditemukan di list:", kecamatanNama);
      }
    }
  }, [kecamatanNama, districts, kelurahanNama, villages, form, isInitialized]);

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
                  console.log("Kecamatan dipilih:", value);
                  field.onChange(value); // Simpan NAMA
                  form.setValue("kelurahan_lokasi", ""); // Reset kelurahan
                  setActiveKecamatanId(""); // Reset ID kecamatan
                  setIsInitialized(false); // Reset init flag
                }}
                value={field.value || ""} // Value adalah NAMA
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isDistrictsLoading ? "Memuat..." : "Pilih Kecamatan"
                      }
                    />
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
                onValueChange={(value) => {
                  console.log("Kelurahan dipilih:", value);
                  field.onChange(value); // Simpan NAMA
                }}
                value={field.value || ""} // Value adalah NAMA
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !activeKecamatanId
                          ? "Pilih kecamatan terlebih dahulu"
                          : isVillagesLoading
                            ? "Memuat..."
                            : "Pilih Kelurahan/Desa"
                      }
                    />
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
              {!activeKecamatanId && kelurahanNama && (
                <p className="text-sm text-amber-600 mt-1">
                  Pilih kecamatan terlebih dahulu untuk melihat daftar kelurahan
                </p>
              )}
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
        {kecamatanNama && !kelurahanNama && (
          <p className="text-sm text-amber-600 mt-1">
            Untuk hasil pencarian yang lebih akurat, pilih kelurahan terlebih
            dahulu
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
