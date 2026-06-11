import hero1 from '../assets/optimized/hero_kvi_1.webp';
import hero2 from '../assets/optimized/hero_kvi_2.webp';
import gambarRapat from "../assets/rapat-pleno.jpeg";

const slugify = (value = '') =>
  value
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const navLinks = [
  { label: 'BERANDA',            path: '/',       anchor: '' },
  { label: 'TENTANG KAMI',       path: '/tentang',anchor: '' },
  { label: 'BERITA & PUBLIKASI', path: '/berita', anchor: '' },
  { label: 'HUBUNGI KAMI',       path: '/kontak', anchor: '' },
];

/* ─── HERO ─── */
export const heroSlides = [
  {
    id: 'slide1', image: hero1,
    headline: 'SELAMAT DATANG DI KONSIL VETERINER INDONESIA',
    subheadline: 'Mewujudkan Standar Kedokteran Hewan yang Profesional, Bermutu, dan Melindungi Masyarakat.',
    buttons: [
      { label: 'DAFTAR REGISTRASI BARU', path: '/register', anchor: '', primary: true },
      { label: 'PELAJARI LEBIH LANJUT',      path: '/tentang',    anchor: '', primary: false },
    ],
  },
  {
    id: 'slide2', image: hero2,
    headline: 'SELAMAT DATANG DI KONSIL VETERINER INDONESIA',
    subheadline: 'Mewujudkan Standar Kedokteran Hewan yang Profesional, Bermutu, dan Melindungi Masyarakat.',
    buttons: [
      { label: 'DAFTAR REGISTRASI BARU', path: '/register', anchor: '', primary: true },
      { label: 'PELAJARI LEBIH LANJUT',      path: '/tentang',    anchor: '', primary: false },
    ],
  },
];


/* ─── HOME STATS ─── */
export const homeStats = [
  { angka: '12.000+', label: 'Dokter Hewan Terdaftar', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { angka: '34',       label: 'Provinsi Tercakup',      icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { angka: '6',        label: 'Fungsi Strategis',       icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { angka: '2014',     label: 'Tahun Berdiri',          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
];

/* ─── HOME FAQ ─── */
// Setiap item `a` dapat berupa string (satu paragraf) atau array blok.
// Blok yang didukung: string (paragraf), { h: '...' } (sub-judul),
// { ul: [...] } (daftar butir), { ol: [...] } (daftar bernomor).
export const homeFaq = [
  {
    q: 'Apa itu Konsil Veteriner Indonesia (KVI)?',
    a: [
      'Konsil Veteriner Indonesia adalah badan regulator profesi kedokteran hewan yang independen dan bersifat nasional yang bertugas menjamin mutu pendidikan, kompetensi, registrasi, layanan, etika, dan disiplin dokter hewan serta paramedis veteriner untuk menjamin mutu pelayanan veteriner dan perlindungan masyarakat.',
      'Konsil Veteriner Indonesia menghimpun seluruh dokter hewan dan paramedis veteriner Indonesia dalam satu sistem registrasi nasional, sebagai registran profesi, yang memperoleh hak melakukan layanan veteriner dan perlindungan profesi berdasarkan standar kompetensi, etika, dan disiplin yang ditetapkan untuk kepentingan masyarakat. Registran profesi bukan anggota KVI.',
    ],
  },
  {
    q: 'Siapa saja anggota KVI?',
    a: [
      'Keanggotaan Konsil Veteriner Indonesia adalah status yang dimiliki oleh organisasi atau institusi yang secara sah menjadi bagian dari pembentukan, pengembangan, dan tata kelola Konsil Veteriner Indonesia. Anggota KVI saat ini adalah sebagai berikut:',
      {
        ol: [
          'Asosiasi Fakultas Kedokteran Hewan Indonesia (AFKHI);',
          'Asosiasi Program Studi Sarjana Terapan Veteriner Indonesia (APSTVI);',
          'Perhimpunan Dokter Hewan Indonesia (PDHI);',
          'Perkumpulan Paramedik Veteriner Indonesia (PAVETI);',
          'Paramedik Veteriner dan Inseminator Indonesia (PARAVETINDO);',
          'Unsur pemerintah yang ditunjuk dari Kementerian Pertanian;',
          'Unsur pemerintah yang ditunjuk dari Kementerian Kehutanan;',
          'Unsur pemerintah yang ditunjuk dari Kementerian Kelautan dan Perikanan; dan',
          'Unsur masyarakat.',
        ],
      },
    ],
  },
  {
    q: 'Apa itu Registrasi KVI?',
    a: [
      'Registrasi bukan merupakan keanggotaan KVI, melainkan pengakuan profesional yang diberikan oleh KVI kepada individu yang memenuhi persyaratan untuk menjalankan profesi veteriner di Indonesia.',
      'Setiap dokter hewan dan paramedis veteriner yang memenuhi persyaratan berhak mengajukan registrasi kepada KVI untuk memperoleh pengakuan sebagai “Registran KVI” dan dicantumkan dalam Register Nasional Profesi Veteriner Indonesia.',
      'Registrasi dilakukan melalui mekanisme verifikasi kualifikasi pendidikan, kompetensi, identitas, serta persyaratan profesi lainnya yang ditetapkan oleh KVI.',
    ],
  },
  {
    q: 'Siapa yang disebut Registran KVI?',
    a: [
      'Registran KVI adalah dokter hewan dan paramedis veteriner yang telah melakukan registrasi dan memperoleh Nomor Registrasi Nasional Profesi Veteriner Indonesia (NRNPVI) dan tercantum dalam sistem Register Nasional Profesi Veteriner Indonesia (RNPVI) dari KVI.',
      'Nomor Registrasi Nasional Profesi Veteriner Indonesia (NRNPVI) terdiri dari Nomor Registrasi Nasional Dokter Hewan Indonesia (NRNDHI) dan Nomor Registrasi Nasional Paramedis Veteriner Indonesia (NRNPVI).',
      'Register Nasional Profesi Veteriner Indonesia (RNPVI) terdiri dari Register Nasional Dokter Hewan Indonesia (RNDHI) dan Register Nasional Paramedis Veteriner Indonesia (RNPVI).',
    ],
  },
  {
    q: 'Bagaimana jalur registrasi di KVI?',
    a: [
      { h: 'Jalur Registrasi Dokter Hewan' },
      'Calon registran mengajukan permohonan melalui portal KVI dengan melampirkan:',
      {
        ul: [
          'Identitas diri',
          'Ijazah/Sertifikat Profesi Dokter Hewan',
          'Nomor Induk Kependudukan',
          'Pas foto',
          'Surat pernyataan mematuhi standar dan kode etik profesi',
        ],
      },
      'Setelah dilakukan verifikasi, KVI akan menerbitkan: Nomor Registrasi Nasional Dokter Hewan Indonesia (NRNDHI), dan nama yang bersangkutan tercantum dalam sistem: Register Nasional Dokter Hewan Indonesia (RNDHI).',
      { h: 'Jalur Registrasi Paramedis Veteriner' },
      'Calon registran mengajukan permohonan melalui portal KVI dengan melampirkan:',
      {
        ul: [
          'Identitas diri',
          'Ijazah pendidikan atau sertifikat kompetensi bidang kesehatan hewan',
          'Pas foto',
          'Surat pernyataan mematuhi standar dan kode etik profesi',
        ],
      },
      'Setelah dilakukan verifikasi, KVI akan menerbitkan: Nomor Registrasi Nasional Paramedis Veteriner Indonesia (NRNPVI), dan nama yang bersangkutan tercantum dalam sistem: Register Nasional Paramedis Veteriner Indonesia (RNPVI).',
    ],
  },
  {
    q: 'Apa hubungan Registrasi KVI dengan SIP?',
    a: [
      'Selama belum terdapat ketentuan peraturan perundang-undangan yang mengatur lain, registrasi yang diterbitkan oleh KVI tidak terkait dengan dan tidak untuk menggantikan Surat Izin Praktik atau bentuk perizinan lain yang berlaku saat ini, sesuai ketentuan peraturan perundang-undangan.',
      'Registrasi KVI berfungsi sebagai pengakuan profesional nasional dan basis data profesi veteriner Indonesia, serta menjadi landasan pengembangan sistem regulasi profesi veteriner di masa mendatang.',
    ],
  },
];

/* ─── ABOUT ─── */
export const about = {
  label: 'Tentang KVI',
  title: 'Maksud dan Tujuan Kami',
  intro: 'KVI didirikan dengan dukungan berbagai asosiasi profesi seperti AFKHI, APSTVI, PDHI, PAVETI, dan PARAVETINDO. Maksud dan tujuan didirikan perkumpulan ini adalah:',
  tujuan: [
    'Menetapkan standar pendidikan kedokteran hewan.',
    'Melakukan registrasi dokter hewan.',
    'Mengatur layanan kedokteran hewan dan meningkatkan mutu pelayanan kedokteran hewan.',
    'Melakukan pembinaan terhadap penyelenggaraan pendidikan dan layanan kedokteran hewan.',
    'Memberikan perlindungan pada masyarakat penerima jasa pelayanan kedokteran hewan.',
  ],
};

/* ─── FUNGSI ─── */
export const fungsiList = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Standar Nasional Pendidikan', desc: 'Menetapkan standar nasional pendidikan serta standar kompetensi untuk dokter hewan dan paraprofessional veteriner.' },
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Registrasi Profesi', desc: 'Melakukan registrasi dokter hewan dan paraprofessional veteriner secara nasional.' },
  { icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', title: 'Pengembangan Berkelanjutan', desc: 'Menetapkan standar kualifikasi minimal pelatihan lanjut dan pengembangan profesi berkelanjutan.' },
  { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', title: 'Tata Laksana Profesi', desc: 'Menetapkan standar tata laksana kerja profesi kedokteran hewan dan ilmu kedokteran hewan.' },
  { icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', title: 'Penegakan Disiplin', desc: 'Menegakkan disiplin dokter hewan dan paraprofessional veteriner secara adil dan transparan.' },
  { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'Pembinaan Anggota', desc: 'Melaksanakan pembinaan terhadap dokter hewan dan paraprofessional veteriner di seluruh Indonesia.' },
];

/* ─── MEMBERSHIP ─── */
export const membership = {
  label: 'Keanggotaan',
  title: 'Informasi Keanggotaan',
  intro: 'Setiap anggota perkumpulan memiliki hak dan kewajiban sebagai berikut:',
  items: [
    'Wajib membayar iuran, kecuali anggota kehormatan.',
    'Ikut serta dalam kegiatan yang diselenggarakan oleh perkumpulan.',
    'Memberikan pendapat dan suara dalam rapat anggota.',
    'Hanya anggota biasa yang berhak memilih dan dipilih sebagai pengurus.',
    'Wajib mematuhi AD/ART perkumpulan berikut peraturan yang dikeluarkan oleh pengurus.',
  ],
};

/* ─── ORGANIZATION ─── */
export const pengurus = [
  { inisial: 'TB', nama: 'DRH. Teguh Budipitojo, MP, Ph.D.', jabatan: 'Ketua' },
  { inisial: 'MM', nama: 'DR. H. M. Munawaroh',              jabatan: 'Wakil Ketua I' },
  { inisial: 'SY', nama: 'Syafrison',                        jabatan: 'Wakil Ketua II' },
  { inisial: 'AW', nama: 'Andi Wijanarko',                   jabatan: 'Sekretaris' },
  { inisial: 'SK', nama: 'DRH. Siti Komariah',               jabatan: 'Wakil Sekretaris' },
  { inisial: 'HE', nama: 'Henny Endah A.',                   jabatan: 'Bendahara' },
];

export const pengawas = [
  { inisial: 'EN', nama: 'Eko Kusumo Nugroho, BSc, MBA', jabatan: 'Ketua Pengawas' },
  { inisial: 'TF', nama: 'Teuku Reza Ferasyi',           jabatan: 'Anggota Pengawas' },
  { inisial: 'SS', nama: 'Susilo',                       jabatan: 'Anggota Pengawas' },
  { inisial: 'MM', nama: 'DRH. Martha Mangapulina',      jabatan: 'Anggota Pengawas' },
];

/* ─── BERITA ─── */
const beritaTemplate = {
  penulis: 'Divisi Registrasi KVI',
  baca: '5 menit baca',
  konten: [
    { tipe: 'p', isi: 'Konsil Veteriner Indonesia (KVI) menyampaikan pembaruan resmi terkait kegiatan dan kebijakan veteriner nasional. Informasi berikut disusun untuk membantu dokter hewan memahami konteks, jadwal, serta langkah yang perlu disiapkan.' },
    { tipe: 'h2', isi: 'Ringkasan Utama' },
    { tipe: 'p', isi: 'KVI menekankan pentingnya kepatuhan terhadap standar profesi, tata laksana layanan veteriner, serta kesiapan administrasi bagi seluruh pemangku kepentingan.' },
    { tipe: 'quote', isi: 'Transparansi informasi dan kepatuhan regulasi adalah kunci untuk menjaga mutu profesi veteriner di Indonesia.' },
    { tipe: 'h2', isi: 'Poin Penting' },
    { tipe: 'ul', isi: ['Jadwal dan ketentuan diumumkan melalui kanal resmi KVI', 'Dokumen persyaratan disiapkan lebih awal', 'Pantau pembaruan kebijakan bila ada perubahan'] },
    { tipe: 'h2', isi: 'Langkah Selanjutnya' },
    { tipe: 'p', isi: 'Silakan kunjungi portal resmi KVI untuk detail lengkap, formulir, dan informasi tambahan terkait agenda atau kebijakan terkait.' },
  ],
  tags: ['Informasi Resmi', 'KVI', 'Veteriner'],
  infoBox: [
    { label: 'Sumber',  val: 'Konsil Veteriner Indonesia' },
    { label: 'Kanal',   val: 'Website dan Media Sosial' },
    { label: 'Status',  val: 'Diperbarui' },
    { label: 'Akses',   val: 'Publik' },
  ],
};

export const berita = [
  {
    id: 1,
    slug: 'rapat-pleno-perdana-pkvi-2026',
    tanggal: '21 Februari 2026',
    kategori: 'Kegiatan',
    featured: false,
    judul: 'Rapat Pleno Perdana Perkumpulan Konsil Veteriner Indonesia (PKVI) Tegaskan Langkah Awal Penguatan Sistem Kedokteran Hewan Nasional',
    ringkasan: 'Perkumpulan Konsil Veteriner Indonesia (PKVI) telah menyelenggarakan Rapat Pleno Pertama sebagai tonggak awal dalam penguatan sistem pengaturan profesi kedokteran hewan di Indonesia.',
    gambar: gambarRapat,
    penulis: 'Humas PKVI',
    baca: '3 menit baca',
    subjudul: 'Perkumpulan Konsil Veteriner Indonesia (PKVI) telah menyelenggarakan Rapat Pleno Pertama sebagai tonggak awal dalam penguatan sistem pengaturan profesi kedokteran hewan di Indonesia.',
    tags: ['PKVI', 'Rapat Pleno', 'One Health', 'Veteriner'],
    
    // PERBAIKAN INFOBOX: Menggunakan format object {label, val}
    infoBox: [
      { label: "Tanggal", val: "21 Februari 2026" },
      { label: "Agenda Utama", val: "Fungsi Konsil & Standar Praktik" },
      { label: "Fokus Acara", val: "Pendekatan One Health" }
    ],

    // PERBAIKAN KONTEN: Menggunakan format object {tipe, isi}
    konten: [
      { 
        tipe: "p", 
        isi: "Jakarta — Perkumpulan Konsil Veteriner Indonesia (PKVI) telah menyelenggarakan Rapat Pleno Pertama pada tanggal 21 Februari 2026 sebagai tonggak awal dalam penguatan sistem pengaturan profesi kedokteran hewan di Indonesia. Rapat ini menjadi momentum strategis untuk menetapkan arah kebijakan organisasi, memperkuat struktur kelembagaan, serta menyelaraskan peran PKVI sebagai embrio Veterinary Statutory Body (VSB) di Indonesia." 
      },
      { 
        tipe: "p", 
        isi: "Dalam rapat tersebut, dibahas sejumlah agenda penting, antara lain penegasan fungsi dan kewenangan konsil dalam registrasi, standardisasi kompetensi, serta pengawasan praktik dokter hewan. Selain itu, rapat juga menyoroti pentingnya harmonisasi regulasi nasional dengan standar internasional, khususnya yang direkomendasikan oleh organisasi kesehatan hewan dunia." 
      },
      { 
        tipe: "p", 
        isi: "PKVI menegaskan komitmennya untuk membangun sistem kedokteran hewan yang profesional, akuntabel, dan berorientasi pada pendekatan One Health. Melalui langkah ini, diharapkan kualitas layanan kedokteran hewan di Indonesia dapat semakin meningkat serta mampu menjawab tantangan global di bidang kesehatan hewan, kesehatan masyarakat, dan lingkungan." 
      },
      { 
        tipe: "p", 
        isi: "Rapat pleno ini sekaligus menjadi awal dari serangkaian langkah strategis PKVI dalam mendorong terbentuknya kerangka regulasi yang lebih komprehensif, termasuk penguatan dasar hukum bagi praktik dan pendidikan kedokteran hewan di Indonesia." 
      }
    ]
  }
];

/* ─── PUBLIKASI ─── */
export const publikasi = [
  // { id: 1, tipe: 'Peraturan', kode: 'PER-KVI-2024-01', judul: 'Peraturan Konsil tentang Standar Pendidikan Kedokteran Hewan', tahun: '2024', halaman: '42 hal', ukuran: '3.2 MB', desc: 'Standar nasional pendidikan dan kurikulum program studi kedokteran hewan di seluruh Indonesia.' },
  // { id: 2, tipe: 'Kebijakan', kode: 'KEB-KVI-2024-03', judul: 'Kebijakan Registrasi dan Lisensi Dokter Hewan Asing',         tahun: '2024', halaman: '18 hal', ukuran: '1.1 MB', desc: 'Tata cara dan persyaratan bagi dokter hewan warga negara asing yang ingin berpraktik di Indonesia.' },
  // { id: 3, tipe: 'Panduan',   kode: 'PAN-KVI-2024-02', judul: 'Panduan Etika dan Kode Etik Profesi Dokter Hewan',            tahun: '2024', halaman: '56 hal', ukuran: '4.7 MB', desc: 'Pedoman lengkap etika profesi, kode perilaku, dan tata tertib yang wajib dipatuhi dokter hewan terdaftar.' },
  // { id: 4, tipe: 'Peraturan', kode: 'PER-KVI-2023-05', judul: 'Peraturan tentang Penegakan Disiplin Profesi',                tahun: '2023', halaman: '28 hal', ukuran: '2.0 MB', desc: 'Mekanisme dan prosedur penegakan disiplin terhadap dokter hewan yang melanggar ketentuan.' },
  // { id: 5, tipe: 'Kebijakan', kode: 'KEB-KVI-2023-01', judul: 'Kebijakan Pengembangan Profesi Berkelanjutan (P2B)',          tahun: '2023', halaman: '24 hal', ukuran: '1.8 MB', desc: 'Persyaratan dan panduan program pengembangan profesi berkelanjutan bagi dokter hewan aktif.' },
  // { id: 6, tipe: 'Panduan',   kode: 'PAN-KVI-2023-04', judul: 'Panduan Pelayanan Kedokteran Hewan di Fasilitas Publik',     tahun: '2023', halaman: '34 hal', ukuran: '2.5 MB', desc: 'Standar operasional pelayanan kedokteran hewan di puskeswan, klinik, rumah sakit hewan, dan balai karantina.' },
];

/* ─── ACARA ─── */
export const acara = [
  { tanggal: '08', bulan: 'Mei', tahun: '2026', judul: 'Peluncuran Resmi',       lokasi: 'Jakarta Selatan' },
];

/* ─── SIVET ─── */
export const sivet = {
  title: 'SIVET PORTAL',
  subtitle: 'Sistem Informasi Veteriner Online',
  desc: 'Portal terintegrasi untuk registrasi, perpanjangan, dan layanan dokter hewan secara daring.',
  cta: 'Masuk ke SIVET',
  href: '/registrasi',
};

/* ─── CONTACT ─── */
export const contact = {
  title: 'Hubungi Konsil Veteriner Indonesia',
  desc: 'Kami siap melayani dan menjawab pertanyaan Anda terkait kedokteran hewan di Indonesia.',
  alamat: 'GRHA Dokter Hewan Indonesia\nJl. Joe No 9 Kavling 8A RT 007 / RW 004\nKelurahan Kebagusan, Kecamatan Pasar Minggu\nKota Jakarta Selatan, DKI Jakarta 12520',
  telepon: '021-78848462',
  email: 'info@kvi.or.id',
};

/* ─── FOOTER LINKS ─── */
export const footerLinks = {
  quickLinks: [
    { label: 'Beranda',              path: '/',          anchor: '' },
    { label: 'Tentang Kami',         path: '/tentang',   anchor: '' },
    { label: 'Registrasi & Lisensi', path: '/registrasi',anchor: '' },
    { label: 'Etika & Standar',      path: '/etika',     anchor: '' },
    { label: 'Berita & Publikasi',   path: '/berita',    anchor: '' },
    { label: 'Hubungi Kami',         path: '/kontak',    anchor: '' },
  ],
  social: [
    { label: 'Facebook', href: '#', icon: 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z' },
    { label: 'Instagram',href: '#', icon: 'M12 2.2c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2 0 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58 0-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85C2.42 3.92 3.93 2.38 7.15 2.23 8.42 2.2 8.8 2.2 12 2.2z' },
    { label: 'LinkedIn',  href: '#', icon: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z' },
  ],
};
