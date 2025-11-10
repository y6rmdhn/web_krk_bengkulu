import { Button } from "@/components/ui/button";
import { BookOpen, Download, FileText, Info } from "lucide-react";
import { typeConfig } from "../Regulasi.constant";

interface RegulasiItem {
  id: number;
  title: string;
  fileUrl: string;
  type: string;
  year: number;
  category: string;
  size: string;
}

interface PropTypes {
  regulasiData: RegulasiItem[];
}

const RegulasiList = (props: PropTypes) => {
  const { regulasiData } = props;

  return (
    <div className="space-y-4">
      {regulasiData.length > 0 ? (
        regulasiData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-gradient-to-r from-white to-gray-50/80 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-200 group"
          >
            {/* Icon and Number */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                <FileText className="text-blue-600" size={24} />
              </div>
              <span className="text-2xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors duration-200">
                {item.id.toString().padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    typeConfig[item.type as keyof typeof typeConfig].color
                  }`}
                >
                  {typeConfig[item.type as keyof typeof typeConfig].label}
                </span>
                <span className="text-sm text-gray-500">Tahun {item.year}</span>
                <span className="text-sm text-gray-500">• {item.size}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                {item.title}
              </h3>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-gray-300 hover:bg-gray-50"
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">
            Tidak ada regulasi yang ditemukan
          </p>
          <p className="text-gray-500">
            Coba gunakan kata kunci lain atau ubah filter pencarian
          </p>
        </div>
      )}
    </div>
  );
};

export default RegulasiList;
