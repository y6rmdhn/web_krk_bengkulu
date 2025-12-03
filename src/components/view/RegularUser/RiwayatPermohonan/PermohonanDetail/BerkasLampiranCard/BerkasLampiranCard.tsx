import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import PdfPreviewDialog from "@/components/commons/PdfPreviewDialog";
import environment from "@/config/environment";

interface BerkasLampiranCardProps {
  attachments: any[];
}

const BerkasLampiranCard = ({ attachments }: BerkasLampiranCardProps) => {
  const [selectedFile, setSelectedFile] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const getFileUrl = (filePath: string) => {
    const BASE_URL = environment.API_URL;
    console.log(filePath);

    const cleanPath = filePath.replace("public/", "");

    return `${BASE_URL}attachments/profile`;
  };

  const handlePreview = (attachment: any) => {
    const url = getFileUrl(attachment.file_path);
    const name = attachment.masterBerkas?.nama || attachment.nama_file;
    setSelectedFile({ url, name });
  };

  const handleClose = () => {
    setSelectedFile(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Berkas Lampiran</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {attachments.map((attachment: any, index: number) => (
              <div
                key={attachment.id || index}
                className="flex justify-between items-center py-3 border-b last:border-0"
              >
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">
                    {attachment.masterBerkas?.nama || `Berkas ${index + 1}`}
                  </span>
                  <span className="text-xs text-gray-400">
                    {attachment.nama_file}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePreview(attachment)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Lihat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PdfPreviewDialog
        isOpen={!!selectedFile}
        onClose={handleClose}
        fileUrl={selectedFile?.url || null}
        fileName={selectedFile?.name || ""}
      />
    </>
  );
};

export default BerkasLampiranCard;
