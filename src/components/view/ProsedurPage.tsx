// src/components/ProsedurPage.jsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import Header from "../widgets/Header";

// Data untuk daftar Syarat dan Prosedur
const prosedurData = [
  { id: 1, title: "Pengajuan Siteplan", link: "/prosedur/siteplan" },
  {
    id: 2,
    title: "Pengajuan Surat Lisensi Bekerja Perencana",
    link: "/prosedur/lisensi",
  },
  {
    id: 3,
    title:
      "Pengajuan KRITERIA GAMBAR HASIL PENGUKURAN LAPANGAN UNTUK PERSYARATAN PERMOHONAN KKPR Non Berusaha",
    link: "/prosedur/kriteria-gambar",
  },
  {
    id: 4,
    title: "Pengajuan SLF (SERTIFIKAT LAYAK FUNGSI)",
    link: "/prosedur/slf",
  },
  {
    id: 5,
    title: "Pengajuan Informasi Rencana Kota",
    link: "/prosedur/info-rencana",
  },
  {
    id: 6,
    title: "Pengajuan Pelayanan Pemakaman",
    link: "/prosedur/pemakaman",
  },
  { id: 7, title: "Pengajuan Aduan SIMBG", link: "/prosedur/aduan-simbg" },
  {
    id: 8,
    title: "Pengajuan Panduan Akun Pemohon SIMBG",
    link: "/prosedur/panduan-akun",
  },
  {
    id: 9,
    title: "Pengajuan PENGUMUMAN SIMBG",
    link: "/prosedur/pengumuman-simbg",
  },
  {
    id: 10,
    title: "Pengajuan Persetujuan Bangunan Gedung",
    link: "/prosedur/pbg",
  },
];

export default function ProsedurPage() {
  return (
    <>
      <Header children={true} />
      <div className="flex-1 w-full flex items-start justify-center p-4 sm:p-8 bg-gray-50">
        {/* Konten Utama di Tengah */}
        <div className="w-full max-w-5xl mx-4">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="items-center">
              <CardTitle className="text-3xl font-bold text-center text-gray-800">
                Syarat dan Prosedur
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Daftar Prosedur */}
              <div className="space-y-3">
                {prosedurData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 border-b last:border-b-0"
                  >
                    <span className="font-semibold text-gray-500 w-8 text-right">
                      {item.id}.
                    </span>
                    <p className="flex-grow text-gray-700 font-medium">
                      {item.title}
                    </p>
                    <Link to={item.link}>
                      <Button className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]">
                        persyaratan
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Komponen Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
