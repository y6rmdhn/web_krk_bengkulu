// src/components/MonitoringBerkasPage.jsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "../widgets/Header";

export default function MonitoringBerkasPage() {
  return (
    <>
      <Header children={true} />
      <div className="relative flex-1 flex items-start justify-center p-4 sm:p-8">
        {/* Latar belakang ilustrasi */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* MENGGUNAKAN <img> BIASA */}
          <img
            src="/img/image 1.png" // Pastikan path ini benar
            alt="Green City Illustration Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Konten Utama */}
        <Card className="relative z-10 w-full max-w-4xl bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl border-2 border-blue-100">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Monitoring Berkas
              </h1>

              {/* Kotak Pengumuman */}
              <div className="w-full border-2 border-blue-200 rounded-lg overflow-hidden text-left">
                <div className="bg-orange-400 px-4 py-2">
                  <h2 className="text-lg font-bold text-white">
                    PENGUMUMAN PENTING
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-4 text-gray-700">
                  <p>Sesuai dengan ketentuan PP Nomor 21 Tahun 2021... (dst)</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>
                      Permohonan KRK akan kami layani sampai tanggal 22 Juli
                      2022
                    </li>
                    {/* ... item list lainnya ... */}
                  </ol>
                  <div className="pt-4">
                    {/* MENGGUNAKAN <img> BIASA */}
                    <img
                      src="/img/announcement-cityscape.png" // Ganti dengan gambar Anda
                      alt="Cityscape Illustration"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Form Input */}
              <form className="w-full max-w-lg pt-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Label
                    htmlFor="no-resi"
                    className="text-md font-semibold sm:min-w-fit"
                  >
                    No. Resi
                  </Label>
                  <Input
                    id="no-resi"
                    type="text"
                    className="flex-grow"
                    placeholder="Masukkan nomor resi Anda..."
                  />
                </div>
                <Button
                  type="submit"
                  className="mt-6 w-full sm:w-auto bg-sky-500 hover:bg-sky-600 px-8 py-6 text-base"
                >
                  Monitoring Berkas
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
