// src/components/FAQPage.jsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "../widgets/Header";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Data untuk FAQ, lebih mudah dikelola di sini
const faqData = [
  {
    id: "item-1",
    question: "Apa yang dimaksud dengan KRK ?",
    answer:
      "KRK atau Keterangan Rencana Kota adalah informasi tentang peruntukan lahan dan peraturan zonasi yang berlaku pada suatu lokasi.",
  },
  {
    id: "item-2",
    question: "Apa yang dimaksud dengan RDB ?",
    answer:
      "Jawaban untuk pertanyaan RDB akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-3",
    question: "Apa yang dimaksud dengan KLB ?",
    answer:
      "Jawaban untuk pertanyaan KLB akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-4",
    question: "Apa yang dimaksud dengan KDH ?",
    answer:
      "Jawaban untuk pertanyaan KDH akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-5",
    question: "Apa yang dimaksud dengan GSB ?",
    answer:
      "Jawaban untuk pertanyaan GSB akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-6",
    question: "Apa yang dimaksud dengan RUMJA ?",
    answer:
      "Jawaban untuk pertanyaan RUMJA akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-7",
    question: "Apa yang dimaksud dengan PBG ?",
    answer:
      "Jawaban untuk pertanyaan PBG akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-8",
    question: "Apa yang dimaksud dengan SLF ?",
    answer:
      "Jawaban untuk pertanyaan SLF akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-9",
    question: "Apa yang dimaksud dengan SIMBG ?",
    answer:
      "Jawaban untuk pertanyaan SIMBG akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "item-10",
    question: "Apa yang dimaksud dengan RTB ?",
    answer:
      "Jawaban untuk pertanyaan RTB akan ditampilkan di sini. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header children={true} />
      <div className="flex-1 w-full flex items-start justify-center p-4 sm:p-8 bg-gray-50">
        {/* Konten Utama FAQ di Tengah */}
        <div className="w-full max-w-4xl mx-4">
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-gray-800">
                FAQ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {faqData.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border rounded-lg bg-slate-50"
                  >
                    <AccordionTrigger className="text-left font-semibold px-6 py-4 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Pagination className="flex items-center justify-end mt-5">
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
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
