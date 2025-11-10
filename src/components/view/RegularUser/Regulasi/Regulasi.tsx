import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import RegulasiList from "./RegulasiList/RegulasiList";

const regulasiData = [
  {
    id: 1,
    title:
      "Undang - Undang Republik Indonesia Nomor 14 Tahun 2008 Tentang Keterbukaan Informasi Publik",
    fileUrl: "/path/to/your/file1.pdf",
    type: "uu",
    year: 2008,
    category: "informasi",
    size: "2.4 MB",
  },
  {
    id: 2,
    title:
      "Undang - Undang Republik Indonesia Nomor 25 Tahun 2009 Tentang Pelayanan Publik",
    fileUrl: "/path/to/your/file2.pdf",
    type: "uu",
    year: 2009,
    category: "pelayanan",
    size: "1.8 MB",
  },
  {
    id: 3,
    title:
      "Undang - Undang Republik Indonesia Nomor 28 Tahun 2002 Tentang Bangunan Gedung",
    fileUrl: "/path/to/your/file3.pdf",
    type: "uu",
    year: 2002,
    category: "bangunan",
    size: "3.2 MB",
  },
  {
    id: 4,
    title:
      "Peraturan Pemerintah Republik Indonesia Nomor 36 Tahun 2005 Tentang Peraturan Pelaksanaan Undang - Undang Nomor 28 Tahun 2002 Tentang Bangunan Gedung",
    fileUrl: "/path/to/your/file4.pdf",
    type: "pp",
    year: 2005,
    category: "bangunan",
    size: "2.1 MB",
  },
  {
    id: 5,
    title:
      "Peraturan Pemerintah Republik Indonesia Nomor 53 Tahun 2010 Tentang Disiplin Pegawai Negeri Sipil",
    fileUrl: "/path/to/your/file5.pdf",
    type: "pp",
    year: 2010,
    category: "kepegawaian",
    size: "1.5 MB",
  },
  {
    id: 6,
    title:
      "Peraturan Daerah Kota Bengkulu Nomor 4 Tahun 2018 Tentang Rencana Tata Ruang Wilayah",
    fileUrl: "/path/to/your/file6.pdf",
    type: "perda",
    year: 2018,
    category: "tata-ruang",
    size: "4.2 MB",
  },
];

export default function Regulasi() {
  return (
    <MainLayout title="Regulasi | KRK Bengkulu">
      <div className="min-h-[81vh] bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                Dokumen Hukum dan Peraturan
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Daftar Regulasi
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                KRK Online
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Akses berbagai peraturan dan regulasi terkait pelayanan Keterangan
              Rencana Kota
            </p>
          </div>

          <div className="">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        Daftar Regulasi
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {regulasiData.length} regulasi ditemukan
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pb-8">
                  {/* Regulasi List */}
                  <RegulasiList regulasiData={regulasiData} />

                  {/* Pagination */}
                  {regulasiData.length > 0 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent className="flex gap-1">
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              className="rounded-xl border-gray-300"
                            />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" className="rounded-xl">
                              1
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              href="#"
                              isActive
                              className="rounded-xl bg-blue-600 text-white border-blue-600"
                            >
                              2
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" className="rounded-xl">
                              3
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" className="rounded-xl">
                              4
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" className="rounded-xl">
                              5
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#" className="rounded-xl">
                              11
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              className="rounded-xl border-gray-300"
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
