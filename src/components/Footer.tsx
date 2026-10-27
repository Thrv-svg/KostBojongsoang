import React from 'react';
import { Home, MapPin, Phone, Mail, Calendar, Compass, Shield } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-14 pb-24 md:pb-14">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0C4A6E] to-[#0EA5E9] flex items-center justify-center text-white">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-[#0C4A6E]">
                Kost<span className="text-[#0EA5E9]">Bojongsoang</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Direktori hunian kost terpercaya untuk mahasiswa Telkom University dan pekerja di Bojongsoang, Kab. Bandung. Informasi fasilitas jujur, jarak riil ke gerbang kampus, dan kontak langsung ke pemilik.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" />
              <span>Kec. Bojongsoang & Dayeuhkolot, Kabupaten Bandung 40287</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-[#0C4A6E] uppercase tracking-wider text-xs">
              Navigasi Cepat
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a href="#katalog-kost" className="hover:text-[#0EA5E9] transition-colors">
                  Katalog Kamar Kost
                </a>
              </li>
              <li>
                <a href="#peta-lokasi" className="hover:text-[#0EA5E9] transition-colors">
                  Peta Radius Kampus Tel-U
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#0EA5E9] transition-colors">
                  Tanya Jawab & Biaya
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-[#0EA5E9] transition-colors">
                  Testimoni Mahasiswa
                </a>
              </li>
            </ul>
          </div>

          {/* Direct CTA */}
          <div className="md:col-span-4 space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-[#0C4A6E] text-xs">
              Butuh Rekomendasi Kamar Sesuai Budget?
            </h4>
            <p className="text-xs text-slate-500">
              Isi rencana masuk kamu atau hubungi langsung pengelola kost melalui WhatsApp untuk survei kamar tanpa biaya calo.
            </p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full py-2.5 px-3 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Buka Formulir Rencana Masuk
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} KostBojongsoang. All rights reserved. Khusus hunian terverifikasi di sekitar Telkom University.
          </div>
          <div className="flex items-center gap-4">
            <span>Tanpa Biaya Admin</span>
            <span>·</span>
            <span>Kontak Langsung Pemilik</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
