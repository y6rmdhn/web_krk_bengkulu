import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
  GeoJSON,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import dataPolaRuang from "./pola_ruang.json";

// --- FIX ICON LEAFLET ---
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// --- HELPER: WARNA ZONA ---
export const getZoneColor = (zoneName: string): string => {
  if (!zoneName) return "#808080";
  const name = zoneName.toLowerCase();

  // 1. KUNING = PERUMAHAN / PEMUKIMAN
  if (name.includes("perumahan") || name.includes("pemukiman"))
    return "#FEEA3B";

  // 2. MERAH = JASA / PERDAGANGAN
  if (
    name.includes("jasa") ||
    name.includes("perdagangan") ||
    name.includes("komersial") ||
    name.includes("usaha")
  )
    return "#FF0000";

  // 3. HIJAU TUA = RTH / HUTAN / KONSERVASI
  if (
    name.includes("rth") ||
    name.includes("taman") ||
    name.includes("hijau") ||
    name.includes("hutan") ||
    name.includes("konservasi") ||
    name.includes("sempadan")
  )
    return "#4CAF50";

  // 4. HIJAU MUDA = PERTANIAN / PANGAN
  if (
    name.includes("pertanian") ||
    name.includes("pangan") ||
    name.includes("perkebunan")
  )
    return "#8BC34A";

  // 5. UNGU = INDUSTRI / PERGUDANGAN
  if (name.includes("industri") || name.includes("gudang")) return "#9C27B0";

  // 6. COKLAT/ABU = PEMERINTAHAN / PERKANTORAN
  if (name.includes("pemerintah") || name.includes("perkantoran"))
    return "#795548";

  // 7. BIRU/CYAN = PENDIDIKAN / KESEHATAN / SOSIAL / PERIKANAN / AIR
  if (name.includes("pendidikan") || name.includes("sekolah")) return "#2196F3";
  if (name.includes("kesehatan") || name.includes("rumah sakit"))
    return "#00BCD4";
  if (name.includes("sosial")) return "#03A9F4";
  if (name.includes("perikanan") || name.includes("air")) return "#0288D1";

  // 8. LAINNYA
  if (name.includes("olahraga")) return "#CDDC39"; // Lime
  if (name.includes("ibadah") || name.includes("agama")) return "#673AB7"; // Deep Purple
  if (name.includes("transportasi") || name.includes("terminal"))
    return "#FF5722"; // Deep Orange
  if (name.includes("pertahanan") || name.includes("militer")) return "#607D8B"; // Blue Grey
  if (name.includes("pariwisata") || name.includes("wisata")) return "#E91E63"; // Pink
  if (name.includes("cagar budaya")) return "#795548"; // Brown

  return "#9E9E9E"; // Default
};

// --- HELPER: FORMAT HTML PERATURAN ---
// Fungsi bantu untuk membuat template HTML standar
const createRegulationTemplate = (
  allow: string[],
  conditional: string[],
  forbidden: string[],
  disaster: string[] = []
) => {
  const listToHtml = (items: string[]) =>
    items.length > 0
      ? `<ul class="list-disc pl-4 space-y-1">${items
          .map((i) => `<li>${i}</li>`)
          .join("")}</ul>`
      : `<span class="italic text-gray-400">- Tidak disebutkan -</span>`;

  let disasterHtml = "";
  if (disaster.length > 0) {
    disasterHtml = `
      <div class="bg-blue-50 p-2 rounded border border-blue-100 mt-2">
        <strong class="text-blue-700 block mb-1 text-xs uppercase tracking-wide">ℹ️ Ketentuan Rawan Bencana</strong>
        ${listToHtml(disaster)}
      </div>`;
  } else {
    // Default disaster text if mostly same
    disasterHtml = `
      <div class="bg-blue-50 p-2 rounded border border-blue-100 mt-2">
        <strong class="text-blue-700 block mb-1 text-xs uppercase tracking-wide">ℹ️ Ketentuan Rawan Bencana</strong>
        <ul class="list-disc pl-4 space-y-1">
          <li>Penyediaan RTH.</li>
          <li>Jalur evakuasi & sistem peringatan dini.</li>
          <li>Kegiatan mengacu peraturan kebencanaan.</li>
        </ul>
      </div>`;
  }

  return `
    <div class="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-700 max-h-60 overflow-y-auto custom-scrollbar leading-relaxed">
      <div class="mb-3">
        <strong class="text-green-700 block mb-1 text-xs uppercase tracking-wide border-b border-green-100 pb-1">✅ Diperbolehkan (I)</strong>
        ${listToHtml(allow)}
      </div>
      <div class="mb-3">
        <strong class="text-yellow-600 block mb-1 text-xs uppercase tracking-wide border-b border-yellow-100 pb-1">⚠️ Bersyarat (T/B)</strong>
        ${listToHtml(conditional)}
      </div>
      <div class="mb-3">
        <strong class="text-red-600 block mb-1 text-xs uppercase tracking-wide border-b border-red-100 pb-1">🚫 Tidak Diperbolehkan (X)</strong>
        ${listToHtml(forbidden)}
      </div>
      ${disasterHtml}
    </div>
  `;
};

// --- HELPER UTAMA: LOGIKA KETERANGAN ZONA ---
const getZoneRegulationHTML = (zoneName: string) => {
  const name = zoneName.toLowerCase();

  // --- 1. KAWASAN LINDUNG ---

  // A. Kawasan Resapan Air / Lindung Bawahannya
  if (
    name.includes("resapan") ||
    (name.includes("lindung") && name.includes("bawah"))
  ) {
    return createRegulationTemplate(
      ["Kegiatan yang tidak mengganggu fungsi lindung."],
      ["Bangunan utilitas & prasarana transportasi."],
      [
        "Kegiatan yang mengganggu resapan air.",
        "Pertambangan.",
        "Perindustrian.",
        "Permukiman.",
      ]
    );
  }

  // B. Sempadan Pantai
  if (name.includes("pantai")) {
    return createRegulationTemplate(
      [
        "Pengembangan jalur hijau dan RTH.",
        "Pelestarian pantai.",
        "Konservasi & penataan.",
        "Pembangunan pendukung fungsi sempadan.",
      ],
      [
        "Pariwisata ramah lingkungan.",
        "Infrastruktur melintas kawasan.",
        "Prasarana pengelolaan air.",
        "Pendidikan & penelitian.",
        "Jembatan, dermaga, kabel, pipa.",
      ],
      ["Kegiatan yang mengancam kualitas pantai."]
    );
  }

  // C. Sempadan Sungai
  if (name.includes("sungai")) {
    return createRegulationTemplate(
      [
        "Jalur hijau & RTH.",
        "Pelestarian sungai.",
        "Konservasi & penataan sungai.",
      ],
      [
        "Pariwisata ramah lingkungan.",
        "Infrastruktur melintas (pengganti RTH).",
        "Pengelolaan air & kendali daya rusak.",
        "Pendidikan & penelitian.",
        "Pipa, kabel, jembatan.",
        "Bangunan eksisting (tanpa tambah luas).",
      ],
      ["Kegiatan yang menurunkan kualitas sungai."]
    );
  }

  // D. Kawasan Konservasi
  if (name.includes("konservasi") && !name.includes("air")) {
    return createRegulationTemplate(
      [
        "Konservasi & penataan mendukung fungsi kawasan sesuai perundang-undangan.",
      ],
      [
        "Pariwisata, olahraga, penelitian, perikanan (tidak ubah bentang alam/rusak lingkungan).",
      ],
      ["Perusakan fungsi konservasi."]
    );
  }

  // E. Cagar Budaya
  if (name.includes("cagar budaya") || name.includes("heritage")) {
    return createRegulationTemplate(
      ["Penelitian, pendidikan, budaya, pariwisata."],
      [
        "Pemanfaatan terbatas bangunan pengawasan.",
        "Kegiatan yang tidak ganggu fungsi lindung.",
      ],
      ["Kegiatan yang mengganggu upaya pelestarian budaya masyarakat setempat."]
    );
  }

  // F. RTH Kota
  if (
    name.includes("rth") ||
    name.includes("hijau") ||
    name.includes("taman")
  ) {
    return createRegulationTemplate(
      ["RTH, rekreasi, fasilitas pejalan kaki & olahraga."],
      [
        "Bangunan penunjang rekreasi & fasilitas umum (syarat tidak ganggu fungsi RTH).",
      ],
      ["Kegiatan di luar kategori di atas yang mengganggu fungsi RTH."]
    );
  }

  // --- 2. KAWASAN BUDIDAYA ---

  // A. Pertanian / Pangan
  if (
    name.includes("pertanian") ||
    name.includes("pangan") ||
    name.includes("holtikultura")
  ) {
    return createRegulationTemplate(
      [
        "Budidaya tanaman pertanian & holtikultura.",
        "Sistem pertanian kearifan lokal.",
        "Sarpras pendukung pertanian.",
      ],
      [
        "Peternakan, perkebunan.",
        "Perumahan kepadatan rendah.",
        "Budidaya tidak ubah fungsi lahan.",
        "Infrastruktur jaringan umum.",
      ],
      [
        "Mengganggu lahan pangan.",
        "Industri & Pertambangan.",
        "Pertanian merusak lingkungan.",
      ],
      [
        "RTH.",
        "Jalur evakuasi, sistem peringatan.",
        "Kegiatan pertanian mengacu aturan kebencanaan.",
      ]
    );
  }

  // B. Perikanan
  if (name.includes("perikanan") || name.includes("minapolitan")) {
    return createRegulationTemplate(
      ["Kegiatan perikanan."],
      ["Pendirian bangunan penunjang fungsi kawasan."],
      ["Kegiatan yang mengganggu perikanan."],
      [
        "RTH.",
        "Jalur evakuasi, sistem peringatan.",
        "Kegiatan pertanian mengacu aturan kebencanaan.",
      ]
    );
  }

  // C. Industri
  if (name.includes("industri")) {
    return createRegulationTemplate(
      [
        "Bangunan industri & prasarana pendukung.",
        "Industri hemat air & tidak cemar berat.",
        "Wajib: Sumber air, kelola sampah/limbah B3, drainase, energi memadai.",
      ],
      [
        "Perumahan kepadatan rendah penunjang.",
        "Wajib RTH dalam kawasan.",
        "Industri Kecil/Menengah manfaatkan potensi sekitar.",
      ],
      ["Industri tidak berkelanjutan.", "Merusak fungsi lindung dan budidaya."],
      [
        "RTH.",
        "Jalur evakuasi, sistem peringatan.",
        "Kegiatan pertanian mengacu aturan kebencanaan.",
      ]
    );
  }

  // D. Pariwisata
  if (name.includes("pariwisata") || name.includes("wisata")) {
    return createRegulationTemplate(
      [
        "RTH.",
        "Pembangunan & fasilitas pariwisata.",
        "Pemanfaatan potensi alam/budaya (sesuai daya dukung).",
        "Perlindungan heritage.",
      ],
      ["Sarana dan prasarana kegiatan pariwisata."],
      [
        "Perubahan lingkungan fisik alamiah ruang.",
        "Penurunan fungsi kawasan wisata.",
      ],
      [
        "RTH.",
        "Jalur evakuasi, sistem peringatan.",
        "Kegiatan pertanian mengacu aturan kebencanaan.",
      ]
    );
  }

  // E. Permukiman / Perumahan
  if (name.includes("perumahan") || name.includes("pemukiman")) {
    return createRegulationTemplate(
      [
        "Bangunan perumahan (tinggi, sedang, rendah).",
        "Wajib RTH & sesuai aturan.",
        "Sarpras fasilitas perumahan.",
      ],
      [
        "Industri rumah tangga & fasos ekonomi (tidak polusi).",
        "Perdagangan, jasa, perkantoran, kesehatan, pendidikan (skala lingkungan).",
      ],
      [
        "Mengganggu fungsi perumahan & sosial.",
        "Sentra industri limbah cair.",
        "Mengganggu kenyamanan.",
      ],
      [
        "RTH.",
        "Jalur evakuasi, sistem peringatan.",
        "Pertanian pekarangan mengacu aturan kebencanaan.",
      ]
    );
  }

  // F. Perdagangan dan Jasa
  if (
    name.includes("perdagangan") ||
    name.includes("jasa") ||
    name.includes("komersial")
  ) {
    return createRegulationTemplate(
      [
        "Kegiatan mendukung perdagangan & jasa.",
        "Sarpras pendukung sesuai aturan.",
      ],
      [
        "Bangunan/kegiatan tidak ganggu fungsi utama.",
        "Sentra industri kecil.",
        "Industri menengah (tidak cemar lingkungan).",
        "Jaringan/transmisi (izin terkait).",
      ],
      ["Pengembangan kawasan industri.", "Menurunkan kualitas lingkungan."],
      [
        "RTH.",
        "Jalur evakuasi, sistem peringatan.",
        "Pertanian mengacu aturan kebencanaan.",
      ]
    );
  }

  // G. Perkantoran
  if (name.includes("perkantoran") || name.includes("pemerintahan")) {
    return createRegulationTemplate(
      [
        "Penyediaan RTH.",
        "Pemanfaatan ruang tingkatkan fungsi utama.",
        "Sarpras pendukung perkantoran.",
      ],
      [
        "Bangunan/kegiatan tidak ganggu fungsi utama.",
        "Sarpras pendukung lainnya.",
      ],
      ["Mengganggu fungsi utama.", "Menurunkan kualitas lingkungan."],
      [
        "RTH.",
        "Jalur evakuasi, sistem peringatan.",
        "Pertanian mengacu aturan kebencanaan.",
      ]
    );
  }

  // H. Peribadatan
  if (
    name.includes("ibadah") ||
    name.includes("agama") ||
    name.includes("masjid")
  ) {
    return createRegulationTemplate(
      [
        "Pembangunan sarana ibadah.",
        "Wajib: Parkir, pedestrian, proteksi kebakaran, RTH, akses disabilitas.",
        "Prasarana kurangi risiko bencana.",
      ],
      [
        "Wisata budaya & religi.",
        "Pendidikan, perdagangan & jasa skala lokal.",
      ],
      ["Kegiatan yang mengganggu fungsi peribadatan."]
    );
  }

  // I. Pendidikan
  if (
    name.includes("pendidikan") ||
    name.includes("sekolah") ||
    name.includes("kampus")
  ) {
    return createRegulationTemplate(
      [
        "Prasarana & sarana pendidikan, budaya, olahraga, ibadah, kesehatan.",
        "Penghijauan & fasos umum.",
        "Prasarana kurangi risiko bencana.",
      ],
      [
        "Bangunan/kegiatan tidak ganggu fungsi utama.",
        "Sarpras pendukung pengembangan kawasan.",
      ],
      ["Kegiatan yang dapat mengganggu fungsi utama pendidikan."]
    );
  }

  // J. Kesehatan
  if (
    name.includes("kesehatan") ||
    name.includes("rumah sakit") ||
    name.includes("puskesmas")
  ) {
    return createRegulationTemplate(
      [
        "Prasarana & sarana kesehatan, RTH, peribadatan.",
        "Prasarana kurangi risiko bencana.",
      ],
      [
        "Bangunan/kegiatan tidak ganggu fungsi utama.",
        "Sarpras pendukung pengembangan kawasan.",
      ],
      ["Kegiatan yang dapat mengganggu fungsi kesehatan."]
    );
  }

  // K. Olahraga
  if (
    name.includes("olahraga") ||
    name.includes("stadion") ||
    name.includes("gor")
  ) {
    return createRegulationTemplate(
      [
        "Prasarana & sarana olahraga, peribadatan.",
        "Penghijauan & fasilitas penunjang.",
        "Prasarana kurangi risiko bencana.",
      ],
      [
        "Bangunan/kegiatan tidak ganggu fungsi utama.",
        "Sarpras pendukung pengembangan kawasan.",
      ],
      ["Kegiatan yang mengganggu fungsi utama olahraga."]
    );
  }

  // L. Transportasi
  if (
    name.includes("transportasi") ||
    name.includes("terminal") ||
    name.includes("stasiun")
  ) {
    return createRegulationTemplate(
      [
        "Bangunan/kegiatan dukung fungsi transportasi.",
        "Sarpras pendukung & penghijauan.",
        "Prasarana kurangi risiko bencana.",
      ],
      ["Kegiatan lain yang tidak mengganggu fungsi utama."],
      ["Mengganggu fungsi utama.", "Menurunkan kualitas lingkungan."]
    );
  }

  // M. Sumber Daya Air
  if (
    name.includes("air") ||
    name.includes("waduk") ||
    name.includes("embung")
  ) {
    return createRegulationTemplate(
      [
        "Kegiatan yang tidak ganggu fungsi SDA.",
        "Prasarana kurangi risiko bencana.",
      ],
      ["Perikanan dan pariwisata."],
      ["Kegiatan yang mengganggu fungsi utama sumber daya air."]
    );
  }

  // N. Sektor Informal
  if (name.includes("informal") || name.includes("kaki lima")) {
    return createRegulationTemplate(
      [
        "Pengaturan waktu, tempat, jenis kegiatan.",
        "Prasarana kurangi risiko bencana.",
      ],
      ["Pemanfaatan ruang terbatas menunjang sektor informal."],
      ["Bangunan permanen/semi permanen di kawasan yang ditetapkan."]
    );
  }

  // O. Pertahanan dan Keamanan
  if (
    name.includes("pertahanan") ||
    name.includes("keamanan") ||
    name.includes("militer")
  ) {
    return createRegulationTemplate(
      ["Pembangunan sarpras pertahanan & keamanan.", "Penghijauan."],
      ["Pemanfaatan ruang terbatas & selektif (sesuai aturan)."],
      ["Kegiatan yang dilarang peraturan perundangan."],
      [
        "Penyediaan RTH.",
        "Prasarana kurangi risiko bencana.",
        "Sesuai aturan kebencanaan.",
      ]
    );
  }

  return "";
};

// --- INTERFACES ---
interface SearchResult {
  name: string;
  position: [number, number];
}

interface NominatimResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
}

interface SearchableMapProps {
  onCoordinateSelect?: (lat: number, lng: number, address: string) => void;
  initialPosition?: [number, number];
  initialSearchQuery?: string;
  readonly?: boolean;
  zoneName?: string;
  role?: "pemohon" | "operator" | "surveyor";
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
  readonly = false,
  zoneName,
  role = "pemohon",
}) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition);
  const isInternal = role === "operator" || role === "surveyor";

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searchText, setSearchText] = useState<string>(initialSearchQuery);
  const [searchResultsList, setSearchResultsList] = useState<NominatimResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Style GeoJSON
  const geoJsonStyle = (feature: any) => {
    const infoNama =
      feature.properties.NAMOBJ ||
      feature.properties.KETERANGAN ||
      feature.properties.REMARK ||
      "";

    const color = getZoneColor(infoNama);

    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.6,
    };
  };

  // Popup & Interaction
  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties) {
      const infoNama =
        feature.properties.NAMOBJ ||
        feature.properties.KETERANGAN ||
        feature.properties.REMARK ||
        "Zona Tanpa Nama";

      // Panggil fungsi helper untuk konten HTML peraturan
      const regulationsHTML = getZoneRegulationHTML(infoNama);

      const popupContent = `
        <div class="font-sans min-w-[220px] max-w-[280px]">
          <div class="mb-2">
            <strong class="block mb-1 text-blue-600 uppercase text-xs tracking-wider">Zona Pola Ruang</strong>
            <span class="text-base font-bold text-gray-900 leading-tight block border-b pb-2">${infoNama}</span>
            ${
              feature.properties.LUAS
                ? `<span class="text-xs text-gray-500 mt-1 block">Luas: ${feature.properties.LUAS} Ha</span>`
                : ""
            }
          </div>
          
          ${regulationsHTML} 
        </div>
      `;

      layer.bindPopup(popupContent);

      layer.on({
        click: (e: any) => {
          if (!readonly) {
            handleMapClick(e.latlng.lat, e.latlng.lng);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (initialSearchQuery && !readonly) {
      setSearchText(initialSearchQuery);
      const timer = setTimeout(() => handleSearch(), 500);
      return () => clearTimeout(timer);
    }
  }, [initialSearchQuery, readonly]);

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
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchText
        )}&limit=5`
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
    if (readonly) return;
    const newPosition: [number, number] = [lat, lng];
    setPosition(newPosition);
    const label = `Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    setSearchResult({ name: label, position: newPosition });
    setShowDropdown(false);
    if (onCoordinateSelect) onCoordinateSelect(lat, lng, label);
  };

  return (
    <div className="space-y-4 z-0">
      {/* Search Bar */}
      {!readonly && (
        <div className="flex gap-2 mb-2 relative" ref={dropdownRef}>
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Cari lokasi (nama jalan/gedung)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {showDropdown && searchResultsList.length > 0 && (
              <div className="absolute z-[1000] w-full bg-white border shadow-lg max-h-60 overflow-y-auto mt-1 rounded-md">
                {searchResultsList.map((item) => (
                  <div
                    key={item.place_id}
                    onClick={() => handleSelectLocation(item)}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-0 text-sm"
                  >
                    <p className="font-semibold text-gray-800">
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            {isLoading ? "..." : "Cari"}
          </button>
        </div>
      )}

      {/* Info Mode untuk Operator */}
      {isInternal && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-3 py-2 rounded flex items-center gap-2">
          <span>
            🛠️ <strong>Mode Petugas:</strong> Layer RTRW aktif untuk validasi
            zona.
          </span>
        </div>
      )}

      {/* Container Peta */}
      <div className="relative rounded-lg overflow-hidden border border-gray-300 shadow-md">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "500px", width: "100%", zIndex: 10 }}
          scrollWheelZoom={!readonly}
          dragging={true}
        >
          <ChangeView center={position} zoom={15} />
          {!readonly && <MapClickHandler onMapClick={handleMapClick} />}

          <LayersControl position="topright">
            <LayersControl.BaseLayer
              checked={!isInternal}
              name="Google Satellite (Detail)"
            >
              <TileLayer
                attribution="&copy; Google Maps"
                url="http://mt0.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer
              checked={isInternal}
              name="Google Streets (Bersih)"
            >
              <TileLayer
                attribution="&copy; Google Maps"
                url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="OpenStreetMap">
              <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay
              checked={isInternal}
              name="Peta Pola Ruang (RTRW)"
            >
              <GeoJSON
                key="pola-ruang-layer"
                data={dataPolaRuang as any}
                style={geoJsonStyle}
                onEachFeature={onEachFeature}
              />
            </LayersControl.Overlay>
          </LayersControl>

          <Marker position={position}>
            <Popup>
              <div className="text-center">
                <strong className="block mb-1 text-gray-800">
                  Lokasi Terpilih
                </strong>
                {zoneName && (
                  <p className="text-sm font-bold text-blue-600 mb-1">
                    {zoneName}
                  </p>
                )}
                <span className="text-xs text-gray-500 font-mono bg-gray-100 px-1 rounded">
                  {position[0].toFixed(5)}, {position[1].toFixed(5)}
                </span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {!readonly && searchResult && (
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-md flex justify-between items-center">
          <span className="text-xs font-bold text-blue-700">
            📍 Koordinat Terpilih:
          </span>
          <span className="font-mono text-sm text-gray-700">
            {searchResult.position[0].toFixed(6)},{" "}
            {searchResult.position[1].toFixed(6)}
          </span>
        </div>
      )}
    </div>
  );
};

export default SearchableMap;
