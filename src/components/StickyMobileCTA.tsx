import React from 'react';
import { Calendar, Compass, Search } from 'lucide-react';

interface StickyMobileCTAProps {
  onOpenBooking: () => void;
  onScrollToCatalog: () => void;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  onOpenBooking,
  onScrollToCatalog,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-lg">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={onScrollToCatalog}
          className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#0C4A6E] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-[#0EA5E9]" />
          <span>Lihat Kamar</span>
        </button>

        <button
          type="button"
          onClick={onOpenBooking}
          className="flex-1 py-2.5 px-3 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Rencana Masuk</span>
        </button>
      </div>
    </div>
  );
};
