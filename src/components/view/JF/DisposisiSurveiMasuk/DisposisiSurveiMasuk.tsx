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
import { useMemo } from "react";
import DropdownActions from "@/components/commons/DropdownActions";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/commons/DataTable";
import { useNavigate } from "react-router-dom";
import useDisposisiSurveiMasuk from "./useDisposisiSurveiMasuk";
import JFLayout from "@/components/layouts/JFLayout";

const DisposisiSurveiMasuk = () => {
  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();
  const { dataListPermohonanKrk, isLoadingListPermohonanKrk } =
    useDisposisiSurveiMasuk();
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = (dataListPermohonanKrk || []).slice(
      startIndex,
      endIndex
    );

    return paginatedData.map((item: any, index: number) => {
      const isPending = item.status === "PENDING_OPERATOR";

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
          className={
            isPending
              ? "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200"
              : "bg-gray-100 text-gray-700"
          }
        >
          {item.current_step_name}
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
                navigate(`/jf/detail/${item.id}`);
              },
            },
          ]}
        />,
      ];
    });
  }, [dataListPermohonanKrk, currentPage, currentLimit]);

  const totalPages = Math.ceil(
    (dataListPermohonanKrk?.length || 0) / currentLimit
  );

  return (
    <JFLayout
      title="Admin Permohonan Masuk | KRK Kota Bengkulu"
      desc="Permohonan Masuk"
    >
      <div className="mt-10 flex flex-col gap-6">
        {/* Filter Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-start">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari pemohon / no pengajuan..."
                className="pl-10"
              />
            </div>

            <Select>
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

        {/* Table Section */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Daftar Permohonan KRK</h1>
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
              data={filteredData}
              totalPages={totalPages}
              currentPage={currentPage}
              currentLimit={currentLimit}
              onChangePage={handleChangePage}
              onChangeLimit={handleLimitChange}
            />
          </CardContent>
        </Card>
      </div>
    </JFLayout>
  );
};

export default DisposisiSurveiMasuk;
