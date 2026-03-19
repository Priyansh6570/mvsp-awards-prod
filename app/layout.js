import './globals.css';
import Script from 'next/script';
import VisitorTracker from '@/components/VisitorTracker';
import SiteShell from '@/components/layout/SiteShell';

export const metadata = {
  metadataBase: new URL('https://awards.mvspujjain.com'),

  title: {
    default: 'सम्राट विक्रमादित्य सम्मान 2026 | Samrat Vikramaditya Samman',
    template: '%s | सम्राट विक्रमादित्य सम्मान',
  },

  description:
    'सम्राट विक्रमादित्य सम्मान — महाराजा विक्रमादित्य शोधपीठ, संस्कृति विभाग, मध्यप्रदेश शासन द्वारा प्रदत्त अंतर्राष्ट्रीय, राष्ट्रीय एवं शिखर सम्मान। पुरस्कार राशि ₹1 करोड़ 1 लाख तक। नामांकन 20 मई 2026 तक।',

  keywords: [
    'सम्राट विक्रमादित्य सम्मान',
    'Samrat Vikramaditya Samman',
    'Maharaja Vikramaditya Shodhpeeth',
    'महाराजा विक्रमादित्य शोधपीठ',
    'MP award 2026',
    'Madhya Pradesh cultural award',
    'national award India',
    'international award India',
    'Vikramaditya award',
    'Ujjain award',
    'संस्कृति विभाग मध्यप्रदेश',
    'vikram samvat 2083',
    'nomination 2026',
    'shikhar samman',
  ],

  authors: [{ name: 'Maharaja Vikramaditya Shodhpeeth', url: 'https://awards.mvspujjain.com' }],
  creator: 'Maharaja Vikramaditya Shodhpeeth',
  publisher: 'Culture Department, Government of Madhya Pradesh',

  alternates: {
    canonical: '/',
    languages: {
      'hi-IN': '/hi',
      'en-IN': '/en',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    alternateLocale: ['en_IN'],
    url: 'https://awards.mvspujjain.com',
    siteName: 'सम्राट विक्रमादित्य सम्मान',
    title: 'सम्राट विक्रमादित्य सम्मान 2026 — नामांकन आमंत्रित',
    description:
      'न्याय, दानशीलता, शौर्य एवं मानव कल्याण के क्षेत्र में उत्कृष्ट योगदान के लिए ₹1 करोड़ 1 लाख तक का सम्मान। अंतिम तिथि 20 मई 2026।',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'सम्राट विक्रमादित्य सम्मान 2026',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'सम्राट विक्रमादित्य सम्मान 2026',
    description:
      '₹1 करोड़ 1 लाख तक का राष्ट्रीय एवं अंतर्राष्ट्रीय सम्मान। नामांकन अंतिम तिथि 20 मई 2026। महाराजा विक्रमादित्य शोधपीठ, म.प्र. शासन।',
    images: ['/og-image.jpg'],
    creator: '@mvspujjain',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  manifest: '/site.webmanifest',

  verification: {
    google: 'REPLACE_WITH_YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
  },

  category: 'government, awards, culture',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <Script id="react-dom-patch" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && typeof Node !== 'undefined') {
              const originalRemoveChild = Node.prototype.removeChild;
              Node.prototype.removeChild = function(child) {
                if (child.parentNode !== this) { return child; }
                return originalRemoveChild.apply(this, arguments);
              };
              const originalInsertBefore = Node.prototype.insertBefore;
              Node.prototype.insertBefore = function(newNode, referenceNode) {
                if (referenceNode && referenceNode.parentNode !== this) { return newNode; }
                return originalInsertBefore.apply(this, arguments);
              };
            }
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              "name": "महाराजा विक्रमादित्य शोधपीठ",
              "alternateName": "Maharaja Vikramaditya Shodhpeeth",
              "url": "https://awards.mvspujjain.com",
              "logo": "https://awards.mvspujjain.com/logo.png",
              "description": "महाराजा विक्रमादित्य शोधपीठ, संस्कृति विभाग, मध्यप्रदेश शासन द्वारा सम्राट विक्रमादित्य सम्मान का आयोजन।",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "बिड़ला भवन, देवास रोड",
                "addressLocality": "उज्जैन",
                "addressRegion": "मध्यप्रदेश",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-755-4535064",
                "email": "samratvikramadityasamman@gmail.com",
                "contactType": "customer service"
              },
              "award": {
                "@type": "Thing",
                "name": "सम्राट विक्रमादित्य सम्मान 2026",
                "description": "अंतर्राष्ट्रीय, राष्ट्रीय एवं शिखर सम्मान — ₹1 करोड़ 1 लाख, ₹21 लाख एवं ₹5 लाख पुरस्कार राशि।"
              }
            })
          }}
        />
      </head>

      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
        <VisitorTracker />

        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'hi', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>

        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}