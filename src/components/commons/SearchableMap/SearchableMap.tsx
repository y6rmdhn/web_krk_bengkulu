import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Types
interface SearchResult {
  name: string;
  position: [number, number];
}

interface SearchableMapProps {
  onCoordinateSelect?: (lat: number, lng: number, address: string) => void;
  initialPosition?: [number, number];
}

interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
}

// ChangeView component
function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const SearchableMap: React.FC<SearchableMapProps> = ({
  onCoordinateSelect,
  initialPosition = [-6.2088, 106.8456] as [number, number],
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchLocation = async (): Promise<void> => {
    if (!searchText.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=1`
      );
      const data: NominatimResult[] = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const newPosition: [number, number] = [
          parseFloat(result.lat),
          parseFloat(result.lon),
        ];

        setPosition(newPosition);
        const resultData: SearchResult = {
          name: result.display_name,
          position: newPosition,
        };
        setSearchResult(resultData);

        // Call callback function with coordinates
        if (onCoordinateSelect) {
          onCoordinateSelect(
            newPosition[0],
            newPosition[1],
            result.display_name
          );
        }
      } else {
        alert("Lokasi tidak ditemukan");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      alert("Terjadi kesalahan saat mencari lokasi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapClick = (e: L.LeafletMouseEvent): void => {
    const { lat, lng } = e.latlng;
    const newPosition: [number, number] = [lat, lng];

    setPosition(newPosition);
    setSearchResult({
      name: `Lokasi yang dipilih: ${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      position: newPosition,
    });

    // Call callback function with coordinates
    if (onCoordinateSelect) {
      onCoordinateSelect(
        lat,
        lng,
        `Lokasi yang dipilih: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Cari lokasi..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && searchLocation()}
        />
        <button
          onClick={searchLocation}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Mencari..." : "Cari"}
        </button>
      </div>

      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        onClick={handleMapClick}
      >
        <ChangeView center={position} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {searchResult && (
          <Marker position={searchResult.position}>
            <Popup>
              <div>
                <strong>{searchResult.name}</strong>
                <br />
                <span>Lat: {searchResult.position[0].toFixed(6)}</span>
                <br />
                <span>Lng: {searchResult.position[1].toFixed(6)}</span>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {searchResult && (
        <div className="p-3 bg-gray-50 rounded-md">
          <h4 className="font-semibold mb-2">Lokasi Terpilih:</h4>
          <p className="text-sm mb-1">{searchResult.name}</p>
          <p className="text-sm text-gray-600">
            Koordinat: {searchResult.position[0].toFixed(6)},{" "}
            {searchResult.position[1].toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchableMap;
