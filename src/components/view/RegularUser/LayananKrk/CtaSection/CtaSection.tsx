import React from "react";

const CtaSection = () => {
  return (
    <div className="text-center mt-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Butuh Bantuan?
        </h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Tim customer service kami siap membantu Anda dalam proses pengajuan
          KRK. Jangan ragu untuk menghubungi kami.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            Hubungi Kami
          </button>
          <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200">
            Lihat FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
