import { Calendar, FileText, RefreshCw } from "lucide-react";

const MENU_ITEMS = [
  {
    title: "Buat Baru",
    icon: "/img/persyaratan.png",
    href: "/alur-pengajuan",
    description: "Ajukan permohonan KRK baru",
    gradient: "from-blue-500/10 to-cyan-500/10",
    color: "text-blue-600",
    iconComponent: FileText,
  },
  {
    title: "Perubahan",
    icon: "/img/",
    href: "#",
    description: "Ubah data permohonan existing",
    gradient: "from-orange-500/10 to-amber-500/10",
    color: "text-orange-600",
    iconComponent: RefreshCw,
  },
  {
    title: "Perpanjangan",
    icon: "/img/",
    href: "#",
    description: "Perpanjang masa berlaku KRK",
    gradient: "from-green-500/10 to-emerald-500/10",
    color: "text-green-600",
    iconComponent: Calendar,
  },
];

export { MENU_ITEMS };
