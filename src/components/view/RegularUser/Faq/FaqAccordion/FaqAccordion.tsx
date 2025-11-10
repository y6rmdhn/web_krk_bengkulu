import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import React from "react";

interface IFilteredFaqData {
  id: string;
  question: string;
  answer: string;
  category: string;
  icon: React.ElementType;
}

interface PropTypes {
  filteredFaqData: IFilteredFaqData[];
}

const FaqAccordion = (props: PropTypes) => {
  const { filteredFaqData } = props;

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {filteredFaqData.length > 0 ? (
        filteredFaqData.map((item) => {
          const IconComponent = item.icon;
          return (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-0 rounded-2xl bg-gradient-to-r from-white to-gray-50/80 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold px-6 py-5 hover:no-underline hover:bg-gray-50/50 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                    <IconComponent className="text-green-600" size={20} />
                  </div>
                  <span className="text-gray-800 group-hover:text-gray-900">
                    {item.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })
      ) : (
        <div className="text-center py-12">
          <HelpCircle size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">
            Tidak ada pertanyaan yang ditemukan
          </p>
          <p className="text-gray-500">
            Coba gunakan kata kunci lain atau lihat kategori yang berbeda
          </p>
        </div>
      )}
    </Accordion>
  );
};

export default FaqAccordion;
