import React from 'react';
import { Search, MapPin, ShieldCheck, Check, Sparkles, Flame, Utensils } from 'lucide-react';
import heroKostBojongsoang from '../assets/images/hero_kost_bojongsoang_1792854715076.jpg';

interface HeroProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  maxPrice: number;
  onSelectMaxPrice: (price: number) => void;
  facilityFilters: {
    ac: boolean;
    privateBathroom: boolean;
    wifi: boolean;
    parking: boolean;
    waterHeater?: boolean;
  };
  onToggleFacility: (key: 'ac' | 'privateBathroom' | 'wifi' | 'parking' | 'waterHeater') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onSelectMaxPrice,
  facilityFilters,
  onToggleFacility,
  searchQuery,
  onSearchChange,
  onExploreClick,
}) => {
  return (
    <section className="relative pt-8 pb-12 md:pt-14 md:pb-16 bg-[#F8FAFC] border-b border-slate-200 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Split Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Bojongsoang</span>
              <span aria-hidden="true">·</span>
              <span>Kabupaten Bandung</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#0EA5E9] font-bold">Kawasan Telkom University</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0C4A6E] leading-[1.15]" style={{ textWrap: 'balance' }}>
              Informasi Kost Transparan Sekitar Kampus Telkom University
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Cari kost di Bojongsoang tanpa rasa khawatir. Informasi fasilitas jujur—termasuk status <span className="font-semibold text-slate-800">Water Heater</span>, detail <span className="font-semibold text-slate-800">dapur bersama & ketentuan gas kompor</span>, serta jarak riil jalan kaki ke Gerbang Sukabirus, PGA, dan Sukapura.
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Fasilitas & Kekurangan Riil Terbuka</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-sky-100 text-[#0C4A6E] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Langsung WhatsApp Pengelola</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>Pilih Kost Sesuai Kebutuhan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md bg-white">
              <img
                src={heroKostBojongsoang}
                alt="Gedung Kost Bojongsoang Dekat Kampus Telkom University"
                className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C4A6E]/85 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs font-semibold text-[#F5E6D3] uppercase tracking-wider">
                  Hunian Mahasiswa Bojongsoang
                </span>
                <p className="text-sm font-semibold text-white mt-0.5">
                  Akses 250m ke Gerbang Sukabirus · Parkir Motor Kanopi & CCTV 24 Jam
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="mt-10 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari lokasi (Sukabirus, PGA, Ciganitri, Sukapura), dapur, atau fasilitas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm text-[#0C4A6E] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Segmented Control for Gender / Category */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl shrink-0 overflow-x-auto">
              {[
                { id: 'all', label: 'Semua Tipe' },
                { id: 'putra', label: 'Kost Putra' },
                { id: 'putri', label: 'Kost Putri' },
                { id: 'campur', label: 'Kost Campur' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-[#0C4A6E] shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-[#0C4A6E]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filter Row: Price and Facility Toggles */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            {/* Price Segment */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#0C4A6E] whitespace-nowrap">Batas Harga:</span>
              {[
                { price: 3000000, label: 'Semua Harga' },
                { price: 1000000, label: '< Rp 1 Juta' },
                { price: 1500000, label: '< Rp 1.5 Juta' },
                { price: 2000000, label: '< Rp 2 Juta' },
              ].map((p) => (
                <button
                  key={p.price}
                  type="button"
                  onClick={() => onSelectMaxPrice(p.price)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                    maxPrice === p.price
                      ? 'bg-[#0EA5E9]/10 border-[#0EA5E9] text-[#0C4A6E] font-semibold'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Amenities Toggle Checks */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-semibold text-[#0C4A6E] whitespace-nowrap">Fasilitas:</span>
              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={facilityFilters.ac}
                  onChange={() => onToggleFacility('ac')}
                  className="rounded text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
                <span>AC</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={facilityFilters.privateBathroom}
                  onChange={() => onToggleFacility('privateBathroom')}
                  className="rounded text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
                <span>KM Dalam</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!facilityFilters.waterHeater}
                  onChange={() => onToggleFacility('waterHeater')}
                  className="rounded text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
                <span>Water Heater</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={facilityFilters.wifi}
                  onChange={() => onToggleFacility('wifi')}
                  className="rounded text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
                <span>Wi-Fi Cepat</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={facilityFilters.parking}
                  onChange={() => onToggleFacility('parking')}
                  className="rounded text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
                <span>Parkir Motor/Mobil</span>
              </label>

              <button
                type="button"
                onClick={onExploreClick}
                className="ml-auto lg:ml-2 px-4 py-1.5 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
