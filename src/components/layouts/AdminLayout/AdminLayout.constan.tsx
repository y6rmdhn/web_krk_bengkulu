import {
  // FaClipboardList,
  FaLayerGroup,
  FaBuilding,
  FaFolderOpen,
  // FaFileSignature,
  FaUserShield,
  FaUsersCog,
} from "react-icons/fa";

const SIDEBAR_ADMIN = [
  // {
  //   key: "masterJenisLayanan",
  //   label: "Jenis Layanan",
  //   href: "/admin/jenis-layanan",
  //   icon: <FaClipboardList />,
  // },
  {
    key: "kategoriFungsiBangunan",
    label: "Kategori Fungsi Bangunan",
    href: "/admin/jenis-kategori-fungsi-bangunan",
    icon: <FaLayerGroup />,
  },
  {
    key: "fungsiBangunan",
    label: "Fungsi Bangunan",
    href: "/admin/fungsi-bangunan",
    icon: <FaBuilding />,
  },
  {
    key: "berkas",
    label: "Berkas",
    href: "/admin/berkas",
    icon: <FaFolderOpen />,
  },
  // {
  //   key: "jenisPermohonan",
  //   label: "Jenis Permohonan",
  //   href: "/admin/jenis-permohonan",
  //   icon: <FaFileSignature />,
  // },
  {
    key: "roles",
    label: "Roles",
    href: "/admin/roles",
    icon: <FaUserShield />,
  },
  {
    key: "userroles",
    label: "User Roles",
    href: "/admin/user-roles",
    icon: <FaUsersCog />,
  },
];

export { SIDEBAR_ADMIN };
