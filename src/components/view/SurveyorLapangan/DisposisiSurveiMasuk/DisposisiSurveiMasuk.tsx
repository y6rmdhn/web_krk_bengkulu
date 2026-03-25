import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
import useDataTable from "@/hooks/useDataTable";
import { useMemo, useState } from "react";
import DropdownActions from "@/components/commons/DropdownActions";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/commons/DataTable";
import { useNavigate } from "react-router-dom";
import useDisposisiSurveiMasuk from "./useDisposisiSurveiMasuk";
import SurveyorLayout from "@/components/layouts/SurveyorLayout";
import { getStatusConfig } from "@/constants/status.constant";

const DisposisiSurveiMasuk = () => {
  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();
  const { dataListPermohonanKrk, isLoadingListPermohonanKrk } =
    useDisposisiSurveiMasuk();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredResult = useMemo(() => {
    const data = dataListPermohonanKrk || [];

    return data.filter((item: any) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        (item.nomor_permohonan &&
          item.nomor_permohonan.toLowerCase().includes(term)) ||
        (item.nama_pemilik && item.nama_pemilik.toLowerCase().includes(term)) ||
        (item.user?.name && item.user.name.toLowerCase().includes(term));

      return matchesSearch;
    });
  }, [dataListPermohonanKrk, searchTerm]);

  const totalPages = Math.ceil(filteredResult.length / currentLimit);

  const tableRows = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;

    const paginatedData = filteredResult.slice(startIndex, endIndex);

    return paginatedData.map((item: any, index: number) => {
      const { color: badgeColor, label: statusLabel } = getStatusConfig(
        item.status,
      );

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

        <Badge
          key={`badge-${item.id}`}
          variant="outline"
          className={`whitespace-nowrap ${badgeColor}`}
        >
          {statusLabel}
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
  }, [filteredResult, currentPage, currentLimit, navigate]);

  return (
    <SurveyorLayout
      title="Disposisi Masuk | KRK Kota Bengkulu"
      desc="Disposisi Masuk"
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
          </div>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">
                Daftar Disposisi Masuk ({filteredResult.length})
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
    </SurveyorLayout>
  );
};

export default DisposisiSurveiMasuk;
