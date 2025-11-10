import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText } from "lucide-react";
import React from "react";

const InforSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            Informasi Penting
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Pastikan semua dokumen lengkap sebelum mengajukan</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Proses verifikasi membutuhkan waktu 3-5 hari kerja</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Monitor status permohonan secara real-time</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="text-green-600" size={20} />
            Jadwal Layanan
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Hari Operasional</span>
              <span className="font-semibold text-gray-900">Senin - Jumat</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-700">Jam Layanan</span>
              <span className="font-semibold text-gray-900">
                08:00 - 16:00 WIB
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-700">Layanan Digital</span>
              <span className="font-semibold text-green-600">
                24/7 Tersedia
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InforSection;
