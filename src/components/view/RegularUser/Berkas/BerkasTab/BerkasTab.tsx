import InputField from "@/components/commons/InputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useBerkasTab from "./useBerkastab";
import { Label } from "@/components/ui/label";
import DataTable from "@/components/commons/DataTable";
import DropdownActions from "@/components/commons/DropdownActions";
import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const BerkasTab = () => {
  const { berkasForm, handleFileUpload, previewFile } = useBerkasTab();

  // State untuk pagination
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Dummy data yang lebih lengkap
  const dummyData = [
    { no: "1", keterangan: "KTP - Kartu Tanda Penduduk" },
    { no: "2", keterangan: "NPWP - Nomor Pokok Wajib Pajak" },
    { no: "3", keterangan: "SIM - Surat Izin Mengemudi" },
    { no: "4", keterangan: "Passport" },
    { no: "5", keterangan: "Ijazah Terakhir" },
    { no: "6", keterangan: "Transkrip Nilai" },
    { no: "7", keterangan: "Sertifikat Keahlian" },
    { no: "8", keterangan: "Sertifikat Bahasa Inggris" },
    { no: "9", keterangan: "Sertifikat Komputer" },
    { no: "10", keterangan: "Surat Pengalaman Kerja" },
    { no: "11", keterangan: "Rekomendasi dari Atasan" },
    { no: "12", keterangan: "Sertifikat Training" },
    { no: "13", keterangan: "Portfolio Projek" },
    { no: "14", keterangan: "Sertifikat Profesional" },
    { no: "15", keterangan: "Lisensi Keahlian" },
    { no: "16", keterangan: "Sertifikat Vendor" },
    { no: "17", keterangan: "Dokumen Kontrak" },
    { no: "18", keterangan: "Surat Keterangan Sehat" },
    { no: "19", keterangan: "Rekomendasi Pribadi" },
    { no: "20", keterangan: "Sertifikat Award" },
    { no: "21", keterangan: "Dokumen Asuransi" },
    { no: "22", keterangan: "Buku Nikah" },
    { no: "23", keterangan: "Akta Kelahiran" },
    { no: "24", keterangan: "Kartu Keluarga" },
    { no: "25", keterangan: "Surat Keterangan Domisili" },
  ];

  // Filter data berdasarkan pagination
  const filteredData = useMemo(() => {
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = startIndex + currentLimit;
    const paginatedData = dummyData.slice(startIndex, endIndex);

    return paginatedData.map((item) => {
      return [
        item.no,
        item.keterangan,
        <DropdownActions
          key={`action-${item.no}`}
          menu={[
            {
              label: (
                <span className="flex items-center gap-2">
                  <Pencil size={16} />
                  Edit
                </span>
              ),
              action: () => {
                console.log("Edit berkas:", item.keterangan);
                // Tambahkan logic edit di sini
              },
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  <Trash2 size={16} className="text-red-400" />
                  Delete
                </span>
              ),
              variant: "destructive" as const,
              action: () => {
                console.log("Delete berkas:", item.keterangan);
                // Tambahkan logic delete di sini
                // Contoh: hapus dari array, atau API call
              },
            },
          ]}
        />,
      ];
    });
  }, [dummyData, currentPage, currentLimit]);

  const totalPages = Math.ceil(dummyData.length / currentLimit);

  // Handler untuk ganti page
  const handleChangePage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const handleLimitChange = (limit: number) => {
    setCurrentLimit(limit);

    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    setSearchParams(params);
  };

  return (
    <Card className="rounded-t-none border-t-0">
      <CardContent className="p-6 space-y-8">
        <Form {...berkasForm}>
          <form onSubmit={berkasForm.handleSubmit((data) => console.log(data))}>
            {/* Bagian Form Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <InputField
                  id="jenisBerkas"
                  label="Jenis Berkas"
                  form={berkasForm}
                  name="jenisBerkas"
                  placeholder="Contoh: KTP, NPWP, Ijazah"
                />
                <InputField
                  id="keterangan"
                  label="Keterangan"
                  form={berkasForm}
                  name="keterangan"
                  placeholder="Deskripsi lengkap berkas"
                />
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    className="bg-[#2451AA] hover:bg-[#1e4090]"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    Upload File
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  {previewFile ? (
                    <img
                      src={previewFile}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="mb-2">File preview akan muncul di sini</p>
                      <p className="text-sm text-gray-500">
                        Format: PDF, JPG, PNG, DOC (Max: 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>

        {/* Bagian Tabel Berkas */}
        <DataTable
          header={["No", "Keterangan", "Aksi"]}
          isLoading={false}
          data={filteredData}
          totalPages={totalPages}
          currentPage={currentPage}
          currentLimit={currentLimit}
          onChangePage={handleChangePage}
          onChangeLimit={handleLimitChange}
        />
      </CardContent>
    </Card>
  );
};

export default BerkasTab;
