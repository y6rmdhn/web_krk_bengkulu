import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, FileCheck, Building, UserCheck } from "lucide-react";
import { getStatusConfig } from "@/constants/status.constant";

interface RiwayatPublicItem {
  step_name: string;
  status: string;
  durasi_proses: string;
}

interface AlurPermohonanPublicCardProps {
  data: RiwayatPublicItem[];
}

const AlurPermohonanPublicCard = ({ data }: AlurPermohonanPublicCardProps) => {
  const getStepSpecificIcon = (stepName: string) => {
    const name = stepName?.toLowerCase() || "";
    if (name.includes("pengajuan")) return <User className="h-5 w-5" />;
    if (name.includes("operator") || name.includes("verifikasi"))
      return <UserCheck className="h-5 w-5" />;
    if (
      name.includes("superior") ||
      name.includes("lapangan") ||
      name.includes("survey") ||
      name.includes("fungsional")
    )
      return <FileCheck className="h-5 w-5" />;
    if (
      name.includes("dinas") ||
      name.includes("draft") ||
      name.includes("kadis")
    )
      return <Building className="h-5 w-5" />;
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Alur Permohonan KRK</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {(!data || data.length === 0) && (
            <div className="text-center text-gray-500 py-4">
              Belum ada riwayat permohonan.
            </div>
          )}

          {data?.map((item, index) => {
            // Menggunakan getStatusConfig sentral yang sudah kita punya
            const config = getStatusConfig(item.status);
            const finalIcon = getStepSpecificIcon(item.step_name);

            return (
              <div key={index} className="flex gap-4 group min-h-[80px]">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${config.color}`}
                  >
                    {finalIcon}
                  </div>

                  {index < data.length - 1 && (
                    <div className="w-0.5 h-full my-2 rounded-full bg-gray-200" />
                  )}
                </div>

                <div className="flex-1 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {item.step_name.replace(/_/g, " ").toLowerCase() ===
                        "survey lapangan"
                          ? "Jabatan Fungsional"
                          : item.step_name.replace(/_/g, " ")}
                      </h3>

                      {/* Tampilkan durasi proses (misal: "Selesai" atau "-") karena aktor_name tidak ada di API ini */}
                      {item.durasi_proses && item.durasi_proses !== "-" && (
                        <p className="text-gray-500 text-sm mt-1">
                          Durasi/Keterangan: {item.durasi_proses}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="secondary"
                        className={`${config.color} capitalize whitespace-nowrap`}
                      >
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlurPermohonanPublicCard;
