import { Button } from "@/components/ui/button";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import { AlertCircle, Send, FileText, User, ArrowRight } from "lucide-react";
import SidebarInfo from "./SidebarInfo";
import usePengaduan from "./usePengaduan";

export default function Pengaduan() {
  const { form } = usePengaduan();

  return (
    <MainLayout title="Pengaduan | KRK Bengkulu">
      <div className="min-h-[81vh] bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                Layanan Pengaduan Masyarakat
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Formulir Pengaduan
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                KRK Online
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Sampaikan keluhan, kritik, atau saran Anda untuk perbaikan layanan
              Keterangan Rencana Kota
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 flex justify-center">
              <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden py-0">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <AlertCircle className="text-white" size={24} />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        Formulir Pengaduan
                      </CardTitle>
                      <p className="text-blue-100 mt-1">
                        Sampaikan keluhan atau masukan Anda
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-8">
                  <Form {...form}>
                    <form className="space-y-6">
                      <FormField
                        control={form.control}
                        name="judul"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                              <FileText size={16} />
                              Judul Pengaduan
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Contoh: Proses verifikasi yang terlalu lama"
                                {...field}
                                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-3"
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
                          <FormItem className="space-y-3">
                            <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                              <User size={16} />
                              Jenis Layanan
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 py-3">
                                  <SelectValue placeholder="Pilih layanan yang terkait" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pelayanan-publik">
                                  Pelayanan Publik
                                </SelectItem>
                                <SelectItem value="infrastruktur">
                                  Infrastruktur
                                </SelectItem>
                                <SelectItem value="perizinan">
                                  Perizinan
                                </SelectItem>
                                <SelectItem value="sistem-online">
                                  Sistem Online
                                </SelectItem>
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
                          <FormItem className="space-y-3">
                            <FormLabel className="text-gray-700 font-semibold flex items-center gap-2">
                              <AlertCircle size={16} />
                              Detail Pengaduan
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Jelaskan secara detail pengaduan Anda, termasuk tanggal, waktu, dan kronologi kejadian..."
                                rows={6}
                                {...field}
                                className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                              />
                            </FormControl>
                            <div className="flex justify-between text-sm text-gray-500">
                              <span>Minimal 10 karakter</span>
                              <span>{field.value.length}/1000 karakter</span>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl border-gray-300 hover:bg-gray-50 flex-1 py-3"
                        >
                          Batal
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex-1 py-3"
                        >
                          {/* {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Mengirim...
                        </div>
                      ) : ( */}
                          <div className="flex items-center gap-2">
                            <Send size={18} />
                            Kirim Pengaduan
                            <ArrowRight size={16} />
                          </div>
                          {/* )} */}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <SidebarInfo />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
