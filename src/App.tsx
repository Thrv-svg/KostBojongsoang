import React, { useState, useMemo, useEffect, useRef } from 'react';
import { KOST_LISTINGS, KostProperty } from './data/kostData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KostCard } from './components/KostCard';
import { KostCardSkeleton } from './components/KostCardSkeleton';
import { CampusMap } from './components/CampusMap';
import { FaqSection } from './components/FaqSection';
import { Testimonials } from './components/Testimonials';
import { KostDetailModal } from './components/KostDetailModal';
import { BookingModal } from './components/BookingModal';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { Footer } from './components/Footer';
import { CompareFloatingBar } from './components/CompareFloatingBar';
import { CompareModal } from './components/CompareModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FavoritesSection } from './components/FavoritesSection';
import { useFavorites } from './hooks/useFavorites';
import { Sparkles, RefreshCw, Filter, CheckCircle2, ArrowRightLeft, AlertCircle, ArrowUpDown, ChevronDown, Heart, Loader2 } from 'lucide-react';

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc' | 'distance-asc';

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
  const [sortBy, setSortBy] = useState<SortOption>('recommended');

  // Favorites / Wishlist state (persisted via localStorage)
  const {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount,
  } = useFavorites();
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState<boolean>(false);
  const [wishlistToast, setWishlistToast] = useState<string | null>(null);

  // Modals & Compare state
  const [selectedKostForDetail, setSelectedKostForDetail] = useState<KostProperty | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [kostForBooking, setKostForBooking] = useState<KostProperty | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareToast, setCompareToast] = useState<string | null>(null);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  // Loading state for initial load & dynamic filter updates (Skeleton feedback)
  const [isLoadingListings, setIsLoadingListings] = useState<boolean>(true);
  const isFirstRender = useRef(true);

  // Initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingListings(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Trigger skeleton loading whenever filters or sorting change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsLoadingListings(true);
    const timer = setTimeout(() => {
      setIsLoadingListings(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [selectedCategory, maxPrice, facilityFilters, searchQuery, sortBy]);

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

  // Reset all filters and sort
  const handleResetFilters = () => {
    setIsLoadingListings(true);
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
    setSortBy('recommended');
    setTimeout(() => {
      setIsLoadingListings(false);
    }, 250);
  };

  // Open booking modal for a specific kost or general
  const handleOpenBooking = (kost?: KostProperty) => {
    setKostForBooking(kost || null);
    setIsBookingModalOpen(true);
  };

  // Favorite state helpers
  const favoriteKosts = useMemo(() => {
    return KOST_LISTINGS.filter((k) => favoriteIds.includes(k.id));
  }, [favoriteIds]);

  const handleToggleFavoriteWithToast = (id: string) => {
    const isNowFav = toggleFavorite(id);
    const kost = KOST_LISTINGS.find((k) => k.id === id);
    const name = kost ? kost.name : 'Kamar';
    setWishlistToast(
      isNowFav
        ? `❤️ ${name} disimpan ke Favorit!`
        : `${name} dihapus dari Favorit.`
    );
    setTimeout(() => setWishlistToast(null), 3000);
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

  // Filter & sort listings
  const filteredKosts = useMemo(() => {
    const list = KOST_LISTINGS.filter((kost) => {
      // Category filter (support 'favorit' filter)
      if (selectedCategory === 'favorit') {
        if (!favoriteIds.includes(kost.id)) return false;
      } else if (selectedCategory !== 'all' && kost.category !== selectedCategory) {
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

    // Apply sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.monthlyPrice - b.monthlyPrice;
      }
      if (sortBy === 'price-desc') {
        return b.monthlyPrice - a.monthlyPrice;
      }
      if (sortBy === 'rating-desc') {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviewCount - a.reviewCount;
      }
      if (sortBy === 'distance-asc') {
        return a.distanceMeters - b.distanceMeters;
      }
      return 0; // 'recommended' preserves curated list order
    });
  }, [selectedCategory, maxPrice, facilityFilters, searchQuery, sortBy, favoriteIds]);

  const scrollToCatalog = () => {
    const el = document.getElementById('katalog-kost');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFavorites = () => {
    const el = document.getElementById('kamar-favorit');
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

      {/* Toast Notification Banner (e.g. Max compare limit or Wishlist action) */}
      {(compareToast || wishlistToast) && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[130] bg-[#0C4A6E] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2 border border-sky-400/50 animate-in fade-in slide-in-from-top-2">
          {wishlistToast ? (
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{wishlistToast || compareToast}</span>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenWishlist={() => setIsWishlistDrawerOpen(true)}
        favoritesCount={favoritesCount}
      />

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
            {/* Catalog Header with Category Switcher and Sorting Dropdown */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
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
                    {isLoadingListings && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0EA5E9] text-xs font-semibold border border-sky-200 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin text-[#0EA5E9]" />
                        <span>Memuat hasil...</span>
                      </span>
                    )}
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

                {/* Controls: Segmented Category Switcher & Sorting Dropdown */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-x-auto shrink-0">
                    {[
                      { id: 'all', label: 'Semua' },
                      { id: 'putra', label: 'Kost Putra' },
                      { id: 'putri', label: 'Kost Putri' },
                      { id: 'campur', label: 'Kost Campur' },
                      ...(favoritesCount > 0
                        ? [{ id: 'favorit', label: `❤️ Favorit (${favoritesCount})` }]
                        : []),
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

                  {/* Dropdown Sorting */}
                  <div className="relative flex items-center shrink-0">
                    <label htmlFor="catalog-sort" className="sr-only">Urutkan Kost</label>
                    <div className="relative w-full sm:w-auto">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#0EA5E9]">
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </div>
                      <select
                        id="catalog-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="w-full sm:w-auto pl-8 pr-9 py-2 text-xs font-semibold text-[#0C4A6E] bg-white border border-slate-200 rounded-xl shadow-2xs hover:border-[#0EA5E9] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] appearance-none cursor-pointer transition-colors"
                        aria-label="Urutkan pilihan kost"
                      >
                        <option value="recommended">🌟 Rekomendasi</option>
                        <option value="price-asc">📉 Harga: Termurah ke Termahal</option>
                        <option value="price-desc">📈 Harga: Termahal ke Termurah</option>
                        <option value="rating-desc">⭐ Rating Tertinggi</option>
                        <option value="distance-asc">📍 Jarak Terdekat ke Kampus</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filter & Sort Chips summary */}
              {(sortBy !== 'recommended' || selectedCategory !== 'all' || maxPrice < 3000000 || Object.values(facilityFilters).some(Boolean) || searchQuery) && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200/60 text-xs">
                  <span className="text-slate-500 font-medium">Filter Aktif:</span>
                  {sortBy !== 'recommended' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0C4A6E] font-medium border border-sky-200">
                      <span>
                        Urut:{' '}
                        {sortBy === 'price-asc'
                          ? 'Harga Termurah'
                          : sortBy === 'price-desc'
                          ? 'Harga Termahal'
                          : sortBy === 'rating-desc'
                          ? 'Rating Tertinggi'
                          : 'Jarak Terdekat'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSortBy('recommended')}
                        className="text-slate-400 hover:text-slate-700 font-bold ml-0.5 cursor-pointer"
                        title="Kembalikan ke rekomendasi"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                      <span>
                        Kategori:{' '}
                        {selectedCategory === 'putra'
                          ? 'Kost Putra'
                          : selectedCategory === 'putri'
                          ? 'Kost Putri'
                          : selectedCategory === 'campur'
                          ? 'Kost Campur'
                          : 'Kamar Favorit'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('all')}
                        className="text-slate-400 hover:text-slate-700 font-bold ml-0.5 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {maxPrice < 3000000 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200">
                      <span>Maks: Rp {(maxPrice / 1000000).toFixed(1)} jt</span>
                      <button
                        type="button"
                        onClick={() => setMaxPrice(3000000)}
                        className="text-slate-400 hover:text-slate-700 font-bold ml-0.5 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-[#0EA5E9] hover:underline font-semibold ml-auto cursor-pointer"
                  >
                    Reset Semua
                  </button>
                </div>
              )}
            </div>

            {/* Listings Grid with Skeleton Loading or Empty State */}
            {isLoadingListings ? (
              <KostCardSkeleton count={6} />
            ) : filteredKosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300">
                {filteredKosts.map((kost) => (
                  <KostCard
                    key={kost.id}
                    kost={kost}
                    onSelectDetail={(k) => setSelectedKostForDetail(k)}
                    onOpenBooking={(k) => handleOpenBooking(k)}
                    isCompared={compareList.includes(kost.id)}
                    onToggleCompare={handleToggleCompare}
                    isFavorite={isFavorite(kost.id)}
                    onToggleFavorite={handleToggleFavoriteWithToast}
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

        {/* Dedicated Kamar Favorit Section (Wishlist) */}
        <FavoritesSection
          favoriteKosts={favoriteKosts}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavoriteWithToast}
          onClearAllFavorites={clearFavorites}
          onSelectDetail={(k) => setSelectedKostForDetail(k)}
          onOpenBooking={(k) => handleOpenBooking(k)}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          onExploreCatalog={scrollToCatalog}
        />

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
        onSelectDetail={(k) => setSelectedKostForDetail(k)}
      />

      {/* Wishlist Slide-over Drawer */}
      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        favoriteKosts={favoriteKosts}
        onRemoveFavorite={removeFavorite}
        onClearAll={clearFavorites}
        onSelectDetail={(k) => setSelectedKostForDetail(k)}
        onOpenBooking={(k) => handleOpenBooking(k)}
        onToggleCompare={handleToggleCompare}
        compareList={compareList}
        onScrollToFavoritesSection={scrollToFavorites}
      />

      {/* Modals */}
      <KostDetailModal
        kost={selectedKostForDetail}
        onClose={() => setSelectedKostForDetail(null)}
        onProceedBooking={(k) => handleOpenBooking(k)}
        isFavorite={selectedKostForDetail ? isFavorite(selectedKostForDetail.id) : false}
        onToggleFavorite={handleToggleFavoriteWithToast}
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
