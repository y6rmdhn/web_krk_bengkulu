import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Search, FileText, Building, MapPin } from "lucide-react";
import { useState } from "react";
import FaqAccordion from "./FaqAccordion/FaqAccordion";

const faqData = [
  {
    id: "item-1",
    question: "Apa yang dimaksud dengan Keterangan Rencana Kota (KRK)?",
    answer:
      "Keterangan Rencana Kota (KRK) adalah Informasi tentang ketentuan tata bangunan dan lingkungan yang diberlakukan oleh pemerintah daerah kabupaten/kota pada lokasi tertentu",
    category: "umum",
    icon: FileText,
  },
  {
    id: "item-2",
    question: "Apa yang dimaksud dengan Persetujuan Bangunan Gedung (PBG)?",
    answer:
      "Persetujuan Bangunan Gedung (PBG) adalah perizinan yang diberikan kepada pemilik Bangunan Gedung untuk membangun baru, mengubah, memperluas, mengurangi, dan/atau merawat Bangunan Gedung sesuai dengan standar teknis Bangunan Gedung.",
    category: "umum",
    icon: FileText,
  },
  {
    id: "item-3",
    question: "Apa hubungan antara KRK dan PBG?",
    answer:
      "KRK merupakan salah satu syarat pengajuan PBG, sebagai dasar penilaian kesesuaian pengajuan PBG terhadap ketentuan peruntukan dan intensitas Bangunan Gedung",
    category: "syarat",
    icon: FileText,
  },
  {
    id: "item-4",
    question: "KRK didasarkan pada apa?",
    answer: "KRK pada RDTR dan/atau RTBL",
    category: "teknis",
    icon: FileText,
  },
  {
    id: "item-5",
    question: "Apa saja muatan dari KRK?",
    answer:
      "Muatan dari KRK adalah:\n1. fungsi Bangunan Gedung yang dapat dibangun pada lokasi bersangkutan;\n2. ketinggian maksimum Bangunan Gedung yang diizinkan;\n3. jumlah lantai/lapis Bangunan Gedung di bawah permukaan tanah dan KTB yang diizinkan;\n4. garis sempadan dan jarak bebas minimum Bangunan Gedung yang diizinkan;\n5. KDB maksimum yang diizinkan;\n6. KLB maksimum yang diizinkan;\n7. KDH minimum yang diwajibkan;\n8. KTB maksimum yang diizinkan; dan\n9. jaringan utilitas kota",
    category: "teknis",
    icon: FileText,
  },
  {
    id: "item-6",
    question: "Apa yang dimaksud dengan fungsi Bangunan Gedung?",
    answer:
      "Fungsi Bangunan Gedung merupakan ketetapan pemenuhan Standar Teknis, yang ditinjau dari segi tata bangunan dan lingkungannya maupun keandalan Bangunan Gedung, meliputi:\n1. fungsi hunian;\n2. fungsi keagamaan;\n3. fungsi usaha;\n4. fungsi sosial dan budaya; dan\n5. fungsi khusus",
    category: "teknis",
    icon: Building,
  },
  {
    id: "item-7",
    question: "Apa yang dimaksud dengan Ketinggian Bangunan Gedung (KBG)?",
    answer:
      "Ketinggian Bangunan Gedung (KBG) adalah angka maksimal jumlah lantai Bangunan Gedung yang diperkenankan.",
    category: "teknis",
    icon: Building,
  },
  {
    id: "item-8",
    question: "Apa yang dimaksud dengan Garis Sempadan Bangunan (GSB)?",
    answer:
      "Garis Sempadan Bangunan (GSB) adalah garis yang mengatur Batasan lahan yang tidak boleh dilewati dengan bangunan yang membatasi fisik bangunan ke arah depan, belakang, maupun samping.",
    category: "teknis",
    icon: MapPin,
  },
  {
    id: "item-9",
    question: "Apa yang dimaksud dengan Koefisien Dasar Bangunan (KDB)?",
    answer:
      "Koefisien Dasar Bangunan (KDB) adalah angka persentase berdasarkan perbandingan antara luas seluruh lantai dasar Bangunan Gedung terhadap luas lahan perpetakan atau daerah perencanaan sesuai KRK",
    category: "teknis",
    icon: Building,
  },
  {
    id: "item-10",
    question: "Apa yang dimaksud dengan Koefisien Lantai Bangunan (KLB)?",
    answer:
      "Koefisien Lantai Bangunan (KLB) adalah angka persentase perbandingan antara luas seluruh lantai Bangunan Gedung terhadap luas lahan perpetakan atau daerah perencanaan sesuai KRK.",
    category: "teknis",
    icon: Building,
  },
  {
    id: "item-11",
    question: "Apa yang dimaksud dengan Koefisien Daerah Hijau (KDH)?",
    answer:
      "Koefisien Daerah Hijau (KDH) adalah angka persentase perbandingan antara luas seluruh ruang terbuka di luar Bangunan Gedung yang diperuntukkan bagi pertamanan/penghijauan terhadap luas lahan perpetakan atau daerah perencanaan sesuai KRK",
    category: "teknis",
    icon: MapPin,
  },
  {
    id: "item-12",
    question: "Apa yang dimaksud dengan Koefisien Tapak Basemen (KTB)?",
    answer:
      "Koefisien Tapak Basemen (KTB) adalah angka persentase berdasarkan perbandingan antara luas tapak basemen terhadap luas lahan perpetakan atau daerah perencanaan sesuai KRK.",
    category: "teknis",
    icon: Building,
  },
  {
    id: "item-13",
    question: "Apa yang dimaksud jarak bebas minimum Bangunan Gedung?",
    answer:
      "Jarak bebas minimum Bangunan Gedung meliputi:\n1. jarak Bangunan Gedung dengan batas persil, yaitu garis yang membatasi jarak bebas minimum dari bidang terluar suatu massa Bangunan Gedung dengan batas persil\n2. jarak antar-Bangunan Gedung, yaitu garis yang membatasi jarak bebas minimum dari bidang terluar suatu massa Bangunan Gedung dengan bidang terluar massa Bangunan Gedung lain dalam satu persil",
    category: "teknis",
    icon: MapPin,
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
