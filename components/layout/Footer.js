export default function Footer() {
  const categoryData = [
    { name: 'अंतर्राष्ट्रीय सम्मान', amount: '₹1 करोड़ 1 लाख' },
    { name: 'राष्ट्रीय सम्मान', amount: '₹21 लाख' },
    { name: 'शिखर सम्मान (तीन)', amount: '₹5-5 लाख' }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');
      `}</style>

      <footer className="bg-white border-t border-orange-100 pt-16 pb-8 mt-auto" style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* New Combined Logo and organization info column (Graphic + Maroon Banner + Hindi Text) */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <img
                src="/assets/images/image_6.png"
                alt="महाराजा विक्रमादित्य शोधपीठ, मध्यप्रदेश शासन संस्कृति विभाग"
                className="w-[50%] max-w-sm h-auto drop-shadow-sm mb-4"
              />
            </div>

            {/* Contact Information */}
            <div>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-5">
                संपर्क
              </p>
              <address className="not-italic text-slate-600 text-[0.95rem] leading-loose">
                निदेशक, महाराजा विक्रमादित्य शोधपीठ <br />
                बिड़ला भवन, देवास रोड, उज्जैन <br />
                रवीन्द्र सभागम केंद्र, प्रथम तल, रवीन्द्र भवन परिसर, भोपाल <br />
                <a href="mailto:samratvikramadityasamman@gmail.com" className="text-orange-600 hover:text-orange-700 transition-colors inline-block mt-2 font-medium">
                  samratvikramadityasamman@gmail.com
                </a>
                <br />
                दूरभाष: <a href="tel:07554535064" className="text-slate-700 font-medium hover:text-orange-600 transition-colors">0755-4535064</a>
              </address>
            </div>

            {/* Award Categories & Deadlines */}
            <div>
              <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-5">
                सम्मान श्रेणियाँ
              </p>
              <ul className="space-y-3 m-0 p-0 list-none">
                {categoryData.map((category, index) => (
                  <li key={index} className="text-slate-600 text-[0.95rem] flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {category.name}: <strong className="text-slate-700 font-medium ml-1">{category.amount}</strong>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 inline-block bg-orange-50 border border-orange-100 rounded-lg px-4 py-2">
                <p className="text-slate-700 text-sm font-medium">
                  नामांकन की अंतिम तिथि: <strong className="text-red-700">20 मई 2026</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Copyright and Website Link */}
          <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} महाराजा विक्रमादित्य शोधपीठ. सर्वाधिकार सुरक्षित।
            </p>
            <a
              href="https://awards.mvspujjain.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 text-sm font-semibold tracking-wide uppercase hover:text-orange-700 transition-colors flex items-center gap-1"
            >
              awards.mvspujjain.com
            </a>
          </div>
          
        </div>
      </footer>
    </>
  );
}