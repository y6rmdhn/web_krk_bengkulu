import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import usePermohohanKrk from "./usePermohohanKrk";
import DataPemohonForm from "./DataPemohonForm/DataPemohonForm";
import DataPemilik from "./DataPemilikForm/DataPemilik";
import DataLokasi from "./DataLokasiForm/DataLokasi";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  XCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

export default function PermohonanKrk() {
  const { form, onSubmit, isPending, isLoadingCheck, uploadedList } =
    usePermohohanKrk();

  const navigate = useNavigate();

  const handleCopyData = (isChecked: boolean) => {
    if (isChecked) {
      const values = form.getValues();
      form.setValue("nama_pemilik", values.nama_pemohon);
      form.setValue("no_ktp_pemilik", values.no_ktp_pemohon);
      form.setValue("email_pemilik", values.email_pemohon);
      form.setValue("no_hp_pemilik", values.no_hp_pemohon);
      form.setValue("alamat_pemilik", values.alamat_pemohon);
      form.setValue("no_lokasi_pemilik", values.no_lokasi_pemohon);
      form.setValue("rt_lokasi_pemilik", values.rt_lokasi_pemohon);
      form.setValue("rw_lokasi_pemilik", values.rw_lokasi_pemohon);
      form.setValue("provinsi_pemilik", values.provinsi_pemohon);
      form.setValue("kota_pemilik", values.kota_pemohon);
      form.setValue("kecamatan_pemilik", values.kecamatan_pemohon);
      form.setValue("kelurahan_pemilik", values.kelurahan_pemohon);
    }
  };

  // Helper untuk mengecek status 4 dokumen wajib
  const checkIsUploaded = (keyword: string) => {
    if (!uploadedList) return false;
    return uploadedList.some((doc: any) =>
      JSON.stringify(doc).toLowerCase().includes(keyword.toLowerCase()),
    );
  };

  // Daftar spesifik 4 dokumen wajib
  const mandatoryDocsStatus = [
    { kode: "ktp", nama: "KTP", isUploaded: checkIsUploaded("ktp") },
    { kode: "npwp", nama: "NPWP", isUploaded: checkIsUploaded("npwp") },
    { kode: "nib", nama: "NIB", isUploaded: checkIsUploaded("nib") },
    {
      kode: "sertifikat",
      nama: "Sertifikat Tanah",
      isUploaded: checkIsUploaded("sertifikat"),
    },
  ];

  // Menghitung persentase HANYA berdasarkan 4 dokumen ini (Tiap dokumen = 25%)
  const uploadedCount = mandatoryDocsStatus.filter(
    (doc) => doc.isUploaded,
  ).length;
  const percentage = Math.round((uploadedCount / 4) * 100);

  // Flag penentu apakah form boleh diakses atau tidak (Wajib 100% / 4 dokumen)
  const isFormAccessible = percentage === 100;

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

  // JIKA BERKAS BELUM 100% -> TAMPILKAN CARD PERINGATAN (FORM DI-HIDE)
  if (!isFormAccessible) {
    return (
      <MainLayout title="Permohonan | KRK Bengkulu" isBgGray isPaddingY>
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="max-w-2xl w-full bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 px-6 py-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 20px)`,
                  }}
                />
              </div>
              <div className="relative flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-sm" />
                    <div className="relative p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                      <AlertTriangle
                        className="w-6 h-6 text-red-600"
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                    <span className="text-xs font-bold text-white tracking-wide">
                      PERHATIAN
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-xl leading-tight mb-2">
                    Dokumen Persyaratan Belum Lengkap
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Sistem KRK membutuhkan verifikasi 4 dokumen wajib sebelum
                    Anda dapat melanjutkan pengajuan permohonan.
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative px-6 py-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Status Kelengkapan Berkas
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {percentage}% dokumen telah lengkap
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700 leading-none">
                      {percentage}%
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* List 4 Dokumen Wajib */}
                <div className="mt-6">
                  <h5 className="text-sm font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
                    Daftar Dokumen Wajib:
                  </h5>
                  <ul className="space-y-3">
                    {mandatoryDocsStatus.map((doc) => (
                      <li key={doc.kode} className="flex items-start gap-3">
                        {doc.isUploaded ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                        <div>
                          <span
                            className={`text-sm ${
                              doc.isUploaded
                                ? "text-gray-400 line-through"
                                : "text-gray-700 font-medium"
                            }`}
                          >
                            {doc.nama}
                          </span>
                          {!doc.isUploaded && (
                            <p className="text-xs text-red-500 mt-0.5">
                              Belum diunggah
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => navigate("/berkas")}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white shadow-sm font-medium px-8"
                >
                  <span>Lengkapi Berkas Sekarang</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // JIKA BERKAS UDAH 100% -> TAMPILKAN FORM UTAMA
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
                <DataPemohonForm form={form} profileBerkas={uploadedList} />

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

              <DataLokasi form={form} profileBerkas={uploadedList} />

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
