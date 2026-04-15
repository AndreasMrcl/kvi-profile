import { fungsiList } from '../data/siteData';

export default function Fungsi() {
  return (
    <section
      id="fungsi"
      className="relative py-28 grain overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1652787542567-f86c0b4c0269?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxkb2N0b3JzfGVufDB8fDB8fHww')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-emerald-950/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold font-body reveal-item">
            Fungsi Organisasi
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 reveal-item">
            Peran Strategis KVI
          </h2>
          <p className="text-white/60 font-body mt-4 max-w-xl mx-auto reveal-item">
            Enam pilar utama yang menjadi landasan gerak dan tanggung jawab Konsil Veteriner Indonesia.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fungsiList.map((f, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-7 group hover:-translate-y-1 hover:border-gold-500/30 transition-all duration-300 reveal-item"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gold-500/15 flex items-center justify-center mb-5 group-hover:bg-gold-500/25 transition-colors">
                <svg className="w-6 h-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-white mb-3">{f.title}</h3>
              <p className="text-white/60 font-body text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
