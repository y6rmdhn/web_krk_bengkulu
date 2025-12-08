import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function PanduanPengajuan() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <MainLayout title="Panduan Pengajuan | KRK Bengkulu" isBgGray>
      <div className="w-full p-4 sm:p-6 md:p-8">
        <div className="max-w-8xl mx-auto">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Layanan Keterangan Rencana Kota
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <p className="text-center font-semibold text-gray-800">
                  Berikut adalah Panduan Pengajuan Keterangan Rencana Kota
                </p>

                <div className="border rounded-md p-2 sm:p-4 bg-gray-50/50">
                  <img
                    src="/img/general/Infograpis KRK.webp"
                    alt="Panduan Pengajuan Keterangan Rencana Kota"
                    width={1200}
                    height={700}
                    className="w-full h-auto rounded-sm mix-blend-multiply"
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <div
                    onClick={() => setIsChecked(!isChecked)}
                    className={cn(
                      "flex items-start space-x-4 border rounded-xl p-4 w-full max-w-xl cursor-pointer transition-all duration-200 select-none",
                      isChecked
                        ? "border-blue-600 bg-blue-50/50 shadow-sm"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    )}
                  >
                    <Checkbox
                      checked={isChecked}
                      className="mt-0.5 h-6 w-6 border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 pointer-events-none"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label className="text-base font-medium text-gray-900 cursor-pointer pointer-events-none">
                        Saya mengerti persyaratan permohonan
                      </Label>
                      <p className="text-sm text-gray-500">
                        Dengan mencentang ini, Anda menyatakan telah membaca dan
                        memahami alur pengajuan KRK di atas.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <Button
                    onClick={() => {
                      if (isChecked) {
                        navigate("/permohonan-krk");
                      }
                    }}
                    disabled={!isChecked}
                    className="bg-[#1D4ED8] hover:bg-[#1E40AF] px-10 py-6 text-base shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
                  >
                    Buat Permohonan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
