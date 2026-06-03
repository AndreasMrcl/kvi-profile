import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sivet } from '../data/siteData';
import { fetchArticles, FALLBACK_NEWS_IMG } from '../api/articles';
import { fetchEvents } from '../api/events';

export default function NewsEvents() {
  const [articles, setArticles] = useState([]);
  const [acara, setAcara] = useState([]);

  useEffect(() => {
    let active = true;
    fetchArticles()
      .then((data) => active && setArticles(data))
      .catch(() => active && setArticles([]));
    fetchEvents()
      .then((data) => active && setAcara(data))
      .catch(() => active && setAcara([]));
    return () => {
      active = false;
    };
  }, []);

  const items = articles.slice(0, 6);

  return (
    <section id="berita" className="py-16 md:py-20 bg-paper-50">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* News */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-[28px] font-bold text-navy-800 leading-tight">
                  BERITA & PENGUMUMAN TERKINI
                </h2>
                <div className="h-1 w-16 bg-kvi-500 rounded mt-2" />
              </div>
              <Link
                to="/berita"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-zinc-200 text-zinc-600 hover:bg-kvi-50 hover:text-kvi-600 hover:border-kvi-200 transition text-xs font-semibold"
              >
                Lihat Semua
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="bg-white rounded-xl border border-zinc-100 shadow-soft py-16 text-center text-zinc-400 text-sm font-semibold">
                Belum ada berita.
              </div>
            ) : (
              <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
                {items.map((item, i) => (
                  <article
                    key={item.id}
                    className="group bg-white rounded-xl overflow-hidden border border-zinc-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 reveal-item"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
                      <img
                        src={item.gambar || FALLBACK_NEWS_IMG}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-2">
                        <span className="text-kvi-600 font-semibold">{item.kategori}</span>
                        <span className="text-zinc-300">·</span>
                        <span className="text-zinc-400">{item.tanggal}</span>
                      </div>
                      <h3 className="font-display font-bold text-navy-800 text-base leading-snug mb-2 line-clamp-2">
                        {item.judul}
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed mb-3 line-clamp-2">
                        {item.ringkasan}
                      </p>
                      <Link
                        to={`/berita/${item.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-kvi-500 hover:bg-kvi-600 text-white text-xs font-semibold rounded-md transition-colors"
                      >
                        Baca
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Events + SIVET */}
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl md:text-[28px] font-bold text-navy-800 leading-tight">
                ACARA MENDATANG
              </h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mt-2 mb-6" />

              <div className="bg-white rounded-xl border border-zinc-100 shadow-soft overflow-hidden">
                {acara.length === 0 && (
                  <div className="p-6 text-center text-zinc-400 text-xs font-semibold">
                    Belum ada acara mendatang.
                  </div>
                )}
                {acara.map((a, i) => (
                  <div
                    key={a.id}
                    className={`flex items-center gap-4 p-4
                      ${i < acara.length - 1 ? 'border-b border-zinc-100' : ''}`}
                  >
                    <div className="flex-shrink-0 w-14 text-center bg-kvi-50 rounded-md py-2 border border-kvi-100">
                      <div className="text-[9px] font-semibold tracking-widest text-kvi-600 uppercase">
                        {a.bulan} {a.tahun}
                      </div>
                      <div className="text-xl font-display font-bold text-navy-800 leading-none mt-0.5">
                        {a.tanggal}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="font-display font-semibold text-navy-800 text-sm leading-snug truncate">
                        {a.judul}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {a.lokasi}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SIVET Portal Card */}
            <a
              id="sivet"
              href={sivet.href}
              className="group relative block bg-gradient-to-br from-kvi-600 to-kvi-800 rounded-xl p-6 text-white overflow-hidden shadow-card hover:shadow-xl transition-shadow scroll-mt-28"
            >
              <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -right-2 top-4 w-20 h-20 rounded-full bg-white/5" />

              <div className="relative">
                <div className="w-14 h-14 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold leading-tight mb-1">
                  {sivet.title}
                </h3>
                <p className="text-white/80 text-sm mb-4">{sivet.subtitle}</p>
                <p className="text-white/70 text-xs leading-relaxed mb-5">{sivet.desc}</p>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-kvi-700 rounded-md text-xs font-bold group-hover:gap-3 transition-all">
                  {sivet.cta}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
