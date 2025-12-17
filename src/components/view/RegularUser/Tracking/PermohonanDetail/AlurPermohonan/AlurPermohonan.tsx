import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
  Hourglass,
  CalendarClock,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { id } from "date-fns/locale";

// --- 1. SESUAIKAN INTERFACE DENGAN JSON API ---
interface HistoryItem {
  step_name: string;
  status: string; // Mapping dari JSON: "status"
  tanggal: string; // Mapping dari JSON: "tanggal"
  durasi_proses?: string; // Mapping dari JSON: "durasi_proses"

  // Field optional (jaga-jaga jika API update atau ada data tambahan)
  id?: string;
  actor_name?: string;
  keterangan?: string;
  tte_status?: string | null;
}

interface AlurPermohonanCardProps {
  data: HistoryItem[];
}

const AlurPermohonanCard = ({ data }: AlurPermohonanCardProps) => {
  // --- HELPER: Format Nama Tahap ---
  const formatStepName = (name: string) => {
    return name
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // --- HELPER: Konfigurasi Style Status ---
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
    } else if (
      s === "PENDING" ||
      s === "PROCESS" ||
      s === "PENDING_SURVEYOR" ||
      s === "VERIFIKASI_OPERATOR"
    ) {
      // Note: Kadang status di API berupa nama step jika sedang pending, sesuaikan logika ini
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

  // --- HELPER: Icon Tahapan ---
  const getStepIcon = (stepName: string) => {
    const name = stepName?.toLowerCase() || "";
    if (name.includes("kadis") || name.includes("kepala")) return FileSignature;
    if (name.includes("survey") || name.includes("lapangan")) return Building2;
    if (name.includes("operator")) return UserCheck;
    return User;
  };

  // --- HELPER: Target Waktu (Untuk Logika Merah/Hijau) ---
  const getTargetDays = (stepName: string): number => {
    const name = stepName?.toLowerCase() || "";
    if (name.includes("operator") || name.includes("verifikasi")) return 1; // Target 1 Hari
    if (name.includes("survey") || name.includes("lapangan")) return 2; // Target 2 Hari
    if (name.includes("dinas") || name.includes("kepala")) return 1; // Target 1 Hari
    return 3; // Default
  };

  // --- HELPER: Logika Warna Durasi (Merah/Hijau) ---
  const getDurationStyle = (
    startDateStr: string | undefined,
    targetDays: number,
    status: string
  ) => {
    // Jika status sudah selesai (APPROVED/REJECTED), gunakan warna netral/hijau biasa
    const s = status?.toUpperCase() || "";
    if (s === "APPROVED" || s === "SELESAI") {
      return "bg-slate-100 text-slate-600 border-slate-200";
    }

    if (!startDateStr) return "bg-slate-100 text-slate-600 border-slate-200";

    const startDate = new Date(startDateStr);
    const today = new Date();
    const daysPassed = differenceInDays(today, startDate);

    if (daysPassed > targetDays) {
      return "bg-red-50 text-red-700 border-red-200 animate-pulse"; // TERLAMBAT -> MERAH
    } else if (daysPassed === targetDays && daysPassed > 0) {
      return "bg-amber-50 text-amber-700 border-amber-200"; // WARNING -> KUNING
    }

    return "bg-emerald-50 text-emerald-700 border-emerald-200"; // AMAN -> HIJAU
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

            {data.map((item, index) => {
              const config = getStatusConfig(item.status); // Gunakan item.status
              const StepIcon = getStepIcon(item.step_name);

              // Hitung Style Durasi
              const targetDays = getTargetDays(item.step_name);
              const durationStyle = getDurationStyle(
                item.tanggal,
                targetDays,
                item.status
              );

              return (
                <div
                  key={item.id || index} // Fallback key index jika ID tidak ada
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

                        <div className="flex flex-col gap-1 mt-1">
                          {item.actor_name ? (
                            <p className="text-sm text-slate-500 flex items-center gap-1.5">
                              <User className="w-3 h-3" />
                              {item.actor_name}
                            </p>
                          ) : (
                            <p className="text-sm text-slate-400 italic">
                              Petugas terkait
                            </p>
                          )}

                          {/* --- TAMPILKAN DURASI (Dari API) --- */}
                          {item.durasi_proses && (
                            <div
                              className={cn(
                                "flex items-center gap-1.5 w-fit px-2 py-0.5 rounded text-[10px] font-medium border mt-1",
                                durationStyle
                              )}
                            >
                              <Hourglass className="w-3 h-3" />
                              {item.durasi_proses}
                            </div>
                          )}

                          {/* Tanggal (Menggunakan item.tanggal) */}
                          {item.tanggal && (
                            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                              <CalendarClock className="w-3 h-3" />
                              {formatTanggal(item.tanggal)}
                            </p>
                          )}
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className={cn(
                          "w-fit h-fit px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider border",
                          config.bgIcon,
                          config.color,
                          "border-transparent"
                        )}
                      >
                        {item.status === "REVISED"
                          ? "PERLU REVISI"
                          : config.label}
                      </Badge>
                    </div>

                    {/* Keterangan Box (Jika ada) */}
                    {item.keterangan && (
                      <div
                        className={cn(
                          "relative mt-1 p-3 rounded-lg text-sm border text-slate-700",
                          config.bgCard,
                          config.border
                        )}
                      >
                        {/* Arrow */}
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

                    {/* TTE Signed Badge (Optional field) */}
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
