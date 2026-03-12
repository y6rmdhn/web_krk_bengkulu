import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { ClipboardList, MapPin } from "lucide-react";
import ProsedurList from "./ProsedurList";

const prosedurData = [
  {
    id: 1,
    title: "Pengajuan Keterangan Rencana Kota (KRK)",
    link: "/alur-pengajuan",
    category: "perizinan",
    icon: MapPin,
    description:
      "Tata cara dan kelengkapan persyaratan untuk permohonan penerbitan Keterangan Rencana Kota (KRK) baru.",
    duration: "5-7 hari kerja",
    difficulty: "Sedang",
  },
  {
    id: 2,
    title: "Pengecekan Status Permohonan KRK",
    link: "/monitoring-berkas",
    category: "informasi",
    icon: ClipboardList,
    description:
      "Panduan untuk memantau dan mengecek sejauh mana proses pengajuan KRK Anda sedang berjalan.",
    duration: "Instan",
    difficulty: "Mudah",
  },
];

export default function Prosedur() {
  return (
    <MainLayout title="Prosedur | KRK Bengkulu">
      <div className="min-h-[81vh] bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                Panduan Lengkap Layanan
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Syarat dan Prosedur
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {" "}
                KRK Online
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Temukan panduan lengkap untuk semua jenis layanan Keterangan
              Rencana Kota
            </p>
          </div>

          <div>
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        Daftar Prosedur
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {prosedurData.length} prosedur ditemukan
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pb-8">
                  {/* Prosedur List */}
                  <ProsedurList prosedurData={prosedurData} />

                  {/* Pagination (Disederhanakan karena datanya sedikit) */}
                  {prosedurData.length > 0 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent className="flex gap-1">
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              isActive
                              className="rounded-xl bg-purple-600 text-white border-purple-600"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}

                  {/* Help Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Butuh Bantuan Lebih Lanjut?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Tim customer service kami siap membantu Anda memahami
                      prosedur dengan lebih detail
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                        Hubungi Support
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
