"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const DownloadForms = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / 30,
        y: (e.clientY - rect.top - rect.height / 2) / 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F2] relative overflow-x-hidden">
      {/* ─────── Ambient background gradient mesh ─────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #E8B86D 0%, transparent 70%)",
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div
          className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, #C97B7B 0%, transparent 70%)",
            transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full opacity-25 blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #D4B483 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Subtle grain texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10">
        {/* ════════════════ HERO ════════════════ */}
        <section ref={heroRef} className="pt-24 md:pt-32 pb-12 px-5">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#E8DCC4] shadow-sm mb-7 animate-fade-down">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A0700A] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#A0700A]" />
              </span>
              <span className="text-[11px] tracking-[0.15em] uppercase text-[#7A5008] font-medium">
                अंतिम तिथि · 20 मई 2026
              </span>
            </div>

            <h1
              className="text-3xl md:text-5xl font-semibold text-[#1F1611] leading-[1.15] tracking-tight mb-5 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              नामांकन प्रपत्र
              <br />
              <span className="text-[#9C6B1F] font-normal italic">
                डाउनलोड करें
              </span>
            </h1>

            <p
              className="text-[15px] md:text-base text-[#5C4A36] max-w-md mx-auto leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              सम्राट विक्रमादित्य सम्मान हेतु नामांकन प्रपत्र अपनी सुविधानुसार किसी भी भाषा में
              प्राप्त करें।
            </p>
          </div>
        </section>

        {/* ════════════════ DOWNLOAD CARD (single) ════════════════ */}
        <section className="px-5 pb-20">
          <div className="max-w-2xl mx-auto">
            <div
              className="group relative animate-fade-up"
              style={{ animationDelay: "0.35s" }}
            >
              {/* Soft glow under card */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E8B86D]/20 via-[#D4B483]/30 to-[#C97B7B]/20 rounded-[28px] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

              <div className="relative bg-white/70 backdrop-blur-xl border border-white/80 rounded-[28px] p-7 md:p-10 shadow-[0_8px_40px_-12px_rgba(160,112,10,0.15)]">
                {/* Top row: icon + label */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FAF3E0] to-[#E8DCC4] flex items-center justify-center shadow-sm">
                      <svg
                        className="w-5 h-5 text-[#9C6B1F]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#1F1611]">
                        नामांकन प्रपत्र
                      </p>
                      <p className="text-[11px] text-[#8A7355]">
                        Nomination Form · PDF
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF3E0]/80 border border-[#E8DCC4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                    <span className="text-[10px] font-medium text-[#5C4A36] tracking-wide">
                      उपलब्ध
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <DownloadButton
                    primary
                    href="/nominate/nomination_form_hi.pdf"
                    label="हिंदी"
                    sublabel="Devanagari"
                  />
                  <DownloadButton
                    href="/nominate/nomination_form_en.pdf"
                    label="English"
                    sublabel="अंग्रेज़ी"
                  />
                </div>

                {/* Helper text */}
                <p className="text-center text-xs text-[#8A7355] mt-6 leading-relaxed">
                  फ़ाइल आकार लगभग 1.4MB · 14 पृष्ठ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ DIVIDER ════════════════ */}
        <div className="flex items-center justify-center gap-3 px-5 pb-16 max-w-md mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4B483]/50" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#9C6B1F] font-medium">
            जमा करने की प्रक्रिया
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4B483]/50" />
        </div>

        {/* ════════════════ SUBMISSION METHODS ════════════════ */}
        <section className="px-5 pb-24">
          <div className="max-w-2xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1F1611] tracking-tight mb-3">
                तीन माध्यम, एक लक्ष्य
              </h2>
              <p className="text-sm text-[#5C4A36] leading-relaxed max-w-md mx-auto">
                नीचे दिए तीन माध्यमों में से किसी एक द्वारा प्रपत्र जमा करें। अंतिम दिन की
                प्रतीक्षा न करें।
              </p>
            </div>

            {/* Method 01 — Post */}
            <Method
              num="01"
              title="डाक द्वारा"
              icon={<PostIcon />}
              delay="0"
            >
              <p className="text-[14px] text-[#5C4A36] mb-5 leading-relaxed">
                पूर्णतः भरा हुआ प्रपत्र तथा समस्त सहायक दस्तावेज़ निम्नलिखित किसी भी पते पर भेजें:
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <Address
                  city="उज्जैन कार्यालय"
                  lines={[
                    "महाराजा विक्रमादित्य शोधपीठ,",
                    "बिड़ला भवन, देवास रोड,",
                    "उज्जैन, मध्यप्रदेश",
                  ]}
                />
                <Address
                  city="भोपाल कार्यालय"
                  lines={[
                    "महाराजा विक्रमादित्य शोधपीठ,",
                    "रवींद्र सभागम केंद्र, प्रथम तल,",
                    "रवीन्द्र भवन परिसर, भोपाल, मध्यप्रदेश",
                  ]}
                />
              </div>

              <p className="text-[12px] text-[#8A7355] italic mt-5 leading-relaxed">
                लिफ़ाफ़े पर स्पष्ट रूप से ‘सम्राट विक्रमादित्य सम्मान — नामांकन प्रपत्र’ अंकित
                करें।
              </p>
            </Method>

            {/* Method 02 — Email */}
            <Method
              num="02"
              title="ईमेल द्वारा"
              icon={<EmailIcon />}
              delay="100"
            >
              <p className="text-[14px] text-[#5C4A36] mb-5 leading-relaxed">
                पूर्णतः भरे हुए प्रपत्र तथा समस्त सहायक दस्तावेज़ों को एकल{" "}
                <span className="font-semibold text-[#1F1611]">PDF फ़ाइल</span> में स्कैन कर
                निम्नलिखित ईमेल पते पर प्रेषित करें:
              </p>

              <a
                href="mailto:samratvikramadityasamman@gmail.com"
                className="group/mail block"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-[#FAF3E0]/60 to-[#F5EDD8]/40 border border-[#E8DCC4] hover:border-[#9C6B1F]/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:flex w-9 h-9 rounded-xl bg-white/70 items-center justify-center text-[#9C6B1F] shrink-0 border border-[#E8DCC4]">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <p className="text-[10px] text-[#8A7355] tracking-wider uppercase mb-0.5">
                        ईमेल पता
                      </p>
                      <p className="text-[13px] sm:text-[14px] font-mono font-medium text-[#1F1611] truncate group-hover/mail:text-[#9C6B1F] transition-colors">
                        samratvikramadityasamman@gmail.com
                      </p>
                    </div>
                    <svg
                      className="w-4 h-4 text-[#9C6B1F] shrink-0 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17l9.2-9.2M17 17V7H7"
                      />
                    </svg>
                  </div>
                </div>
              </a>

              <p className="text-[12px] text-[#8A7355] italic mt-5 leading-relaxed">
                विषय पंक्ति में लिखें: ‘सम्राट विक्रमादित्य सम्मान — नामांकन प्रपत्र — [आपका
                नाम]’। स्कैन स्पष्ट एवं सुपाठ्य हो।
              </p>
            </Method>

            {/* Method 03 — Online */}
            <Method
              num="03"
              title="ऑनलाइन प्रपत्र"
              icon={<OnlineIcon />}
              delay="200"
              accent
            >
              <p className="text-[14px] text-[#5C4A36] mb-5 leading-relaxed">
                ऑनलाइन नामांकन में फ़ाइलें सीधे अपलोड की जा सकती हैं — स्कैन की आवश्यकता नहीं।
              </p>

              <Link href="/nominate" className="group/link block">
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1F1611] via-[#2A1F18] to-[#1F1611] rounded-2xl p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#9C6B1F]/20">
                  {/* Shimmer */}
                  <div className="absolute inset-0 -translate-x-full group-hover/link:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#E8B86D]/15 to-transparent" />

                  <div className="relative flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-[#E8B86D] tracking-wider uppercase mb-1.5 font-medium">
                        अनुशंसित माध्यम
                      </p>
                      <p className="text-white text-base sm:text-lg font-semibold mb-0.5">
                        अभी ऑनलाइन नामांकन करें
                      </p>
                      <p className="text-[#D4B483] text-[11px] font-mono truncate">
                        awards.mvspujjain.com/nominate
                      </p>
                    </div>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#E8B86D] to-[#9C6B1F] flex items-center justify-center shrink-0 group-hover/link:scale-110 group-hover/link:rotate-12 transition-transform duration-300 shadow-lg">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </Method>

            {/* Help note */}
            <div className="mt-10 flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-br from-[#F0FDF4]/60 to-transparent border border-[#86EFAC]/40">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-[#15803D]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-[13px] text-[#15803D] leading-relaxed">
                <span className="font-semibold">सहायता एवं पूछताछ हेतु:</span> किसी भी प्रश्न
                अथवा सहायता हेतु उपर्युक्त ईमेल पर संपर्क करें। प्रपत्र भरने से पूर्व ‘नामांकन
                मार्गदर्शिका’ अवश्य पढ़ें — यह वेबसाइट पर उपलब्ध है।
              </p>
            </div>
          </div>
        </section>

        {/* Footer line */}
        <div className="text-center pb-16 px-4">
          <p className="text-[11px] tracking-wider italic text-[#8A7355]">
            मध्यप्रदेश शासन · संस्कृति विभाग
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-down {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        .animate-fade-down {
          animation: fade-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
      `}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════ */

const DownloadButton = ({ primary, href, label, sublabel }) => (
  <a
    href={href}
    download
    className={`group/btn relative overflow-hidden flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
      primary
        ? "bg-[#1F1611] hover:bg-[#2A1F18] text-white shadow-lg shadow-[#1F1611]/20 hover:shadow-xl hover:shadow-[#1F1611]/30"
        : "bg-white/80 hover:bg-white border border-[#E8DCC4] hover:border-[#9C6B1F]/40 text-[#1F1611] hover:shadow-md"
    }`}
  >
    {/* Shimmer */}
    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

    <div className="relative flex flex-col items-start">
      <span className="text-base font-semibold leading-none mb-1">{label}</span>
      <span
        className={`text-[10px] tracking-wider uppercase ${
          primary ? "text-[#E8B86D]" : "text-[#8A7355]"
        }`}
      >
        {sublabel}
      </span>
    </div>

    <div
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/btn:translate-y-0.5 ${
        primary
          ? "bg-white/10 group-hover/btn:bg-white/20"
          : "bg-[#FAF3E0] group-hover/btn:bg-[#E8DCC4]"
      }`}
    >
      <svg
        className={`w-4 h-4 ${primary ? "text-white" : "text-[#9C6B1F]"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    </div>
  </a>
);

const Method = ({ num, title, icon, children, delay, accent }) => (
  <div
    className="relative mb-5 animate-fade-up"
    style={{ animationDelay: `${0.1 + Number(delay) / 1000}s` }}
  >
    <div
      className={`relative bg-white/70 backdrop-blur-xl border rounded-[24px] p-6 md:p-7 shadow-[0_4px_20px_-8px_rgba(160,112,10,0.1)] hover:shadow-[0_8px_30px_-8px_rgba(160,112,10,0.18)] transition-all duration-500 ${
        accent
          ? "border-[#E8B86D]/40 bg-gradient-to-br from-white/80 to-[#FAF3E0]/30"
          : "border-white/80"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FAF3E0] to-[#E8DCC4] flex items-center justify-center text-[#9C6B1F] border border-white shadow-sm">
            {icon}
          </div>
          <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-md bg-[#1F1611] text-[#E8B86D] shadow-sm">
            {num}
          </span>
        </div>
        <div className="pt-1">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A7355] mb-1">
            माध्यम
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-[#1F1611] leading-tight">
            {title}
          </h3>
        </div>
      </div>

      {children}
    </div>
  </div>
);

const Address = ({ city, lines }) => (
  <div className="group/addr relative bg-white/60 hover:bg-white/90 border border-[#E8DCC4]/60 hover:border-[#9C6B1F]/30 rounded-xl p-4 transition-all duration-300">
    <div className="flex items-center gap-2 mb-2.5">
      <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#9C6B1F] to-[#E8B86D]" />
      <h4 className="text-[13px] font-semibold text-[#1F1611]">{city}</h4>
    </div>
    <div className="text-[12.5px] text-[#5C4A36] leading-[1.6] space-y-0.5">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  </div>
);

/* ─── Icons ─── */
const PostIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const OnlineIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

export default DownloadForms;