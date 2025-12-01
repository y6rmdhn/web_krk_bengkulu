import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_LAYOUT_SUB_HEADER_MENU_BTN } from "./MainlayoutSubHeader.constant";

interface PropsType {
  title?: string;
  children?: boolean;
  isAuth: string | null;
}

const MainLayoutSubHeader = ({
  title = "Sistem Informasi KRK Online Kota Bengkulu",
  children,
  isAuth,
}: PropsType) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-[#3E6DCC] to-[#2C5AA0] shadow-lg relative z-40 border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <p className="text-sm sm:text-base md:text-xl font-semibold text-white drop-shadow-sm truncate leading-tight">
            {title}
          </p>
        </div>

        {children && isAuth && (
          <div className="flex-shrink-0">
            <div className="hidden md:flex gap-2">
              {MAIN_LAYOUT_SUB_HEADER_MENU_BTN.map((item) => (
                <Button
                  key={`btn-${item.title}`}
                  onClick={() => navigate(item.href)}
                  className="bg-white/10 hover:bg-white/20 text-white gap-2 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20 rounded-xl w-10 h-10 transition-all duration-200"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden bg-[#2C5AA0] md:hidden border-t border-white/10 shadow-inner"
          >
            <div className="flex flex-col items-stretch gap-2 p-4 pb-6">
              {MAIN_LAYOUT_SUB_HEADER_MENU_BTN.map((item, idx) => (
                <motion.div
                  key={`mobile-btn-${item.title}`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Button
                    onClick={() => {
                      navigate(item.href);
                      setOpen(false);
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 text-white gap-3 px-4 py-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-200 justify-start h-auto"
                  >
                    <span className="flex-shrink-0 bg-white/10 p-1.5 rounded-lg">
                      {item.icon}
                    </span>
                    <span className="font-medium text-base">{item.title}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayoutSubHeader;
