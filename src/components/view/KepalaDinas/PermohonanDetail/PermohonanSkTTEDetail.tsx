import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import usePermohonanSkTTEDetail from "./usePermohonanSkTTEDetail";

import HeaderSection from "./HeaderSection";
import DataPemohonCard from "./DataPemohonCard";
import DataPemilikCard from "./DataPemilikCard";
import DataBangunanCard from "./DataBangunanCard";
import BerkasLampiranCard from "./BerkasLampiranCard";
import AlurPermohonanCard from "./AlurPermohonan";
import ActionButtons from "./ActionButton";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";
import KepalaDinasLayout from "@/components/layouts/KepalaDinas";

const PermohonanSkTTEDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = usePermohonanSkTTEDetail(id!);

  if (isLoading) {
    return (
      <KepalaDinasLayout title="Loading..." desc="Memuat detail permohonan">
        <div className="flex justify-center items-center h-64">
          <p>Memuat data...</p>
        </div>
      </KepalaDinasLayout>
    );
  }

  if (!data) {
    return (
      <KepalaDinasLayout
        title="Data Tidak Ditemukan"
        desc="Permohonan tidak ditemukan"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 mb-4">Data permohonan tidak ditemukan</p>
          <Button onClick={() => navigate(-1)}>Kembali</Button>
        </div>
      </KepalaDinasLayout>
    );
  }

  return (
    <KepalaDinasLayout
      title={`Detail Permohonan KRK | ${data.nomor_permohonan}`}
      desc={`Detail permohonan KRK ${data.nomor_permohonan}`}
    >
      <div className="mt-10 flex flex-col gap-6">
        {/* Header */}
        <HeaderSection
          data={data}
          onBack={() => navigate(-1)}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Data Permohonan */}
          <div className="lg:col-span-2 space-y-6">
            <DataPemohonCard data={data} formatAlamat={formatAlamat} />
            <DataPemilikCard data={data} formatAlamat={formatAlamat} />
            <DataBangunanCard data={data} formatAlamat={formatAlamat} />

            {data.attachments && data.attachments.length > 0 && (
              <BerkasLampiranCard attachments={data.attachments} />
            )}
          </div>

          {/* Kolom Kanan - Alur Permohonan dan Actions */}
          <div className="lg:col-span-1 space-y-6">
            <AlurPermohonanCard data={dataDetailHistory} />
            <ActionButtons id={`${id}`} />
          </div>
        </div>
      </div>
    </KepalaDinasLayout>
  );
};

export default PermohonanSkTTEDetail;
