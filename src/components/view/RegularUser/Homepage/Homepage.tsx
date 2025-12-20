import { useRef } from "react";
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
import { menuItems } from "./Home.constant";

const heroSlides = [
  {
    id: 1,
    title: "KRK Online",
    subtitle: "Kota Bengkulu",
    description:
      "Layanan digital terpadu untuk pengurusan Keterangan Rencana Kota dengan proses cepat, transparan, dan akuntabel",
    // Gambar: Blueprint/Peta Rencana Kota di atas meja kerja (Relevan dengan KRK/Tata Ruang)
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Pelayanan Digital",
    subtitle: "Terintegrasi",
    description:
      "Akses layanan KRK kapan saja dan di mana saja melalui sistem online yang terintegrasi",
    // Gambar: Tangan mengetik di Laptop dengan grafik data (Nuansa Digital & Sistem)
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Proses Cepat",
    subtitle: "dan Akuntabel",
    description:
      "Monitoring realtime status pengajuan Anda dengan sistem yang transparan",
    // Gambar: Dokumen tertata dengan kacamata/pena (Nuansa Verifikasi & Akuntabilitas)
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Layanan Online",
    subtitle: "24 Jam",
    description:
      "Ajukan permohonan KRK secara online tanpa batas waktu dan lokasi",
    // Gambar: Setup meja kerja modern/clean (Nuansa aksesibilitas & layanan publik modern)
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Homepage() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <MainLayout title="Home | KRK Bengkulu" isBgGray={false} isPaddingY={false}>
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
