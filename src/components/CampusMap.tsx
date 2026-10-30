import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useMap,
  useApiLoadingStatus,
  APILoadingStatus
} from '@vis.gl/react-google-maps';
import { CAMPUS_POIS, KOST_LISTINGS, KostProperty, CampusPOI } from '../data/kostData';
import { 
  MapPin, 
  Compass, 
  School, 
  ShoppingBag, 
  AlertCircle, 
  ExternalLink,
  Building2,
  Navigation,
  RotateCcw,
  Sparkles,
  Layers,
  RefreshCw,
  Info,
  Utensils,
  Shirt,
  Clock,
  Coins,
  Store
} from 'lucide-react';
import { handleImageFallback } from '../utils/imageUtils';

interface CampusMapProps {
  onSelectKost: (kost: KostProperty) => void;
}

export type MapFilterType = 'all' | 'kost' | 'food' | 'market' | 'laundry' | 'gate' | 'facility';

// Controller component to execute smooth camera transitions using Google Maps instance
const MapController: React.FC<{
  targetLocation: { lat: number; lng: number } | null;
  targetZoom?: number;
}> = ({ targetLocation, targetZoom = 16 }) => {
  const map = useMap();

  useEffect(() => {
    if (map && targetLocation) {
      map.panTo(targetLocation);
      if (targetZoom) {
        map.setZoom(targetZoom);
      }
    }
  }, [map, targetLocation, targetZoom]);

  return null;
};

// Internal watcher to detect Google Maps SDK loading failure or auth failure
const MapStatusWatcher: React.FC<{
  onStatusFail: (reason: string) => void;
}> = ({ onStatusFail }) => {
  const loadingStatus = useApiLoadingStatus();

  useEffect(() => {
    if (loadingStatus === APILoadingStatus.FAILED) {
      onStatusFail('Gagal memuat skrip Google Maps API (Jaringan atau izin domain)');
    } else if (loadingStatus === APILoadingStatus.AUTH_FAILURE) {
      onStatusFail('Autentikasi Google Maps API ditolak atau kuota habis');
    }
  }, [loadingStatus, onStatusFail]);

  return null;
};

export const CampusMap: React.FC<CampusMapProps> = ({ onSelectKost }) => {
  const [activeFilter, setActiveFilter] = useState<MapFilterType>('all');
  const [selectedPOI, setSelectedPOI] = useState<CampusPOI | null>(null);
  const [selectedKostOnMap, setSelectedKostOnMap] = useState<KostProperty | null>(KOST_LISTINGS[0]);
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(true);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'hybrid' | 'terrain'>('roadmap');
  const [hoveredKostId, setHoveredKostId] = useState<string | null>(null);
  const [hoveredPoiId, setHoveredPoiId] = useState<string | null>(null);
  
  // Navigation camera target for smooth transitions
  const [cameraTarget, setCameraTarget] = useState<{ lat: number; lng: number; zoom: number } | null>(null);

  // Fallback states: Triggered by quota limit, API loading failure, or manual preview
  const [isFallbackActive, setIsFallbackActive] = useState<boolean>(false);
  const [fallbackReason, setFallbackReason] = useState<string>('');

  // Fallback demo API key to guarantee reliable loading in AI Studio preview & production
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBUjjgU7LZGRlx6WJ4IBQrhGdz9mU33uMo';

  // Center around Telkom University campus & Bojongsoang
  const defaultCenter = { lat: -6.9731, lng: 107.6315 };

  // Listen to global quota exceeded events from main.tsx
  useEffect(() => {
    const handleQuotaExceeded = () => {
      setIsFallbackActive(true);
      setFallbackReason('Batas kuota harian Google Maps tercapai. Mengaktifkan peta statis.');
    };

    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  // Filter visibility checks
  const showKosts = activeFilter === 'all' || activeFilter === 'kost';

  const isPoiVisible = useCallback((poi: CampusPOI) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'kost') return false;
    if (activeFilter === 'gate') return poi.category === 'gate' || poi.category === 'academic';
    return poi.category === activeFilter;
  }, [activeFilter]);

  const handleMarkerClick = useCallback((kost: KostProperty) => {
    setSelectedKostOnMap(kost);
    setSelectedPOI(null);
    setInfoWindowShown(true);
    setCameraTarget({ lat: kost.position.lat, lng: kost.position.lng, zoom: 16 });
  }, []);

  const handlePoiClick = useCallback((poi: CampusPOI) => {
    setSelectedPOI(poi);
    setSelectedKostOnMap(null);
    setInfoWindowShown(true);
    setCameraTarget({ lat: poi.position.lat, lng: poi.position.lng, zoom: 16 });
  }, []);

  const handleResetCamera = useCallback(() => {
    setCameraTarget({ lat: defaultCenter.lat, lng: defaultCenter.lng, zoom: 15 });
    setSelectedPOI(null);
    setSelectedKostOnMap(KOST_LISTINGS[0]);
  }, [defaultCenter.lat, defaultCenter.lng]);

  const handleFailTrigger = useCallback((reason: string) => {
    setIsFallbackActive(true);
    setFallbackReason(reason);
  }, []);

  // External Google Maps URL builder
  const googleMapsUrl = useMemo(() => {
    if (selectedKostOnMap) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${selectedKostOnMap.name} Bojongsoang Telkom University Bandung`
      )}`;
    }
    if (selectedPOI) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${selectedPOI.name} Telkom University Bojongsoang Bandung`
      )}`;
    }
    return 'https://www.google.com/maps/search/?api=1&query=Telkom+University+Bojongsoang+Bandung';
  }, [selectedKostOnMap, selectedPOI]);

  return (
    <section id="peta-lokasi" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Google Maps Platform • Wilayah Telkom University & Bojongsoang</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C4A6E] tracking-tight">
              Peta Lokasi Interaktif Kost Dekat Kampus
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Didukung Google Maps Platform resmi dengan tampilan satelit dan peta jalan beresolusi tinggi. Arahkan kursor pada pin untuk preview foto kamar mini, dan klik untuk melihat rincian fasilitas lengkap.
            </p>
          </div>

          {/* Map Controls: View Type, Fallback Toggle & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Fallback Mode Toggle (for resilience & preview) */}
            <button
              type="button"
              onClick={() => {
                setIsFallbackActive(!isFallbackActive);
                if (!isFallbackActive) {
                  setFallbackReason('Mode Peta Statis diaktifkan secara manual.');
                }
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                isFallbackActive
                  ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-[#0C4A6E]'
              }`}
              title="Alihkan antara Google Maps Interaktif dan Peta Citra Satelit Statis"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isFallbackActive ? 'Peta Statis (Aktif)' : 'Mode Peta Statis'}</span>
            </button>

            {/* Map Style Mode (Roadmap, Satellite Hybrid, Terrain) - Active in Google Maps Mode */}
            {!isFallbackActive && (
              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setMapTypeId('roadmap')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    mapTypeId === 'roadmap'
                      ? 'bg-white text-[#0C4A6E] shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-[#0C4A6E]'
                  }`}
                >
                  Peta Jalan
                </button>
                <button
                  type="button"
                  onClick={() => setMapTypeId('hybrid')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    mapTypeId === 'hybrid'
                      ? 'bg-[#0C4A6E] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-[#0C4A6E]'
                  }`}
                >
                  Satelit Nyata
                </button>
                <button
                  type="button"
                  onClick={() => setMapTypeId('terrain')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    mapTypeId === 'terrain'
                      ? 'bg-white text-[#0C4A6E] shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-[#0C4A6E]'
                  }`}
                >
                  Medan
                </button>
              </div>
            )}

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto border border-slate-200 shadow-2xs max-w-full">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'kost', label: 'Kost' },
                { id: 'food', label: 'Warung & Kuliner' },
                { id: 'market', label: 'Minimarket' },
                { id: 'laundry', label: 'Laundry' },
                { id: 'gate', label: 'Gerbang Kampus' },
                { id: 'facility', label: 'Klinik & Print' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as MapFilterType)}
                  className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#0EA5E9] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-[#0C4A6E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Landmark Jump Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none text-xs">
          <span className="font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1 shrink-0">
            <Navigation className="w-3.5 h-3.5 text-[#0EA5E9]" />
            Lompat ke Titik:
          </span>
          <button
            type="button"
            onClick={handleResetCamera}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer font-medium shrink-0"
          >
            <RotateCcw className="w-3 h-3 text-slate-500" />
            <span>Kawasan Kampus Telkom (Pusat)</span>
          </button>
          {CAMPUS_POIS.map((poi) => (
            <button
              key={poi.id}
              type="button"
              onClick={() => handlePoiClick(poi)}
              className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer font-medium border shrink-0 ${
                selectedPOI?.id === poi.id
                  ? 'bg-sky-50 text-[#0C4A6E] border-sky-300 font-semibold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {poi.category === 'gate' ? (
                <School className="w-3 h-3 text-sky-600" />
              ) : poi.category === 'food' ? (
                <Utensils className="w-3 h-3 text-amber-600" />
              ) : poi.category === 'market' ? (
                <ShoppingBag className="w-3 h-3 text-emerald-600" />
              ) : poi.category === 'laundry' ? (
                <Shirt className="w-3 h-3 text-purple-600" />
              ) : (
                <Building2 className="w-3 h-3 text-indigo-600" />
              )}
              <span>{poi.name}</span>
            </button>
          ))}
        </div>

        {/* Map Grid Layout: Main Map Area (8 Columns) & Details Sidebar (4 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Map Container */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative h-[540px] sm:h-[620px]">
            {isFallbackActive ? (
              /* ============================================================== */
              /* FALLBACK UI: STATIC MAP IMAGE + 'VIEW ON GOOGLE MAPS' CTA     */
              /* ============================================================== */
              <div className="relative w-full h-full bg-slate-950 overflow-hidden select-none flex flex-col">
                {/* High-Resolution Static Map Aerial Background */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/images/campus_map_static.jpg"
                    alt="Peta Satelit Kawasan Telkom University & Bojongsoang"
                    onError={handleImageFallback}
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                  />

                  {/* Visual Coordinate Overlay Grid */}
                  <div 
                    className="absolute inset-0 opacity-15 pointer-events-none" 
                    style={{ 
                      backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
                      backgroundSize: '32px 32px' 
                    }} 
                  />

                  {/* Campus Area Badge Overlay */}
                  <div className="absolute top-16 left-4 z-10 pointer-events-none bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-white shadow-xl flex items-center gap-2 text-xs">
                    <School className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold leading-tight">Kawasan Kampus Telkom University</div>
                      <div className="text-[10px] text-slate-300">Jl. Telekomunikasi Terusan Buahbatu, Bojongsoang</div>
                    </div>
                  </div>

                  {/* INTERACTIVE PINS OVERLAID ON STATIC MAP IMAGE */}
                  {/* Kost Markers */}
                  {showKosts &&
                    KOST_LISTINGS.map((kost) => {
                      const isSelected = selectedKostOnMap?.id === kost.id;
                      const isHovered = hoveredKostId === kost.id;
                      const pinBg =
                        kost.category === 'putri'
                          ? 'bg-rose-600'
                          : kost.category === 'putra'
                          ? 'bg-sky-600'
                          : 'bg-teal-600';

                      return (
                        <div
                          key={kost.id}
                          style={{ left: `${kost.mapCoords.x}%`, top: `${kost.mapCoords.y}%` }}
                          onClick={() => handleMarkerClick(kost)}
                          onMouseEnter={() => setHoveredKostId(kost.id)}
                          onMouseLeave={() => setHoveredKostId(null)}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 ${
                            isHovered ? 'z-50 scale-110' : isSelected ? 'z-40 scale-110' : 'z-30 hover:scale-105'
                          }`}
                        >
                          {/* Mini Thumbnail Hover Card */}
                          {isHovered && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkerClick(kost);
                                onSelectKost(kost);
                              }}
                              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border-2 border-[#0EA5E9] z-[99] pointer-events-auto cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-150"
                              title="Klik untuk membuka detail lengkap kamar kost ini"
                            >
                              <div className="flex gap-2.5 items-center">
                                <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                                  <img
                                    src={kost.mainImage}
                                    alt={kost.name}
                                    onError={handleImageFallback}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                  />
                                  <span
                                    className={`absolute bottom-0 inset-x-0 text-center text-[8px] font-bold text-white py-0.5 uppercase tracking-wider ${
                                      kost.category === 'putri'
                                        ? 'bg-rose-600/90'
                                        : kost.category === 'putra'
                                        ? 'bg-sky-600/90'
                                        : 'bg-teal-600/90'
                                    }`}
                                  >
                                    {kost.category}
                                  </span>
                                </div>

                                <div className="min-w-0 flex-1 text-left">
                                  <h4 className="text-xs font-bold text-[#0C4A6E] truncate leading-tight hover:text-[#0EA5E9] transition-colors">
                                    {kost.name}
                                  </h4>
                                  <p className="text-[11px] font-bold text-[#0EA5E9] mt-0.5">
                                    Rp {kost.monthlyPrice.toLocaleString('id-ID')}
                                    <span className="text-[9px] font-normal text-slate-500">/bln</span>
                                  </p>
                                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                                    <span className="truncate">{kost.distanceToTelkom}</span>
                                    <span>•</span>
                                    <span className={`font-semibold ${kost.hasWaterHeater ? 'text-emerald-700' : 'text-slate-500'}`}>
                                      {kost.hasWaterHeater ? 'WH' : 'Air Dingin'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                                <span className="text-slate-500 truncate max-w-[120px] font-medium">{kost.area}</span>
                                <span className="text-[#0EA5E9] font-bold flex items-center gap-0.5 hover:underline">
                                  Lihat Detail &rarr;
                                </span>
                              </div>

                              {/* Pointer Triangle */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#0EA5E9] pointer-events-none" />
                            </div>
                          )}

                          {/* Pin Icon & Price Badge */}
                          <div
                            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-white shadow-xl border-2 transition-all ${
                              isSelected
                                ? 'bg-[#F97316] border-white ring-4 ring-[#F97316]/40 scale-105'
                                : `${pinBg} border-white`
                            }`}
                          >
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="text-[10px] font-bold whitespace-nowrap">
                              Rp {(kost.monthlyPrice / 1000000).toFixed(1)}jt
                            </span>
                          </div>
                        </div>
                      );
                    })}

                  {/* Campus POI & Facility Pins */}
                  {CAMPUS_POIS.map((poi) => {
                    if (!isPoiVisible(poi)) return null;

                    const isSelected = selectedPOI?.id === poi.id;
                    const isHovered = hoveredPoiId === poi.id;

                    let bgClass = 'bg-indigo-600';
                    let IconComp = Building2;

                    if (poi.category === 'gate') {
                      bgClass = 'bg-[#0EA5E9]';
                      IconComp = School;
                    } else if (poi.category === 'food') {
                      bgClass = 'bg-amber-500';
                      IconComp = Utensils;
                    } else if (poi.category === 'market') {
                      bgClass = 'bg-emerald-600';
                      IconComp = ShoppingBag;
                    } else if (poi.category === 'laundry') {
                      bgClass = 'bg-purple-600';
                      IconComp = Shirt;
                    } else if (poi.category === 'facility') {
                      bgClass = 'bg-teal-600';
                      IconComp = Building2;
                    }

                    return (
                      <div
                        key={poi.id}
                        style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                        onClick={() => handlePoiClick(poi)}
                        onMouseEnter={() => setHoveredPoiId(poi.id)}
                        onMouseLeave={() => setHoveredPoiId(null)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                      >
                        {isHovered && (
                          <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl shadow-xl pointer-events-none z-50 border border-white/20">
                            <div className="flex items-center gap-1 font-bold">
                              <IconComp className="w-3.5 h-3.5 text-amber-300" />
                              <span>{poi.name}</span>
                            </div>
                            <div className="text-[10px] text-slate-300 font-normal mt-0.5">
                              {poi.distance} • {poi.openingHours || 'Fasilitas Umum'}
                            </div>
                            {poi.priceEstimate && (
                              <div className="text-[9px] text-amber-300 font-medium">
                                {poi.priceEstimate}
                              </div>
                            )}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900/95" />
                          </div>
                        )}

                        <div
                          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-lg border transition-all ${
                            isSelected
                              ? 'bg-[#F97316] text-white border-white ring-2 ring-white scale-110 shadow-orange-500/50'
                              : `${bgClass} text-white border-white/80 hover:scale-105`
                          }`}
                        >
                          <IconComp className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[110px]">{poi.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Top Notification Bar: Fallback Info & Direct Action */}
                <div className="absolute top-3 inset-x-3 z-30 flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-amber-400/30 text-white shadow-xl">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold text-amber-300">Mode Peta Statis Aktif</span>
                      <span className="text-slate-300 ml-1.5 hidden sm:inline">
                        {fallbackReason || 'Menampilkan citra satelit terverifikasi & penanda interaktif.'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                    {/* Primary 'View on Google Maps' Button */}
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer hover:shadow-sky-500/25"
                      title="Buka koordinat lokasi ini secara langsung di Google Maps resmi"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    {/* Retry Google Maps Interactive Button */}
                    <button
                      type="button"
                      onClick={() => setIsFallbackActive(false)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700 cursor-pointer"
                      title="Coba muat ulang Google Maps API interaktif"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span className="hidden sm:inline">Coba Lagi</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Helper Bar on Static Map */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                  <div className="bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-[11px] pointer-events-auto flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Klik penanda di peta atau tombol "View on Google Maps" untuk rute navigasi.</span>
                  </div>
                </div>
              </div>
            ) : (
              /* ============================================================== */
              /* GOOGLE MAPS PLATFORM INTERACTIVE VIEW                          */
              /* ============================================================== */
              <APIProvider 
                apiKey={apiKey}
                onError={() => handleFailTrigger('Google Maps API gagal diinisialisasi')}
              >
                <MapStatusWatcher onStatusFail={handleFailTrigger} />

                <Map
                  mapId="DEMO_MAP_ID"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  defaultCenter={defaultCenter}
                  defaultZoom={15}
                  mapTypeId={mapTypeId}
                  gestureHandling="cooperative"
                  disableDefaultUI={false}
                  className="w-full h-full"
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* Controller for smooth pans & zooms */}
                  <MapController 
                    targetLocation={cameraTarget ? { lat: cameraTarget.lat, lng: cameraTarget.lng } : null}
                    targetZoom={cameraTarget?.zoom}
                  />

                  {/* Kost Markers */}
                  {showKosts &&
                    KOST_LISTINGS.map((kost) => {
                      const isSelected = selectedKostOnMap?.id === kost.id;
                      const isHovered = hoveredKostId === kost.id;
                      const pinBackground =
                        kost.category === 'putri'
                          ? '#E11D48'
                          : kost.category === 'putra'
                          ? '#0284C7'
                          : '#0D9488';

                      return (
                        <AdvancedMarker
                          key={kost.id}
                          position={kost.position}
                          onClick={() => handleMarkerClick(kost)}
                          title={kost.name}
                          zIndex={isHovered ? 80 : isSelected ? 50 : 20}
                        >
                          <div
                            className="relative flex flex-col items-center group cursor-pointer"
                            onMouseEnter={() => setHoveredKostId(kost.id)}
                            onMouseLeave={() => setHoveredKostId(null)}
                          >
                            {/* Interactive Mini Thumbnail Tooltip on Hover */}
                            {isHovered && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkerClick(kost);
                                  onSelectKost(kost);
                                }}
                                className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-2xl border-2 border-[#0EA5E9] z-[99] pointer-events-auto cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-150 hover:bg-white"
                                title="Klik untuk membuka detail spesifikasi kamar ini"
                              >
                                <div className="flex gap-2.5 items-center">
                                  <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                                    <img
                                      src={kost.mainImage}
                                      alt={kost.name}
                                      onError={handleImageFallback}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                    />
                                    <span
                                      className={`absolute bottom-0 inset-x-0 text-center text-[8px] font-bold text-white py-0.5 uppercase tracking-wider ${
                                        kost.category === 'putri'
                                          ? 'bg-rose-600/90'
                                          : kost.category === 'putra'
                                          ? 'bg-sky-600/90'
                                          : 'bg-teal-600/90'
                                      }`}
                                    >
                                      {kost.category}
                                    </span>
                                  </div>

                                  <div className="min-w-0 flex-1 text-left">
                                    <h4 className="text-xs font-bold text-[#0C4A6E] truncate leading-tight hover:text-[#0EA5E9] transition-colors">
                                      {kost.name}
                                    </h4>
                                    <p className="text-[11px] font-bold text-[#0EA5E9] mt-0.5">
                                      Rp {kost.monthlyPrice.toLocaleString('id-ID')}
                                      <span className="text-[9px] font-normal text-slate-500">/bln</span>
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                                      <span className="truncate">{kost.distanceToTelkom}</span>
                                      <span>•</span>
                                      <span className={`font-semibold ${kost.hasWaterHeater ? 'text-emerald-700' : 'text-slate-500'}`}>
                                        {kost.hasWaterHeater ? 'Water Heater' : 'Air Dingin'}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                                  <span className="text-slate-500 truncate max-w-[120px] font-medium">{kost.area}</span>
                                  <span className="text-[#0EA5E9] font-bold flex items-center gap-0.5 hover:underline">
                                    Lihat Detail &rarr;
                                  </span>
                                </div>

                                {/* Pointer Triangle */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-[#0EA5E9] pointer-events-none" />
                              </div>
                            )}

                            {/* Pin Element */}
                            <Pin
                              background={isSelected ? '#F97316' : isHovered ? '#0EA5E9' : pinBackground}
                              borderColor="#FFFFFF"
                              glyphColor="#FFFFFF"
                              scale={isSelected || isHovered ? 1.25 : 1.0}
                            />

                            {/* Marker Price Pill beneath pin */}
                            <div 
                              className={`mt-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold shadow-md whitespace-nowrap transition-transform ${
                                isSelected
                                  ? 'bg-[#F97316] text-white ring-2 ring-white scale-105'
                                  : 'bg-slate-900/80 text-white backdrop-blur-xs'
                              }`}
                            >
                              {(kost.monthlyPrice / 1000000).toFixed(1)}jt
                            </div>
                          </div>
                        </AdvancedMarker>
                      );
                    })}

                  {/* Campus POIs & Facility Markers */}
                  {CAMPUS_POIS.map((poi) => {
                    if (!isPoiVisible(poi)) return null;

                    const isSelected = selectedPOI?.id === poi.id;
                    const isHovered = hoveredPoiId === poi.id;

                    let pinBackground = '#0EA5E9';
                    if (poi.category === 'food') pinBackground = '#F59E0B';
                    else if (poi.category === 'market') pinBackground = '#10B981';
                    else if (poi.category === 'laundry') pinBackground = '#8B5CF6';
                    else if (poi.category === 'facility') pinBackground = '#0D9488';
                    else if (poi.category === 'academic') pinBackground = '#0C4A6E';

                    return (
                      <AdvancedMarker
                        key={poi.id}
                        position={poi.position}
                        onClick={() => handlePoiClick(poi)}
                        title={poi.name}
                        zIndex={isHovered ? 70 : isSelected ? 50 : 25}
                      >
                        <div
                          className="relative flex flex-col items-center group cursor-pointer"
                          onMouseEnter={() => setHoveredPoiId(poi.id)}
                          onMouseLeave={() => setHoveredPoiId(null)}
                        >
                          {isHovered && (
                            <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xl shadow-xl pointer-events-none z-[90] border border-white/20">
                              <div className="font-bold">{poi.name}</div>
                              <div className="text-[10px] text-slate-300 font-normal mt-0.5">
                                {poi.distance} • {poi.openingHours || 'Fasilitas'}
                              </div>
                              {poi.priceEstimate && (
                                <div className="text-[9px] text-amber-300 font-medium">
                                  {poi.priceEstimate}
                                </div>
                              )}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900/90" />
                            </div>
                          )}
                          <Pin
                            background={isSelected ? '#F97316' : pinBackground}
                            borderColor="#FFFFFF"
                            glyphColor="#FFFFFF"
                            scale={isSelected || isHovered ? 1.25 : 0.9}
                          />
                        </div>
                      </AdvancedMarker>
                    );
                  })}

                  {/* InfoWindow for Selected Kost */}
                  {selectedKostOnMap && infoWindowShown && (
                    <InfoWindow
                      position={selectedKostOnMap.position}
                      onCloseClick={() => setInfoWindowShown(false)}
                      headerContent={
                        <span
                          onClick={() => onSelectKost(selectedKostOnMap)}
                          className="font-bold text-[#0C4A6E] text-xs cursor-pointer hover:text-[#0EA5E9] transition-colors"
                          title="Klik nama kost untuk membuka detail lengkap"
                        >
                          {selectedKostOnMap.name}
                        </span>
                      }
                    >
                      <div
                        onClick={() => onSelectKost(selectedKostOnMap)}
                        className="p-1 space-y-1.5 text-xs cursor-pointer hover:bg-sky-50/50 rounded-lg transition-colors group/infowin max-w-[220px]"
                        title="Klik informasi kamar untuk melihat rincian detail"
                      >
                        <div className="font-bold text-[#0EA5E9]">
                          Rp {selectedKostOnMap.monthlyPrice.toLocaleString('id-ID')} /bln
                        </div>
                        <div className="text-slate-600 text-[11px] flex items-center justify-between">
                          <span>{selectedKostOnMap.distanceToTelkom}</span>
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">
                            {selectedKostOnMap.hasWaterHeater ? 'Water Heater' : 'Air Dingin'}
                          </span>
                        </div>
                        {selectedKostOnMap.drawbacks && selectedKostOnMap.drawbacks.length > 0 && (
                          <div className="text-[10px] text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 line-clamp-1">
                            Catatan: {selectedKostOnMap.drawbacks[0]}
                          </div>
                        )}
                        <div className="flex gap-1.5 mt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectKost(selectedKostOnMap);
                            }}
                            className="flex-1 px-2 py-1 text-[11px] font-semibold text-[#0C4A6E] bg-[#F97316] rounded-md hover:bg-[#ea580c] hover:text-white transition-colors cursor-pointer text-center"
                          >
                            Detail Kamar
                          </button>
                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
                            title="Buka rute di Google Maps"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            )}

            {/* Quick Interactive Map Legend - Works in both Interactive and Fallback modes */}
            <div className="absolute top-16 right-3 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 text-[11px] text-[#0C4A6E] shadow-md max-w-[210px]">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1">
                <span className="font-bold text-xs text-slate-800">Legenda Penanda:</span>
                <span className="text-[9px] text-slate-500 font-medium">Klik rincian</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const kost = KOST_LISTINGS.find((k) => k.category === 'putri');
                  if (kost) {
                    handleMarkerClick(kost);
                    onSelectKost(kost);
                  }
                }}
                className="flex items-center justify-between gap-2 p-1 -mx-1 rounded-lg hover:bg-rose-50 text-slate-700 hover:text-rose-800 transition-all cursor-pointer text-left group"
                title="Klik untuk membuka detail kamar Kost Putri"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:font-semibold truncate">Kost Putri</span>
                </div>
                <span className="text-[10px] text-rose-600 font-semibold underline opacity-80 group-hover:opacity-100 shrink-0">
                  Detail →
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const kost = KOST_LISTINGS.find((k) => k.category === 'putra');
                  if (kost) {
                    handleMarkerClick(kost);
                    onSelectKost(kost);
                  }
                }}
                className="flex items-center justify-between gap-2 p-1 -mx-1 rounded-lg hover:bg-sky-50 text-slate-700 hover:text-sky-800 transition-all cursor-pointer text-left group"
                title="Klik untuk membuka detail kamar Kost Putra"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:font-semibold truncate">Kost Putra</span>
                </div>
                <span className="text-[10px] text-sky-600 font-semibold underline opacity-80 group-hover:opacity-100 shrink-0">
                  Detail →
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const kost = KOST_LISTINGS.find((k) => k.category === 'campur');
                  if (kost) {
                    handleMarkerClick(kost);
                    onSelectKost(kost);
                  }
                }}
                className="flex items-center justify-between gap-2 p-1 -mx-1 rounded-lg hover:bg-teal-50 text-slate-700 hover:text-teal-800 transition-all cursor-pointer text-left group"
                title="Klik untuk membuka detail kamar Kost Campur"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:font-semibold truncate">Kost Campur</span>
                </div>
                <span className="text-[10px] text-teal-600 font-semibold underline opacity-80 group-hover:opacity-100 shrink-0">
                  Detail →
                </span>
              </button>

              {/* Public Facilities in Legend */}
              <button
                type="button"
                onClick={() => setActiveFilter('food')}
                className="flex items-center justify-between gap-2 p-1 -mx-1 rounded-lg hover:bg-amber-50 text-slate-700 hover:text-amber-800 transition-all cursor-pointer text-left group"
                title="Filter warung makan dan kuliner"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:font-semibold truncate">Warung Makan / Kuliner</span>
                </div>
                <span className="text-[10px] text-amber-600 font-semibold opacity-80 group-hover:opacity-100 shrink-0">
                  Pilih
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('market')}
                className="flex items-center justify-between gap-2 p-1 -mx-1 rounded-lg hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-all cursor-pointer text-left group"
                title="Filter minimarket 24 jam"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:font-semibold truncate">Minimarket & ATM</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold opacity-80 group-hover:opacity-100 shrink-0">
                  Pilih
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('laundry')}
                className="flex items-center justify-between gap-2 p-1 -mx-1 rounded-lg hover:bg-purple-50 text-slate-700 hover:text-purple-800 transition-all cursor-pointer text-left group"
                title="Filter laundry kiloan"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="font-medium group-hover:font-semibold truncate">Laundry Kiloan</span>
                </div>
                <span className="text-[10px] text-purple-600 font-semibold opacity-80 group-hover:opacity-100 shrink-0">
                  Pilih
                </span>
              </button>

              <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100 text-slate-500 text-[10px]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shrink-0" />
                <span>Gerbang & Kampus Tel-U</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Selected Point Detail Card (4 Columns) */}
          <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Detail Lokasi Terpilih
              </span>
              <span className="text-xs font-medium text-[#0EA5E9]">
                {selectedKostOnMap ? 'Hunian Kost' : 'Fasilitas / POI'}
              </span>
            </div>

            {selectedKostOnMap ? (
              <div className="space-y-4">
                <div
                  onClick={() => onSelectKost(selectedKostOnMap)}
                  className="rounded-xl overflow-hidden h-40 relative bg-slate-200 cursor-pointer group shadow-xs"
                  title="Klik untuk membuka rincian kamar"
                >
                  <img
                    src={selectedKostOnMap.mainImage}
                    alt={selectedKostOnMap.name}
                    onError={handleImageFallback}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#F5E6D3] text-[#0C4A6E] shadow-2xs">
                    {selectedKostOnMap.category === 'putri'
                      ? 'Kost Putri'
                      : selectedKostOnMap.category === 'putra'
                      ? 'Kost Putra'
                      : 'Kost Campur'}
                  </div>
                </div>

                <div>
                  <h4
                    onClick={() => onSelectKost(selectedKostOnMap)}
                    className="font-bold text-[#0C4A6E] text-base leading-snug cursor-pointer hover:text-[#0EA5E9] transition-colors"
                    title="Klik nama kost untuk membuka detail lengkap"
                  >
                    {selectedKostOnMap.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-lg font-bold text-[#0EA5E9]">
                      Rp {selectedKostOnMap.monthlyPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-slate-500">/ bulan</span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-medium">Jarak ke Kampus:</span>
                    <span className="font-semibold text-slate-800">{selectedKostOnMap.distanceToTelkom}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-medium">Ukuran Kamar:</span>
                    <span className="font-semibold text-slate-800">{selectedKostOnMap.roomSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-medium">Ketersediaan:</span>
                    <span className="font-semibold text-rose-600">
                      Sisa {selectedKostOnMap.roomAvailable} Kamar ({selectedKostOnMap.totalRooms} Total)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-100">
                    <span className="font-medium">Water Heater:</span>
                    <span className="font-semibold text-emerald-700">
                      {selectedKostOnMap.hasWaterHeater ? 'Tersedia' : 'Tidak Ada'}
                    </span>
                  </div>
                  <div className="flex items-start justify-between text-slate-600 pt-1 border-t border-slate-100">
                    <span className="font-medium shrink-0">Dapur Bersama:</span>
                    <span className="font-medium text-slate-800 text-right text-[11px] line-clamp-2 max-w-[190px]">
                      {selectedKostOnMap.kitchenFacility}
                    </span>
                  </div>
                  <div className="flex items-start justify-between text-slate-600 pt-1 border-t border-slate-100">
                    <span className="font-medium shrink-0">Ketentuan Gas:</span>
                    <span className="font-medium text-slate-800 text-right text-[11px] line-clamp-2 max-w-[190px]">
                      {selectedKostOnMap.gasPolicy}
                    </span>
                  </div>
                </div>

                {selectedKostOnMap.drawbacks && selectedKostOnMap.drawbacks.length > 0 && (
                  <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                      <span>Catatan Kekurangan Riil:</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      {selectedKostOnMap.drawbacks[0]}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => onSelectKost(selectedKostOnMap)}
                    className="w-full py-2.5 px-4 bg-[#0C4A6E] hover:bg-[#083344] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Buka Detail & Spesifikasi Lengkap</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  {/* Direct Link to Google Maps */}
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-4 bg-white hover:bg-slate-100 text-[#0EA5E9] text-xs font-semibold rounded-xl border border-sky-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            ) : selectedPOI ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Dynamic POI Category Card */}
                <div className={`p-4 rounded-xl border ${
                  selectedPOI.category === 'food'
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                    : selectedPOI.category === 'market'
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : selectedPOI.category === 'laundry'
                    ? 'bg-purple-50/80 border-purple-200 text-purple-950'
                    : selectedPOI.category === 'gate'
                    ? 'bg-sky-50/80 border-sky-200 text-sky-950'
                    : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
                }`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {selectedPOI.category === 'food' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-800">
                        <Utensils className="w-3 h-3" />
                        <span>Kuliner & Warung Makan</span>
                      </span>
                    ) : selectedPOI.category === 'market' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-800">
                        <ShoppingBag className="w-3 h-3" />
                        <span>Minimarket & Belanja</span>
                      </span>
                    ) : selectedPOI.category === 'laundry' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-200 text-purple-800">
                        <Shirt className="w-3 h-3" />
                        <span>Laundry Kiloan</span>
                      </span>
                    ) : selectedPOI.category === 'gate' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-sky-200 text-sky-800">
                        <School className="w-3 h-3" />
                        <span>Gerbang Akses Kampus</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-200 text-indigo-800">
                        <Building2 className="w-3 h-3" />
                        <span>Fasilitas Umum</span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-[#0C4A6E] text-base leading-snug">{selectedPOI.name}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{selectedPOI.description}</p>
                </div>

                {/* Rich Specs for POI */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      <span>Jarak / Lokasi:</span>
                    </span>
                    <span className="font-semibold text-slate-800 text-right">{selectedPOI.distance}</span>
                  </div>

                  {selectedPOI.openingHours && (
                    <div className="flex items-center justify-between text-slate-600 pt-2 border-t border-slate-100">
                      <span className="font-medium flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Jam Operasional:</span>
                      </span>
                      <span className="font-semibold text-emerald-700 text-right">{selectedPOI.openingHours}</span>
                    </div>
                  )}

                  {selectedPOI.priceEstimate && (
                    <div className="flex items-start justify-between text-slate-600 pt-2 border-t border-slate-100">
                      <span className="font-medium shrink-0 flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-amber-500" />
                        <span>Estimasi Tarif / Info:</span>
                      </span>
                      <span className="font-semibold text-slate-800 text-right text-[11px] max-w-[170px]">
                        {selectedPOI.priceEstimate}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-slate-600 pt-2 border-t border-slate-100">
                    <span className="font-medium">Target Pengguna:</span>
                    <span className="font-semibold text-slate-700">Mahasiswa & Warga Sekitar</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-[#0EA5E9] hover:bg-[#0284c7] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Petunjuk Arah Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="p-3 bg-slate-100/90 rounded-xl text-[11px] text-slate-600 leading-relaxed text-center">
                    💡 <strong>Tips Mahasiswa:</strong> Anda dapat memilih kamar kost di katalog yang memiliki jarak paling dekat dengan titik fasilitas ini.
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
