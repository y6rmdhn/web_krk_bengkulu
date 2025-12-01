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
        {/* --- Background Elements --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/img/image 1.png"
            alt="Green City Illustration"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/60"></div>
        </div>

        {/* Decorative Blobs (Responsive Size) */}
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-green-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-10 md:-bottom-48 md:left-20 w-64 h-64 md:w-96 md:h-96 bg-emerald-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>

        <main className="mx-auto w-full max-w-6xl mt-8 md:mt-20 px-4 sm:px-6 lg:px-8 relative z-10">
          {/* --- Header Section --- */}
          <div className="text-center mb-8 md:mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-3 shadow-lg border border-white/40 mb-4 md:mb-6">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-semibold text-gray-700 tracking-wide">
                Sistem Informasi Terintegrasi
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 md:mb-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
              KRK Online
              <span className="block mt-1 md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-blue-700">
                Kota Bengkulu
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium px-2">
              Layanan digital terpadu untuk pengurusan Keterangan Rencana Kota
              dengan proses yang cepat, transparan, dan akuntabel
            </p>
          </div>

          {/* --- Menu Grid Section --- */}
          <Card className="relative overflow-hidden bg-transparent border-none shadow-none">
            <CardContent className="p-0 md:p-6">
              {/* Grid System: 2 Kolom di Mobile, 4 di Desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
