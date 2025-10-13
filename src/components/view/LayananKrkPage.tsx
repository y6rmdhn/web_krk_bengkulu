// src/components/DashboardContent.tsx

import { Card, CardContent } from "@/components/ui/card";
import Header from "../widgets/Header";
import MenuItem from "../widgets/MenuItem";
const menuItems = [
  { title: "Buat Baru", icon: "/img/persyaratan.png", href: "#" },
  { title: "Perubahan", icon: "/img/", href: "#" },
  { title: "Perpanjang", icon: "/img/", href: "#" },
];

export default function LayananKrkPage() {
  return (
    <div className="flex flex-1 flex-col bg-gray-50 pb-4 sm:pb-6 lg:pb-8 min-h-[81vh] relative">
      <Header children={true} />

      <main className="mx-auto w-full max-w-3xl mt-16 relative z-10">
        <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl">
          Sistem Informasi KRK Online Kota Bengkulu
        </h1>
        <Card className="relative overflow-hidden bg-transparent bg-center bg-no-repeat p-6 border-none shadow-none">
          <CardContent className="p-4 sm:p-6 flex justify-center">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-3">
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
