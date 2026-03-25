import { FaInbox, FaUndo, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "permohonan Masuk",
    label: "Permohonan Masuk",
    href: "/operator/permohonan-krk",
    icon: <FaInbox />,
  },
  {
    key: "permohonan dikembalikan",
    label: "Permohonan Dikembalikan",
    href: "/operator/permohonan-dikembalikan",
    icon: <FaUndo />,
  },
  {
    key: "permohonan ditolak",
    label: "Permohonan Ditolak",
    href: "/operator/permohonan-ditolak",
    icon: <FaTimesCircle />,
  },
  {
    key: "permohonan selesai",
    label: "Permohonan Selesai",
    href: "/operator/permohonan-selesai",
    icon: <FaCheckCircle />,
  },
  // {
  //   key: "tracting permohonan",
  //   label: "Tracking Permohonan",
  //   href: "/operator/tracking",
  //   icon: <FaSearchLocation />, // Ikon pencarian lokasi/lacak untuk tracking
  // },
];

export { SIDEBAR_ADMIN };
