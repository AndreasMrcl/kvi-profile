import { fungsiList } from '../data/siteData';

export default function Fungsi() {
  return (
    <section id="fungsi" className="relative py-20 md:py-24 bg-paper-100">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-12 md:mb-14">
          <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body reveal-item">
            Fungsi Organisasi
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 reveal-item">
            Peran Strategis KVI
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mt-4 mx-auto reveal-item" />
          <p className="text-zinc-500 font-body mt-5 max-w-xl mx-auto text-sm md:text-base reveal-item">
            Enam pilar utama yang menjadi landasan gerak dan tanggung jawab Konsil Veteriner Indonesia.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fungsiList.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-zinc-100 shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-kvi-200 transition-all duration-300 reveal-item"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-kvi-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-kvi-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy-800 mb-2 leading-tight">{f.title}</h3>
              <p className="text-zinc-500 font-body text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
