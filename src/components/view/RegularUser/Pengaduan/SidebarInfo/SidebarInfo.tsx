import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

const SidebarInfo = () => {
  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl py-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="text-blue-600" size={20} />
            Informasi Penting
          </h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Pengaduan akan ditindaklanjuti dalam 1-2 hari kerja</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Pastikan data yang diisi akurat dan dapat dipertanggungjawabkan
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Proses investigasi membutuhkan waktu maksimal 7 hari kerja
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Butuh Bantuan Cepat?
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-blue-100">
              <span className="text-gray-600">Telepon</span>
              <span className="font-semibold text-blue-600">(0736) 123456</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-blue-100">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold text-blue-600">
                pengaduan@krk.bengkulu.go.id
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Jam Layanan</span>
              <span className="font-semibold text-green-600">
                08:00 - 16:00
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SidebarInfo;
