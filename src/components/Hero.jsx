import { hero } from '../data/siteData';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden grain"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1673953510197-0950d951c6d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yc3xlbnwwfHwwfHx8MA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/85 via-emerald-950/70 to-emerald-950/90 z-0" />

      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-gold-500/10 animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-gold-500/15" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-8 opacity-0 animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 inline-block" />
          {hero.badge}
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6 opacity-0 animate-fade-up-delay">
          {hero.headline.split('Konsil Veteriner Indonesia')[0]}
          <span className="text-gold-400 italic">Konsil Veteriner Indonesia</span>
          {hero.headline.split('Konsil Veteriner Indonesia')[1]}
        </h1>

        <p className="text-white/80 text-lg md:text-xl font-body font-light max-w-2xl mx-auto mb-4 opacity-0 animate-fade-up-delay2 leading-relaxed">
          {hero.subheadline}
        </p>

        <p className="text-white/55 text-sm md:text-base font-body max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up-delay2 leading-relaxed">
          {hero.pengantar}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up-delay3">
          <a
            href="#about"
            className="px-8 py-3.5 bg-gold-500 text-emerald-950 rounded-full font-semibold text-sm tracking-wide hover:bg-gold-300 transition-all duration-200 shadow-lg shadow-gold-500/20"
          >
            Pelajari Lebih Lanjut
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-white/30 text-white rounded-full text-sm tracking-wide hover:bg-white/10 transition-all duration-200"
          >
            Hubungi Kami
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 text-xs">
        <span>Scroll</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
