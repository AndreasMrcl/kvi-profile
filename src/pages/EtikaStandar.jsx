import { useState } from 'react';
import { navigate } from '../hooks/useRoute';
import PageHero from '../components/PageHero';

const PRINSIP = [
  { no: '01', judul: 'Kesejahteraan Hewan',    warna: 'text-kvi-600',    bg: 'bg-kvi-50',    border: 'border-kvi-200',    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', desc: 'Dokter hewan wajib mengutamakan kesejahteraan dan perlindungan hewan dalam setiap tindakan medis yang dilakukan.' },
  { no: '02', judul: 'Kompetensi Profesional',  warna: 'text-navy-700',   bg: 'bg-navy-50',   border: 'border-navy-200',   icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', desc: 'Setiap praktisi hanya boleh melakukan tindakan medis sesuai kompetensi yang dimiliki dan terus meningkatkan keahlian.' },
  { no: '03', judul: 'Integritas & Kejujuran',  warna: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200',  icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', desc: 'Dokter hewan wajib bertindak dengan kejujuran, transparansi, dan tidak melakukan manipulasi data atau informasi medis.' },
  { no: '04', judul: 'Kerahasiaan Klien',       warna: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', desc: 'Informasi klien dan catatan medis hewan bersifat rahasia dan tidak boleh disebarluaskan tanpa izin yang sah.' },
  { no: '05', judul: 'Hubungan Profesional',    warna: 'text-sky-700',    bg: 'bg-sky-50',    border: 'border-sky-200',    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', desc: 'Hubungan antar kolega harus dilandasi saling menghormati, kolaborasi positif, dan tidak merendahkan profesi sesama.' },
  { no: '06', judul: 'Tanggung Jawab Publik',   warna: 'text-rose-700',   bg: 'bg-rose-50',   border: 'border-rose-200',   icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', desc: 'Dokter hewan bertanggung jawab pada kesehatan masyarakat, keamanan pangan, dan kesehatan lingkungan dalam praktiknya.' },
];

const KOMPETENSI = [
  { area: 'Klinis & Diagnosis',    level: 'Wajib', poin: ['Pemeriksaan fisik sistematis', 'Interpretasi hasil laboratorium', 'Penegakan diagnosis banding', 'Tindakan bedah dasar'] },
  { area: 'Farmakologi Veteriner', level: 'Wajib', poin: ['Prinsip farmakokinetik', 'Penggunaan antibiotik rasional', 'Manajemen nyeri', 'Toksikologi dasar'] },
  { area: 'Kesehatan Masyarakat',  level: 'Wajib', poin: ['Zoonosis dan pengendaliannya', 'Keamanan pangan asal hewan', 'Epidemiologi veteriner', 'Kesehatan lingkungan'] },
  { area: 'Manajemen Praktik',     level: 'Anjuran', poin: ['Etika dan hukum veteriner', 'Komunikasi klien', 'Manajemen rekam medis', 'Keselamatan kerja'] },
];

const SANKSI = [
  { level: 'Ringan', warna: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Teguran lisan atau tertulis, kewajiban mengikuti pelatihan etika.' },
  { level: 'Sedang', warna: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', desc: 'Pembatasan sementara praktik, kewajiban pendampingan supervisor.' },
  { level: 'Berat',  warna: 'text-rose-700',   bg: 'bg-rose-50',   border: 'border-rose-200',  desc: 'Pencabutan STRV/SIP sementara hingga permanen.' },
];

function PengaduanForm() {
  const [form, setForm] = useState({ nama: '', email: '', telepon: '', terlapor: '', kategori: '', uraian: '' });
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div className="bg-kvi-50 border-2 border-kvi-200 rounded-2xl p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-kvi-500 flex items-center justify-center mx-auto mb-5">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="font-display text-2xl font-bold text-navy-800 mb-3">Laporan Terkirim!</h3>
      <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">Tim KVI akan memverifikasi laporan Anda dalam 3 hari kerja.</p>
      <button onClick={() => setSent(false)} className="px-6 py-2.5 bg-kvi-500 hover:bg-kvi-600 text-white rounded-lg text-sm font-bold transition-colors">Ajukan Pengaduan Lain</button>
    </div>
  );

  return (
    <div className="bg-paper-50 rounded-2xl border border-paper-200 p-8 shadow-soft">
      <h3 className="font-display font-bold text-navy-800 text-xl mb-6">Formulir Pengaduan</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { id: 'nama',     label: 'Nama Pelapor',    ph: 'Nama lengkap Anda' },
          { id: 'email',    label: 'Email Aktif',      ph: 'email@contoh.com' },
          { id: 'telepon',  label: 'Nomor Telepon',   ph: '+62 xxx xxxx xxxx' },
          { id: 'terlapor', label: 'Nama Terlapor',   ph: 'Nama dokter hewan yang dilaporkan' },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">{f.label}</label>
            <input
              value={form[f.id]}
              onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))}
              placeholder={f.ph}
              className="w-full px-4 py-2.5 border-[1.5px] border-paper-200 focus:border-kvi-400 rounded-xl text-sm font-body outline-none bg-white"
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Kategori Pelanggaran</label>
        <select
          value={form.kategori}
          onChange={(e) => setForm((p) => ({ ...p, kategori: e.target.value }))}
          className="w-full px-4 py-2.5 border-[1.5px] border-paper-200 focus:border-kvi-400 rounded-xl text-sm font-body outline-none bg-white"
        >
          <option value="" disabled>Pilih kategori pelanggaran</option>
          <option>Pelanggaran Kode Etik</option>
          <option>Malpraktik Medis</option>
          <option>Praktik Tanpa Lisensi</option>
          <option>Pelanggaran Kerahasiaan</option>
          <option>Lainnya</option>
        </select>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Uraian Pengaduan</label>
        <textarea
          value={form.uraian}
          onChange={(e) => setForm((p) => ({ ...p, uraian: e.target.value }))}
          placeholder="Jelaskan kronologi kejadian secara detail..."
          rows={5}
          className="w-full px-4 py-2.5 border-[1.5px] border-paper-200 focus:border-kvi-400 rounded-xl text-sm font-body outline-none bg-white resize-y leading-relaxed"
        />
      </div>
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-5">
        <svg className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <p className="text-xs text-amber-700 leading-relaxed">Pengaduan palsu atau tidak berdasar dapat dikenakan sanksi hukum. Pastikan informasi yang Anda berikan akurat.</p>
      </div>
      <button
        onClick={() => setSent(true)}
        className="w-full py-3 bg-kvi-500 hover:bg-kvi-600 text-white rounded-xl text-sm font-bold transition-colors"
      >
        Kirim Pengaduan
      </button>
    </div>
  );
}

export default function EtikaStandar() {
  const [activePrinsip, setActivePrinsip] = useState(0);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Etika & Standar' }]}
        title={'ETIKA\n& STANDAR\nPROFESI'}
        subtitle="Pedoman kode etik, standar kompetensi, dan mekanisme penegakan disiplin profesi dokter hewan Indonesia."
        tabs={[
          { key: 'etik',    label: 'Kode Etik' },
          { key: 'kompeten',label: 'Standar Kompetensi' },
          { key: 'disiplin',label: 'Penegakan Disiplin' },
          { key: 'adu',     label: 'Ajukan Pengaduan' },
        ]}
        activeTab="etik"
        onTabChange={(k) => {
          const map = { etik: 'kode-etik', kompeten: 'kompetensi', disiplin: 'disiplin', adu: 'pengaduan' };
          const el = document.getElementById(map[k]);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      <div className="border-t-4 border-gold-500">
        {/* Kode etik */}
        <section id="kode-etik" className="bg-paper-100 py-20">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="mb-12">
              <span className="text-[10px] uppercase tracking-widest text-amber-600 font-bold">Kode Etik</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2">Enam Prinsip Etika Profesi</h2>
              <div className="h-1 w-16 bg-amber-500 rounded" />
            </div>
            <div className="grid md:grid-cols-[1fr_1fr_1fr_340px] gap-5">
              <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRINSIP.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePrinsip(i)}
                    className={`text-left p-5 rounded-xl border-2 transition-all duration-200
                      ${activePrinsip === i ? `bg-white border-current shadow-soft ${p.warna}` : 'bg-paper-50 border-transparent hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${p.bg}`}>
                        <svg className={`w-5 h-5 ${p.warna}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                        </svg>
                      </div>
                      <div>
                        <div className={`text-[9px] font-bold tracking-widest ${p.warna}`}>{p.no}</div>
                        <div className="font-display font-bold text-navy-800 text-sm">{p.judul}</div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                  </button>
                ))}
              </div>
              {/* Detail panel */}
              <div className="bg-navy-800 rounded-2xl p-7 text-white sticky top-24 h-fit">
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-5">Detail Prinsip</div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${PRINSIP[activePrinsip].bg}`}>
                  <svg className={`w-7 h-7 ${PRINSIP[activePrinsip].warna}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={PRINSIP[activePrinsip].icon} />
                  </svg>
                </div>
                <div className="text-xs font-bold text-white/50 mb-2">{PRINSIP[activePrinsip].no}</div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{PRINSIP[activePrinsip].judul}</h3>
                <p className="text-white/65 text-sm leading-relaxed mb-6">{PRINSIP[activePrinsip].desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {PRINSIP.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePrinsip(i)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all
                        ${activePrinsip === i ? 'bg-kvi-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
                <button className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Unduh Panduan Etik
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Kompetensi */}
        <section id="kompetensi" className="bg-white py-20">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold">Standar Kompetensi</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2">Area Kompetensi Dokter Hewan</h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mx-auto" />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {KOMPETENSI.map((sk, i) => (
                <div key={i} className="bg-paper-50 rounded-2xl p-7 border border-paper-200 reveal-item" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display text-lg font-bold text-navy-800">{sk.area}</h3>
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-lg border
                      ${sk.level === 'Wajib' ? 'bg-kvi-50 text-kvi-700 border-kvi-200' : 'bg-navy-50 text-navy-700 border-navy-200'}`}>
                      {sk.level}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {sk.poin.map((p, j) => (
                      <div key={j} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-paper-200">
                        <svg className={`w-4 h-4 flex-shrink-0 ${sk.level === 'Wajib' ? 'text-kvi-500' : 'text-navy-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-zinc-600">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disiplin */}
        <section id="disiplin" className="bg-paper-100 py-20">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold">Penegakan Disiplin</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2">Mekanisme &amp; Sanksi</h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mx-auto" />
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {SANKSI.map((s, i) => (
                <div key={i} className={`bg-white rounded-2xl p-7 border-2 ${s.border} reveal-item`} style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${s.bg} border ${s.border}`}>
                    <svg className={`w-6 h-6 ${s.warna}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <span className={`inline-block text-[11px] font-bold px-3 py-1 rounded-lg border mb-4 ${s.bg} ${s.warna} ${s.border}`}>Pelanggaran {s.level}</span>
                  <p className="text-sm text-zinc-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pengaduan form */}
        <section id="pengaduan" className="bg-white py-20">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold">Pengaduan</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2">Ajukan Pengaduan Etik</h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mx-auto mb-4" />
              <p className="text-zinc-500 text-sm max-w-md mx-auto">Setiap pengaduan akan ditangani secara profesional, rahasia, dan adil oleh Majelis Etik KVI.</p>
            </div>
            <div className="max-w-[720px] mx-auto">
              <PengaduanForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
