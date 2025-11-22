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

// 1. Sesuaikan Type dengan Response API
interface Actor {
  name: string;
}

interface HistoryItem {
  step_name: string;
  status_keputusan: string;
  actor: Actor;
  created_at?: string; // Asumsi ada tanggal di API, jika tidak ada akan handle default
  note?: string; // Asumsi ada catatan jika rejected
}

interface AlurPermohonanCardProps {
  data: HistoryItem[]; // Data sekarang berupa Array
}

const AlurPermohonanCard = ({ data }: AlurPermohonanCardProps) => {
  // 2. Helper untuk menentukan Style berdasarkan status_keputusan
  const getStatusConfig = (status: string) => {
    // Normalisasi string status agar case-insensitive
    const s = status?.toUpperCase() || "";

    if (s.includes("REJECTED") || s.includes("TOLAK")) {
      return {
        bg: "bg-red-100",
        text: "text-red-600",
        line: "bg-red-500",
        badge: "bg-red-100 text-red-800",
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
        badge: "bg-green-100 text-green-800",
        icon: <CheckCircle className="h-5 w-5" />,
        label: "Selesai",
      };
    } else if (s.includes("PENDING") || s.includes("PROCESS")) {
      return {
        bg: "bg-blue-100",
        text: "text-blue-600",
        line: "bg-blue-500",
        badge: "bg-blue-100 text-blue-800",
        icon: <Clock className="h-5 w-5" />,
        label: "Dalam Proses",
      };
    } else {
      // Default
      return {
        bg: "bg-gray-100",
        text: "text-gray-400",
        line: "bg-gray-300",
        badge: "bg-gray-100 text-gray-800",
        icon: <FileCheck className="h-5 w-5" />,
        label: "Menunggu",
      };
    }
  };

  // 3. Helper Icon khusus berdasarkan Nama Step (Optional, biar icon beda-beda tiap step)
  const getStepSpecificIcon = (
    stepName: string,
    defaultIcon: React.ReactNode
  ) => {
    const name = stepName?.toLowerCase() || "";
    if (name.includes("pengajuan")) return <User className="h-5 w-5" />;
    if (name.includes("operator")) return <UserCheck className="h-5 w-5" />;
    if (name.includes("superior") || name.includes("lapangan"))
      return <FileCheck className="h-5 w-5" />;
    if (name.includes("dinas")) return <Building className="h-5 w-5" />;
    return defaultIcon;
  };

  // 4. Format Tanggal
  const formatTanggal = (dateString?: string) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: id });
    } catch (e) {
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
          {/* Jika data kosong */}
          {(!data || data.length === 0) && (
            <div className="text-center text-gray-500 py-4">
              Belum ada riwayat permohonan.
            </div>
          )}

          {/* Looping Data Array dari API */}
          {data?.map((item, index) => {
            const config = getStatusConfig(item.status_keputusan);
            // Override icon default status dengan icon spesifik step jika perlu, atau pakai config.icon
            const finalIcon = getStepSpecificIcon(item.step_name, config.icon);

            return (
              <div key={index} className="flex gap-4 group min-h-[80px]">
                {/* Sisi Kiri: Icon & Garis */}
                <div className="flex flex-col items-center">
                  {/* Bulatan Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${config.bg} ${config.text}`}
                  >
                    {finalIcon}
                  </div>

                  {/* Garis Penghubung (Jangan render di item terakhir) */}
                  {index < data.length - 1 && (
                    <div
                      className={`w-0.5 h-full my-2 rounded-full ${config.line}`}
                    />
                  )}
                </div>

                {/* Sisi Kanan: Konten */}
                <div className="flex-1 pb-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {item.step_name}
                      </h3>

                      {/* Deskripsi Actor */}
                      <p className="text-gray-600 text-sm mt-1">
                        {item.actor?.name === "Sistem"
                          ? "Diproses oleh Sistem"
                          : `Oleh: ${item.actor?.name}`}
                      </p>

                      {/* Jika ada catatan penolakan/keterangan */}
                      {item.note && (
                        <div className="mt-2 bg-red-50 p-2 rounded border border-red-100 flex gap-2 items-start text-xs text-red-700">
                          <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                          <span>{item.note}</span>
                        </div>
                      )}
                    </div>

                    {/* Badge Status & Tanggal */}
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="secondary"
                        className={`${config.badge} capitalize whitespace-nowrap`}
                      >
                        {/* Menampilkan status raw atau label yang sudah diformat */}
                        {item.status_keputusan?.replace(/_/g, " ") ||
                          config.label}
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
