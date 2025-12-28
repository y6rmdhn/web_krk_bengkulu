import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner"; // Pastikan sudah install sonner

import { useNavigate, useParams } from "react-router-dom";
import useDisposisiSurveiMasukDetail from "./useDisposisiSurveiMasukDetail";
import HeaderSection from "./HeaderSection";
import DataPemohonCard from "./DataPemohonCard";
import DataPemilikCard from "./DataPemilikCard";
import DataBangunanCard from "./DataBangunanCard";
import BerkasLampiranCard from "./BerkasLampiranCard";
import AlurPermohonanCard from "./AlurPermohonan";
import ActionButtons from "./ActionButton";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";
import SurveyorLayout from "@/components/layouts/SurveyorLayout";
import { Loader2, MapPin, CheckCircle } from "lucide-react";
import LocationMap from "@/components/commons/LocationMap";

const DisposisiSurveiMasukDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = useDisposisiSurveiMasukDetail(
    id!
  );

  // State untuk Modal Survei (Hanya ini yang tersisa di sini)
  const [openSurveiModal, setOpenSurveiModal] = useState(false);
  const [catatan, setCatatan] = useState("");

  // Handler Submit Survei (Simulasi / Manual Process)
  const handleSubmitSurvei = () => {
    // KARENA TIDAK ADA ENDPOINT BE:
    // Kita anggap ini proses manual. Tombol ini hanya UX untuk "mengingatkan"
    // user bahwa dia memutuskan untuk survei fisik.

    // 1. Tutup Modal
    setOpenSurveiModal(false);

    // 2. Reset Catatan
    setCatatan("");

    // 3. Tampilkan Notifikasi Sukses
    toast.success("Jadwal Survei Dicatat", {
      description:
        "Instruksi telah dicatat. Silakan lakukan survei lapangan sebelum menyetujui permohonan.",
    });
  };

  if (isLoading) {
    return (
      <SurveyorLayout title="Loading..." desc="Memuat detail permohonan">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin mr-2" />
          <p>Memuat data...</p>
        </div>
      </SurveyorLayout>
    );
  }

  if (!data) {
    return (
      <SurveyorLayout
        title="Data Tidak Ditemukan"
        desc="Permohonan tidak ditemukan"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 mb-4">Data permohonan tidak ditemukan</p>
          <Button onClick={() => navigate(-1)}>Kembali</Button>
        </div>
      </SurveyorLayout>
    );
  }

  const longitude = data.geom?.coordinates?.[0];
  const latitude = data.geom?.coordinates?.[1];

  return (
    <SurveyorLayout
      title={`Detail Permohonan KRK | ${data.nomor_permohonan}`}
      desc={`Detail permohonan KRK ${data.nomor_permohonan}`}
    >
      <div className="mt-10 flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <HeaderSection
            data={data}
            onBack={() => navigate(-1)}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- KOLOM KIRI (Data & Peta) --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* Peta dengan Layer RTRW Aktif */}
            <LocationMap
              latitude={latitude}
              longitude={longitude}
              userRole="surveyor"
            />

            <DataPemohonCard data={data} formatAlamat={formatAlamat} />
            <DataPemilikCard data={data} formatAlamat={formatAlamat} />
            <DataBangunanCard data={data} formatAlamat={formatAlamat} />

            {data.attachments && data.attachments.length > 0 && (
              <BerkasLampiranCard attachments={data.attachments} />
            )}
          </div>

          {/* --- KOLOM KANAN (Aksi & History) --- */}
          <div className="lg:col-span-1 space-y-6">
            {/* 1. Panel Opsi Survei (Jika ragu dan butuh cek lapangan) */}
            <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-lg space-y-4">
              <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">
                  Tindak Lanjut Lapangan
                </h3>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-blue-700">
                  Jika lokasi sulit diidentifikasi via peta atau data meragukan:
                </p>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-white hover:bg-blue-50 border-blue-200 text-blue-700"
                  onClick={() => setOpenSurveiModal(true)}
                >
                  <MapPin className="h-4 w-4" />
                  Jadwalkan Survei Lapangan
                </Button>
              </div>
            </div>

            {/* 2. ActionButtons (Setujui/Tolak/Revisi) */}
            {/* Input GSB/KDB ada di dalam popup tombol 'Setujui' component ini */}
            <ActionButtons id={`${id}`} />

            {/* 3. History Alur */}
            <AlurPermohonanCard data={dataDetailHistory} />
          </div>
        </div>
      </div>

      {/* --- MODAL DIALOG SURVEI --- */}
      <Dialog open={openSurveiModal} onOpenChange={setOpenSurveiModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tindak Lanjut: Survei Lapangan</DialogTitle>
            <DialogDescription>
              Instruksikan tim teknis untuk melakukan pengecekan fisik di
              lokasi.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Label>Catatan untuk Tim Lapangan</Label>
            <Textarea
              placeholder="Contoh: Pastikan batas patok tanah bagian belakang..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSurveiModal(false)}>
              Batal
            </Button>
            {/* Tombol ini hanya trigger toast simulasi */}
            <Button onClick={handleSubmitSurvei}>Kirim Disposisi Survei</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SurveyorLayout>
  );
};

export default DisposisiSurveiMasukDetail;
