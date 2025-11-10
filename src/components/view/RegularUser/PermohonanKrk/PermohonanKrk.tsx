import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import usePermohohanKrk from "./usePermohohanKrk";
import WilayahForm from "./WilayahForm/WilayahForm";
import DataPemohonForm from "./DataPemohonForm/DataPemohonForm";
import DataPemilik from "./DataPemilikForm/DataPemilik";
import DataLokasi from "./DataLokasiForm/DataLokasi";
import Captcha from "./Captcha";

export default function PermohonanKrk() {
  const { form, handleRefreshCaptcha, onSubmit } = usePermohohanKrk();

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
              <WilayahForm form={form} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                <DataPemohonForm form={form} />
                <DataPemilik form={form} />
              </div>
              <DataLokasi form={form} />
              <Captcha
                form={form}
                handleRefreshCaptcha={handleRefreshCaptcha}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
