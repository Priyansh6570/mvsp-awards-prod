"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/* ─── Ornament divider ─────────────────────────────────────────────────────── */
const Ornament = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300" />
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L12.2 7.8H18.3L13.5 11.4L15.7 17.2L10 13.5L4.3 17.2L6.5 11.4L1.7 7.8H7.8Z" fill="#b5820a" opacity="0.7" />
    </svg>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300" />
  </div>
);

/* ─── Section Header ───────────────────────────────────────────────────────── */
const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-14">
    {eyebrow && <p className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em] mb-3">{eyebrow}</p>}
    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</h2>
    <Ornament className="max-w-xs mx-auto" />
    {subtitle && <p className="text-stone-500 mt-5 max-w-2xl mx-auto text-base leading-relaxed">{subtitle}</p>}
  </div>
);

/* ─── Award Card ───────────────────────────────────────────────────────────── */
const AwardCard = ({ tier, title, amount, amountSuffix, description, accentClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={`group relative bg-white rounded-2xl border-2 ${accentClass} p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
  >
    <span className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 mb-5">
      {tier}
    </span>
    <h3 className="text-2xl font-bold text-stone-900 mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</h3>
    <div className="text-4xl font-bold text-amber-800 mb-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
      {amount}
      {amountSuffix && <span className="text-lg font-normal text-stone-400 ml-2">{amountSuffix}</span>}
    </div>
    <p className="text-stone-500 text-sm leading-relaxed mt-4 mb-8">{description}</p>
    <Link href="/nominate"
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 group-hover:gap-3 transition-all">
      Nominate Now
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  </motion.div>
);

/* ─── YouTube Video Card ──────────────────────────────────────────────────── */
const VideoCard = ({ video, index }) => (
  <motion.a
    href={video.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group block bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
  >
    <div className="relative aspect-video bg-stone-100 overflow-hidden">
      <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
          <svg className="w-5 h-5 text-red-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
    <div className="p-4">
      <p className="text-stone-800 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-amber-800 transition-colors">{video.title}</p>
      {video.pubDate && (
        <p className="text-stone-400 text-xs mt-2">{new Date(video.pubDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      )}
    </div>
  </motion.a>
);

/* ─── IG Post Card ─────────────────────────────────────────────────────────── */
const IGPostCard = ({ post, index }) => (
  <motion.a
    href={post.permalink}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    className="group relative block rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300"
    style={{ aspectRatio: '1/1' }}
  >
    <img src={post.media_url} alt="Vikram Utsav" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <p className="text-white text-xs leading-relaxed line-clamp-3 mb-2">{post.caption}</p>
      <span className="text-amber-300 text-[10px] font-bold uppercase tracking-widest">View on Instagram →</span>
    </div>
    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow opacity-70 group-hover:opacity-100 transition-opacity">
      <svg className="w-3.5 h-3.5 text-stone-700" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.067 3.282.15 4.793 1.662 4.943 4.943.055 1.266.067 1.646.067 4.85s-.012 3.584-.067 4.85c-.15 3.282-1.662 4.793-4.943 4.943-1.266.055-1.646.067-4.85.067s-3.584-.012-4.85-.067c-3.282-.15-4.793-1.662-4.943-4.943-.055-1.266-.067-1.646-.067-4.85s.012-3.584.067-4.85c.15-3.282 1.662-4.793 4.943-4.943 1.266-.055 1.646-.067 4.85-.067m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    </div>
  </motion.a>
);

/* ─── Main ─────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const [igPosts, setIgPosts] = useState([]);
  const [igLoading, setIgLoading] = useState(true);
  const [igError, setIgError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  /* YouTube RSS */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const CHANNEL_ID = 'UCpeZ-d1AJUKlJtSKpiHuUJw';
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
        const res = await fetch(proxyUrl);
        const data = await res.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'application/xml');
        const entries = Array.from(xml.querySelectorAll('entry')).slice(0, 6);
        const parsed = entries.map(entry => ({
          title: entry.querySelector('title')?.textContent || '',
          link: entry.querySelector('link')?.getAttribute('href') || '',
          videoId: entry.querySelector('videoId')?.textContent || entry.querySelector('id')?.textContent?.split(':').pop() || '',
          thumbnail: `https://i.ytimg.com/vi/${entry.querySelector('videoId')?.textContent || ''}/mqdefault.jpg`,
          pubDate: entry.querySelector('published')?.textContent || '',
        }));
        setVideos(parsed.filter(v => v.videoId));
      } catch (err) {
        console.error('YouTube RSS error:', err);
        setVideos([{ title: 'Folk Tales of Samrat Vikramaditya', link: 'https://www.youtube.com/watch?v=SdpAKnWIaBA', thumbnail: '/poster.jpg', videoId: 'SdpAKnWIaBA', pubDate: '' }]);
      } finally {
        setVideosLoading(false);
      }
    };
    fetchVideos();
  }, []);

  /* Instagram */
  useEffect(() => {
    const fetchIG = async () => {
      try {
        /*
         * ── REAL INSTAGRAM INTEGRATION ──────────────────────────────
         * 1. Create a Facebook Developer App & add Instagram Basic Display
         * 2. Generate a long-lived access token for @bharatvikram_2022
         * 3. Replace YOUR_IG_ACCESS_TOKEN below and uncomment:
         *
         * const IG_TOKEN = 'YOUR_IG_ACCESS_TOKEN';
         * const res = await fetch(
         *   `https://graph.instagram.com/me/media` +
         *   `?fields=id,caption,media_url,permalink,media_type,timestamp` +
         *   `&access_token=${IG_TOKEN}`
         * );
         * const data = await res.json();
         * if (data.error) throw new Error(data.error.message);
         * setIgPosts(data.data.filter(p => p.media_type === 'IMAGE').slice(0, 8));
         * return;
         * ────────────────────────────────────────────────────────────
         */
        setTimeout(() => {
          setIgPosts([
            { id: 1, media_url: '/poster.jpg', caption: 'Witness the glory of Samrat Vikramaditya at Vikram Utsav 2026. Join us in celebrating a legacy of justice and valor. #VikramUtsav #Ujjain', permalink: 'https://instagram.com/bharatvikram_2022' },
            { id: 2, media_url: '/poster.jpg', caption: 'Nominations for the Samrat Vikramaditya Samman are now open worldwide. ✨ #Awards #GlobalHonor', permalink: 'https://instagram.com/bharatvikram_2022' },
            { id: 3, media_url: '/poster.jpg', caption: 'Art, Culture, and History intertwine beautifully tonight. Glimpses from the celebrations! #CultureMP #IncredibleIndia', permalink: 'https://instagram.com/bharatvikram_2022' },
            { id: 4, media_url: '/poster.jpg', caption: 'Nominate someone making extraordinary contributions in human welfare and justice today! #GlobalHonor', permalink: 'https://instagram.com/bharatvikram_2022' },
            { id: 5, media_url: '/poster.jpg', caption: 'The Navratnas of Emperor Vikramaditya — nine jewels of wisdom gracing the court of Ujjain. 🌟', permalink: 'https://instagram.com/bharatvikram_2022' },
            { id: 6, media_url: '/poster.jpg', caption: 'Vikram Samvat 2082 — honouring the emperor who gave India its eternal calendar of wisdom.', permalink: 'https://instagram.com/bharatvikram_2022' },
            { id: 7, media_url: '/poster.jpg', caption: 'Archaeological evidence of Vikramaditya\'s reign from the ancient city of Ujjain. 🏛️ #History', permalink: 'https://instagram.com/bharatvikram_2022' },
            { id: 8, media_url: '/poster.jpg', caption: 'Last date for nominations: 10 March 2026. Don\'t miss this opportunity! #SamratVikramaditya', permalink: 'https://instagram.com/bharatvikram_2022' },
          ]);
          setIgLoading(false);
        }, 700);
      } catch (err) {
        setIgError(true);
        setIgLoading(false);
      }
    };
    fetchIG();
  }, []);

  const virtues = ['Justice & Law', 'Valor & Bravery', 'Generosity', 'Good Governance', 'Astronomy & Astrology', 'Arts & Literature', 'Diplomacy', 'Spirituality', 'Indian Philosophy', 'Vedanta', 'Social Upliftment', 'Global Human Welfare'];

  return (
    <div className="min-h-screen bg-white text-stone-900" style={{ fontFamily: 'Lato, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Lato:wght@300;400;700;900&display=swap');
        .gold-text {
          background: linear-gradient(135deg, #8b6914 0%, #d4a017 50%, #b5820a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shimmer { background: linear-gradient(90deg, transparent, rgba(181,130,10,0.35), transparent); background-size: 200%; animation: shim 3s infinite; }
        @keyframes shim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .pdot { animation: pdot 2.5s ease-in-out infinite; }
        @keyframes pdot { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mb-20"
        style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf3 50%, #fef4dc 100%)' }}>
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b5820a' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 26 L26 0 L52 26 L26 52Z' stroke='%23b5820a' stroke-width='0.5' fill='none'/%3E%3C/g%3E%3C/svg%3E")` }} />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)' }} />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />

        <motion.div style={{ y: heroY }} className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-12">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-300 bg-white/80 backdrop-blur-sm mb-8 shadow-sm">
            <span className="pdot w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.25em]">Global Recognition · Vikram Samvat 2082</span>
          </motion.div>

          {/* Sanskrit */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="italic text-amber-600/60 text-xl md:text-2xl mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            ॥ न्याय · पराक्रम · विद्या · दान ॥
          </motion.p>

          {/* Title */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Playfair Display', serif" }} className="font-black leading-tight tracking-tight mb-6">
            <span className="block text-5xl md:text-7xl lg:text-8xl gold-text mb-1">Samrat Vikramaditya</span>
            <span className="block text-3xl md:text-5xl lg:text-6xl text-stone-800">Samman</span>
          </motion.h1>

          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="shimmer h-px w-64 md:w-96 mx-auto mb-8" />

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
            className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Honoring extraordinary individuals and organizations who embody the timeless virtues of Emperor Vikramaditya — across every nation, every discipline.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/nominate"
              className="px-9 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #8b6914, #d4a017)', boxShadow: '0 4px 20px rgba(181,130,10,0.35)' }}>
              Submit Nomination
            </Link>
            <Link href="/rules"
              className="px-9 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] text-amber-800 border-2 border-amber-300 bg-white/70 hover:bg-amber-50 transition-all duration-300">
              Read Guidelines
            </Link>
          </motion.div>

          {/* Organizer */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.6 }}
            className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-8 border border-amber-200 rounded-2xl px-8 py-4 bg-white/70 backdrop-blur-sm shadow-sm">
            <div className="text-center sm:text-left">
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">Organized By</p>
              <p className="text-stone-800 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Maharaja Vikramaditya Shodhpeeth</p>
            </div>
            <div className="hidden sm:block w-px h-8 bg-amber-200" />
            <div className="text-center sm:text-left">
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">Under</p>
              <p className="text-stone-800 font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>Culture Dept., Madhya Pradesh</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Deadline */}
        {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-white border border-amber-200 rounded-full px-5 py-2 shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Last date for nominations: 10 March 2026
          </div>
        </motion.div> */}
      </section>

      {/* ══ STATS BAND ════════════════════════════════════════════════════════ */}
      <section className="border-y border-amber-100 bg-amber-50/50 py-6">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: '₹1.01 Cr', l: 'International Award' },
            { v: '₹21 Lakh', l: 'National Award' },
            { v: '3 × ₹5L', l: 'Shikhar Awards' },
            { v: '10 Mar', l: 'Deadline 2026' },
          ].map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <p className="text-2xl md:text-3xl font-bold gold-text" style={{ fontFamily: "'Playfair Display', serif" }}>{s.v}</p>
              <p className="text-stone-500 text-xs uppercase tracking-[0.15em] mt-1 font-semibold">{s.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ AWARDS ════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Categories of Honour"
            title="The Awards"
            subtitle="Three tiers of recognition, each a testament to Vikramaditya's eternal values of justice, valor, and wisdom."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AwardCard tier="Category I · International" title="International Award" amount="₹1.01 Crore"
              description="For individuals and organizations across the world making outstanding impacts in human welfare, justice, generosity, Indian philosophy, and the diverse virtues of Emperor Vikramaditya."
              accentClass="border-amber-300 hover:border-amber-400" delay={0} />
            <AwardCard tier="Category II · National" title="National Award" amount="₹21 Lakh"
              description="For exceptional contributions at the national level in good governance, classical literature, astronomy, valor, diplomacy, spirituality, and public welfare activities."
              accentClass="border-orange-300 hover:border-orange-400" delay={0.12} />
            <AwardCard tier="Category III · Madhya Pradesh" title="Shikhar Samman" amount="₹5 Lakh" amountSuffix="× 3 Awards"
              description="Three awards for remarkable achievements in Madhya Pradesh in arts, valor, classical literature, diplomacy, spirituality, and creative public welfare activities."
              accentClass="border-rose-300 hover:border-rose-400" delay={0.24} />
          </div>

          {/* Virtues */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-14 bg-amber-50/70 rounded-2xl border border-amber-100 p-8">
            <p className="text-center text-amber-700 text-xs font-bold uppercase tracking-[0.25em] mb-5">Virtues We Honor</p>
            <div className="flex flex-wrap justify-center gap-2">
              {virtues.map(v => (
                <span key={v} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-200 text-amber-800 text-xs font-semibold">
                  ✦ {v}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 text-center">
            <Link href="/nominate"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-800 text-sm font-bold uppercase tracking-[0.15em] hover:bg-amber-50 transition-all duration-300">
              View Full Guidelines →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ INSTAGRAM ═════════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf5)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl" style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.067 3.282.15 4.793 1.662 4.943 4.943.055 1.266.067 1.646.067 4.85s-.012 3.584-.067 4.85c-.15 3.282-1.662 4.793-4.943 4.943-1.266.055-1.646.067-4.85.067s-3.584-.012-4.85-.067c-3.282-.15-4.793-1.662-4.943-4.943-.055-1.266-.067-1.646-.067-4.85s.012-3.584.067-4.85c.15-3.282 1.662-4.793 4.943-4.943 1.266-.055 1.646-.067 4.85-.067m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <span className="text-stone-400 text-xs font-bold uppercase tracking-[0.2em]">Live from Vikram Utsav · Ujjain</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Experience <span className="gold-text">Vikram Utsav</span>
              </h2>
            </div>
            <a href="https://instagram.com/bharatvikram_2022" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-[0.15em] hover:border-amber-300 hover:text-amber-700 transition-all">
              @bharatvikram_2022 ↗
            </a>
          </div>

          {/* Info banner */}
          <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-blue-700 text-xs leading-relaxed">
              <strong>To show real Instagram posts from @bharatvikram_2022:</strong> Get an Instagram Graph API access token from{' '}
              <a href="https://developers.facebook.com/docs/instagram-basic-display-api" target="_blank" rel="noopener noreferrer" className="underline font-bold">Meta Developers</a>
              {' '}→ open <code className="bg-blue-100 px-1 rounded text-[11px]">HomePage.jsx</code> → find <code className="bg-blue-100 px-1 rounded text-[11px]">YOUR_IG_ACCESS_TOKEN</code> → replace & uncomment the API call in <code className="bg-blue-100 px-1 rounded text-[11px]">fetchIG()</code>.
            </div>
          </div>

          {igLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <div key={i} className="rounded-xl bg-stone-100 animate-pulse" style={{ aspectRatio: '1/1' }} />)}
            </div>
          ) : igError ? (
            <div className="text-center py-14 text-stone-400">
              <p className="text-sm">Could not load Instagram posts. Please check your access token.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {igPosts.map((post, i) => <IGPostCard key={post.id} post={post} index={i} />)}
            </div>
          )}
          <p className="text-center text-stone-400 text-xs mt-5">Hover to read captions · Click to view on Instagram</p>
        </div>
      </section>

      {/* ══ YOUTUBE VIDEOS (RSS) ══════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-red-600">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                </div>
                <span className="text-stone-400 text-xs font-bold uppercase tracking-[0.2em]">Latest from our channel</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Bharat Vikram <span className="gold-text">Videos</span>
              </h2>
            </div>
            <a href="https://youtube.com/channel/UCpeZ-d1AJUKlJtSKpiHuUJw" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-[0.15em] hover:bg-red-700 transition-colors">
              Subscribe on YouTube ↗
            </a>
          </div>

          {videosLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl bg-stone-100 animate-pulse">
                  <div className="aspect-video bg-stone-200 rounded-t-xl" />
                  <div className="p-4 space-y-2"><div className="h-4 bg-stone-200 rounded" /><div className="h-3 bg-stone-200 rounded w-2/3" /></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {videos.map((v, i) => <VideoCard key={v.videoId || i} video={v} index={i} />)}
              </div>
              {videos.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="mt-12 max-w-4xl mx-auto">
                  <p className="text-center text-stone-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Featured Video</p>
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                    <div className="aspect-video">
                      <iframe className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videos[0].videoId}`}
                        title={videos[0].title} frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen />
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}

          <div className="mt-10 text-center">
            <a href="https://youtube.com/playlist?list=PLYJAqKuuEKfBIs9GPN8r-eu39-uD4EpWW" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-stone-200 text-stone-600 text-sm font-bold uppercase tracking-[0.15em] hover:border-red-300 hover:text-red-600 transition-all">
              View Full Playlist →
            </a>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-amber-100" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf3)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em] mb-4">Submit Before the Deadline</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Nominate for <span className="gold-text">Samman 2026</span>
            </h2>
            <Ornament className="max-w-xs mx-auto mb-6" />
            <p className="text-stone-600 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Send clear recommendations by <strong className="text-amber-800">10 March 2026</strong> to the Director, Maharaja Vikramaditya Shodhpeeth, Bhopal.
            </p>
            <div className="inline-block bg-white border border-amber-200 rounded-2xl px-8 py-6 text-left shadow-sm mb-8 w-full max-w-md">
              <p className="font-bold text-stone-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Contact & Submission</p>
              <div className="space-y-1.5 text-sm text-stone-600">
                <p>📧 <a href="mailto:mvspujjain@gmail.com" className="text-amber-700 font-semibold hover:underline">mvspujjain@gmail.com</a></p>
                <p>📞 <a href="tel:07554535064" className="text-amber-700 font-semibold hover:underline">0755-4535064</a></p>
                <p>🌐 <a href="https://www.mvspujjain.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">www.mvspujjain.com</a></p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/nominate"
                className="px-9 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #8b6914, #d4a017)', boxShadow: '0 4px 20px rgba(181,130,10,0.3)' }}>
                Begin Nomination
              </Link>
              <Link href="/about"
                className="px-9 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] text-amber-800 border-2 border-amber-300 bg-white hover:bg-amber-50 transition-all">
                About Vikramaditya
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}