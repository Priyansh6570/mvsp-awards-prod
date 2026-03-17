"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

const VideoCard = ({ video }) => (
  <a href={video.link} target="_blank" rel="noopener noreferrer" className="vid-card">
    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#f0e8d0' }}>
      <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.18)', transition: 'background 0.3s' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="play-btn" style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}>
          <svg style={{ width: 18, height: 18, color: '#b8700a', marginLeft: 3 }} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
      </div>
    </div>
    <div style={{ padding: '18px 20px 20px', background: '#fff' }}>
      <p style={{ color: '#2a1f0a', fontSize: 13.5, fontWeight: 500, lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: "'Libre Baskerville', serif" }}>{video.title}</p>
      {video.pubDate && (
        <p style={{ color: '#b8700a', fontSize: 11, marginTop: 8, fontFamily: "'Mulish', sans-serif", fontWeight: 500, letterSpacing: '0.05em' }}>
          {new Date(video.pubDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      )}
    </div>
  </a>
);

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);

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
      } catch {
        setVideos([{ title: 'Folk Tales of Samrat Vikramaditya', link: 'https://www.youtube.com/watch?v=SdpAKnWIaBA', thumbnail: '/poster.jpg', videoId: 'SdpAKnWIaBA', pubDate: '' }]);
      } finally {
        setVideosLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const virtues = ['Justice & Law', 'Valor & Bravery', 'Generosity', 'Good Governance', 'Astronomy & Astrology', 'Arts & Literature', 'Diplomacy', 'Spirituality', 'Indian Philosophy', 'Vedanta', 'Social Upliftment', 'Global Human Welfare'];

  const awards = [
    { label: 'International', cat: 'Category I', amount: '₹1.01 Crore', desc: 'For individuals and organizations across the world making outstanding impacts in human welfare, justice, generosity, Indian philosophy, and the virtues of Emperor Vikramaditya.', border: '#d4a017' },
    { label: 'National Award', cat: 'Category II', amount: '₹21 Lakh', desc: 'For exceptional contributions at the national level in good governance, classical literature, astronomy, valor, diplomacy, spirituality, and public welfare.', border: '#c8860a' },
    { label: 'Shikhar Samman', cat: 'Category III · MP', amount: '₹5 Lakh × 3', desc: 'Three awards for remarkable achievements within Madhya Pradesh in arts, valor, literature, diplomacy, spirituality, and creative public welfare activities.', border: '#b87010' },
  ];

  const traits = [
    { icon: '⚖', title: 'Justice', desc: 'Legendary for fair and compassionate rule over all citizens without distinction.' },
    { icon: '⚔', title: 'Valor', desc: 'A warrior of exceptional courage who protected his kingdom and upheld dharma.' },
    { icon: '📚', title: 'Wisdom', desc: 'Patron of the Navratnas — nine jewels of scholarship, poetry and science.' },
    { icon: '🌍', title: 'Welfare', desc: 'Dedicated to the upliftment of all humanity, regardless of caste or creed.' },
  ];

  return (
    <div style={{ background: '#fffdf7', minHeight: '100vh', color: '#2a1f0a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Mulish:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #c8860a;
          --gold-light: #e8a820;
          --gold-pale: #f5d87a;
          --cream: #fffdf7;
          --cream-2: #fdf6e3;
          --cream-3: #faefd0;
          --ink: #2a1f0a;
          --ink-2: #4a3a1a;
          --ink-3: #6b5530;
          --ink-muted: #8a7050;
          --border: rgba(200,134,10,0.18);
          --border-strong: rgba(200,134,10,0.35);
        }

        .serif  { font-family: 'Cormorant Garamond', Georgia, serif; }
        .bask   { font-family: 'Libre Baskerville', Georgia, serif; }
        .sans   { font-family: 'Mulish', sans-serif; }

        /* ── Gold rule ── */
        .gold-rule { display: flex; align-items: center; gap: 14px; }
        .gold-rule::before, .gold-rule::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.4;
        }

        /* ── Eyebrow ── */
        .eyebrow {
          font-family: 'Mulish', sans-serif; font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold);
          margin-bottom: 14px; display: block;
        }

        /* ── CTAs ── */
        .cta-primary {
          display: inline-flex; align-items: center; gap: 9px; text-decoration: none;
          font-family: 'Mulish', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: #fff;
          background: linear-gradient(135deg, #d4a017 0%, #9a6008 100%);
          padding: 15px 38px; border-radius: 2px;
          box-shadow: 0 4px 24px rgba(180,120,10,0.28);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(180,120,10,0.35); }

        .cta-outline {
          display: inline-flex; align-items: center; gap: 9px; text-decoration: none;
          font-family: 'Mulish', sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
          background: transparent; border: 1.5px solid var(--gold-light);
          padding: 14px 36px; border-radius: 2px;
          transition: background 0.2s, color 0.2s;
        }
        .cta-outline:hover { background: var(--gold-pale); color: var(--ink); }

        /* ── Award card ── */
        .award-card {
          background: #fff; border-radius: 4px; padding: 36px 30px;
          box-shadow: 0 2px 20px rgba(180,120,10,0.07);
          border-top: 3px solid var(--gold);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .award-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(180,120,10,0.14); }

        /* ── Trait card ── */
        .trait-card {
          background: var(--cream-2); border: 1px solid var(--border);
          border-radius: 4px; padding: 26px 22px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .trait-card:hover { border-color: var(--border-strong); box-shadow: 0 4px 20px rgba(180,120,10,0.1); }

        /* ── Video card ── */
        .vid-card {
          display: block; text-decoration: none; border-radius: 4px; overflow: hidden;
          background: #fff; border: 1px solid var(--border);
          box-shadow: 0 2px 12px rgba(180,120,10,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .vid-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(180,120,10,0.12); }
        .vid-card:hover img { transform: scale(1.04); }
        .vid-card:hover .play-btn { transform: scale(1.1); }

        /* ── Virtue tag ── */
        .v-tag {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 15px; border: 1px solid var(--border-strong);
          border-radius: 2px; background: #fff;
          font-family: 'Mulish', sans-serif; font-size: 11px; font-weight: 600;
          color: var(--ink-2); letter-spacing: 0.05em;
          transition: all 0.2s;
        }
        .v-tag:hover { background: var(--cream-3); border-color: var(--gold); color: var(--gold); }

        /* ── Contact card ── */
        .contact-card {
          background: #fff; border: 1px solid var(--border); border-radius: 4px; padding: 20px 22px;
          transition: border-color 0.2s;
        }
        .contact-card:hover { border-color: var(--gold); }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-layout { flex-direction: column !important; }
          .hero-img-col { width: 300px !important; margin: 0 auto !important; }
          .hero-title { font-size: 58px !important; }
          .hero-sub { font-size: 30px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .awards-grid { grid-template-columns: 1fr !important; }
          .stats-grid  { grid-template-columns: 1fr 1fr !important; }
          .vid-grid    { grid-template-columns: 1fr 1fr !important; }
          .traits-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-title { font-size: 48px !important; }
        }
        @media (max-width: 500px) {
          .vid-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #fdf6e3 0%, #fffdf7 40%, #fdf0cc 100%)',
        paddingBottom: 0,
      }}>
        {/* Diamond pattern overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg width='56' height='56' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 4L52 28L28 52L4 28Z' fill='none' stroke='%23c8860a' stroke-width='0.7'/%3E%3C/svg%3E")`, backgroundSize: '56px 56px', pointerEvents: 'none' }} />

        {/* Saffron radial behind image */}
        <div style={{ position: 'absolute', top: '0', right: '5%', width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,170,30,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 40px 0', position: 'relative', zIndex: 5 }}>
          <div className="hero-layout" style={{ display: 'flex', alignItems: 'flex-end', gap: 64 }}>

            {/* ── Left: Text ── */}
            <div style={{ flex: 1, minWidth: 0, paddingBottom: 80 }}>

              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 16px', border: '1px solid rgba(200,134,10,0.3)', borderRadius: 2, background: 'rgba(245,216,120,0.18)', marginBottom: 36 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4a017', display: 'inline-block' }} />
                <span className="sans" style={{ fontSize: 9.5, color: '#9a6008', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Nominations Open · Vikram Samvat 2082
                </span>
              </div>

              {/* Sanskrit */}
              <p className="serif" style={{ color: '#c8860a', fontSize: 22, fontStyle: 'italic', marginBottom: 18, letterSpacing: '0.06em', opacity: 0.8 }}>
                ॥ न्याय · पराक्रम · विद्या · दान ॥
              </p>

              {/* Main title */}
              <h1 className="serif hero-title" style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.0, marginBottom: 8, color: '#1a1000', letterSpacing: '-0.01em' }}>
                Samrat<br />
                <span style={{ background: 'linear-gradient(135deg, #c8860a 0%, #e8a820 50%, #9a6008 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Vikramaditya
                </span>
              </h1>
              <h2 className="serif hero-sub" style={{ fontSize: 36, fontWeight: 400, color: '#6b5530', marginBottom: 32, letterSpacing: '0.08em' }}>
                Samman 2026
              </h2>

              <div className="gold-rule" style={{ maxWidth: 360, marginBottom: 30 }}>
                <svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M10 1l2.4 7.4H20l-6.2 4.6 2.4 7.3L10 16.1 3.8 20.3l2.4-7.3L0 8.4h7.6z" fill="#c8860a" opacity=".7"/></svg>
              </div>

              <p className="sans" style={{ color: '#6b5530', fontSize: 15.5, lineHeight: 1.85, fontWeight: 400, maxWidth: 510, marginBottom: 44 }}>
                Honoring extraordinary individuals and organizations who embody the timeless virtues of Emperor Vikramaditya — across every nation, every discipline.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 56 }}>
                <Link href="/nominate" className="cta-primary">
                  <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1l2.4 7.4H20l-6.2 4.6 2.4 7.3L10 16.1 3.8 20.3l2.4-7.3L0 8.4h7.6z"/></svg>
                  Submit Nomination
                </Link>
                <Link href="/rules" className="cta-outline">Read Guidelines</Link>
              </div>

              {/* Organizer strip */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, paddingTop: 28, borderTop: '1px solid rgba(200,134,10,0.2)' }}>
                {[
                  { l: 'Organized by', v: 'Maharaja Vikramaditya Shodhpeeth' },
                  { l: 'Under', v: 'Culture Department, Madhya Pradesh' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingRight: 36, paddingLeft: i > 0 ? 36 : 0, borderLeft: i > 0 ? '1px solid rgba(200,134,10,0.2)' : 'none' }}>
                    <p className="sans" style={{ fontSize: 9, color: '#b8880a', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 5 }}>{item.l}</p>
                    <p className="bask" style={{ color: '#3a2a0a', fontSize: 14, fontWeight: 400 }}>{item.v}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Vikramaditya portrait ── */}
            <div className="hero-img-col" style={{ width: 440, flexShrink: 0, position: 'relative', alignSelf: 'flex-end' }}>
              {/* Decorative rings */}
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(200,134,10,0.12)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(200,134,10,0.06)', pointerEvents: 'none' }} />
              {/* Warm glow behind figure */}
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,170,30,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />

              <img
                src="/vikramaditya.png"
                alt="Samrat Vikramaditya"
                style={{ display: 'block', width: '100%', objectFit: 'contain', objectPosition: 'bottom center', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 -10px 40px rgba(200,134,10,0.15))' }}
                onError={e => {
                  const wrap = e.target.parentNode;
                  e.target.style.display = 'none';
                  wrap.style.minHeight = '480px';
                  wrap.style.display = 'flex'; wrap.style.alignItems = 'center'; wrap.style.justifyContent = 'center';
                  const fb = document.createElement('div');
                  fb.style.textAlign = 'center';
                  fb.innerHTML = `<div style="font-size:100px;opacity:0.15;">⚔</div><p style="font-family:'Mulish',sans-serif;font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#c8860a;opacity:.4;margin-top:16px">Place vikramaditya.png<br/>in /public folder</p>`;
                  wrap.appendChild(fb);
                }}
              />

              {/* Deadline badge */}
              <div style={{ position: 'absolute', bottom: 48, right: -16, zIndex: 10, background: '#fff', border: '1px solid rgba(200,134,10,0.3)', borderRadius: 4, padding: '14px 20px', boxShadow: '0 8px 32px rgba(180,120,10,0.14)' }}>
                <p className="sans" style={{ fontSize: 9, color: '#b8880a', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 5 }}>Last Date</p>
                <p className="serif" style={{ color: '#9a6008', fontSize: 22, fontWeight: 600, lineHeight: 1 }}>20 May 2026</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div style={{ marginTop: -2, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#fffdf7"/>
          </svg>
        </div>
      </section>

      {/* ══ STATS BAND ════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fffdf7', padding: '12px 40px 52px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, background: '#fff', border: '1px solid rgba(200,134,10,0.18)', borderRadius: 6, boxShadow: '0 4px 32px rgba(180,120,10,0.08)', overflow: 'hidden' }}>
            {[
              { v: '₹1.01 Cr', l: 'International Award' },
              { v: '₹21 Lakh', l: 'National Award' },
              { v: '3 × ₹5L', l: 'Shikhar Awards' },
              { v: '20 May', l: 'Deadline 2026' },
            ].map((s, i) => (
              <div key={s.l} style={{ textAlign: 'center', padding: '28px 16px', borderLeft: i > 0 ? '1px solid rgba(200,134,10,0.12)' : 'none' }}>
                <p className="serif" style={{ fontSize: 36, fontWeight: 700, color: '#9a6008', lineHeight: 1, marginBottom: 6 }}>{s.v}</p>
                <p className="sans" style={{ color: '#b8880a', fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AWARDS ════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 40px 100px', background: 'linear-gradient(180deg, #fffdf7 0%, #fdf6e3 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="eyebrow">Categories of Honour</span>
            <h2 className="serif" style={{ fontSize: 52, fontWeight: 700, color: '#1a1000', marginBottom: 20, lineHeight: 1.1 }}>The Awards</h2>
            <div className="gold-rule" style={{ maxWidth: 160, margin: '0 auto 20px' }}>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M10 1l2.4 7.4H20l-6.2 4.6 2.4 7.3L10 16.1 3.8 20.3l2.4-7.3L0 8.4h7.6z" fill="#c8860a" opacity=".65"/></svg>
            </div>
            <p className="sans" style={{ color: '#8a7050', fontSize: 15, fontWeight: 400, maxWidth: 540, margin: '0 auto', lineHeight: 1.85 }}>
              Three tiers of recognition, each a testament to Vikramaditya's eternal values of justice, valor, and wisdom.
            </p>
          </div>

          <div className="awards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginBottom: 44 }}>
            {awards.map((a, i) => (
              <div key={a.label} className="award-card" style={{ borderTopColor: i === 0 ? '#d4a017' : i === 1 ? '#c8860a' : '#b87010' }}>
                <span className="sans" style={{ fontSize: 9, color: '#b8880a', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: 10 }}>{a.cat}</span>
                <h3 className="serif" style={{ fontSize: 26, fontWeight: 700, color: '#1a1000', marginBottom: 22, lineHeight: 1.15 }}>{a.label}</h3>
                <div style={{ borderTop: '1px solid rgba(200,134,10,0.15)', paddingTop: 18, marginBottom: 18 }}>
                  <p className="serif" style={{ fontSize: 34, fontWeight: 700, color: '#9a6008', lineHeight: 1 }}>{a.amount}</p>
                  <p className="sans" style={{ fontSize: 9, color: '#c8a060', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4, fontWeight: 600 }}>Award Fund</p>
                </div>
                <p className="sans" style={{ color: '#6b5530', fontSize: 13.5, lineHeight: 1.85, fontWeight: 400, marginBottom: 28 }}>{a.desc}</p>
                <Link href="/nominate" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: "'Mulish', sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c8860a', textDecoration: 'none', transition: 'gap 0.2s' }}>
                  Nominate Now →
                </Link>
              </div>
            ))}
          </div>

          {/* Virtues */}
          <div style={{ background: '#fff', border: '1px solid rgba(200,134,10,0.18)', borderRadius: 6, padding: '40px 36px', boxShadow: '0 2px 20px rgba(180,120,10,0.06)' }}>
            <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>Virtues We Honour</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {virtues.map(v => <span key={v} className="v-tag">✦ {v}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ABOUT VIKRAMADITYA ════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 40px', background: '#fff', borderTop: '1px solid rgba(200,134,10,0.12)' }}>
        <div className="about-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <span className="eyebrow">The Emperor's Legacy</span>
            <h2 className="serif" style={{ fontSize: 46, fontWeight: 700, color: '#1a1000', lineHeight: 1.15, marginBottom: 24 }}>
              Who Was<br />Samrat Vikramaditya?
            </h2>
            <div className="gold-rule" style={{ maxWidth: 140, marginBottom: 28 }}>
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M10 1l2.4 7.4H20l-6.2 4.6 2.4 7.3L10 16.1 3.8 20.3l2.4-7.3L0 8.4h7.6z" fill="#c8860a" opacity=".65"/></svg>
            </div>
            <p className="sans" style={{ color: '#6b5530', fontSize: 14.5, lineHeight: 1.95, fontWeight: 400, marginBottom: 18 }}>
              Samrat Vikramaditya was one of the greatest emperors in Indian history, renowned for his justice, generosity, valor, and wisdom. His court of nine jewels — the Navratnas — included luminaries like Kalidasa and Varahamihira, making Ujjain a global center of art, science, and philosophy.
            </p>
            <p className="sans" style={{ color: '#6b5530', fontSize: 14.5, lineHeight: 1.95, fontWeight: 400, marginBottom: 40 }}>
              The Vikram Samvat calendar, followed by millions across India, is his enduring gift to civilization. His legacy of righteous governance and universal welfare continues to inspire humanity.
            </p>
            <Link href="/about" className="cta-outline">Discover His Story</Link>
          </div>

          <div className="traits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {traits.map(t => (
              <div key={t.title} className="trait-card">
                <div style={{ fontSize: 28, marginBottom: 14 }}>{t.icon}</div>
                <p className="serif" style={{ color: '#9a6008', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{t.title}</p>
                <p className="sans" style={{ color: '#8a7050', fontSize: 12.5, lineHeight: 1.75, fontWeight: 400 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ YOUTUBE VIDEOS ════════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 40px', background: 'linear-gradient(180deg, #fdf6e3 0%, #fffdf7 100%)', borderTop: '1px solid rgba(200,134,10,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48 }}>
            <div>
              <span className="eyebrow">Latest from Bharat Vikram</span>
              <h2 className="serif" style={{ fontSize: 46, fontWeight: 700, color: '#1a1000', lineHeight: 1.1 }}>Videos</h2>
            </div>
            <a href="https://youtube.com/channel/UCpeZ-d1AJUKlJtSKpiHuUJw" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'Mulish',sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#c4302b', color: '#fff', padding: '11px 24px', borderRadius: 2, textDecoration: 'none', boxShadow: '0 4px 16px rgba(196,48,43,0.25)' }}>
              <svg style={{ width: 14, height: 14 }} fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
              Subscribe on YouTube
            </a>
          </div>

          {videosLoading ? (
            <div className="vid-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ borderRadius: 4, overflow: 'hidden', background: '#fff', border: '1px solid rgba(200,134,10,0.1)' }}>
                  <div style={{ aspectRatio: '16/9', background: 'linear-gradient(90deg, #f5ecd4 25%, #fdf6e3 50%, #f5ecd4 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ height: 13, background: '#f0e8d0', borderRadius: 2 }} />
                    <div style={{ height: 11, background: '#f5ecd4', borderRadius: 2, width: '65%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="vid-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 40 }}>
                {videos.map((v, i) => <VideoCard key={v.videoId || i} video={v} />)}
              </div>
              {videos.length > 0 && (
                <div style={{ border: '1px solid rgba(200,134,10,0.2)', borderRadius: 6, overflow: 'hidden', maxWidth: 860, margin: '0 auto 36px', boxShadow: '0 4px 32px rgba(180,120,10,0.1)' }}>
                  <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(200,134,10,0.15)', background: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <svg style={{ width: 14, height: 14, color: '#c4302b', flexShrink: 0 }} fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                    <p className="sans" style={{ fontSize: 9.5, color: '#b8880a', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700 }}>Featured Video</p>
                  </div>
                  <div style={{ aspectRatio: '16/9' }}>
                    <iframe style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                      src={`https://www.youtube.com/embed/${videos[0].videoId}`}
                      title={videos[0].title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen />
                  </div>
                </div>
              )}
              <div style={{ textAlign: 'center' }}>
                <a href="https://youtube.com/playlist?list=PLYJAqKuuEKfBIs9GPN8r-eu39-uD4EpWW" target="_blank" rel="noopener noreferrer" className="cta-outline">
                  View Full Playlist →
                </a>
              </div>
            </>
          )}
        </div>
        <style>{`@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}`}</style>
      </section>

      {/* ══ BOTTOM CTA ════════════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(160deg, #faefd0 0%, #fdf6e3 60%, #f5e8b8 100%)', borderTop: '1px solid rgba(200,134,10,0.18)', padding: '100px 40px' }}>
        <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">Submit Before the Deadline</span>
          <h2 className="serif" style={{ fontSize: 50, fontWeight: 700, color: '#1a1000', lineHeight: 1.15, marginBottom: 18 }}>
            Nominate for<br />
            <span style={{ background: 'linear-gradient(135deg,#c8860a,#e8a820,#9a6008)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Samman 2026</span>
          </h2>
          <div className="gold-rule" style={{ maxWidth: 160, margin: '0 auto 24px' }}>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M10 1l2.4 7.4H20l-6.2 4.6 2.4 7.3L10 16.1 3.8 20.3l2.4-7.3L0 8.4h7.6z" fill="#c8860a" opacity=".65"/></svg>
          </div>
          <p className="sans" style={{ color: '#6b5530', fontSize: 15, lineHeight: 1.9, fontWeight: 400, marginBottom: 48 }}>
            Send clear recommendations by <strong style={{ color: '#9a6008', fontWeight: 700 }}>20 May 2026</strong> to the Director,<br />Maharaja Vikramaditya Shodhpeeth, Bhopal.
          </p>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 48, textAlign: 'left' }}>
            {[
              { l: 'Email', v: 'samratvikramadityasamman@gmail.com', href: 'mailto:samratvikramadityasamman@gmail.com' },
              { l: 'Phone', v: '0755-4535064', href: 'tel:07554535064' },
              { l: 'Website', v: 'awards.mvspujjain.com', href: 'https://awards.mvspujjain.com', ext: true },
              { l: 'Address', v: 'Rabindra Bhavan Campus, Bhopal', href: null },
            ].map(item => (
              <div key={item.l} className="contact-card">
                <p className="sans" style={{ fontSize: 9, color: '#b8880a', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{item.l}</p>
                {item.href
                  ? <a href={item.href} target={item.ext ? '_blank' : undefined} rel={item.ext ? 'noopener noreferrer' : undefined} className="sans" style={{ color: '#9a6008', fontSize: 13.5, fontWeight: 600, textDecoration: 'none' }}>{item.v}</a>
                  : <p className="sans" style={{ color: '#4a3a1a', fontSize: 13.5, fontWeight: 500 }}>{item.v}</p>
                }
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <Link href="/nominate" className="cta-primary">
              <svg width="11" height="11" viewBox="0 0 20 20" fill="currentColor"><path d="M10 1l2.4 7.4H20l-6.2 4.6 2.4 7.3L10 16.1 3.8 20.3l2.4-7.3L0 8.4h7.6z"/></svg>
              Begin Nomination
            </Link>
            <Link href="/about" className="cta-outline">About Vikramaditya</Link>
          </div>
        </div>
      </section>
    </div>
  );
}