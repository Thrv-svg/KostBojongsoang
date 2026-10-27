import React, { useState } from 'react';
import { Home, Compass, HelpCircle, MessageSquare, Calendar, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Katalog Kost', href: '#katalog-kost', icon: Home },
    { label: 'Peta Lokasi & Kampus', href: '#peta-lokasi', icon: Compass },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
    { label: 'Testimoni', href: '#testimoni', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-[#0C4A6E] hover:text-[#0EA5E9] transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0C4A6E] to-[#0EA5E9] flex items-center justify-center text-white font-bold shadow-xs group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight leading-none text-[#0C4A6E]">
              Kost<span className="text-[#0EA5E9]">Bojongsoang</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider">
              Kawasan Kampus Telkom University
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-slate-600 hover:text-[#0EA5E9] transition-colors flex items-center gap-1.5"
            >
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0C4A6E] bg-[#F97316] hover:bg-[#ea580c] hover:text-white rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap active:translate-y-0.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Formulir Rencana Masuk</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-slate-600 hover:text-[#0C4A6E] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-[#0EA5E9] hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
