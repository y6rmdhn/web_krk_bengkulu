import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";

interface DataPemilikCardProps {
  data: any;
  formatAlamat: (data: any, type: "pemohon" | "pemilik" | "bangunan") => string;
}

const DataPemilikCard = ({ data, formatAlamat }: DataPemilikCardProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <User className="h-5 w-5" />
          Data Pemilik
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Nama Lengkap</span>
              <span className="font-medium text-right">
                {data.nama_pemilik || data.nama_pemohon}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">No. KTP</span>
              <span className="font-medium">{data.no_ktp_pemilik}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email</span>
              <span className="font-medium">{data.email_pemilik}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">No. HP</span>
              <span className="font-medium">{data.no_hp_pemilik}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Alamat</span>
              <span className="font-medium text-right max-w-[200px]">
                {formatAlamat(data, "pemilik")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataPemilikCard;
