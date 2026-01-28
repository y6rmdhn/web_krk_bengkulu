import { useState } from "react"; // Tambahkan useState
import { useNavigate, useParams } from "react-router-dom";
import useDisposisiSurveiMasukDetail from "./useDisposisiSurveiMasukDetail";
import HeaderSection from "./HeaderSection";
import DataPemohonCard from "./DataPemohonCard";
import DataPemilikCard from "./DataPemilikCard";
import DataBangunanCard from "./DataBangunanCard";
import BerkasLampiranCard from "./BerkasLampiranCard";
import AlurPermohonanCard from "./AlurPermohonan";
import ActionButtons from "./ActionButton";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";
import SurveyorLayout from "@/components/layouts/SurveyorLayout";
import { Loader2, Info, MapPin, FileText, CheckCircle2 } from "lucide-react"; // Tambah Icon
import LocationMap from "@/components/commons/LocationMap";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea"; // Asumsi ada komponen Textarea
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Tambahkan Card untuk UI Flow

const DisposisiSurveiMasukDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = useDisposisiSurveiMasukDetail(
    id!,
  );

  // --- STATE UNTUK MENGATUR FLOW ---
  // 'selection': User memilih mau Survei atau langsung Kajian
  // 'surveying': User sedang input catatan survei & edit lokasi
  // 'analysis': User melihat hasil peta & tombol final (Setujui/Tolak)
  const [workflowStep, setWorkflowStep] = useState<
    "selection" | "surveying" | "analysis"
  >("selection");

  // State untuk menyimpan catatan survei sementara
  const [surveyNote, setSurveyNote] = useState("");

  if (isLoading) {
    return (
      <SurveyorLayout title="Loading..." desc="Memuat detail permohonan">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin mr-2" />
          <p>Memuat data...</p>
        </div>
      </SurveyorLayout>
    );
  }

  if (!data) {
    return (
      <SurveyorLayout
        title="Data Tidak Ditemukan"
        desc="Permohonan tidak ditemukan"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 mb-4">Data permohonan tidak ditemukan</p>
          <Button onClick={() => navigate(-1)}>Kembali</Button>
        </div>
      </SurveyorLayout>
    );
  }

  const longitude = data.geom?.coordinates?.[0];
  const latitude = data.geom?.coordinates?.[1];

  // Handler saat tombol "Simpan Hasil Survei" diklik
  const handleSaveSurvey = () => {
    // Di sini nanti bisa tambahkan logika API call untuk simpan note/koordinat baru
    console.log("Menyimpan catatan survei:", surveyNote);
    // Setelah simpan, lanjut ke tahap analisis
    setWorkflowStep("analysis");
  };

  return (
    <SurveyorLayout
      title={`Detail Permohonan KRK | ${data.nomor_permohonan}`}
      desc={`Detail permohonan KRK ${data.nomor_permohonan}`}
    >
      <div className="mt-10 flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <HeaderSection
            data={data}
            onBack={() => navigate(-1)}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- KOLOM KIRI (Data & Peta) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Peta dengan Logika Interaktif:
               Jika sedang tahap 'surveying', userRole mungkin perlu diubah agar marker bisa digeser (draggable).
               Kita asumsikan LocationMap menerima prop 'isDraggable' atau sejenisnya.
            */}
            <LocationMap
              latitude={latitude}
              longitude={longitude}
              userRole="surveyor"
              // LOGIKA UTAMA DISINI:

              // 1. Draggable (Bisa Geser): Hanya Aktif saat step 'surveying'
              isDraggable={workflowStep === "surveying"}
              // 2. Show Analysis (Lihat Warna Zona): HANYA Aktif saat step 'analysis'
              //    (Saat 'selection' dan 'surveying', warna zona akan hidden/abu-abu)
              showAnalysisLayer={workflowStep === "analysis"}

              // Opsional: Handle simpan koordinat baru
              // onLocationChange={(newLat, newLng) => { ...update state koordinat... }}
            />

            {/* Tampilkan Alert khusus jika sedang mode survei */}
            {workflowStep === "surveying" && (
              <Alert className="bg-orange-50 border-orange-200 text-orange-900">
                <MapPin className="h-4 w-4 text-orange-600" />
                <AlertTitle className="font-bold">Mode Edit Lokasi</AlertTitle>
                <AlertDescription>
                  Silakan geser penanda (marker) di peta jika titik lokasi
                  pemohon kurang akurat.
                </AlertDescription>
              </Alert>
            )}

            <DataPemohonCard data={data} formatAlamat={formatAlamat} />
            <DataPemilikCard data={data} formatAlamat={formatAlamat} />
            <DataBangunanCard data={data} formatAlamat={formatAlamat} />

            {data.attachments && data.attachments.length > 0 && (
              <BerkasLampiranCard attachments={data.attachments} />
            )}
          </div>

          {/* --- KOLOM KANAN (Aksi & Workflow Control) --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* AREA KONTROL FLOW SURVEYOR */}
            <Card className="border-blue-200 shadow-sm">
              <CardHeader className="bg-blue-50/50 pb-3">
                <CardTitle className="text-base font-semibold text-blue-900 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Tindakan Surveyor
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* STEP 1: PEMILIHAN AKSI (Selection) */}
                {workflowStep === "selection" && (
                  <div className="flex flex-col gap-3">
                    <Alert className="bg-blue-50 border-none mb-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-xs text-blue-800">
                        Pilih tindakan lanjut untuk permohonan ini. Apakah perlu
                        tinjauan lapangan?
                      </AlertDescription>
                    </Alert>

                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 border-blue-200 hover:bg-blue-50 text-blue-700"
                      onClick={() => setWorkflowStep("surveying")}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      <div className="flex flex-col items-start text-left">
                        <span className="font-semibold text-sm">
                          Survei Lapangan
                        </span>
                        <span className="text-[10px] text-gray-500 font-normal">
                          Input catatan & koreksi koordinat
                        </span>
                      </div>
                    </Button>

                    <Button
                      className="justify-start h-auto py-3 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setWorkflowStep("analysis")}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      <div className="flex flex-col items-start text-left">
                        <span className="font-semibold text-sm">
                          Lanjut Kajian Teknis
                        </span>
                        <span className="text-[10px] text-blue-100 font-normal">
                          Langsung ke analisis peta pola ruang
                        </span>
                      </div>
                    </Button>
                  </div>
                )}

                {/* STEP 2: FORM SURVEI (Surveying) */}
                {workflowStep === "surveying" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Catatan Temuan Lapangan
                      </label>
                      <Textarea
                        placeholder="Tuliskan kondisi fisik lapangan (misal: ada sungai, bangunan eksisting, dll)..."
                        className="min-h-[120px]"
                        value={surveyNote}
                        onChange={(e) => setSurveyNote(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="ghost"
                        className="flex-1"
                        onClick={() => setWorkflowStep("selection")}
                      >
                        Batal
                      </Button>
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={handleSaveSurvey}
                      >
                        Simpan & Lanjut
                      </Button>
                    </div>
                  </div>
                )}

                {/* STEP 3: ANALISIS FINAL (Analysis) */}
                {workflowStep === "analysis" && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95">
                    {/* Tampilkan ringkasan jika ada catatan survei */}
                    {surveyNote && (
                      <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-sm">
                        <span className="font-semibold text-yellow-800 block mb-1">
                          Catatan Survei:
                        </span>
                        <p className="text-gray-700 italic">"{surveyNote}"</p>
                      </div>
                    )}

                    <div className="text-sm text-gray-600 mb-2">
                      Silakan lakukan analisis spasial pada peta, lalu tentukan
                      keputusan akhir:
                    </div>

                    {/* ActionButtons asli dipanggil di sini */}
                    <ActionButtons id={`${id}`} />

                    <Button
                      variant="link"
                      className="text-xs text-gray-400 h-auto p-0 mt-2"
                      onClick={() => setWorkflowStep("selection")}
                    >
                      Kembali ke pemilihan aksi
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 3. History Alur (Tetap Ada) */}
            <AlurPermohonanCard data={dataDetailHistory} />
          </div>
        </div>
      </div>
    </SurveyorLayout>
  );
};

export default DisposisiSurveiMasukDetail;
