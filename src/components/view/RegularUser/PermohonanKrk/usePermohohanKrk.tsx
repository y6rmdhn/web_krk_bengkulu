import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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

export type PermohonanFormValues = z.infer<typeof permohonanSchema>;


const usePermohohanKrk = () => {

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

    return {
        form,
        onSubmit,
        handleRefreshCaptcha
    }
}


export default usePermohohanKrk