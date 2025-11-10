import { IoMdDocument } from "react-icons/io";
import { MdHistory, MdOutlineChat } from "react-icons/md";

const MAIN_LAYOUT_SUB_HEADER_MENU_BTN = [
  {
    title: "Riwayat Permohonan",
    icon: <MdHistory />,
    href: "/riwayat-permohonan",
  },
  { title: "Inbox", icon: <MdOutlineChat />, href: "#" },
  { title: "Berkas", icon: <IoMdDocument />, href: "/berkas" },
];

export { MAIN_LAYOUT_SUB_HEADER_MENU_BTN };
