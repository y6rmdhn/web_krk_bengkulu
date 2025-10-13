import { Routes, Route } from "react-router-dom";
import Navbar from "./components/features/Navbar";
import Homepage from "./components/view/Homepage";
import Footer from "./components/features/Footer";
import LoginPage from "./components/view/Auth/LoginPage";
import RegisterPage from "./components/view/Auth/RegisterPage";
import KelengkapanBerkas from "./components/view/KelengkapanBerkasPage";
import LayananPage from "./components/view/LayananPage";
import LayananKrkPage from "./components/view/LayananKrkPage";
import KrkBuatBaruPage from "./components/view/KrkBuatbaruPage";
import PermohonanVerifikasiPage from "./components/view/PermohonanVerifikasiPage";
import BerhasilBuatBaruPage from "./components/view/BerhasilBuatBaruPage";
import MonitoringBerkasPage from "./components/view/MonitoringBerkas";
import FAQPage from "./components/view/FaqPage";
import RegulasiPage from "./components/view/RegulasiPage";
import ProsedurPage from "./components/view/ProsedurPage";
import PengaduanPage from "./components/view/PengaduanPage";

function App() {
  return (
    <>
      <Navbar />
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
        <Route path="/berhasil-buat-baru" element={<BerhasilBuatBaruPage />} />
        <Route path="/monitoring-berkas" element={<MonitoringBerkasPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/regulasi" element={<RegulasiPage />} />
        <Route path="/prosedur" element={<ProsedurPage />} />
        <Route path="/pengaduan" element={<PengaduanPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
