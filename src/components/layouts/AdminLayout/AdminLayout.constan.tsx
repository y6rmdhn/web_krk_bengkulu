import { FaInbox } from "react-icons/fa";
import { IoLayers } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "dasboard",
    label: "Dasboard",
    href: "/operator/dashboard",
    icon: <FaChartPie />,
  },
  {
    key: "permohonan Masuk",
    label: "Permohonan Masuk",
    href: "/operator/permohonan-krk",
    icon: <FaInbox />,
  },
  // {
  //   key: "permohonan DiProses",
  //   label: "Permohonan diproses",
  //   href: "/admin/permohonan-diproses",
  //   icon: <FaSpinner />,
  // },
  // {
  //   key: "permohonan DiKembalikan",
  //   label: "Permohonan dikembalikan",
  //   href: "/admin/permohonan-dikembalikan",
  //   icon: <FaUndo />,
  // },
  // {
  //   key: "permohonan Ditolak",
  //   label: "Permohonan ditolak",
  //   href: "/admin/permohonan-ditolak",
  //   icon: <FaTimesCircle />,
  // },
  // {
  //   key: "permohonan Selesai",
  //   label: "Permohonan selesai",
  //   href: "/admin/permohonan-selesai",
  //   icon: <FaCheckCircle />,
  // },
  {
    key: "trackingPermohonan",
    label: "Tracking permohonan",
    href: "/operator/riwayat-permohonan-krk",
    icon: <IoLayers />,
  },
];

export { SIDEBAR_ADMIN };
