import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Home, MapPin } from "lucide-react";

interface DataBangunanCardProps {
  data: any;
  formatAlamat: (data: any, type: "pemohon" | "pemilik" | "bangunan") => string;
}

const DataBangunanCard = ({ data, formatAlamat }: DataBangunanCardProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Home className="h-5 w-5" />
          Data Bangunan dan Lahan
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Jenis Layanan</span>
              <span className="font-medium">{data.jenisLayanan.nama}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fungsi Bangunan</span>
              <span className="font-medium">{data.fungsiBangunan.nama}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Luas Tanah</span>
              <span className="font-medium">{data.luas_tanah_m2} m²</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">No. Sertifikat Tanah</span>
              <span className="font-medium">{data.no_sertifikat_tanah}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Alamat Bangunan</span>
              <span className="font-medium text-right max-w-[200px]">
                {formatAlamat(data, "bangunan")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Letak Jalan Utama</span>
              <span className="font-medium">{data.letak_jalan_utama}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Letak Jalan Sekunder</span>
              <span className="font-medium">{data.letak_jalan_sekunder}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Persimpangan Jalan</span>
              <span className="font-medium">{data.persimpangan_jalan}</span>
            </div>
          </div>
        </div>

        {/* Koordinat */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Koordinat Lokasi
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Latitude</span>
              <span className="font-medium">{data.latitude}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Longitude</span>
              <span className="font-medium">{data.longitude}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataBangunanCard;
