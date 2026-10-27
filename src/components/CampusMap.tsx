import React, { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { CAMPUS_POIS, KOST_LISTINGS, KostProperty, CampusPOI } from '../data/kostData';
import { MapPin, Navigation, Compass, School, ShoppingBag, HeartPulse, ExternalLink, Layers, ZoomIn, AlertCircle } from 'lucide-react';

interface CampusMapProps {
  onSelectKost: (kost: KostProperty) => void;
}

export const CampusMap: React.FC<CampusMapProps> = ({ onSelectKost }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'kost' | 'gate' | 'facility'>('all');
  const [selectedPOI, setSelectedPOI] = useState<CampusPOI | null>(null);
  const [selectedKostOnMap, setSelectedKostOnMap] = useState<KostProperty | null>(KOST_LISTINGS[0]);
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(true);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

  // Center around Telkom University campus & Bojongsoang
  const defaultCenter = { lat: -6.9731, lng: 107.6315 };

  // Combine markers based on filter
  const showKosts = activeFilter === 'all' || activeFilter === 'kost';
  const showGates = activeFilter === 'all' || activeFilter === 'gate';
  const showFacilities = activeFilter === 'all' || activeFilter === 'facility';

  const handleMarkerClick = useCallback((kost: KostProperty) => {
    setSelectedKostOnMap(kost);
    setSelectedPOI(null);
    setInfoWindowShown(true);
  }, []);

  const handlePoiClick = useCallback((poi: CampusPOI) => {
    setSelectedPOI(poi);
    setSelectedKostOnMap(null);
    setInfoWindowShown(true);
  }, []);

  return (
    <section id="peta-lokasi" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Google Maps Platform Terintegrasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C4A6E] tracking-tight">
              Peta Lokasi Kost Dekat Telkom University
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Eksplorasi posisi nyata kost di Bojongsoang, Gerbang 1 Sukabirus, Gerbang 2 PGA, Gerbang Sukapura, dan Gedung TULT langsung di Google Maps.
            </p>
          </div>

          {/* Map Controls: View Type & Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Map Type Mode (Roadmap / Satellite) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
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
                    ? 'bg-white text-[#0C4A6E] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-[#0C4A6E]'
                }`}
              >
                Satelit
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
              {[
                { id: 'all', label: 'Semua Titik' },
                { id: 'kost', label: 'Kost Terdaftar' },
                { id: 'gate', label: 'Gerbang Tel-U' },
                { id: 'facility', label: 'Fasilitas Sekitar' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#0C4A6E] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-[#0C4A6E]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Layout: Google Map Canvas & Right Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Google Map Container (8 Columns) */}
          <div className="lg:col-span-8 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative h-[480px] sm:h-[540px]">
            {apiKey ? (
              <APIProvider apiKey={apiKey}>
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
                  {/* Kost Markers */}
                  {showKosts &&
                    KOST_LISTINGS.map((kost) => {
                      const isSelected = selectedKostOnMap?.id === kost.id;
                      const pinBackground =
                        kost.category === 'putri'
                          ? '#F43F5E'
                          : kost.category === 'putra'
                          ? '#0284C7'
                          : '#0D9488';

                      return (
                        <AdvancedMarker
                          key={kost.id}
                          position={kost.position}
                          onClick={() => handleMarkerClick(kost)}
                          title={kost.name}
                          zIndex={isSelected ? 30 : 20}
                        >
                          <Pin
                            background={isSelected ? '#F97316' : pinBackground}
                            borderColor="#FFFFFF"
                            glyphColor="#FFFFFF"
                            scale={isSelected ? 1.25 : 1.0}
                          />
                        </AdvancedMarker>
                      );
                    })}

                  {/* Campus POIs & Gate Markers */}
                  {CAMPUS_POIS.map((poi) => {
                    if (poi.category === 'gate' && !showGates) return null;
                    if ((poi.category === 'facility' || poi.category === 'market') && !showFacilities) return null;
                    if (poi.category === 'academic' && !showGates) return null;

                    const isGate = poi.category === 'gate';
                    const isSelected = selectedPOI?.id === poi.id;

                    return (
                      <AdvancedMarker
                        key={poi.id}
                        position={poi.position}
                        onClick={() => handlePoiClick(poi)}
                        title={poi.name}
                        zIndex={isSelected ? 25 : 10}
                      >
                        <Pin
                          background={
                            isSelected
                              ? '#F59E0B'
                              : isGate
                              ? '#0EA5E9'
                              : poi.category === 'market'
                              ? '#10B981'
                              : '#6366F1'
                          }
                          borderColor="#FFFFFF"
                          glyphColor="#FFFFFF"
                          scale={isSelected ? 1.2 : 0.85}
                        />
                      </AdvancedMarker>
                    );
                  })}

                  {/* InfoWindow for Selected Kost */}
                  {selectedKostOnMap && infoWindowShown && (
                    <InfoWindow
                      position={selectedKostOnMap.position}
                      onCloseClick={() => setInfoWindowShown(false)}
                      headerContent={
                        <span className="font-bold text-[#0C4A6E] text-xs">
                          {selectedKostOnMap.name}
                        </span>
                      }
                    >
                      <div className="p-1 space-y-1 text-xs">
                        <div className="font-semibold text-[#0EA5E9]">
                          Rp {selectedKostOnMap.monthlyPrice.toLocaleString('id-ID')} /bln
                        </div>
                        <div className="text-slate-600 text-[11px]">
                          {selectedKostOnMap.distanceToTelkom}
                        </div>
                        {selectedKostOnMap.drawbacks && selectedKostOnMap.drawbacks.length > 0 && (
                          <div className="text-[10px] text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 line-clamp-1">
                            Catatan: {selectedKostOnMap.drawbacks[0]}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectKost(selectedKostOnMap)}
                          className="mt-1 px-2.5 py-1 text-[11px] font-semibold text-[#0C4A6E] bg-[#F97316] rounded-md hover:bg-[#ea580c] hover:text-white transition-colors cursor-pointer"
                        >
                          Lihat Detail
                        </button>
                      </div>
                    </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center space-y-3">
                <Compass className="w-10 h-10 text-[#0EA5E9] animate-spin" />
                <h3 className="text-lg font-bold">Memuat Google Maps...</h3>
                <p className="text-xs text-slate-300 max-w-sm">
                  Menyiapkan peta interaktif kawasan Bojongsoang dan kampus Telkom University.
                </p>
              </div>
            )}

            {/* Quick Map Legend Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 text-[11px] text-[#0C4A6E] shadow-sm pointer-events-none">
              <span className="font-bold text-xs">Legenda Penanda:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span>Kost Putri</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
                <span>Kost Putra</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0" />
                <span>Kost Campur</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shrink-0" />
                <span>Gerbang Telkom Univ</span>
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
                {selectedKostOnMap ? 'Hunian Kost' : 'Titik Penting'}
              </span>
            </div>

            {selectedKostOnMap ? (
              <div className="space-y-4">
                <div
                  onClick={() => onSelectKost(selectedKostOnMap)}
                  className="rounded-xl overflow-hidden h-40 relative bg-slate-200 cursor-pointer group"
                  title="Klik untuk membuka rincian kamar"
                >
                  <img
                    src={selectedKostOnMap.mainImage}
                    alt={selectedKostOnMap.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#F5E6D3] text-[#0C4A6E]">
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
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
                    <span>{selectedKostOnMap.distanceToTelkom}</span>
                  </div>
                </div>

                {/* Legend Informasi Kamar - Clickable */}
                <div
                  onClick={() => onSelectKost(selectedKostOnMap)}
                  className="p-3 bg-white hover:bg-sky-50/40 rounded-xl border border-slate-200 hover:border-sky-300 transition-all text-xs space-y-1.5 cursor-pointer shadow-2xs group"
                  title="Klik informasi spesifikasi kamar untuk membuka detail"
                >
                  <div className="flex justify-between items-center text-[11px] font-semibold text-[#0EA5E9] pb-1 border-b border-slate-100">
                    <span>Informasi & Spesifikasi Kamar</span>
                    <span className="text-[10px] text-slate-400 group-hover:text-[#0EA5E9] font-normal underline">
                      Buka Rincian →
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Harga Bulanan:</span>
                    <span className="font-mono font-bold text-[#0C4A6E]">
                      Rp {selectedKostOnMap.monthlyPrice.toLocaleString('id-ID')} /bln
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kamar Tersedia:</span>
                    <span className="font-semibold text-emerald-700">
                      {selectedKostOnMap.roomAvailable} Kamar
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ukuran Kamar:</span>
                    <span className="text-slate-700">{selectedKostOnMap.roomSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Water Heater:</span>
                    <span className={`font-semibold ${selectedKostOnMap.hasWaterHeater ? 'text-emerald-700' : 'text-slate-700'}`}>
                      {selectedKostOnMap.hasWaterHeater ? 'Ada' : 'Tidak Ada'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dapur Bersama:</span>
                    <span className="font-medium text-slate-700 text-right truncate max-w-[170px]" title={selectedKostOnMap.gasPolicy}>
                      {selectedKostOnMap.gasPolicy.includes('termasuk')
                        ? 'Gas Sudah Termasuk'
                        : selectedKostOnMap.gasPolicy.includes('beli sendiri')
                        ? 'Gas Beli Sendiri'
                        : 'Pantry Listrik'}
                    </span>
                  </div>
                </div>

                {/* Drawback notice for transparency - Clickable */}
                {selectedKostOnMap.drawbacks && selectedKostOnMap.drawbacks.length > 0 && (
                  <div
                    onClick={() => onSelectKost(selectedKostOnMap)}
                    className="p-3 bg-amber-50/80 hover:bg-amber-100/90 transition-colors rounded-xl border border-amber-200/80 text-xs space-y-1 cursor-pointer"
                    title="Klik untuk melihat seluruh catatan kekurangan kamar"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Catatan / Kekurangan:</span>
                    </div>
                    <ul className="text-[11px] text-amber-800 space-y-0.5 list-disc pl-4 font-normal">
                      {selectedKostOnMap.drawbacks.slice(0, 2).map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                      {selectedKostOnMap.drawbacks.length > 2 && (
                        <li className="list-none -ml-4 text-[10px] text-amber-700 italic pt-0.5 font-medium">
                          + {selectedKostOnMap.drawbacks.length - 2} catatan lainnya (klik untuk lihat rincian)
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectKost(selectedKostOnMap)}
                    className="flex-1 py-2 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl transition-colors text-center cursor-pointer"
                  >
                    Lihat Rincian Kamar
                  </button>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedKostOnMap.position.lat},${selectedKostOnMap.position.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 hover:text-[#0EA5E9] bg-white border border-slate-200 rounded-xl transition-colors flex items-center justify-center"
                    title="Petunjuk arah jalan kaki ke lokasi ini"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : selectedPOI ? (
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0C4A6E] flex items-center justify-center">
                    <School className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-[#0C4A6E] text-base">{selectedPOI.name}</h4>
                  <div className="text-xs font-medium text-[#0EA5E9]">{selectedPOI.distance}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedPOI.description}</p>
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <p>
                    Lokasi ini dapat dijangkau dalam hitungan menit jalan kaki dari berbagai kost rekomendasi di Sukabirus, Sukapura, dan PGA Bojongsoang.
                  </p>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPOI.position.lat},${selectedPOI.position.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#0C4A6E] bg-white border border-slate-200 hover:border-[#0EA5E9] rounded-xl transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Jalan Kaki di Maps</span>
                </a>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-slate-500">
                Pilih salah satu penanda pin pada Google Maps untuk melihat jarak dan detail lokasinya.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
