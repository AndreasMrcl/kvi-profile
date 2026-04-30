import { useState } from 'react';
import { navigate } from '../hooks/useRoute';
import PageHero from '../components/PageHero';

const LAYANAN = [
  {
    kode: 'STRV', label: 'Surat Tanda Registrasi Veteriner', masa: '5 Tahun',
    warna: 'text-kvi-600', bg: 'bg-kvi-50', border: 'border-kvi-200',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    desc: 'Surat tanda registrasi resmi bagi dokter hewan lulusan dalam dan luar negeri yang ingin berpraktik di Indonesia.',
    syarat: ['Ijazah dokter hewan yang dilegalisir', 'Transkrip nilai akademik', 'Sertifikat kompetensi', 'Surat keterangan sehat', 'Pas foto 4×6 (2 lembar)', 'KTP/Paspor yang masih berlaku', 'Bukti pembayaran biaya registrasi'],
  },
  {
    kode: 'SIP', label: 'Surat Izin Praktik Veteriner', masa: '3 Tahun',
    warna: 'text-navy-700', bg: 'bg-navy-50', border: 'border-navy-200',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    desc: 'Izin resmi bagi dokter hewan untuk menjalankan praktik kedokteran hewan di fasilitas tertentu.',
    syarat: ['STRV yang masih berlaku', 'Surat rekomendasi dari organisasi profesi', 'Bukti kepemilikan/sewa fasilitas praktik', 'Daftar peralatan medis veteriner', 'KTP yang masih berlaku', 'Surat pernyataan taat kode etik'],
  },
];

const ALUR = [
  { no: '01', judul: 'Buat Akun SIVET',      desc: 'Daftarkan diri di portal SIVET menggunakan email aktif dan nomor KTP.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { no: '02', judul: 'Unggah Dokumen',        desc: 'Lengkapi formulir dan unggah semua dokumen persyaratan dalam format PDF/JPG.', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
  { no: '03', judul: 'Uji Kompetensi',        desc: 'Ikuti uji kompetensi yang dijadwalkan oleh KVI (khusus pendaftar baru).', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
  { no: '04', judul: 'Verifikasi KVI',        desc: 'Tim KVI melakukan verifikasi dokumen dan data dalam 7–14 hari kerja.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { no: '05', judul: 'Penerbitan Sertifikat', desc: 'Sertifikat STRV/SIP diterbitkan dan dapat diunduh langsung via SIVET.', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
];

const FAQ = [
  { q: 'Berapa lama proses registrasi STRV?',               a: 'Proses verifikasi membutuhkan waktu 7–14 hari kerja setelah semua dokumen dinyatakan lengkap dan valid.' },
  { q: 'Apakah bisa mendaftar tanpa Uji Kompetensi?',       a: 'Uji Kompetensi wajib untuk pendaftar baru. Dokter hewan yang sudah memiliki STRV aktif dapat melakukan perpanjangan tanpa uji kompetensi ulang.' },
  { q: 'Bagaimana jika dokumen saya ditolak?',               a: 'Anda akan mendapat notifikasi email beserta alasan penolakan. Perbaiki dokumen dan ajukan kembali melalui portal SIVET.' },
  { q: 'Apakah SIP dapat digunakan di seluruh Indonesia?',   a: 'SIP berlaku di wilayah yang tercantum dalam surat. Untuk praktik lintas provinsi diperlukan SIP tambahan di wilayah tujuan.' },
  { q: 'Berapa biaya registrasi STRV dan SIP?',              a: 'Biaya ditetapkan melalui peraturan KVI. Cek tarif terkini di portal SIVET atau hubungi sekretariat KVI.' },
];

function CekStatus() {
  const [nomor, setNomor] = useState('');
  return (
    <div className="bg-white rounded-2xl p-7 shadow-card border border-zinc-100">
      <h3 className="font-display font-bold text-navy-800 text-[15px] mb-1">Cek Status Registrasi</h3>
      <p className="text-zinc-500 text-xs leading-relaxed mb-5">Masukkan nomor registrasi atau NIK untuk memeriksa status dan masa berlaku sertifikat.</p>
      <input
        type="text"
        value={nomor}
        onChange={(e) => setNomor(e.target.value)}
        placeholder="Contoh: STRV-2024-001234"
        className="w-full px-4 py-2.5 border-[1.5px] border-zinc-200 focus:border-kvi-400 rounded-xl text-sm font-body outline-none mb-3"
      />
      <button className="w-full py-2.5 bg-kvi-500 hover:bg-kvi-600 text-white rounded-xl text-sm font-bold transition-colors">
        Periksa Status
      </button>
      <p className="text-[11px] text-zinc-400 mt-3 text-center">
        Untuk verifikasi lengkap, login ke{' '}
        <button onClick={() => navigate('/registrasi', '')} className="text-kvi-600 font-semibold hover:underline">portal SIVET</button>
      </p>
    </div>
  );
}

export default function RegistrasiLisensi() {
  const [active, setActive] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const l = LAYANAN[active];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Registrasi & Lisensi' }]}
        title={'REGISTRASI\n& LISENSI\nDOKTER HEWAN'}
        subtitle="Proses pendaftaran STRV dan SIP secara online melalui portal SIVET KVI."
        actions={[
          { label: 'Lihat Alur Pendaftaran', path: '/registrasi', anchor: 'alur', primary: true },
          { label: 'Cek Persyaratan',        path: '/registrasi', anchor: 'layanan', primary: false },
        ]}
      />

      {/* Hero bottom row: cek status card */}
      <div className="bg-navy-800 pb-10">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8">
          <div className="max-w-sm ml-auto -mt-6">
            <CekStatus />
          </div>
        </div>
      </div>

      <div className="border-t-4 border-kvi-500">
        {/* Layanan section */}
        <section id="layanan" className="bg-paper-100 py-20">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold">Jenis Layanan</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2">STRV &amp; SIP</h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mx-auto" />
            </div>
            <div className="grid md:grid-cols-[280px_1fr] gap-6">
              {/* Selector */}
              <div className="flex flex-col gap-4">
                {LAYANAN.map((lay, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-4 p-5 rounded-xl text-left border-2 transition-all
                      ${active === i ? 'bg-white border-kvi-500 shadow-card' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${active === i ? lay.bg : 'bg-paper-200'}`}>
                      <svg className={`w-6 h-6 ${active === i ? lay.warna : 'text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={lay.icon} />
                      </svg>
                    </div>
                    <div>
                      <div className={`font-display font-extrabold text-lg ${active === i ? lay.warna : 'text-zinc-400'}`}>{lay.kode}</div>
                      <div className={`text-xs leading-snug mt-0.5 ${active === i ? 'text-zinc-600' : 'text-zinc-400'}`}>{lay.label}</div>
                    </div>
                  </button>
                ))}
                {/* Masa berlaku */}
                <div className="bg-navy-800 rounded-xl p-5 mt-2">
                  <div className="text-[10px] font-bold text-white/55 uppercase tracking-widest mb-2">Masa Berlaku {l.kode}</div>
                  <div className="font-display text-3xl font-extrabold text-kvi-300">{l.masa}</div>
                  <div className="text-xs text-white/55 mt-1">Dapat diperpanjang sebelum habis</div>
                </div>
              </div>

              {/* Detail */}
              <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-soft">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${l.bg} ${l.border}`}>
                    <svg className={`w-7 h-7 ${l.warna}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={l.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-navy-800">{l.kode}</h3>
                    <p className="text-zinc-500 text-sm">{l.label}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6 pb-6 border-b border-zinc-100">{l.desc}</p>
                <h4 className="font-display font-bold text-navy-800 text-[15px] mb-4">Persyaratan Dokumen</h4>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {l.syarat.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-paper-50 rounded-lg border border-paper-200">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-kvi-500 flex items-center justify-center mt-0.5">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-xs text-zinc-600 leading-snug">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 bg-kvi-500 hover:bg-kvi-600 text-white rounded-xl text-sm font-bold transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-9 0a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
                    Daftar {l.kode} Baru
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 bg-paper-100 hover:bg-paper-200 text-navy-800 rounded-xl text-sm font-bold transition-colors border border-paper-200">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Perpanjang {l.kode}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alur section */}
        <section id="alur" className="bg-white py-20">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold">Prosedur</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2">Alur Pendaftaran</h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mx-auto" />
            </div>
            <div className="grid grid-cols-5 gap-0 relative">
              <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-kvi-200 to-kvi-500" />
              {ALUR.map((a, i) => (
                <div key={i} className="flex flex-col items-center text-center px-4 relative z-10 reveal-item" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-5 border-4 border-white shadow-soft
                    ${i < 2 ? 'bg-kvi-500 shadow-kvi-500/30' : 'bg-white border-kvi-200'}`}>
                    <svg className={`w-7 h-7 ${i < 2 ? 'text-white' : 'text-kvi-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-kvi-600 tracking-widest mb-2">{a.no}</span>
                  <h3 className="font-display font-bold text-navy-800 text-sm mb-2">{a.judul}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>

            {/* SIVET CTA */}
            <div className="mt-14 bg-gradient-to-br from-kvi-600 to-kvi-800 rounded-2xl p-10 grid md:grid-cols-[1fr_auto] items-center gap-8">
              <div>
                <div className="text-xs font-bold text-white/65 uppercase tracking-widest mb-3">Siap Mendaftar?</div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Akses Portal SIVET Sekarang</h3>
                <p className="text-white/65 text-sm leading-relaxed max-w-lg">Portal SIVET menyediakan layanan pendaftaran, perpanjangan, pengecekan status, dan pengunduhan sertifikat secara digital 24/7.</p>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <button className="px-8 py-3.5 bg-white text-kvi-700 rounded-xl text-sm font-extrabold hover:bg-kvi-50 transition-colors whitespace-nowrap">Masuk ke SIVET</button>
                <button className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-xl text-sm font-bold hover:bg-white/18 transition-colors whitespace-nowrap">Buat Akun Baru</button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-paper-100 py-20">
          <div className="max-w-[860px] mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold">FAQ</span>
              <h2 className="font-display text-3xl font-bold text-navy-800 mt-3 mb-2">Pertanyaan Umum</h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mx-auto" />
            </div>
            <div className="flex flex-col gap-3">
              {FAQ.map((f, i) => (
                <div key={i} className={`bg-white rounded-xl border-[1.5px] overflow-hidden transition-all ${openFaq === i ? 'border-kvi-200 shadow-soft' : 'border-zinc-100'}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left gap-4">
                    <span className="font-display font-bold text-navy-800 text-[15px]">{f.q}</span>
                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${openFaq === i ? 'bg-kvi-500' : 'bg-paper-100'}`}>
                      <svg className={`w-3.5 h-3.5 transition-transform ${openFaq === i ? 'rotate-180 text-white' : 'text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  {openFaq === i && <div className="px-5 pb-5 text-sm text-zinc-500 leading-relaxed border-t border-zinc-100 pt-4">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
