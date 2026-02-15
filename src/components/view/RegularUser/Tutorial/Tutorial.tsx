import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  PlayCircle,
  Download,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function Tutorial() {
  // Fungsi dummy untuk handle klik
  const handleOpenPdf = () => {
    // Ganti dengan URL PDF asli Anda
    window.open("/files/panduan-krk.pdf", "_blank");
  };

  const handleOpenVideo = () => {
    // Ganti dengan Link Youtube / Video asli Anda
    window.open("https://youtube.com", "_blank");
  };

  return (
    <MainLayout title="Tutorial | KRK Bengkulu">
      <div className="min-h-[81vh] bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8 relative overflow-hidden">
        {/* Background Elements (Sama dengan Layanan agar konsisten) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <main className="container max-w-5xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                Pusat Bantuan
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Panduan & Tutorial
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Penggunaan Sistem
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Pelajari cara mengajukan permohonan KRK melalui panduan dokumen
              lengkap atau video interaktif.
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* CARD 1: PANDUAN PDF */}
            <Card className="group relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-8 relative z-10 flex flex-col h-full items-center text-center">
                <div className="w-20 h-20 mb-6 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <FileText size={40} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Buku Panduan (PDF)
                </h3>

                <p className="text-gray-600 mb-8 flex-grow">
                  Dokumen lengkap berisi tata cara pendaftaran, persyaratan
                  berkas, hingga alur penerbitan KRK secara tertulis.
                </p>

                <Button
                  onClick={handleOpenPdf}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-6 text-lg shadow-lg shadow-orange-200"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Unduh Panduan PDF
                </Button>
              </CardContent>
            </Card>

            {/* CARD 2: VIDEO TUTORIAL */}
            <Card className="group relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-8 relative z-10 flex flex-col h-full items-center text-center">
                <div className="w-20 h-20 mb-6 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <PlayCircle size={40} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Video Tutorial
                </h3>

                <p className="text-gray-600 mb-8 flex-grow">
                  Tonton video langkah demi langkah visualisasi penggunaan
                  aplikasi mulai dari registrasi akun hingga selesai.
                </p>

                <Button
                  onClick={handleOpenVideo}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg shadow-lg shadow-blue-200"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Tonton Video
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-gray-700 gap-2"
            >
              Kembali ke Beranda <ArrowRight size={16} />
            </Button>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
