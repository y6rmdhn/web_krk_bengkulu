import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import authLoader from "./components/layouts/AuthLayout/AuthLayout.loader";
import operatorLoader from "./components/layouts/OperatorLayout/OperatorLayout.loader";
import surveyorLoader from "./components/layouts/SurveyorLayout/SurveyorLayout.loader";
import kepalaDinasLoader from "./components/layouts/KepalaDinas/KepalaDinasLayout.loader";
import adminLoader from "./components/layouts/AdminLayout/AdminLayout.loader";
import mainLoader from "./components/layouts/MainLayout/MainLayout.loader";

const Homepage = lazy(() => import("./components/view/RegularUser/Homepage"));
const LoginPage = lazy(() => import("./components/view/Auth/Login/Login"));
const ForgotPasswordPage = lazy(
  () => import("./components/view/Auth/ForgotPassword"),
);
const RegisterPage = lazy(
  () => import("./components/view/Auth/Register/Register"),
);
const KelengkapanBerkas = lazy(
  () => import("./components/view/RegularUser/Berkas"),
);
const LayananPage = lazy(
  () => import("./components/view/RegularUser/Layanan/Layanan"),
);
const PanduanPengajuan = lazy(
  () => import("./components/view/RegularUser/PanduanPengajuan"),
);
const PermohonanKrk = lazy(
  () => import("./components/view/RegularUser/PermohonanKrk"),
);
const PermohonanKrkEdit = lazy(
  () => import("./components/view/RegularUser/PermohonanKrkEdit"),
);
const BerhasilBuatBaruPage = lazy(
  () => import("./components/view/RegularUser/SuccessPage"),
);
const MonitoringBerkasPage = lazy(
  () => import("./components/view/RegularUser/MonitoringBerkas"),
);
const DetailMonitoringBerkasPage = lazy(
  () =>
    import("./components/view/RegularUser/MonitoringBerkas/PermohonanDetail"),
);
const FAQPage = lazy(() => import("./components/view/RegularUser/Faq"));
const RegulasiPage = lazy(
  () => import("./components/view/RegularUser/Regulasi"),
);
const ProsedurPage = lazy(
  () => import("./components/view/RegularUser/Prosedur"),
);
// const PengaduanPage = lazy(
//   () => import("./components/view/RegularUser/Pengaduan")
// );
const LayananKrkPage = lazy(
  () => import("./components/view/RegularUser/LayananKrk"),
);
const RiwayatPermohonanPage = lazy(
  () => import("./components/view/RegularUser/RiwayatPermohonan"),
);
const RiwayatPermohonanDetailPage = lazy(
  () =>
    import("./components/view/RegularUser/RiwayatPermohonan/PermohonanDetail"),
);
const SuccessRegisterPage = lazy(
  () => import("./components/view/SuccessRegister"),
);
const SuccessVerificationEmailPage = lazy(
  () => import("./components/view/VerificationEmailSuccess"),
);
const PreviewSkPage = lazy(
  () => import("./components/view/RegularUser/PreviewSk"),
);
const TrackingPage = lazy(
  () => import("./components/view/RegularUser/Tracking"),
);
const DetailTrackingPage = lazy(
  () => import("./components/view/RegularUser/Tracking/PermohonanDetail"),
);

// admin
const JenisLayanan = lazy(() => import("./components/view/Admin/JenisLayanan"));
const AdminBerkas = lazy(() => import("./components/view/Admin/Berkas"));
const JenisPermohonanAdmin = lazy(
  () => import("./components/view/Admin/JenisPermohonan"),
);
const JenisKategoriFungsiBangunan = lazy(
  () => import("./components/view/Admin/KategoriFungsiBangunan"),
);
const JenisFungsiBangunan = lazy(
  () => import("./components/view/Admin/JenisFungsiBangunan"),
);
const Roles = lazy(() => import("./components/view/Admin/Role"));

// operator
const PermohonanAdminPage = lazy(
  () => import("./components/view/Operator/Permohonan"),
);
const PermohonanSelesai = lazy(
  () => import("./components/view/Operator/PermohonanSelesai"),
);
const PermohonanDitolak = lazy(
  () => import("./components/view/Operator/PermohonanDitolak"),
);
const PermohonanDikembalikan = lazy(
  () => import("./components/view/Operator/PermohonanDikembalikan"),
);
const PermohonanDiProses = lazy(
  () => import("./components/view/Operator/PermohonanFinal"),
);
const DetailPermohonanAdminPage = lazy(
  () => import("./components/view/Operator/PermohonanDetail"),
);

// Surveyor Lapangan
const DisposisiSurveiMasuk = lazy(
  () => import("./components/view/SurveyorLapangan/DisposisiSurveiMasuk"),
);
const DisposisiSurveiDiproses = lazy(
  () => import("./components/view/SurveyorLapangan/DisposisiSurveiDitolak"),
);
const DisposisiSurveiSelesai = lazy(
  () => import("./components/view/SurveyorLapangan/DisposisiSurveiSelesai"),
);
const DisposisiSurveiMasukDetail = lazy(
  () => import("./components/view/SurveyorLapangan/DetailDisposisiSurveiMasuk"),
);

// Kepala Dinas
const PermohonanSkTTE = lazy(
  () => import("./components/view/KepalaDinas/PermohonanSKTTE"),
);
const SkTTEDiproses = lazy(
  () => import("./components/view/KepalaDinas/SKTTEDitolak"),
);
const SkTTESelesai = lazy(
  () => import("./components/view/KepalaDinas/SKTTESelesai"),
);
const PermohonanSkTTEDetail = lazy(
  () => import("./components/view/KepalaDinas/DetailPermohonanSkTTE"),
);
const SkDetail = lazy(() => import("./components/view/KepalaDinas/PreviewSk"));

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
    path: "/reset-password",
    loader: mainLoader,
    element: <ForgotPasswordPage />,
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
    loader: mainLoader,
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
    loader: mainLoader,
    element: <PermohonanKrk />,
  },
  {
    path: "/permohonan-krk/edit/:id",
    loader: mainLoader,
    element: <PermohonanKrkEdit />,
  },
  {
    path: "/riwayat-permohonan",
    loader: mainLoader,
    element: <RiwayatPermohonanPage />,
  },
  {
    path: "/preview-sk/:id",
    loader: mainLoader,
    element: <PreviewSkPage />,
  },
  {
    path: "/riwayat-permohonan/detail/:id",
    loader: mainLoader,
    element: <RiwayatPermohonanDetailPage />,
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
    path: "/monitoring/detail/:id",
    element: <DetailMonitoringBerkasPage />,
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
  // {
  //   path: "/pengaduan",
  //   element: <PengaduanPage />,
  // },
  {
    path: "/admin",
    children: [
      {
        path: "jenis-layanan",
        loader: adminLoader,
        element: <JenisLayanan />,
      },
      {
        path: "berkas",
        loader: adminLoader,
        element: <AdminBerkas />,
      },
      {
        path: "jenis-permohonan",
        loader: adminLoader,
        element: <JenisPermohonanAdmin />,
      },
      {
        path: "jenis-kategori-fungsi-bangunan",
        loader: adminLoader,
        element: <JenisKategoriFungsiBangunan />,
      },
      {
        path: "fungsi-bangunan",
        loader: adminLoader,
        element: <JenisFungsiBangunan />,
      },
      {
        path: "roles",
        loader: adminLoader,
        element: <Roles />,
      },
    ],
  },
  {
    path: "/operator",
    children: [
      {
        path: "permohonan-krk",
        loader: operatorLoader,
        element: <PermohonanAdminPage />,
      },
      {
        path: "permohonan-selesai",
        loader: operatorLoader,
        element: <PermohonanSelesai />,
      },
      {
        path: "permohonan-ditolak",
        loader: operatorLoader,
        element: <PermohonanDitolak />,
      },
      {
        path: "permohonan-dikembalikan",
        loader: operatorLoader,
        element: <PermohonanDikembalikan />,
      },
      {
        path: "draft-final",
        loader: operatorLoader,
        element: <PermohonanDiProses />,
      },
      {
        path: "detail/:id",
        loader: operatorLoader,
        element: <DetailPermohonanAdminPage />,
      },
      {
        path: "tracking",
        loader: operatorLoader,
        element: <TrackingPage />,
      },
      {
        path: "tracking/detail/:id",
        loader: operatorLoader,
        element: <DetailTrackingPage />,
      },
    ],
  },
  {
    path: "/jf",
    children: [
      {
        path: "disposisi-survei-masuk",
        loader: surveyorLoader,
        element: <DisposisiSurveiMasuk />,
      },
      {
        path: "disposisi-survei-ditolak",
        loader: surveyorLoader,
        element: <DisposisiSurveiDiproses />,
      },
      {
        path: "disposisi-survei-selesai",
        loader: surveyorLoader,
        element: <DisposisiSurveiSelesai />,
      },
      {
        path: "detail/:id",
        loader: surveyorLoader,
        element: <DisposisiSurveiMasukDetail />,
      },
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
        path: "sk-tte-ditolak",
        loader: kepalaDinasLoader,
        element: <SkTTEDiproses />,
      },
      {
        path: "sk-tte-selesai",
        loader: kepalaDinasLoader,
        element: <SkTTESelesai />,
      },
      {
        path: "sk-detail/:id",
        loader: kepalaDinasLoader,
        element: <SkDetail />,
      },
      {
        path: "permohonan-sk-tte/detail/:id",
        loader: kepalaDinasLoader,
        element: <PermohonanSkTTEDetail />,
      },
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
