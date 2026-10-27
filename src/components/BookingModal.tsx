import React, { useState } from 'react';
import { KOST_LISTINGS, KostProperty } from '../data/kostData';
import { X, Calendar, MessageCircle, User, Phone, CheckCircle2, ShieldCheck, Tag, AlertCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedKost?: KostProperty | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedKost,
}) => {
  if (!isOpen) return null;

  const [selectedKostId, setSelectedKostId] = useState<string>(
    preSelectedKost ? preSelectedKost.id : KOST_LISTINGS[0].id
  );
  const [tenantName, setTenantName] = useState('');
  const [tenantPhone, setTenantPhone] = useState('');
  const [tenantStatus, setTenantStatus] = useState('Mahasiswa Baru Tel-U');
  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toISOString().split('T')[0];
  });
  const [duration, setDuration] = useState<'1' | '3' | '6' | '12'>('1');
  const [bookingIntent, setBookingIntent] = useState<'survei' | 'booking_langsung'>('survei');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const currentKost = KOST_LISTINGS.find((k) => k.id === selectedKostId) || KOST_LISTINGS[0];

  // Price Calculation
  const months = parseInt(duration, 10);
  const rawTotal = currentKost.monthlyPrice * months;
  // If 1 year (12 months), apply 1 month free discount promotion
  const discount = months === 12 ? currentKost.monthlyPrice : 0;
  const estimatedTotal = rawTotal - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tenantName.trim()) {
      setErrorMsg('Mohon masukkan nama lengkap calon penghuni.');
      return;
    }
    if (!tenantPhone.trim() || tenantPhone.length < 9) {
      setErrorMsg('Mohon masukkan nomor WhatsApp yang valid (minimal 9 digit).');
      return;
    }
    if (!checkInDate) {
      setErrorMsg('Mohon tentukan tanggal rencana masuk atau tanggal survei.');
      return;
    }

    setErrorMsg('');

    // Format Structured WhatsApp Message
    const durationLabel =
      duration === '1'
        ? '1 Bulan'
        : duration === '3'
        ? '3 Bulan'
        : duration === '6'
        ? '6 Bulan'
        : '1 Tahun (Diskon Promo 1 Bulan)';

    const intentLabel =
      bookingIntent === 'survei' ? 'Jadwal Survei Lokasi Fisik' : 'Pemesanan / Kunci Kamar';

    const message = `Halo Pengelola ${currentKost.name}, saya mendapatkan informasi dari website *KostBojongsoang*:\n\n` +
      `*Nama Lengkap:* ${tenantName}\n` +
      `*No. WhatsApp:* ${tenantPhone}\n` +
      `*Status:* ${tenantStatus}\n` +
      `*Tujuan:* ${intentLabel}\n` +
      `*Rencana Masuk / Survei:* ${checkInDate}\n` +
      `*Durasi Sewa:* ${durationLabel}\n` +
      `*Estimasi Biaya:* Rp ${estimatedTotal.toLocaleString('id-ID')}\n` +
      (notes ? `*Catatan Tambahan:* ${notes}\n\n` : `\n`) +
      `Apakah kamar pada tanggal tersebut masih bisa dibooking? Terima kasih!`;

    const waUrl = `https://wa.me/${currentKost.whatsappNumber}?text=${encodeURIComponent(message)}`;
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-[#0C4A6E]">
              Formulir Reservasi & Janji Survei
            </h3>
            <p className="text-xs text-slate-500">
              Pesan akan otomatis terkirim langsung ke WhatsApp pemilik kost
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup form booking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          {/* Select Kost */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#0C4A6E]">
              Pilih Kost yang Diminati:
            </label>
            <select
              value={selectedKostId}
              onChange={(e) => setSelectedKostId(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            >
              {KOST_LISTINGS.map((kost) => (
                <option key={kost.id} value={kost.id}>
                  {kost.name} — Rp {kost.monthlyPrice.toLocaleString('id-ID')}/bln ({kost.category})
                </option>
              ))}
            </select>

            {currentKost.drawbacks && currentKost.drawbacks.length > 0 && (
              <div className="mt-2 p-2.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-900">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Catatan kondisi unit ({currentKost.name}):</span>
                </div>
                <div className="text-[11px] text-amber-800 pl-5">
                  {currentKost.drawbacks.join(' · ')}
                </div>
              </div>
            )}
          </div>

          {/* Tenant Name & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#0C4A6E]">
                Nama Lengkap Calon Penghuni:
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Misal: Budi Santoso"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#0C4A6E]">
                Nomor WhatsApp Aktif:
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  value={tenantPhone}
                  onChange={(e) => setTenantPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tenant Status & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#0C4A6E]">
                Status Penghuni:
              </label>
              <select
                value={tenantStatus}
                onChange={(e) => setTenantStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                <option value="Mahasiswa Baru Tel-U">Mahasiswa Baru Telkom Univ (Maba)</option>
                <option value="Mahasiswa Aktif Tel-U">Mahasiswa Aktif Telkom Univ</option>
                <option value="Dosen / Karyawan Kampus">Dosen / Tenaga Pengajar</option>
                <option value="Pekerja / Karyawan Bojongsoang">Karyawan / Profesional Muda</option>
                <option value="Orang Tua Mahasiswa">Orang Tua / Wali Mahasiswa</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#0C4A6E]">
                Maksud Kunjungan:
              </label>
              <select
                value={bookingIntent}
                onChange={(e) => setBookingIntent(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                <option value="survei">Janjian Survei Fisik Kamar Dulu</option>
                <option value="booking_langsung">Langsung Booking / Kunci Kamar</option>
              </select>
            </div>
          </div>

          {/* Check-in Date & Rental Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#0C4A6E]">
                Rencana Tanggal Masuk / Survei:
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#0C4A6E]">
                Rencana Durasi Sewa:
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value as any)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
              >
                <option value="1">1 Bulan</option>
                <option value="3">3 Bulan (Per Semester Paruh)</option>
                <option value="6">6 Bulan (1 Semester Penuh)</option>
                <option value="12">1 Tahun (Bonus Diskon 1 Bulan)</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-[#0C4A6E]">
              Catatan / Permintaan Khusus (Opsional):
            </label>
            <textarea
              rows={2}
              placeholder="Contoh: bawa motor matic, butuh meja belajar agak luas, dsb."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
          </div>

          {/* Price Calculation Summary Card */}
          <div className="p-3.5 bg-slate-100/80 rounded-xl border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Tarif Kamar:</span>
              <span className="font-mono">Rp {currentKost.monthlyPrice.toLocaleString('id-ID')} × {duration} bln</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Diskon Paket 1 Tahun:</span>
                <span className="font-mono">- Rp {discount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-sm text-[#0C4A6E]">
              <span>Estimasi Total Sewa:</span>
              <span className="font-mono text-[#0C4A6E]">Rp {estimatedTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-[#0C4A6E]" />
            <span>Kirim Permintaan ke WhatsApp Pengelola</span>
          </button>

          <p className="text-[11px] text-center text-slate-400">
            Gratis tanpa pungutan biaya admin. Chat terhubung langsung ke pemilik/pengurus kost.
          </p>
        </form>
      </div>
    </div>
  );
};
