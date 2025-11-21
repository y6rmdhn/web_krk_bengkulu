import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import usePermohohanKrk from "./usePermohohanKrk";
import WilayahForm from "./WilayahForm/WilayahForm";
import DataPemohonForm from "./DataPemohonForm/DataPemohonForm";
import DataPemilik from "./DataPemilikForm/DataPemilik";
import DataLokasi from "./DataLokasiForm/DataLokasi";
import { Button } from "@/components/ui/button";

export default function PermohonanKrk() {
  const { form, onSubmit, isPending } = usePermohohanKrk();

  console.log("Form Errors:", form.formState.errors);

  const handleCopyData = (isChecked: boolean) => {
    if (isChecked) {
      const values = form.getValues();

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
              {/* Bagian 1: Peta */}
              <WilayahForm form={form} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                {/* Bagian 2: Data Pemohon */}
                <DataPemohonForm form={form} />

                <div className="space-y-6">
                  {/* Checkbox Copy Data */}
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

                  {/* Bagian 3: Data Pemilik (Selalu Muncul) */}
                  <DataPemilik form={form} />
                </div>
              </div>

              {/* Bagian 4: Lokasi & Captcha */}
              <DataLokasi form={form} />
              {/* <Captcha
                form={form}
                handleRefreshCaptcha={handleRefreshCaptcha}
              /> */}

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
