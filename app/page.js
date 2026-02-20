"use client";

import Head from 'next/head';

export default function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-white">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-3"></div>
          <span className="text-sm font-medium tracking-[0.2em] uppercase text-blue-400">Status: In Progress</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
          Site is in <br /> Development
        </h1>

        <p className="max-w-md text-lg text-white/60 mb-12 leading-relaxed">
          We're tailoring a unique digital experience just for you. 
          The mvsp-awards platform will be launching soon.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="https://mvspujjain.com" 
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Back to Home</span>
            <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              Visit mvspujjain.com
            </span>
          </a>
        </div>
      </main>

      <footer className="absolute bottom-8 z-10 text-white/30 text-xs tracking-widest uppercase">
        © {new Date().getFullYear()} MVSP Awards
      </footer>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
      `}</style>
    </div>
  );
}
