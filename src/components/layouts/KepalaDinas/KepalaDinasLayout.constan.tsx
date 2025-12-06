import { FaFileSignature } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "permohonanSKTTE",
    label: "Permohonan SK TTE",
    href: "/kepala-dinas/permohonan-sk-tte",
    icon: <FaFileSignature />,
  },
  {
    key: "SKTTEDiproses",
    label: "SK TTE Diproses",
    href: "/kepala-dinas/sk-tte-diproses",
    icon: <FaFileSignature />,
  },
  {
    key: "SKTTESelesai",
    label: "SK TTE Selesai",
    href: "/kepala-dinas/sk-tte-selesai",
    icon: <FaFileSignature />,
  },
];

export { SIDEBAR_ADMIN };
