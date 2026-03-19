"use client";

import { useState, useEffect, useRef } from 'react';

const CHANNEL_ID = 'UCpeZ-d1AJUKlJtSKpiHuUJw';

function VideoCard({ video }) {
  return (
    <a href={video.link} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl overflow-hidden border border-[rgba(200,134,10,0.13)] bg-white hover:shadow-[0_16px_48px_rgba(180,100,10,0.14)] hover:-translate-y-2 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden bg-[#f5edd8]">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(200,134,10,0.4)] transition-all duration-200">
            <svg className="w-4 h-4 text-[#b8600a] ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          </div>
        </div>
        {video.pubDate && (
          <div className="absolute bottom-2 left-2 bg-black/60 text-[#f5d87a] text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
            {new Date(video.pubDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        )}
      </div>
      <div className="px-4 py-3.5">
        <p className="text-[#2a1000] text-[13.5px] font-medium leading-relaxed line-clamp-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{video.title}</p>
      </div>
    </a>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3 justify-center mb-4">
      <div className={`h-px w-10 bg-gradient-to-r from-transparent ${light ? 'to-[rgba(245,200,66,0.5)]' : 'to-[rgba(200,134,10,0.45)]'}`} />
      <span className={`text-[11px] font-bold  uppercase ${light ? 'text-[#f5c842]' : 'text-[#b8700a]'}`} style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{children}</span>
      <div className={`h-px w-10 bg-gradient-to-l from-transparent ${light ? 'to-[rgba(245,200,66,0.5)]' : 'to-[rgba(200,134,10,0.45)]'}`} />
    </div>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-2.5 my-5">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(200,134,10,0.4)]" />
      <div className="w-1.5 h-1.5 bg-[#c8860a] rotate-45 opacity-60" />
      <div className="w-1 h-1 bg-[#c8860a] rotate-45 opacity-40" />
      <div className="w-1.5 h-1.5 bg-[#c8860a] rotate-45 opacity-60" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[rgba(200,134,10,0.4)]" />
    </div>
  );
}

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [hoveredAward, setHoveredAward] = useState(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
        const data = await res.json();
        const xml = new DOMParser().parseFromString(data.contents, 'application/xml');
        const entries = Array.from(xml.querySelectorAll('entry')).slice(0, 6);
        setVideos(entries.map(e => ({
          title: e.querySelector('title')?.textContent || '',
          link: e.querySelector('link')?.getAttribute('href') || '',
          videoId: e.querySelector('videoId')?.textContent || '',
          thumbnail: `https://i.ytimg.com/vi/${e.querySelector('videoId')?.textContent || ''}/mqdefault.jpg`,
          pubDate: e.querySelector('published')?.textContent || '',
        })).filter(v => v.videoId));
      } catch {
        setVideos([{ title: 'सम्राट विक्रमादित्य की लोककथाएँ', link: 'https://youtube.com/watch?v=SdpAKnWIaBA', thumbnail: '/poster.jpg', videoId: 'SdpAKnWIaBA', pubDate: '' }]);
      } finally {
        setVideosLoading(false);
      }
    })();
  }, []);

  const virtues = ['न्याय', 'दानशीलता', 'सुशासन', 'खगोल विज्ञान', 'ज्योतिष', 'कला', 'शौर्य', 'राजनय', 'आध्यात्म', 'भारतीय दर्शन', 'वेदान्त', 'विश्व कल्याण'];

  const virtueColors = [
    'bg-[#fdf4d8] text-[#8b4c08] border-[rgba(200,134,10,0.25)]',
    'bg-[#fef0e8] text-[#8b3a10] border-[rgba(180,80,20,0.22)]',
    'bg-[#edf7ee] text-[#2a6b30] border-[rgba(60,140,70,0.22)]',
    'bg-[#eef3fd] text-[#2a4a8b] border-[rgba(60,100,200,0.22)]',
    'bg-[#fdf4d8] text-[#7a4a08] border-[rgba(200,140,10,0.22)]',
    'bg-[#fdedf0] text-[#8b2a40] border-[rgba(180,50,70,0.22)]',
    'bg-[#f5eefe] text-[#5a2a8b] border-[rgba(120,60,200,0.22)]',
    'bg-[#edf7f5] text-[#1a6b5a] border-[rgba(30,140,110,0.22)]',
    'bg-[#fdf4d8] text-[#8b5008] border-[rgba(200,120,10,0.22)]',
    'bg-[#eef3fd] text-[#1a3a7b] border-[rgba(40,80,180,0.22)]',
    'bg-[#fdedf5] text-[#7b1a50] border-[rgba(160,40,100,0.22)]',
    'bg-[#edf7ee] text-[#1a5a30] border-[rgba(40,120,60,0.22)]',
  ];

  const virtueRotations = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2, -1, 1.5, -2, 1];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@500;600;700&display=swap');

        .pg-sans { font-family: 'Noto Sans Devanagari', sans-serif; }
        .pg-serif { font-family: 'Noto Serif Devanagari', serif; }

        @keyframes pg-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.65); }
        }
        .pg-dot-pulse { animation: pg-pulse 2.2s ease-in-out infinite; }

        @keyframes pg-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1.5deg); }
          66% { transform: translateY(-4px) rotate(-1deg); }
        }
        .pg-float { animation: pg-float 6s ease-in-out infinite; }

        @keyframes pg-spin-slow { to { transform: rotate(360deg); } }
        .pg-spin-slow { animation: pg-spin-slow 12s linear infinite; }

        @keyframes pg-shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .pg-skeleton {
          background: linear-gradient(90deg, #f5ecd4 25%, #fdf6e3 50%, #f5ecd4 75%);
          background-size: 1200px 100%;
          animation: pg-shimmer 1.6s infinite;
        }

        @keyframes pg-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(200,134,10,0.2), 0 8px 32px rgba(0,0,0,0.12); }
          50% { box-shadow: 0 0 40px rgba(200,134,10,0.4), 0 12px 48px rgba(0,0,0,0.16); }
        }
        .pg-coin-glow { animation: pg-glow-pulse 3s ease-in-out infinite; }

        .pg-cta-primary {
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .pg-cta-primary::before {
          content: '';
          position: absolute; top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .pg-cta-primary:hover::before { left: 140%; }
        .pg-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(184,96,10,0.42) !important; }

        .pg-award-card {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
        }
        .pg-award-card:hover { transform: translateY(-8px) scale(1.02); }

        .pg-virtue-tag {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease, background 0.2s;
          cursor: default;
        }
        .pg-virtue-tag:hover {
          transform: scale(1.12) rotate(0deg) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
          z-index: 10;
        }

        .pg-stat-float {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .pg-stat-float:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 20px 50px rgba(180,96,10,0.16);
        }

        .pg-legacy-trait {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
        }
        .pg-legacy-trait:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 12px 36px rgba(180,96,10,0.14);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="pg-sans bg-[#fffdf7] text-[#2a1000] overflow-x-hidden">

        {/* ═══════════════════════════════════════════════
            HERO split layout with right prize card
        ═══════════════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0500]">

          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/bg.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.18}px) scale(1.05)`,
              willChange: 'transform',
            }}
          />

          <div className="absolute inset-0 bg-[rgba(6,3,0,0.72)]" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-center">

            <div>
              <div className="inline-flex items-center gap-2.5 bg-[rgba(200,134,10,0.12)] border border-[rgba(200,134,10,0.32)] px-4 py-1.5 rounded-full mb-7">
                <span className="pg-dot-pulse w-[5px] h-[5px] rounded-full bg-[#f5c842] flex-shrink-0 inline-block" />
                <span className="text-[11px] font-bold  uppercase text-[#f5c842]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>नामांकन आमंत्रण 2026</span>
              </div>

              <p className="text-[11px] font-semibold  uppercase text-[rgba(245,200,66,0.55)] mb-5">
                महाराजा विक्रमादित्य शोधपीठ · संस्कृति विभाग · म.प्र. शासन
              </p>

              <h1 className="pg-serif leading-[1.08] mb-5">
                <span className="block text-white" style={{ fontSize: 'clamp(44px, 8vw, 90px)' }}>सम्राट</span>
                <span className="block pt-6" style={{ fontSize: 'clamp(44px, 8vw, 90px)', background: 'linear-gradient(135deg, #f5d87a 0%, #e8a820 45%, #c8860a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> विक्रमादित्य</span>
                <span className="block text-[rgba(255,240,200,0.78)] pg-sans font-semibold" style={{ fontSize: 'clamp(20px, 3vw, 30px)', marginTop: 6 }}>सम्मान 2026</span>
              </h1>

              <div className="inline-flex items-center gap-2 bg-[rgba(200,134,10,0.13)] border border-[rgba(200,134,10,0.28)] px-4 py-2 rounded-full mb-8">
                <span className="text-[13px] font-medium text-[rgba(245,220,160,0.85)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  विक्रम संवत् <strong className="text-[#f5c842] font-bold">2083</strong> · 19 मार्च 2026 से प्रारंभ
                </span>
              </div>

              <p className="text-[15px] text-[rgba(255,235,195,0.72)] leading-relaxed max-w-xl mb-8 font-normal" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                सम्राट विक्रमादित्य के गुणों न्याय, दानशीलता, शौर्य, कला एवं मानव कल्याण को जीवंत रखने के लिए दिया जाने वाला राष्ट्र का सर्वोच्च सम्मान।
              </p>

              <div className="flex flex-wrap gap-3.5">
                <a href="/about" className="inline-flex items-center gap-2 border border-[rgba(200,134,10,0.4)] text-[rgba(245,220,160,0.85)] hover:text-[#f5c842] hover:border-[rgba(200,134,10,0.7)] hover:bg-[rgba(200,134,10,0.09)] text-[13.5px] font-semibold px-6 py-3 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  परिचय पढ़ें
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[380px] mx-auto">

                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 z-20">
                  <div className="pg-spin-slow absolute inset-[-4px] rounded-full opacity-60" style={{ background: 'conic-gradient(from 0deg, #c8860a, #f5c842, #9a6008, #c8860a)' }} />
                  <div className="absolute inset-[2px] rounded-full bg-[#1a0e04]" />
                  <img src="/vikram-coin.png" alt="सम्राट विक्रमादित्य" className="pg-float pg-coin-glow relative z-10 w-full h-full object-contain rounded-full p-2" />
                </div>

                <div className="pg-award-card bg-[rgba(255,253,247,0.06)] backdrop-blur-md border border-[rgba(200,134,10,0.3)] rounded-3xl pt-20 pb-7 px-7 mt-10" style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(245,200,66,0.15)' }}>

                  <p className="text-center text-[10px] font-bold uppercase text-[rgba(245,200,66,0.6)] mb-5" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>पुरस्कार राशि</p>

                  <div className="space-y-3 mb-6">
                    {[
                      { level: 'अंतर्राष्ट्रीय', amount: '₹1 करोड़ 1 लाख', size: 'text-[22px]', accent: '#f5d87a' },
                      { level: 'राष्ट्रीय', amount: '₹21 लाख', size: 'text-[18px]', accent: '#e8a820' },
                      { level: 'शिखर सम्मान (×3)', amount: '₹5 लाख', size: 'text-[15px]', accent: '#c8860a' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-3 rounded-2xl bg-[rgba(255,255,255,0.05)] border border-[rgba(200,134,10,0.18)] hover:bg-[rgba(200,134,10,0.1)] hover:border-[rgba(200,134,10,0.38)] transition-all duration-200">
                        <span className="text-[12px] font-medium text-[rgba(255,235,195,0.7)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{p.level}</span>
                        <span className={`pg-serif font-bold ${p.size}`} style={{ color: p.accent }}>{p.amount}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    <a href="/nominate" className="pg-cta-primary flex items-center justify-center gap-2.5 w-full bg-gradient-to-br from-[#b8600a] via-[#cf7610] to-[#9a4c06] text-white text-[13.5px] font-bold py-3.5 rounded-2xl shadow-[0_6px_28px_rgba(184,96,10,0.35)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" className="opacity-80"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                      नामांकन करें
                    </a>
                    <div className="text-center">
                      <span className="text-[10.5px] text-[rgba(245,200,100,0.5)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>अंतिम तिथि: <strong className="text-[rgba(245,200,66,0.75)]">20 मई 2026</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            FLOATING STATS organic, not a rigid bar
        ═══════════════════════════════════════════════ */}
        <section className="relative py-12 px-5 md:px-10 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fff8ee 0%, #fffdf7 100%)' }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,134,10,0.2), transparent)' }} />
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { num: '₹1.01 Cr', label: 'सर्वोच्च पुरस्कार राशि', color: '#c8860a', bg: 'bg-gradient-to-br from-[#fff8e8] to-[#fdf0d0]', border: 'border-[rgba(200,134,10,0.2)]' },
                { num: '5', label: 'कुल पुरस्कार', color: '#8b2020', bg: 'bg-gradient-to-br from-[#fff4f4] to-[#fde8e8]', border: 'border-[rgba(180,40,40,0.15)]' },
                { num: 'संवत् 2083', label: 'विक्रम संवत्', color: '#2a6b30', bg: 'bg-gradient-to-br from-[#f0f9f1] to-[#e4f5e6]', border: 'border-[rgba(60,140,70,0.15)]' },
                { num: '20 मई', label: 'अंतिम तिथि 2026', color: '#1a3a8b', bg: 'bg-gradient-to-br from-[#f0f4fd] to-[#e4edfc]', border: 'border-[rgba(40,80,200,0.15)]' },
              ].map((s, i) => (
                <div key={i} className={`pg-stat-float ${s.bg} border ${s.border} rounded-2xl px-5 py-5 text-center shadow-[0_4px_24px_rgba(0,0,0,0.05)]`}>
                  <p className="pg-serif leading-none mb-2" style={{ fontSize: 'clamp(18px, 3vw, 26px)', color: s.color }}>{s.num}</p>
                  <p className="text-[11.5px] font-medium text-[#4a2a08]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            AWARD CATEGORIES hierarchy layout
        ═══════════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(170deg, #1a0a02 0%, #2a1206 50%, #1a0a02 100%)' }}>
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(200,134,10,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(180,60,20,0.1) 0%, transparent 45%)' }} />

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16">
              <SectionLabel light>पुरस्कार श्रेणियाँ</SectionLabel>
              <h2 className="pg-serif text-white" style={{ fontSize: 'clamp(30px, 5vw, 50px)' }}>सम्मान की श्रेणियाँ</h2>
              <p className="text-[15px] text-[rgba(245,220,170,0.6)] max-w-lg mx-auto mt-4" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                सम्राट विक्रमादित्य के बहुविध गुणों में उत्कृष्ट योगदान हेतु
              </p>
            </div>

            {[
              {
                tier: 1, level: 'अंतर्राष्ट्रीय सम्मान', tag: 'श्रेणी I', amount: '₹1 करोड़ 1 लाख',
                accentFrom: '#f5d87a', accentTo: '#c8860a',
                trophyFile: '/trophy-international.png', trophyNote: 'अंतर्राष्ट्रीय ट्रॉफी',
                trophySize: 'w-56 h-56',
                cardBg: 'from-[rgba(200,134,10,0.14)] to-[rgba(200,134,10,0.05)]',
                desc: 'विश्वस्तरीय योगदान न्याय, दानशीलता, सुशासन, खगोल विज्ञान, कला, शौर्य, राजनय, आध्यात्म, विश्व मानव कल्याण तथा भारतीय संस्कृति के उत्थान में।',
              },
              {
                tier: 2, level: 'राष्ट्रीय सम्मान', tag: 'श्रेणी II', amount: '₹21 लाख',
                accentFrom: '#e8a820', accentTo: '#a0500a',
                trophyFile: '/trophy-national.png', trophyNote: 'राष्ट्रीय ट्रॉफी',
                trophySize: 'w-44 h-44',
                cardBg: 'from-[rgba(180,80,10,0.12)] to-[rgba(180,80,10,0.04)]',
                desc: 'राष्ट्रीय स्तर पर सुशासन, शास्त्रीय साहित्य, खगोल विज्ञान, शौर्य, राजनय एवं जनकल्याण में असाधारण योगदान।',
              },
              {
                tier: 3, level: 'शिखर सम्मान', tag: 'श्रेणी III (तीन)', amount: '₹5 लाख × 3',
                accentFrom: '#d4820a', accentTo: '#6b3a1f',
                trophyFile: '/trophy-shikhar.png', trophyNote: 'शिखर ट्रॉफी',
                trophySize: 'w-36 h-36',
                cardBg: 'from-[rgba(140,60,10,0.1)] to-[rgba(140,60,10,0.03)]',
                desc: 'मध्यप्रदेश में कला, शौर्य, साहित्य, राजनय एवं सृजनात्मक जनकल्याण में उल्लेखनीय योगदान।',
              },
            ].map((a, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-10 last:mb-0`}>

                <div className={`flex-shrink-0 flex items-center justify-center ${i === 0 ? 'md:w-72' : i === 1 ? 'md:w-60' : 'md:w-52'}`}>
                  <div className={`relative group ${a.trophySize}`}>
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(circle, rgba(200,134,10,0.2) 0%, transparent 70%)` }} />
                    <img
                      src={a.trophyFile}
                      alt={a.trophyNote}
                      className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-400"
                      style={{ filter: 'drop-shadow(0 16px 40px rgba(200,134,10,0.25))' }}
                      onError={e => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden flex-col items-center justify-center w-full h-full rounded-2xl border-2 border-dashed border-[rgba(200,134,10,0.3)] text-[rgba(200,134,10,0.5)] text-[11px] text-center p-4" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mb-2 opacity-50"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <span>{a.trophyNote}</span>
                      <span className="opacity-60 text-[9px] mt-1">{a.trophyFile}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: `linear-gradient(135deg, ${a.accentFrom}, ${a.accentTo})`, color: '#1a0a00', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                      {a.tier}
                    </div>
                  </div>
                </div>

                <div className={`flex-1 pg-award-card bg-gradient-to-br ${a.cardBg} border border-[rgba(200,134,10,0.18)] rounded-3xl p-7 md:p-8`} style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)' }}>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <span className="inline-block text-[9.5px] font-bold  uppercase px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(200,134,10,0.15)', color: a.accentFrom, border: `1px solid ${a.accentTo}40`, fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{a.tag}</span>
                      <h3 className="pg-serif leading-snug" style={{ fontSize: i === 0 ? 28 : i === 1 ? 24 : 20, background: `linear-gradient(135deg, ${a.accentFrom}, ${a.accentTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{a.level}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold  uppercase text-[rgba(245,200,100,0.5)] mb-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>पुरस्कार राशि</p>
                      <p className="pg-serif" style={{ fontSize: i === 0 ? 30 : i === 1 ? 24 : 20, color: a.accentFrom, lineHeight: 1 }}>{a.amount}</p>
                    </div>
                  </div>
                  <p className="text-[13.5px] text-[rgba(245,225,190,0.72)] leading-relaxed mb-6" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{a.desc}</p>
                  <a href="/nominate" className="pg-cta-primary inline-flex items-center gap-2 bg-gradient-to-r from-[rgba(200,134,10,0.25)] to-[rgba(200,134,10,0.1)] border border-[rgba(200,134,10,0.35)] text-[rgba(245,210,140,0.9)] hover:text-white text-[12.5px] font-bold px-5 py-2.5 rounded-full transition-colors duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    नामांकन करें
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            VIKRAMADITYA LEGACY redesigned, not boring
        ═══════════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 bg-[#fffdf7] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,134,10,0.1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <SectionLabel>विरासत एवं प्रेरणा</SectionLabel>
              <h2 className="pg-serif text-[#1a0800]" style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>सम्राट विक्रमादित्य की अमर विरासत</h2>
              <GoldDivider />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '4/5', maxHeight: 520, boxShadow: '0 32px 80px rgba(180,96,10,0.18), 0 8px 24px rgba(0,0,0,0.1)' }}>
                  <img
                    src="/vikram-portrait.png"
                    alt="सम्राट विक्रमादित्य"
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden flex-col items-center justify-center w-full h-full bg-gradient-to-br from-[#fdf4d8] to-[#faefd0] border-2 border-dashed border-[rgba(200,134,10,0.3)] text-[rgba(200,134,10,0.5)] text-center p-8" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="mb-4 opacity-50"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    <p className="text-base font-medium">/public/vikram-portrait.png</p>
                    <p className="text-sm mt-2 opacity-70">सम्राट विक्रमादित्य का चित्र</p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(20,8,0,0.5)] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(200,134,10,0.06)]" />

                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[rgba(245,200,66,0.5)] rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[rgba(245,200,66,0.5)] rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[rgba(245,200,66,0.5)] rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[rgba(245,200,66,0.5)] rounded-br-lg" />

                  <div className="absolute bottom-5 left-5 right-5 bg-[rgba(10,5,0,0.7)] backdrop-blur-sm rounded-2xl px-5 py-3.5 border border-[rgba(200,134,10,0.2)]">
                    <p className="pg-serif mb-4 text-[#f5d87a] text-[15px] leading-snug italic">"न्याय, दान, और प्रजाहित सदैव प्रथम।"</p>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 mt-6 bg-white border border-[rgba(200,134,10,0.2)] rounded-2xl shadow-[0_12px_40px_rgba(180,96,10,0.14)] px-6 py-4 z-10">
                  <p className="text-[9px] font-bold  uppercase text-[#b8700a] mb-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>विक्रम संवत्</p>
                  <p className="pg-serif text-[28px] text-[#b8600a] leading-none">2083</p>
                </div>
              </div>

              <div>
                <p className="text-[15px] text-[#5a3810] leading-loose mb-8" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  सम्राट विक्रमादित्य के बहुविध गुणों को स्मरण करने एवं उन्हें जीवंत रखने के लिए यह सम्मान स्थापित किया गया है। विक्रम संवत् की परंपरा <strong className="text-[#8b4008] font-bold">57 ईसा पूर्व</strong> में प्रारंभ हुई। वर्ष 2026 में हम <strong className="text-[#8b4008] font-bold">विक्रम संवत् 2083</strong> का स्वागत कर रहे हैं।
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { icon: '⚖️', title: 'न्याय एवं धर्म', desc: 'सभी नागरिकों के लिए निष्पक्ष न्याय की अटूट परंपरा' },
                    { icon: '🏛️', title: 'सुशासन', desc: 'कुशल राज्य प्रबंधन और जनकल्याणकारी नीतियाँ' },
                    { icon: '🌟', title: 'विद्या एवं कला', desc: 'नवरत्नों के संरक्षक, साहित्य और विज्ञान के पोषक' },
                    { icon: '🌍', title: 'विश्व कल्याण', desc: 'वसुधैव कुटुम्बकम की भावना से मानव सेवा' },
                  ].map((t, i) => (
                    <div key={i} className="pg-legacy-trait bg-gradient-to-br from-[#fffdf7] to-[#fdf4d8] border border-[rgba(200,134,10,0.15)] rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                      <div className="text-2xl mb-2.5">{t.icon}</div>
                      <p className="text-[13.5px] font-bold text-[#6a3a08] mb-1.5" style={{ fontFamily: 'Noto Serif Devanagari, serif' }}>{t.title}</p>
                      <p className="text-[11.5px] text-[#8a5828] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{t.desc}</p>
                    </div>
                  ))}
                </div>

                <a href="/about" className="inline-flex items-center gap-2 border border-[rgba(180,96,10,0.3)] text-[#7a4010] hover:border-[rgba(180,96,10,0.6)] hover:bg-[rgba(200,134,10,0.06)] text-[13.5px] font-semibold px-5 py-3 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  सम्राट विक्रमादित्य का परिचय
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            VIRTUES fun floating chips on maroon bg
        ═══════════════════════════════════════════════ */}
        <section className="py-20 px-5 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6b1414 0%, #8b2020 50%, #6b1414 100%)' }}>
          <div className="absolute inset-0 opacity-100 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 0L50 25L25 50L0 25Z' fill='none' stroke='rgba(200,134,10,0.06)' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '50px 50px' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.35), transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.2), transparent)' }} />

          <div className="max-w-5xl mx-auto relative">
            <div className="text-center mb-12">
              <SectionLabel light>सम्मान के क्षेत्र</SectionLabel>
              <h2 className="pg-serif text-white" style={{ fontSize: 'clamp(26px, 4vw, 40px)' }}>किन क्षेत्रों में मिलता है यह सम्मान?</h2>
              <GoldDivider />
            </div>

            <div className="grid grid-cols-2 text-white text-xl sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                { label: 'न्याय', icon: '⚖' },
                { label: 'दानशीलता', icon: '🤲' },
                { label: 'सुशासन', icon: '🏛' },
                { label: 'खगोल विज्ञान', icon: '🔭' },
                { label: 'ज्योतिष', icon: '✨' },
                { label: 'कला', icon: '🎨' },
                { label: 'शौर्य', icon: '⚔' },
                { label: 'राजनय', icon: '🕊' },
                { label: 'आध्यात्म', icon: '🪔' },
                { label: 'भारतीय दर्शन', icon: '📿' },
                { label: 'वेदान्त', icon: '🕉' },
                { label: 'विश्व कल्याण', icon: '🌏' },
              ].map((v, i) => (
                <div
                  key={v.label}
                  className="group relative bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(200,134,10,0.15)] border border-[rgba(200,134,10,0.18)] hover:border-[rgba(200,134,10,0.5)] rounded-2xl px-4 py-4 flex items-center gap-3 transition-all duration-250 cursor-default"
                  style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg bg-[rgba(200,134,10,0.15)] group-hover:bg-[rgba(200,134,10,0.25)] transition-colors duration-200">
                    {v.icon}
                  </div>
                  <p className="text-[14px] font-semibold text-[rgba(255,235,195,0.9)] group-hover:text-white leading-snug transition-colors duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    {v.label}
                  </p>
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[rgba(200,134,10,0)] to-transparent group-hover:via-[rgba(200,134,10,0.4)] transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            YOUTUBE VIDEOS
        ═══════════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 bg-[#fffdf7]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-5 mb-12">
              <div>
                <SectionLabel>भारत विक्रम चैनल</SectionLabel>
                <h2 className="pg-serif text-[#1a0800]" style={{ fontSize: 'clamp(24px, 4vw, 38px)' }}>नवीनतम वीडियो</h2>
              </div>
              <a href="https://youtube.com/channel/UCpeZ-d1AJUKlJtSKpiHuUJw" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#c4302b] hover:bg-[#a82520] text-white text-[11px] font-bold uppercase px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(196,48,43,0.22)] transition-all duration-200 hover:-translate-y-0.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                YouTube
              </a>
            </div>

            {videosLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-[rgba(200,134,10,0.1)]">
                    <div className="pg-skeleton aspect-video" />
                    <div className="bg-white p-4 flex flex-col gap-2.5">
                      <div className="pg-skeleton h-3 rounded-full w-full" />
                      <div className="pg-skeleton h-3 rounded-full w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                  {videos.map((v, i) => <VideoCard key={v.videoId || i} video={v} />)}
                </div>
                {videos.length > 0 && (
                  <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[rgba(200,134,10,0.16)] shadow-[0_16px_60px_rgba(180,100,10,0.1)] mb-8">
                    <div className="bg-white px-4 py-3 border-b border-[rgba(200,134,10,0.1)] flex items-center gap-2.5">
                      <svg className="w-3.5 h-3.5 text-[#c4302b]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                      <span className="text-[9.5px] font-bold  uppercase text-[#b8880a]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>विशेष वीडियो</span>
                    </div>
                    <div className="aspect-video">
                      <iframe className="w-full h-full border-none block" src={`https://www.youtube.com/embed/${videos[0].videoId}`} title={videos[0].title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <a href="https://youtube.com/playlist?list=PLYJAqKuuEKfBIs9GPN8r-eu39-uD4EpWW" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[rgba(180,96,10,0.3)] text-[#7a4010] hover:border-[rgba(180,96,10,0.6)] hover:bg-[rgba(200,134,10,0.05)] text-[13px] font-semibold px-6 py-3 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    पूरी प्लेलिस्ट देखें
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            CONTACT / NOMINATION CTA
        ═══════════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #faefd0 0%, #fdf6e3 50%, #faefd0 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(200,134,10,0.08) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(180,60,20,0.06) 0%, transparent 40%)' }} />

          <div className="max-w-3xl mx-auto text-center relative">
            <SectionLabel>अंतिम तिथि से पूर्व</SectionLabel>
            <h2 className="pg-serif text-[#1a0800] mb-2" style={{ fontSize: 'clamp(28px, 5vw, 46px)' }}>अभी नामांकन करें</h2>
            <p className="pg-serif mb-2" style={{ fontSize: 'clamp(22px, 4vw, 36px)', background: 'linear-gradient(135deg, #b8600a, #d4820a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>सम्मान 2026</p>
            <GoldDivider />

            <p className="text-[14.5px] text-[#6a4010] leading-loose mb-10" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              {/* संबंधित व्यक्ति अथवा संस्था का पृथक-पृथक उल्लेख करते हुए स्पष्ट अनुशंसाएँ नीचे उल्लिखित पते पर <strong className="text-[#9a4008] font-bold">20 मई 2026</strong> तक भेजना आमंत्रित हैं। */}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10 text-left">
              {[
                { l: 'पता', v: 'निदेशक, महाराजा विक्रमादित्य शोधपीठ\nरवीन्द्र भवन परिसर, प्रथम तल, भोपाल', href: null },
                { l: 'ईमेल', v: 'samratvikramadityasamman@gmail.com', href: 'mailto:samratvikramadityasamman@gmail.com' },
                { l: 'दूरभाष', v: '0755-4535064', href: 'tel:07554535064' },
                { l: 'वेबसाइट', v: 'awards.mvspujjain.com', href: 'https://awards.mvspujjain.com', ext: true },
              ].map(item => (
                <div key={item.l} className="group bg-white border border-[rgba(200,134,10,0.14)] rounded-2xl px-5 py-4 hover:shadow-[0_12px_40px_rgba(180,100,10,0.1)] hover:-translate-y-1 transition-all duration-200">
                  <p className="text-[9.5px] font-bold  uppercase text-[#b8880a] mb-1.5" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{item.l}</p>
                  {item.href ? (
                    <a href={item.href} target={item.ext ? '_blank' : undefined} rel={item.ext ? 'noopener noreferrer' : undefined} className="text-[13.5px] font-semibold text-[#9a4008] hover:text-[#b8600a] transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{item.v}</a>
                  ) : (
                    <p className="text-[13px] text-[#3a2000] font-medium whitespace-pre-line" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{item.v}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/nominate" className="pg-cta-primary inline-flex items-center gap-2.5 text-white text-[13.5px] font-bold px-8 py-3.5 rounded-full shadow-[0_6px_24px_rgba(123,30,30,0.28)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', background: 'linear-gradient(135deg, #7b1e1e 0%, #9c2a2a 55%, #6b1414 100%)' }}>
                <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" className="opacity-75"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                नामांकन प्रारंभ करें
              </a>
              <a href="/rules" className="inline-flex items-center gap-2 border border-[rgba(180,96,10,0.3)] text-[#7a4010] hover:border-[rgba(180,96,10,0.6)] hover:bg-[rgba(200,134,10,0.06)] text-[13px] font-semibold px-6 py-3.5 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                नियमावली पढ़ें
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}