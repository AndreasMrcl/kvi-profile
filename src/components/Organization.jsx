import React, { useState, useEffect, useRef } from "react";

/* ----------  DATA  ---------- */
const ORG_DATA = {
  pengurus: [
    { inisial: 'TB', nama: 'DRH. Teguh Budipitojo, MP, Ph.D.', jabatan: 'Ketua' },
    { inisial: 'MM', nama: 'DR. H. M. Munawaroh',              jabatan: 'Wakil Ketua I' },
    { inisial: 'SY', nama: 'Syafrison',                        jabatan: 'Wakil Ketua II' },
    { inisial: 'AW', nama: 'Andi Wijanarko',                   jabatan: 'Sekretaris' },
    { inisial: 'SK', nama: 'DRH. Siti Komariah',               jabatan: 'Wakil Sekretaris' },
    { inisial: 'HE', nama: 'Henny Endah A.',                   jabatan: 'Bendahara' },
  ],
  pengawas: [
    { inisial: 'EN', nama: 'Eko Kusumo Nugroho, BSc, MBA', jabatan: 'Ketua Pengawas' },
    { inisial: 'TF', nama: 'Teuku Reza Ferasyi',           jabatan: 'Anggota Pengawas' },
    { inisial: 'SS', nama: 'Susilo',                       jabatan: 'Anggota Pengawas' },
    { inisial: 'MM', nama: 'DRH. Martha Mangapulina',      jabatan: 'Anggota Pengawas' },
  ],
  tugasPengurus: [
    'Memimpin penyelenggaraan perkumpulan.',
    'Mewakili perkumpulan dalam berinteraksi dengan seluruh stakeholders Kesehatan Hewan.',
    'Memberikan masukan pada pemerintah terkait isu-isu strategis Kesehatan Hewan.',
    'Mewakili Indonesia di ASEAN VSB Network.',
    'Mendukung praktisi Indonesia yang ingin memperoleh lisensi veteriner di tingkat ASEAN.',
    'Berinteraksi mengenai isu-isu regional dan global bidang veteriner dengan badan-badan internasional lainnya.',
  ],
  tugasPengawas: [
    'Mengawasi pelaksanaan kebijakan pengurus dalam menjalankan kegiatan perkumpulan.',
    'Memberikan nasehat kepada pengurus, baik diminta maupun tidak.',
    'Berhak memasuki halaman, bangunan, ruangan, dan tempat lain yang digunakan dan dikuasai oleh perkumpulan.',
    'Berhak mengetahui semua tindakan dan kebijakan pengurus.',
    'Berinteraksi mengenai isu-isu regional dan global bidang veteriner dengan badan-badan internasional lainnya.',
  ],
  divisi: [
    {
      key: 'admin',
      kode: '01',
      nama: 'Kantor Administrasi',
      tagline: 'Pusat layanan administratif perkumpulan',
      iconPath: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7h18M9 21V12h6v9',
      fungsi: [
        'Pendaftaran anggota',
        'Administrasi internal',
        'Hubungan masyarakat',
        'Keuangan dan anggaran',
        'Tanggung jawab administratif lainnya',
      ],
    },
    {
      key: 'pendidikan',
      kode: '02',
      nama: 'Divisi Penguatan Pendidikan',
      tagline: 'Standar nasional pendidikan kedokteran hewan',
      iconPath: 'M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zM12 14v7',
      fungsi: [
        'Menetapkan standar nasional pendidikan dan kompetensi kedokteran hewan.',
        'Mengevaluasi penerapan standar nasional pendidikan di PTKH.',
        'Membantu pengembangan kurikulum PTKH agar sesuai dengan standar internasional.',
        'Berkoordinasi dengan tim UKMPPDH dalam mengembangkan ujian kompetensi nasional untuk semua lulusan kedokteran hewan.',
        'Bekerjasama dengan PTKH dalam mengembangkan pendidikan spesialis.',
      ],
    },
    {
      key: 'pembinaan',
      kode: '03',
      nama: 'Divisi Pembinaan Profesi',
      tagline: 'Pengembangan profesi berkelanjutan',
      iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      fungsi: [
        'Menentukan, mengembangkan, dan meningkatkan standar profesional kedokteran hewan.',
        'Menetapkan standar kualifikasi pelatihan lanjut kedokteran hewan.',
        'Memfasilitasi pengembangan profesi melalui konferensi akademis, seminar, program pelatihan, presentasi karya akademis, dan kursus pascasarjana.',
      ],
    },
    {
      key: 'profesi',
      kode: '04',
      nama: 'Divisi Profesi',
      tagline: 'Tata laksana & mutu layanan',
      iconPath: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      fungsi: [
        'Menetapkan standar tata laksana kerja profesi kedokteran hewan.',
        'Membina penyelenggaraan dan peningkatan mutu layanan kedokteran hewan.',
        'Mengevaluasi penerapan standar tata laksana kerja profesi kedokteran hewan.',
        'Memberikan dukungan teknis bagi praktisi kedokteran hewan agar menjadi spesialis dalam disiplin ilmu tertentu.',
      ],
    },
    {
      key: 'etik',
      kode: '05',
      nama: 'Divisi Etik dan Disiplin',
      tagline: 'Penegakan etika & disiplin profesi',
      iconPath: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
      fungsi: [
        'Menegakkan disiplin dokter hewan dan paraprofessional veteriner.',
        'Berperan serta dalam mempromosikan etika dalam profesi kedokteran hewan, serta menjunjung tinggi keadilan bagi dokter hewan dan pemilik hewan atau pengguna jasa ketika pengaduan diajukan terhadap praktisi profesional.',
        'Berinteraksi dengan badan-badan internasional veteriner lainnya, mengenai isu-isu etik kedokteran hewan.',
      ],
      sistem: {
        title: 'Sistem Disiplin PKVI mencakup',
        items: [
          'Standar Perilaku Profesional (Code of Professional Conduct)',
          'Mekanisme Pengaduan Publik',
          'Proses Investigasi Formal',
          'Sidang Disiplin (Disciplinary Hearing)',
          'Jenis Sanksi',
          'Hak Banding',
          'Publikasi Keputusan (Transparansi)',
        ],
      },
    },
  ],
};

/* ----------  PEOPLE GRID  ---------- */
function PeopleGrid() {
  const [tab, setTab] = useState('pengurus');
  const people = tab === 'pengurus' ? ORG_DATA.pengurus : ORG_DATA.pengawas;

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white rounded-xl p-1 border border-paper-200 gap-1 shadow-soft">
          {['pengurus', 'pengawas'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all
                ${tab === t ? 'bg-navy-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-4 ${people.length <= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'}`}>
        {people.map((p, i) => (
          <div
            key={i}
            className={`rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 border shadow-soft hover:shadow-card
              ${i === 0 ? 'bg-kvi-600 text-white border-kvi-600' : 'bg-white text-navy-800 border-zinc-100'}`}
          >
            <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-lg
              ${i === 0 ? 'bg-gold-400 text-kvi-900' : 'bg-kvi-50 text-kvi-600'}`}>
              {p.inisial}
            </div>
            <p className={`font-display font-semibold text-sm leading-snug ${i === 0 ? 'text-white' : 'text-navy-800'}`}>{p.nama}</p>
            <p className={`text-xs mt-1 font-body ${i === 0 ? 'text-gold-300' : 'text-zinc-500'}`}>{p.jabatan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------  TUGAS — Pengurus / Pengawas tabs  ---------- */
function TugasSection() {
  const [tab, setTab] = useState('pengurus');
  const items = tab === 'pengurus' ? ORG_DATA.tugasPengurus : ORG_DATA.tugasPengawas;
  const meta = tab === 'pengurus'
    ? { title: 'Tugas Pengurus', desc: 'Memimpin dan mewakili perkumpulan dalam interaksi strategis nasional dan internasional.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
    : { title: 'Tugas Pengawas', desc: 'Mengawasi pelaksanaan kebijakan pengurus dan memberi nasehat strategis.',                     icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' };

  return (
    <div>
      <div className="text-center mb-10">
        <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body">
          Tugas Pengawas dan Pengurus
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-navy-800 mt-2">
          Pembagian Tanggung Jawab
        </h3>
        <div className="h-1 w-12 bg-kvi-500 rounded mt-3 mx-auto" />
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-paper-100 rounded-xl p-1 border border-paper-200 gap-1">
          {['pengurus', 'pengawas'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all
                ${tab === t ? 'bg-navy-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-card overflow-hidden">
        <div className="grid md:grid-cols-[260px_1fr]">
          <div className="bg-navy-800 text-white p-8 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-kvi-500/10" />
            <div className="relative">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-kvi-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={meta.icon} />
                </svg>
              </div>
              <h4 className="font-display text-xl font-bold mb-2">{meta.title}</h4>
              <p className="text-white/65 text-sm leading-relaxed">{meta.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-gold-300 font-bold">
                <span className="font-display text-2xl text-gold-400">{items.length}</span>
                <span>Tanggung Jawab</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <ul className="space-y-1">
              {items.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 py-3.5 border-b border-zinc-100 last:border-b-0 group"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-md bg-kvi-50 text-kvi-600 group-hover:bg-kvi-500 group-hover:text-white flex items-center justify-center font-display font-bold text-xs transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-zinc-600 font-body text-sm md:text-[15px] leading-relaxed pt-0.5">{t}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------  DIVISI — Tabs layout (sidebar + content)  ---------- */
function DivisiTabs() {
  // Read initial active tab from URL hash, e.g. #divisi-etik
  const initialKey = (() => {
    if (typeof window === "undefined") return ORG_DATA.divisi[0].key;
    const m = window.location.hash.match(/#divisi-([a-z]+)/i);
    if (m) {
      const found = ORG_DATA.divisi.find((x) => x.key === m[1]);
      if (found) return found.key;
    }
    return ORG_DATA.divisi[0].key;
  })();
  const [active, setActive] = useState(initialKey);

  const tabsRef = useRef(null);

  // On mount, if hash matched, scroll tabs panel into view
  useEffect(() => {
    const m = window.location.hash.match(/#divisi-([a-z]+)/i);
    if (m && tabsRef.current) {
      setTimeout(() => {
        tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, []);

  // React to hashchange (when user lands here from a Home divisi card click)
  useEffect(() => {
    const onHash = () => {
      const m = window.location.hash.match(/#divisi-([a-z]+)/i);
      if (m) {
        const found = ORG_DATA.divisi.find((x) => x.key === m[1]);
        if (found) {
          setActive(found.key);
          if (tabsRef.current) {
            tabsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const d = ORG_DATA.divisi.find((x) => x.key === active);

  return (
    <div>
      <div className="text-center mb-10">
        <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body">
          Unit Pelaksana Organisasi
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-navy-800 mt-2">
          5 Divisi &amp; Fungsinya
        </h3>
        <div className="h-1 w-12 bg-kvi-500 rounded mt-3 mx-auto" />
        <p className="text-zinc-500 font-body mt-4 max-w-xl mx-auto text-sm md:text-base">
          Setiap divisi menjalankan fungsi spesifik untuk mendukung tugas pengurus dan pengawas dalam menjaga mutu profesi veteriner.
        </p>
      </div>

      <div ref={tabsRef} id="divisi-tabs" className="bg-white rounded-2xl border border-zinc-100 shadow-card overflow-hidden scroll-mt-24">
        <div className="grid md:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <div className="bg-paper-50 border-b md:border-b-0 md:border-r border-zinc-100 p-3">
            {ORG_DATA.divisi.map((x) => {
              const isActive = x.key === active;
              return (
                <button
                  key={x.key}
                  onClick={() => setActive(x.key)}
                  className={`w-full text-left p-3.5 rounded-lg flex items-center gap-3 transition-all mb-1
                    ${isActive ? 'bg-navy-800 text-white shadow-soft' : 'hover:bg-white text-navy-800'}`}
                >
                  <span className={`w-9 h-9 rounded-md flex items-center justify-center font-display font-bold text-xs
                    ${isActive ? 'bg-kvi-500 text-white' : 'bg-white text-kvi-600 border border-zinc-100'}`}>
                    {x.kode}
                  </span>
                  <span className="font-display font-semibold text-[13px] leading-tight">{x.nama}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-zinc-100">
              <div className="w-14 h-14 rounded-xl bg-kvi-50 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-kvi-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={d.iconPath} />
                </svg>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body">Divisi {d.kode}</span>
                <h4 className="font-display text-2xl font-bold text-navy-800 leading-tight">{d.nama}</h4>
                <p className="text-zinc-500 text-sm mt-1">{d.tagline}</p>
              </div>
            </div>

            <p className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold mb-3">Fungsi</p>
            <ul className="space-y-3">
              {d.fungsi.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-600 font-body text-[15px] leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-kvi-50 text-kvi-600 flex items-center justify-center font-bold text-xs">{i + 1}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {d.sistem && (
              <div className="mt-7 p-5 bg-paper-50 rounded-xl border border-paper-200">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="font-display font-bold text-navy-800 text-sm">{d.sistem.title}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {d.sistem.items.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 text-[13px] text-zinc-600 font-body">
                      <span className="flex-shrink-0 w-5 h-5 rounded bg-gold-400/20 text-gold-600 text-[10px] font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      <span className="leading-snug">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------  ORG CHART — visual hierarchy  ---------- */
function OrgChart() {
  const divisions = ORG_DATA.divisi
    .filter((d) => d.key !== 'admin')
    .map((d) => ({ kode: d.kode, label: d.nama.replace(/^Divisi /, '') }));
  const admin = ORG_DATA.divisi.find((d) => d.key === 'admin');

  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-soft p-8 md:p-10 mb-14">
      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body">
          Bagan Struktur
        </span>
        <h3 className="font-display text-xl md:text-2xl font-bold text-navy-800 mt-1">
          Konsil Veteriner Indonesia
        </h3>
      </div>

      {/* Top: Pengawas + Pengurus */}
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-2">
        <div className="bg-navy-800 text-white rounded-xl p-5 text-center relative">
          <div className="text-[10px] uppercase tracking-widest text-gold-300 font-bold mb-1">Pengawas</div>
          <div className="font-display font-bold">Dewan Pengawas</div>
          <div className="text-white/60 text-xs mt-1">{ORG_DATA.pengawas.length} anggota</div>
        </div>
        <div className="bg-kvi-600 text-white rounded-xl p-5 text-center relative">
          <div className="text-[10px] uppercase tracking-widest text-gold-300 font-bold mb-1">Pengurus</div>
          <div className="font-display font-bold">Dewan Pengurus</div>
          <div className="text-white/70 text-xs mt-1">{ORG_DATA.pengurus.length} anggota</div>
        </div>
      </div>

      {/* Trunk + Kantor Administrasi staff branch */}
      <div className="relative max-w-5xl mx-auto" style={{ height: 110 }}>
        <svg width="100%" height="110" viewBox="0 0 1000 110" preserveAspectRatio="none" className="absolute inset-0" aria-hidden>
          <line x1="250" y1="0" x2="250" y2="20" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="750" y1="0" x2="750" y2="20" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="250" y1="20" x2="750" y2="20" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="500" y1="20" x2="500" y2="92" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="500" y1="55" x2="360" y2="55" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="155" y1="92" x2="845" y2="92" stroke="#cbd5e1" strokeWidth="1.5" />
          {[155, 385, 615, 845].map((x) => (
            <line key={x} x1={x} y1="92" x2={x} y2="110" stroke="#cbd5e1" strokeWidth="1.5" />
          ))}
        </svg>

        {/* Kantor Administrasi — left of trunk */}
        <div className="absolute" style={{ right: '64%', top: 32 }}>
          <div className="bg-gold-400/15 border border-gold-400/40 rounded-lg px-4 py-2 text-center min-w-[180px]">
            <div className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">Divisi {admin.kode}</div>
            <div className="font-display font-semibold text-navy-800 text-sm leading-tight">{admin.nama}</div>
          </div>
        </div>
      </div>

      {/* Divisions 02–05 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {divisions.map((d, i) => (
          <div key={i} className="bg-paper-50 border border-paper-200 rounded-lg px-3 py-3 text-center hover:border-kvi-300 hover:bg-kvi-50/40 transition-colors">
            <div className="text-kvi-600 font-display font-bold text-xs mb-1">{d.kode}</div>
            <div className="font-display font-semibold text-navy-800 text-[12.5px] leading-tight">{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN — drop-in replacement for the original OrgSection()
   ============================================================ */
function Organization() {
  return (
    <section id="section-org" className="bg-paper-100 py-20 md:py-24">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body">
            Struktur Organisasi
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3">
            Pengurus, Pengawas &amp; Divisi KVI
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mt-4 mx-auto" />
          <p className="text-zinc-500 font-body mt-5 max-w-2xl mx-auto text-sm md:text-base">
            Struktur organisasi Konsil Veteriner Indonesia terdiri dari Dewan Pengawas, Dewan Pengurus, dan 5 Divisi sebagai unit pelaksana.
          </p>
        </div>

        {/* Org chart */}
        <OrgChart />

        {/* People grid */}
        <div className="mb-16">
          <PeopleGrid />
        </div>

        {/* Tugas */}
        <div className="mb-20">
          <TugasSection />
        </div>

        {/* Divisi — Tabs layout */}
        <div>
          <DivisiTabs />
        </div>
      </div>
    </section>
  );
}

export default Organization;