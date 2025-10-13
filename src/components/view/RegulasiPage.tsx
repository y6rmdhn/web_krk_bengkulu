// src/components/RegulasiPage.jsx

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Info, Download } from "lucide-react";
import Header from "../widgets/Header";

// Data untuk daftar regulasi, agar mudah dikelola
const regulasiData = [
  {
    id: 1,
    title:
      "Undang - Undang Republik Indonesia Nomor 14 Tahun 2008 Tentang Keterbukaan Informasi Publik",
    fileUrl: "/path/to/your/file1.pdf",
  },
  {
    id: 2,
    title:
      "Undang - Undang Republik Indonesia Nomor 25 Tahun 2009 Tentang Pelayanan Publik",
    fileUrl: "/path/to/your/file2.pdf",
  },
  {
    id: 3,
    title:
      "Undang - Undang Republik Indonesia Nomor 28 Tahun 2002 Tentang Bangunan Gedung",
    fileUrl: "/path/to/your/file3.pdf",
  },
  {
    id: 4,
    title:
      "Peraturan Pemerintah Republik Indonesia Nomor 36 Tahun 2005 Tentang Peraturan Pelaksanaan Undang - Undang Nomor 28 Tahun 2002 Tentang Bangunan Gedung",
    fileUrl: "/path/to/your/file4.pdf",
  },
  {
    id: 5,
    title: "Peraturan Pemerintah Republik Indonesia Nomor 53 Tahun 2010",
    fileUrl: "/path/to/your/file5.pdf",
  },
  // Tambahkan data lainnya sesuai kebutuhan
];

export default function RegulasiPage() {
  return (
    <>
      <Header children={true} />
      <div className="flex-1 w-full flex items-start justify-center p-4 sm:p-8 bg-gray-50 relative">
        {/* <img
          src="/img/image 1.png"
          alt="Green City Illustration"
          className="absolute object-cover z-0 hidden lg:block -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2"
        /> */}

        {/* Konten Utama di Tengah */}
        <div className="w-full max-w-5xl mx-4 relatif z-10">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="items-center">
              <CardTitle className="text-3xl font-bold text-center text-gray-800">
                Daftar Regulasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Daftar Regulasi */}
              <div className="space-y-4">
                {regulasiData.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 border-b last:border-b-0"
                  >
                    <span className="font-semibold text-gray-500">
                      {item.id}.
                    </span>
                    <p className="flex-grow text-gray-700">{item.title}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500"
                    >
                      <Info className="h-5 w-5" />
                    </Button>
                    <a href={item.fileUrl} download>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </a>
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
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">11</PaginationLink>
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
