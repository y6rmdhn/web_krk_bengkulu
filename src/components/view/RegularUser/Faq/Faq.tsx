import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Search, FileText, Clock, User, Building, MapPin } from "lucide-react";
import { useState } from "react";
import FaqAccordion from "./FaqAccordion/FaqAccordion";

const faqData = [
  {
    id: "item-1",
    question: "Apa yang dimaksud dengan KRK?",
    answer:
      "KRK atau Keterangan Rencana Kota adalah informasi tentang peruntukan lahan dan peraturan zonasi yang berlaku pada suatu lokasi. Dokumen ini memberikan gambaran mengenai rencana tata ruang dan peruntukan lahan di wilayah Kota Bengkulu.",
    category: "umum",
    icon: FileText,
  },
  {
    id: "item-2",
    question: "Apa yang dimaksud dengan RDB?",
    answer:
      "RDB (Rencana Detail Bangunan) adalah dokumen teknis yang berisi ketentuan-ketentuan detail tentang bangunan yang akan didirikan pada suatu lokasi, termasuk persyaratan teknis, ketinggian, dan tata letak bangunan.",
    category: "teknis",
    icon: Building,
  },
  {
    id: "item-3",
    question: "Berapa lama proses pengajuan KRK?",
    answer:
      "Proses pengajuan KRK membutuhkan waktu sekitar 5-7 hari kerja setelah semua dokumen lengkap dan memenuhi persyaratan. Anda dapat memantau perkembangan melalui fitur monitoring berkas.",
    category: "proses",
    icon: Clock,
  },
  {
    id: "item-4",
    question: "Siapa yang dapat mengajukan KRK?",
    answer:
      "Pengajuan KRK dapat dilakukan oleh pemilik tanah, ahli waris, atau pihak yang memiliki kuasa dari pemilik tanah dengan melampirkan dokumen-dokumen yang diperlukan.",
    category: "syarat",
    icon: User,
  },
  {
    id: "item-5",
    question: "Bagaimana cara mengetahui zonasi lahan?",
    answer:
      "Anda dapat mengetahui informasi zonasi lahan melalui peta digital yang tersedia di sistem KRK Online atau dengan mengajukan permohonan KRK untuk mendapatkan informasi detail tentang peruntukan lahan.",
    category: "teknis",
    icon: MapPin,
  },
  {
    id: "item-6",
    question: "Apa saja dokumen yang diperlukan?",
    answer:
      "Dokumen yang diperlukan meliputi: Fotokopi KTP, Sertifikat tanah, Surat kuasa (jika dikuasakan), dan dokumen pendukung lainnya sesuai dengan jenis permohonan.",
    category: "syarat",
    icon: FileText,
  },
];

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory] = useState("semua");

  const filteredFaqData = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "semua" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout title="FAQ | KRK Bengkulu">
      <div className="min-h-[81vh] bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                Pertanyaan yang Sering Diajukan
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              FAQ
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                KRK Online
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Temukan jawaban untuk pertanyaan umum seputar layanan Keterangan
              Rencana Kota
            </p>
          </div>

          <div>
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader className="pb-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Input
                      type="text"
                      placeholder="Cari pertanyaan atau kata kunci..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 pr-4 py-3 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 text-lg"
                    />
                  </div>
                </CardHeader>

                <CardContent className="pb-8">
                  {/* Results Count */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      Menampilkan {filteredFaqData.length} dari {faqData.length}{" "}
                      pertanyaan
                    </p>
                    {searchTerm && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchTerm("")}
                        className="rounded-lg"
                      >
                        Hapus Pencarian
                      </Button>
                    )}
                  </div>

                  {/* FAQ Accordion */}
                  <FaqAccordion filteredFaqData={filteredFaqData} />

                  {/* Pagination */}
                  {filteredFaqData.length > 0 && (
                    <Pagination className="flex items-center justify-center mt-8">
                      <PaginationContent className="flex gap-2">
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            className="rounded-lg border-gray-300"
                          />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            href="#"
                            isActive
                            className="rounded-lg"
                          >
                            1
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" className="rounded-lg">
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            className="rounded-lg border-gray-300"
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}

                  {/* Help Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Masih butuh bantuan?
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Tim support kami siap membantu menjawab pertanyaan Anda
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl">
                        Hubungi Support
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-xl border-gray-300"
                      >
                        Lihat Tutorial
                      </Button>
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
