import React from 'react';
import { TESTIMONIALS } from '../data/kostData';
import { MessageSquare, Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider mb-1">
            <MessageSquare className="w-4 h-4" />
            <span>Pengalaman Penghuni & Orang Tua</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C4A6E] tracking-tight">
            Cerita Nyata Tinggal di Bojongsoang
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Ulasan dari mahasiswa aktif Telkom University dan orang tua tentang kenyamanan, keamanan lingkungan, serta transparansi biaya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-semibold text-[#0EA5E9] bg-sky-50 px-2.5 py-1 rounded-md inline-block">
                  {t.kostName}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0C4A6E] text-white flex items-center justify-center text-xs font-bold font-mono">
                  {t.name.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0C4A6E]">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                  <div className="text-[10px] text-slate-400">{t.stayDuration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
