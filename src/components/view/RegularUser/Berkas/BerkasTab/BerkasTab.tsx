import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import useBerkasTab from "./useBerkastab";
import DataTable from "@/components/commons/DataTable";
import { useMemo, useState } from "react";
import { Plus, Eye } from "lucide-react";
import useDataTable from "@/hooks/useDataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/commons/FormInput";
import FormFieldSelect from "@/components/commons/FormFieldSelect";
import InputFile from "@/components/commons/InputFile";
import { Spinner } from "@/components/ui/spinner";

const BerkasTab = () => {
  const {
    handleSubmitData,
    form,
    uploadFormBerkas,
    handleUploadBerkas,
    isPendingUploadBerkas,
    dataMaster,
    isLoadingDataMaster,
    isPending,
    dataListBerkas, // Data dari API
    isLoadingDataListBerkas, // Loading state dari API
  } = useBerkasTab();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUploadBerkas, setIsOpenUploadBerkas] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  // --- LOGIKA MAPPING DATA DARI API ---
  const filteredData = useMemo(() => {
    // Jika data belum ada, kembalikan array kosong
    if (!dataListBerkas) return [];

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = dataListBerkas.slice(startIndex, endIndex);

    return paginatedData.map((item: any, index: number) => {
      const rowNumber = startIndex + index + 1;

      return [
        rowNumber,
        item.masterBerkas?.nama || "-",
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Sudah Diupload
        </Badge>,
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(item.file_path, "_blank")}
          className="gap-2"
        >
          <Eye size={14} />
          Lihat File
        </Button>,
      ];
    });
  }, [dataListBerkas, currentPage, currentLimit]);

  const totalPages = Math.ceil((dataListBerkas?.length || 0) / currentLimit);

  const onSubmit = (values: any) => {
    handleSubmitData(values);
    setIsOpen(false);
  };

  const onSubmitUploadBerkas = (values: any) => {
    if (!file && !values.file) return;

    handleUploadBerkas(values);

    setIsOpenUploadBerkas(false);
    setFile(null);
  };

  return (
    <Card className="rounded-t-none border-t-0">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Daftar Berkas</h3>
          <div className="flex gap-2">
            <Button onClick={() => setIsOpen(true)}>
              <Plus size={16} className="mr-2" />
              Tambah Master
            </Button>
            <Button onClick={() => setIsOpenUploadBerkas(true)}>
              <Plus size={16} className="mr-2" />
              Upload Berkas
            </Button>
          </div>
        </div>

        {/* Tabel Data */}
        <DataTable
          header={["No", "Keterangan", "Status", "Aksi"]}
          isLoading={isLoadingDataListBerkas}
          data={filteredData}
          totalPages={totalPages}
          currentPage={currentPage}
          currentLimit={currentLimit}
          onChangePage={handleChangePage}
          onChangeLimit={handleLimitChange}
        />

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Master Berkas Baru</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormInput
                  form={form}
                  label="Kode"
                  name="kode"
                  placeholder="Masukan Kode"
                />

                <FormInput
                  form={form}
                  label="Nama Berkas"
                  name="nama"
                  placeholder="Masukan Nama Berkas"
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#2451AA] hover:bg-[#1D4ED8] px-8"
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Simpan"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isOpenUploadBerkas} onOpenChange={setIsOpenUploadBerkas}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Upload Berkas</DialogTitle>
            </DialogHeader>

            <Form {...uploadFormBerkas}>
              <form
                onSubmit={uploadFormBerkas.handleSubmit(onSubmitUploadBerkas)}
                className="space-y-4"
              >
                <FormFieldSelect
                  form={uploadFormBerkas}
                  name="master_berkas_id"
                  label="Nama Berkas"
                  placeholder={
                    isLoadingDataMaster ? "Memuat..." : "--Pilih Berkas--"
                  }
                  options={
                    dataMaster?.map((item: { nama: string; id: string }) => ({
                      label: item.nama,
                      value: item.id,
                    })) || []
                  }
                />

                <InputFile
                  form={uploadFormBerkas}
                  label="Upload File Berkas"
                  name="file"
                  accept=".pdf"
                  selectedFile={file}
                  setSelectedFile={setFile}
                />

                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-[#2451AA] hover:bg-[#1D4ED8] px-8"
                    disabled={isPendingUploadBerkas}
                  >
                    {isPendingUploadBerkas ? <Spinner /> : "Simpan"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BerkasTab;
