import React, { useState } from 'react';
import { KostProperty } from '../data/kostData';
import {
  X,
  Check,
  Minus,
  MessageCircle,
  Info,
  Scale,
  Flame,
  Utensils,
  AlertCircle,
  Sparkles,
  MapPin,
  Maximize2,
  Wind,
  Bath,
  Wifi,
  Car,
  Shield,
  Zap
} from 'lucide-react';
import { handleImageFallback } from '../utils/imageUtils';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedKosts: KostProperty[];
  onRemoveKost: (id: string) => void;
  onOpenBooking: (kost: KostProperty) => void;
  onSelectDetail: (kost: KostProperty) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  selectedKosts,
  onRemoveKost,
  onOpenBooking,
  onSelectDetail,
}) => {
  const [highlightDiffs, setHighlightDiffs] = useState<boolean>(false);

  if (!isOpen || selectedKosts.length === 0) return null;

  const categoryLabels = {
    putra: 'Kost Putra',
    putri: 'Kost Putri',
    campur: 'Kost Campur',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper to check if a property has differing values across all selected kosts
  const isDifferent = (getter: (k: KostProperty) => any) => {
    if (selectedKosts.length < 2) return false;
    const firstVal = getter(selectedKosts[0]);
    return selectedKosts.some((k) => getter(k) !== firstVal);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
    >
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200/80 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider mb-1">
              <Scale className="w-4 h-4" />
              <span>Perbandingan Kamar Kost Bojongsoang</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C4A6E]">
              Komparasi Fitur & Fasilitas ({selectedKosts.length} Kamar)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Bandingkan harga, water heater, dapur bersama & kebijakan gas, serta transparansi kekurangan sebelum survei.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Toggle Highlight Diffs */}
            <label className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-slate-50 select-none">
              <input
                type="checkbox"
                checked={highlightDiffs}
                onChange={(e) => setHighlightDiffs(e.target.checked)}
                className="w-3.5 h-3.5 text-[#0EA5E9] rounded focus:ring-0 cursor-pointer"
              />
              <span>Sorot Perbedaan</span>
            </label>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comparison Table Area */}
        <div className="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6">
          <table className="w-full border-collapse text-left min-w-[640px]">
            {/* Table Header: Kost Overview Cards */}
            <thead>
              <tr className="border-b border-slate-200">
                <th className="w-44 sm:w-56 p-3 text-xs font-semibold text-slate-400 uppercase tracking-wider align-bottom pb-4">
                  Parameter / Kamar
                </th>
                {selectedKosts.map((kost) => (
                  <th key={kost.id} className="p-3 align-top min-w-[200px]">
                    <div className="relative group bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2.5">
                      {/* Close/Remove button */}
                      <button
                        type="button"
                        onClick={() => onRemoveKost(kost.id)}
                        className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/90 hover:bg-rose-600 hover:text-white text-slate-600 shadow-xs flex items-center justify-center transition-colors cursor-pointer"
                        title="Hapus dari perbandingan"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      {/* Photo Thumbnail - Clickable */}
                      <div
                        onClick={() => {
                          onClose();
                          onSelectDetail(kost);
                        }}
                        className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-slate-200 cursor-pointer group/thumb"
                        title="Klik untuk membuka detail lengkap kamar"
                      >
                        <img
                          src={kost.mainImage}
                          alt={kost.name}
                          onError={handleImageFallback}
                          className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-0.5 text-[10px] font-semibold text-[#0C4A6E] bg-[#F5E6D3] rounded-md shadow-xs">
                            {categoryLabels[kost.category]}
                          </span>
                        </div>
                      </div>

                      {/* Kost Identity - Clickable */}
                      <div
                        onClick={() => {
                          onClose();
                          onSelectDetail(kost);
                        }}
                        className="cursor-pointer group/title"
                        title="Klik untuk membuka detail kamar"
                      >
                        <h4 className="text-sm font-bold text-[#0C4A6E] line-clamp-1 group-hover/title:text-[#0EA5E9] transition-colors">
                          {kost.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-[#0EA5E9] shrink-0" />
                          <span>{kost.area}</span>
                        </p>
                      </div>

                      {/* Price - Clickable */}
                      <div
                        onClick={() => {
                          onClose();
                          onSelectDetail(kost);
                        }}
                        className="pt-1 cursor-pointer"
                        title="Klik untuk membuka detail kamar"
                      >
                        <span className="text-[10px] text-slate-400 font-medium block">Harga Bulanan</span>
                        <div className="text-sm sm:text-base font-mono font-bold text-[#0C4A6E] hover:text-[#0EA5E9] transition-colors">
                          {formatPrice(kost.monthlyPrice)}
                          <span className="text-[10px] font-normal text-slate-500"> /bln</span>
                        </div>
                      </div>

                      {/* Quick Action Buttons */}
                      <div className="pt-2 flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenBooking(kost);
                          }}
                          className="w-full py-1.5 px-3 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Booking Sekarang</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectDetail(kost);
                          }}
                          className="w-full py-1 px-3 text-xs font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Lihat Detail</span>
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: Detailed Specs */}
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
              {/* SECTION: BIAYA & SEWA */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedKosts.length + 1}
                  className="py-2.5 px-3 font-bold text-[#0C4A6E] text-xs uppercase tracking-wider"
                >
                  1. Biaya Sewa & Listrik
                </td>
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.monthlyPrice) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Harga Sewa / Bulan</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3 font-mono font-bold text-[#0C4A6E]">
                    {formatPrice(k.monthlyPrice)}
                  </td>
                ))}
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.electricityPolicy) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Kebijakan Listrik</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3 text-slate-700">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                      k.electricityPolicy.includes('mandiri')
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      <Zap className="w-3 h-3" />
                      {k.electricityPolicy}
                    </span>
                  </td>
                ))}
              </tr>

              {/* SECTION: DIMENSI & LOKASI */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedKosts.length + 1}
                  className="py-2.5 px-3 font-bold text-[#0C4A6E] text-xs uppercase tracking-wider"
                >
                  2. Lokasi & Dimensi Kamar
                </td>
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.roomSize) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Luas / Ukuran Kamar</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3 text-slate-800 font-medium">
                    {k.roomSize}
                  </td>
                ))}
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.distanceToTelkom) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Jarak ke Telkom University</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3 text-slate-800">
                    {k.distanceToTelkom}
                  </td>
                ))}
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.roomAvailable) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Ketersediaan Kamar</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3">
                    {k.roomAvailable <= 2 ? (
                      <span className="text-rose-600 font-bold">
                        Sisa {k.roomAvailable} Kamar!
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium">
                        {k.roomAvailable} dari {k.totalRooms} Kamar
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* SECTION: FASILITAS UTAMA KAMAR */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedKosts.length + 1}
                  className="py-2.5 px-3 font-bold text-[#0C4A6E] text-xs uppercase tracking-wider"
                >
                  3. Fasilitas Kamar & Mandi
                </td>
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.hasPrivateBathroom) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Kamar Mandi</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3">
                    {k.hasPrivateBathroom ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Kamar Mandi Dalam
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        Kamar Mandi Luar
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* WATER HEATER SPEC */}
              <tr className={highlightDiffs && isDifferent((k) => k.hasWaterHeater) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">
                  Water Heater (Air Hangat)
                </td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3">
                    {k.hasWaterHeater ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Ada (Water Heater Tersedia)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                        <Minus className="w-3.5 h-3.5 text-slate-400" />
                        Tidak Ada
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* PENDINGIN RUANGAN */}
              <tr className={highlightDiffs && isDifferent((k) => k.hasAC) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Pendingin Ruangan</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3">
                    {k.hasAC ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 text-xs font-semibold">
                        <Wind className="w-3.5 h-3.5 text-sky-600" />
                        AC (Air Conditioner)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                        <Wind className="w-3.5 h-3.5 text-slate-400" />
                        Kipas Angin / Ventilasi Alami
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* WI-FI */}
              <tr className={highlightDiffs && isDifferent((k) => k.hasWiFi) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Koneksi Wi-Fi</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3">
                    {k.hasWiFi ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Tersedia (Free)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-xs">
                        <Minus className="w-3.5 h-3.5 text-slate-400" />
                        Tidak Ada
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* PARKIR */}
              <tr className={highlightDiffs && isDifferent((k) => k.hasParking) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">Fasilitas Parkir</td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                      <Car className="w-3.5 h-3.5 text-slate-600" />
                      {k.hasParking ? 'Parkir Motor & Mobil' : 'Parkir Motor Saja'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* SECTION: DAPUR BERSAMA & KEBIJAKAN GAS */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedKosts.length + 1}
                  className="py-2.5 px-3 font-bold text-[#0C4A6E] text-xs uppercase tracking-wider"
                >
                  4. Dapur Bersama & Kebijakan Gas Kompor
                </td>
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.kitchenFacility) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Fasilitas Dapur Bersama</span>
                  </div>
                </td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3 text-slate-700 leading-relaxed text-xs">
                    {k.kitchenFacility}
                  </td>
                ))}
              </tr>
              <tr className={highlightDiffs && isDifferent((k) => k.gasPolicy) ? 'bg-amber-50/80 font-medium' : ''}>
                <td className="p-3 text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Kebijakan Gas Kompor</span>
                  </div>
                </td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3">
                    <span className={`inline-flex items-start gap-1.5 p-2 rounded-xl text-xs font-medium leading-snug border ${
                      k.gasPolicy.includes('termasuk')
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        : k.gasPolicy.includes('beli sendiri')
                        ? 'bg-amber-50 text-amber-900 border-amber-200'
                        : 'bg-slate-50 text-slate-800 border-slate-200'
                    }`}>
                      <Flame className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                      <span>{k.gasPolicy}</span>
                    </span>
                  </td>
                ))}
              </tr>

              {/* SECTION: TRANSPARANSI KEKURANGAN */}
              <tr className="bg-amber-100/60">
                <td
                  colSpan={selectedKosts.length + 1}
                  className="py-2.5 px-3 font-bold text-amber-950 text-xs uppercase tracking-wider"
                >
                  5. Transparansi Kekurangan & Catatan Penting
                </td>
              </tr>
              <tr>
                <td className="p-3 text-slate-600 font-medium align-top">
                  <div className="flex items-center gap-1 text-amber-800 font-semibold">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Kekurangan Kamar</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Evaluasi objektif untuk pertimbangan penyewa
                  </span>
                </td>
                {selectedKosts.map((k) => (
                  <td key={k.id} className="p-3 align-top">
                    {k.drawbacks && k.drawbacks.length > 0 ? (
                      <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-3 space-y-1.5">
                        <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                          {k.drawbacks.map((item, idx) => (
                            <li key={idx} className="leading-snug">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Tidak ada catatan kekurangan khusus</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            💡 <strong>Tips:</strong> Klik tombol <em>Booking Sekarang</em> untuk langsung mengajukan survey atau mengunci kamar via WhatsApp pengelola resmi.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer"
          >
            Tutup Perbandingan
          </button>
        </div>
      </div>
    </div>
  );
};
