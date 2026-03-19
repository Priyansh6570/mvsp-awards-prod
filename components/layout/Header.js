"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'होम' },
    { href: '/about', label: 'परिचय' },
    { href: '/rules', label: 'नियमावली' },
    { href: '/nomination_guide', label: 'नामांकन सहायिका' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@600;700&display=swap');

        .hdr-font { font-family: 'Noto Sans Devanagari', sans-serif; }
        .hdr-serif { font-family: 'Noto Serif Devanagari', serif; }

        @keyframes hdr-sweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(300%); }
        }
        .hdr-bar-shine::after {
          content: '';
          position: absolute;
          inset-y: 0;
          width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255,220,130,0.12), transparent);
          animation: hdr-sweep 4s ease-in-out infinite;
        }

        @keyframes hdr-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.65); }
        }
        .hdr-dot-pulse { animation: hdr-pulse 2.2s ease-in-out infinite; }

        @keyframes hdr-spin {
          to { transform: rotate(360deg); }
        }
        .hdr-logo-ring { animation: hdr-spin 10s linear infinite; }

        .hdr-nav-link {
          position: relative;
          font-family: 'Noto Sans Devanagari', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #3a2010;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: 4px;
          letter-spacing: 0.01em;
          transition: color 0.2s, background 0.2s;
        }
        .hdr-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 14px; right: 14px;
          height: 2px;
          background: linear-gradient(90deg, #b8600a, #e8a820);
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }
        .hdr-nav-link:hover { color: #b8600a; background: rgba(184,96,10,0.05); }
        .hdr-nav-link:hover::after { transform: scaleX(1); }

        .hdr-cta {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hdr-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .hdr-cta:hover::before { left: 140%; }
        .hdr-cta:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(184,96,10,0.38) !important; }

        .hdr-drawer-panel {
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hdr-drawer-panel.open { transform: translateX(0); }

        /* ── Google Translate widget overrides ── */
        .goog-te-gadget { font-size: 0 !important; line-height: 0 !important; }
        .goog-te-gadget .goog-te-combo {
          font-family: 'Noto Sans Devanagari', sans-serif !important;
          font-size: 11.5px !important;
          font-weight: 600 !important;
          color: #5a3008 !important;
          background: #fdf4d8 !important;
          border: 1.5px solid rgba(184,96,10,0.3) !important;
          border-radius: 4px !important;
          padding: 6px 10px !important;
          cursor: pointer !important;
          outline: none !important;
          appearance: auto !important;
          max-width: 130px !important;
          transition: border-color 0.2s, background 0.2s !important;
        }
        .goog-te-gadget .goog-te-combo:hover {
          border-color: rgba(184,96,10,0.65) !important;
          background: #faebbf !important;
        }
        .goog-logo-link, .goog-te-gadget > span { display: none !important; }
      `}</style>

      {/* ── Announcement Bar ── */}
      <div className="hdr-font hdr-bar-shine relative overflow-hidden bg-gradient-to-r from-[#6b1414] via-[#8b2020] to-[#6b1414] text-[#fde8c0] py-[7px] px-4 text-center text-[11.5px] font-medium">
        <span className="relative z-10 inline-flex items-center justify-center gap-2.5 flex-wrap">
          नामांकन की अंतिम तिथि
          <span className="hdr-dot-pulse inline-block w-[5px] h-[5px] rounded-full bg-[#f5c842] flex-shrink-0" />
          <strong className="text-[#f5c842] font-bold">20 मई 2026</strong>
          <span className="hdr-dot-pulse inline-block w-[5px] h-[5px] rounded-full bg-[#f5c842] flex-shrink-0" />
          <a href="/nominate" className="underline underline-offset-2 decoration-[rgba(253,232,192,0.35)] hover:text-white transition-colors duration-200">
            अभी नामांकन करें →
          </a>
        </span>
      </div>

      {/* ── Main Header ── */}
      <header
        className={`hdr-font sticky top-0 z-50 bg-[#fffdf7] transition-all duration-300 ${
          scrolled
            ? 'shadow-[0_2px_20px_rgba(120,40,0,0.09)] border-b border-[rgba(200,134,10,0.18)]'
            : 'border-b border-[rgba(200,134,10,0.07)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-[70px] md:h-[78px] gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-12 h-12 flex-shrink-0">
              <div className="hdr-logo-ring absolute inset-[-3px] rounded-full opacity-50"
                style={{ background: 'conic-gradient(from 0deg, #c8860a, #f5c842, #9a6008, #c8860a)' }} />
              <div className="absolute inset-[2px] rounded-full bg-[#fffdf7] z-10" />
              <img
                src="/logo_9.png"
                alt="सम्राट विक्रमादित्य सम्मान"
                className="relative z-20 w-full h-full object-contain rounded-full p-1"
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none gap-[5px]">
              <span className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#b8700a]">
                महाराजा विक्रमादित्य शोधपीठ
              </span>
              <span className="hdr-serif text-[18px] font-bold text-[#1e0e00] leading-none">
                विक्रमादित्य सम्मान
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hdr-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Right side ── */}
          <div className="flex items-center gap-3">

            {/* Translate widget */}
            <div id="google_translate_element" />

            {/* Nominate CTA */}
            <a
              href="/nominate"
              className="hdr-cta hidden lg:inline-flex items-center gap-2 bg-gradient-to-br from-[#b8600a] via-[#cf7610] to-[#9a4c06] text-white text-[12.5px] font-bold px-5 py-[9px] rounded-[3px] shadow-[0_4px_18px_rgba(184,96,10,0.28)]"
              style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', letterSpacing: '0.02em' }}
            >
              <svg width="7" height="7" viewBox="0 0 10 10" fill="currentColor" className="flex-shrink-0 opacity-80">
                <path d="M5 0L10 5L5 10L0 5Z" />
              </svg>
              नामांकन करें
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-2 rounded-[3px] border border-[rgba(184,96,10,0.2)] hover:border-[rgba(184,96,10,0.4)] hover:bg-[rgba(184,96,10,0.05)] transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="मेनू खोलें"
            >
              <span className="block h-[1.5px] bg-[#4a2a08] rounded-sm" />
              <span className="block h-[1.5px] w-3/4 bg-[#4a2a08] rounded-sm" />
              <span className="block h-[1.5px] w-1/2 bg-[#4a2a08] rounded-sm" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className="absolute inset-0 bg-[rgba(20,8,0,0.5)] backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div className={`hdr-drawer-panel hdr-font absolute top-0 right-0 bottom-0 w-[min(296px,88vw)] flex flex-col bg-[#fffdf7] border-l border-[rgba(200,134,10,0.16)] shadow-[-12px_0_50px_rgba(0,0,0,0.14)] ${isMobileMenuOpen ? 'open' : ''}`}>

          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(200,134,10,0.1)]">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="w-9 h-9 object-contain" />
              <div className="flex flex-col gap-1 leading-none">
                <span className="text-[8.5px] font-semibold tracking-[0.14em] uppercase text-[#b8700a]">महाराजा विक्रमादित्य</span>
                <span className="hdr-serif text-[14px] font-bold text-[#1e0e00]">विक्रमादित्य सम्मान</span>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(184,96,10,0.2)] hover:bg-[rgba(184,96,10,0.07)] transition-colors"
            >
              <svg width="11" height="11" fill="none" stroke="#9a5008" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col p-4 gap-1 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[4px] text-[14px] font-semibold text-[#3a2010] hover:text-[#b8600a] hover:bg-[rgba(184,96,10,0.06)] transition-all"
                style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8860a] opacity-50 flex-shrink-0" />
                {link.label}
              </a>
            ))}

            <div className="my-3 h-px bg-gradient-to-r from-transparent via-[rgba(200,134,10,0.22)] to-transparent" />

            <a
              href="/nominate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-[3px] bg-gradient-to-br from-[#b8600a] via-[#cf7610] to-[#9a4c06] text-white text-[13px] font-bold shadow-[0_4px_16px_rgba(184,96,10,0.25)]"
              style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
            >
              <svg width="7" height="7" viewBox="0 0 10 10" fill="currentColor">
                <path d="M5 0L10 5L5 10L0 5Z" />
              </svg>
              अभी नामांकन करें
            </a>
          </nav>

          <div className="px-5 py-3 border-t border-[rgba(200,134,10,0.08)] text-center text-[9px] tracking-[0.16em] uppercase text-[#c8a870] font-medium"
            style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
            संस्कृति विभाग · मध्यप्रदेश शासन
          </div>
        </div>
      </div>
    </>
  );
}