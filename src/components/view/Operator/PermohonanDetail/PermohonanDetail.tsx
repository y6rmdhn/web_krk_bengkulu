import OperatorLayout from "@/components/layouts/OperatorLayout";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useDetailPermohonan from "./usePermohonanDetail";
import HeaderSection from "./HeaderSection";
import DataPemohonCard from "./DataPemohonCard";
import DataPemilikCard from "./DataPemilikCard";
import DataBangunanCard from "./DataBangunanCard";
import BerkasLampiranCard from "./BerkasLampiranCard";
import AlurPermohonanCard from "./AlurPermohonan";
import ActionButtons from "./ActionButton";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";
import { Loader2 } from "lucide-react";
import LocationMap from "@/components/commons/LocationMap";
import { useState } from "react";
import VerifikasiChecklist from "./VerifikasiChecklist";
import { cn } from "@/lib/utils";

const DetailPermohonan = ({ isAction }: { isAction?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { data, isLoading, dataDetailHistory } = useDetailPermohonan(id!);
  const [isVerified, setIsVerified] = useState(false);

  const shouldShowActionButtons = isAction ?? location.state?.isAction;

  const isFinal = location.state?.isFinal;

  if (isLoading) {
    return (
      <OperatorLayout title="Loading..." desc="Memuat detail permohonan">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin mr-2" />
          <p>Memuat data...</p>
        </div>
      </OperatorLayout>
    );
  }

  if (!data) {
    return (
      <OperatorLayout
        title="Data Tidak Ditemukan"
        desc="Permohonan tidak ditemukan"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 mb-4">Data permohonan tidak ditemukan</p>
          <Button onClick={() => navigate(-1)}>Kembali</Button>
        </div>
      </OperatorLayout>
    );
  }

  const longitude = data.geom?.coordinates?.[0];
  const latitude = data.geom?.coordinates?.[1];

  return (
    <OperatorLayout
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

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <LocationMap
              latitude={latitude}
              longitude={longitude}
              userRole="operator"
            />

            <DataPemohonCard data={data} formatAlamat={formatAlamat} />
            <DataPemilikCard data={data} formatAlamat={formatAlamat} />
            <DataBangunanCard data={data} formatAlamat={formatAlamat} />

            {data.attachments && data.attachments.length > 0 && (
              <BerkasLampiranCard attachments={data.attachments} />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className={cn(isFinal ? "sticky top-0 space-y-6" : null)}>
              <AlurPermohonanCard data={dataDetailHistory} />

              {shouldShowActionButtons && isFinal && (
                <VerifikasiChecklist
                  onVerificationChange={(isValid) => setIsVerified(isValid)}
                />
              )}

              {shouldShowActionButtons && (
                <div className="mt-6">
                  <ActionButtons
                    id={id || ""}
                    isFinal={isFinal}
                    isVerificationComplete={isVerified}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
};

export default DetailPermohonan;
