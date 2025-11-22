import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BerkasLampiranCardProps {
  attachments: any[];
}

const BerkasLampiranCard = ({ attachments }: BerkasLampiranCardProps) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Berkas Lampiran</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {attachments.map((attachment: any, index: number) => (
            <div
              key={attachment.id || index}
              className="flex justify-between items-center py-2 border-b"
            >
              <span className="text-gray-700">
                {attachment.nama || `Berkas ${index + 1}`}
              </span>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BerkasLampiranCard;
