import { useState, useEffect } from 'react';
import { berita } from '../data/siteData';
import { navigate } from '../hooks/useRoute';

const ARTIKEL = {
  kategori: 'Pengumuman',
  tanggal: '12 November 2024',
  penulis: 'Divisi Registrasi KVI',
  baca: '5 menit baca',
  judul: 'Uji Kompetensi Dokter Hewan Gelombang II Tahun 2024',
  subjudul: 'KVI mengumumkan pelaksanaan Uji Kompetensi Dokter Hewan Gelombang II Tahun 2024 yang akan diselenggarakan secara serentak di seluruh Indonesia.',
  gambar: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1400&auto=format&fit=crop&q=70',
  tags: ['Uji Kompetensi', 'Registrasi', 'STRV', 'Dokter Hewan'],
  konten: [
    { tipe: 'p', isi: 'Konsil Veteriner Indonesia (KVI) dengan ini mengumumkan pelaksanaan Uji Kompetensi Dokter Hewan Gelombang II Tahun 2024. Uji kompetensi ini merupakan bagian dari program registrasi nasional yang wajib ditempuh oleh setiap dokter hewan lulusan baru maupun yang ingin memperpanjang Surat Tanda Registrasi Veteriner (STRV).' },
    { tipe: 'h2', isi: 'Jadwal Pelaksanaan' },
    { tipe: 'p', isi: 'Uji Kompetensi Gelombang II akan dilaksanakan pada tanggal 15 Desember 2024 secara serentak di seluruh pusat uji yang telah ditetapkan oleh KVI. Pendaftaran dibuka mulai 1 November hingga 30 November 2024 melalui portal SIVET.' },
    { tipe: 'quote', isi: 'Uji kompetensi adalah bagian integral dari sistem jaminan mutu profesi veteriner Indonesia. Kami mengajak seluruh dokter hewan untuk berpartisipasi aktif dan mempersiapkan diri dengan baik.' },
    { tipe: 'h2', isi: 'Persyaratan Peserta' },
    { tipe: 'ul', isi: ['Warga negara Indonesia lulusan program studi kedokteran hewan terakreditasi', 'Belum memiliki STRV aktif atau STRV akan habis masa berlakunya', 'Telah menyelesaikan program pendidikan profesi dokter hewan', 'Melampirkan transkrip nilai, ijazah, dan surat keterangan sehat', 'Membayar biaya pendaftaran yang ditetapkan oleh KVI'] },
    { tipe: 'h2', isi: 'Materi Uji Kompetensi' },
    { tipe: 'p', isi: 'Materi uji kompetensi mencakup empat bidang utama: Klinis dan Diagnosis Veteriner, Farmakologi dan Toksikologi, Kesehatan Masyarakat Veteriner, serta Manajemen Praktik dan Etika Profesi.' },
    { tipe: 'h3', isi: 'Format Ujian' },
    { tipe: 'p', isi: 'Uji Kompetensi terdiri dari dua tahap: (1) Ujian Tulis berbasis komputer (CBT) dengan 150 soal pilihan ganda selama 3 jam, dan (2) Ujian OSCE yang menguji keterampilan klinis secara langsung.' },
    { tipe: 'h2', isi: 'Cara Pendaftaran' },
    { tipe: 'p', isi: 'Pendaftaran dilakukan secara online melalui portal SIVET. Calon peserta wajib membuat akun, mengisi formulir pendaftaran, mengunggah dokumen persyaratan, dan melakukan pembayaran biaya pendaftaran.' },
  ],
  infoBox: [
    { label: 'Batas Pendaftaran', val: '30 Nov 2024' },
    { label: 'Tanggal Ujian',     val: '15 Des 2024' },
    { label: 'Format',            val: 'CBT + OSCE' },
    { label: 'Pendaftaran',       val: 'Portal SIVET' },
  ],
};

const KAT_COLOR = {
  Pengumuman: 'bg-kvi-50 text-kvi-600',
  Kegiatan:   'bg-navy-50 text-navy-700',
  Regulasi:   'bg-amber-50 text-amber-700',
};

export default function DetailBerita() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      const el = document.getElementById('article-body');
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      const total = height - window.innerHeight;
      setProgress(Math.min(100, total > 0 ? (scrolled / total) * 100 : 0));
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-kvi-500 z-[100] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Hero */}
      <div className="relative bg-navy-800 pt-[88px] md:pt-[104px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('${ARTIKEL.gambar}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 to-navy-800/95" />
        <div className="relative max-w-[900px] mx-auto px-6 md:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 flex-wrap">
            {[{ label: 'Beranda', path: '/' }, { label: 'Berita & Publikasi', path: '/berita' }, { label: 'Detail Berita' }].map((b, i, arr) => (
              <span key={b.label} className="flex items-center gap-2">
                {i < arr.length - 1 ? (
                  <button onClick={() => navigate(b.path, '')} className="text-xs text-white/50 hover:text-white/80 transition-colors">{b.label}</button>
                ) : (
                  <span className="text-xs text-white/90 font-semibold">{b.label}</span>
                )}
                {i < arr.length - 1 && (
                  <svg className="w-3 h-3 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                )}
              </span>
            ))}
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded ${KAT_COLOR[ARTIKEL.kategori]}`}>{ARTIKEL.kategori}</span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-white/70">{ARTIKEL.tanggal}</span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-white/70">{ARTIKEL.baca}</span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-[1.18] mb-4" style={{ textWrap: 'pretty' }}>{ARTIKEL.judul}</h1>
          <p className="text-white/70 text-[15px] leading-[1.75] max-w-[680px] mb-8">{ARTIKEL.subjudul}</p>

          {/* Author + Share */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-kvi-600 flex items-center justify-center font-display font-bold text-white">K</div>
              <div>
                <div className="text-sm font-bold text-white">{ARTIKEL.penulis}</div>
                <div className="text-xs text-white/50">Konsil Veteriner Indonesia</div>
              </div>
            </div>
            <div className="flex gap-2">
              {[
                'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
                'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
              ].map((d, i) => (
                <button key={i} className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-4 h-4 text-white/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border-t-4 border-kvi-500">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-14">
          <div className="grid md:grid-cols-[1fr_280px] gap-12 items-start">
            {/* Article */}
            <div id="article-body">
              <div className="rounded-2xl overflow-hidden mb-10 shadow-card">
                <img src={ARTIKEL.gambar} alt={ARTIKEL.judul} className="w-full h-[380px] object-cover" />
              </div>

              {/* Prose */}
              <div className="prose-kvi">
                {ARTIKEL.konten.map((b, i) => {
                  if (b.tipe === 'p')     return <p key={i} className="text-[15px] text-zinc-600 leading-[1.85] mb-5">{b.isi}</p>;
                  if (b.tipe === 'h2')    return <h2 key={i} className="font-display text-2xl font-bold text-navy-800 mt-10 mb-4">{b.isi}</h2>;
                  if (b.tipe === 'h3')    return <h3 key={i} className="font-display text-xl font-bold text-navy-800 mt-8 mb-3">{b.isi}</h3>;
                  if (b.tipe === 'quote') return <blockquote key={i} className="border-l-4 border-kvi-500 pl-5 py-2 bg-kvi-50 rounded-r-xl my-8 text-[15px] text-zinc-600 italic leading-relaxed">{b.isi}</blockquote>;
                  if (b.tipe === 'ul')    return (
                    <ul key={i} className="space-y-3 mb-6">
                      {b.isi.map((li, j) => (
                        <li key={j} className="flex items-start gap-3 text-[15px] text-zinc-600 leading-relaxed">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-kvi-500 flex-shrink-0" />
                          {li}
                        </li>
                      ))}
                    </ul>
                  );
                  return null;
                })}
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap mt-10 pt-8 border-t border-paper-200">
                <span className="text-xs font-semibold text-zinc-400">Tags:</span>
                {ARTIKEL.tags.map((t) => (
                  <button key={t} className="px-3 py-1 bg-paper-100 hover:bg-kvi-50 hover:text-kvi-600 text-zinc-500 rounded-lg text-xs font-semibold border border-paper-200 hover:border-kvi-100 transition-all">{t}</button>
                ))}
              </div>

              {/* Prev / Next */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <button onClick={() => navigate('/berita', '')} className="flex items-center gap-3 p-5 bg-paper-50 rounded-xl border border-paper-200 hover:border-kvi-200 transition-all text-left">
                  <svg className="w-5 h-5 text-navy-800 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest mb-1">Sebelumnya</div>
                    <div className="text-sm font-bold text-navy-800 leading-snug">Kebijakan Baru Registrasi STRV 2024</div>
                  </div>
                </button>
                <button onClick={() => navigate('/berita', '')} className="flex items-center justify-end gap-3 p-5 bg-paper-50 rounded-xl border border-paper-200 hover:border-kvi-200 transition-all text-right">
                  <div>
                    <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest mb-1">Berikutnya</div>
                    <div className="text-sm font-bold text-navy-800 leading-snug">Seminar Etika Veteriner Nasional</div>
                  </div>
                  <svg className="w-5 h-5 text-navy-800 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sticky top-24 flex flex-col gap-5">
              {/* TOC */}
              <div className="bg-paper-50 rounded-xl border border-paper-200 p-5">
                <div className="text-[10px] font-bold text-navy-800 uppercase tracking-widest mb-4">Daftar Isi</div>
                {['Jadwal Pelaksanaan', 'Persyaratan Peserta', 'Materi Uji Kompetensi', 'Cara Pendaftaran'].map((t, i) => (
                  <button key={i} className="w-full flex items-center gap-2 text-left text-sm text-zinc-500 hover:text-kvi-600 py-1.5 px-2 rounded-lg hover:bg-kvi-50 transition-all">
                    <svg className="w-3.5 h-3.5 text-kvi-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    {t}
                  </button>
                ))}
              </div>

              {/* Info box */}
              <div className="bg-navy-800 rounded-xl p-5 text-white">
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-4">Informasi Penting</div>
                {ARTIKEL.infoBox.map((info, i) => (
                  <div key={i} className={`flex items-center justify-between py-2.5 ${i < ARTIKEL.infoBox.length - 1 ? 'border-b border-white/8' : ''}`}>
                    <span className="text-xs text-white/55">{info.label}</span>
                    <span className="text-xs font-bold text-kvi-300">{info.val}</span>
                  </div>
                ))}
                <button
                  onClick={() => navigate('/registrasi', '')}
                  className="w-full mt-4 py-2.5 bg-kvi-500 hover:bg-kvi-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  Daftar via SIVET
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>

              {/* Share */}
              <div className="bg-white rounded-xl border border-paper-200 p-5">
                <div className="text-[10px] font-bold text-navy-800 uppercase tracking-widest mb-4">Bagikan Artikel</div>
                <div className="flex gap-2">
                  {[
                    { label: 'Facebook', color: 'bg-[#1877f2]', d: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z' },
                    { label: 'Twitter', color: 'bg-zinc-900', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.844L2.007 2.25H8.47l4.264 5.628z' },
                    { label: 'WhatsApp', color: 'bg-[#25d366]', d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z' },
                  ].map((s) => (
                    <button key={s.label} aria-label={s.label} className={`flex-1 py-2.5 ${s.color} text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity`}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d={s.d} /></svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Berita Terkait */}
        <section className="bg-paper-100 py-16">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-navy-800 mb-1.5">Berita Terkait</h2>
                <div className="h-[3px] w-12 bg-kvi-500 rounded-full" />
              </div>
              <button onClick={() => navigate('/berita', '')} className="text-sm font-bold text-kvi-600 hover:text-kvi-700 transition-colors inline-flex items-center gap-1.5">
                Lihat Semua
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {berita.filter((b) => !b.featured).slice(0, 3).map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => navigate('/berita/detail', '')}
                  className="text-left bg-white rounded-xl overflow-hidden border border-zinc-100 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 reveal-item"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={b.gambar} alt={b.judul} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${KAT_COLOR[b.kategori] || ''}`}>{b.kategori}</span>
                      <span className="text-[11px] text-zinc-400">{b.tanggal}</span>
                    </div>
                    <h3 className="font-display font-bold text-navy-800 text-[15px] leading-snug">{b.judul}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
