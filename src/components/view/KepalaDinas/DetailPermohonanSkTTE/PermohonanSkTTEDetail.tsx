import { useNavigate, useParams } from "react-router-dom";
import usePermohonanSkTTEDetail from "./usePermohonanSkTTEDetail";
import { Button } from "@/components/ui/button";
import KepalaDinasLayout from "@/components/layouts/KepalaDinas";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";

import { Loader2 } from "lucide-react";
import LocationMap from "@/components/commons/LocationMap";
import AlurPermohonanCard from "@/components/commons/AlurPermohonanCard";
import DataPemilikCard from "@/components/commons/DataPemilikCard";
import DataBangunanCard from "@/components/commons/DataBangunanCard";
import BerkasLampiranCard from "@/components/commons/BerkasLampiranCard";
import DataPemohonCard from "@/components/commons/DataPemohonCard";
import HeaderSection from "@/components/commons/HeaderSection";
import SharedActionButtons from "@/components/commons/SharedActionButtons";
import KetentuanPembangunanCard from "@/components/commons/KetentuanPembangunanCard/KetentuanPembangunanCard";

const PermohonanSkTTEDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = usePermohonanSkTTEDetail(id!);

  if (isLoading) {
    return (
      <KepalaDinasLayout title="Loading..." desc="Memuat detail permohonan">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin mr-2" />
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

  const longitude = data.geom?.coordinates?.[0];
  const latitude = data.geom?.coordinates?.[1];

  const shouldShowActionButtons = data.status === "PENDING_KADIS";

  return (
    <KepalaDinasLayout
      title={`Detail Permohonan KRK | ${data.nomor_permohonan}`}
      desc={`Detail permohonan KRK ${data.nomor_permohonan}`}
    >
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <HeaderSection
            data={data}
            onBack={() => navigate(-1)}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LocationMap
              latitude={latitude}
              longitude={longitude}
              userRole="kadis"
            />

            {/* Panggil Card Ketentuan Pembangunan di sini! */}
            <KetentuanPembangunanCard data={data} />

            <DataPemohonCard data={data} formatAlamat={formatAlamat} />
            <DataPemilikCard data={data} formatAlamat={formatAlamat} />
            <DataBangunanCard data={data} formatAlamat={formatAlamat} />

            {data.attachments && data.attachments.length > 0 && (
              <BerkasLampiranCard attachments={data.attachments} />
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <AlurPermohonanCard data={dataDetailHistory} />

            {shouldShowActionButtons && (
              <SharedActionButtons id={`${id}`} role="KADIS" />
            )}
          </div>
        </div>
      </div>
    </KepalaDinasLayout>
  );
};

export default PermohonanSkTTEDetail;
