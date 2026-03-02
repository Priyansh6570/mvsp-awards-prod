"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/rules', label: 'Guidelines' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Nunito+Sans:wght@400;600;700&display=swap');
        .header-cinzel { font-family: 'Cinzel', serif; }
        .header-nunito { font-family: 'Nunito Sans', sans-serif; }
        
        .gold-shimmer-border {
          position: relative;
        }
        .gold-shimmer-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background: linear-gradient(90deg, rgba(212,160,23,0.1), rgba(212,160,23,0.5), rgba(212,160,23,0.1));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        
        .nav-link-underline {
          position: relative;
        }
        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, #f5c842, #d4a017);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.3s ease;
        }
        .nav-link-underline:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      <header
        className="sticky top-0 z-40 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(5, 5, 10, 0.92)'
            : 'rgba(5, 5, 10, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(212, 160, 23, 0.15)'
            : '1px solid rgba(255, 255, 255, 0.04)',
          boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 md:h-20 gap-4">

            {/* ── Logo ── */}
            <div className="flex-shrink-0">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle, #d4a017, transparent 70%)' }}
                  />
                  <img
                    src="/logo.png"
                    alt="Samrat Vikramaditya Samman"
                    className="relative w-12 md:w-14 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'drop-shadow(0 4px 12px rgba(212,160,23,0.3))' }}
                  />
                </div>
                {/* Text mark — visible on larger screens */}
                <div className="hidden md:block">
                  <p className="header-cinzel text-[10px] text-amber-500/50 tracking-[0.25em] uppercase font-semibold leading-none mb-0.5">
                    Vikramaditya
                  </p>
                  <p className="header-cinzel text-sm text-amber-100 font-bold tracking-wider leading-none">
                    Samman
                  </p>
                </div>
              </Link>
            </div>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="header-cinzel nav-link-underline px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-amber-300 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Right side: translate + nominate CTA ── */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Google Translate widget slot */}
              <div
                id="google_translate_element"
                className="flex items-center justify-center"
              />

              {/* Nominate CTA — desktop */}
              <Link
                href="/nominate"
                className="hidden lg:inline-flex items-center gap-2 header-cinzel px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0f] transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #f5c842 0%, #d4a017 60%, #b8860b 100%)',
                  boxShadow: '0 0 20px rgba(212,160,23,0.3), 0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                <StarIcon />
                Nominate Now
              </Link>

              {/* Hamburger */}
              <button
                className="lg:hidden p-2 text-white/60 hover:text-amber-400 transition-colors focus:outline-none focus:ring-1 focus:ring-amber-500/50 rounded-lg"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h12M4 18h8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] lg:hidden"
              style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-72 z-[70] flex flex-col lg:hidden overflow-y-auto gold-shimmer-border"
              style={{
                background: 'linear-gradient(160deg, #0d0a02 0%, #05050a 100%)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.8)',
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between p-6"
                style={{ borderBottom: '1px solid rgba(212,160,23,0.12)' }}
              >
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" className="w-10 h-auto"
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(212,160,23,0.4))' }}
                  />
                  <div>
                    <p className="header-cinzel text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">Vikramaditya</p>
                    <p className="header-cinzel text-white/40 text-[10px] tracking-widest uppercase">Samman</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-white/30 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col p-6 gap-1 flex-grow">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-4 rounded-xl text-white/60 hover:text-amber-300 hover:bg-amber-500/5 transition-all duration-200"
                    >
                      <span className="text-amber-500/30">
                        <StarIcon />
                      </span>
                      <span className="header-cinzel text-sm font-semibold uppercase tracking-[0.2em]">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="my-4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,160,23,0.2), transparent)' }} />

                {/* CTA in drawer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/nominate"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full header-cinzel px-6 py-4 rounded-xl text-sm font-bold uppercase tracking-[0.2em] text-[#0a0a0f]"
                    style={{
                      background: 'linear-gradient(135deg, #f5c842, #d4a017)',
                      boxShadow: '0 0 30px rgba(212,160,23,0.3)',
                    }}
                  >
                    <StarIcon />
                    Nominate Now
                  </Link>
                </motion.div>
              </nav>

              {/* Drawer footer */}
              <div className="p-6" style={{ borderTop: '1px solid rgba(212,160,23,0.08)' }}>
                <p className="header-nunito text-white/15 text-[10px] text-center uppercase tracking-[0.2em]">
                  Maharaja Vikramaditya Shodhpeeth
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}