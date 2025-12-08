import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import OperatorLayout from "@/components/layouts/OperatorLayout";
// Import hook yang sudah diperbaiki tadi
import useTrackingSearch from "./useTrackingSearch";

const TrackingSearch = () => {
  // Panggil Hook di sini
  const { nomor, setNomor, handleSearch } = useTrackingSearch();

  return (
    <OperatorLayout title="Lacak Permohonan">
      <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
        {/* Card Container */}
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
          {/* Icon / Illustration */}
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search size={32} />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Lacak Status KRK
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Silakan masukkan <strong>Nomor Registrasi</strong> yang Anda
            dapatkan saat mengajukan permohonan untuk melihat progres terkini.
          </p>

          {/* Form Pencarian */}
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                placeholder="Contoh: KRK-1763688110466"
                className="pl-12 h-14 text-lg border-gray-300 focus-visible:ring-blue-600 rounded-xl"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all"
              disabled={!nomor.trim()}
            >
              Cek Status Permohonan
            </Button>
          </form>

          <p className="mt-8 text-xs text-gray-400">
            Dinas Pekerjaan Umum dan Penataan Ruang Kota Bengkulu
          </p>
        </div>
      </div>
    </OperatorLayout>
  );
};

export default TrackingSearch;
