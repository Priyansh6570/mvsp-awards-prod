import './globals.css';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Samrat Vikramaditya Samman',
  description: 'International, National, and Shikhar Awards organized by Maharaja Vikramaditya Shodhpeeth, Culture Department, Madhya Pradesh.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script id="react-dom-patch" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined' && typeof Node !== 'undefined') {
              const originalRemoveChild = Node.prototype.removeChild;
              Node.prototype.removeChild = function(child) {
                if (child.parentNode !== this) {
                  return child;
                }
                return originalRemoveChild.apply(this, arguments);
              };
              const originalInsertBefore = Node.prototype.insertBefore;
              Node.prototype.insertBefore = function(newNode, referenceNode) {
                if (referenceNode && referenceNode.parentNode !== this) {
                  return newNode;
                }
                return originalInsertBefore.apply(this, arguments);
              };
            }
          `}
        </Script>
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
        
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { 
                  pageLanguage: 'en',
                  autoDisplay: false
                }, 
                'google_translate_element'
              );
            }
          `}
        </Script>

        <Header />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
        
      </body>
    </html>
  );
}