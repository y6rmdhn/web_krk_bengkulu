import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface HeaderSectionProps {
  data: any;
  onBack: () => void;
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}

const HeaderSection = ({
  data,
  onBack,
  getStatusColor,
  getStatusText,
}: HeaderSectionProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 w-full justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Detail Permohonan KRK
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600">
              No. Pengajuan: {data.nomor_permohonan}
            </p>
            <Badge className={getStatusColor(data.status)}>
              {getStatusText(data.status)}
            </Badge>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Diajukan pada:{" "}
            {new Date(data.submitted_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2 p-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
