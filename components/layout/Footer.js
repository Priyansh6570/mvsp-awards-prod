import Link from "next/link";

export default function Footer() {
  const categoryData = [
    { name: 'अंतर्राष्ट्रीय सम्मान', amount: '₹1 करोड़ 1 लाख', desc: 'विश्वस्तरीय योगदान हेतु' },
    { name: 'राष्ट्रीय सम्मान', amount: '₹21 लाख', desc: 'राष्ट्रीय स्तर पर उत्कृष्टता' },
    { name: 'शिखर सम्मान (तीन)', amount: '₹5-5 लाख', desc: 'मध्यप्रदेश विशेष' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@600;700&display=swap');

        .ftr-sans { font-family: 'Noto Sans Devanagari', sans-serif; }
        .ftr-serif { font-family: 'Noto Serif Devanagari', serif; }

        @keyframes ftr-shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(300%); }
        }
        .ftr-band-shine::after {
          content: '';
          position: absolute;
          inset-y: 0; width: 30%;
          background: linear-gradient(90deg, transparent, rgba(255,220,130,0.1), transparent);
          animation: ftr-shine 4s ease-in-out infinite;
        }

        .ftr-cta-btn {
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ftr-cta-btn::before {
          content: '';
          position: absolute; top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transition: left 0.5s ease;
        }
        .ftr-cta-btn:hover::before { left: 140%; }
        .ftr-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(200,134,10,0.38) !important; }

        .ftr-award-row {
          transition: background 0.2s, border-color 0.2s;
        }
        .ftr-award-row:hover {
          background: rgba(200,134,10,0.05);
          border-color: rgba(200,134,10,0.3);
        }

        .ftr-contact-link {
          transition: color 0.2s;
        }
        .ftr-contact-link:hover { color: #b8600a; }
      `}</style>

      {/* ── Pre-footer CTA Band ───────────────────────────── */}
      <div
        className="ftr-band-shine ftr-sans relative overflow-hidden text-center px-6 py-16"
        style={{ background: 'linear-gradient(135deg, #6b1414 0%, #8b2020 50%, #6b1414 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='rgba(200,134,10,0.07)' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[rgba(245,200,66,0.5)]" />
            <div className="w-2 h-2 bg-[#f5c842] rotate-45 opacity-80" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[rgba(245,200,66,0.5)]" />
          </div>

          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-[rgba(245,200,66,0.65)] mb-3">
            महत्वपूर्ण सूचना
          </p>
          <h3
            className="ftr-serif text-white mb-3"
            style={{ fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.25 }}
          >
            अपना नामांकन भेजें
          </h3>
          <p className="text-[15px] text-[rgba(253,232,192,0.78)] mb-6 leading-relaxed">
            सम्राट विक्रमादित्य सम्मान 2026 के लिए योग्य व्यक्तियों एवं संस्थाओं से आमंत्रण
          </p>

          <div className="inline-flex items-center gap-2 bg-[rgba(245,200,66,0.1)] border border-[rgba(245,200,66,0.35)] text-[#f5c842] text-[14px] font-semibold px-5 py-2.5 rounded-full mb-7">
            नामांकन की अंतिम तिथि: <strong className="text-[#ffe070] font-bold">20 मई 2026</strong>
          </div>

          <div>
            <Link
              href="/nominate"
              className="ftr-cta-btn inline-flex items-center gap-2.5 bg-gradient-to-br from-[#c8860a] via-[#e8a820] to-[#b07208] text-[#1a0c00] text-[14px] font-bold px-8 py-3.5 rounded-full shadow-[0_6px_28px_rgba(200,134,10,0.35)]"
              style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
              अभी नामांकन करें
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main Footer — light warm cream ───────────────── */}
      <footer
        className="ftr-sans relative overflow-hidden"
        style={{ background: 'linear-gradient(170deg, #fdf8ee 0%, #fffcf4 100%)', borderTop: '3px solid #c8860a' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-100" style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 20% 100%, rgba(200,134,10,0.05) 0%, transparent 60%)' }} />

        {/* Main grid */}
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-14 pb-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

          {/* Column 1: Brand */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#b8700a] mb-5 flex items-center gap-2">
              आयोजक
              <span className="flex-1 h-px bg-[rgba(200,134,10,0.2)]" />
            </p>
            <img
              src="/vikram-coin.png"
              alt="महाराजा विक्रमादित्य शोधपीठ"
              className="w-16 h-16 object-contain mb-4"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(200,134,10,0.2))' }}
            />
            <h4
              className="ftr-serif text-[#1a0800] mb-2"
              style={{ fontSize: 20, lineHeight: 1.3 }}
            >
              सम्राट विक्रमादित्य सम्मान
            </h4>
            <p
              className="text-[14px] text-[#6a4010] leading-relaxed mb-5"
              style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
            >
              महाराजा विक्रमादित्य शोधपीठ<br />
              संस्कृति विभाग, मध्यप्रदेश शासन
            </p>
            <div
              className="inline-flex items-center gap-2 bg-[rgba(200,134,10,0.08)] border border-[rgba(200,134,10,0.22)] text-[#8b5008] text-[11px] font-bold tracking-[0.14em] uppercase px-4 py-2 rounded-full"
              style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
            >
              <svg width="7" height="7" viewBox="0 0 10 10" fill="currentColor" className="opacity-70">
                <path d="M5 0L10 5L5 10L0 5Z" />
              </svg>
              सम्मान 2026
            </div>
          </div>

          {/* Column 2: Award Categories */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#b8700a] mb-5 flex items-center gap-2">
              सम्मान श्रेणियाँ
              <span className="flex-1 h-px bg-[rgba(200,134,10,0.2)]" />
            </p>
            <div className="space-y-1">
              {categoryData.map((cat, i) => (
                <div
                  key={i}
                  className="ftr-award-row flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-transparent"
                >
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[14px] font-semibold text-[#2a1000] mb-0.5 leading-snug"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      {cat.name}
                    </p>
                    <p
                      className="text-[12px] text-[#9a6030]"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      {cat.desc}
                    </p>
                  </div>
                  <span
                    className="ftr-serif text-[#b8600a] font-bold flex-shrink-0 text-right"
                    style={{ fontSize: i === 0 ? 16 : i === 1 ? 15 : 14 }}
                  >
                    {cat.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#b8700a] mb-5 flex items-center gap-2">
              संपर्क
              <span className="flex-1 h-px bg-[rgba(200,134,10,0.2)]" />
            </p>

            <div className="space-y-4">
              {[
                {
                  label: 'पता',
                  content: '1) महाराजा विक्रमादित्य शोधपीठ बिड़ला भवन, देवास रोड, उज्जैन\n 2) रवीन्द्र भवन परिसर, प्रथम तल, भोपाल',
                  href: null,
                },
                {
                  label: 'ईमेल',
                  content: 'samratvikramadityasamman@gmail.com',
                  href: 'mailto:samratvikramadityasamman@gmail.com',
                },
                {
                  label: 'दूरभाष',
                  content: '0755-4535064',
                  href: 'tel:07554535064',
                },
                {
                  label: 'वेबसाइट',
                  content: 'awards.mvspujjain.com',
                  href: 'https://awards.mvspujjain.com/',
                  ext: true,
                },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#b8700a] mb-1"
                    style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.ext ? '_blank' : undefined}
                      rel={item.ext ? 'noopener noreferrer' : undefined}
                      className="ftr-contact-link text-[14px] font-medium text-[#3a2000] leading-relaxed"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', textDecoration: 'none' }}
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p
                      className="text-[14px] text-[#3a2000] leading-relaxed whitespace-pre-line"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      {item.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="relative max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(200,134,10,0.15)' }}
        >
          <p
            className="text-[13px] text-[#9a6030]"
            style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
          >
            &copy; {new Date().getFullYear()} महाराजा विक्रमादित्य शोधपीठ · सर्वाधिकार सुरक्षित
          </p>

          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(200,134,10,0.4)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(200,134,10,0.25)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[rgba(200,134,10,0.4)]" />
          </div>

          {/* <a
            href="https://awards.mvspujjain.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-[#b8600a] hover:text-[#8b4008] transition-colors"
            style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', textDecoration: 'none' }}
          >
            awards.mvspujjain.com →
          </a> */}
        </div>
      </footer>
    </>
  );
}