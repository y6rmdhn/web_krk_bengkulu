import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  FileCheck,
  Building,
  XCircle,
  CheckCircle,
  UserCheck,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface HistoryItem {
  id: string;
  step_name: string;
  status_keputusan: string;
  actor_name: string;
  keterangan?: string;
  tte_status?: string | null;
  created_at?: string;
}

interface AlurPermohonanCardProps {
  data: HistoryItem[];
}

const AlurPermohonanCard = ({ data }: AlurPermohonanCardProps) => {
  const getStatusConfigAlurPermohonan = (status: string) => {
    const s = status?.toUpperCase() || "";

    // 1. Pengecekan status spesifik
    if (s === "PENDING_OPERATOR") {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        line: "bg-yellow-500",
        badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-5 w-5" />,
        label: "Pending Operator",
      };
    }
    if (s === "PENDING_SURVEYOR") {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        line: "bg-yellow-500",
        badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-5 w-5" />,
        label: "Pending Jab. Fungsional",
      };
    }
    if (s === "PENDING_KADIS") {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        line: "bg-yellow-500",
        badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-5 w-5" />,
        label: "Pending Kepala Dinas",
      };
    }

    // 2. Pengecekan umum (Selesai, Ditolak, Proses Lainnya)
    if (s.includes("REJECTED") || s.includes("TOLAK")) {
      return {
        bg: "bg-red-100",
        text: "text-red-600",
        line: "bg-red-500",
        badge: "bg-red-100 text-red-800 border-red-200",
        icon: <XCircle className="h-5 w-5" />,
        label: "Ditolak",
      };
    } else if (
      s.includes("APPROVED") ||
      s.includes("SELESAI") ||
      s.includes("TERVERIFIKASI")
    ) {
      return {
        bg: "bg-green-100",
        text: "text-green-600",
        line: "bg-green-500",
        badge: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="h-5 w-5" />,
        label: "Selesai",
      };
    } else if (s.includes("PENDING") || s.includes("PROCESS")) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-600",
        line: "bg-blue-500",
        badge: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Clock className="h-5 w-5" />,
        label: "Dalam Proses",
      };
    } else {
      return {
        bg: "bg-gray-100",
        text: "text-gray-400",
        line: "bg-gray-300",
        badge: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <FileCheck className="h-5 w-5" />,
        label: s ? s.replace(/_/g, " ") : "Menunggu",
      };
    }
  };

  const getStepSpecificIcon = (
    stepName: string,
    defaultIcon: React.ReactNode,
  ) => {
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
    return defaultIcon;
  };

  const formatTanggal = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: id });
    } catch {
      return "-";
    }
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
            const config = getStatusConfigAlurPermohonan(item.status_keputusan);
            const finalIcon = getStepSpecificIcon(item.step_name, config.icon);

            return (
              <div key={item.id} className="flex gap-4 group min-h-[80px]">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${config.bg} ${config.text}`}
                  >
                    {finalIcon}
                  </div>

                  {index < data.length - 1 && (
                    <div
                      className={`w-0.5 h-full my-2 rounded-full ${config.line}`}
                    />
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

                      <p className="text-gray-600 text-sm mt-1">
                        {item.actor_name === "Sistem"
                          ? "Diproses oleh Sistem"
                          : `Oleh: ${item.actor_name}`}
                      </p>

                      {item.keterangan && (
                        <div className="mt-2 bg-amber-50 p-2 rounded border border-amber-100 flex gap-2 items-start text-xs text-amber-700">
                          <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                          <span>{item.keterangan}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="secondary"
                        className={`${config.badge} capitalize whitespace-nowrap`}
                      >
                        {config.label}
                      </Badge>
                      <span
                        className={`text-xs font-medium mt-1 ${config.text}`}
                      >
                        {formatTanggal(item.created_at)}
                      </span>
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

export default AlurPermohonanCard;
