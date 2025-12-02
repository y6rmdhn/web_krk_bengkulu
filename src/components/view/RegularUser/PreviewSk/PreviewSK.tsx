import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileWarning,
  Download,
  Printer,
  FileText,
} from "lucide-react";
import { usePreviewSk } from "./usePreviewSk";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Import komponen dokumen yang sudah Anda bersihkan sebelumnya
import KRKPage from "@/components/commons/KrkDocument";

const PreviewSk = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Asumsi: usePreviewSk sekarang mengembalikan Data JSON (objek), bukan Blob PDF lagi.
  const { dataSk, isLoadingSk, isError } = usePreviewSk(`${id}`);

  // Ref untuk membungkus area yang akan di-print
  const printAreaRef = useRef<HTMLDivElement>(null);

  // --- FUNGSI CETAK / DOWNLOAD ---
  const handlePrint = () => {
    if (!printAreaRef.current) return;

    const printContent = printAreaRef.current.innerHTML;
    // Membuka jendela baru untuk print agar CSS Sidebar/Layout tidak ikut tercetak
    const WindowPrint = window.open("", "", "width=900,height=650");

    // FIX: Check if window failed to open (e.g., popup blocker)
    if (!WindowPrint) {
      console.error("Popup window blocked. Please allow popups for this site.");
      return;
    }

    WindowPrint.document.write(`
      <html>
        <head>
          <title>Cetak SK KRK - ${id}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; -webkit-print-color-adjust: exact; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    WindowPrint.document.close();
    WindowPrint.focus();

    // Delay sedikit agar script Tailwind sempat ter-load sebelum dialog print muncul
    setTimeout(() => {
      // Need to check again inside timeout because closure might capture old state,
      // but WindowPrint is const so strictly speaking it's fine,
      // however strict TS might want optional chaining or non-null assertion here too.
      WindowPrint.print();
      WindowPrint.close();
    }, 1000);
  };

  // Data Mockup untuk Fallback jika dataSk belum siap (Opsional)
  const dummyData = {
    nomorSurat: "Loading...",
    namaPemohon: "Loading...",
    // ... isi default lainnya
  };

  return (
    <MainLayout title="Preview SK | KRK Bengkulu" isBgGray={false}>
      <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
        {/* --- HEADER --- */}
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

          {/* Tombol Aksi (Print & Download) */}
          <div className="flex items-center gap-2">
            {!isLoadingSk && !isError && (
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
                  onClick={handlePrint} // Fungsi sama, karena browser "Save as PDF" ada di dialog print
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download PDF</span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center bg-gray-200/50">
          {isLoadingSk ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-12 h-12 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600"></div>
              <p className="text-gray-500 font-medium">Menyiapkan Dokumen...</p>
            </div>
          ) : isError ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <FileWarning size={48} className="text-red-400" />
              <p className="text-gray-500">Gagal memuat data dokumen.</p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Coba Lagi
              </Button>
            </div>
          ) : (
            /* SUKSES: Render KRKPage */
            /* Kita bungkus dengan div ref agar bisa diambil HTML-nya oleh fungsi handlePrint */
            <div ref={printAreaRef} className="bg-white shadow-2xl">
              {/* Pass dataSk ke komponen template */}
              <KRKPage data={dataSk || dummyData} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PreviewSk;
