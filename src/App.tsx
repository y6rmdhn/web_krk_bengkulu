import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/features/Navbar";
import Footer from "./components/features/Footer";
import { useHydration } from "./hooks/useHydration";

const Homepage = lazy(() => import("./components/view/Homepage"));
const LoginPage = lazy(() => import("./components/view/Auth/LoginPage"));
const RegisterPage = lazy(() => import("./components/view/Auth/RegisterPage"));
const KelengkapanBerkas = lazy(
  () => import("./components/view/KelengkapanBerkasPage")
);
const LayananPage = lazy(() => import("./components/view/LayananPage"));
const LayananKrkPage = lazy(() => import("./components/view/LayananKrkPage"));
const KrkBuatBaruPage = lazy(() => import("./components/view/KrkBuatbaruPage"));
const PermohonanVerifikasiPage = lazy(
  () => import("./components/view/PermohonanVerifikasiPage")
);
const BerhasilBuatBaruPage = lazy(
  () => import("./components/view/BerhasilBuatBaruPage")
);
const MonitoringBerkasPage = lazy(
  () => import("./components/view/MonitoringBerkas")
);
const FAQPage = lazy(() => import("./components/view/FaqPage"));
const RegulasiPage = lazy(() => import("./components/view/RegulasiPage"));
const ProsedurPage = lazy(() => import("./components/view/ProsedurPage"));
const PengaduanPage = lazy(() => import("./components/view/PengaduanPage"));

function App() {
  const isHydrated = useHydration();

  if (!isHydrated) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/berkas" element={<KelengkapanBerkas />} />
          <Route path="/layanan" element={<LayananPage />} />
          <Route path="/layanan-krk" element={<LayananKrkPage />} />
          <Route path="/flowchart-krk" element={<KrkBuatBaruPage />} />
          <Route
            path="/permohonan-verifikasi"
            element={<PermohonanVerifikasiPage />}
          />
          <Route
            path="/berhasil-buat-baru"
            element={<BerhasilBuatBaruPage />}
          />
          <Route path="/monitoring-berkas" element={<MonitoringBerkasPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/regulasi" element={<RegulasiPage />} />
          <Route path="/prosedur" element={<ProsedurPage />} />
          <Route path="/pengaduan" element={<PengaduanPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
