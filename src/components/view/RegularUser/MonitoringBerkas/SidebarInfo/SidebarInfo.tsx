import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

const SidebarInfo = () => {
  return (
    <div className="space-y-6">
      {/* Status Info */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock className="text-blue-600" size={20} />
            Info Status
          </h3>
          <div className="space-y-3">
            {[
              {
                status: "Sedang Diproses",
                color: "bg-yellow-500",
                desc: "Berkas dalam tahap verifikasi dan tinjauan teknis", // Lebih profesional daripada sekadar "peninjauan"
              },
              {
                status: "SK Terbit",
                color: "bg-green-500",
                desc: "Dokumen SK telah diterbitkan dan dapat diunduh", // Disesuaikan dengan era digital/TTE
              },
              {
                status: "Ditolak",
                color: "bg-red-500",
                desc: "Permohonan tidak disetujui, silakan cek catatan penolakan", // Lebih informatif buat pemohon
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
              >
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <div>
                  <div className="font-medium text-gray-800">{item.status}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarInfo;
