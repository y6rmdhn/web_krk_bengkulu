import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useDetailPermohonan from "./usePermohonanDetail";
import HeaderSection from "./HeaderSection";
import DataPemohonCard from "./DataPemohonCard";
import DataPemilikCard from "./DataPemilikCard";
import DataBangunanCard from "./DataBangunanCard";
import BerkasLampiranCard from "./BerkasLampiranCard";
import AlurPermohonanCard from "./AlurPermohonan";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";
import { Loader2, ArrowLeft } from "lucide-react";
import LocationMap from "@/components/commons/LocationMap";

const DetailPermohonan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = useDetailPermohonan(id!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="animate-spin h-8 w-8 mb-4" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-gray-600 mb-4">Data permohonan tidak ditemukan</p>
          <Button onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const longitude = data.geom?.coordinates?.[0];
  const latitude = data.geom?.coordinates?.[1];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back Button for Mobile */}
      <div className="lg:hidden mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 px-0 hover:bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </div>

      <div className="mt-4 lg:mt-10 flex flex-col gap-4 sm:gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <HeaderSection
            data={data}
            onBack={() => navigate(-1)}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Map Section */}
            <div className="relative w-full rounded-lg overflow-hidden z-0 border border-gray-200">
              <LocationMap latitude={latitude} longitude={longitude} />
            </div>

            {/* Cards Section */}
            <div className="space-y-4 sm:space-y-6">
              <DataPemohonCard data={data} formatAlamat={formatAlamat} />
              <DataPemilikCard data={data} formatAlamat={formatAlamat} />
              <DataBangunanCard data={data} formatAlamat={formatAlamat} />

              {data.attachments && data.attachments.length > 0 && (
                <BerkasLampiranCard attachments={data.attachments} />
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-4 space-y-4 sm:space-y-6">
              <AlurPermohonanCard data={dataDetailHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPermohonan;
