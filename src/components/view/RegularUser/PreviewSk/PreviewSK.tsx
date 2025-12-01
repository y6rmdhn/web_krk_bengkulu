import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileWarning,
  Download,
  Printer,
  FileText,
  Maximize2,
} from "lucide-react";
import { usePreviewSk } from "./usePreviewSk";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PreviewSk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dataSk, isLoadingSk, isError } = usePreviewSk(id!);

  const pdfUrl = useMemo(() => {
    if (!dataSk) return null;
    if (dataSk.type === "application/json") return null;

    const blob = new Blob([dataSk], { type: "application/pdf" });
    return window.URL.createObjectURL(blob);
  }, [dataSk]);

  const handlePrint = () => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, "_blank");
      printWindow?.print();
    }
  };

  return (
    <MainLayout title="Preview SK | KRK Bengkulu" isBgGray={false}>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} className="mr-2" />
              Kembali
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-red-50 rounded-md">
                <FileText size={18} className="text-red-600" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-800 leading-none">
                  Surat Keputusan (SK)
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Dokumen Resmi KRK Online
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {pdfUrl && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrint}
                        className="hidden sm:flex"
                      >
                        <Printer size={18} className="text-gray-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Cetak Dokumen</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  className="bg-blue-600 hover:bg-blue-700 shadow-md gap-2"
                  onClick={() => window.open(pdfUrl, "_blank")}
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-4 md:p-6 flex justify-center">
          <Card className="w-full max-w-5xl h-full shadow-xl border-gray-200/60 overflow-hidden flex flex-col bg-white ring-1 ring-gray-900/5">
            <div className="bg-gray-100/80 border-b border-gray-200 px-4 py-2 flex justify-between items-center backdrop-blur-sm">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                PDF Preview Mode
              </div>
              <Maximize2 size={14} className="text-gray-400" />
            </div>

            <div className="flex-1 bg-gray-50 relative">
              {isLoadingSk ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600"></div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-gray-800">
                      Menyiapkan Dokumen
                    </p>
                    <p className="text-sm text-gray-500">
                      Mohon tunggu sebentar...
                    </p>
                  </div>
                </div>
              ) : isError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-red-50/50">
                  <div className="p-4 bg-red-100 rounded-full">
                    <FileWarning size={32} className="text-red-600" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-gray-900">
                      Gagal Memuat Dokumen
                    </h3>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto">
                      Terjadi kesalahan saat mengambil data SK. File mungkin
                      rusak atau tidak ditemukan.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => window.location.reload()}
                      className="mt-2 border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Coba Lagi
                    </Button>
                  </div>
                </div>
              ) : pdfUrl ? (
                <iframe
                  src={`${pdfUrl}#toolbar=0`}
                  className="w-full h-full block"
                  title="Preview SK"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
                  <FileWarning size={48} />
                  <p>Dokumen tidak tersedia.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default PreviewSk;
