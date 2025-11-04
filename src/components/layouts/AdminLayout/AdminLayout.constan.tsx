import { FaUpload } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "dasboard",
    label: "Dasboard",
    href: "/admin/dasboard",
    icon: <FaChartPie />,
  },
  {
    key: "permohonanKrk",
    label: "Permohonan Krk",
    href: "/admin/permohonan-krk",
    icon: <FaUpload />,
  },
  {
    key: "riwayatPermohonanKrk",
    label: "Riwayat Permohonan KRK",
    href: "/admin/riwayat-permohonan-krk",
    icon: <IoLayers />,
  },
];

export { SIDEBAR_ADMIN };
