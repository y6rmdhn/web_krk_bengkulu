import {
  FaFileSignature,
  FaTimesCircle,
  FaCheckCircle,
  FaListAlt,
} from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "permohonanSKTTE",
    label: "Permohonan SK TTE",
    href: "/kepala-dinas/permohonan-sk-tte",
    icon: <FaFileSignature />,
  },
  {
    key: "PengajuanKRKDitolak",
    label: "Pengajuan KRK Ditolak",
    href: "/kepala-dinas/sk-tte-ditolak",
    icon: <FaTimesCircle />,
  },
  {
    key: "SKTTESelesai",
    label: "SK TTE Selesai",
    href: "/kepala-dinas/sk-tte-selesai",
    icon: <FaCheckCircle />,
  },
  {
    key: "ListSKKRK",
    label: "List SK KRK",
    href: "/kepala-dinas/permohonan-sk-lainnya",
    icon: <FaListAlt />,
  },
];

export { SIDEBAR_ADMIN };
