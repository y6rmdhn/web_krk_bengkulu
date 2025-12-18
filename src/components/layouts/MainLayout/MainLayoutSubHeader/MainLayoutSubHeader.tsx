import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MAIN_LAYOUT_SUB_HEADER_MENU_BTN } from "./MainlayoutSubHeader.constant";
// Pastikan path import ini sesuai dengan lokasi file hook kamu
import useRiwayatPermohonan from "@/components/view/RegularUser/RiwayatPermohonan/useRiwayatPermohonan";

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

  // 1. Ambil data permohonan untuk pengecekan status
  const { dataListPermohonanKrk } = useRiwayatPermohonan();

  // State untuk mengontrol visibilitas titik merah
  const [showNotification, setShowNotification] = useState(false);

  // 2. Logic Pengecekan: Apakah ada SK Terbit (APPROVED) & Belum dilihat?
  useEffect(() => {
    if (dataListPermohonanKrk) {
      // Hitung jumlah dokumen yang APPROVED
      const approvedCount = dataListPermohonanKrk.filter(
        (item: any) => item.status === "APPROVED"
      ).length;

      // Ambil data terakhir kali user melihat halaman riwayat (disimpan di localStorage)
      const lastSeenCount = parseInt(
        localStorage.getItem("riwayat_seen_count") || "0"
      );

      // Jika jumlah yang disetujui LEBIH BANYAK dari yang terakhir dilihat, munculkan notif
      if (approvedCount > 0 && approvedCount > lastSeenCount) {
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
    }
  }, [dataListPermohonanKrk]);

  // 3. Fungsi saat tombol menu diklik
  const handleMenuClick = (href: string, title: string) => {
    // Jika tombol yang diklik adalah Riwayat
    if (title.toLowerCase().includes("riwayat")) {
      setShowNotification(false); // Hilangkan titik merah di state saat ini

      // Simpan jumlah approved saat ini ke localStorage agar nanti pas refresh tidak muncul lagi
      if (dataListPermohonanKrk) {
        const approvedCount = dataListPermohonanKrk.filter(
          (item: any) => item.status === "APPROVED"
        ).length;
        localStorage.setItem("riwayat_seen_count", approvedCount.toString());
      }
    }

    navigate(href);
    setOpen(false); // Tutup menu mobile jika sedang terbuka
  };

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
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-2">
              {MAIN_LAYOUT_SUB_HEADER_MENU_BTN.map((item) => {
                // Cek apakah ini tombol Riwayat
                const isRiwayatBtn = item.title
                  .toLowerCase()
                  .includes("riwayat");

                return (
                  <div key={`btn-${item.title}`} className="relative">
                    <Button
                      onClick={() => handleMenuClick(item.href, item.title)}
                      className="bg-white/10 hover:bg-white/20 text-white gap-2 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg group relative overflow-visible"
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.title}</span>

                      {/* TAMPILKAN TITIK MERAH DI SINI */}
                      {isRiwayatBtn && showNotification && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white"></span>
                        </span>
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20 rounded-xl w-10 h-10 transition-all duration-200 relative"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
              {/* Notif kecil di icon menu hamburger kalau ada notif */}
              {showNotification && !open && (
                <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border border-[#2C5AA0]"></span>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Menu Content */}
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
              {MAIN_LAYOUT_SUB_HEADER_MENU_BTN.map((item, idx) => {
                const isRiwayatBtn = item.title
                  .toLowerCase()
                  .includes("riwayat");

                return (
                  <motion.div
                    key={`mobile-btn-${item.title}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Button
                      onClick={() => handleMenuClick(item.href, item.title)}
                      className="w-full bg-white/10 hover:bg-white/20 text-white gap-3 px-4 py-4 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-200 justify-start h-auto relative"
                    >
                      <span className="flex-shrink-0 bg-white/10 p-1.5 rounded-lg">
                        {item.icon}
                      </span>
                      <span className="font-medium text-base">
                        {item.title}
                      </span>

                      {/* Notif Merah di Mobile Menu */}
                      {isRiwayatBtn && showNotification && (
                        <span className="ml-auto flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainLayoutSubHeader;
