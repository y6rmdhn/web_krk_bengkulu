import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDisposisiSurveiMasukDetail from "./useDisposisiSurveiMasukDetail";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";
import SurveyorLayout from "@/components/layouts/SurveyorLayout";
import { Loader2, Info, MapPin, FileText, CheckCircle2 } from "lucide-react";
import LocationMap from "@/components/commons/LocationMap";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SharedActionButtons from "@/components/commons/SharedActionButtons";
import AlurPermohonanCard from "@/components/commons/AlurPermohonanCard";
import DataPemilikCard from "@/components/commons/DataPemilikCard";
import DataBangunanCard from "@/components/commons/DataBangunanCard";
import BerkasLampiranCard from "@/components/commons/BerkasLampiranCard";
import DataPemohonCard from "@/components/commons/DataPemohonCard";
import HeaderSection from "@/components/commons/HeaderSection";

const DisposisiSurveiMasukDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = useDisposisiSurveiMasukDetail(
    id!,
  );

  // Workflow state
  const [workflowStep, setWorkflowStep] = useState<
    "selection" | "surveying" | "analysis"
  >("selection");

  // State untuk menyimpan koordinat hasil survei
  // Inisialisasi awal null, nanti diisi useEffect saat data fetch selesai
  const [surveyLocation, setSurveyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Inisialisasi koordinat saat data berhasil diload
  useEffect(() => {
    if (data?.geom?.coordinates) {
      setSurveyLocation({
        lng: data.geom.coordinates[0],
        lat: data.geom.coordinates[1],
      });
    }
  }, [data]);

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

  // Handler saat tombol "Simpan Hasil Survei" diklik
  const handleSaveSurvey = () => {
    // Koordinat sudah tersimpan di state `surveyLocation` dari map
    // Lanjut ke tahap analisis
    setWorkflowStep("analysis");
  };

  // 👇 Variabel untuk menentukan apakah tombol aksi boleh muncul atau tidak
  const shouldShowActionButtons =
    data.status === "PENDING_JABATAN_FUNGSIONAL" ||
    data.status === "PENDING_SURVEYOR";

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
            {/* PETA */}
            <LocationMap
              // Gunakan koordinat dari state jika ada (untuk real-time update saat drag),
              // fallback ke data dari DB
              latitude={
                surveyLocation
                  ? surveyLocation.lat
                  : data.geom?.coordinates?.[1]
              }
              longitude={
                surveyLocation
                  ? surveyLocation.lng
                  : data.geom?.coordinates?.[0]
              }
              userRole="surveyor"
              // Peta hanya bisa digeser saat mode 'surveying'
              isDraggable={workflowStep === "surveying"}
              showAnalysisLayer={workflowStep === "analysis"}
              // Callback untuk menangkap perubahan posisi marker
              onLocationChange={(lat, lng) => setSurveyLocation({ lat, lng })}
            />

            {/* Alert Mode Survei */}
            {workflowStep === "surveying" && (
              <Alert className="bg-orange-50 border-orange-200 text-orange-900">
                <MapPin className="h-4 w-4 text-orange-600" />
                <AlertTitle className="font-bold">Mode Edit Lokasi</AlertTitle>
                <AlertDescription>
                  Silakan geser penanda (marker) di peta untuk memperbarui
                  koordinat lokasi yang akurat.
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
            {shouldShowActionButtons && (
              <Card className="border-blue-200 shadow-sm">
                <CardHeader className="bg-blue-50/50 pb-3">
                  <CardTitle className="text-base font-semibold text-blue-900 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Opsi Tindakan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  {/* STEP 1: PEMILIHAN AKSI (Selection) */}
                  {workflowStep === "selection" && (
                    <div className="flex flex-col gap-3">
                      <Alert className="bg-blue-50 border-none mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-xs text-blue-800">
                          Pilih tindakan lanjut. Lakukan validasi lokasi jika
                          diperlukan.
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
                            Validasi Lokasi (Survei)
                          </span>
                          <span className="text-[10px] text-gray-500 font-normal">
                            Perbarui koordinat via peta
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
                            Analisis peta & keputusan akhir
                          </span>
                        </div>
                      </Button>
                    </div>
                  )}

                  {/* STEP 2: MODE SURVEI (Surveying) */}
                  {workflowStep === "surveying" && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded border">
                        <p className="font-medium mb-1">Instruksi:</p>
                        <ul className="list-disc ml-4 space-y-1">
                          <li>Geser Pin merah pada peta di sebelah kiri.</li>
                          <li>Pastikan titik koordinat sudah akurat.</li>
                          <li>
                            Tekan <b>Simpan & Lanjut</b> untuk menggunakan
                            koordinat tersebut.
                          </li>
                        </ul>
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
                      <div className="text-sm text-gray-600 mb-2">
                        Silakan lakukan analisis spasial pada peta, lalu
                        tentukan keputusan akhir (Koordinat survei akan otomatis
                        tersimpan).
                      </div>

                      <SharedActionButtons
                        id={id || ""}
                        role="JF"
                        surveyLocation={surveyLocation}
                      />

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
            )}

            <AlurPermohonanCard data={dataDetailHistory} />
          </div>
        </div>
      </div>
    </SurveyorLayout>
  );
};

export default DisposisiSurveiMasukDetail;
