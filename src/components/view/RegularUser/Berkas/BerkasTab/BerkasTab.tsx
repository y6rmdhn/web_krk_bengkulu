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
import environment from "@/config/environment";

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
    dataListBerkas,
    isLoadingDataListBerkas,
  } = useBerkasTab();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUploadBerkas, setIsOpenUploadBerkas] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  const filteredData = useMemo(() => {
    if (!dataListBerkas) return [];

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = dataListBerkas.slice(startIndex, endIndex);

    return paginatedData.map((item: any, index: number) => {
      const rowNumber = startIndex + index + 1;

      return [
        rowNumber,
        <span className="whitespace-nowrap font-medium text-gray-700">
          {item.masterBerkas?.nama || "-"}
        </span>,
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 whitespace-nowrap"
        >
          Sudah Diupload
        </Badge>,
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            window.open(
              `${environment.API_URL_PDF}/${item.file_path}`,
              "_blank"
            )
          }
          className="gap-2 w-full md:w-auto"
        >
          <Eye size={14} />
          <span className="md:inline">Lihat</span>
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
    <Card className="rounded-lg border shadow-sm">
      <CardContent className="p-4 md:p-6 space-y-4">
        {/* Header Section: Stack on Mobile, Row on Desktop */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Berkas</h3>
          <Button
            className="bg-[#2451AA] hover:bg-[#1D4ED8] w-full md:w-auto"
            onClick={() => setIsOpenUploadBerkas(true)}
          >
            <Plus size={16} className="mr-2" />
            Upload Berkas
          </Button>
        </div>

        {/* Tabel Data Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[600px] px-4 md:px-0">
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
          </div>
        </div>

        {/* Dialog Tambah Master Berkas */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[95%] sm:max-w-[500px] rounded-xl">
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
                    className="bg-[#2451AA] hover:bg-[#1D4ED8] px-8 w-full sm:w-auto"
                    disabled={isPending}
                  >
                    {isPending ? <Spinner /> : "Simpan"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Dialog Upload Berkas */}
        <Dialog open={isOpenUploadBerkas} onOpenChange={setIsOpenUploadBerkas}>
          <DialogContent className="w-[95%] sm:max-w-[500px] rounded-xl">
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
                    className="bg-[#2451AA] hover:bg-[#1D4ED8] px-8 w-full sm:w-auto"
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
