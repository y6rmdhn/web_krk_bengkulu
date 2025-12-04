import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Map as MapIcon } from "lucide-react";
import SearchableMap from "../SearchableMap";
// 1. Import data pola ruang yang sama
import dataPolaRuang from "../SearchableMap/pola_ruang.json";

interface LokasiBangunanCardProps {
  latitude?: string | number | null;
  longitude?: string | number | null;
}

// 2. Fungsi Helper: Ray Casting Algorithm (Mengecek apakah titik ada di dalam polygon)
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
}) => {
  const mapCoordinates: [number, number] = useMemo(() => {
    if (latitude && longitude) {
      const lat =
        typeof latitude === "string" ? parseFloat(latitude) : latitude;
      const lng =
        typeof longitude === "string" ? parseFloat(longitude) : longitude;

      if (!isNaN(lat) && !isNaN(lng)) {
        return [lat, lng];
      }
    }
    return [-3.792286, 102.26238];
  }, [latitude, longitude]);

  // 3. Logic untuk mencari Nama Zona berdasarkan koordinat
  const zonaInfo = useMemo(() => {
    const [lat, lng] = mapCoordinates;
    // Format GeoJSON biasanya [lng, lat], sedangkan Leaflet [lat, lng]
    // Jadi kita harus hati-hati saat compare.
    // Di helper isPointInPolygon kita asumsikan point = [lng, lat] sesuai standar GeoJSON
    const pointToCheck = [lng, lat];

    const features = (dataPolaRuang as any).features;

    for (const feature of features) {
      const geometry = feature.geometry;
      const props = feature.properties;
      let isInside = false;

      if (geometry.type === "Polygon") {
        // GeoJSON Polygon coordinates: [ [ [x,y], [x,y] ... ] ]
        // Kita ambil ring pertama (outer boundary)
        isInside = isPointInPolygon(pointToCheck, geometry.coordinates[0]);
      } else if (geometry.type === "MultiPolygon") {
        // GeoJSON MultiPolygon: [ [ [ [x,y]... ] ], [ [ [x,y]... ] ] ]
        for (const polygon of geometry.coordinates) {
          if (isPointInPolygon(pointToCheck, polygon[0])) {
            isInside = true;
            break;
          }
        }
      }

      if (isInside) {
        return {
          nama:
            props.NAMOBJ ||
            props.KETERANGAN ||
            props.REMARK ||
            "Zona Tanpa Nama",
          kode: props.KODZON || "-", // Optional jika ada kode zona
          warna: props.warna || "#ccc", // Optional jika mau pakai warna
        };
      }
    }

    return {
      nama: "Diluar Pola Ruang / Tidak Teridentifikasi",
      kode: "-",
      warna: "#gray",
    };
  }, [mapCoordinates]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Lokasi Bangunan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map Section */}
        <div className="rounded-md border overflow-hidden w-full h-[400px]">
          <SearchableMap
            initialPosition={mapCoordinates}
            readonly={true}
            zoneName={zonaInfo.nama}
          />
        </div>

        {/* Detail Text Section - Updated Grid */}
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
          {/* Tambahan: Nama Zona */}
          <div className="col-span-2 p-3 bg-blue-50 border border-blue-100 rounded flex items-start gap-3">
            <MapIcon className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <span className="block text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Zona Pola Ruang
              </span>
              <span className="text-base font-medium text-gray-900">
                {zonaInfo.nama}
              </span>
            </div>
          </div>

          <div className="p-2 bg-slate-50 rounded border">
            <span className="block text-xs text-gray-500">Latitude</span>
            <span className="font-mono">{latitude || "-"}</span>
          </div>
          <div className="p-2 bg-slate-50 rounded border">
            <span className="block text-xs text-gray-500">Longitude</span>
            <span className="font-mono">{longitude || "-"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
