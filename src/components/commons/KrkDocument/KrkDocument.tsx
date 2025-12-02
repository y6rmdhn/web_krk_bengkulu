// 1. Definisikan Tipe Data (Interface)
// Ini agar TypeScript tidak marah dan autocomplete jalan
export interface KRKData {
  nomorSurat: string;
  tanggal: string;
  noPermohonan: string;
  namaPemohon: string;
  alamatPemohon: string;
  alamatKecamatanKabupaten: string;
  luasPlanning: string;
  lokasiTanah: string;
  kelurahan: string;
  kecamatan: string;
  statusTanah: string;
  peruntukanKawasan: string;
  jenisKegiatan: string;
  gspGsb: string;
  tinggiBangunan: string;
  minimum: string;
  klb: string;
  kdb: string;
  kdh: string;
  namaKepalaDinas: string;
  nipKepalaDinas: string;
  // Index signature untuk jaga-jaga jika ada field dinamis lain
  [key: string]: any;
}

// 2. Definisikan Props untuk Komponen Utama
interface KRKPageProps {
  data: KRKData;
}

// --- KOMPONEN HALAMAN 2 (PETA) ---
const SK_KRK_Page2 = ({ data }: { data: KRKData }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-black font-serif text-[11pt] leading-tight relative mx-auto p-12 shadow-none break-before-page">
      {/* Header Peta */}
      <div className="text-center mb-6">
        <h2 className="font-bold text-[12pt] uppercase">
          PETA KETERANGAN RENCANA KOTA
        </h2>
        <p className="text-[10pt] mt-2">
          Terhadap kegiatan Kesesuaian Rencana Kota atas permohonan An.{" "}
          {data.namaPemohon} SESUAI
        </p>
      </div>

      {/* Area Peta - Placeholder */}
      <div className="border-2 border-black h-[500px] mb-6 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-400">
          <svg
            className="w-24 h-24 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="text-lg font-semibold">PETA LOKASI</p>
          <p className="text-sm mt-2">Gambar peta akan ditempatkan di sini</p>
          <p className="text-xs mt-1 text-gray-500">
            Ukuran: Full width halaman A4
          </p>
        </div>
      </div>

      {/* Footer dengan TTD dan Cap */}
      <div className="flex justify-end mt-8">
        <div className="text-center relative">
          <p className="text-[11pt] mb-20">
            Kepala Dinas Pekerjaan Umum
            <br />
            Dan Penataan Ruang
            <br />
            Kota Bengkulu
          </p>

          {/* Placeholder untuk Cap/Stempel */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 rounded-full border-4 border-blue-600 flex items-center justify-center opacity-80 rotate-[-15deg]">
              <span className="text-xs text-blue-600 font-bold text-center leading-none">
                CAP
                <br />
                DINAS
              </span>
            </div>
          </div>

          <p className="font-bold underline uppercase text-[11pt]">
            {data.namaKepalaDinas}
          </p>
          <p className="text-[11pt] font-bold">Pembina Tk.I - IV.b</p>
          <p className="text-[11pt]">NIP. {data.nipKepalaDinas}</p>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN HALAMAN 1 (DOKUMEN SK) ---
const SK_KRK_Template = ({ data }: { data: KRKData }) => {
  // Styles untuk tabel agar rapi dan menjorok (tab effect)
  const cellLabel = "w-[200px] align-top py-1";
  const cellTitikDua = "w-[20px] align-top py-1 text-center";
  const cellIsi = "align-top py-1 pl-6 font-medium"; // pl-6 memberikan jarak "tab"

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-black font-serif text-[11pt] leading-tight relative mx-auto p-12 shadow-none">
      {/* --- 1. KOP SURAT --- */}
      <div className="flex items-center border-b-[3px] border-black pb-2 mb-2 relative">
        <div className="absolute left-0 top-1">
          {/* Ganti dengan <img src="..." /> jika sudah ada logo */}
          <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
            Logo
          </div>
        </div>

        <div className="w-full text-center pl-20">
          <h3 className="text-[14pt] font-bold uppercase tracking-wide">
            PEMERINTAH KOTA BENGKULU
          </h3>
          <h2 className="text-[16pt] font-bold uppercase tracking-tighter scale-y-110">
            DINAS PEKERJAAN UMUM DAN PENATAAN RUANG KOTA BENGKULU
          </h2>
          <p className="text-[9pt] italic mt-1">
            Jl. Soeprapto Dalam Betungan Kec. Selebar Kota Bengkulu, 38877
          </p>
          <p className="text-[9pt] italic">
            E-mail: dpupr.bengkulukota@gmail.com
          </p>
        </div>
      </div>

      {/* --- 2. JUDUL SURAT --- */}
      <div className="text-center mb-6 mt-6">
        <h1 className="font-bold text-[14pt] underline decoration-2 underline-offset-4 uppercase">
          KETERANGAN RENCANA KOTA
        </h1>
        <div className="flex justify-center gap-1 text-[11pt] mt-1">
          <span>Nomor</span>
          <span>:</span>
          <span>{data.nomorSurat}</span>
        </div>
        <div className="flex justify-center gap-1 text-[11pt]">
          <span>Tanggal</span>
          <span>:</span>
          <span>{data.tanggal}</span>
        </div>
      </div>

      {/* --- 3. PARAGRAF PEMBUKA --- */}
      <div className="text-justify mb-6 text-[10.5pt] leading-relaxed">
        <p>
          <span className="font-bold">
            KEPALA DINAS PEKERJAAN UMUM DAN PENATAAN RUANG,
          </span>{" "}
          berdasarkan Undang-Undang Nomor 26 Tahun 2007 Tentang Penataan Ruang,
          Undang-Undang Nomor 11 Tahun 2020 Tentang Cipta Kerja, Peraturan
          Pemerintah Nomor 21 Tahun 2021 Tentang Penyelenggaraan Penataan Ruang,
          Permen ATR/BPN Nomor 13 Tahun 2021 tentang Pelaksanaan Kesesuaian
          Kegiatan Pemanfaatan Ruang dan Sinkronisasi Program Pemanfaatan Ruang,
          Peraturan Daerah Kota Bengkulu Nomor 4 Tahun 2021 Tentang Rencana Tata
          Ruang Wilayah Kota Bengkulu Tahun 2021-2041, dan Peraturan Walikota
          Bengkulu Nomor 38 Tahun 2018 Tentang Penetapan Klasifikasi Jalan Garis
          Sepadan Pagar/Garis Sepadan Bangunan untuk Masing-Masing Jalan dan
          Klasifikasi Wilayah dalam Kota Bengkulu, dengan ini memberikan{" "}
          <span className="font-bold">KETERANGAN:</span>
        </p>
      </div>

      {/* --- 4. DATA PEMOHON & LOKASI --- */}
      <div className="mb-4 ml-10">
        <table className="w-full text-[11pt]">
          <tbody>
            <tr>
              <td className={cellLabel}>No. Permohonan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.noPermohonan}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Atas Permohonan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.namaPemohon}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Alamat / Jalan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>
                {data.alamatPemohon}
                <br />
                {data.alamatKecamatanKabupaten}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 ml-10">
        <table className="w-full text-[11pt]">
          <tbody>
            <tr>
              <td className={cellLabel}>Luas Planning</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.luasPlanning}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Lokasi Tanah/ Jalan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.lokasiTanah}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Kelurahan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.kelurahan}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Kecamatan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.kecamatan}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Status Tanah</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.statusTanah}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* --- 5. KETENTUAN POKOK --- */}
      <div className="mb-6 ml-10">
        <div className="font-bold text-[11pt] mb-2 uppercase underline">
          KETENTUAN POKOK
        </div>

        <table className="w-full text-[11pt]">
          <tbody>
            <tr>
              <td className={cellLabel}>Peruntukan Kawasan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.peruntukanKawasan}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Jenis Kegiatan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.jenisKegiatan}</td>
            </tr>
            <tr>
              <td className={cellLabel}>GSP / GSB</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.gspGsb}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 ml-10">
        <table className="w-full text-[11pt]">
          <tbody>
            <tr>
              <td className={cellLabel}>Tinggi Bangunan Maksimum</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.tinggiBangunan}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Minimum</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.minimum}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Koefisien Lantai Bangunan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.klb}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Koefisien Dasar Bangunan</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.kdb}</td>
            </tr>
            <tr>
              <td className={cellLabel}>Koefisien Dasar Hijau</td>
              <td className={cellTitikDua}>:</td>
              <td className={cellIsi}>{data.kdh}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT (PARENT) ---
// PERUBAHAN UTAMA: Menerima props 'data'
export default function KRKPage({ data }: KRKPageProps) {
  // CATATAN:
  // Saya menghapus "bg-gray-200" dan container wrapper di sini,
  // karena styling container sudah ditangani oleh 'PreviewSk.tsx' (parent).
  // Di sini kita hanya merender kertas-kertasnya saja agar rapi saat diprint.

  return (
    <div className="flex flex-col gap-6 print:block">
      {/* Halaman 1 */}
      <div className="print:break-after-page">
        <SK_KRK_Template data={data} />
      </div>

      {/* Halaman 2 */}
      <div>
        <SK_KRK_Page2 data={data} />
      </div>
    </div>
  );
}
