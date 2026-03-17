export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');
        .ftr-serif { font-family: 'Cormorant Garamond', serif; }
        .ftr-sans  { font-family: 'Jost', sans-serif; }
      `}</style>

      <footer style={{ background: '#080500', borderTop: '1px solid rgba(212,160,23,0.12)', paddingTop: 64, paddingBottom: 32 }}>

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 48, marginBottom: 56 }}>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <img
                  src="/logo.png"
                  alt="Logo"
                  style={{ width: 40, height: 'auto', filter: 'drop-shadow(0 2px 8px rgba(212,160,23,0.3))' }}
                />
                <div>
                  <p className="ftr-serif" style={{ color: '#d4a017', fontSize: 18, fontWeight: 600, lineHeight: 1.1 }}>
                    Vikramaditya Samman
                  </p>
                  <p className="ftr-sans" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: 4 }}>
                    Samman 2026
                  </p>
                </div>
              </div>
              <p className="ftr-sans" style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, lineHeight: 1.8, fontWeight: 300 }}>
                Organized by Maharaja Vikramaditya Shodhpeeth,<br />
                Culture Department, Madhya Pradesh Government.
              </p>
            </div>

            <div>
              <p className="ftr-sans" style={{ color: 'rgba(212,160,23,0.6)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>
                Contact
              </p>
              <address className="ftr-sans" style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.38)', fontSize: 13, lineHeight: 2, fontWeight: 300 }}>
                Director, Maharaja Vikramaditya Research Chair<br />
                Rabindra Sabhagam Kendra, First Floor<br />
                Rabindra Bhavan Campus, Bhopal<br />
                <a href="mailto:mvspujjain@gmail.com" style={{ color: 'rgba(212,160,23,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  mvspujjain@gmail.com
                </a>
                <br />
                <a href="tel:07554535064" style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}>
                  0755-4535064
                </a>
              </address>
            </div>

            <div>
              <p className="ftr-sans" style={{ color: 'rgba(212,160,23,0.6)', fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 20 }}>
                Award Categories
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['International Award — ₹1.01 Crore', 'National Award — ₹21 Lakh', 'Shikhar Award (3) — ₹5 Lakh each'].map(item => (
                  <li key={item} className="ftr-sans" style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, lineHeight: 1, marginBottom: 14, fontWeight: 300, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(212,160,23,0.4)', flexShrink: 0, display: 'inline-block' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="ftr-sans" style={{ color: 'rgba(212,160,23,0.5)', fontSize: 12, marginTop: 20, fontWeight: 400 }}>
                Last date: <strong style={{ color: '#d4a017' }}>20 May 2026</strong>
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(212,160,23,0.08)', paddingTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <p className="ftr-sans" style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 300, letterSpacing: '0.05em' }}>
              &copy; {new Date().getFullYear()} Maharaja Vikramaditya Shodhpeeth. All rights reserved.
            </p>
            <a
              href="https://mvspujjain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ftr-sans"
              style={{ color: 'rgba(212,160,23,0.5)', fontSize: 11, textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, transition: 'color 0.2s' }}
            >
              awards.mvspujjain.com ↗
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}