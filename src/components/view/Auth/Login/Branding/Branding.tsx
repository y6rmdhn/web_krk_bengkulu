import { Building2, MapPin } from "lucide-react";

const Branding = () => {
  return (
    <div className="hidden lg:flex flex-col justify-center space-y-8 text-center lg:text-left">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-lg font-semibold text-gray-800">
            Sistem Informasi Terintegrasi
          </span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            KRK Online
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              Kota Bengkulu
            </span>
          </h1>

          <div className="flex items-center justify-center lg:justify-start gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Building2 size={20} className="text-green-600" />
              <span className="font-medium">Dinas PUPR</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-blue-600" />
              <span className="font-medium">Kota Bengkulu</span>
            </div>
          </div>
        </div>

        <p className="text-xl text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
          Akses layanan digital terpadu untuk pengurusan Keterangan Rencana Kota
          dengan proses yang cepat dan transparan
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
        {[
          "Proses Digital",
          "Monitoring Real-time",
          "Transparan",
          "Akuntabel",
        ].map((feature, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branding;
