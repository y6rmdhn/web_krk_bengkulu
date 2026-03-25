import { FaInbox, FaTimesCircle, FaCheckCircle } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "disposisiMasuk",
    label: "Disposisi Masuk",
    href: "/jf/disposisi-masuk",
    icon: <FaInbox />,
  },
  {
    key: "disposisiDitolak",
    label: "Disposisi Ditolak",
    href: "/jf/disposisi-ditolak",
    icon: <FaTimesCircle />,
  },
  {
    key: "disposisiSelesai",
    label: "Disposisi Selesai",
    href: "/jf/disposisi-selesai",
    icon: <FaCheckCircle />,
  },
];

export { SIDEBAR_ADMIN };
