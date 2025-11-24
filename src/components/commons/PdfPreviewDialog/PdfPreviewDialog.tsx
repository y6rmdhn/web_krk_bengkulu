import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles wajib
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Sesuaikan versi pdfjs-dist dengan yang diinstall (biasanya otomatis, tapi perlu URL worker)
// Kita pakai CDN unpkg agar tidak ribet config webpack/vite
const WORKER_URL =
  "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

interface PdfPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string | null;
  fileName: string;
}

const PdfPreviewDialog = ({
  isOpen,
  onClose,
  fileUrl,
  fileName,
}: PdfPreviewDialogProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Preview: {fileName}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden border rounded-md bg-gray-100">
          {fileUrl ? (
            <Worker workerUrl={WORKER_URL}>
              <Viewer
                fileUrl={fileUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          ) : (
            <div className="flex items-center justify-center h-full">
              File tidak ditemukan
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfPreviewDialog;
