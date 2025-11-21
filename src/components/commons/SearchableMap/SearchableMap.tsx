import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import dataPolaRuang from "./pola_ruang.json";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- TYPES ---
interface SearchResult {
  name: string;
  position: [number, number];
}

interface SearchableMapProps {
  onCoordinateSelect?: (lat: number, lng: number, address: string) => void;
  initialPosition?: [number, number];
  initialSearchQuery?: string;
}

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

// --- SUB-COMPONENTS ---

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

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// --- MAIN COMPONENT ---

const SearchableMap: React.FC<SearchableMapProps> = ({
  onCoordinateSelect,
  initialPosition = [-3.792286, 102.26238],
  initialSearchQuery = "",
}) => {
  // State Map & Marker
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);

  // State Pencarian
  const [searchText, setSearchText] = useState<string>(initialSearchQuery);
  const [searchResultsList, setSearchResultsList] = useState<NominatimResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const geoJsonStyle = (feature: any) => {
    return {
      fillColor: feature.properties?.warna || "#FF9800",
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.4,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const infoNama =
        feature.properties.NAMOBJ ||
        feature.properties.KETERANGAN ||
        feature.properties.REMARK ||
        "Zona Tanpa Nama";

      layer.bindPopup(`
        <div class="text-sm">
          <strong>Zona:</strong> ${infoNama}<br/>
          ${feature.properties.LUAS ? `Luas: ${feature.properties.LUAS} Ha` : ""}
        </div>
      `);

      layer.on({
        mouseover: (e: any) => {
          const layer = e.target;
          layer.setStyle({ fillOpacity: 0.7, weight: 3 });
        },
        mouseout: (e: any) => {
          const layer = e.target;
          layer.setStyle({ fillOpacity: 0.4, weight: 1 });
        },
        click: (e: any) => {
          handleMapClick(e.latlng.lat, e.latlng.lng);
        },
      });
    }
  };

  // Effect: Auto search
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchText(initialSearchQuery);
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initialSearchQuery]);

  // Effect: Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    setIsLoading(true);
    setShowDropdown(false);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=5`
      );
      const data: NominatimResult[] = await response.json();
      if (data && data.length > 0) {
        setSearchResultsList(data);
        setShowDropdown(true);
      } else {
        alert("Lokasi tidak ditemukan.");
        setSearchResultsList([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (item: NominatimResult) => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    const newPosition: [number, number] = [lat, lng];
    setPosition(newPosition);
    setSearchResult({ name: item.display_name, position: newPosition });
    setSearchText(item.display_name.split(",")[0]);
    setShowDropdown(false);
    setSearchResultsList([]);
    if (onCoordinateSelect) onCoordinateSelect(lat, lng, item.display_name);
  };

  const handleMapClick = (lat: number, lng: number) => {
    const newPosition: [number, number] = [lat, lng];
    setPosition(newPosition);
    const label = `Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    setSearchResult({ name: label, position: newPosition });
    setShowDropdown(false);
    if (onCoordinateSelect) onCoordinateSelect(lat, lng, label);
  };

  return (
    <div className="space-y-4 z-0">
      <div className="flex gap-2 mb-2 relative" ref={dropdownRef}>
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() =>
              searchResultsList.length > 0 && setShowDropdown(true)
            }
            placeholder="Cari lokasi..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {showDropdown && searchResultsList.length > 0 && (
            <div className="absolute z-[1000] w-full bg-white border shadow-lg max-h-60 overflow-y-auto mt-1">
              {searchResultsList.map((item) => (
                <div
                  key={item.place_id}
                  onClick={() => handleSelectLocation(item)}
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b text-sm"
                >
                  <p className="font-semibold">
                    {item.display_name.split(",")[0]}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {item.display_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
        >
          {isLoading ? "..." : "Cari"}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-xs text-blue-700">
        <p>
          💡 <strong>Tips:</strong> Peta berwarna menunjukkan Pola Ruang Kota
          Bengkulu.
        </p>
      </div>

      <div className="relative rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "400px", width: "100%", zIndex: 10 }}
          scrollWheelZoom={true}
        >
          <ChangeView center={position} zoom={15} />
          <MapClickHandler onMapClick={handleMapClick} />

          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <GeoJSON
            key="pola-ruang-layer"
            data={dataPolaRuang as any}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />

          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <strong className="block mb-1">Lokasi Terpilih</strong>
                {searchResult ? searchResult.name : "Titik Awal"} <br />
                <span className="text-xs text-gray-500">
                  {position[0].toFixed(5)}, {position[1].toFixed(5)}
                </span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {searchResult && (
        <div className="p-3 bg-gray-50 border rounded-md">
          <p className="text-xs font-bold text-gray-500">Koordinat Terpilih</p>
          <p className="font-mono text-sm">
            {searchResult.position[0].toFixed(6)},{" "}
            {searchResult.position[1].toFixed(6)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchableMap;
