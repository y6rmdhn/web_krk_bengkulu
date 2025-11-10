import React from "react";
import { difficultyConfig } from "../Prosedur.constant";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList, FileText } from "lucide-react";

type ProsedurItem = {
  id: number;
  title: string;
  link: string;
  category: string;
  icon: React.ElementType;
  description: string;
  duration: string;
  difficulty: string;
};

interface PropTypes {
  prosedurData: ProsedurItem[];
}

const ProsedurList = (props: PropTypes) => {
  const { prosedurData } = props;

  return (
    <div className="space-y-4">
      {prosedurData.length > 0 ? (
        prosedurData.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 bg-gradient-to-r from-white to-gray-50/80 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-200"
            >
              {/* Icon and Number */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                  <IconComponent className="text-purple-600" size={24} />
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
                      difficultyConfig[
                        item.difficulty as keyof typeof difficultyConfig
                      ]
                    }`}
                  >
                    {item.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    ⏱️ {item.duration}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors duration-200 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <Link to={item.link} className="flex-shrink-0">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 group/btn min-w-[140px]">
                  <FileText className="mr-2 h-4 w-4" />
                  Persyaratan
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          );
        })
      ) : (
        <div className="text-center py-12">
          <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">
            Tidak ada prosedur yang ditemukan
          </p>
          <p className="text-gray-500">
            Coba gunakan kata kunci lain atau ubah filter pencarian
          </p>
        </div>
      )}
    </div>
  );
};

export default ProsedurList;
