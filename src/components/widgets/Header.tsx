import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoMdDocument } from "react-icons/io";
import { MdOutlineChat, MdHistory } from "react-icons/md";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PropsType {
  title?: string;
  children?: boolean;
}

export default function Header({
  title = "Sistem Informasi KRK Online Kota Bengkulu",
  children,
}: PropsType) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#3E6DCC] shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <p className="text-lg md:text-xl font-medium text-white">{title}</p>

        {children && (
          <>
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-3">
              <Button className="bg-[#009845] text-white gap-2">
                <MdHistory /> Riwayat
              </Button>
              <Button className="bg-[#009845] text-white gap-2">
                <MdOutlineChat /> Inbox
              </Button>
              <Button
                onClick={() => navigate("/berkas")}
                className="bg-[#009845] text-white gap-2"
              >
                <IoMdDocument /> Berkas
              </Button>
            </div>

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              className="md:hidden text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </>
        )}
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-[#3E6DCC]/95 md:hidden"
          >
            <div className="flex flex-col items-center gap-3 py-3">
              <Button className="bg-[#009845] text-white w-4/5 gap-2">
                <MdHistory /> Riwayat
              </Button>
              <Button className="bg-[#009845] text-white w-4/5 gap-2">
                <MdOutlineChat /> Inbox
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  navigate("/berkas");
                }}
                className="bg-[#009845] text-white w-4/5 gap-2"
              >
                <IoMdDocument /> Berkas
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
