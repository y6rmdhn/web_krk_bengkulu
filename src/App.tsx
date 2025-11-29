import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import authLoader from "./components/layouts/AuthLayout/AuthLayout.loader";
import operatorLoader from "./components/layouts/OperatorLayout/OperatorLayout.loader";
import surveyorLoader from "./components/layouts/SurveyorLayout/SurveyorLayout.loader";
import kepalaDinasLoader from "./components/layouts/KepalaDinas/KepalaDinasLayout.loader";

const Homepage = lazy(() => import("./components/view/RegularUser/Homepage"));
const LoginPage = lazy(() => import("./components/view/Auth/Login/Login"));
const ForgotPasswordPage = lazy(
  () => import("./components/view/Auth/ForgotPassword")
);
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
const PermohonanKrkEdit = lazy(
  () => import("./components/view/RegularUser/PermohonanKrkEdit")
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
const RiwayatPermohonanDetailPage = lazy(
  () =>
    import("./components/view/RegularUser/RiwayatPermohonan/PermohonanDetail")
);
const SuccessRegisterPage = lazy(
  () => import("./components/view/SuccessRegister")
);
const SuccessVerificationEmailPage = lazy(
  () => import("./components/view/VerificationEmailSuccess")
);

// admin
const JenisLayanan = lazy(() => import("./components/view/Admin/JenisLayanan"));

// operator
const DasboardAdmin = lazy(() => import("./components/view/Operator/Dasboard"));
const PermohonanAdminPage = lazy(
  () => import("./components/view/Operator/Permohonan")
);
const DetailPermohonanAdminPage = lazy(
  () => import("./components/view/Operator/PermohonanDetail")
);
const RiwayatPermohonanAdminPage = lazy(
  () => import("./components/view/Operator/RiwayatPermohonan")
);

// Surveyor Lapangan
const DisposisiSurveiMasuk = lazy(
  () => import("./components/view/SurveyorLapangan/DisposisiSurveiMasuk")
);
const DisposisiSurveiMasukDetail = lazy(
  () => import("./components/view/SurveyorLapangan/DetailDisposisiSurveiMasuk")
);

// Kepala Dinas
const PermohonanSkTTE = lazy(
  () => import("./components/view/KepalaDinas/PermohonanSKTTE")
);
const PermohonanSkTTEDetail = lazy(
  () => import("./components/view/KepalaDinas/DetailPermohonanSkTTE")
);

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
    loader: operatorLoader,
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
    loader: operatorLoader,
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
    loader: operatorLoader,
    element: <PermohonanKrk />,
  },
  {
    path: "/permohonan-krk/edit/:id",
    loader: operatorLoader,
    element: <PermohonanKrkEdit />,
  },
  {
    path: "/riwayat-permohonan",
    element: <RiwayatPermohonanPage />,
  },
  {
    path: "/riwayat-permohonan/detail/:id",
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
    path: "/admin",
    children: [
      {
        path: "jenis-layanan",
        loader: operatorLoader,
        element: <JenisLayanan />,
      },
    ],
  },
  {
    path: "/operator",
    children: [
      {
        path: "dashboard",
        loader: operatorLoader,
        element: <DasboardAdmin />,
      },
      {
        path: "permohonan-krk",
        loader: operatorLoader,
        element: <PermohonanAdminPage />,
      },
      {
        path: "riwayat-permohonan-krk",
        loader: operatorLoader,
        element: <RiwayatPermohonanAdminPage />,
      },
      {
        path: "detail/:id",
        loader: operatorLoader,
        element: <DetailPermohonanAdminPage />,
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
