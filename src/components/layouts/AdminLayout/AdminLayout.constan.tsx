import { FaFileSignature } from "react-icons/fa";

const SIDEBAR_ADMIN = [
  {
    key: "masterJenisLayanan",
    label: "Jenis Layanan",
    href: "/admin/jenis-layanan",
    icon: <FaFileSignature />,
  },
  {
    key: "kategoriFungsiBangunan",
    label: "Kategori Fungsi Bangunan",
    href: "/admin/jenis-kategori-fungsi-bangunan",
    icon: <FaFileSignature />,
  },
  {
    key: "fungsiBangunan",
    label: "Fungsi Bangunan",
    href: "/admin/fungsi-bangunan",
    icon: <FaFileSignature />,
  },
  {
    key: "berkas",
    label: "Berkas",
    href: "/admin/berkas",
    icon: <FaFileSignature />,
  },
  {
    key: "jenisPermohonan",
    label: "Jenis Permohonan",
    href: "/admin/jenis-permohonan",
    icon: <FaFileSignature />,
  },
  {
    key: "roles",
    label: "Roles",
    href: "/admin/roles",
    icon: <FaFileSignature />,
  },
  {
    key: "userroles",
    label: "User Roles",
    href: "/admin/user-roles",
    icon: <FaFileSignature />,
  },
];

export { SIDEBAR_ADMIN };
