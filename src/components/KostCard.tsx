import React from 'react';
import { KostProperty } from '../data/kostData';
import { Wifi, Wind, Bath, Shield, MapPin, Maximize2, MessageCircle, Info, AlertCircle, Utensils, Flame, ArrowRightLeft, Check } from 'lucide-react';

interface KostCardProps {
  kost: KostProperty;
  onSelectDetail: (kost: KostProperty) => void;
  onOpenBooking: (kost: KostProperty) => void;
  isCompared?: boolean;
  onToggleCompare?: (kost: KostProperty) => void;
}

export const KostCard: React.FC<KostCardProps> = ({
  kost,
  onSelectDetail,
  onOpenBooking,
  isCompared = false,
  onToggleCompare,
}) => {
  const categoryLabels = {
    putra: 'Kost Putra',
    putri: 'Kost Putri',
    campur: 'Kost Campur',
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(kost.monthlyPrice);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Photo Container - Clickable to open detail */}
      <div
        onClick={() => onSelectDetail(kost)}
        className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100 cursor-pointer"
        title="Klik untuk melihat detail foto dan fasilitas kamar"
      >
        <img
          src={kost.mainImage}
          alt={kost.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle dark gradient overlay at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges / Info (Sand accent styling per design.md) */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold text-[#0C4A6E] bg-[#F5E6D3] rounded-md shadow-xs">
            {categoryLabels[kost.category]}
          </span>
          {kost.roomAvailable <= 2 ? (
            <span className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 rounded-md shadow-xs">
              Sisa {kost.roomAvailable} Kamar!
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-100 rounded-md shadow-xs">
              {kost.roomAvailable} Kamar Tersedia
            </span>
          )}
        </div>

        {/* Compare Toggle Button on Top Right */}
        {onToggleCompare && (
          <div className="absolute top-3 right-3 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(kost);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                isCompared
                  ? 'bg-[#0EA5E9] text-white ring-2 ring-white/90 scale-105'
                  : 'bg-black/50 hover:bg-black/75 text-white/90 backdrop-blur-xs border border-white/30'
              }`}
              title={isCompared ? 'Hapus dari perbandingan' : 'Tambah ke perbandingan (Maks 3)'}
            >
              {isCompared ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Dibandingkan</span>
                </>
              ) : (
                <>
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Bandingkan</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Distance Overlaid on Photo */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
            <span className="truncate">{kost.distanceToTelkom}</span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed Metadata / Legend Info - Clickable to open detail */}
          <div
            onClick={() => onSelectDetail(kost)}
            className="flex items-center gap-2 text-xs text-slate-500 flex-wrap cursor-pointer hover:text-[#0EA5E9] transition-colors group/meta"
            title="Klik informasi kamar untuk melihat rincian detail"
          >
            <span className="group-hover/meta:underline">{kost.area}</span>
            <span aria-hidden="true">·</span>
            <span className="group-hover/meta:underline">{kost.roomSize}</span>
            <span aria-hidden="true">·</span>
            <span className={`${kost.hasWaterHeater ? 'text-emerald-700 font-medium' : 'text-slate-500'} group-hover/meta:underline`}>
              Water Heater: {kost.hasWaterHeater ? 'Ada' : 'Tidak Ada'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="group-hover/meta:underline">
              {kost.electricityPolicy.includes('mandiri') ? 'Token Sendiri' : 'Listrik Termasuk'}
            </span>
          </div>

          {/* Title - Clickable to open detail */}
          <h3
            onClick={() => onSelectDetail(kost)}
            className="text-lg font-bold text-[#0C4A6E] tracking-tight group-hover:text-[#0EA5E9] transition-colors cursor-pointer"
            title="Klik nama kost untuk melihat detail lengkap"
          >
            {kost.name}
          </h3>

          <p
            onClick={() => onSelectDetail(kost)}
            className="text-xs text-slate-600 line-clamp-2 leading-relaxed cursor-pointer"
            title="Klik untuk melihat deskripsi lengkap"
          >
            {kost.tagline}
          </p>

          {/* Key Amenities Legend Preview - Clickable to open detail */}
          <div
            onClick={() => onSelectDetail(kost)}
            className="pt-2 flex items-center gap-3 text-xs text-slate-600 flex-wrap cursor-pointer hover:text-[#0C4A6E] transition-colors"
            title="Klik fasilitas untuk melihat spesifikasi kamar"
          >
            {kost.hasWiFi && (
              <div className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Wi-Fi Cepat</span>
              </div>
            )}
            {kost.hasPrivateBathroom && (
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>KM Dalam</span>
              </div>
            )}
            {kost.hasAC ? (
              <div className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>AC</span>
              </div>
            ) : null}
            <div className="flex items-center gap-1">
              <Utensils className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span className="font-medium">
                {kost.gasPolicy.includes('termasuk')
                  ? 'Dapur (Gas Termasuk)'
                  : kost.gasPolicy.includes('beli sendiri')
                  ? 'Dapur (Gas Beli Sendiri)'
                  : 'Pantry Listrik'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>CCTV 24 Jam</span>
            </div>
          </div>

          {/* Drawbacks / Catatan Kekurangan (Transparansi) - Clickable to open detail */}
          {kost.drawbacks && kost.drawbacks.length > 0 && (
            <div
              onClick={() => onSelectDetail(kost)}
              className="pt-2 bg-amber-50/70 hover:bg-amber-100/75 transition-colors rounded-xl p-2.5 border border-amber-200/60 space-y-1 cursor-pointer"
              title="Klik untuk melihat rincian catatan dan kekurangan kamar"
            >
              <div className="text-[11px] font-semibold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 text-amber-700 shrink-0" />
                <span>Kekurangan / Catatan:</span>
              </div>
              <ul className="text-[11px] text-amber-800 space-y-0.5 list-disc pl-4 font-normal">
                {kost.drawbacks.slice(0, 2).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
                {kost.drawbacks.length > 2 && (
                  <li className="list-none -ml-4 text-[10px] text-amber-700 italic pt-0.5 font-medium">
                    + {kost.drawbacks.length - 2} catatan lainnya (klik untuk lihat detail)
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div
            onClick={() => onSelectDetail(kost)}
            className="cursor-pointer hover:opacity-85 transition-opacity"
            title="Klik untuk melihat detail kamar"
          >
            <span className="block text-[11px] text-slate-400 font-medium uppercase tracking-wider">
              Harga Mulai
            </span>
            <div className="font-mono text-base sm:text-lg font-bold text-[#0C4A6E]">
              {formattedPrice}
              <span className="text-xs font-normal text-slate-500"> /bln</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectDetail(kost)}
              className="p-2 sm:px-3 sm:py-2 text-xs font-medium text-[#0C4A6E] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              title="Lihat Detail Fasilitas"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Detail</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking(kost)}
              className="px-3.5 py-2 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap active:translate-y-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Booking</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
