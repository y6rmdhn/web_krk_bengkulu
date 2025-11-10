import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Eye,
  Calendar,
  FileText,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";

// Mock data untuk riwayat permohonan
const riwayatData = [
  {
    id: "KRK/2024/00123",
    tanggal: "2024-01-15",
    jenis: "Perumahan",
    lokasi: "Jl. Merdeka No. 123, Bengkulu",
    status: "selesai",
    statusText: "Selesai",
    berkas: "lengkap",
    lastUpdate: "2024-01-20 14:30",
  },
  {
    id: "KRK/2024/00124",
    tanggal: "2024-01-16",
    jenis: "Komersial",
    lokasi: "Jl. Sudirman No. 45, Bengkulu",
    status: "ditolak",
    statusText: "Ditolak",
    berkas: "tidak-lengkap",
    lastUpdate: "2024-01-18 10:15",
  },
  {
    id: "KRK/2024/00125",
    tanggal: "2024-01-17",
    jenis: "Industri",
    lokasi: "Jl. Gatot Subroto No. 67, Bengkulu",
    status: "proses",
    statusText: "Dalam Proses",
    berkas: "lengkap",
    lastUpdate: "2024-01-19 09:45",
  },
  {
    id: "KRK/2024/00126",
    tanggal: "2024-01-18",
    jenis: "Perumahan",
    lokasi: "Jl. Pahlawan No. 89, Bengkulu",
    status: "selesai",
    statusText: "Selesai",
    berkas: "lengkap",
    lastUpdate: "2024-01-22 16:20",
  },
  {
    id: "KRK/2024/00127",
    tanggal: "2024-01-19",
    jenis: "Komersial",
    lokasi: "Jl. Veteran No. 34, Bengkulu",
    status: "proses",
    statusText: "Dalam Proses",
    berkas: "perbaikan",
    lastUpdate: "2024-01-21 11:30",
  },
];

const statusConfig = {
  selesai: { color: "bg-green-100 text-green-800 border-green-200" },
  ditolak: { color: "bg-red-100 text-red-800 border-red-200" },
  proses: { color: "bg-blue-100 text-blue-800 border-blue-200" },
};

const berkasConfig = {
  lengkap: {
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    text: "Lengkap",
  },
  "tidak-lengkap": {
    color: "bg-red-100 text-red-800 border-red-200",
    text: "Tidak Lengkap",
  },
  perbaikan: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    text: "Perlu Perbaikan",
  },
};

export default function RiwayatPermohonan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [jenisFilter, setJenisFilter] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data
  const filteredData = riwayatData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "semua" || item.status === statusFilter;
    const matchesJenis = jenisFilter === "semua" || item.jenis === jenisFilter;

    return matchesSearch && matchesStatus && matchesJenis;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetail = (id: string) => {
    console.log(`View detail: ${id}`);
    // Implement view detail logic here
  };

  return (
    <MainLayout title="Riwayat Permohonan | KRK Bengkulu" isBgGray isPaddingY>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Riwayat Permohonan KRK
              </h1>
              <p className="text-gray-600 mt-2">
                Lihat dan kelola semua permohonan KRK yang telah diajukan
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-white/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Total {filteredData.length} Permohonan
              </span>
            </div>
          </div>
        </div>

        {/* Filter dan Search Section */}
        <Card className="mb-6 border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    placeholder="Cari ID Permohonan atau Lokasi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Filter Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Status</SelectItem>
                    <SelectItem value="selesai">Selesai</SelectItem>
                    <SelectItem value="proses">Dalam Proses</SelectItem>
                    <SelectItem value="ditolak">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Jenis Filter */}
              <div>
                <Select value={jenisFilter} onValueChange={setJenisFilter}>
                  <SelectTrigger className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <SelectValue placeholder="Jenis Permohonan" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Jenis</SelectItem>
                    <SelectItem value="Perumahan">Perumahan</SelectItem>
                    <SelectItem value="Komersial">Komersial</SelectItem>
                    <SelectItem value="Industri">Industri</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <Table>
              <TableHeader className="bg-gray-50/80">
                <TableRow>
                  <TableHead className="font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      ID Permohonan
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      Tanggal
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Jenis
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      Lokasi
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status Berkas
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900 text-right">
                    Aksi
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((item) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {item.id}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          {new Date(item.tanggal).toLocaleDateString("id-ID")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {item.jenis}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 max-w-xs truncate">
                        {item.lokasi}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            berkasConfig[
                              item.berkas as keyof typeof berkasConfig
                            ].color
                          } border`}
                        >
                          {
                            berkasConfig[
                              item.berkas as keyof typeof berkasConfig
                            ].text
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            statusConfig[
                              item.status as keyof typeof statusConfig
                            ].color
                          } border font-medium`}
                        >
                          {item.statusText}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetail(item.id)}
                            className="rounded-lg border-gray-300 hover:bg-gray-50"
                          >
                            <Eye size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <FileText size={48} className="text-gray-300" />
                        <p>Tidak ada data permohonan yang ditemukan</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Menampilkan {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, filteredData.length)} dari{" "}
              {filteredData.length} permohonan
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border-gray-300"
              >
                <ChevronLeft size={16} />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg ${
                      currentPage === page
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border-gray-300"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <FileText className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {riwayatData.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Permohonan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      riwayatData.filter((item) => item.status === "selesai")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Selesai</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                  <Eye className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      riwayatData.filter((item) => item.status === "proses")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Dalam Proses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="text-red-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      riwayatData.filter((item) => item.status === "ditolak")
                        .length
                    }
                  </p>
                  <p className="text-sm text-gray-600">Ditolak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
