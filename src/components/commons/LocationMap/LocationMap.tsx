import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Map as MapIcon, Info, Edit3 } from "lucide-react"; // Tambah icon Edit3

import SearchableMap from "../SearchableMap";
import dataPolaRuang from "../SearchableMap/pola_ruang.json";
import { getZoneColor } from "../SearchableMap/SearchableMap";

interface LokasiBangunanCardProps {
  latitude?: string | number | null;
  longitude?: string | number | null;
  userRole?: "pemohon" | "operator" | "surveyor" | "kadis";

  // --- PROPS BARU ---
  isDraggable?: boolean; // Mengizinkan marker digeser
  showAnalysisLayer?: boolean; // Menampilkan/Sembunyikan info zona
  onLocationChange?: (lat: number, lng: number) => void; // Callback jika lokasi digeser
}

// ... (fungsi isPointInPolygon tetap sama) ...
const isPointInPolygon = (point: number[], vs: number[][]) => {
  const x = point[0],
    y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0],
      yi = vs[i][1];
    const xj = vs[j][0],
      yj = vs[j][1];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

const LocationMap: React.FC<LokasiBangunanCardProps> = ({
  latitude,
  longitude,
  userRole = "pemohon",
  isDraggable = false, // Default: Marker diam
  showAnalysisLayer = true, // Default: Tampilkan analisis (warna-warni)
  onLocationChange,
}) => {
  const mapCoordinates: [number, number] = useMemo(() => {
    if (latitude && longitude) {
      const lat =
        typeof latitude === "string" ? parseFloat(latitude) : latitude;
      const lng =
        typeof longitude === "string" ? parseFloat(longitude) : longitude;
      if (!isNaN(lat) && !isNaN(lng)) return [lat, lng];
    }
    return [-3.792286, 102.26238];
  }, [latitude, longitude]);

  // --- MODIFIKASI LOGIKA ZONA ---
  const zonaInfo = useMemo(() => {
    // KONDISI 1: Jika layer analisis dimatikan (saat survei fisik)
    // Kita return warna netral (abu-abu) dan teks placeholder
    if (!showAnalysisLayer) {
      return {
        nama: "Menunggu Analisis Teknis",
        kode: "-",
        warna: "#94a3b8", // Slate-500 (Warna Netral)
        isHidden: true, // Flag helper
      };
    }

    // KONDISI 2: Normal (Hitung point in polygon)
    const [lat, lng] = mapCoordinates;
    const pointToCheck = [lng, lat];
    const features = (dataPolaRuang as any).features;

    for (const feature of features) {
      const geometry = feature.geometry;
      const props = feature.properties;
      let isInside = false;

      if (geometry.type === "Polygon") {
        isInside = isPointInPolygon(pointToCheck, geometry.coordinates[0]);
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (isPointInPolygon(pointToCheck, polygon[0])) {
            isInside = true;
            break;
          }
        }
      }

      if (isInside) {
        const namaZona =
          props.NAMOBJ || props.KETERANGAN || props.REMARK || "Zona Tanpa Nama";
        return {
          nama: namaZona,
          kode: props.KODZON || "-",
          warna: getZoneColor(namaZona),
          isHidden: false,
        };
      }
    }

    return {
      nama: "Diluar Pola Ruang / Tidak Teridentifikasi",
      kode: "-",
      warna: "#94a3b8",
      isHidden: false,
    };
  }, [mapCoordinates, showAnalysisLayer]); // Tambahkan dependency showAnalysisLayer

  return (
    <Card
      className="shadow-sm border-t-4 transition-all duration-300"
      style={{ borderTopColor: zonaInfo.warna }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            Lokasi & Zonasi
          </div>

          {/* Badge Indikator Mode */}
          {isDraggable ? (
            <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> Mode Edit Lokasi
            </span>
          ) : (
            <span
              className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide border ${
                userRole === "pemohon"
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
              }`}
            >
              View: {userRole}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* MAP COMPONENT */}
        <div
          className={`rounded-md border overflow-hidden w-full h-[400px] mb-4 relative group ${isDraggable ? "ring-2 ring-orange-400 ring-offset-2" : ""}`}
        >
          <SearchableMap
            initialPosition={mapCoordinates}
            // 1. Logika Readonly (Bisa digeser atau tidak)
            // Kalau isDraggable TRUE (saat survei), maka readonly FALSE (bisa edit)
            readonly={!isDraggable}
            // 2. Logika Nama Zona (Text Popup)
            // Kalau layer di-hide, jangan kirim nama zona (biar popup gak bocor info)
            zoneName={showAnalysisLayer ? zonaInfo.nama : undefined}
            role={userRole}
            // 3. [BARU] Logika Layer Visual (Warna-warni Peta)
            // Ini prop baru yang kita buat tadi. Kalau false, layer merah/kuning hilang.
            showLayerRTRW={showAnalysisLayer}
            // 4. [PENTING] Menangkap perubahan saat Marker digeser
            // Di SearchableMap nama prop-nya 'onCoordinateSelect'.
            // Kita sambungkan ke prop 'onLocationChange' milik LocationMap.
            onCoordinateSelect={(lat, lng) => {
              if (onLocationChange) {
                onLocationChange(lat, lng);
              }
              // Opsional: Bisa console.log dulu buat cek
              console.log("Lokasi baru digeser ke:", lat, lng);
            }}
          />

          {/* Overlay Instruksi saat Draggable */}
          {isDraggable && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow text-xs font-semibold text-orange-700 z-[400] pointer-events-none">
              Geser Pin ke Lokasi Sebenarnya
            </div>
          )}
        </div>

        {/* DETAIL INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* KOTAK STATUS ZONA (Warna Dinamis) */}
          {/* Jika sedang mode survei (analisis hidden), tampilkan pesan beda */}
          {zonaInfo.isHidden ? (
            <div className="md:col-span-2 p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-center gap-2">
              <Info className="w-5 h-5 text-gray-400" />
              <p className="text-sm text-gray-500 font-medium">
                Informasi Pola Ruang Disembunyikan
              </p>
              <p className="text-xs text-gray-400">
                Selesaikan survei fisik lapangan terlebih dahulu untuk membuka
                analisis spasial.
              </p>
            </div>
          ) : (
            <div
              className="md:col-span-2 p-4 rounded-lg border flex items-start gap-4 transition-colors"
              style={{
                backgroundColor: `${zonaInfo.warna}15`,
                borderColor: `${zonaInfo.warna}40`,
              }}
            >
              <div
                className="p-2 rounded-full bg-white shadow-sm"
                style={{ color: zonaInfo.warna }}
              >
                <MapIcon className="w-6 h-6" />
              </div>
              <div>
                <span
                  className="block text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: zonaInfo.warna }}
                >
                  Zona Pola Ruang (RTRW)
                </span>
                <p className="text-lg font-bold text-gray-800 leading-tight">
                  {zonaInfo.nama}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Kode Zona:{" "}
                  <span className="font-mono bg-white px-1 rounded border">
                    {zonaInfo.kode}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* KOORDINAT (Selalu Muncul) */}
          <div className="p-3 bg-gray-50 rounded border border-gray-200">
            <span className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
              <Info className="w-3 h-3" /> Latitude
            </span>
            <span className="font-mono text-sm font-semibold text-gray-700">
              {latitude || "-"}
            </span>
          </div>

          <div className="p-3 bg-gray-50 rounded border border-gray-200">
            <span className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
              <Info className="w-3 h-3" /> Longitude
            </span>
            <span className="font-mono text-sm font-semibold text-gray-700">
              {longitude || "-"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
