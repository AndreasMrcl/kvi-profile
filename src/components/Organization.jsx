import { pengurus, pengawas } from '../data/siteData';

function OrgCard({ inisial, nama, jabatan, featured }) {
  return (
    <div
      className={`rounded-xl p-5 text-center reveal-item transition-all duration-300 hover:-translate-y-1 border shadow-soft hover:shadow-card
        ${featured
          ? 'bg-kvi-600 text-white border-kvi-600'
          : 'bg-white text-navy-800 border-zinc-100'
        }`}
    >
      <div className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-lg
        ${featured ? 'bg-gold-400 text-kvi-900' : 'bg-kvi-50 text-kvi-600'}`}>
        {inisial}
      </div>
      <p className={`font-display font-semibold text-sm leading-snug ${featured ? 'text-white' : 'text-navy-800'}`}>
        {nama}
      </p>
      <p className={`text-xs mt-1 font-body ${featured ? 'text-gold-300' : 'text-zinc-500'}`}>{jabatan}</p>
    </div>
  );
}

export default function Organization() {
  return (
    <section id="org" className="py-20 md:py-24 bg-paper-100">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body reveal-item">
            Struktur Organisasi
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 reveal-item">
            Pengurus & Pengawas KVI
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mt-4 mx-auto reveal-item" />
        </div>

        {/* Pengurus */}
        <p className="text-kvi-600 text-[11px] uppercase tracking-widest font-bold mb-5 reveal-item">Pengurus</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {pengurus.map((p, i) => (
            <OrgCard key={i} {...p} featured={i === 0} />
          ))}
        </div>

        {/* Pengawas */}
        <p className="text-kvi-600 text-[11px] uppercase tracking-widest font-bold mb-5 reveal-item">Pengawas</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {pengawas.map((p, i) => (
            <OrgCard key={i} {...p} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
