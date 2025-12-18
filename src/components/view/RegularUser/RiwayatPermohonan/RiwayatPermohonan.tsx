import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  FileText,
  Pencil,
  FileCheck,
  Bell,
  X, // Tambahkan import icon X
} from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import useDataTable from "@/hooks/useDataTable";
import { useNavigate } from "react-router-dom";
import useRiwayatPermohonan from "./useRiwayatPermohonan";
import DropdownActions from "@/components/commons/DropdownActions";
import DataTable from "@/components/commons/DataTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RiwayatPermohonan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [jenisFilter, setJenisFilter] = useState("semua");

  // State baru untuk mengontrol visibilitas notifikasi
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const navigate = useNavigate();

  const { dataListPermohonanKrk, isLoadingListPermohonanKrk } =
    useRiwayatPermohonan();

  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  // --- Logic Filtering ---
  const filteredResult = useMemo(() => {
    const data = dataListPermohonanKrk || [];
    return data.filter((item: any) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        (item.nomor_permohonan &&
          item.nomor_permohonan.toLowerCase().includes(term)) ||
        (item.nama_pemilik && item.nama_pemilik.toLowerCase().includes(term)) ||
        (item.no_pbb && item.no_pbb.toLowerCase().includes(term)) ||
        (item.user?.name && item.user.name.toLowerCase().includes(term));
      const matchesStatus =
        statusFilter === "semua" || item.status === statusFilter;
      const matchesJenis =
        jenisFilter === "semua" || item.jenisLayanan?.nama === jenisFilter;
      return matchesSearch && matchesStatus && matchesJenis;
    });
  }, [dataListPermohonanKrk, searchTerm, statusFilter, jenisFilter]);

  const totalPages = Math.ceil(filteredResult.length / currentLimit);

  // Cek jika ada SK yang baru terbit (Status APPROVED)
  const hasNewSK = useMemo(() => {
    return filteredResult.some((item: any) => item.status === "APPROVED");
  }, [filteredResult]);

  const getBadgeColor = (status: string) => {
    if (status === "PENDING_OPERATOR")
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (status === "APPROVED")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "REJECTED") return "bg-red-100 text-red-700 border-red-200";
    return "bg-gray-100 text-gray-700";
  };

  // --- Data Table Rows ---
  const tableRows = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = filteredResult.slice(startIndex, endIndex);

    return paginatedData.map((item: any, index: number) => {
      let menuActions = [];

      if (item.status === "APPROVED") {
        menuActions = [
          {
            label: (
              <span className="flex items-center gap-2 text-blue-600 font-medium">
                <FileCheck size={16} /> Lihat SK
              </span>
            ),
            action: () => navigate(`/preview-sk/${item.id}`),
          },
        ];
      } else {
        menuActions = [
          {
            label: (
              <span className="flex items-center gap-2">
                <Eye size={16} /> Detail
              </span>
            ),
            action: () => navigate(`/riwayat-permohonan/detail/${item.id}`),
          },
          {
            label: (
              <span className="flex items-center gap-2">
                <Pencil size={16} /> Edit
              </span>
            ),
            action: () => navigate(`/permohonan-krk/edit/${item.id}`),
          },
        ];
      }

      return [
        startIndex + index + 1,
        <div className="flex flex-col">
          <span className="font-medium whitespace-nowrap">
            {item.nomor_permohonan || "-"}
          </span>
          <span className="text-xs text-gray-500">
            PBB: {item.no_pbb || "-"}
          </span>
        </div>,
        <span className="whitespace-nowrap">
          {item.submitted_at
            ? new Date(item.submitted_at).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </span>,
        <span className="whitespace-nowrap">
          {item.nama_pemilik || item.user?.name || "-"}
        </span>,
        <Badge
          key={`badge-${item.id}`}
          variant="outline"
          className={`whitespace-nowrap ${getBadgeColor(item.status)}`}
        >
          {item.current_step_name || item.status}
        </Badge>,
        <DropdownActions key={`action-${item.id}`} menu={menuActions} />,
      ];
    });
  }, [filteredResult, currentPage, currentLimit, navigate]);

  return (
    <MainLayout title="Riwayat Permohonan | KRK Bengkulu" isBgGray isPaddingY>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notifikasi SK Terbit (Updated) */}
        {hasNewSK && isAlertVisible && (
          <Alert className="mb-6 bg-green-50 border-green-200 text-green-800 pr-10 relative">
            <Bell className="h-4 w-4" />
            <AlertTitle>Dokumen SK Terbit!</AlertTitle>
            <AlertDescription>
              Selamat! Salah satu atau beberapa permohonan Anda telah disetujui.
              Silakan unduh dokumen SK pada tabel di bawah.
            </AlertDescription>
            {/* Tombol Close */}
            <button
              onClick={() => setIsAlertVisible(false)}
              className="absolute top-4 right-4 text-green-700 hover:text-green-900 transition-colors p-1 rounded-full hover:bg-green-100"
              aria-label="Tutup notifikasi"
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        )}

        {/* Header & Filter */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Riwayat Permohonan
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Kelola permohonan KRK dan PBB yang diajukan
              </p>
            </div>
            <div className="flex items-center self-start md:self-auto gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Total {filteredResult.length} Data
              </span>
            </div>
          </div>
        </div>

        {/* ... Sisa komponen filter dan table sama seperti sebelumnya ... */}

        <Card className="mb-6 border-0 shadow-md bg-white rounded-2xl">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Cari No. Permohonan / Nama / No. PBB..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleChangePage(1);
                  }}
                  className="pl-10 rounded-xl border-gray-200 focus:ring-green-500"
                />
              </div>
              <Select
                value={statusFilter}
                onValueChange={(val) => {
                  setStatusFilter(val);
                  handleChangePage(1);
                }}
              >
                <SelectTrigger className="rounded-xl border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Filter size={16} />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Status</SelectItem>
                  <SelectItem value="APPROVED">Selesai</SelectItem>
                  <SelectItem value="PENDING_OPERATOR">
                    Proses Operator
                  </SelectItem>
                  <SelectItem value="REJECTED">Ditolak</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={jenisFilter}
                onValueChange={(val) => {
                  setJenisFilter(val);
                  handleChangePage(1);
                }}
              >
                <SelectTrigger className="rounded-xl border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText size={16} />
                    <SelectValue placeholder="Jenis" />
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
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-0 shadow-lg bg-white rounded-2xl overflow-hidden">
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px] align-middle inline-block min-w-full">
                <DataTable
                  header={[
                    "No",
                    "No. Pengajuan & PBB",
                    "Tanggal Masuk",
                    "Nama Pemohon",
                    "Status",
                    "Aksi",
                  ]}
                  isLoading={isLoadingListPermohonanKrk}
                  data={tableRows}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  currentLimit={currentLimit}
                  onChangePage={handleChangePage}
                  onChangeLimit={handleLimitChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
