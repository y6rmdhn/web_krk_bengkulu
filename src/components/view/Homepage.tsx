// src/components/DashboardContent.tsx

import { Card, CardContent } from "@/components/ui/card";
import Header from "../widgets/Header";
import MenuItem from "../widgets/MenuItem";
const menuItems = [
  { title: "Layanan", icon: "/img/layanan.png", href: "#" },
  { title: "Monitoring", icon: "/img/monitoring.png", href: "#" },
  { title: "Peta", icon: "/img/peta.png", href: "#" },
  { title: "FAQ", icon: "/img/faq.png", href: "#" },
  { title: "Regulasi", icon: "/img/regulasi.png", href: "#" },
  { title: "Persyaratan", icon: "/img/persyaratan.png", href: "#" },
  { title: "Pengaduan", icon: "/img/pengaduan.png", href: "#" },
  { title: "Website Portal", icon: "/img/website-portal.png", href: "#" },
];

export default function Homepage() {
  return (
    <div className="flex flex-1 flex-col bg-gray-50 pb-4 sm:pb-6 lg:pb-8 min-h-[81vh] relative">
      <Header children={true} />

      <img
        src="/img/image 1.png"
        alt="Green City Illustration"
        className="absolute object-cover z-0 hidden lg:block -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2"
      />

      <main className="mx-auto w-full max-w-3xl mt-16 relative z-10">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Sistem Informasi KRK Online Kota Bengkulu
        </h1>
        <Card className="relative overflow-hidden bg-transparent bg-center bg-no-repeat p-6 border-none shadow-none">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-6">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
