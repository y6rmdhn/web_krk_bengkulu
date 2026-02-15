import { FaFileSignature } from "react-icons/fa";

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
    icon: <FaFileSignature />,
  },
  {
    key: "SKTTESelesai",
    label: "SK TTE Selesai",
    href: "/kepala-dinas/sk-tte-selesai",
    icon: <FaFileSignature />,
  },
  {
    key: "ListSKKRK",
    label: "List SK KRK",
    href: "/kepala-dinas/permohonan-sk-lainnya",
    icon: <FaFileSignature />,
  },
];

export { SIDEBAR_ADMIN };
