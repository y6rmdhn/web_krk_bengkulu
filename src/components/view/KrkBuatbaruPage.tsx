// components/LayananKotaPage.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function KrkBuatBaruPage() {
  return (
    <div className="w-full bg-gray-100 p-4 sm:p-6 md:p-8">
      <main className="max-w-8xl mx-auto">
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

              <div className="border rounded-md p-2 sm:p-4">
                <img
                  src="/img/flowchart-layanan.png"
                  alt="Panduan Pengajuan Keterangan Rencana Kota"
                  width={1200}
                  height={700}
                  className="w-full h-auto"
                />
              </div>

              <div className="flex items-center justify-center space-x-2 pt-4">
                <Checkbox id="terms-checkbox" />
                <Label
                  htmlFor="terms-checkbox"
                  className="font-medium text-gray-700 cursor-pointer"
                >
                  Saya mengerti dengan persyaratan permohonan
                </Label>
              </div>

              <div className="flex justify-center pt-2">
                <Button className="bg-[#1D4ED8] hover:bg-[#1E40AF] px-10 py-6 text-base">
                  Buat Permohonan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
