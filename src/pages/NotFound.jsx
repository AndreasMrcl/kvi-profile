import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="relative bg-navy-800 text-white overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-40" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-kvi-500/10" />
      <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-white/5" />

      <div className="relative max-w-[900px] mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
        <div className="text-kvi-300 font-display text-[92px] md:text-[140px] font-extrabold tracking-tight">
          404
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold mb-4">
          Halaman tidak ditemukan
        </h1>
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-3 bg-kvi-600 hover:bg-kvi-700 text-white rounded-lg text-sm font-bold transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link
            to="/berita"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold border border-white/20 transition-colors"
          >
            Lihat Berita
          </Link>
        </div>
      </div>
    </section>
  );
}
