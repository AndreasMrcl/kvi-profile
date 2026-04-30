import { useEffect, useState } from 'react';
import { hero, heroServices, heroSlides } from '../data/siteData';
import { navigate } from '../hooks/useRoute';

const AUTOPLAY_MS = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i) => setActive(((i % heroSlides.length) + heroSlides.length) % heroSlides.length);

  return (
    <section id="home" className="relative bg-paper-50">
      {/* Full-bleed banner */}
      <div
        className="relative w-full overflow-hidden pt-[88px] md:pt-[104px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full h-[420px] sm:h-[480px] md:h-[560px] lg:h-[620px]">
          {/* Slides */}
          {heroSlides.map((slide, i) => {
            const isActive = i === active;
            return (
              <div
                key={slide.id}
                className={` transition-opacity duration-[1200ms] ease-in-out
                  ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                aria-hidden={!isActive}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center md:bg-right"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />
                {/* Left-side overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 from-0% via-navy-900/60 via-45% to-navy-900/10 to-90%" />
                {/* Bottom soft fade so service cards underneath read well */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/40 to-transparent" />

                <div className="relative z-10 h-full">
                  <div className="max-w-[1320px] mx-auto h-full px-6 md:px-10 flex flex-col justify-center">
                    <div className="max-w-xl lg:max-w-[560px]">
                      <h1 className="font-display text-2xl sm:text-3xl md:text-[40px] lg:text-[44px] font-extrabold text-white leading-[1.18] mb-5 uppercase tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                        {slide.headline}
                      </h1>
                      <p className="text-white/90 text-sm md:text-[15px] font-body max-w-lg leading-relaxed mb-7">
                        {slide.subheadline}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {slide.buttons.map((b) => (
                          <button
                            key={b.label}
                            onClick={() => navigate(b.path, b.anchor)}
                            className={`px-6 py-3 rounded-md text-xs md:text-[13px] font-bold tracking-wider transition-all
                              ${b.primary
                                ? 'bg-kvi-600 hover:bg-kvi-700 text-white shadow-card'
                                : 'bg-white hover:bg-paper-100 text-navy-800 border border-white/60'
                              }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Controls */}
          <button
            onClick={() => go(active - 1)}
            aria-label="Previous slide"
            className="hidden md:flex absolute z-20 left-4 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/15 hover:bg-white text-white hover:text-navy-800 backdrop-blur border border-white/30 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => go(active + 1)}
            aria-label="Next slide"
            className="hidden md:flex absolute z-20 right-4 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-white/15 hover:bg-white text-white hover:text-navy-800 backdrop-blur border border-white/30 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute z-20 bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all
                  ${i === active ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Service cards — overlapping the banner edge */}
      <div className="relative z-20 -mt-14 md:-mt-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {heroServices.map((s, i) => (
              <a
                key={s.number}
                href={s.href}
                className="group relative bg-white rounded-xl p-5 md:p-6 shadow-card border border-zinc-100 hover:border-kvi-600 hover:-translate-y-1 transition-all duration-300 reveal-item"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-kvi-50 flex items-center justify-center flex-shrink-0 group-hover:bg-kvi-600 transition-colors">
                    <svg
                      className="w-6 h-6 md:w-7 md:h-7 text-kvi-600 group-hover:text-white transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.6}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-kvi-600 font-display font-bold text-lg leading-none">
                        {s.number}.
                      </span>
                      <h3 className="font-display font-bold text-navy-800 text-base md:text-[17px] leading-tight">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-sm mt-1.5 font-body">
                      {s.subtitle}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Pengantar */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <p className="text-center max-w-3xl mx-auto mt-10 text-zinc-600 font-body text-sm md:text-base leading-relaxed reveal-item">
          {hero.pengantar}
        </p>
      </div>
    </section>
  );
}
