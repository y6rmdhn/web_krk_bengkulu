import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useDetailPermohonan from "./usePermohonanDetail";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import HeaderSection from "./HeaderSection";
import DataPemohonCard from "./DataPemohonCard";
import DataPemilikCard from "./DataPemilikCard";
import DataBangunanCard from "./DataBangunanCard";
import BerkasLampiranCard from "./BerkasLampiranCard";
import AlurPermohonanCard from "./AlurPermohonan";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";
import { Eye, Loader2, ArrowLeft } from "lucide-react";
import LocationMap from "@/components/commons/LocationMap";

const DetailPermohonan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory, dataSk, isLoadingSk } =
    useDetailPermohonan(id!);

  const pdfUrl = useMemo(() => {
    if (!dataSk) return null;

    if (dataSk.type === "application/json") {
      console.error("Data SK ternyata JSON (Mungkin Error Backend):", dataSk);
      return null;
    }

    const blob = new Blob([dataSk], { type: "application/pdf" });
    return window.URL.createObjectURL(blob);
  }, [dataSk]);

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

          {dataSk && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-blue-500 text-blue-600 hover:bg-blue-50 w-full md:w-auto"
                >
                  <Eye className="w-4 h-4" />
                  Lihat Surat SK
                </Button>
              </DialogTrigger>

              <DialogContent className="!max-w-[95vw] sm:!max-w-[90vw] w-full h-[80vh] sm:h-[90vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-4 border-b">
                  <DialogTitle className="text-sm sm:text-base">
                    Preview Surat Keputusan (SK)
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 bg-slate-100 w-full h-full relative">
                  {isLoadingSk ? (
                    <div className="flex items-center justify-center h-full gap-2 text-sm sm:text-base">
                      <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" />
                      Memuat Dokumen...
                    </div>
                  ) : pdfUrl ? (
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full"
                      title="Preview SK"
                      style={{ border: "none" }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-red-500 text-sm sm:text-base">
                      Gagal memuat preview. File mungkin rusak.
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Map Section */}
            <div className="relative w-full rounded-lg overflow-hidden z-0 border border-gray-200">
              <LocationMap
                latitude={data.latitude}
                longitude={data.longitude}
              />
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
