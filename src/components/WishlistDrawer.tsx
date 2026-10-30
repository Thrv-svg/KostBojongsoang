import React from 'react';
import { KostProperty } from '../data/kostData';
import { X, Heart, Trash2, ArrowRightLeft, MessageCircle, ExternalLink, Calendar, MapPin, Sparkles } from 'lucide-react';
import { handleImageFallback } from '../utils/imageUtils';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteKosts: KostProperty[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onSelectDetail: (kost: KostProperty) => void;
  onOpenBooking: (kost?: KostProperty) => void;
  onToggleCompare?: (kost: KostProperty) => void;
  compareList?: string[];
  onScrollToFavoritesSection?: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  favoriteKosts,
  onRemoveFavorite,
  onClearAll,
  onSelectDetail,
  onOpenBooking,
  onToggleCompare,
  compareList = [],
  onScrollToFavoritesSection,
}) => {
  if (!isOpen) return null;

  const categoryLabels = {
    putra: 'Kost Putra',
    putri: 'Kost Putri',
    campur: 'Kost Campur',
  };

  return (
    <div className="fixed inset-0 z-[250] overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200 shadow-2xs">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0C4A6E] flex items-center gap-2">
                  <span>Kamar Favorit</span>
                  <span className="px-2 py-0.5 text-xs font-semibold bg-rose-100 text-rose-700 rounded-full">
                    {favoriteKosts.length}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500">Tersimpan di perangkat Anda (localStorage)</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {favoriteKosts.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1"
                  title="Kosongkan Semua Favorit"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px] font-medium">Hapus Semua</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                aria-label="Tutup panel favorit"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favoriteKosts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center border border-rose-100 shadow-xs">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-bold text-sm text-[#0C4A6E]">Belum Ada Kamar Tersimpan</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Klik tanda hati ❤️ pada kartu kost yang Anda minati untuk menyimpannya di sini agar mudah dibuka kembali atau dibandingkan.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0C4A6E] hover:bg-[#08334c] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Jelajahi Katalog Kost
                </button>
              </div>
            ) : (
              favoriteKosts.map((kost) => {
                const formattedPrice = new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  maximumFractionDigits: 0,
                }).format(kost.monthlyPrice);

                const isCompared = compareList.includes(kost.id);

                const directWALink = `https://wa.me/${kost.whatsappNumber}?text=${encodeURIComponent(
                  `Halo Pengelola ${kost.name}, saya melihat kamar ini dari daftar favorit di KostBojongsoang. Apakah tipe ${kost.roomSize} masih tersedia untuk disurvei?`
                )}`;

                return (
                  <div
                    key={kost.id}
                    className="group bg-white rounded-xl border border-slate-200 hover:border-sky-300 p-3 shadow-2xs hover:shadow-md transition-all flex flex-col gap-2.5 relative"
                  >
                    <div className="flex gap-3">
                      {/* Image Thumbnail */}
                      <div
                        onClick={() => {
                          onSelectDetail(kost);
                          onClose();
                        }}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100 cursor-pointer relative"
                        title="Klik untuk melihat detail"
                      >
                        <img
                          src={kost.mainImage}
                          alt={kost.name}
                          onError={handleImageFallback}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 text-[9px] font-bold text-white bg-black/60 rounded">
                          {categoryLabels[kost.category]}
                        </span>
                      </div>

                      {/* Info & Price */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4
                              onClick={() => {
                                onSelectDetail(kost);
                                onClose();
                              }}
                              className="font-bold text-xs sm:text-sm text-[#0C4A6E] hover:text-[#0EA5E9] truncate cursor-pointer transition-colors"
                            >
                              {kost.name}
                            </h4>
                            <button
                              type="button"
                              onClick={() => onRemoveFavorite(kost.id)}
                              className="text-slate-300 hover:text-rose-500 p-1 rounded transition-colors cursor-pointer"
                              title="Hapus dari favorit"
                              aria-label="Hapus dari favorit"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5 truncate">
                            <MapPin className="w-3 h-3 text-[#0EA5E9] shrink-0" />
                            <span className="truncate">{kost.distanceToTelkom}</span>
                          </div>
                        </div>

                        <div className="flex items-baseline justify-between gap-2 mt-2">
                          <span className="text-xs sm:text-sm font-bold text-[#0C4A6E] font-mono">
                            {formattedPrice}
                            <span className="text-[10px] font-normal text-slate-500">/bln</span>
                          </span>

                          <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            Sisa {kost.roomAvailable}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons on item */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectDetail(kost);
                          onClose();
                        }}
                        className="py-1.5 px-2 text-[11px] font-semibold text-slate-700 hover:text-[#0C4A6E] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center cursor-pointer"
                      >
                        Detail
                      </button>

                      {onToggleCompare && (
                        <button
                          type="button"
                          onClick={() => onToggleCompare(kost)}
                          className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1 ${
                            isCompared
                              ? 'bg-sky-100 text-[#0C4A6E] font-bold border border-sky-300'
                              : 'text-slate-600 hover:text-[#0C4A6E] bg-slate-50 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          <ArrowRightLeft className="w-3 h-3" />
                          <span>{isCompared ? 'Terpilih' : 'Banding'}</span>
                        </button>
                      )}

                      <a
                        href={directWALink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-2 text-[11px] font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>WA</span>
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer with batch actions */}
          {favoriteKosts.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2 shrink-0">
              {onScrollToFavoritesSection && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onScrollToFavoritesSection();
                  }}
                  className="w-full py-2 px-3 text-xs font-semibold text-[#0C4A6E] bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Lihat Semua di Section Favorit</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Isi Formulir Rencana Masuk</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
