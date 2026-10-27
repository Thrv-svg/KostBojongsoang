import React, { useState } from 'react';
import { KostProperty } from '../data/kostData';
import { X, Check, MapPin, Shield, Wifi, Wind, Bath, Maximize2, MessageCircle, AlertCircle, Calendar, Sparkles, AlertTriangle, Utensils, Flame } from 'lucide-react';

interface KostDetailModalProps {
  kost: KostProperty | null;
  onClose: () => void;
  onProceedBooking: (kost: KostProperty) => void;
}

export const KostDetailModal: React.FC<KostDetailModalProps> = ({
  kost,
  onClose,
  onProceedBooking,
}) => {
  if (!kost) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(kost.monthlyPrice);

  const directWALink = `https://wa.me/${kost.whatsappNumber}?text=${encodeURIComponent(
    `Halo Pengelola ${kost.name}, saya menemukan listing kost ini di KostBojongsoang. Apakah kamar tipe ${kost.roomSize} masih tersedia untuk disurvei?`
  )}`;

  return (
    <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold text-[#0C4A6E] bg-[#F5E6D3] rounded">
              {kost.category === 'putri' ? 'Kost Putri' : kost.category === 'putra' ? 'Kost Putra' : 'Kost Campur'}
            </span>
            <span className="text-xs text-slate-500 font-medium">ID: {kost.id}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup modal rincian"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="h-60 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-900 relative">
              <img
                src={kost.galleryImages[activeImageIndex] || kost.mainImage}
                alt={`${kost.name} foto ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 text-xs text-white bg-black/60 backdrop-blur-sm rounded-md">
                Foto {activeImageIndex + 1} dari {kost.galleryImages.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {kost.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#0EA5E9] ring-2 ring-[#0EA5E9]/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Heading & Basic Info */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h3 className="text-2xl font-bold text-[#0C4A6E] tracking-tight">{kost.name}</h3>
              <div className="font-mono text-xl font-bold text-[#0C4A6E]">
                {formattedPrice}
                <span className="text-xs font-normal text-slate-500"> /bulan</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
              <span>{kost.address}</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{kost.distanceToTelkom}</span>
              <span aria-hidden="true">·</span>
              <span>Kamar Tersedia: {kost.roomAvailable} dari {kost.totalRooms} Unit</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
            {kost.description}
          </div>

          {/* Specs & Utility Inclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-[#0C4A6E] uppercase tracking-wider">
                Spesifikasi Kamar
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex justify-between">
                  <span>Ukuran Ruangan:</span>
                  <span className="font-medium text-slate-900">{kost.roomSize}</span>
                </li>
                <li className="flex justify-between">
                  <span>Kamar Mandi:</span>
                  <span className="font-medium text-slate-900">
                    {kost.hasPrivateBathroom ? 'Kamar Mandi Dalam' : 'Kamar Mandi Bersama Bersih'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Pendingin Ruangan:</span>
                  <span className="font-medium text-slate-900">{kost.hasAC ? 'AC Daikin/Sharp' : 'Jendela Ventilasi Lebar'}</span>
                </li>
                <li className="flex justify-between">
                  <span>Water Heater:</span>
                  <span className={`font-semibold ${kost.hasWaterHeater ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {kost.hasWaterHeater ? 'Ada' : 'Tidak Ada'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-[#0C4A6E] uppercase tracking-wider">
                Fasilitas & Biaya Termasuk
              </h4>
              <ul className="text-xs text-slate-600 space-y-1.5">
                {kost.includedUtilities.map((util, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{util}</span>
                  </li>
                ))}
                <li className="flex items-center gap-1.5 text-amber-800 font-medium pt-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{kost.electricityPolicy}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Shared Kitchen & Gas Policy Section */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <h4 className="text-xs font-bold text-[#0C4A6E] uppercase tracking-wider flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span>Fasilitas Dapur Bersama & Ketentuan Gas Kompor</span>
              </h4>
              <span className={`self-start sm:self-auto px-2 py-0.5 rounded text-[11px] font-semibold ${
                kost.gasPolicy.includes('termasuk')
                  ? 'bg-emerald-100 text-emerald-800'
                  : kost.gasPolicy.includes('beli sendiri')
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {kost.gasPolicy.includes('termasuk')
                  ? 'Gas Sudah Termasuk'
                  : kost.gasPolicy.includes('beli sendiri')
                  ? 'Gas Beli Sendiri / Patungan'
                  : 'Pantry Listrik'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Utensils className="w-3 h-3 text-[#0EA5E9]" />
                  <span>Kelengkapan Fasilitas Dapur:</span>
                </div>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  {kost.kitchenFacility}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>Kebijakan Kompor & Tabung Gas:</span>
                </div>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">
                  {kost.gasPolicy}
                </p>
              </div>
            </div>
          </div>

          {/* Amenities Complete List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#0C4A6E] uppercase tracking-wider">
              Kelengkapan & Fasilitas Bersama
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {kost.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <Check className="w-3 h-3 text-[#0EA5E9] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Drawbacks / Catatan Kekurangan & Hal yang Perlu Diperhatikan (Transparansi) */}
          {kost.drawbacks && kost.drawbacks.length > 0 && (
            <div className="space-y-2 bg-rose-50/70 p-4 rounded-xl border border-rose-200/80">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Kekurangan & Catatan Khusus (Transparansi)</span>
              </h4>
              <p className="text-[11px] text-rose-800">
                Informasi jujur agar calon penghuni dan orang tua tidak salah ekspektasi saat survei:
              </p>
              <ul className="text-xs text-rose-900 space-y-1 list-disc pl-4 font-medium">
                {kost.drawbacks.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* House Rules */}
          <div className="space-y-2 bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Tata Tertib & Keamanan Kost</span>
            </h4>
            <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
              {kost.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 hidden sm:block">
            Tanpa biaya perantara · Langsung janjian dengan pengelola
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={directWALink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl transition-colors text-center"
            >
              Chat WA Langsung
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedBooking(kost);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap active:translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Formulir Rencana Masuk</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
