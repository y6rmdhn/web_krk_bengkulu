import AdminLayout from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Building,
  FileCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DetailPermohonan = () => {
  const navigate = useNavigate();

  const dataPengurus = {
    noKTP: "3151458125151488",
    namaLengkap: "Aditya Ardiansyah",
    alamat: "Lemah Putin, RT : 09, RW : 02",
    desa: "LEBANWARAS",
    kecamatan: "WRINGINANOM",
    kabupaten: "GRESIK",
    provinsi: "JAWA TIMUR",
  };

  const dataPemilikLahan = [
    {
      id: 1,
      nama: "Si A",
      noSertifikat: "1212122",
      luasTanah: "1212",
      kondisiTanah: "SAAS",
    },
    {
      id: 2,
      nama: "Si B",
      noSertifikat: "122222",
      luasTanah: "-",
      kondisiTanah: "-",
    },
    {
      id: 3,
      nama: "Si C",
      noSertifikat: "343443434334",
      luasTanah: "-",
      kondisiTanah: "-",
    },
  ];

  const alurPermohonan = [
    {
      id: 1,
      tanggal: "06 Des 2019",
      icon: <User className="h-5 w-5" />,
      title: "Pengajuan dari masyarakat",
      description: "menunggu verifikasi dari admin",
      status: "completed",
      step: "Pengajuan",
    },
    {
      id: 2,
      tanggal: "07 Des 2019",
      icon: <XCircle className="h-5 w-5" />,
      title: "Ditolak oleh Loket",
      description: "Pengajuan telah ditolak oleh loket",
      status: "rejected",
      step: "Verifikasi Loket",
    },
    {
      id: 3,
      tanggal: "07 Des 2019",
      icon: <Building className="h-5 w-5" />,
      title: "Diteruskan ke Kepala Dinas",
      description:
        "Pengajuan sudah diverifikasi oleh loket dan diteruskan ke kepala dinas",
      status: "completed",
      step: "Disposisi",
    },
    {
      id: 4,
      tanggal: "-",
      icon: <FileCheck className="h-5 w-5" />,
      title: "Proses di Dinas",
      description: "Menunggu proses lebih lanjut dari dinas terkait",
      status: "pending",
      step: "Proses Dinas",
    },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "rejected":
        return "Ditolak";
      case "pending":
        return "Menunggu";
      default:
        return "Proses";
    }
  };

  return (
    <AdminLayout
      title="Detail Permohonan KRK | KRK Kota Bengkulu"
      desc="Detail Permohonan KRK"
    >
      <div className="mt-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 w-full justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Detail Permohonan KRK
              </h1>
              <p className="text-gray-600">No. Pengajuan: 008/KRK/2019</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 p-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Data Pengurus */}
          <div className="lg:col-span-2 space-y-6">
            {/* Data Pengurus */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Pengurus KRK</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">No. KTP</span>
                    <span className="font-medium">{dataPengurus.noKTP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama Lengkap</span>
                    <span className="font-medium">
                      {dataPengurus.namaLengkap}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alamat</span>
                    <span className="font-medium text-right">
                      {dataPengurus.alamat}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Desa</span>
                    <span className="font-medium">{dataPengurus.desa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kecamatan</span>
                    <span className="font-medium">
                      {dataPengurus.kecamatan}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kabupaten</span>
                    <span className="font-medium">
                      {dataPengurus.kabupaten}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provinsi</span>
                    <span className="font-medium">{dataPengurus.provinsi}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pemilik Lahan */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Pemilik Lahan</h2>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 font-semibold text-sm">
                          No
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-sm">
                          Nama Pemilik
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-sm">
                          No Sertifikat
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-sm">
                          Luas Tanah
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPemilikLahan.map((item, index) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3">{index + 1}</td>
                          <td className="py-2 px-3">{item.nama}</td>
                          <td className="py-2 px-3">{item.noSertifikat}</td>
                          <td className="py-2 px-3">{item.luasTanah}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kolom Kanan - Alur Permohonan */}
          <div className="lg:col-span-1 space-y-6">
            {/* Alur Permohonan */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Alur Permohonan KRK</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {alurPermohonan.map((step, index) => (
                    <div key={step.id} className="flex gap-4">
                      {/* Tanggal dan Icon */}
                      <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                          {/* Bulatan dengan Icon */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              step.status === "completed"
                                ? "bg-green-100 text-green-600"
                                : step.status === "rejected"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {step.icon}
                          </div>

                          {/* Tanggal di bawah bulatan */}
                          <span
                            className={`text-xs mt-2 font-medium ${
                              step.status === "completed"
                                ? "text-green-600"
                                : step.status === "rejected"
                                ? "text-red-600"
                                : "text-gray-400"
                            }`}
                          >
                            {step.tanggal}
                          </span>
                        </div>

                        {/* Garis penghubung */}
                        {index < alurPermohonan.length - 1 && (
                          <div
                            className={`w-0.5 h-12 mt-2 ${
                              step.status === "completed"
                                ? "bg-green-500"
                                : step.status === "rejected"
                                ? "bg-red-500"
                                : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {step.title}
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                {step.description}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`
                              ${
                                step.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : step.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                              }
                            `}
                          >
                            {getStatusText(step.status)}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {step.step}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Setujui Permohonan
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Tolak Permohonan
                  </Button>
                  {/* <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Berkas
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DetailPermohonan;
