import React, { useState, useMemo, useEffect } from 'react';
import { KOST_LISTINGS, KostProperty } from './data/kostData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KostCard } from './components/KostCard';
import { CampusMap } from './components/CampusMap';
import { FaqSection } from './components/FaqSection';
import { Testimonials } from './components/Testimonials';
import { KostDetailModal } from './components/KostDetailModal';
import { BookingModal } from './components/BookingModal';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Footer } from './components/Footer';
import { CompareFloatingBar } from './components/CompareFloatingBar';
import { CompareModal } from './components/CompareModal';
import { Sparkles, RefreshCw, Filter, CheckCircle2, ArrowRightLeft, AlertCircle } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [facilityFilters, setFacilityFilters] = useState({
    ac: false,
    privateBathroom: false,
    wifi: false,
    parking: false,
    waterHeater: false,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Compare state
  const [selectedKostForDetail, setSelectedKostForDetail] = useState<KostProperty | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [kostForBooking, setKostForBooking] = useState<KostProperty | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareToast, setCompareToast] = useState<string | null>(null);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Toggle facility filters
  const handleToggleFacility = (key: 'ac' | 'privateBathroom' | 'wifi' | 'parking' | 'waterHeater') => {
    setFacilityFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setMaxPrice(3000000);
    setFacilityFilters({
      ac: false,
      privateBathroom: false,
      wifi: false,
      parking: false,
      waterHeater: false,
    });
    setSearchQuery('');
  };

  // Open booking modal for a specific kost or general
  const handleOpenBooking = (kost?: KostProperty) => {
    setKostForBooking(kost || null);
    setIsBookingModalOpen(true);
  };

  // Compare state helpers
  const selectedKostsForCompare = useMemo(() => {
    return KOST_LISTINGS.filter((k) => compareList.includes(k.id));
  }, [compareList]);

  const handleToggleCompare = (kost: KostProperty) => {
    setCompareList((prev) => {
      if (prev.includes(kost.id)) {
        return prev.filter((id) => id !== kost.id);
      }
      if (prev.length >= 3) {
        setCompareToast('Maksimal 3 kamar yang dapat dibandingkan secara bersamaan.');
        setTimeout(() => setCompareToast(null), 3500);
        return prev;
      }
      return [...prev, kost.id];
    });
  };

  const handleRemoveCompare = (id: string) => {
    setCompareList((prev) => prev.filter((kId) => kId !== id));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Filter listings
  const filteredKosts = useMemo(() => {
    return KOST_LISTINGS.filter((kost) => {
      // Category filter
      if (selectedCategory !== 'all' && kost.category !== selectedCategory) {
        return false;
      }

      // Max price filter
      if (kost.monthlyPrice > maxPrice) {
        return false;
      }

      // Amenities filter
      if (facilityFilters.ac && !kost.hasAC) return false;
      if (facilityFilters.privateBathroom && !kost.hasPrivateBathroom) return false;
      if (facilityFilters.wifi && !kost.hasWiFi) return false;
      if (facilityFilters.parking && !kost.hasParking) return false;
      if (facilityFilters.waterHeater && !kost.hasWaterHeater) return false;

      // Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = kost.name.toLowerCase().includes(q);
        const matchesArea = kost.area.toLowerCase().includes(q);
        const matchesTagline = kost.tagline.toLowerCase().includes(q);
        const matchesFeatures = kost.features.some((f) => f.toLowerCase().includes(q));
        const matchesDrawbacks = kost.drawbacks?.some((d) => d.toLowerCase().includes(q));
        const matchesKitchen = kost.kitchenFacility?.toLowerCase().includes(q);
        const matchesGas = kost.gasPolicy?.toLowerCase().includes(q);
        if (!matchesName && !matchesArea && !matchesTagline && !matchesFeatures && !matchesDrawbacks && !matchesKitchen && !matchesGas) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, maxPrice, facilityFilters, searchQuery]);

  const scrollToCatalog = () => {
    const el = document.getElementById('katalog-kost');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0C4A6E]">
      {/* Quota Exceeded Sticky Notice Banner */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-[120] shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Toast Notification Banner (e.g. Max compare limit) */}
      {compareToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[130] bg-[#0C4A6E] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2 border border-sky-400/50 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{compareToast}</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Quick Filter Bar */}
        <Hero
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          maxPrice={maxPrice}
          onSelectMaxPrice={setMaxPrice}
          facilityFilters={facilityFilters}
          onToggleFacility={handleToggleFacility}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExploreClick={scrollToCatalog}
        />

        {/* Boarding House Listings Grid */}
        <section id="katalog-kost" className="py-16 bg-[#F8FAFC]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
            {/* Catalog Header with Category Switcher */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Katalog Terverifikasi</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C4A6E] tracking-tight">
                  Pilihan Kamar Kost di Bojongsoang
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-sm text-slate-600">
                  <p>
                    Menampilkan <span className="font-semibold text-[#0C4A6E]">{filteredKosts.length}</span> dari {KOST_LISTINGS.length} kost terdaftar dekat Telkom University
                  </p>
                  {compareList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsCompareModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-100 hover:bg-sky-200 text-[#0C4A6E] text-xs font-bold transition-colors cursor-pointer border border-sky-300"
                    >
                      <ArrowRightLeft className="w-3 h-3 text-[#0EA5E9]" />
                      <span>Bandingkan ({compareList.length}/3)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Tab Segmented Control */}
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-x-auto shrink-0">
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'putra', label: 'Kost Putra' },
                  { id: 'putri', label: 'Kost Putri' },
                  { id: 'campur', label: 'Kost Campur' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-[#0C4A6E] text-white shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-[#0C4A6E]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Listings Grid or Empty State */}
            {filteredKosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredKosts.map((kost) => (
                  <KostCard
                    key={kost.id}
                    kost={kost}
                    onSelectDetail={(k) => setSelectedKostForDetail(k)}
                    onOpenBooking={(k) => handleOpenBooking(k)}
                    isCompared={compareList.includes(kost.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                ))}
              </div>
            ) : (
              <div className="p-10 bg-white rounded-2xl border border-slate-200 text-center space-y-4 max-w-md mx-auto my-8">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <Filter className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#0C4A6E]">
                    Tidak Ada Kamar yang Sesuai Filter
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Coba sesuaikan batas harga, kurangi filter fasilitas, atau gunakan kata kunci pencarian yang lebih umum.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0C4A6E] bg-[#F5E6D3] hover:bg-[#ebd3ba] rounded-xl transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Semua Filter</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Interactive Campus Map & Neighborhood Radius */}
        <CampusMap onSelectKost={(kost) => setSelectedKostForDetail(kost)} />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Testimonials */}
        <Testimonials />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Sticky Mobile CTA (Only shown when not comparing rooms, to prevent visual overlap) */}
      {compareList.length === 0 && (
        <StickyMobileCTA
          onOpenBooking={() => handleOpenBooking()}
          onScrollToCatalog={scrollToCatalog}
        />
      )}

      {/* Floating Compare Action Bar (bottom docked when 1-3 rooms selected) */}
      <CompareFloatingBar
        selectedKosts={selectedKostsForCompare}
        maxCompare={3}
        onRemoveKost={handleRemoveCompare}
        onClearAll={handleClearCompare}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* Modals */}
      <KostDetailModal
        kost={selectedKostForDetail}
        onClose={() => setSelectedKostForDetail(null)}
        onProceedBooking={(k) => handleOpenBooking(k)}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        preSelectedKost={kostForBooking}
      />

      {/* Room Comparison Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedKosts={selectedKostsForCompare}
        onRemoveKost={handleRemoveCompare}
        onOpenBooking={(k) => handleOpenBooking(k)}
        onSelectDetail={(k) => setSelectedKostForDetail(k)}
      />
    </div>
  );
}
