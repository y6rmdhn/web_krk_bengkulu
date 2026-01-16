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
import { Loader2, Info } from "lucide-react";
import LocationMap from "@/components/commons/LocationMap";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DisposisiSurveiMasukDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = useDisposisiSurveiMasukDetail(
    id!
  );

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
            {/* Peta dengan Layer RTRW Aktif untuk Surveyor */}
            <LocationMap
              latitude={latitude}
              longitude={longitude}
              userRole="surveyor"
            />

            <DataPemohonCard data={data} formatAlamat={formatAlamat} />
            <DataPemilikCard data={data} formatAlamat={formatAlamat} />
            <DataBangunanCard data={data} formatAlamat={formatAlamat} />

            {data.attachments && data.attachments.length > 0 && (
              <BerkasLampiranCard attachments={data.attachments} />
            )}
          </div>

          {/* --- KOLOM KANAN (Aksi & History) --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* 1. Informasi Tindak Lanjut Lapangan (Peringatan Statis) */}
            <Alert className="bg-blue-50 border-blue-200 text-blue-900 shadow-sm">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="font-bold text-sm">
                Peringatan Survei
              </AlertTitle>
              <AlertDescription className="text-xs leading-relaxed mt-1">
                Jika lokasi sulit diidentifikasi melalui peta digital atau data
                berkas meragukan, harap lakukan{" "}
                <strong>Pengecekan Fisik/Survei Lapangan</strong> sebelum
                memberikan persetujuan teknis.
              </AlertDescription>
            </Alert>

            {/* 2. ActionButtons (Setujui/Tolak/Revisi) */}
            <ActionButtons id={`${id}`} />

            {/* 3. History Alur */}
            <AlurPermohonanCard data={dataDetailHistory} />
          </div>
        </div>
      </div>
    </SurveyorLayout>
  );
};

export default DisposisiSurveiMasukDetail;
