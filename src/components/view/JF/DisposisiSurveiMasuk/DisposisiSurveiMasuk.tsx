import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Search } from "lucide-react";
import { HiMiniEllipsisHorizontal } from "react-icons/hi2";
import JFLayout from "@/components/layouts/JFLayout";

const TABLE_DATA = [
  {
    id: 1,
    noPengajuan: "001/KRK/2019",
    namaPengurus: "tian",
    namaPemohon: "tian",
    tanggal: "07-12-2019",
    kategori: "Baru",
    tipe: "-",
    status: "Menunggu Verifikasi",
  },
  {
    id: 2,
    noPengajuan: "008/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "06-12-2019",
    kategori: "Baru",
    tipe: "-",
    status: "Ditolak",
  },
  {
    id: 3,
    noPengajuan: "007/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "-",
    status: "Selesai",
  },
  {
    id: 4,
    noPengajuan: "006/KRK/2019",
    namaPengurus: "INDRA PURNAMA PUTRA",
    namaPemohon: "INDRA PURNAMA PUTRA",
    tanggal: "05-12-2019",
    kategori: "Perluasan",
    tipe: "-",
    status: "Menunggu Verifikasi",
  },
  {
    id: 5,
    noPengajuan: "005/KRK/2019",
    namaPengurus: "Naufal Nibros",
    namaPemohon: "Naufal Nibros",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "-",
    status: "Menunggu Verifikasi",
  },
  {
    id: 6,
    noPengajuan: "003/KRK/2019",
    namaPengurus: "INDRA PURNAMA PUTRA",
    namaPemohon: "ARDY PURNAMA PUTRA",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "-",
    status: "Menunggu Verifikasi",
  },
  {
    id: 7,
    noPengajuan: "002/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "-",
    status: "Menunggu Verifikasi",
  },
  {
    id: 8,
    noPengajuan: "001/KRK/2019",
    namaPengurus: "Aditya Ardionsyah",
    namaPemohon: "Aditya Ardionsyah",
    tanggal: "05-12-2019",
    kategori: "Baru",
    tipe: "-",
    status: "Menunggu Verifikasi",
  },
];

const DisposisiSurveiMasuk = () => {
  return (
    <JFLayout
      title="JF Disposisi Survei Masuk | KRK Kota Bengkulu"
      desc="Disposisi Survei Masuk"
    >
      <div className="mt-10 flex flex-col gap-6">
        {/* Filter Section */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-start">
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Pencarian..." className="pl-10" />
            </div>

            <Select>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Nomor Pengajuan" />
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
        </div>

        {/* Table Section */}
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h1 className="text-lg font-semibold">Disposisi Survei Masuk</h1>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead>No</TableHead>
                  <TableHead>No. Pengajuan</TableHead>
                  <TableHead>Nama Pengurus</TableHead>
                  <TableHead>Nama Pemohon</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TABLE_DATA.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {item.noPengajuan}
                    </TableCell>
                    <TableCell>{item.namaPengurus}</TableCell>
                    <TableCell>{item.namaPemohon}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
                    <TableCell>{item.tipe}</TableCell>
                    <TableCell>{item.kategori}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                      <div className="flex justify-start gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-blue-50"
                          title="Lihat Detail"
                        >
                          <HiMiniEllipsisHorizontal className="h-4 w-4" />
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
    </JFLayout>
  );
};

export default DisposisiSurveiMasuk;
