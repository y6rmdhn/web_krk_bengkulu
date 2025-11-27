import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import SearchableMap from "../SearchableMap";

interface LokasiBangunanCardProps {
  latitude?: string | number | null;
  longitude?: string | number | null;
}

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
          <SearchableMap initialPosition={mapCoordinates} readonly={true} />
        </div>

        {/* Detail Text Section */}
        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
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
