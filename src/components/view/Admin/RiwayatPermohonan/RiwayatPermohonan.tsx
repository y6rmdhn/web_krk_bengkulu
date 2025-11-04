import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TABLE_DATA = [
  {
    id: 1,
    noPengajuan: "001/KRK/2019",
    namaPengurus: "tian",
    namaPemohon: "tian",
    tanggal: "07-12-2019",
    kategori: "Baru",
    tipe: "Perumahan",
    status: "Selesai",
  },
  {
    id: 2,
    noPengajuan: "008/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "06-12-2019",
    kategori: "Baru",
    tipe: "Komersial",
    status: "Ditolak",
  },
  {
    id: 3,
    noPengajuan: "007/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "Industri",
    status: "Selesai",
  },
  {
    id: 4,
    noPengajuan: "006/KRK/2019",
    namaPengurus: "INDRA PURNAMA PUTRA",
    namaPemohon: "INDRA PURNAMA PUTRA",
    tanggal: "05-12-2019",
    kategori: "Perluasan",
    tipe: "Perumahan",
    status: "Selesai",
  },
  {
    id: 5,
    noPengajuan: "005/KRK/2019",
    namaPengurus: "Naufal Nibros",
    namaPemohon: "Naufal Nibros",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "Komersial",
    status: "Selesai",
  },
  {
    id: 6,
    noPengajuan: "003/KRK/2019",
    namaPengurus: "INDRA PURNAMA PUTRA",
    namaPemohon: "ARDY PURNAMA PUTRA",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "Industri",
    status: "Selesai",
  },
  {
    id: 7,
    noPengajuan: "002/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "Perumahan",
    status: "Selesai",
  },
  {
    id: 8,
    noPengajuan: "001/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "Komersial",
    status: "Selesai",
  },
];

const RiwayatPermohonan = () => {
  const navigate = useNavigate();

  return (
    <AdminLayout
      title="Admin Riwayat Permohonan KRK | KRK Kota Bengkulu"
      desc="Riwayat Permohonan KRK"
    >
      <div className="mt-10 flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-4">
              <Select>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Pilih nomor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="001">001/KRK/2019</SelectItem>
                  <SelectItem value="002">002/KRK/2019</SelectItem>
                  <SelectItem value="003">003/KRK/2019</SelectItem>
                  <SelectItem value="005">005/KRK/2019</SelectItem>
                  <SelectItem value="006">006/KRK/2019</SelectItem>
                  <SelectItem value="007">007/KRK/2019</SelectItem>
                  <SelectItem value="008">008/KRK/2019</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full lg:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Pencarian..." className="pl-10" />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <Card className="flex-1">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead className="text-center">No</TableHead>
                  <TableHead className="text-center">No. Pengajuan</TableHead>
                  <TableHead className="text-center">Nama Pengurus</TableHead>
                  <TableHead className="text-center">Nama Pemohon</TableHead>
                  <TableHead className="text-center">Tanggal</TableHead>
                  <TableHead className="text-center">Kategori</TableHead>
                  <TableHead className="text-center">Tipe</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TABLE_DATA.map((item, index) => (
                  <TableRow key={item.id} className="text-center">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.noPengajuan}
                    </TableCell>
                    <TableCell>{item.namaPengurus}</TableCell>
                    <TableCell>{item.namaPemohon}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.kategori}</TableCell>
                    <TableCell>{item.tipe}</TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Menunggu Verifikasi"
                            ? "bg-yellow-100 text-yellow-800"
                            : item.status === "Ditolak"
                            ? "bg-red-100 text-red-800"
                            : item.status === "Selesai"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                          title="Lihat Detail"
                          onClick={() =>
                            navigate("/admin/permohonan/" + item.id)
                          }
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default RiwayatPermohonan;
