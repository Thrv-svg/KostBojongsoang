import React, { useState } from 'react';
import { FAQS } from '../data/kostData';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Pertanyaan Umum</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C4A6E] tracking-tight">
              Pertanyaan Seputar Kost & Kehidupan Mahasiswa di Bojongsoang
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Semua info penting terkait sistem sewa, tagihan listrik, fasilitas dapur, keamanan gerbang, dan jam malam untuk kenyamanan belajar.
            </p>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0EA5E9]"
                  >
                    <span className="text-sm font-semibold text-[#0C4A6E]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0EA5E9] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
