import OperatorLayout from "@/components/layouts/OperatorLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Search } from "lucide-react";
import useDataTable from "@/hooks/useDataTable";
import { useMemo, useState } from "react";
import usePermohonan from "./usePermohonanDitolak";
import DropdownActions from "@/components/commons/DropdownActions";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/commons/DataTable";
import { useNavigate } from "react-router-dom";

const PermohonanDitolak = () => {
  const { dataListPermohonanKrk, isLoadingListPermohonanKrk } = usePermohonan();
  const navigate = useNavigate();
  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [dataListPermohonanKrk, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredResult.length / currentLimit);

  const tableRows = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;

    const paginatedData = filteredResult.slice(startIndex, endIndex);

    return paginatedData.map((item: any, index: number) => {
      let badgeColor = "bg-gray-100 text-gray-700";
      if (item.status === "PENDING_OPERATOR") {
        badgeColor =
          "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200";
      } else if (item.status === "APPROVED") {
        badgeColor =
          "bg-green-100 text-green-700 border-green-200 hover:bg-green-200";
      } else if (item.status === "REJECTED") {
        badgeColor = "bg-red-100 text-red-700 border-red-200 hover:bg-red-200";
      }

      return [
        startIndex + index + 1,

        item.nomor_permohonan,

        new Date(item.submitted_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),

        item.nama_pemilik || item.user?.name || "-",

        item.jenisLayanan?.nama || "-",

        <Badge
          key={`badge-${item.id}`}
          variant="outline"
          className={badgeColor}
        >
          {item.status}
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
                navigate(`/operator/detail/${item.id}`);
              },
            },
          ]}
        />,
      ];
    });
  }, [filteredResult, currentPage, currentLimit, navigate]);

  return (
    <OperatorLayout
      title="Operator Permohonan Masuk | KRK Kota Bengkulu"
      desc="Permohonan Masuk"
    >
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-start">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari pemohon / no pengajuan..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleChangePage(1);
                }}
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val);
                handleChangePage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="PENDING_OPERATOR">
                  Menunggu Verifikasi
                </SelectItem>
                <SelectItem value="APPROVED">Disetujui</SelectItem>
                <SelectItem value="REJECTED">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">
                Daftar Permohonan KRK ({filteredResult.length})
              </h1>
            </div>
          </CardHeader>
          <CardContent>
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
    </OperatorLayout>
  );
};

export default PermohonanDitolak;
