import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import usePermohohanKrk from "./usePermohohanKrk";
import DataPemohonForm from "./DataPemohonForm/DataPemohonForm";
import DataPemilik from "./DataPemilikForm/DataPemilik";
import DataLokasi from "./DataLokasiForm/DataLokasi";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight, FileText, FolderOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function PermohonanKrk() {
  const {
    form,
    onSubmit,
    isPending,
    isEligible,
    isLoadingCheck,
    progressString,
    totalRequired,
    totalUploaded,
  } = usePermohohanKrk();
  const navigate = useNavigate();

  const handleCopyData = (isChecked: boolean) => {
    if (isChecked) {
      const values = form.getValues();

      // Salin data teks biasa
      form.setValue("nama_pemilik", values.nama_pemohon);
      form.setValue("no_ktp_pemilik", values.no_ktp_pemohon);
      form.setValue("email_pemilik", values.email_pemohon);
      form.setValue("no_hp_pemilik", values.no_hp_pemohon);
      form.setValue("alamat_pemilik", values.alamat_pemohon);
      form.setValue("no_lokasi_pemilik", values.no_lokasi_pemohon);
      form.setValue("rt_lokasi_pemilik", values.rt_lokasi_pemohon);
      form.setValue("rw_lokasi_pemilik", values.rw_lokasi_pemohon);

      // Salin NAMA wilayah
      // Ini akan men-trigger useEffect di DataPemilik.tsx
      // yang akan otomatis mencari ID dan mengisi dropdown anak.
      form.setValue("provinsi_pemilik", values.provinsi_pemohon);
      form.setValue("kota_pemilik", values.kota_pemohon);
      form.setValue("kecamatan_pemilik", values.kecamatan_pemohon);
      form.setValue("kelurahan_pemilik", values.kelurahan_pemohon);
    }
    // Jika uncheck, opsi untuk mengosongkan kembali bisa ditambahkan jika perlu
  };

  if (isLoadingCheck) {
    return (
      <MainLayout title="Permohonan | KRK Bengkulu" isBgGray isPaddingY>
        <div className="max-w-7xl mx-auto space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </MainLayout>
    );
  }

  if (!isEligible) {
    // Hitung persentase untuk progress bar
    const percentage = Math.round((totalUploaded / totalRequired) * 100);

    return (
      <MainLayout title="Permohonan | KRK Bengkulu" isBgGray isPaddingY>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <Card className="max-w-xl w-full shadow-2xl border-none ring-1 ring-gray-200 overflow-hidden">
            {/* Header Section dengan Background Soft */}
            <div className="bg-amber-50 border-b border-amber-100 p-8 flex flex-col items-center text-center space-y-4">
              <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center ring-4 ring-amber-50">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  Kelengkapan Berkas Dibutuhkan
                </h2>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Mohon maaf, Anda belum bisa melanjutkan proses ini. Profil
                  Anda belum memenuhi syarat administrasi.
                </p>
              </div>
            </div>

            <CardContent className="p-8 space-y-6">
              {/* Progress Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-end text-sm">
                  <span className="font-medium text-gray-700 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-gray-400" />
                    Status Dokumen
                  </span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {progressString} Terupload
                  </span>
                </div>

                <Progress
                  value={percentage}
                  className="h-3"
                  indicatorClassName="bg-blue-600"
                />

                <p className="text-xs text-gray-400 text-right">
                  {percentage}% Lengkap
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4 items-start">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 shrink-0">
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Mengapa ini penting?
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Sistem KRK membutuhkan verifikasi dokumen lengkap (KTP,
                    Sertifikat, PBB, dll) sebelum Anda dapat mengajukan
                    pengukuran tanah.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-0 flex justify-center">
              <Button
                onClick={() => navigate("/berkas")}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 shadow-blue-200 shadow-lg text-base font-medium h-12 gap-2"
              >
                Lengkapi Berkas Sekarang
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Footer Text kecil */}
          <p className="mt-8 text-sm text-gray-400 text-center">
            Dinas Pekerjaan Umum dan Penataan Ruang <br /> Kota Bengkulu
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Permohonan | KRK Bengkulu" isBgGray isPaddingY>
      <Card className="max-w-7xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Permohonan Verifikasi Hasil Ukur
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                <DataPemohonForm form={form} />

                <div className="space-y-6">
                  <div className="flex items-center space-x-2 bg-gray-50 p-4 rounded-md border border-gray-200">
                    <input
                      id="copy-data"
                      type="checkbox"
                      onChange={(e) => handleCopyData(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    />
                    <label
                      htmlFor="copy-data"
                      className="text-sm font-medium cursor-pointer"
                    >
                      Data pemohon sama dengan pemilik
                    </label>
                  </div>

                  <DataPemilik form={form} />
                </div>
              </div>

              <DataLokasi form={form} />

              <div className="flex justify-end items-center gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-5"
                  disabled={isPending}
                >
                  {isPending ? "Menyimpan..." : "Simpan Permohonan"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
