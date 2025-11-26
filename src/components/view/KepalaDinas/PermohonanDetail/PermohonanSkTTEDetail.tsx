import { useState, useMemo } from "react"; // Tambah useMemo
import { useNavigate, useParams } from "react-router-dom";
import usePermohonanSkTTEDetail from "./usePermohonanSkTTEDetail";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import KepalaDinasLayout from "@/components/layouts/KepalaDinas";

import HeaderSection from "./HeaderSection";
import DataPemohonCard from "./DataPemohonCard";
import DataPemilikCard from "./DataPemilikCard";
import DataBangunanCard from "./DataBangunanCard";
import BerkasLampiranCard from "./BerkasLampiranCard";
import AlurPermohonanCard from "./AlurPermohonan";
import ActionButtons from "./ActionButton";
import { getStatusColor, getStatusText } from "@/utils/statusUtils";
import { formatAlamat } from "@/utils/formatUtils";

import { Eye, Loader2 } from "lucide-react";

// HAPUS SEMUA IMPORT REACT-PDF (Document, Page, pdfjs, css) BIAR GAK BERAT
// import { Document, Page, pdfjs } from "react-pdf"; ... hapus ini

const PermohonanSkTTEDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, dataDetailHistory, dataSk, isLoadingSk } =
    usePermohonanSkTTEDetail(id!);

  // --- SOLUSI UTAMA: BUAT URL BLOB MANUAL ---
  // Ini trik biar browser bisa baca Blob data dari Backend
  const pdfUrl = useMemo(() => {
    if (!dataSk) return null;

    // Cek dulu, kalau backend balikin JSON error dalam bentuk Blob
    if (dataSk.type === "application/json") {
      console.error("Data SK ternyata JSON (Mungkin Error Backend):", dataSk);
      return null;
    }

    // Buat URL sementara untuk file PDF
    const blob = new Blob([dataSk], { type: "application/pdf" });
    return window.URL.createObjectURL(blob);
  }, [dataSk]);

  if (isLoading) {
    return (
      <KepalaDinasLayout title="Loading..." desc="Memuat detail permohonan">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin mr-2" />
          <p>Memuat data...</p>
        </div>
      </KepalaDinasLayout>
    );
  }

  if (!data) {
    return (
      <KepalaDinasLayout
        title="Data Tidak Ditemukan"
        desc="Permohonan tidak ditemukan"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-600 mb-4">Data permohonan tidak ditemukan</p>
          <Button onClick={() => navigate(-1)}>Kembali</Button>
        </div>
      </KepalaDinasLayout>
    );
  }

  return (
    <KepalaDinasLayout
      title={`Detail Permohonan KRK | ${data.nomor_permohonan}`}
      desc={`Detail permohonan KRK ${data.nomor_permohonan}`}
    >
      <div className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          <HeaderSection
            data={data}
            onBack={() => navigate(-1)}
            getStatusColor={getStatusColor}
            getStatusText={getStatusText}
          />

          {/* Cek dataSk ada isinya atau tidak */}
          {dataSk && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4" />
                  Lihat Surat SK
                </Button>
              </DialogTrigger>

              {/* MODAL CONTENT */}
              <DialogContent className="!max-w-[90vw] w-full h-[90vh] flex flex-col p-0 gap-0">
                <DialogHeader className="p-4 border-b">
                  <DialogTitle>Preview Surat Keputusan (SK)</DialogTitle>
                </DialogHeader>

                {/* AREA PDF MENGGUNAKAN IFRAME */}
                <div className="flex-1 bg-slate-100 w-full h-full relative">
                  {isLoadingSk ? (
                    <div className="flex items-center justify-center h-full gap-2">
                      <Loader2 className="animate-spin" /> Memuat Dokumen...
                    </div>
                  ) : pdfUrl ? (
                    // INI SOLUSINYA: Iframe + Blob URL
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full"
                      title="Preview SK"
                      style={{ border: "none" }} // Hilangkan border default
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-red-500">
                      Gagal memuat preview. File mungkin rusak.
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DataPemohonCard data={data} formatAlamat={formatAlamat} />
            <DataPemilikCard data={data} formatAlamat={formatAlamat} />
            <DataBangunanCard data={data} formatAlamat={formatAlamat} />

            {data.attachments && data.attachments.length > 0 && (
              <BerkasLampiranCard attachments={data.attachments} />
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <AlurPermohonanCard data={dataDetailHistory} />
            <ActionButtons id={`${id}`} />
          </div>
        </div>
      </div>
    </KepalaDinasLayout>
  );
};

export default PermohonanSkTTEDetail;
