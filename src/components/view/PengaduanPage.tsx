// src/components/PengaduanPage.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Header from "../widgets/Header";

// Schema validation untuk Pengaduan
const pengaduanSchema = z.object({
  judul: z
    .string()
    .min(1, "Judul pengaduan harus diisi")
    .min(5, "Judul pengaduan minimal 5 karakter")
    .max(100, "Judul pengaduan maksimal 100 karakter"),
  layanan: z.string().min(1, "Layanan harus dipilih"),
  pengaduan: z
    .string()
    .min(1, "Detail pengaduan harus diisi")
    .min(10, "Detail pengaduan minimal 10 karakter")
    .max(1000, "Detail pengaduan maksimal 1000 karakter"),
});

type PengaduanFormValues = z.infer<typeof pengaduanSchema>;

// Komponen untuk Tampilan Awal (sebelum ikon diklik)
function InitialView({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full max-w-2xl mt-8">
      <Card className="p-4">
        <button
          onClick={onStart}
          className="w-full flex justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src="/img/icon-petruk.png"
            alt="Mulai Pengaduan"
            className="h-20"
          />
        </button>
      </Card>
    </div>
  );
}

// Komponen untuk Tampilan Formulir
function FormView({ onCancel }: { onCancel: () => void }) {
  // Initialize form dengan react-hook-form dan zod resolver
  const form = useForm<PengaduanFormValues>({
    resolver: zodResolver(pengaduanSchema),
    defaultValues: {
      judul: "",
      layanan: "",
      pengaduan: "",
    },
  });

  function onSubmit(data: PengaduanFormValues) {
    console.log("Data Pengaduan:", data);
    // Handle form submission logic here
    // Setelah submit berhasil, bisa reset form atau redirect
    form.reset();
    onCancel(); // Kembali ke tampilan awal setelah submit
  }

  return (
    <div className="w-full max-w-2xl mt-8 bg-white rounded-lg shadow-2xl border">
      {/* Header Formulir */}
      <div className="bg-blue-800 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">Formulir Pengaduan</h2>
      </div>

      {/* Isi Formulir */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
          <FormField
            control={form.control}
            name="judul"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Judul <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan judul pengaduan Anda"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="layanan"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  Layanan <span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Layanan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pelayanan-publik">
                      Pelayanan Publik
                    </SelectItem>
                    <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
                    <SelectItem value="perizinan">Perizinan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pengaduan"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Pengaduan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tuliskan detail pengaduan Anda di sini..."
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Kirim
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

// Komponen Utama Halaman
export default function PengaduanPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header children={true} />
      <div className="flex-1 w-full flex flex-col items-center p-4 sm:p-8 bg-sky-100 relative overflow-hidden min-h-screen">
        {/* Konten Atas dan Tengah */}
        <div className="z-10 w-full flex flex-col items-center">
          <img src="/img/jadi 2.png" alt="Si Petruk Logo" className="h-16" />

          {/* Conditional Rendering: Tampilkan view berdasarkan state */}
          {showForm ? (
            <FormView onCancel={() => setShowForm(false)} />
          ) : (
            <InitialView onStart={() => setShowForm(true)} />
          )}
        </div>
      </div>
    </>
  );
}
