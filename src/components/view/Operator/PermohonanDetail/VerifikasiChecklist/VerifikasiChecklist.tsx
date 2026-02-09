import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface VerifikasiChecklistProps {
  onVerificationChange: (isAllVerified: boolean) => void;
}

const REQUIRED_DOCUMENTS = [
  { id: "ktp", label: "KTP Pemohon (Valid & Terbaca)" },
  { id: "sertifikat", label: "Sertifikat Tanah / Bukti Kepemilikan" },
  { id: "pbb", label: "Pajak Bangunan Berdiri" },
  { id: "rencana_tapak", label: "Rencana Tapak" },
];

const VerifikasiChecklist = ({
  onVerificationChange,
}: VerifikasiChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Hitung apakah semua item sudah dicentang
  const allChecked = REQUIRED_DOCUMENTS.every((doc) => checkedItems[doc.id]);

  useEffect(() => {
    onVerificationChange(allChecked);
  }, [allChecked, onVerificationChange]);

  // Fungsi toggle yang aman (membalikkan nilai sebelumnya)
  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Card className="border-blue-200 shadow-sm">
      <CardHeader className="pb-3 bg-blue-50/50">
        <CardTitle className="text-base font-bold flex items-center gap-2 text-blue-800">
          <CheckCircle2 className="h-5 w-5" />
          Checklist Verifikasi Dokumen
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grid gap-4">
        <p className="text-sm text-gray-500 mb-2">
          Operator wajib memeriksa dan mencentang poin berikut sebelum dapat
          menyetujui permohonan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REQUIRED_DOCUMENTS.map((doc) => {
            const isChecked = !!checkedItems[doc.id]; // Pastikan boolean strict

            return (
              <div
                key={doc.id}
                // 1. Tambahkan onClick di Container Wrapper agar area klik luas
                onClick={() => toggleItem(doc.id)}
                className={`flex items-start space-x-3 border p-3 rounded-md transition-colors cursor-pointer select-none ${
                  isChecked
                    ? "bg-green-50 border-green-200"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Checkbox
                  id={doc.id}
                  checked={isChecked}
                  // 2. Stop Propagation: Agar saat checkbox diklik langsung,
                  // tidak bentrok dengan onClick milik container div
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={() => toggleItem(doc.id)}
                  className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                <div className="grid gap-1.5 leading-none pointer-events-none">
                  {/* 3. Pointer-events-none: Agar klik pada teks tembus ke div container */}
                  <Label
                    htmlFor={doc.id}
                    className={`text-sm font-medium cursor-pointer ${
                      isChecked ? "text-green-700" : "text-gray-700"
                    }`}
                  >
                    {doc.label}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>

        {!allChecked && (
          <div className="flex items-center gap-2 text-amber-600 text-xs mt-2 bg-amber-50 p-2 rounded">
            <AlertCircle className="h-4 w-4" />
            <span>
              Harap selesaikan verifikasi dokumen untuk mengaktifkan tombol
              Setujui.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerifikasiChecklist;
