import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <MainLayout title="Berhasil Buat Permohonan | KRK Bengkulu">
      <div className="flex min-h-screen flex-col">
        <div className="relative flex flex-1 items-center justify-center p-4">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/img/image 1.png"
              alt="Green City Illustration"
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <Card className="relative z-10 w-full max-w-2xl p-6 sm:p-10 text-center shadow-2xl rounded-2xl">
            <CardContent className="flex flex-col items-center gap-6">
              <h1 className="text-2xl sm:text-3xl font-bold border-b-2 border-black pb-3 inline-block">
                Permohonan Anda Telah Kami Terima
              </h1>

              <div className="pt-4">
                <p className="text-gray-600">No Pendaftaran :</p>
                <p className="text-4xl sm:text-5xl font-bold tracking-wider text-gray-800 mt-1">
                  1.321.98
                </p>
              </div>

              <div className="pt-2">
                <p className="text-gray-600">
                  Bukti Pengajuan Permohonan Akan Dikirim Ke Email
                </p>
                <p className="font-semibold text-gray-800 mt-1">
                  contohuser@gmail.com
                </p>
              </div>

              <p className="text-2xl font-bold pt-4">Terima Kasih</p>

              <Link to="/" className="w-full flex justify-center pt-4">
                <Button className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-lg py-6 rounded-lg">
                  Kembali
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
