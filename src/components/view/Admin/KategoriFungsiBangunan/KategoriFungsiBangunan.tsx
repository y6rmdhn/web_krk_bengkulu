import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Pencil, Trash, Check, X, Loader2, Plus } from "lucide-react";
import useDataTable from "@/hooks/useDataTable";
import { useMemo, useState } from "react";
import DropdownActions from "@/components/commons/DropdownActions";
import DataTable from "@/components/commons/DataTable";
import { useNavigate } from "react-router-dom";
import useJenisKategoriFungsiBangunan, {
  type JenisKategoriFungsiBangunan,
} from "./useKategoriFungsiBangunan";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/commons/FormInput";
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

const KategoriFungsiBangunan = () => {
  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  // Update destructuring variable names
  const {
    editData,
    isCreating,
    form,
    dataListKategoriFungsiBangunan,
    isLoadingListKategoriFungsiBangunan,
    // Edit
    isPendingEditKategori,
    handleEditJenisKategoriFungsiBangunan,
    handleEditClick,
    // Add
    isPendingAddJenisKategori,
    handleAddJenisKategori,
    handleCreateClick,
    // Delete
    isPendingDeleteJenisKategori,
    handleDeleteJenisKategori,
    // General
    handleCancel,
  } = useJenisKategoriFungsiBangunan();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const onFormSubmit = (values: JenisKategoriFungsiBangunan) => {
    if (isCreating) {
      handleAddJenisKategori(values);
    } else if (editData) {
      handleEditJenisKategoriFungsiBangunan(values);
    }
  };

  // Handler konfirmasi delete
  const confirmDelete = () => {
    if (deleteId) {
      handleDeleteJenisKategori(deleteId as string);
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const filteredResult = useMemo(() => {
    const data = dataListKategoriFungsiBangunan || [];
    return data.filter((item: any) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = item.nama && item.nama.toLowerCase().includes(term);
      return matchesSearch;
    });
  }, [dataListKategoriFungsiBangunan, searchTerm]);

  const totalPages = Math.ceil(filteredResult.length / currentLimit);

  const tableRows = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = filteredResult.slice(startIndex, endIndex);

    const normalRows = paginatedData.map((item: any, index: number) => {
      return [
        startIndex + index + 1,
        item?.nama || "-",
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
        key={`${mode}-nama`}
        form={form as any}
        name="nama"
        placeholder="Masukan Nama Permohonan"
        className="min-w-[250px]"
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
        renderInputRow("create", isPendingAddJenisKategori),
        ...normalRows,
      ];
    }

    if (editData) {
      return [renderInputRow("edit", isPendingEditKategori), ...normalRows];
    }

    return normalRows;
  }, [
    filteredResult,
    currentPage,
    currentLimit,
    navigate,
    editData,
    isCreating,
    isPendingEditKategori,
    isPendingAddJenisKategori,
    form,
    handleEditClick,
    handleCancel,
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
                  header={["No", "Nama", "Aksi"]}
                  isLoading={isLoadingListKategoriFungsiBangunan}
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
              disabled={isPendingDeleteJenisKategori}
            >
              {isPendingDeleteJenisKategori ? "Menghapus..." : "Ya, Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default KategoriFungsiBangunan;
