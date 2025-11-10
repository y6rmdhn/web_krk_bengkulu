import { User, Mail, Phone, Shield, Building2, MapPin } from "lucide-react";
import React from "react";

const Branding = () => {
  return (
    <div className="hidden lg:flex flex-col space-y-8">
      <div className="relative">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <img
            src="/img/jadi 2.png"
            alt="KRK Online Logo"
            className="w-24 h-24 mx-auto mb-6"
          />

          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full px-6 py-3 shadow-lg">
              <Shield size={20} />
              <span className="font-semibold">Daftar Akun Baru</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
              KRK Online
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                Kota Bengkulu
              </span>
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Bergabung dengan layanan digital terpadu untuk pengurusan
              Keterangan Rencana Kota
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Shield, text: "Proses Aman", color: "green" },
              { icon: User, text: "Akses Mudah", color: "blue" },
              {
                icon: Mail,
                text: "Notifikasi Real-time",
                color: "emerald",
              },
              { icon: Phone, text: "Dukungan 24/7", color: "green" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className={`bg-${item.color}-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2`}
                >
                  <item.icon className={`text-${item.color}-600`} size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-green-200/20 rounded-full mix-blend-overlay filter blur-2xl"></div>
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200/20 rounded-full mix-blend-overlay filter blur-2xl"></div>
      </div>

      {/* Additional Info */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="text-green-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">Dinas PUPR</p>
              <p className="text-sm text-gray-600">Kota Bengkulu</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" size={24} />
            <div className="text-right">
              <p className="font-semibold text-gray-900">Registrasi</p>
              <p className="text-sm text-gray-600">Cepat & Mudah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
