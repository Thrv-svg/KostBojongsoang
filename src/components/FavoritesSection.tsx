import React from 'react';
import { KostProperty } from '../data/kostData';
import { KostCard } from './KostCard';
import { Heart, Trash2, ArrowRightLeft, Sparkles, PlusCircle, CheckCircle2, Bookmark } from 'lucide-react';

interface FavoritesSectionProps {
  favoriteKosts: KostProperty[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onSelectDetail: (kost: KostProperty) => void;
  onOpenBooking: (kost?: KostProperty) => void;
  compareList: string[];
  onToggleCompare: (kost: KostProperty) => void;
  onOpenCompare: () => void;
  onExploreCatalog: () => void;
}

export const FavoritesSection: React.FC<FavoritesSectionProps> = ({
  favoriteKosts,
  isFavorite,
  onToggleFavorite,
  onClearAllFavorites,
  onSelectDetail,
  onOpenBooking,
  compareList,
  onToggleCompare,
  onOpenCompare,
  onExploreCatalog,
}) => {
  // Calculate price range
  const prices = favoriteKosts.map((k) => k.monthlyPrice);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const formattedMin = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(minPrice);

  const formattedMax = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(maxPrice);

  return (
    <section
      id="kamar-favorit"
      className="py-14 bg-gradient-to-b from-rose-50/40 via-white to-slate-50 border-y border-rose-100/70 scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold mb-2 shadow-2xs">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Daftar Tersimpan (Wishlist)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C4A6E] tracking-tight flex items-center gap-2">
              <span>Kamar Kost Favorit Anda</span>
              {favoriteKosts.length > 0 && (
                <span className="text-sm font-semibold px-2.5 py-0.5 rounded-full bg-rose-500 text-white shadow-2xs">
                  {favoriteKosts.length} Kamar
                </span>
              )}
            </h2>
            <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
              Kamar kost yang telah Anda simpan di perangkat ini melalui penyimpanan lokal (<span className="font-mono text-xs text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">localStorage</span>). Tetap tersimpan meskipun halaman dimuat ulang.
            </p>
          </div>

          {/* Quick Header Actions */}
          {favoriteKosts.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              {favoriteKosts.length >= 2 && (
                <button
                  type="button"
                  onClick={onOpenCompare}
                  className="px-3.5 py-2 text-xs font-semibold text-[#0C4A6E] bg-sky-100 hover:bg-sky-200 rounded-xl transition-colors cursor-pointer border border-sky-300 flex items-center gap-1.5 shadow-2xs"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  <span>Bandingkan Kamar</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClearAllFavorites}
                className="px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                title="Hapus semua kamar dari daftar favorit"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Hapus Semua</span>
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Overview Banner when items exist */}
        {favoriteKosts.length > 0 && (
          <div className="mb-8 p-4 sm:p-5 bg-white rounded-2xl border border-rose-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 block text-[11px]">Total Pilihan</span>
                <span className="font-bold text-[#0C4A6E] text-sm">{favoriteKosts.length} unit kamar</span>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div>
                <span className="text-slate-400 block text-[11px]">Rentang Biaya Bulanan</span>
                <span className="font-bold text-[#0C4A6E] font-mono text-sm">
                  {prices.length === 1 ? formattedMin : `${formattedMin} - ${formattedMax}`}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div>
                <span className="text-slate-400 block text-[11px]">Status Ketersediaan</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Semua kamar siap disurvei
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-4 py-2 text-xs font-bold text-[#0C4A6E] bg-[#F5E6D3] hover:bg-[#ebd3ba] rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-2xs self-stretch sm:self-auto text-center"
            >
              Survei Koleksi Ini Sekarang
            </button>
          </div>
        )}

        {/* Content Grid or Empty State */}
        {favoriteKosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteKosts.map((kost) => (
              <KostCard
                key={`fav-${kost.id}`}
                kost={kost}
                onSelectDetail={onSelectDetail}
                onOpenBooking={onOpenBooking}
                isCompared={compareList.includes(kost.id)}
                onToggleCompare={onToggleCompare}
                isFavorite={isFavorite(kost.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="p-10 sm:p-12 bg-white rounded-2xl border-2 border-dashed border-rose-200 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-xs border border-rose-100">
              <Heart className="w-8 h-8 fill-rose-100 text-rose-500" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#0C4A6E]">
                Belum Ada Kamar Kost yang Disimpan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Saat menelusuri katalog kost di bawah ini, klik tombol hati (<span className="text-rose-500 font-bold">❤️</span>) di pojok foto kamar kost untuk menyimpannya ke daftar favorit Anda.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0C4A6E] hover:bg-[#08334c] rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-[#0EA5E9]" />
                <span>Buka Katalog Kost Lengkap</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
