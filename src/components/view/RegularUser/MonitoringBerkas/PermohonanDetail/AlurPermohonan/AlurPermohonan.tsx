import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Pastikan punya utility cn, atau gunakan template literals biasa
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  UserCheck,
  Building2,
  FileSignature,
  CornerDownRight,
  ShieldCheck,
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
  created_at?: string; // Optional karena tidak ada di sample JSON, tapi kita handle jaga-jaga
}

interface AlurPermohonanCardProps {
  data: HistoryItem[];
}

const AlurPermohonanCard = ({ data }: AlurPermohonanCardProps) => {
  // Helper untuk memformat nama langkah menjadi Title Case yang rapi
  const formatStepName = (name: string) => {
    return name
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Konfigurasi Style berdasarkan Status
  const getStatusConfig = (status: string) => {
    const s = status?.toUpperCase() || "";

    if (s === "APPROVED" || s === "SELESAI" || s === "TERVERIFIKASI") {
      return {
        color: "text-emerald-600",
        bgIcon: "bg-emerald-100",
        border: "border-emerald-200",
        bgCard: "bg-emerald-50/50",
        icon: CheckCircle2,
        label: "Disetujui",
      };
    } else if (s === "REJECTED" || s === "DITOLAK") {
      return {
        color: "text-red-600",
        bgIcon: "bg-red-100",
        border: "border-red-200",
        bgCard: "bg-red-50/50",
        icon: XCircle,
        label: "Ditolak",
      };
    } else if (s === "REVISED" || s === "PERLU_REVISI") {
      return {
        color: "text-amber-600",
        bgIcon: "bg-amber-100",
        border: "border-amber-200",
        bgCard: "bg-amber-50/50",
        icon: AlertTriangle,
        label: "Perlu Revisi",
      };
    } else if (s === "PENDING" || s === "PROCESS") {
      return {
        color: "text-blue-600",
        bgIcon: "bg-blue-100",
        border: "border-blue-200",
        bgCard: "bg-blue-50/50",
        icon: Clock,
        label: "Sedang Proses",
      };
    } else {
      return {
        color: "text-slate-500",
        bgIcon: "bg-slate-100",
        border: "border-slate-200",
        bgCard: "bg-slate-50/50",
        icon: Clock,
        label: "Menunggu",
      };
    }
  };

  // Icon spesifik berdasarkan nama langkah
  const getStepIcon = (stepName: string) => {
    const name = stepName?.toLowerCase() || "";
    if (name.includes("kadis") || name.includes("kepala")) return FileSignature;
    if (name.includes("survey") || name.includes("lapangan")) return Building2;
    if (name.includes("operator")) return UserCheck;
    return User;
  };

  const formatTanggal = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: id });
    } catch {
      return null;
    }
  };

  return (
    <Card className="shadow-sm border-slate-200 h-full">
      <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-slate-800">
              Riwayat Proses
            </CardTitle>
            <p className="text-sm text-slate-500">Jejak alur permohonan Anda</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 pl-2 sm:pl-6">
        {!data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400">
            <Clock className="w-10 h-10 mb-2 opacity-20" />
            <p>Belum ada riwayat proses.</p>
          </div>
        ) : (
          <div className="relative space-y-0">
            {/* Garis Vertikal Latar Belakang */}
            <div className="absolute left-[19px] top-2 bottom-6 w-0.5 bg-slate-200" />

            {data.map((item) => {
              const config = getStatusConfig(item.status_keputusan);
              const StepIcon = getStepIcon(item.step_name);
              // const isLast = index === data.length - 1;

              return (
                <div
                  key={item.id}
                  className="relative pl-12 pb-8 last:pb-0 group"
                >
                  {/* Timeline Dot/Icon */}
                  <div
                    className={cn(
                      "absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300",
                      "bg-white",
                      config.border,
                      config.color
                    )}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>

                  {/* Content Card */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-800 text-base leading-tight">
                          {formatStepName(item.step_name)}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          {item.actor_name}
                        </p>

                        {/* Tanggal (Jika ada di masa depan) */}
                        {item.created_at && (
                          <p className="text-xs text-slate-400 mt-0.5 ml-5">
                            {formatTanggal(item.created_at)}
                          </p>
                        )}
                      </div>

                      <Badge
                        variant="outline"
                        className={cn(
                          "w-fit h-fit px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider border",
                          config.bgIcon, // Menggunakan bgIcon untuk background badge yang soft
                          config.color,
                          "border-transparent"
                        )}
                      >
                        {item.status_keputusan === "REVISED"
                          ? "PERLU REVISI"
                          : config.label}
                      </Badge>
                    </div>

                    {/* Keterangan Box */}
                    {item.keterangan && (
                      <div
                        className={cn(
                          "relative mt-1 p-3 rounded-lg text-sm border text-slate-700",
                          config.bgCard,
                          config.border
                        )}
                      >
                        {/* Panah kecil menunjuk ke atas */}
                        <div
                          className={cn(
                            "absolute -top-1.5 left-4 w-3 h-3 border-t border-l rotate-45 bg-inherit border-inherit",
                            config.bgCard,
                            config.border
                          )}
                        />

                        <div className="flex gap-2">
                          <CornerDownRight
                            className={cn(
                              "w-4 h-4 shrink-0 mt-0.5",
                              config.color
                            )}
                          />
                          <div className="italic">"{item.keterangan}"</div>
                        </div>
                      </div>
                    )}

                    {/* TTE Signed Badge */}
                    {item.tte_status === "SIGNED" && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Ditandatangani Secara Elektronik (BSrE)
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlurPermohonanCard;
