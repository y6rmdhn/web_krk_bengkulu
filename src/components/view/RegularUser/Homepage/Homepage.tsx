import { useEffect, useRef, useState } from "react";
import MenuItem from "@/components/commons/MenuItem";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";
import { heroSlides, menuItems } from "./Home.constant";
import useHomepage from "./useHomepage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const navigate = useNavigate();

  const {
    isEligible,
    isLoadingMaster,
    isLoadingUser,
    percentage,
    totalRequired,
  } = useHomepage();

  useEffect(() => {
    // Jika data sudah selesai loading DAN user belum eligible
    if (
      !isLoadingMaster &&
      !isLoadingUser &&
      !isEligible &&
      totalRequired > 0
    ) {
      // Kasih delay dikit biar ga kaget pas baru load page
      const timer = setTimeout(() => {
        setShowWarningModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoadingMaster, isLoadingUser, isEligible, totalRequired]);

  return (
    <MainLayout title="Home | KRK Bengkulu" isBgGray={false} isPaddingY={false}>
      <Dialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <DialogContent
          className="
      fixed top-8 left-[50%] -translate-x-[50%] translate-y-0 
      w-[90vw] max-w-2xl p-0 
      bg-white
      shadow-xl border border-gray-200
      rounded-xl overflow-hidden
      data-[state=open]:slide-in-from-top-10
      data-[state=open]:fade-in-0
    "
        >
          {/* Header dengan warna resmi pemerintah */}
          <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 px-6 py-6 overflow-hidden">
            {/* Pattern garis tipis untuk identitas pemerintah */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              white 10px,
              white 20px
            )`,
                }}
              />
            </div>

            <div className="relative flex items-start gap-4">
              {/* Badge Peringatan */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm" />
                  <div className="relative p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                    <AlertTriangle
                      className="w-6 h-6 text-red-600"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="flex-1">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                  <span className="text-xs font-bold text-white tracking-wide">
                    PERHATIAN
                  </span>
                </div>
                <h3 className="font-bold text-white text-xl leading-tight mb-2">
                  Dokumen Persyaratan Belum Lengkap
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Silakan lengkapi dokumen persyaratan untuk dapat mengajukan
                  permohonan baru
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative px-6 py-6 space-y-6">
            {/* Progress Card */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Status Kelengkapan Berkas
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {percentage}% dokumen telah lengkap
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-700 leading-none">
                    {percentage}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Status Info */}
              <div className="mt-4 p-3 bg-white rounded-lg border border-gray-100">
                <div className="flex items-start gap-2">
                  {percentage === 100 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm text-gray-700">
                    {percentage === 100
                      ? "Semua dokumen persyaratan telah lengkap. Anda dapat melanjutkan pengajuan permohonan."
                      : `Anda perlu melengkapi ${totalRequired} dokumen persyaratan untuk dapat mengajukan permohonan baru.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Informasi Tambahan */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-700 text-sm font-bold">i</span>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-800 text-sm mb-1">
                    Informasi Penting
                  </h5>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li className="flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span>
                        Pastikan dokumen dalam format PDF atau JPG dengan
                        resolusi yang jelas
                      </span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span>Dokumen harus berukuran maksimal 2MB per file</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span>
                        Proses verifikasi membutuhkan waktu 3-5 hari kerja
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowWarningModal(false)}
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
              >
                Tutup
              </Button>
              <Button
                onClick={() => navigate("/berkas")}
                className="flex-1 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white shadow-sm font-medium"
              >
                <span>Ke Halaman Berkas</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Footer Note */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Untuk bantuan lebih lanjut, hubungi layanan pelanggan di{" "}
                <a href="tel:+62" className="text-blue-600 hover:underline">
                  (0736) 123456
                </a>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section - Full Width dengan Swiper Carousel */}
      <div className="relative h-[90vh] min-h-[700px] max-h-[900px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          speed={800}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          className="h-full w-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="relative h-full w-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7)), url(${slide.image})`,
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: "40px 40px",
                    }}
                  ></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-1/4 left-10 w-72 h-72 bg-gray-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl"></div>

                <div className="relative h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center max-w-4xl mx-auto">
                      {/* Premium Badge */}
                      <div className="inline-flex items-center gap-3 bg-gray-800/80 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-gray-600/50 shadow-xl">
                        <div className="relative">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping absolute"></div>
                          <div className="w-3 h-3 bg-blue-500 rounded-full relative"></div>
                        </div>
                        <span className="text-white font-semibold text-sm tracking-wider">
                          SISTEM TERINTEGRASI • RESMI • TERPERCAYA
                        </span>
                      </div>

                      {/* Main Title */}
                      <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                        <span className="block">{slide.title}</span>
                        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                          {slide.subtitle}
                        </span>
                      </h1>

                      {/* Subtitle */}
                      <p className="mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed px-4">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
                        <a
                          href="/layanan"
                          className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Mulai Pengajuan
                        </a>
                        <a
                          href="#layanan"
                          className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-bold text-base sm:text-lg rounded-xl border-2 border-gray-300 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Pelajari Tutorial
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons dengan handler onClick */}
        <button
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/70 backdrop-blur-md rounded-full border border-gray-600/50 text-white hover:bg-gray-800/90 hover:scale-110 transition-all duration-300 hidden sm:flex items-center justify-center"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-gray-800/70 backdrop-blur-md rounded-full border border-gray-600/50 text-white hover:bg-gray-800/90 hover:scale-110 transition-all duration-300 hidden sm:flex items-center justify-center"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Services Section */}
      <div className="bg-white py-12 sm:py-16 md:py-24" id="layanan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Layanan <span className="text-blue-600">Digital</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
              Akses semua layanan KRK secara online dengan satu klik
            </p>
          </div>

          {/* Menu Grid with Enhanced Design */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {menuItems.map((item, index) => (
              <div
                key={item.title}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-xl sm:rounded-2xl group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-300"></div>
                <MenuItem
                  title={item.title}
                  icon={item.icon}
                  href={item.href}
                  delay={index * 100}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
