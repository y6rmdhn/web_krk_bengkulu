import { Card, CardContent } from "@/components/ui/card";
import MenuItem from "@/components/commons/MenuItem/MenuItem";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import InforSection from "./InfoSection";
import CtaSection from "./CtaSection";
import { MENU_ITEMS } from "./LayananKrk.constant";

export default function LayananKrk() {
  return (
    <MainLayout title="Layanan KRK | KRK Bengkulu">
      <div className="min-h-[81vh] bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <main className="container max-w-6xl mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">
                Layanan Keterangan Rencana Kota
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Layanan KRK
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Kota Bengkulu
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Pilih jenis layanan KRK yang Anda butuhkan. Proses digital yang
              cepat, transparan, dan terintegrasi.
            </p>
          </div>

          {/* Menu Grid */}
          <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl mb-12">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MENU_ITEMS.map((item, index) => (
                  <MenuItem
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    href={item.href}
                    description={item.description}
                    gradient={item.gradient}
                    color={item.color}
                    delay={index * 100}
                    iconComponent={item.iconComponent}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Section */}
          <InforSection />

          {/* CTA Section */}
          <CtaSection />
        </main>
      </div>
    </MainLayout>
  );
}
