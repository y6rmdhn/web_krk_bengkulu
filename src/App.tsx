import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

const Homepage = lazy(() => import("./components/view/RegularUser/Homepage"));
const LoginPage = lazy(() => import("./components/view/Auth/Login/Login"));
const RegisterPage = lazy(
  () => import("./components/view/Auth/Register/Register")
);
const KelengkapanBerkas = lazy(
  () => import("./components/view/RegularUser/Berkas")
);
const LayananPage = lazy(
  () => import("./components/view/RegularUser/Layanan/Layanan")
);
const PanduanPengajuan = lazy(
  () => import("./components/view/RegularUser/PanduanPengajuan")
);
const PermohonanKrk = lazy(
  () => import("./components/view/RegularUser/PermohonanKrk")
);
const BerhasilBuatBaruPage = lazy(
  () => import("./components/view/RegularUser/SuccessPage")
);
const MonitoringBerkasPage = lazy(
  () => import("./components/view/RegularUser/MonitoringBerkas")
);
const FAQPage = lazy(() => import("./components/view/RegularUser/Faq"));
const RegulasiPage = lazy(
  () => import("./components/view/RegularUser/Regulasi")
);
const ProsedurPage = lazy(
  () => import("./components/view/RegularUser/Prosedur")
);
const PengaduanPage = lazy(
  () => import("./components/view/RegularUser/Pengaduan")
);
const LayananKrkPage = lazy(
  () => import("./components/view/RegularUser/LayananKrk")
);
const RiwayatPermohonanPage = lazy(
  () => import("./components/view/RegularUser/RiwayatPermohonan")
);

// admin
const DasboardAdmin = lazy(() => import("./components/view/Admin/Dasboard"));
const PermohonanAdminPage = lazy(
  () => import("./components/view/Admin/Permohonan")
);
const RiwayatPermohonanAdminPage = lazy(
  () => import("./components/view/Admin/RiwayatPermohonan")
);
const DetailPermohonanAdminPage = lazy(
  () => import("./components/view/Admin/PermohonanDetail")
);

function App() {
  return (
    <>
      <Toaster position="top-right" />

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
          <Route path="/alur-pengajuan" element={<PanduanPengajuan />} />
          <Route path="/permohonan-krk" element={<PermohonanKrk />} />
          <Route
            path="/riwayat-permohonan"
            element={<RiwayatPermohonanPage />}
          />
          <Route path="/success" element={<BerhasilBuatBaruPage />} />
          <Route path="/monitoring-berkas" element={<MonitoringBerkasPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/regulasi" element={<RegulasiPage />} />
          <Route path="/prosedur" element={<ProsedurPage />} />
          <Route path="/pengaduan" element={<PengaduanPage />} />

          <Route path="admin">
            <Route path="dasboard" element={<DasboardAdmin />} />
            <Route path="permohonan-krk" element={<PermohonanAdminPage />} />
            <Route
              path="riwayat-permohonan-krk"
              element={<RiwayatPermohonanAdminPage />}
            />
            <Route
              path="permohonan/:id"
              element={<DetailPermohonanAdminPage />}
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
