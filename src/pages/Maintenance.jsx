export default function Maintenance() {
  return (
    <section className="min-h-screen bg-navy-800 text-white flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 pattern-dots opacity-40" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-kvi-500/10" />
      <div className="absolute bottom-10 left-1/4 w-40 h-40 rounded-full bg-white/5" />

      <div className="relative max-w-[700px] mx-auto px-6 text-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-400/20 border border-gold-400/40">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.896-2.9a6.75 6.75 0 1 0-9.546 9.546" />
          </svg>
        </div>

        <div className="text-gold-400 font-display text-sm font-bold tracking-[0.2em] uppercase mb-3">
          Dalam Perbaikan
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
          Situs sedang dalam<br />pemeliharaan
        </h1>

        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md mx-auto">
          Kami sedang melakukan peningkatan sistem untuk memberikan pengalaman yang lebih baik.
          Silakan kunjungi kembali beberapa saat lagi.
        </p>

        <div className="mt-10 pt-8 border-t border-white/10 text-white/40 text-xs">
          KVI &mdash; Komite Verifikasi Independen
        </div>
      </div>
    </section>
  );
}
