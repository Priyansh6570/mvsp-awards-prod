"use client";

import Link from 'next/link';
import { useState } from 'react';

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

const navratnas = [
  { name: 'कालिदास', domain: 'काव्य एवं साहित्य', desc: 'संस्कृत के महानतम कवि और नाटककार। अभिज्ञानशाकुन्तलम्, मेघदूत, रघुवंश और कुमारसम्भव जैसी अमर कृतियों के रचयिता।', icon: '📜', verified: true },
  { name: 'धन्वन्तरि', domain: 'आयुर्वेद एवं चिकित्सा', desc: 'आयुर्वेद के महान आचार्य। परंपरा के अनुसार विक्रमादित्य के दरबार में इनकी उपस्थिति आयुर्वेदिक ज्ञान की दृष्टि से उल्लेखनीय है।', icon: '🌿', verified: true },
  { name: 'वराहमिहिर', domain: 'खगोल एवं ज्योतिष', desc: 'उज्जैन के महान खगोलशास्त्री। बृहत्संहिता, पंचसिद्धान्तिका जैसे ग्रंथों के रचयिता। इनकी ऐतिहासिक स्थिति सर्वाधिक प्रमाणित है।', icon: '⭐', verified: true },
  { name: 'वररुचि', domain: 'व्याकरण एवं भाषाविज्ञान', desc: 'संस्कृत व्याकरण के प्रकाण्ड विद्वान। काव्य एवं साहित्यशास्त्र में असाधारण योगदान।', icon: '✍️', verified: true },
  { name: 'शङ्कु', domain: 'वास्तु एवं स्थापत्य', desc: 'वास्तुशास्त्र के मर्मज्ञ और विक्रमादित्य युग के प्रमुख वास्तुकार। उज्जैन की भव्य नगर-रचना में योगदान।', icon: '🏛', verified: true },
  { name: 'वेताल भट्ट', domain: 'तंत्र एवं शास्त्र', desc: 'तंत्रशास्त्र, आध्यात्म और गूढ़विद्या के विशेषज्ञ। नीतिप्रद्यौत के रचयिता।', icon: '🕉', verified: true },
  { name: 'घटकर्पर', domain: 'कला एवं मूर्तिकला', desc: 'विक्रमादित्य के दरबार के प्रतिष्ठित कवि और मूर्तिकार। इनकी काव्यरचनाएँ संस्कृत साहित्य की अनमोल धरोहर हैं।', icon: '🎨', verified: true },
  { name: 'क्षपणक', domain: 'जैन दर्शन एवं तर्कशास्त्र', desc: 'जैन दर्शन और न्यायशास्त्र के विद्वान। विक्रमादित्य के सर्वधर्म समन्वय के प्रतीक।', icon: '⚖', verified: true },
  { name: 'अमरसिंह', domain: 'शब्दकोश एवं लेक्सिकोग्राफी', desc: 'अमरकोश के रचयिता संस्कृत का सबसे प्रसिद्ध और प्राचीन समानार्थी शब्दकोश, जो आज भी अध्ययन किया जाता है।', icon: '📚', verified: true },
];

const timeline = [
  { year: 'लगभग प्रथम शताब्दी ईसा पूर्व', event: 'विक्रमादित्य का उदय', detail: 'उज्जयिनी (उज्जैन) में सम्राट विक्रमादित्य का राज्याभिषेक। भारतवर्ष में न्याय, विद्या और संस्कृति का स्वर्ण युग आरंभ।' },
  { year: '57 ईसा पूर्व', event: 'विक्रम संवत् की स्थापना', detail: 'शकों पर निर्णायक विजय और भारतवर्ष की मुक्ति के उपलक्ष्य में सम्राट ने विक्रम संवत् आरंभ किया। यह पंचांग आज भी सम्पूर्ण भारत में प्रचलित है।' },
  { year: 'स्वर्ण काल', event: 'नवरत्नों का संरक्षण', detail: 'कालिदास, वराहमिहिर, अमरसिंह सहित नौ महारत्न विक्रमादित्य के दरबार में पल्लवित हुए। उज्जैन विश्व की ज्ञान राजधानी बनी।' },
  { year: 'चिरकालीन', event: 'सिंहासन बत्तीसी की परंपरा', detail: 'विक्रमादित्य के 32 सोने के सिंहासनों की कथाएँ (सिंहासन बत्तीसी) और बेताल पचीसी भारतीय साहित्य की अनमोल विरासत हैं।' },
  { year: '2009', event: 'शोधपीठ की स्थापना', detail: 'महाराजा विक्रमादित्य शोधपीठ की स्थापना मध्यप्रदेश शासन संस्कृति विभाग के अधीन विक्रमादित्य के जीवन और विरासत के व्यवस्थित शोध हेतु।' },
  { year: '2026', event: 'वैश्विक सम्मान', detail: 'सम्राट विक्रमादित्य सम्मान के लिए विश्वभर से नामांकन आमंत्रित। विक्रमादित्य के गुणों को आधुनिक युग में जीवंत रखने वाले व्यक्तियों और संस्थाओं को सम्मानित करने की ऐतिहासिक पहल।' },
];

export default function AboutPage() {
  const [expandedNavratna, setExpandedNavratna] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@500;600;700&display=swap');

        .ab-sans { font-family: 'Noto Sans Devanagari', sans-serif; }
        .ab-serif { font-family: 'Noto Serif Devanagari', serif; }

        @keyframes ab-shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .ab-shimmer-line {
          background: linear-gradient(90deg, transparent, rgba(200,134,10,0.4), transparent);
          background-size: 800px 100%;
          animation: ab-shimmer 3s ease-in-out infinite;
        }

        @keyframes ab-spin-slow { to { transform: rotate(360deg); } }
        .ab-spin-slow { animation: ab-spin-slow 14s linear infinite; }

        @keyframes ab-breathe {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        .ab-breathe { animation: ab-breathe 4s ease-in-out infinite; }

        @keyframes ab-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.65); }
        }
        .ab-dot-pulse { animation: ab-dot-pulse 2.2s ease-in-out infinite; }

        .ab-cta-shine {
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ab-cta-shine::before {
          content: '';
          position: absolute; top: 0; left: -80%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        .ab-cta-shine:hover::before { left: 140%; }
        .ab-cta-shine:hover { transform: translateY(-2px); }

        .ab-card-hover {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        }
        .ab-card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 48px rgba(180,96,10,0.12);
        }

        .ab-navratna-card {
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ab-navratna-card:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 12px 40px rgba(180,96,10,0.11);
        }

        .ab-timeline-dot {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ab-timeline-item:hover .ab-timeline-dot {
          transform: scale(1.4);
          box-shadow: 0 0 0 6px rgba(200,134,10,0.15);
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="ab-sans bg-[#fffdf7] text-[#2a1000] overflow-x-hidden">

        {/* ══════════════════════════════════════════
            PAGE HERO light, ornate, centered
        ══════════════════════════════════════════ */}
        <section className="relative py-28 md:py-36 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf4 60%, #fef4dc 100%)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-100" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 26 L26 0 L52 26 L26 52Z' stroke='%23c8860a' stroke-width='0.5' fill='none' opacity='0.06'/%3E%3C/svg%3E")`, backgroundSize: '52px 52px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,134,10,0.08) 0%, transparent 65%)' }} />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2.5 bg-white/80 border border-[rgba(200,134,10,0.3)] px-5 py-2 rounded-full mb-8 shadow-[0_4px_16px_rgba(200,134,10,0.08)]">
              <span className="ab-dot-pulse w-[5px] h-[5px] rounded-full bg-[#c8860a] inline-block flex-shrink-0" />
              <span className="text-[10.5px] font-bold  uppercase text-[#8b5008]">अमर विरासत</span>
            </div>

            <p className="ab-serif italic text-[rgba(200,134,10,0.5)] mb-4" style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}>
              ॥ विक्रमार्कस्य वंशे जातः ॥
            </p>

            <h1 className="ab-serif leading-snug mb-6" style={{ paddingTop: '0.05em' }}>
              <span
                className="block"
                style={{
                  fontSize: 'clamp(48px, 9vw, 96px)',
                  background: 'linear-gradient(135deg, #8b5008 0%, #c8860a 40%, #e8a820 70%, #b8700a 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.2,
                }}
              >
                सम्राट
              </span>
              <span
                className="block text-[#1a0800]"
                style={{ fontSize: 'clamp(36px, 7vw, 76px)', lineHeight: 1.25, paddingTop: '0.05em' }}
              >
                विक्रमादित्य
              </span>
            </h1>

            <div className="ab-shimmer-line h-px w-64 mx-auto mb-7 rounded-full" />

            <p className="text-[16px] text-[#6a4010] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              उज्जयिनी के सम्राट, धर्म के रक्षक, विद्या के संरक्षक जिनका नाम भारत में आदर्श राजत्व का पर्याय बन गया।
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {['उज्जयिनी के सम्राट', 'चक्रवर्ती', 'शकारि', 'नवरत्नों के संरक्षक'].map(tag => (
                <span key={tag} className="text-[11px] font-semibold text-[#7a4808] bg-[rgba(200,134,10,0.08)] border border-[rgba(200,134,10,0.2)] px-3.5 py-1.5 rounded-full" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHO WAS VIKRAMADITYA
        ══════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            <div>
              <SectionLabel>महान सम्राट</SectionLabel>
              <h2 className="ab-serif text-[#1a0800] mb-6 leading-snug" style={{ fontSize: 'clamp(26px, 4vw, 40px)', paddingTop: '0.05em' }}>
                विक्रमादित्य कौन थे?
              </h2>
              <GoldDivider />

              <div className="space-y-4 mt-6">
                {[
                  'सम्राट विक्रमादित्य उज्जयिनी (वर्तमान उज्जैन) के महान चक्रवर्ती सम्राट थे। उनका शासनकाल न्याय, विद्या और संस्कृति का स्वर्ण युग माना जाता है।',
                  'उन्होंने शक आक्रमणकारियों को परास्त कर भारतवर्ष को मुक्त कराया और <strong class="text-[#3a1800]">शकारि</strong> की उपाधि प्राप्त की। इस ऐतिहासिक विजय के उपलक्ष्य में उन्होंने <strong class="text-[#3a1800]">विक्रम संवत्</strong> (57 ईसा पूर्व) की स्थापना की, जो आज भी भारत में प्रचलित है।',
                  'उनकी न्याय-प्रियता की कथाएँ पूरे भारत में प्रसिद्ध हैं। वे सामान्य नागरिकों की पुकार सुनने के लिए स्वयं भेष बदलकर जनता के बीच जाते थे। उनका नाम किसी भी न्यायप्रिय और विद्वान शासक के लिए पर्याय बन गया।',
                  'सिंहासन बत्तीसी (32 सिंहासन कथाएँ) और बेताल पचीसी जैसे साहित्यिक ग्रंथ उनकी जीवंत विरासत हैं। प्राचीन शिलालेख, ताम्रपत्र और हस्तलिखित पांडुलिपियाँ उनके ऐतिहासिक अस्तित्व के प्रमाण हैं।',
                ].map((para, i) => (
                  <p key={i} className="text-[14px] text-[#5a3810] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.mvspujjain.com" target="_blank" rel="noopener noreferrer" className="ab-cta-shine inline-flex items-center gap-2 bg-gradient-to-br from-[#b8600a] via-[#cf7610] to-[#9a4c06] text-white text-[12px] font-bold px-5 py-3 rounded-full shadow-[0_4px_18px_rgba(184,96,10,0.28)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  आधिकारिक वेबसाइट
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                </a>
                <Link href="/rules" className="inline-flex items-center gap-2 border border-[rgba(180,96,10,0.3)] text-[#7a4010] hover:border-[rgba(180,96,10,0.6)] hover:bg-[rgba(200,134,10,0.05)] text-[12px] font-semibold px-5 py-3 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  नामांकन नियमावली
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#fdf8ee] to-[#fdf4d8] border border-[rgba(200,134,10,0.15)] rounded-3xl p-8 shadow-[0_8px_40px_rgba(200,134,10,0.07)]">
              <p className="text-[9.5px] font-bold  uppercase text-[#b8700a] mb-6" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>मुख्य तथ्य</p>
              {[
                { label: 'राजधानी', value: 'उज्जयिनी (उज्जैन), मध्यप्रदेश' },
                { label: 'कालखण्ड', value: 'प्रथम शताब्दी ईसा पूर्व (अनुमानित)' },
                { label: 'विक्रम संवत्', value: '57 ईसा पूर्व में स्थापित आज भी प्रचलित' },
                { label: 'उपाधियाँ', value: 'चक्रवर्ती · शकारि · विक्रमादित्य' },
                { label: 'दरबार', value: 'नवरत्न नौ महान विद्वानों का दरबार' },
                { label: 'साहित्यिक विरासत', value: 'सिंहासन बत्तीसी एवं बेताल पचीसी' },
                { label: 'पुरातात्विक प्रमाण', value: 'सिक्के, ताम्रपत्र, शिलालेख (विक्रम संवत् युग)' },
                { label: 'आधुनिक शोध संस्था', value: 'महाराजा विक्रमादित्य शोधपीठ, स्थापना 2009' },
              ].map(f => (
                <div key={f.label} className="flex gap-4 items-baseline border-b border-[rgba(200,134,10,0.1)] pb-3.5 mb-3.5 last:border-0 last:pb-0 last:mb-0">
                  <span className="text-[10px] font-bold uppercase  text-[#b8700a] w-28 flex-shrink-0" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{f.label}</span>
                  <span className="text-[13px] text-[#3a2000] font-medium leading-snug" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            VIRTUES 6 cards on light bg
        ══════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf4 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(200,134,10,0.06) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(180,40,20,0.04) 0%, transparent 40%)' }} />

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-14">
              <SectionLabel>सम्राट के गुण</SectionLabel>
              <h2 className="ab-serif text-[#1a0800]" style={{ fontSize: 'clamp(26px, 4vw, 42px)', paddingTop: '0.05em' }}>महानता के अनेक आयाम</h2>
              <GoldDivider />
              <p className="text-[14.5px] text-[#7a4a18] max-w-xl mx-auto leading-relaxed mt-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                विक्रमादित्य केवल विजेता नहीं थे वे न्याय, विज्ञान, कला और मानव कल्याण के एक सम्पूर्ण आदर्श थे।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: '⚖', title: 'न्याय एवं धर्म', body: 'विक्रमादित्य की न्यायप्रियता की कथाएँ पूरे भारत में प्रसिद्ध हैं। वे भेष बदलकर प्रजा के बीच जाते थे ताकि साधारण नागरिकों को भी निष्पक्ष न्याय मिल सके। उनका सिंहासन (सिंहासन बत्तीसी) धार्मिक शासन का प्रतीक बन गया।' },
                { icon: '⚔', title: 'शौर्य एवं पराक्रम', body: 'उन्होंने शक आक्रमणकारियों को परास्त कर भारतवर्ष को मुक्त कराया और शकारि की उपाधि प्राप्त की। उनके सैन्य अभियानों ने एक विखण्डित उपमहाद्वीप को धार्मिक शासन के अधीन एकीकृत किया।' },
                { icon: '🌟', title: 'कला एवं विज्ञान का संरक्षण', body: 'उनके दरबार में नवरत्न थे जिनमें कालिदास, वराहमिहिर और अमरसिंह शामिल थे। साहित्य, खगोलविज्ञान, आयुर्वेद और व्याकरण की कालजयी रचनाएँ उनके संरक्षण में ही संभव हुईं।' },
                { icon: '🕊', title: 'वैश्विक राजनय', body: 'उज्जयिनी के सम्राट के रूप में विक्रमादित्य का प्रभाव दूरस्थ राज्यों तक फैला। उज्जैन प्राचीन विश्व के सर्वाधिक महानगरीय नगरों में से एक बना जहाँ विभिन्न देशों के व्यापारी और विद्वान आते थे।' },
                { icon: '🤲', title: 'दानशीलता एवं जनकल्याण', body: 'उनका शासनकाल असाधारण उदारता का काल था धन वितरण, मंदिरों का निर्माण और निर्धनों का उत्थान। उनके 32 दानकार्यों की कथाएँ (सिंहासन बत्तीसी) आज भी भारत भर में प्रसिद्ध हैं।' },
                { icon: '🔭', title: 'खगोलविज्ञान एवं वैदिक ज्ञान', body: 'उनके संरक्षण में उज्जैन खगोलीय अनुसंधान का प्रमुख केन्द्र बना। वराहमिहिर की बृहत्संहिता और पंचसिद्धान्तिका जैसी क्रांतिकारी रचनाएँ इसी दरबार में लिखी गईं जो एक सहस्राब्दी तक प्रामाणिक रहीं।' },
              ].map((card, i) => (
                <div key={card.title} className="ab-card-hover bg-white border border-[rgba(200,134,10,0.1)] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#fdf4d8] to-[#faefd0] border border-[rgba(200,134,10,0.15)] flex items-center justify-center text-2xl mb-4">
                    {card.icon}
                  </div>
                  <h3 className="ab-serif text-[#2a1000] mb-3 leading-snug" style={{ fontSize: 17, paddingTop: '0.04em' }}>{card.title}</h3>
                  <p className="text-[13px] text-[#6a4010] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            VIKRAM SAMVAT featured callout
        ══════════════════════════════════════════ */}
        <section className="py-16 px-5 md:px-10 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[rgba(200,134,10,0.2)]" style={{ background: 'linear-gradient(135deg, #1a0a02 0%, #2a1206 100%)', boxShadow: '0 24px 80px rgba(0,0,0,0.12), 0 4px 24px rgba(200,134,10,0.1)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='rgba(200,134,10,0.06)' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} />
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #c8860a 20%, #f5c842 50%, #c8860a 80%, transparent)' }} />

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-10 md:p-12 flex flex-col justify-center" style={{ borderRight: '1px solid rgba(200,134,10,0.15)' }}>
                  <p className="text-[10px] font-bold  uppercase text-[rgba(245,200,66,0.5)] mb-4" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>शाश्वत पंचांग</p>
                  <h2 className="ab-serif text-white mb-2" style={{ fontSize: 'clamp(28px, 5vw, 46px)', lineHeight: 1.2, paddingTop: '0.05em' }}>विक्रम संवत्</h2>
                  <p className="ab-serif text-[#f5c842] mb-4" style={{ fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1 }}>2083</p>
                  <p className="text-[12px] text-[rgba(245,200,66,0.55)] font-semibold " style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>19 मार्च 2026 से प्रारंभ</p>
                </div>

                <div className="p-10 md:p-12 flex flex-col justify-center gap-5">
                  <p className="text-[14px] text-[rgba(245,220,170,0.75)] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    शकों पर ऐतिहासिक विजय और भारतवर्ष की मुक्ति के उपलक्ष्य में सम्राट विक्रमादित्य ने एक नया युग घोषित किया <strong className="text-[rgba(245,220,170,0.95)]">विक्रम संवत्</strong>। उनकी महान विजय का वर्ष, 57 ईसा पूर्व, इस संवत् का प्रथम वर्ष बना।
                  </p>
                  <p className="text-[14px] text-[rgba(245,220,170,0.75)] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    आज भारत भर में विक्रम संवत् का उपयोग धार्मिक, सांस्कृतिक और पारंपरिक अवसरों पर किया जाता है। प्रत्येक हिन्दू पर्व, शुभ मुहूर्त और परंपरागत आयोजन इसी पंचांग के अनुसार मनाया जाता है।
                  </p>
                  <div className="inline-flex items-center gap-2 bg-[rgba(200,134,10,0.12)] border border-[rgba(200,134,10,0.25)] px-4 py-2.5 rounded-full self-start">
                    <span className="text-[13px] font-semibold text-[rgba(245,200,120,0.9)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>वर्तमान: विक्रम संवत् <strong className="text-[#f5c842]">2083</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            NAVRATNAS 9 gems of the court
        ══════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf4 100%)' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>नौ रत्न</SectionLabel>
              <h2 className="ab-serif text-[#1a0800]" style={{ fontSize: 'clamp(26px, 4vw, 42px)', paddingTop: '0.05em' }}>विक्रमादित्य के नवरत्न</h2>
              <GoldDivider />
              <p className="text-[14px] text-[#7a4a18] max-w-2xl mx-auto leading-relaxed mt-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                नौ महान विद्वानों, वैज्ञानिकों और कलाकारों का यह दरबार विक्रमादित्य की विद्वत्प्रियता का प्रमाण है। इनके नाम परंपरागत स्रोतों पर आधारित हैं।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {navratnas.map((n, i) => (
                <div
                  key={n.name}
                  className="ab-navratna-card bg-white border border-[rgba(200,134,10,0.12)] rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] cursor-pointer"
                  onClick={() => setExpandedNavratna(expandedNavratna === i ? null : i)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#fdf4d8] to-[#faefd0] border border-[rgba(200,134,10,0.15)] flex items-center justify-center text-xl flex-shrink-0">
                      {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="ab-serif text-[#2a1000] leading-snug mb-1" style={{ fontSize: 17, paddingTop: '0.04em' }}>{n.name}</h3>
                      <span className="inline-block text-[9.5px] font-bold uppercase  text-[#b8700a] bg-[rgba(200,134,10,0.08)] border border-[rgba(200,134,10,0.15)] rounded-full px-2.5 py-0.5 mb-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{n.domain}</span>
                      <p className={`text-[12.5px] text-[#6a4010] leading-relaxed transition-all duration-300 ${expandedNavratna === i ? '' : 'line-clamp-3'}`} style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{n.desc}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-end gap-1 text-[10.5px] font-semibold text-[#c8860a]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    {expandedNavratna === i ? 'संक्षिप्त करें' : 'और पढ़ें'}
                    <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className={`transition-transform duration-200 ${expandedNavratna === i ? 'rotate-90' : ''}`}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[12px] text-[#9a6030] mt-8 italic" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              * नवरत्नों के नाम पारंपरिक एवं साहित्यिक स्रोतों पर आधारित हैं। वराहमिहिर की ऐतिहासिकता सर्वाधिक प्रमाणित है।
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TIMELINE
        ══════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>कालक्रम</SectionLabel>
              <h2 className="ab-serif text-[#1a0800]" style={{ fontSize: 'clamp(26px, 4vw, 42px)', paddingTop: '0.05em' }}>सहस्राब्दियों की विरासत</h2>
              <GoldDivider />
            </div>

            <div className="relative">
              <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(200,134,10,0.1)] via-[rgba(200,134,10,0.35)] to-[rgba(200,134,10,0.1)] md:-translate-x-1/2" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={item.year} className={`ab-timeline-item relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-0 pl-14 md:pl-0`}>

                    <div className="ab-timeline-dot absolute left-3.5 md:left-1/2 top-4 w-3.5 h-3.5 rounded-full bg-[#c8860a] border-2 border-white shadow-[0_0_0_3px_rgba(200,134,10,0.2)] md:-translate-x-1/2 z-10" />

                    <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}>
                      <div className="bg-gradient-to-br from-[#fdf8ee] to-[#fdf4d8] border border-[rgba(200,134,10,0.15)] rounded-2xl p-5 hover:border-[rgba(200,134,10,0.35)] hover:shadow-[0_8px_32px_rgba(200,134,10,0.09)] transition-all duration-200">
                        <p className="text-[10px] font-bold uppercase text-[#b8700a] mb-1.5" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{item.year}</p>
                        <h3 className="ab-serif text-[#2a1000] mb-2 leading-snug" style={{ fontSize: 16, paddingTop: '0.04em' }}>{item.event}</h3>
                        <p className="text-[13px] text-[#6a4010] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{item.detail}</p>
                      </div>
                    </div>

                    <div className="hidden md:block md:w-[45%]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ARCHAEOLOGICAL EVIDENCE
        ══════════════════════════════════════════ */}
        <section className="py-20 px-5 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf4 100%)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel>ऐतिहासिक प्रमाण</SectionLabel>
              <h2 className="ab-serif text-[#1a0800]" style={{ fontSize: 'clamp(24px, 4vw, 38px)', paddingTop: '0.05em' }}>पाषाण, ताम्र और स्वर्ण में अंकित इतिहास</h2>
              <GoldDivider />
              <p className="text-[14px] text-[#7a4a18] max-w-2xl mx-auto leading-relaxed mt-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                अनेक पौराणिक शासकों के विपरीत, विक्रमादित्य का अस्तित्व भौतिक साक्ष्यों से प्रमाणित है सिक्के, ताम्रपत्र, शिलालेख और हजारों प्राचीन पांडुलिपियाँ।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {[
                {
                  num: '01',
                  title: 'विक्रम संवत् शिलालेख',
                  desc: 'राजस्थान, मध्यप्रदेश और गुजरात में विक्रम संवत् में अंकित पाषाण शिलालेख इस पंचांग की प्राचीनता और प्रामाणिकता की पुष्टि करते हैं।',
                },
                {
                  num: '02',
                  title: 'ताम्रपत्र एवं सिक्के',
                  desc: 'शोधपीठ में "विक्रम" अंकित ताम्र मुद्राएँ (Krid copper coin सहित) संरक्षित हैं। ये भौतिक प्रमाण विक्रमादित्य के ऐतिहासिक अस्तित्व का साक्ष्य देते हैं।',
                },
                {
                  num: '03',
                  title: 'प्राचीन हस्तलिखित पांडुलिपियाँ',
                  desc: 'विक्रमादित्य युग से संबंधित हजारों संस्कृत हस्तलिखित पांडुलिपियाँ सूचीबद्ध की गई हैं जो आयुर्वेद, खगोल, साहित्य और विधि पर आधारित हैं।',
                },
              ].map((ev, i) => (
                <div key={ev.num} className="ab-card-hover bg-white border border-[rgba(200,134,10,0.12)] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#fdf4d8] to-[#f5e8b8] border border-[rgba(200,134,10,0.2)] rounded-xl flex items-center justify-center text-[#b8700a] font-bold text-sm mb-4" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    {ev.num}
                  </div>
                  <h3 className="ab-serif text-[#2a1000] mb-2.5 leading-snug" style={{ fontSize: 15, paddingTop: '0.04em' }}>{ev.title}</h3>
                  <p className="text-[12.5px] text-[#6a4010] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{ev.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a href="https://www.mvspujjain.com/archaeological-evidences/" target="_blank" rel="noopener noreferrer" className="ab-cta-shine inline-flex items-center gap-2 border-2 border-[rgba(200,134,10,0.3)] text-[#8b5008] hover:border-[rgba(200,134,10,0.6)] hover:bg-[rgba(200,134,10,0.05)] text-[12px] font-bold  px-7 py-3 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                पुरातात्विक प्रमाण देखें
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MVS SHODHPEETH
        ══════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            <div>
              <SectionLabel>शोध संस्थान</SectionLabel>
              <h2 className="ab-serif text-[#1a0800] mb-6 leading-snug" style={{ fontSize: 'clamp(24px, 4vw, 38px)', paddingTop: '0.05em' }}>
                महाराजा विक्रमादित्य शोधपीठ
              </h2>
              <GoldDivider />

              <div className="space-y-4 mt-6">
                {[
                  'महाराजा विक्रमादित्य शोधपीठ की स्थापना <strong class="text-[#3a1800]">2009</strong> में <strong class="text-[#3a1800]">मध्यप्रदेश शासन संस्कृति विभाग</strong> के अधीन की गई। यह संस्था सम्राट विक्रमादित्य, उनके युग और भारतविद्या (Indology) के व्यवस्थित शोध को समर्पित है।',
                  'शोधपीठ शोध-वृत्तियाँ, विचार संगोष्ठियाँ, व्याख्यान, वाद-विवाद और कार्यशालाएँ आयोजित करती है। यह <strong class="text-[#3a1800]">विक्रमार्क</strong> और <strong class="text-[#3a1800]">विक्रम संवाद</strong> शोध पत्रिकाएँ प्रकाशित करती है तथा वार्षिक विक्रम पंचांग का निर्माण करती है।',
                  'प्रतिवर्ष शोधपीठ <strong class="text-[#3a1800]">विक्रमोत्सव</strong> का आयोजन उज्जैन में करती है एक भव्य सांस्कृतिक उत्सव जिसमें कलाएँ, प्रस्तुतियाँ, शोध प्रस्तुतियाँ और जन-जागरण शामिल हैं। इसी संस्था के यूट्यूब चैनल <strong class="text-[#3a1800]">भारत विक्रम</strong> पर विक्रमादित्य से संबंधित श्रृंखलाएँ प्रसारित होती हैं।',
                ].map((para, i) => (
                  <p key={i} className="text-[14px] text-[#5a3810] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.mvspujjain.com" target="_blank" rel="noopener noreferrer" className="ab-cta-shine inline-flex items-center gap-2 bg-gradient-to-br from-[#b8600a] via-[#cf7610] to-[#9a4c06] text-white text-[12px] font-bold px-5 py-3 rounded-full shadow-[0_4px_18px_rgba(184,96,10,0.28)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  आधिकारिक वेबसाइट
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                </a>
                <Link href="/rules" className="inline-flex items-center gap-2 border border-[rgba(180,96,10,0.3)] text-[#7a4010] hover:border-[rgba(180,96,10,0.6)] hover:bg-[rgba(200,134,10,0.05)] text-[12px] font-semibold px-5 py-3 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  नामांकन नियमावली
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '🏛', title: 'स्थापना 2009', sub: 'संस्कृति विभाग, म.प्र. शासन' },
                { icon: '📖', title: 'शोध-वृत्तियाँ', sub: 'शोध प्रकाशन एवं फेलोशिप' },
                { icon: '🎭', title: 'विक्रमोत्सव', sub: 'उज्जैन में वार्षिक सांस्कृतिक उत्सव' },
                { icon: '🏆', title: 'सम्मान', sub: 'अंतर्राष्ट्रीय पुरस्कार कार्यक्रम' },
                { icon: '🎬', title: 'भारत विक्रम', sub: 'YouTube एनिमेशन श्रृंखला' },
                { icon: '🪙', title: 'पुरातत्व', sub: 'प्राचीन शिलालेख एवं सिक्के' },
              ].map((item, i) => (
                <div key={item.title} className="ab-card-hover bg-gradient-to-br from-[#fdf8ee] to-[#fdf4d8] border border-[rgba(200,134,10,0.12)] rounded-2xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                  <div className="text-2xl mb-2.5">{item.icon}</div>
                  <p className="ab-serif text-[#2a1000] text-[14px] mb-1 leading-snug" style={{ paddingTop: '0.04em' }}>{item.title}</p>
                  <p className="text-[11.5px] text-[#9a6030] leading-snug" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CTA NOMINATE
        ══════════════════════════════════════════ */}
        <section className="py-24 px-5 md:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf4 60%, #fef4dc 100%)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-100" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 26 L26 0 L52 26 L26 52Z' stroke='%23c8860a' stroke-width='0.5' fill='none' opacity='0.05'/%3E%3C/svg%3E")`, backgroundSize: '52px 52px' }} />

          <div className="max-w-2xl mx-auto text-center relative">
            <SectionLabel>विरासत को आगे बढ़ाइए</SectionLabel>
            <h2 className="ab-serif text-[#1a0800] mb-2 leading-snug" style={{ fontSize: 'clamp(28px, 5vw, 48px)', paddingTop: '0.05em' }}>
              नामांकन करें
            </h2>
            <p className="ab-serif mb-2" style={{ fontSize: 'clamp(20px, 3.5vw, 32px)', background: 'linear-gradient(135deg, #b8600a, #e8a820)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              सम्मान 2026
            </p>
            <GoldDivider />

            <p className="text-[14.5px] text-[#6a4010] leading-loose mb-10 mt-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              क्या आप किसी ऐसे व्यक्ति या संस्था को जानते हैं जिनका कार्य विक्रमादित्य के शाश्वत गुणों को मूर्त रूप देता है? नामांकन विश्वभर के व्यक्तियों और संस्थाओं के लिए खुला है।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/nominate" className="ab-cta-shine inline-flex items-center justify-center gap-2.5 text-white text-[13.5px] font-bold px-9 py-4 rounded-full shadow-[0_8px_32px_rgba(123,30,30,0.28)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif', background: 'linear-gradient(135deg, #7b1e1e 0%, #9c2a2a 55%, #6b1414 100%)' }}>
                <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" className="opacity-80"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                नामांकन प्रारंभ करें
              </Link>
              <Link href="/rules" className="inline-flex items-center justify-center gap-2 border border-[rgba(180,96,10,0.3)] text-[#7a4010] hover:border-[rgba(180,96,10,0.6)] hover:bg-[rgba(200,134,10,0.06)] text-[13px] font-semibold px-8 py-4 rounded-full transition-all duration-200" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                नियमावली पढ़ें
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}