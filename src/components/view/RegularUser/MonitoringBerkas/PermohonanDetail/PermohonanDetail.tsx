import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import useDetailPermohonan from "./usePermohonanDetail";
import { getStatusConfig } from "@/constants/status.constant";
import {
  Loader2,
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  Hash,
  Copy,
  Check,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { useState } from "react";
import HeaderSection from "@/components/commons/HeaderSection";
import AlurPermohonanPublicCard from "./AlurPermohonanPublicCard/AlurPermohonanPublicCard";

const DetailPermohonan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useDetailPermohonan(id!);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="animate-spin h-8 w-8 mb-4" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <p className="text-gray-600 mb-4">Data permohonan tidak ditemukan</p>
          <Button onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  const formatTgl = (date: string) => {
    try {
      return format(new Date(date), "dd MMMM yyyy, HH:mm 'WIB'", {
        locale: idLocale,
      });
    } catch {
      return "-";
    }
  };

  const statusConfig = data.info
    ? getStatusConfig(data.info.status_terkini)
    : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="lg:hidden mb-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2 px-0 hover:bg-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
      </div>

      <div className="mt-4 lg:mt-10 flex flex-col gap-4 sm:gap-6">
        {data.info && (
          <HeaderSection
            data={{
              nomor_permohonan: data.info.nomor,
              status: data.info.status_terkini,
              submitted_at: data.info.tanggal_submit,
            }}
            onBack={() => navigate(-1)}
            getStatusColor={(status) => getStatusConfig(status).color}
            getStatusText={(status) => getStatusConfig(status).label}
          />
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 space-y-6">
            {data.info && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800 mb-5 border-b pb-3">
                  Detail Informasi
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                      <Hash className="w-4 h-4" /> Nomor Registrasi
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900 font-mono">
                        {data.info.nomor}
                      </span>
                      <button
                        onClick={() => handleCopy(data.info.nomor)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                      Status Terkini
                    </p>
                    {statusConfig && (
                      <Badge
                        variant="outline"
                        className={`px-3 py-1 ${statusConfig.color} border-transparent`}
                      >
                        {statusConfig.label}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                      <User className="w-4 h-4" /> Nama Pemilik
                    </p>
                    <p className="font-medium text-slate-900 capitalize">
                      {data.info.pemilik}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Tanggal Pengajuan
                    </p>
                    <p className="font-medium text-slate-900">
                      {formatTgl(data.info.tanggal_submit)}
                    </p>
                  </div>

                  <div className="md:col-span-2 mt-2 pt-4 border-t border-dashed border-slate-200">
                    <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-lg">
                      <MapPin className="w-5 h-5 text-indigo-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                          Posisi Dokumen Saat Ini
                        </p>
                        <p className="font-semibold text-slate-800">
                          {data.info.posisi_dokumen}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-4 space-y-4 sm:space-y-6">
              <AlurPermohonanPublicCard data={data.riwayat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPermohonan;
