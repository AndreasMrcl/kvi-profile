import { useState } from 'react';
import { berita, publikasi, acara, sivet } from '../data/siteData';
import { navigate } from '../hooks/useRoute';
import PageHero from '../components/PageHero';

const KAT_COLOR = {
  Pengumuman: { pill: 'bg-kvi-50 text-kvi-600',    border: 'border-kvi-200' },
  Kegiatan:   { pill: 'bg-navy-50 text-navy-700',   border: 'border-navy-200' },
  Regulasi:   { pill: 'bg-amber-50 text-amber-700', border: 'border-amber-200' },
};
const TIPE_COLOR = {
  Peraturan: { pill: 'bg-kvi-50 text-kvi-700 border-kvi-100',    icon: 'text-kvi-600' },
  Kebijakan: { pill: 'bg-navy-50 text-navy-700 border-navy-100',  icon: 'text-navy-700' },
  Panduan:   { pill: 'bg-amber-50 text-amber-700 border-amber-100',icon: 'text-amber-600' },
};

const TIPE_ICON = {
  Peraturan: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  Kebijakan: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  Panduan:   'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
};

/* ── Featured article ── */
function FeaturedArticle({ item }) {
  const c = KAT_COLOR[item.kategori] || {};
  return (
    <div className="grid sm:grid-cols-2 rounded-2xl overflow-hidden bg-white border border-zinc-100 shadow-card mb-10 reveal-item">
      <div className="relative overflow-hidden min-h-[280px]">
        <img src={item.gambar} alt={item.judul} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/30 to-transparent" />
        <span className="absolute top-4 left-4 bg-kvi-500 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wider">
          Berita Utama
        </span>
      </div>
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${c.pill}`}>{item.kategori}</span>
          <span className="text-zinc-400 text-[11px]">·</span>
          <span className="text-zinc-500 text-xs">{item.tanggal}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-navy-800 leading-snug mb-4" style={{ textWrap: 'pretty' }}>{item.judul}</h2>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">{item.ringkasan}</p>
        <button
          onClick={() => navigate('/berita/detail', '')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-kvi-500 hover:bg-kvi-600 text-white rounded-lg text-[13px] font-bold transition-colors w-fit"
        >
          Baca Selengkapnya
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── News card ── */
function NewsCard({ item, delay = 0 }) {
  const c = KAT_COLOR[item.kategori] || {};
  return (
    <article
      className="group bg-white rounded-xl overflow-hidden border border-zinc-100 shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-kvi-200 transition-all duration-300 reveal-item flex flex-col"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
        <img src={item.gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-2">
          <span className={`font-semibold px-2 py-0.5 rounded ${c.pill}`}>{item.kategori}</span>
          <span className="text-zinc-400">{item.tanggal}</span>
        </div>
        <h3 className="font-display font-bold text-navy-800 text-[15px] leading-snug mb-2 line-clamp-2 flex-1">{item.judul}</h3>
        <p className="text-zinc-500 text-xs leading-relaxed mb-4 line-clamp-2">{item.ringkasan}</p>
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
  );
}

/* ── Publikasi card ── */
function PublikasiCard({ item, delay = 0 }) {
  const c = TIPE_COLOR[item.tipe] || TIPE_COLOR.Panduan;
  const icon = TIPE_ICON[item.tipe] || TIPE_ICON.Panduan;
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 reveal-item flex flex-col gap-4"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${c.pill}`}>
          <svg className={`w-5 h-5 ${c.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${c.pill}`}>{item.tipe}</span>
            <span className="text-[10px] text-zinc-400">{item.tahun}</span>
          </div>
          <h3 className="font-display font-bold text-navy-800 text-[14px] leading-snug line-clamp-2">{item.judul}</h3>
        </div>
      </div>
      <div className="bg-paper-50 rounded-lg p-3 border border-paper-200">
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{item.desc}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {item.halaman}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-zinc-400">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            {item.ukuran}
          </span>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold rounded-md transition-colors">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Unduh PDF
        </button>
      </div>
    </div>
  );
}

/* ── Events sidebar ── */
function EventsSidebar() {
  return (
    <div className="flex flex-col gap-5">
      {/* Acara */}
      <div>
        <h2 className="font-display text-xl font-bold text-navy-800 mb-1.5">ACARA MENDATANG</h2>
        <div className="h-[3px] w-14 bg-kvi-500 rounded-full mb-5" />
        <div className="bg-white rounded-xl border border-zinc-100 shadow-soft overflow-hidden">
          {acara.map((a, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 hover:bg-kvi-50/60 transition-colors cursor-pointer
                ${i < acara.length - 1 ? 'border-b border-zinc-100' : ''}`}
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
            </div>
          ))}
        </div>
      </div>

      {/* SIVET card */}
      <div
        onClick={() => navigate('/registrasi', '')}
        className="group relative bg-gradient-to-br from-kvi-600 to-kvi-800 rounded-xl p-6 text-white overflow-hidden shadow-card hover:shadow-xl transition-shadow cursor-pointer"
      >
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/5" />
        <div className="relative">
          <div className="w-14 h-14 rounded-lg bg-white/15 flex items-center justify-center mb-4">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold mb-1">{sivet.title}</h3>
          <p className="text-white/75 text-xs mb-2">{sivet.subtitle}</p>
          <p className="text-white/65 text-xs leading-relaxed mb-5">{sivet.desc}</p>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white text-kvi-700 rounded-md text-xs font-bold group-hover:gap-3 transition-all">
            {sivet.cta}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Berita tab ── */
const KATEGORI = ['Semua', 'Pengumuman', 'Kegiatan', 'Regulasi'];

function BeritaTab() {
  const [filter, setFilter] = useState('Semua');
  const [query, setQuery]   = useState('');
  const [page, setPage]     = useState(1);
  const PER_PAGE = 6;

  const filtered = berita.filter((b) => {
    const matchCat = filter === 'Semua' || b.kategori === filter;
    const matchQ   = !query || b.judul.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = berita.find((b) => b.featured);
  const rest      = filtered.filter((b) => !b.featured);
  const total     = Math.ceil(rest.length / PER_PAGE);
  const paged     = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-7">
        <div className="flex gap-2">
          {KATEGORI.map((k) => (
            <button
              key={k}
              onClick={() => { setFilter(k); setPage(1); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${filter === k ? 'bg-kvi-500 border-kvi-500 text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-kvi-300'}`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Cari berita..."
            className="pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-xs font-body outline-none focus:border-kvi-400 w-52 bg-white"
          />
        </div>
      </div>

      {filter === 'Semua' && !query && featured && <FeaturedArticle item={featured} />}

      {paged.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {paged.map((item, i) => <NewsCard key={item.id} item={item} delay={i * 60} />)}
        </div>
      ) : (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-sm font-semibold">Tidak ada berita ditemukan</p>
        </div>
      )}

      {total > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="w-9 h-9 rounded-lg border border-zinc-200 bg-white flex items-center justify-center disabled:opacity-40">
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-all border
                ${page === n ? 'bg-kvi-500 border-kvi-500 text-white' : 'bg-white border-zinc-200 text-zinc-500'}`}
            >
              {n}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(total, p + 1))} disabled={page === total} className="w-9 h-9 rounded-lg border border-zinc-200 bg-white flex items-center justify-center disabled:opacity-40">
            <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Publikasi tab ── */
const TIPE_LIST = ['Semua', 'Peraturan', 'Kebijakan', 'Panduan'];

function PublikasiTab() {
  const [filter, setFilter] = useState('Semua');
  const [query, setQuery]   = useState('');

  const filtered = publikasi.filter((p) => {
    const matchTipe = filter === 'Semua' || p.tipe === filter;
    const matchQ    = !query || p.judul.toLowerCase().includes(query.toLowerCase());
    return matchTipe && matchQ;
  });

  return (
    <div>
      {/* Banner */}
      <div className="relative bg-navy-800 rounded-2xl p-7 mb-7 overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-40" />
        <div className="relative flex items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-bold text-white mb-1.5">Dokumen Resmi &amp; Publikasi</h2>
            <p className="text-white/65 text-sm max-w-md">Peraturan, kebijakan, dan panduan resmi yang diterbitkan oleh Konsil Veteriner Indonesia.</p>
          </div>
          <div className="hidden md:flex gap-8 flex-shrink-0">
            {[['12+', 'Dokumen'], ['3', 'Kategori'], ['2024', 'Edisi Terbaru']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="font-display text-2xl font-extrabold text-kvi-300">{n}</div>
                <div className="text-[10px] text-white/55 font-bold uppercase tracking-wider mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex gap-2">
          {TIPE_LIST.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all
                ${filter === t ? 'bg-navy-800 border-navy-800 text-white' : 'bg-white border-zinc-200 text-zinc-600 hover:border-navy-300'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari publikasi..."
            className="pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-xs font-body outline-none focus:border-kvi-400 w-52 bg-white"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {filtered.map((item, i) => <PublikasiCard key={item.id} item={item} delay={i * 60} />)}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-zinc-400">
          <p className="text-sm font-semibold">Tidak ada dokumen ditemukan</p>
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default function BeritaPublikasi() {
  const [activeTab, setActiveTab] = useState('berita');

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Berita & Publikasi' }]}
        title="BERITA & PUBLIKASI"
        subtitle="Informasi terkini, pengumuman resmi, dan dokumen publikasi dari Konsil Veteriner Indonesia."
        tabs={[
          { key: 'berita',    label: 'Berita & Pengumuman' },
          { key: 'publikasi', label: 'Publikasi & Dokumen' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className={`border-t-4 border-kvi-500 ${activeTab === 'berita' ? 'bg-paper-50' : 'bg-white'}`}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
            <div>{activeTab === 'berita' ? <BeritaTab /> : <PublikasiTab />}</div>
            <div className="sticky top-24"><EventsSidebar /></div>
          </div>
        </div>
      </div>
    </>
  );
}
