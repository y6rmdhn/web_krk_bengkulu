import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileWarning,
  Download,
  Printer,
  FileText,
  ExternalLink,
} from "lucide-react";
import { usePreviewSk } from "./usePreviewSk";
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

  const { dataSk, isLoadingSk, isError } = usePreviewSk(`${id}`);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    if (dataSk && dataSk instanceof Blob) {
      const url = URL.createObjectURL(dataSk);
      setBlobUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [dataSk]);

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.print();
      } catch (e) {
        if (blobUrl) {
          const pdfWindow = window.open(blobUrl);
          pdfWindow?.print();
        }
      }
    }
  };

  const handleOpenNewTab = () => {
    if (blobUrl) window.open(blobUrl, "_blank");
  };

  return (
    <MainLayout title="Preview SK | KRK Bengkulu" isBgGray={false}>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-100">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-20 sticky top-0">
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
            <Separator orientation="vertical" className="h-6 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText size={20} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-gray-800 leading-tight">
                  Preview Dokumen SK
                </h1>
                <p className="text-xs text-gray-500">
                  ID:{" "}
                  <span className="font-mono">{id?.substring(0, 8)}...</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isLoadingSk && !isError && blobUrl && (
              <>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleOpenNewTab}
                      >
                        <ExternalLink size={18} className="text-gray-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Buka di Tab Baru</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrint}
                      >
                        <Printer size={18} className="text-gray-600" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Cetak Dokumen</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Separator orientation="vertical" className="h-6 mx-1" />

                <a
                  href={blobUrl}
                  download={`SK_KRK_${id}.pdf`}
                  className="no-underline"
                >
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-md gap-2 px-5">
                    <Download size={18} />
                    <span className="hidden sm:inline font-medium">
                      Download
                    </span>
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden relative w-full h-full flex justify-center bg-zinc-100">
          {isLoadingSk ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 animate-in fade-in zoom-in duration-300">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 border-t-transparent"></div>
              </div>
              <p className="text-slate-500 font-medium animate-pulse">
                Memuat Dokumen...
              </p>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center h-full gap-5">
              <div className="p-4 bg-red-50 rounded-full">
                <FileWarning size={48} className="text-red-500" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  Gagal Memuat Dokumen
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Terjadi kesalahan saat mengambil data dari server.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Coba Lagi
              </Button>
            </div>
          ) : (
            <div className="w-full h-full p-0 md:p-4 lg:p-6">
              <div className="w-full h-full bg-white shadow-sm md:shadow-lg rounded-none md:rounded-lg overflow-hidden border border-gray-200">
                {blobUrl && (
                  <iframe
                    ref={iframeRef}
                    title="Preview SK"
                    src={blobUrl}
                    className="w-full h-full block"
                    style={{ border: "none" }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PreviewSk;
