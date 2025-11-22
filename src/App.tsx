import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import authLoader from "./components/layouts/AuthLayout/AuthLayout.loader";
import adminLoader from "./components/layouts/AdminLayout/AdminLayout.loader";
import jfLoader from "./components/layouts/JFLayout/JfLayout.loader";
import kepalaDinasLoader from "./components/layouts/KepalaDinas/KepalaDinasLayout.loader";

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
const SuccessRegisterPage = lazy(
  () => import("./components/view/SuccessRegister")
);
const SuccessVerificationEmailPage = lazy(
  () => import("./components/view/VerificationEmailSuccess")
);

// admin
const DasboardAdmin = lazy(() => import("./components/view/Admin/Dasboard"));
const PermohonanAdminPage = lazy(
  () => import("./components/view/Admin/Permohonan")
);
const DetailPermohonanAdminPage = lazy(
  () => import("./components/view/Admin/PermohonanDetail")
);
const RiwayatPermohonanAdminPage = lazy(
  () => import("./components/view/Admin/RiwayatPermohonan")
);
// const PermohonanDiprosesAdminPage = lazy(
//   () => import("./components/view/Admin/PermohonanDiproses")
// );
// const PermohonanDikembalikanAdminPage = lazy(
//   () => import("./components/view/Admin/PermohonanDiKembalikan")
// );
// const PermohonanDitolakAdminPage = lazy(
//   () => import("./components/view/Admin/PermohonanDiolak")
// );
// const PermohonanSelesaiAdminPage = lazy(
//   () => import("./components/view/Admin/PermohonanSelesai")
// );

// JF
const DisposisiSurveiMasuk = lazy(
  () => import("./components/view/JF/DisposisiSurveiMasuk")
);
const DisposisiSurveiMasukDetail = lazy(
  () => import("./components/view/JF/PermohonanDetail")
);
// const SurveiDiProses = lazy(
//   () => import("./components/view/JF/SurveiDiproses")
// );
// const SurveiSelesai = lazy(() => import("./components/view/JF/SurveiSelesai"));

// Kepala Dinas
const PermohonanSkTTE = lazy(
  () => import("./components/view/KepalaDinas/PermohonanSKTTE")
);
const PermohonanSkTTEDetail = lazy(
  () => import("./components/view/KepalaDinas/PermohonanDetail")
);
// const TteSkSelesai = lazy(
//   () => import("./components/view/KepalaDinas/TTESKSelesai")
// );
// const TteSkDitolak = lazy(
//   () => import("./components/view/KepalaDinas/TTESKDitolak")
// );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    loader: authLoader,
    element: <LoginPage />,
  },
  {
    path: "/register",
    loader: authLoader,
    element: <RegisterPage />,
  },
  {
    path: "/success-register",
    loader: authLoader,
    element: <SuccessRegisterPage />,
  },
  {
    path: "/api/auth/verify",
    loader: authLoader,
    element: <SuccessVerificationEmailPage />,
  },
  {
    path: "/berkas",
    loader: adminLoader,
    element: <KelengkapanBerkas />,
  },
  {
    path: "/layanan",
    element: <LayananPage />,
  },
  {
    path: "/layanan-krk",
    element: <LayananKrkPage />,
  },
  {
    path: "/alur-pengajuan",
    element: <PanduanPengajuan />,
  },
  {
    path: "/permohonan-krk",
    loader: adminLoader,
    element: <PermohonanKrk />,
  },
  {
    path: "/riwayat-permohonan",
    element: <RiwayatPermohonanPage />,
  },
  {
    path: "/success",
    element: <BerhasilBuatBaruPage />,
  },
  {
    path: "/monitoring-berkas",
    element: <MonitoringBerkasPage />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  },
  {
    path: "/regulasi",
    element: <RegulasiPage />,
  },
  {
    path: "/prosedur",
    element: <ProsedurPage />,
  },
  {
    path: "/pengaduan",
    element: <PengaduanPage />,
  },
  {
    path: "/operator",
    children: [
      {
        path: "dashboard",
        loader: adminLoader,
        element: <DasboardAdmin />,
      },
      {
        path: "permohonan-krk",
        loader: adminLoader,
        element: <PermohonanAdminPage />,
      },
      {
        path: "riwayat-permohonan-krk",
        loader: adminLoader,
        element: <RiwayatPermohonanAdminPage />,
      },
      // {
      //   path: "permohonan-diproses",
      //   element: <PermohonanDiprosesAdminPage />,
      // },
      // {
      //   path: "permohonan-dikembalikan",
      //   element: <PermohonanDikembalikanAdminPage />,
      // },
      // {
      //   path: "permohonan-ditolak",
      //   element: <PermohonanDitolakAdminPage />,
      // },
      // {
      //   path: "permohonan-selesai",
      //   element: <PermohonanSelesaiAdminPage />,
      // },
      {
        path: "detail/:id",
        loader: adminLoader,
        element: <DetailPermohonanAdminPage />,
      },
    ],
  },
  {
    path: "/jf",
    children: [
      {
        path: "disposisi-survei-masuk",
        loader: jfLoader,
        element: <DisposisiSurveiMasuk />,
      },
      {
        path: "detail/:id",
        loader: jfLoader,
        element: <DisposisiSurveiMasukDetail />,
      },
      // {
      //   path: "survei-diproses",
      //   element: <SurveiDiProses />,
      // },
      // {
      //   path: "survei-selesai",
      //   element: <SurveiSelesai />,
      // },
    ],
  },
  {
    path: "/kepala-dinas",
    children: [
      {
        path: "permohonan-sk-tte",
        loader: kepalaDinasLoader,
        element: <PermohonanSkTTE />,
      },
      {
        path: "permohonan-sk-tte/detail/:id",
        loader: kepalaDinasLoader,
        element: <PermohonanSkTTEDetail />,
      },
      // {
      //   path: "tte-sk-selesai",
      //   element: <TteSkSelesai />,
      // },
      // {
      //   path: "tte-sk-ditolak",
      //   element: <TteSkDitolak />,
      // },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
