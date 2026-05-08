import { Link } from "react-router-dom";

const DIVISI = [
  {
    key: "admin",
    kode: "01",
    nama: "Kantor Administrasi",
    tagline: "Pusat layanan administratif perkumpulan",
    iconPath:
      "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4M3 7h18M9 21V12h6v9",
  },
  {
    key: "pendidikan",
    kode: "02",
    nama: "Penguatan Pendidikan",
    tagline: "Standar nasional pendidikan kedokteran hewan",
    iconPath:
      "M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zM12 14v7",
  },
  {
    key: "pembinaan",
    kode: "03",
    nama: "Pembinaan Profesi",
    tagline: "Pengembangan profesi berkelanjutan",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    key: "profesi",
    kode: "04",
    nama: "Profesi",
    tagline: "Tata laksana & mutu layanan",
    iconPath:
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    key: "etik",
    kode: "05",
    nama: "Etik dan Disiplin",
    tagline: "Penegakan etika & disiplin profesi",
    iconPath:
      "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  },
];

export default function HeroDivisiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-4">
      {DIVISI.map((d, i) => (
        <Link
          key={d.key}
          to={`/tentang#divisi-${d.key}`}
          className="group relative bg-white rounded-xl p-5 shadow-card border border-zinc-100 hover:border-kvi-600 hover:-translate-y-1 transition-all duration-300 reveal-item flex flex-col"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-11 h-11 rounded-lg bg-kvi-50 group-hover:bg-kvi-600 flex items-center justify-center flex-shrink-0 transition-colors">
              <svg
                className="w-5 h-5 text-kvi-600 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={d.iconPath}
                />
              </svg>
            </div>
            <span className="font-display font-bold text-paper-200 group-hover:text-kvi-100 text-2xl leading-none select-none transition-colors">
              {d.kode}
            </span>
          </div>

          <h3 className="font-display font-bold text-navy-800 text-[14.5px] leading-tight mb-1.5">
            {d.nama}
          </h3>
          <p className="text-zinc-500 text-[11.5px] mt-auto font-body leading-snug line-clamp-2">
            {d.tagline}
          </p>

          <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-kvi-600 group-hover:gap-2 transition-all">
            <span>Lihat Fungsi</span>
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}