import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import authLoader from "./components/layouts/AuthLayout/AuthLayout.loader";

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
    element: <RegisterPage />,
  },
  {
    path: "/berkas",
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
    path: "/admin",
    children: [
      {
        path: "dasboard",
        element: <DasboardAdmin />,
      },
      {
        path: "permohonan-krk",
        element: <PermohonanAdminPage />,
      },
      {
        path: "riwayat-permohonan-krk",
        element: <RiwayatPermohonanAdminPage />,
      },
      {
        path: "permohonan/:id",
        element: <DetailPermohonanAdminPage />,
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
