import { FaFileSignature } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "permohonanSKTTE",
    label: "Permohonan SK TTE",
    href: "/kepala-dinas/permohonan-sk-tte",
    icon: <FaFileSignature />,
  },
  {
    key: "TTESKSelesai",
    label: "TTE SK Selesai",
    href: "/kepala-dinas/tte-sk-selesai",
    icon: <FaCheckCircle />,
  },
  {
    key: "TTESKDitolak",
    label: "TTE SK Ditolak",
    href: "/kepala-dinas/tte-sk-ditolak",
    icon: <FaTimesCircle />,
  },
];

export { SIDEBAR_ADMIN };
