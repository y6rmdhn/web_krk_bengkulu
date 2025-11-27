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
import { Plus } from "lucide-react";
import useDataTable from "@/hooks/useDataTable";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/commons/FormInput";

// ... dummyData tetap sama ...
const dummyData = [
  {
    no: "1",
    keterangan: "Surat Permohonan Pengajuan KRK",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
];

const BerkasTab = () => {
  const { data, handleSubmitData, isLoading, form } = useBerkasTab();

  // State untuk kontrol Modal/Dialog
  const [isOpen, setIsOpen] = useState(false);

  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  // useMemo kembali bersih, hanya untuk mapping data tabel
  const filteredData = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = dummyData.slice(startIndex, endIndex);

    return paginatedData.map((item) => {
      return [
        item.no,
        item.keterangan,
        <Badge
          variant={item.status === "sudah diupload" ? "outline" : "destructive"}
        >
          {item.status}
        </Badge>,
        item.uploadBerkas,
      ];
    });
  }, [dummyData, currentPage, currentLimit]);

  const totalPages = Math.ceil(dummyData.length / currentLimit);

  const onSubmit = (values: any) => {
    handleSubmitData(values);
    setIsOpen(false);
  };

  return (
    <Card className="rounded-t-none border-t-0">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Daftar Berkas</h3>
          <Button onClick={() => setIsOpen(true)}>
            <Plus size={16} className="mr-2" />
            Tambah Berkas
          </Button>
        </div>

        {/* Tabel Data */}
        <DataTable
          header={["No", "Keterangan", "Status", "Upload Berkas"]}
          isLoading={false}
          data={filteredData}
          totalPages={totalPages}
          currentPage={currentPage}
          currentLimit={currentLimit}
          onChangePage={handleChangePage}
          onChangeLimit={handleLimitChange}
        />

        {/* --- DIALOG / POP UP FORM --- */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Berkas Baru</DialogTitle>
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
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#2451AA] hover:bg-[#1D4ED8] px-8"
                  >
                    Simpan
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
