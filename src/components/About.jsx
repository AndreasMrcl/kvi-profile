import { about } from '../data/siteData';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Image */}
        <div className="reveal-item relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-card">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1600&auto=format&fit=crop"
              alt="Dokter Hewan"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Content */}
        <div className="reveal-item">
          <span className="text-[10px] font-body uppercase tracking-widest text-kvi-500 font-bold">
            {about.label}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-4 leading-tight">
            {about.title}
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mb-5" />
          <p className="text-zinc-600 font-body leading-relaxed mb-6 text-sm md:text-base">
            {about.intro}
          </p>

          <ul className="space-y-3 mb-8">
            {about.tujuan.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-600 font-body text-sm leading-relaxed">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-kvi-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {['AFKHI', 'APSTVI', 'PDHI', 'PAVETI', 'PARAVETINDO'].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 rounded-md bg-kvi-50 text-kvi-700 text-xs font-body font-semibold border border-kvi-100"
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
