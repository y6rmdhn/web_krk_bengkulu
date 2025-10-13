// components/PermohonanVerifikasiForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputField from "../widgets/InputField";
import Header from "../widgets/Header";

// Schema validation untuk Permohonan Verifikasi
const permohonanSchema = z.object({
  // Seksi 1: Pilih Wilayah & Peta
  layanan: z.string().min(1, "Layanan harus diisi"),
  kecamatanWilayah: z.string().min(1, "Kecamatan wilayah harus diisi"),
  kelurahanWilayah: z.string().min(1, "Kelurahan wilayah harus diisi"),
  koordinat: z.string().min(1, "Koordinat harus diisi"),

  // Seksi 2: Data Pemohon
  noKtpPemohon: z
    .string()
    .min(1, "No KTP pemohon harus diisi")
    .min(16, "No KTP harus 16 digit")
    .max(16, "No KTP harus 16 digit")
    .regex(/^\d+$/, "No KTP harus berupa angka"),
  namaPemohon: z.string().min(1, "Nama pemohon harus diisi"),
  emailPemohon: z
    .string()
    .min(1, "Email pemohon harus diisi")
    .email("Format email tidak valid"),
  noTelpPemohon: z
    .string()
    .min(1, "No telepon pemohon harus diisi")
    .min(10, "No telepon minimal 10 digit")
    .regex(/^\d+$/, "No telepon harus berupa angka"),
  alamatPemohon: z.string().min(1, "Alamat pemohon harus diisi"),
  noPemohon: z.string().min(1, "No harus diisi"),
  rtPemohon: z
    .string()
    .min(1, "RT harus diisi")
    .regex(/^\d+$/, "RT harus berupa angka"),
  rwPemohon: z
    .string()
    .min(1, "RW harus diisi")
    .regex(/^\d+$/, "RW harus berupa angka"),
  provinsiPemohon: z.string().min(1, "Provinsi pemohon harus diisi"),
  kotaPemohon: z.string().min(1, "Kota pemohon harus diisi"),
  kecamatanPemohon: z.string().min(1, "Kecamatan pemohon harus diisi"),
  kelurahanPemohon: z.string().min(1, "Kelurahan pemohon harus diisi"),
  pemohonPemilik: z.string().min(1, "Field ini harus diisi"),

  // Seksi 2: Data Pemilik
  noKtpPemilik: z
    .string()
    .min(1, "No KTP pemilik harus diisi")
    .min(16, "No KTP harus 16 digit")
    .max(16, "No KTP harus 16 digit")
    .regex(/^\d+$/, "No KTP harus berupa angka"),
  namaPemilik: z.string().min(1, "Nama pemilik harus diisi"),
  emailPemilik: z
    .string()
    .min(1, "Email pemilik harus diisi")
    .email("Format email tidak valid"),
  noTelpPemilik: z
    .string()
    .min(1, "No telepon pemilik harus diisi")
    .min(10, "No telepon minimal 10 digit")
    .regex(/^\d+$/, "No telepon harus berupa angka"),
  alamatPemilik: z.string().min(1, "Alamat pemilik harus diisi"),
  noPemilik: z.string().min(1, "No harus diisi"),
  rtPemilik: z
    .string()
    .min(1, "RT harus diisi")
    .regex(/^\d+$/, "RT harus berupa angka"),
  rwPemilik: z
    .string()
    .min(1, "RW harus diisi")
    .regex(/^\d+$/, "RW harus berupa angka"),
  provinsiPemilik: z.string().min(1, "Provinsi pemilik harus diisi"),
  kotaPemilik: z.string().min(1, "Kota pemilik harus diisi"),
  kecamatanPemilik: z.string().min(1, "Kecamatan pemilik harus diisi"),
  kelurahanPemilik: z.string().min(1, "Kelurahan pemilik harus diisi"),

  // Seksi 3: Data Lokasi
  alamatBangunan: z.string().min(1, "Alamat bangunan harus diisi"),
  noBangunan: z.string().min(1, "No bangunan harus diisi"),
  rtBangunan: z
    .string()
    .min(1, "RT bangunan harus diisi")
    .regex(/^\d+$/, "RT harus berupa angka"),
  rwBangunan: z
    .string()
    .min(1, "RW bangunan harus diisi")
    .regex(/^\d+$/, "RW harus berupa angka"),
  luasTanah: z.string().min(1, "Luas tanah harus diisi"),
  letakAntarJalan: z.string().min(1, "Letak antar jalan harus diisi"),
  sdJalan: z.string().min(1, "s/d jalan harus diisi"),
  fungsiBangunan: z.string().min(1, "Fungsi bangunan harus diisi"),
  simbLama: z.string().min(1, "SIMB lama harus diisi"),
  dipersimpangan: z.string().min(1, "Field ini harus diisi"),
  noSertifikatTanah: z.string().min(1, "No sertifikat tanah harus diisi"),
  sertifikatSurat: z.string().min(1, "Sertifikat/surat tanah harus diisi"),
  pbb: z.string().min(1, "PBB harus diisi"),
  hasilUkur: z.string().min(1, "Hasil ukur harus diisi"),
  lainLain: z.string().min(1, "Field lain-lain harus diisi"),

  // Seksi 4: Captcha
  captcha: z.string().min(1, "Captcha harus diisi"),
});

type PermohonanFormValues = z.infer<typeof permohonanSchema>;

// Komponen kecil untuk judul setiap seksi (bulatan biru + teks)
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 bg-blue-600 rounded-full" />
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
  );
}

export default function PermohonanVerifikasiPage() {
  // Initialize form dengan react-hook-form dan zod resolver
  const form = useForm<PermohonanFormValues>({
    resolver: zodResolver(permohonanSchema),
    defaultValues: {
      // Seksi 1
      layanan: "",
      kecamatanWilayah: "",
      kelurahanWilayah: "",
      koordinat: "",

      // Seksi 2: Data Pemohon
      noKtpPemohon: "",
      namaPemohon: "",
      emailPemohon: "",
      noTelpPemohon: "",
      alamatPemohon: "",
      noPemohon: "",
      rtPemohon: "",
      rwPemohon: "",
      provinsiPemohon: "",
      kotaPemohon: "",
      kecamatanPemohon: "",
      kelurahanPemohon: "",
      pemohonPemilik: "",

      // Seksi 2: Data Pemilik
      noKtpPemilik: "",
      namaPemilik: "",
      emailPemilik: "",
      noTelpPemilik: "",
      alamatPemilik: "",
      noPemilik: "",
      rtPemilik: "",
      rwPemilik: "",
      provinsiPemilik: "",
      kotaPemilik: "",
      kecamatanPemilik: "",
      kelurahanPemilik: "",

      // Seksi 3: Data Lokasi
      alamatBangunan: "",
      noBangunan: "",
      rtBangunan: "",
      rwBangunan: "",
      luasTanah: "",
      letakAntarJalan: "",
      sdJalan: "",
      fungsiBangunan: "",
      simbLama: "",
      dipersimpangan: "",
      noSertifikatTanah: "",
      sertifikatSurat: "",
      pbb: "",
      hasilUkur: "",
      lainLain: "",

      // Seksi 4: Captcha
      captcha: "",
    },
  });

  function onSubmit(data: PermohonanFormValues) {
    console.log("Data Permohonan:", data);
    // Handle form submission logic here
  }

  const handleRefreshCaptcha = () => {
    // Logic untuk refresh captcha
    console.log("Refresh captcha");
  };

  return (
    <div className="w-full bg-gray-50 ">
      <Header children={true} />
      <Card className="max-w-7xl mx-auto shadow-lg mt-10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Permohonan Verifikasi Hasil Ukur
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              {/* --- SEKSI 1: PILIH WILAYAH & PETA --- */}
              <div className="space-y-6">
                <SectionTitle title="Pilih Wilayah" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField
                    id="layanan"
                    label="Layanan"
                    form={form}
                    name="layanan"
                  />
                  <InputField
                    id="kecamatan-wilayah"
                    label="Kecamatan"
                    form={form}
                    name="kecamatanWilayah"
                  />
                  <InputField
                    id="kelurahan-wilayah"
                    label="Kelurahan"
                    form={form}
                    name="kelurahanWilayah"
                  />
                </div>

                <div className="pt-6">
                  <SectionTitle title="Pilih Lokasi Persil Peta" />
                </div>
                <Input id="search-maps" placeholder="Search Google Maps" />
                {/* Placeholder untuk Peta Google */}
                <div className="w-full h-80 rounded-md border-2 border-dashed bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-500">
                    Google Maps Component Placeholder
                  </p>
                </div>
                <InputField
                  id="koordinat"
                  label="Koordinat"
                  form={form}
                  name="koordinat"
                />
              </div>

              {/* --- SEKSI 2: DATA PEMOHON & PEMILIK --- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                {/* KOLOM KIRI: DATA PEMOHON */}
                <div className="space-y-6">
                  <SectionTitle title="Data Pemohon" />
                  <InputField
                    id="no-ktp-pemohon"
                    label="No KTP"
                    form={form}
                    name="noKtpPemohon"
                  />
                  <InputField
                    id="nama-pemohon"
                    label="Nama"
                    form={form}
                    name="namaPemohon"
                  />
                  <InputField
                    id="email-pemohon"
                    label="Email"
                    type="email"
                    form={form}
                    name="emailPemohon"
                  />
                  <InputField
                    id="no-telp-pemohon"
                    label="No Telp"
                    type="tel"
                    form={form}
                    name="noTelpPemohon"
                  />
                  <InputField
                    id="alamat-pemohon"
                    label="Alamat"
                    form={form}
                    name="alamatPemohon"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <InputField
                      id="no-pemohon"
                      label="No"
                      form={form}
                      name="noPemohon"
                    />
                    <InputField
                      id="rt-pemohon"
                      label="RT"
                      form={form}
                      name="rtPemohon"
                    />
                    <InputField
                      id="rw-pemohon"
                      label="RW"
                      form={form}
                      name="rwPemohon"
                    />
                  </div>
                  <InputField
                    id="provinsi-pemohon"
                    label="Provinsi"
                    form={form}
                    name="provinsiPemohon"
                  />
                  <InputField
                    id="kota-pemohon"
                    label="Kota"
                    form={form}
                    name="kotaPemohon"
                  />
                  <InputField
                    id="kecamatan-pemohon"
                    label="Kecamatan"
                    form={form}
                    name="kecamatanPemohon"
                  />
                  <InputField
                    id="kelurahan-pemohon"
                    label="Kelurahan"
                    form={form}
                    name="kelurahanPemohon"
                  />
                  {/* Di aplikasi nyata, ini adalah komponen upload file */}
                  <FormField
                    control={form.control}
                    name="pemohonPemilik"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Upload KTP</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <InputField
                    id="pemohon-pemilik"
                    label="Pemohon adalah pemilik?"
                    form={form}
                    name="pemohonPemilik"
                  />
                </div>

                {/* KOLOM KANAN: DATA PEMILIK SERTIFIKAT */}
                <div className="space-y-6">
                  <SectionTitle title="Data Pemilik Sesuai Sertifikat" />
                  <InputField
                    id="no-ktp-pemilik"
                    label="No KTP"
                    form={form}
                    name="noKtpPemilik"
                  />
                  <InputField
                    id="nama-pemilik"
                    label="Nama"
                    form={form}
                    name="namaPemilik"
                  />
                  <InputField
                    id="email-pemilik"
                    label="Email"
                    type="email"
                    form={form}
                    name="emailPemilik"
                  />
                  <InputField
                    id="no-telp-pemilik"
                    label="No Telp"
                    type="tel"
                    form={form}
                    name="noTelpPemilik"
                  />
                  <InputField
                    id="alamat-pemilik"
                    label="Alamat"
                    form={form}
                    name="alamatPemilik"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <InputField
                      id="no-pemilik"
                      label="No"
                      form={form}
                      name="noPemilik"
                    />
                    <InputField
                      id="rt-pemilik"
                      label="RT"
                      form={form}
                      name="rtPemilik"
                    />
                    <InputField
                      id="rw-pemilik"
                      label="RW"
                      form={form}
                      name="rwPemilik"
                    />
                  </div>
                  <InputField
                    id="provinsi-pemilik"
                    label="Provinsi"
                    form={form}
                    name="provinsiPemilik"
                  />
                  <InputField
                    id="kota-pemilik"
                    label="Kota"
                    form={form}
                    name="kotaPemilik"
                  />
                  <InputField
                    id="kecamatan-pemilik"
                    label="Kecamatan"
                    form={form}
                    name="kecamatanPemilik"
                  />
                  <InputField
                    id="kelurahan-pemilik"
                    label="Kelurahan"
                    form={form}
                    name="kelurahanPemilik"
                  />
                </div>
              </div>

              {/* --- SEKSI 3: DATA LOKASI --- */}
              <div className="space-y-6">
                <SectionTitle title="Data Lokasi" />
                <p className="text-red-600 text-sm">
                  *) Data harus sesuai dengan sertifikat
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
                  {/* KOLOM KIRI */}
                  <div className="space-y-6">
                    <InputField
                      id="alamat-bangunan"
                      label="Alamat Bangunan"
                      form={form}
                      name="alamatBangunan"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <InputField
                        id="no-bangunan"
                        label="No"
                        form={form}
                        name="noBangunan"
                      />
                      <InputField
                        id="rt-bangunan"
                        label="RT"
                        form={form}
                        name="rtBangunan"
                      />
                      <InputField
                        id="rw-bangunan"
                        label="RW"
                        form={form}
                        name="rwBangunan"
                      />
                    </div>
                    <InputField
                      id="luas-tanah"
                      label="Luas Tanah"
                      form={form}
                      name="luasTanah"
                    />
                    <InputField
                      id="letak-antar-jalan"
                      label="Letak Antar Jalan"
                      form={form}
                      name="letakAntarJalan"
                    />
                    <InputField
                      id="sd-jalan"
                      label="s/d jalan"
                      form={form}
                      name="sdJalan"
                    />
                    <InputField
                      id="fungsi-bangunan"
                      label="Fungsi Bangunan"
                      form={form}
                      name="fungsiBangunan"
                    />
                    <InputField
                      id="simb-lama"
                      label="SIMB Lama"
                      form={form}
                      name="simbLama"
                    />
                    <InputField
                      id="dipersimpangan"
                      label="Dipersimpangan Jalan?"
                      form={form}
                      name="dipersimpangan"
                    />
                  </div>
                  {/* KOLOM KANAN */}
                  <div className="space-y-6">
                    <InputField
                      id="no-sertifikat-tanah"
                      label="No Sertifikat Tanah"
                      form={form}
                      name="noSertifikatTanah"
                    />
                    <InputField
                      id="sertifikat-surat"
                      label="Sertifikat/Surat Tanah"
                      form={form}
                      name="sertifikatSurat"
                    />
                    <InputField id="pbb" label="PBB" form={form} name="pbb" />
                    <InputField
                      id="hasil-ukur"
                      label="Hasil Ukur"
                      form={form}
                      name="hasilUkur"
                    />
                    <InputField
                      id="lain-lain"
                      label="Lain-lain"
                      form={form}
                      name="lainLain"
                    />
                  </div>
                </div>
              </div>

              {/* --- SEKSI 4: CAPTCHA & TOMBOL --- */}
              <div className="space-y-8 pt-6">
                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <FormLabel className="sm:w-1/6">Captcha</FormLabel>
                        {/* Placeholder untuk gambar Captcha */}
                        <div className="p-2 border rounded-md bg-gray-200">
                          <span className="font-bold text-2xl tracking-widest italic">
                            4038572
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleRefreshCaptcha}
                        >
                          C
                        </Button>
                        <FormControl>
                          <Input placeholder="Masukkan captcha..." {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end items-center gap-4 pt-4">
                  <Button
                    type="button"
                    variant="destructive"
                    className="px-8 py-5"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-5"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
