import { FaInbox } from "react-icons/fa";

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
    icon: <FaInbox />,
  },
  {
    key: "permohonan ditolak",
    label: "Permohonan Ditolak",
    href: "/operator/permohonan-ditolak",
    icon: <FaInbox />,
  },
  {
    key: "permohonan diproses",
    label: "Final Operator",
    href: "/operator/draft-final",
    icon: <FaInbox />,
  },
  {
    key: "permohonan selesai",
    label: "Permohonan Selesai",
    href: "/operator/permohonan-selesai",
    icon: <FaInbox />,
  },
  {
    key: "tracting permohonan",
    label: "Tracking Permohonan",
    href: "/operator/tracking-permohonan",
    icon: <FaInbox />,
  },
];

export { SIDEBAR_ADMIN };
