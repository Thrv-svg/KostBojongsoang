import React from 'react';
import { KostProperty } from '../data/kostData';
import { ArrowRightLeft, X, Trash2, Plus } from 'lucide-react';
import { handleImageFallback } from '../utils/imageUtils';

interface CompareFloatingBarProps {
  selectedKosts: KostProperty[];
  maxCompare?: number;
  onRemoveKost: (id: string) => void;
  onClearAll: () => void;
  onOpenCompare: () => void;
  onSelectDetail?: (kost: KostProperty) => void;
}

export const CompareFloatingBar: React.FC<CompareFloatingBarProps> = ({
  selectedKosts,
  maxCompare = 3,
  onRemoveKost,
  onClearAll,
  onOpenCompare,
  onSelectDetail,
}) => {
  if (selectedKosts.length === 0) return null;

  const canCompare = selectedKosts.length >= 2;
  const remainingSlots = Math.max(0, maxCompare - selectedKosts.length);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl transition-all duration-300">
      <div className="bg-[#0C4A6E] text-white rounded-2xl shadow-2xl p-3 sm:p-4 border border-sky-400/40 backdrop-blur-md">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-800/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0EA5E9] text-white">
              <ArrowRightLeft className="w-3 h-3" />
            </span>
            <span className="font-semibold text-white tracking-wide">
              Bandingkan Kamar Kost
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sky-900/80 text-sky-200 text-[11px] font-mono font-medium">
              {selectedKosts.length} / {maxCompare} Terpilih
            </span>
          </div>

          <button
            type="button"
            onClick={onClearAll}
            className="text-sky-300 hover:text-white flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer"
            title="Reset semua pilihan"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Selected Items Row + Compare Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Thumbnails of selected kosts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {selectedKosts.map((kost) => (
              <div
                key={kost.id}
                onClick={() => onSelectDetail && onSelectDetail(kost)}
                className="relative flex items-center gap-2 bg-sky-950/70 hover:bg-sky-900 border border-sky-700/50 rounded-xl p-1.5 pr-2.5 shrink-0 max-w-[200px] cursor-pointer group/item transition-colors"
                title="Klik untuk melihat detail lengkap kamar ini"
              >
                <img
                  src={kost.mainImage}
                  alt={kost.name}
                  onError={handleImageFallback}
                  className="w-10 h-10 rounded-lg object-cover shrink-0 group-hover/item:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-semibold text-white truncate group-hover/item:text-sky-300 transition-colors">
                    {kost.name}
                  </p>
                  <p className="text-[10px] font-mono text-sky-300 truncate">
                    {formatPrice(kost.monthlyPrice)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveKost(kost.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                  title={`Hapus ${kost.name} dari perbandingan`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Empty Slots */}
            {Array.from({ length: remainingSlots }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="hidden sm:flex items-center gap-2 border border-dashed border-sky-600/60 rounded-xl px-3 py-2 text-[11px] text-sky-300/80 shrink-0"
              >
                <Plus className="w-3.5 h-3.5 text-sky-400" />
                <span>+ Pilih kamar lagi</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              disabled={!canCompare}
              onClick={onOpenCompare}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                canCompare
                  ? 'bg-[#F97316] hover:bg-[#ea580c] text-white active:scale-95'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-75'
              }`}
            >
              <ArrowRightLeft className="w-4 h-4" />
              <span>
                {canCompare
                  ? `Bandingkan (${selectedKosts.length}) Kamar`
                  : 'Pilih Min. 2 Kamar'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
