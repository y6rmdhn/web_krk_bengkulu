// src/components/DashboardContent.tsx

import { Card, CardContent } from "@/components/ui/card";
import MenuItem from "@/components/commons/MenuItem";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";

const menuItems = [
  { title: "Layanan", icon: "/img/layanan.png", href: "/layanan" },
  {
    title: "Monitoring",
    icon: "/img/monitoring.png",
    href: "/monitoring-berkas",
  },
  { title: "Peta", icon: "/img/peta.png", href: "#" },
  { title: "FAQ", icon: "/img/faq.png", href: "/faq" },
  { title: "Regulasi", icon: "/img/regulasi.png", href: "/regulasi" },
  { title: "Persyaratan", icon: "/img/persyaratan.png", href: "/prosedur" },
  { title: "Pengaduan", icon: "/img/pengaduan.png", href: "/pengaduan" },
  { title: "Website Portal", icon: "/img/website-portal.png", href: "#" },
];

export default function Homepage() {
  return (
    <MainLayout title="Home | KRK Bengkulu">
      <div className="flex flex-1 flex-col bg-gradient-to-br from-green-50/80 via-blue-50/60 to-emerald-50/80 pb-6 sm:pb-8 lg:pb-12 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/image 1.png"
            alt="Green City Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/50"></div>
        </div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-48 left-20 w-96 h-96 bg-emerald-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* <Header children={true} /> */}

        <main className="mx-auto w-full max-w-6xl mt-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                Sistem Informasi Terintegrasi
              </span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight drop-shadow-sm">
              KRK Online
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-700 drop-shadow-sm">
                Kota Bengkulu
              </span>
            </h1>

            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              Layanan digital terpadu untuk pengurusan Keterangan Rencana Kota
              dengan proses yang cepat, transparan, dan akuntabel
            </p>
          </div>

          {/* Menu Grid */}
          <Card className="relative overflow-hidden bg-transparent border-none rounded-3xl shadow-none">
            <CardContent className="rder-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    href={item.href}
                    delay={index * 100}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </MainLayout>
  );
}
