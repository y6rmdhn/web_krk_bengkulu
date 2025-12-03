import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Pencil, Trash, Check, X, Loader2, Plus } from "lucide-react";
import useDataTable from "@/hooks/useDataTable";
import { useMemo, useState } from "react";
import DropdownActions from "@/components/commons/DropdownActions";
import DataTable from "@/components/commons/DataTable";
import { useNavigate } from "react-router-dom";
import useJenisBangunan, {
  type IJenisFungsiBangunanSchema,
} from "./useJenisBangunan";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/commons/FormInput";
import { SelectFilter } from "@/components/commons/SelectForm/SelectForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const JenisPermohonan = () => {
  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  const {
    editData,
    isCreating,
    form,
    dataListJenisBangunan,
    isLoadingListJenisBangunan,

    dataListKategoriFungsiBangunan,
    isLoadingListKategoriFungsiBangunan,

    // Edit
    isPendingEditBangunan,
    handleEditJenisBangunan,
    handleEditClick,
    // Add
    isPendingAddJenisBangunan,
    handleAddJenisBangunan,
    handleCreateClick,
    // Delete
    isPendingDeleteJenisBangunan,
    handleDeleteJenisBangunan,
    // General
    handleCancel,
  } = useJenisBangunan();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // State untuk Dialog Delete
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const onFormSubmit = (values: IJenisFungsiBangunanSchema) => {
    if (isCreating) {
      handleAddJenisBangunan(values);
    } else if (editData) {
      handleEditJenisBangunan(values);
    }
  };

  // Handler konfirmasi delete
  const confirmDelete = () => {
    if (deleteId) {
      handleDeleteJenisBangunan(deleteId as string);
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const filteredResult = useMemo(() => {
    const data = dataListJenisBangunan || [];
    return data.filter((item: any) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        (item.nama && item.nama.toLowerCase().includes(term)) ||
        (item.kode && item.kode.toLowerCase().includes(term));

      let matchesStatus = true;
      if (statusFilter !== "all") {
        const isActiveFilter = statusFilter === "true";
        matchesStatus = item.is_active === isActiveFilter;
      }
      return matchesSearch && matchesStatus;
    });
  }, [dataListJenisBangunan, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredResult.length / currentLimit);

  const categoryOptions = useMemo(() => {
    if (!dataListKategoriFungsiBangunan) return [];
    return dataListKategoriFungsiBangunan.map((item: any) => ({
      label: item.nama || item.name || "Unknown",
      value: String(item.id),
    }));
  }, [dataListKategoriFungsiBangunan]);

  const tableRows = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = filteredResult.slice(startIndex, endIndex);

    const normalRows = paginatedData.map((item: any, index: number) => {
      const namaKategori =
        dataListKategoriFungsiBangunan?.find(
          (k: any) => String(k.id) === String(item.kategori_id)
        )?.nama || "-";

      return [
        startIndex + index + 1,
        item?.kode || "-",
        item?.nama || "-",
        namaKategori,
        <DropdownActions
          key={`action-${item.id}`}
          menu={[
            {
              label: (
                <span className="flex items-center gap-2">
                  <Pencil size={16} /> Edit
                </span>
              ),
              action: () => handleEditClick(item),
            },
            {
              label: (
                <span className="flex items-center gap-2 text-red-600">
                  <Trash size={16} /> Delete
                </span>
              ),
              action: () => {
                setDeleteId(item.id);
                setIsDeleteDialogOpen(true);
              },
            },
          ]}
        />,
      ];
    });

    const renderInputRow = (mode: "create" | "edit", isLoading: boolean) => [
      <span key={`${mode}-label`} className="font-bold text-blue-600">
        {mode === "create" ? "New" : "Edit"}
      </span>,
      <FormInput
        key={`${mode}-kode`}
        form={form as any}
        name="kode"
        placeholder="Kode"
        className="min-w-[100px]"
      />,
      <FormInput
        key={`${mode}-nama`}
        form={form as any}
        name="nama"
        placeholder="Masukan Nama Permohonan"
        className="min-w-[250px]"
      />,
      <SelectFilter
        key={`${mode}-kategori-${editData?.id || "new"}-${categoryOptions.length}`}
        form={form as any}
        name="kategori_id"
        options={categoryOptions}
        placeholder={
          isLoadingListKategoriFungsiBangunan ? "Loading..." : "Pilih Kategori"
        }
        selectStyle="h-10 w-[200px]"
      />,
      <div key={`${mode}-actions`} className="flex gap-2">
        <Button
          size="sm"
          type="submit"
          className="h-9 w-9 p-0 bg-green-600 hover:bg-green-700"
          disabled={isLoading}
          title="Simpan"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Check size={16} />
          )}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="h-9 w-9 p-0"
          onClick={(e) => {
            e.preventDefault();
            handleCancel();
          }}
          title="Batal"
          type="button"
        >
          <X size={16} />
        </Button>
      </div>,
    ];

    if (isCreating) {
      return [
        renderInputRow("create", isPendingAddJenisBangunan),
        ...normalRows,
      ];
    }

    if (editData) {
      return [renderInputRow("edit", isPendingEditBangunan), ...normalRows];
    }

    return normalRows;
  }, [
    filteredResult,
    currentPage,
    currentLimit,
    navigate,
    editData,
    isCreating,
    isPendingEditBangunan,
    isPendingAddJenisBangunan,
    form,
    handleEditClick,
    handleCancel,
    categoryOptions,
    isLoadingListKategoriFungsiBangunan,
  ]);

  return (
    <AdminLayout
      title="Admin Jenis Permohonan | KRK Kota Bengkulu"
      desc="Master Data Jenis Permohonan"
    >
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari nama / kode..."
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
                <SelectItem value="true">Aktif</SelectItem>
                <SelectItem value="false">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleCreateClick}
            disabled={isCreating || !!editData}
            className="bg-blue-600 hover:bg-blue-700 w-full lg:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Permohonan
          </Button>
        </div>

        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">
                Daftar Jenis Permohonan ({filteredResult.length})
              </h1>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onFormSubmit)}>
                <DataTable
                  header={[
                    "No",
                    "Kode",
                    "Nama Fungsi Bangunan",
                    "Kategori",
                    "Aksi",
                  ]}
                  isLoading={isLoadingListJenisBangunan}
                  data={tableRows}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  currentLimit={currentLimit}
                  onChangePage={handleChangePage}
                  onChangeLimit={handleLimitChange}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data permohonan ini akan
              dihapus permanen dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isPendingDeleteJenisBangunan}
            >
              {isPendingDeleteJenisBangunan ? "Menghapus..." : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default JenisPermohonan;
