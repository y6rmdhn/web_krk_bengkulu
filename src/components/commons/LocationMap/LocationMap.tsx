import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Map as MapIcon, Info } from "lucide-react";

import SearchableMap from "../SearchableMap";
import dataPolaRuang from "../SearchableMap/pola_ruang.json";
import { getZoneColor } from "../SearchableMap/SearchableMap";

interface LokasiBangunanCardProps {
  latitude?: string | number | null;
  longitude?: string | number | null;
  userRole?: "pemohon" | "operator" | "surveyor" | "kadis";
}

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

  const zonaInfo = useMemo(() => {
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
        };
      }
    }

    return {
      nama: "Diluar Pola Ruang / Tidak Teridentifikasi",
      kode: "-",
      warna: "#94a3b8",
    };
  }, [mapCoordinates]);

  return (
    <Card
      className="shadow-sm border-t-4"
      style={{ borderTopColor: zonaInfo.warna }}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            Lokasi & Zonasi
          </div>
          {/* Badge Role */}
          <span
            className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide border ${
              userRole === "pemohon"
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-yellow-50 text-yellow-700 border-yellow-200"
            }`}
          >
            View: {userRole}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* MAP COMPONENT */}
        <div className="rounded-md border overflow-hidden w-full h-[400px] mb-4 relative group">
          <SearchableMap
            initialPosition={mapCoordinates}
            readonly={true}
            zoneName={zonaInfo.nama}
            role={userRole}
          />
        </div>

        {/* DETAIL INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* KOTAK STATUS ZONA (Warna Dinamis) */}
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

          {/* KOORDINAT */}
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
