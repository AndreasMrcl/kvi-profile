import { about } from '../data/siteData';

export default function About() {
  return (
    <section id="about" className="py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <div className="reveal-item relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Dokter Hewan"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-emerald-800 text-white rounded-xl p-5 shadow-xl hidden md:block">
            <p className="font-display text-2xl font-bold text-gold-400">2006</p>
            <p className="text-xs text-white/70 mt-1 uppercase tracking-widest">Tahun Berdiri</p>
          </div>
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border-2 border-gold-500/30 bg-emerald-900/20 hidden md:block" />
        </div>

        {/* Content */}
        <div className="reveal-item">
          <span className="text-xs font-body uppercase tracking-widest text-gold-500 font-semibold">{about.label}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-emerald-900 mt-3 mb-4 leading-tight">
            {about.title}
          </h2>
          <p className="text-zinc-600 font-body leading-relaxed mb-6">{about.intro}</p>

          <ul className="space-y-3 mb-8">
            {about.tujuan.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-600 font-body text-sm leading-relaxed">
                <span className="mt-1 w-5 h-5 rounded-full bg-emerald-800/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            {['AFKHI', 'APSTVI', 'PDHI', 'PAVETI', 'PARAVETINDO'].map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-emerald-800/10 text-emerald-800 text-sm font-body font-medium border border-emerald-800/20"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
