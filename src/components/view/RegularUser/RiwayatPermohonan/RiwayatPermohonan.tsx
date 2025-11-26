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
import { Search, Filter, Eye, FileText, Pencil } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import useDataTable from "@/hooks/useDataTable";
import { useNavigate } from "react-router-dom";
import useRiwayatPermohonan from "./useRiwayatPermohonan";
import DropdownActions from "@/components/commons/DropdownActions";
import DataTable from "@/components/commons/DataTable";

export default function RiwayatPermohonan() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [jenisFilter, setJenisFilter] = useState("semua");

  const navigate = useNavigate();
  const { dataListPermohonanKrk, isLoadingListPermohonanKrk } =
    useRiwayatPermohonan();
  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  const filteredResult = useMemo(() => {
    const data = dataListPermohonanKrk || [];

    return data.filter((item: any) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        (item.nomor_permohonan &&
          item.nomor_permohonan.toLowerCase().includes(term)) ||
        (item.nama_pemilik && item.nama_pemilik.toLowerCase().includes(term)) ||
        (item.user?.name && item.user.name.toLowerCase().includes(term));

      const matchesStatus =
        statusFilter === "semua" || item.status === statusFilter;

      const matchesJenis =
        jenisFilter === "semua" || item.jenisLayanan?.nama === jenisFilter;

      return matchesSearch && matchesStatus && matchesJenis;
    });
  }, [dataListPermohonanKrk, searchTerm, statusFilter, jenisFilter]);

  const totalPages = Math.ceil(filteredResult.length / currentLimit);

  const tableRows = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;

    const paginatedData = filteredResult.slice(startIndex, endIndex);

    return paginatedData.map((item: any, index: number) => {
      let badgeColor = "bg-gray-100 text-gray-700";
      if (item.status === "PENDING_OPERATOR")
        badgeColor = "bg-yellow-100 text-yellow-700 border-yellow-200";
      else if (item.status === "APPROVED")
        badgeColor = "bg-green-100 text-green-700 border-green-200";
      else if (item.status === "REJECTED")
        badgeColor = "bg-red-100 text-red-700 border-red-200";

      return [
        startIndex + index + 1,

        item.nomor_permohonan || "-",

        item.submitted_at
          ? new Date(item.submitted_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",

        item.nama_pemilik || item.user?.name || "-",

        item.jenisLayanan?.nama || "-",

        <Badge
          key={`badge-${item.id}`}
          variant="outline"
          className={badgeColor}
        >
          {item.current_step_name || item.status}
        </Badge>,

        <DropdownActions
          key={`action-${item.id}`}
          menu={[
            {
              label: (
                <span className="flex items-center gap-2">
                  <Eye size={16} />
                  Detail / Verifikasi
                </span>
              ),
              action: () => {
                navigate(`/riwayat-permohonan/detail/${item.id}`);
              },
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  <Pencil size={16} />
                  Edit Permohonan
                </span>
              ),
              action: () => {
                navigate(`/permohonan-krk/edit/${item.id}`);
              },
            },
          ]}
        />,
      ];
    });
  }, [filteredResult, currentPage, currentLimit, navigate]);

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
                Total {filteredResult.length} Permohonan
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
                    placeholder="Cari No. Permohonan atau Nama Pemohon..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleChangePage(1);
                    }}
                    className="pl-10 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Select
                  value={statusFilter}
                  onValueChange={(val) => {
                    setStatusFilter(val);
                    handleChangePage(1);
                  }}
                >
                  <SelectTrigger className="rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Filter Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Status</SelectItem>
                    <SelectItem value="APPROVED">Selesai (Approved)</SelectItem>
                    <SelectItem value="PENDING_OPERATOR">
                      Proses Operator
                    </SelectItem>
                    <SelectItem value="REJECTED">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Jenis Filter */}
              <div>
                <Select
                  value={jenisFilter}
                  onValueChange={(val) => {
                    setJenisFilter(val);
                    handleChangePage(1);
                  }}
                >
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
            <DataTable
              header={[
                "No",
                "No. Pengajuan",
                "Tanggal Masuk",
                "Nama Pemohon",
                "Jenis Layanan",
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
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
