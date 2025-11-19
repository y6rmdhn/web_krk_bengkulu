import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import useBerkasTab from "./useBerkastab";
import DataTable from "@/components/commons/DataTable";
import DropdownActions from "@/components/commons/DropdownActions";
import { useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useDataTable from "@/hooks/useDataTable";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const dummyData = [
  {
    no: "1",
    keterangan: "Surat Permohonan Pengajuan KRK",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "2",
    keterangan: "Fotokopi Kartu Tanda Penduduk (KTP) Pemohon",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "3",
    keterangan: "Fotokopi Kartu Tanda Penduduk (KTP) Pemohon",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "4",
    keterangan:
      "Fotokopi bukti kepemilikan hak atas tanah (Sertifikat Tanah, Girik/Letter C yang dilengkapi Peta Bidang dari BPN, atau surat tanah lainnya yang sah",
    status: "sudah diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "5",
    keterangan: "Fotokopi Pajak Bumi dan Bangunan (PBB) tahun berjalan",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "6",
    keterangan:
      "Surat Pernyataan Pemohon bahwa tanah tidak dalam sengketa dan akan mengikuti persyaratan KRK yang ditetapkan, ditandatangani di atas metera",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "7",
    keterangan: "Sketsa Lokasi/Peta Situasi yang dimohon",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "8",
    keterangan:
      "Nomor Induk Berusaha (NIB) jika kegiatan yang dimohon termasuk kegiatan berusaha",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "9",
    keterangan:
      "Surat Kuasa di atas meterai dan dilengkapi fotokopi KTP yang diberi kuasa (jika permohonan diwakilkan oleh pihak ketiga",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "10",
    keterangan:
      "Untuk permohonan perubahan/perluasan, melampirkan fotokopi KRK/IPPT lama (jika ada)",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
  {
    no: "11",
    keterangan: "Bukti Pembayaran Pajak Bumi dan Bangunan (PBB) Tahun Berjalan",
    status: "belum diupload",
    uploadBerkas: <Input type="file" />,
  },
];

const BerkasTab = () => {
  const { berkasForm, handleFileUpload, previewFile } = useBerkasTab();
  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  // Filter data berdasarkan pagination
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

  return (
    <Card className="rounded-t-none border-t-0">
      <CardContent className="p-6 space-y-8">
        <Form {...berkasForm}>
          <form
            onSubmit={berkasForm.handleSubmit((data) => console.log(data))}
          ></form>
        </Form>

        {/* Bagian Tabel Berkas */}
        <DataTable
          header={["No", "Keterangan", "Status", "Upload Berkas", "Aksi"]}
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
