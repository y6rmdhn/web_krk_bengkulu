import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Search, FileText, AlertCircle, Eye } from "lucide-react";
import { useState } from "react";
import { PENGUMUMAN_LIST } from "./MonitoringBerkas.constant";
import SidebarInfo from "./SidebarInfo/SidebarInfo";

export default function MonitoringBerkasPage() {
  const [noResi, setNoResi] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      console.log("Searching for:", noResi);
    }, 1500);
  };

  return (
    <MainLayout title="Monitoring Berkas | KRK Bengkulu">
      <div className="min-h-[81vh] bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                Lacak Status Permohonan
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Monitoring Berkas
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                KRK Online
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Pantau perkembangan permohonan KRK Anda secara real-time dengan
              mudah dan transparan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  {/* Pengumuman Section */}
                  <div className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertCircle size={24} className="text-yellow-300" />
                        <h2 className="text-xl font-bold">
                          PENGUMUMAN PENTING
                        </h2>
                      </div>
                      <div className="space-y-3 text-blue-50">
                        <p className="leading-relaxed">
                          Sesuai dengan ketentuan PP Nomor 21 Tahun 2021 tentang
                          Penyelenggaraan Penataan Ruang, berikut informasi
                          penting terkait layanan KRK:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                          {PENGUMUMAN_LIST.map((item) => (
                            <li
                              key={`list-${item.label}`}
                              className="leading-relaxed"
                            >
                              {item.title}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Search Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Search className="text-blue-600" size={32} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Cari Status Berkas
                      </h3>
                      <p className="text-gray-600">
                        Masukkan nomor resi untuk memantau perkembangan
                        permohonan Anda
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-4 bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                        <Label
                          htmlFor="no-resi"
                          className="text-lg font-semibold text-gray-800 sm:min-w-[120px] flex items-center gap-2"
                        >
                          <FileText size={20} className="text-blue-600" />
                          No. Resi
                        </Label>
                        <div className="flex-1 relative">
                          <Input
                            id="no-resi"
                            type="text"
                            value={noResi}
                            onChange={(e) => setNoResi(e.target.value)}
                            className="pl-12 pr-4 py-3 rounded-xl border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-lg"
                            placeholder="Contoh: KRK/2024/00123"
                            required
                          />
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400">
                            <FileText size={20} />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSearching || !noResi}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        {isSearching ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Mencari...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Eye size={20} />
                            Lacak Status Berkas
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <SidebarInfo />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
