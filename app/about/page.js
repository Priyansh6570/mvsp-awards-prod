"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

const Ornament = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-300" />
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L12.2 7.8H18.3L13.5 11.4L15.7 17.2L10 13.5L4.3 17.2L6.5 11.4L1.7 7.8H7.8Z" fill="#b5820a" opacity="0.7" />
    </svg>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-300" />
  </div>
);

const SectionHeader = ({ eyebrow, title, subtitle, left = false }) => (
  <div className={`mb-12 ${left ? '' : 'text-center'}`}>
    {eyebrow && <p className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em] mb-3">{eyebrow}</p>}
    <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</h2>
    <Ornament className={left ? 'max-w-xs' : 'max-w-xs mx-auto'} />
    {subtitle && <p className="text-stone-500 mt-5 max-w-2xl text-base leading-relaxed" style={{ marginLeft: left ? 0 : 'auto', marginRight: left ? 0 : 'auto' }}>{subtitle}</p>}
  </div>
);

const navratnas = [
  { name: 'Kalidasa', domain: 'Poetry & Literature', desc: 'The greatest Sanskrit poet and playwright, author of Abhijnanasakuntalam and Meghaduta.', icon: '📜' },
  { name: 'Dhanvantari', domain: 'Ayurveda & Medicine', desc: 'Legendary physician and the divine originator of Ayurvedic medicine.', icon: '🌿' },
  { name: 'Varahamihira', domain: 'Astronomy & Astrology', desc: 'Pioneering astronomer whose Brihat Samhita remains a monumental scientific text.', icon: '⭐' },
  { name: 'Vararuchi', domain: 'Grammar & Linguistics', desc: 'Master grammarian who refined Sanskrit grammar and literary criticism.', icon: '🖊️' },
  { name: 'Shanku', domain: 'Architecture', desc: 'Expert in Vastu Shastra and master architect of the Vikramaditya era.', icon: '🏛️' },
  { name: 'Vetala Bhatta', domain: 'Tantra & Rituals', desc: 'Scholar of Tantra, metaphysics, and esoteric knowledge of the cosmos.', icon: '🕉️' },
  { name: 'Ghatakarpara', domain: 'Art & Sculpture', desc: 'Renowned sculptor and artist who beautified Ujjain with extraordinary works.', icon: '🎨' },
  { name: 'Kshapanaka', domain: 'Philosophy & Jainism', desc: 'Scholar of Jain philosophy and logic who debated with great wisdom.', icon: '⚖️' },
  { name: 'Amarasimha', domain: 'Lexicography', desc: 'Author of the Amarakosha, the oldest and most celebrated Sanskrit dictionary.', icon: '📚' },
];

const timeline = [
  { year: 'c. 1st Century BCE', event: 'Rise of Vikramaditya', detail: 'Emperor Vikramaditya ascends the throne of Ujjain (Ujjayini), establishing a golden age for Bharatvarsha.' },
  { year: '57 BCE', event: 'Vikram Samvat Established', detail: 'Following his decisive victory over the Sakas (Mlecchas) and liberation of India, Vikramaditya initiates the Vikram Samvat calendar — still observed by over a billion people today.' },
  { year: 'Golden Age', event: 'Patronage of Navratnas', detail: 'The nine jewels of his court — including Kalidasa, Varahamihira and Amarasimha — flourish under his patronage, producing timeless works in literature, science, and art.' },
  { year: 'Eternal', event: 'Legacy in 32 Idols (Sinhasanas)', detail: 'The legendary 32 golden thrones (Sinhasanas) of Vikramaditya, each with a story of wisdom and justice, continue to inspire Indian culture and oral tradition.' },
  { year: '2009', event: 'Shodhpeeth Established', detail: 'Maharaja Vikramaditya Shodhpeeth is founded under the Culture Department of Madhya Pradesh to systematically research, document, and celebrate the legacy of Vikramaditya.' },
  { year: '2026', event: 'Global Samman', detail: 'The Samrat Vikramaditya Samman opens for nominations worldwide, recognizing individuals and institutions embodying the imperial virtues in the modern age.' },
];

const virtueCards = [
  { icon: '⚖️', title: 'Justice & Dharma', body: 'Vikramaditya was legendary for holding court in disguise to ensure ordinary citizens received impartial justice. His throne (Sinhasana) has become a symbol of righteous governance across India.' },
  { icon: '⚔️', title: 'Valor & Bravery', body: 'He liberated Bharatvarsha from foreign Saka invaders, earning the title Sakari (enemy of the Sakas). His military campaigns unified a fragmented subcontinent under dharmic rule.' },
  { icon: '🌟', title: 'Patronage of Arts & Science', body: 'His court hosted the legendary Navratnas — nine jewels including Kalidasa and the astronomer Varahamihira — producing works in literature, astronomy, medicine, and grammar that shaped civilization.' },
  { icon: '🌍', title: 'Global Diplomacy', body: 'Vikramaditya\'s influence extended to distant kingdoms through diplomatic missions and trade relationships, establishing Ujjain as one of the most cosmopolitan cities of the ancient world.' },
  { icon: '💛', title: 'Generosity & Welfare', body: 'His reign was marked by extraordinary generosity — distributing wealth, funding temples, and uplifting the poor. Legends of his 32 acts of munificence are celebrated across India to this day.' },
  { icon: '🔬', title: 'Astronomy & Vedic Science', body: 'Under his patronage, Ujjain became a premier center of astronomical observation. Varahamihira\'s revolutionary texts on astrology and astronomy — produced in Vikramaditya\'s court — remained authoritative for a millennium.' },
];

export default function AboutPage() {
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
        .shimmer { background: linear-gradient(90deg, transparent, rgba(181,130,10,0.3), transparent); background-size: 200%; animation: shim 3s infinite; }
        @keyframes shim { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
      `}</style>

      {/* ── PAGE HERO ─────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf3 60%, #fef4dc 100%)' }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 26 L26 0 L52 26 L26 52Z' stroke='%23b5820a' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-300 bg-white/80 text-amber-800 text-xs font-bold uppercase tracking-[0.25em] mb-8">
              ✦ Eternal Legacy ✦
            </span>
            <p className="italic text-amber-600/60 text-xl mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              ॥ विक्रमार्कस्य वंशे जातः ॥
            </p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="gold-text">Samrat</span><br />
              <span className="text-stone-800">Vikramaditya</span>
            </h1>
            <div className="shimmer h-px w-64 mx-auto mb-7" />
            <p className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Emperor of Ujjain, Patron of Wisdom, Defender of Dharma — whose name became synonymous with ideal kingship across the Indian subcontinent and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WHO WAS VIKRAMADITYA ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionHeader eyebrow="The Great Emperor" title="Who Was Vikramaditya?" left />
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>Samrat Vikramaditya of Ujjain (ancient Ujjayini) stands among the greatest emperors in Indian history — a Chakravartin (Universal Ruler) whose reign ushered in a golden age of justice, science, and culture across the subcontinent.</p>
                <p>He is credited with defeating the Saka invaders who had penetrated deep into Bharatvarsha, earning the title <strong className="text-stone-800">Sakari</strong>. To commemorate this unprecedented victory, he initiated the <strong className="text-stone-800">Vikram Samvat</strong> calendar in 57 BCE — which remains in use across India to this day.</p>
                <p>Ancient literature, folk traditions, copper plates, stone inscriptions, and handwritten manuscripts from hundreds of years attest to his greatness. The <em>Sinhasana Battisi</em> (32 tales of his throne) and the <em>Baital Pachisi</em> (25 stories of Vetala) are beloved literary treasures rooted in his legend.</p>
                <p>Unlike many rulers, Vikramaditya was celebrated not merely for military conquest but for his <strong className="text-stone-800">absolute justice</strong> — holding open court where even the most common citizen could seek redress. His name became a benchmark: a wise and just king in any era would be called Vikramaditya.</p>
              </div>
            </motion.div>

            {/* Right: key facts panel */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-8 space-y-5">
                <p className="text-amber-700 text-xs font-bold uppercase tracking-[0.25em]">Key Facts</p>
                {[
                  { label: 'Capital', value: 'Ujjayini (Ujjain), Madhya Pradesh' },
                  { label: 'Era', value: 'c. 1st Century BCE' },
                  { label: 'Calendar Founded', value: 'Vikram Samvat (57 BCE) — in use today' },
                  { label: 'Title', value: 'Chakravartin · Sakari · Vikramaditya' },
                  { label: 'Court', value: 'The legendary Navratnas (Nine Jewels)' },
                  { label: 'Legacy', value: '32 Sinhasana tales of wisdom & justice' },
                  { label: 'Archaeological Proof', value: 'Coins, copper plates, inscriptions from Vikram Samvat era' },
                  { label: 'Modern Institute', value: 'Maharaja Vikramaditya Shodhpeeth, est. 2009' },
                ].map(f => (
                  <div key={f.label} className="flex gap-4 items-baseline border-b border-amber-100 pb-4 last:border-0 last:pb-0">
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600 w-32 flex-shrink-0">{f.label}</span>
                    <span className="text-stone-700 text-sm">{f.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VIRTUES ───────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf3)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Imperial Virtues"
            title="The Many Dimensions of Greatness"
            subtitle="Vikramaditya was not simply a conqueror — he embodied a complete ideal of kingship across justice, wisdom, science, and the arts."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {virtueCards.map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white border border-stone-200 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-stone-900 mb-2 text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>{card.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIKRAM SAMVAT ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="rounded-3xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 opacity-5" style={{ background: 'radial-gradient(circle at top right, #b5820a, transparent)' }} />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em] mb-3">The Eternal Calendar</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                Vikram Samvat — <span className="gold-text">57 BCE</span>
              </h2>
              <Ornament className="max-w-xs mb-6" />
              <div className="grid md:grid-cols-2 gap-8 text-stone-600 leading-relaxed">
                <p>After his historic victory over the Saka invaders and the liberation of Bharatvarsha, Emperor Vikramaditya proclaimed a new era — the <strong className="text-stone-800">Vikram Samvat</strong>. The year of his great victory, 57 BCE, became Year 1 of this calendar.</p>
                <p>Today, over <strong className="text-stone-800">1.4 billion</strong> people across South Asia use Vikram Samvat for religious, cultural, and civic purposes. Every Hindu festival, auspicious occasion, and traditional ritual is timed by this calendar — making Vikramaditya's legacy a living presence in modern life. The current year is <strong className="text-stone-800">Vikram Samvat 2082</strong>.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NAVRATNAS ─────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf3)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Nine Jewels"
            title="Navratnas of Vikramaditya"
            subtitle="Nine brilliant scholars, scientists, and artists formed the legendary court of Emperor Vikramaditya, making Ujjain the knowledge capital of the ancient world."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {navratnas.map((n, i) => (
              <motion.div key={n.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0 w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">{n.icon}</div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{n.name}</h3>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5 mb-2">{n.domain}</span>
                    <p className="text-stone-500 text-xs leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Through the Ages" title="A Legacy That Spans Millennia" />
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-amber-200 md:-translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0 pl-10 md:pl-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 md:left-1/2 top-3 w-3 h-3 rounded-full bg-amber-400 border-2 border-white shadow md:-translate-x-1/2 ring-2 ring-amber-100" />

                  {/* Card */}
                  <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} md:${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 hover:border-amber-200 transition-colors">
                      <p className="text-amber-700 text-xs font-bold uppercase tracking-[0.2em] mb-1">{item.year}</p>
                      <h3 className="font-bold text-stone-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{item.event}</h3>
                      <p className="text-stone-500 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT MVS SHODHPEETH ──────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf3)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionHeader eyebrow="The Institute" title="Maharaja Vikramaditya Shodhpeeth" left />
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>Established in <strong className="text-stone-800">2009</strong> under the <strong className="text-stone-800">Directorate of Swaraj Sansthan, Culture Department, Government of Madhya Pradesh</strong>, the Maharaja Vikramaditya Shodhpeeth is a premier research institute dedicated to the study of Emperor Vikramaditya, his era, and Indology (Bharatvidya).</p>
                <p>The Shodhpeeth organizes fellowships, ideological seminars, lectures, debates, and workshops. It publishes the scholarly journals <em>Vikramark</em> and <em>Vikram Samvad</em>, and produces the <strong className="text-stone-800">Bharat Vikram</strong> YouTube series and the annual Vikram Panchang.</p>
                <p>Every year, the Shodhpeeth hosts <strong className="text-stone-800">Vikramotsav</strong> — a grand cultural festival held in Ujjain that celebrates the legacy of Vikramaditya through arts, performances, research presentations, and public outreach.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="https://www.mvspujjain.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-white transition-all hover:shadow-md"
                  style={{ background: 'linear-gradient(135deg, #8b6914, #d4a017)' }}>
                  Visit Official Website ↗
                </a>
                <Link href="/rules"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-amber-800 border-2 border-amber-300 bg-white hover:bg-amber-50 transition-all">
                  Award Guidelines
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🏛️', title: 'Est. 2009', sub: 'Founded by Culture Dept., MP' },
                  { icon: '📖', title: 'Research', sub: 'Fellowships & scholarly publications' },
                  { icon: '🎭', title: 'Vikramotsav', sub: 'Annual cultural festival in Ujjain' },
                  { icon: '🏆', title: 'Samman', sub: 'International award programme' },
                  { icon: '🎬', title: 'Bharat Vikram', sub: 'YouTube animated series' },
                  { icon: '🗿', title: 'Archaeology', sub: 'Ancient inscriptions & coinage' },
                ].map((item, i) => (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="bg-white border border-stone-200 rounded-xl p-5 hover:border-amber-200 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="font-bold text-stone-900 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{item.title}</p>
                    <p className="text-stone-400 text-xs mt-0.5">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ARCHAEOLOGICAL PROOF ──────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-amber-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionHeader
              eyebrow="Historical Evidence"
              title="Proof in Stone, Copper & Gold"
              subtitle="Unlike many legendary rulers whose existence is only oral tradition, Vikramaditya is attested by abundant material evidence — coins, copper plates, inscriptions bearing his Samvat, and thousands of ancient manuscripts."
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                { title: 'Vikram Samvat Inscriptions', desc: 'Stone inscriptions dated in Vikram Samvat found across Rajasthan, MP, and Gujarat confirm the calendar\'s antiquity and authenticity.' },
                { title: 'Copper Plates & Coins', desc: 'Tamra Mudras (copper seals) bearing the "Vikram" inscription, including the Krid copper coin, are preserved at the Shodhpeeth.' },
                { title: 'Ancient Manuscripts', desc: 'Thousands of handwritten Sanskrit manuscripts from the Vikramaditya era have been catalogued, covering medicine, astronomy, literature, and law.' },
              ].map((ev, i) => (
                <div key={ev.title} className="bg-amber-50 border border-amber-100 rounded-xl p-6 text-left">
                  <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm mb-4">{i + 1}</div>
                  <h3 className="font-bold text-stone-900 mb-2 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>{ev.title}</h3>
                  <p className="text-stone-500 text-xs leading-relaxed">{ev.desc}</p>
                </div>
              ))}
            </div>
            <a href="https://www.mvspujjain.com/archaeological-evidences/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-amber-300 text-amber-800 text-sm font-bold uppercase tracking-[0.15em] hover:bg-amber-50 transition-all">
              View Archaeological Evidence ↗
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-amber-100" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf3)' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em] mb-4">Carry the Legacy Forward</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Nominate for <span className="gold-text">Samman 2026</span>
            </h2>
            <Ornament className="max-w-xs mx-auto mb-6" />
            <p className="text-stone-500 mb-8 leading-relaxed">
              Do you know someone whose work embodies Vikramaditya's timeless virtues? Nominations are open to individuals and organizations worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/nominate"
                className="px-9 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #8b6914, #d4a017)', boxShadow: '0 4px 20px rgba(181,130,10,0.3)' }}>
                Begin Nomination
              </Link>
              <Link href="/rules"
                className="px-9 py-4 rounded-full text-sm font-bold uppercase tracking-[0.15em] text-amber-800 border-2 border-amber-300 bg-white hover:bg-amber-50 transition-all">
                Read Guidelines
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}