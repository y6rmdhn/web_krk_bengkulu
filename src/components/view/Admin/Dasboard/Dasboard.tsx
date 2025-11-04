import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaDatabase } from "react-icons/fa6";
import { MdDiscount } from "react-icons/md";
import { FaHardDrive } from "react-icons/fa6";

const DATA_CONSTANT = [
  {
    title: "Jumlah Permohonan Masuk",
    value: 124,
    icon: <FaDatabase />,
    color: "#009845",
  },
  {
    title: "Jumlah Permohonan Diproses",
    value: 124,
    icon: <MdDiscount />,
    color: "#2451AA",
  },
  {
    title: "Jumlah Permohonan Selesai",
    value: 124,
    icon: <FaHardDrive />,
    color: "#D41A17",
  },
];

const TABLE_DATA = [
  {
    id: "INV001",
    namaDataset: "Permohonan KRK Perumahan",
    kategori: "Perumahan",
    tanggalPermohonan: "2024-01-15",
    status: "Diproses",
  },
  {
    id: "INV002",
    namaDataset: "Permohonan KRK Komersial",
    kategori: "Komersial",
    tanggalPermohonan: "2024-01-14",
    status: "Selesai",
  },
  {
    id: "INV003",
    namaDataset: "Permohonan KRK Industri",
    kategori: "Industri",
    tanggalPermohonan: "2024-01-13",
    status: "Masuk",
  },
  {
    id: "INV004",
    namaDataset: "Permohonan KRK Pendidikan",
    kategori: "Pendidikan",
    tanggalPermohonan: "2024-01-12",
    status: "Diproses",
  },
  {
    id: "INV005",
    namaDataset: "Permohonan KRK Kesehatan",
    kategori: "Kesehatan",
    tanggalPermohonan: "2024-01-11",
    status: "Selesai",
  },
];

const Dasboard = () => {
  return (
    <AdminLayout title="Admin Dasboard | KRK Kota Bengkulu" desc="Dasboard">
      <div className="flex gap-4 w-full mt-10">
        {DATA_CONSTANT.map((item, index) => (
          <Card
            key={index}
            className="flex-1"
            style={{ backgroundColor: item.color }}
          >
            <CardContent className="flex gap-5 items-center p-3">
              <Button
                className="bg-white/90 rounded-full hover:bg-white/80 transition-all"
                variant="ghost"
                size="icon-lg"
              >
                <div style={{ color: item.color }}>{item.icon}</div>
              </Button>

              <div className="flex flex-col text-white">
                <h4 className="text-lg font-medium">{item.title}</h4>
                <p className="font-bold text-2xl">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex justify-between">
              <h1 className="text-lg font-semibold">
                Statistik Permohonan KRK
              </h1>
              <p className="text-blue-500 text-sm cursor-pointer hover:underline">
                Lihat Semua
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead>Nama Dataset</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Tanggal Permohonan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TABLE_DATA.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.namaDataset}
                    </TableCell>
                    <TableCell>{item.kategori}</TableCell>
                    <TableCell>{item.tanggalPermohonan}</TableCell>
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

export default Dasboard;
