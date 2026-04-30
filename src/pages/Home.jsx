import { useEffect, useState } from 'react';
import { heroSlides, heroServices, berita, acara, homeFaq } from '../data/siteData';
import { navigate } from '../hooks/useRoute';

const AUTOPLAY_MS = 6000;

/* ── Hero slider ── */
function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const go = (i) => setActive(((i % heroSlides.length) + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative bg-paper-50 pt-[88px] md:pt-[104px]">
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full h-[420px] sm:h-[500px] md:h-[580px] lg:h-[640px]">
          {heroSlides.map((slide, i) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${i === active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              aria-hidden={i !== active}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-900/88 via-navy-800/55 to-navy-900/15" />
              <div className="relative z-10 h-full max-w-[1320px] mx-auto px-6 md:px-8 flex flex-col justify-center">
                <div className="max-w-2xl">
                  <h1 className="font-display text-3xl md:text-5xl lg:text-[52px] font-extrabold text-white leading-[1.12] mb-5 uppercase tracking-tight" style={{ textWrap: 'pretty' }}>
                    {slide.headline}
                  </h1>
                  <p className="text-white/85 text-sm md:text-[15px] font-body max-w-xl leading-relaxed mb-7">
                    {slide.subheadline}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {slide.buttons.map((b) => (
                      <button
                        key={b.label}
                        onClick={() => navigate(b.path, b.anchor)}
                        className={`px-6 py-3 rounded-lg text-xs md:text-[13px] font-bold tracking-wider transition-all
                          ${b.primary
                            ? 'bg-kvi-600 hover:bg-kvi-700 text-white shadow-card'
                            : 'bg-white hover:bg-paper-100 text-navy-800 border border-white/60'}`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              onClick={() => go(active + dir)}
              aria-label={dir === -1 ? 'Previous' : 'Next'}
              className={`hidden md:flex absolute z-20 top-1/2 -translate-y-1/2 ${dir === -1 ? 'left-4' : 'right-4'} w-11 h-11 items-center justify-center rounded-full bg-white/15 hover:bg-white text-white hover:text-navy-800 backdrop-blur border border-white/30 transition`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={dir === -1 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
              </svg>
            </button>
          ))}

          {/* Dots */}
          <div className="absolute z-20 bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Service cards */}
      <div className="relative z-20 -mt-14 md:-mt-20">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {heroServices.map((s, i) => (
              <a
                key={s.number}
                href={`#${s.path}`}
                onClick={(e) => { e.preventDefault(); navigate(s.path, ''); }}
                className="group relative bg-white rounded-xl p-5 md:p-6 shadow-card border border-zinc-100 hover:border-kvi-600 hover:-translate-y-1 transition-all duration-300 reveal-item"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-kvi-50 flex items-center justify-center flex-shrink-0 group-hover:bg-kvi-600 transition-colors">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-kvi-600 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-kvi-600 font-display font-bold text-lg leading-none">{s.number}.</span>
                      <h3 className="font-display font-bold text-navy-800 text-base md:text-[17px] leading-tight">{s.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-xs md:text-sm mt-1.5 font-body">{s.subtitle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Berita section ── */
const KAT_COLOR = {
  Pengumuman: 'bg-kvi-50 text-kvi-600',
  Kegiatan:   'bg-navy-50 text-navy-800',
  Regulasi:   'bg-amber-50 text-amber-700',
};

function NewsSection() {
  return (
    <section className="bg-paper-50 py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10 items-start">
          {/* Berita */}
          <div>
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="font-display text-2xl md:text-[28px] font-bold text-navy-800 leading-tight">BERITA &amp; PENGUMUMAN</h2>
                <div className="h-[3px] w-14 bg-kvi-500 rounded-full mt-2" />
              </div>
              <button
                onClick={() => navigate('/berita', '')}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-kvi-600 hover:text-kvi-700 transition-colors"
              >
                Lihat Semua
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
              {berita.slice(0, 3).map((item, i) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-xl overflow-hidden border border-zinc-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 reveal-item flex flex-col"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                    <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-2">
                      <span className={`font-semibold px-2 py-0.5 rounded ${KAT_COLOR[item.kategori] || 'bg-zinc-100 text-zinc-600'}`}>{item.kategori}</span>
                      <span className="text-zinc-400">{item.tanggal}</span>
                    </div>
                    <h3 className="font-display font-bold text-navy-800 text-[15px] leading-snug mb-3 line-clamp-2 flex-1">{item.judul}</h3>
                    <button
                      onClick={() => navigate('/berita/detail', '')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kvi-500 hover:bg-kvi-600 text-white text-xs font-semibold rounded-md transition-colors w-fit"
                    >
                      Baca
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar acara */}
          <div className="sticky top-24">
            <h2 className="font-display text-xl font-bold text-navy-800 mb-1.5">ACARA MENDATANG</h2>
            <div className="h-[3px] w-14 bg-kvi-500 rounded-full mb-5" />
            <div className="bg-white rounded-xl border border-zinc-100 shadow-soft overflow-hidden">
              {acara.map((a, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-4 p-4 text-left hover:bg-kvi-50/60 transition-colors ${i < acara.length - 1 ? 'border-b border-zinc-100' : ''}`}
                >
                  <div className="flex-shrink-0 w-14 text-center bg-kvi-50 rounded-md py-2 border border-kvi-100">
                    <div className="text-[9px] font-semibold tracking-widest text-kvi-600 uppercase">{a.bulan} {a.tahun}</div>
                    <div className="text-xl font-display font-bold text-navy-800 leading-none mt-0.5">{a.tanggal}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-navy-800 text-sm leading-snug truncate">{a.judul}</div>
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {a.lokasi}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ section ── */
function FAQSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-[380px_1fr] gap-16 items-start">
          {/* Left */}
          <div className="md:sticky md:top-24">
            <span className="text-[10px] font-body uppercase tracking-widest text-kvi-500 font-bold">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2 leading-tight">Pertanyaan yang Sering Ditanyakan</h2>
            <div className="h-1 w-16 bg-kvi-500 rounded mb-5" />
            <p className="text-zinc-500 font-body text-sm leading-relaxed mb-8">
              Temukan jawaban atas pertanyaan umum seputar registrasi, lisensi, etika profesi, dan layanan KVI.
            </p>
            <button
              onClick={() => navigate('/kontak', '')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-navy-800 hover:bg-navy-900 text-white rounded-lg text-sm font-bold transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Tanya Langsung
            </button>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {homeFaq.map((f, i) => (
              <div
                key={i}
                className={`rounded-xl border-[1.5px] overflow-hidden transition-all duration-200 reveal-item
                  ${open === i ? 'bg-white border-kvi-200 shadow-soft' : 'bg-paper-50 border-paper-200'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="font-display font-bold text-navy-800 text-[15px] leading-snug">{f.q}</span>
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all
                    ${open === i ? 'bg-kvi-500' : 'bg-paper-200'}`}>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${open === i ? 'rotate-180 text-white' : 'text-zinc-400'}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div className="px-5 pb-5 pt-0 text-sm text-zinc-500 leading-relaxed border-t border-paper-200 font-body">
                    <div className="pt-4">{f.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function Home() {
  return (
    <>
      <HeroSlider />
      <NewsSection />
      <FAQSection />
    </>
  );
}
