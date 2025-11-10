import { Button } from "@/components/ui/button";
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
                status: "Diterima",
                color: "bg-blue-500",
                desc: "Berkas sedang diverifikasi",
              },
              {
                status: "Proses",
                color: "bg-yellow-500",
                desc: "Dalam tahap peninjauan",
              },
              {
                status: "Selesai",
                color: "bg-green-500",
                desc: "Sudah dapat diambil",
              },
              {
                status: "Ditolak",
                color: "bg-red-500",
                desc: "Perlu perbaikan berkas",
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

      {/* Help Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Butuh Bantuan?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Hubungi customer service kami untuk informasi lebih lanjut
          </p>
          <Button
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            Kontak Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarInfo;
