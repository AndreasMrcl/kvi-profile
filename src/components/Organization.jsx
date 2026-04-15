import { pengurus, pengawas } from '../data/siteData';

function OrgCard({ inisial, nama, jabatan, featured }) {
  return (
    <div
      className={`rounded-2xl p-6 text-center reveal-item transition-all duration-300 hover:-translate-y-1
        ${featured
          ? 'glass border-gold-500/30 col-span-full md:col-span-1'
          : 'glass border-white/10'
        }`}
    >
      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center font-display font-bold text-xl
        ${featured ? 'bg-gold-500 text-emerald-950' : 'bg-white/10 text-gold-400'}`}>
        {inisial}
      </div>
      <p className="font-display text-white font-semibold text-base leading-snug">{nama}</p>
      <p className={`text-sm mt-1 font-body ${featured ? 'text-gold-400' : 'text-white/55'}`}>{jabatan}</p>
    </div>
  );
}

export default function Organization() {
  return (
    <section
      id="org"
      className="relative py-28 grain overflow-hidden"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1681842883882-b5c1c9f37869?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHBlcmt1bXB1bGFuJTIwZG9rdGVyfGVufDB8fDB8fHww')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-emerald-950/85" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold font-body reveal-item">Struktur Organisasi</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 reveal-item">Pengurus & Pengawas KVI</h2>
        </div>

        {/* Pengurus */}
        <p className="text-gold-400 text-xs uppercase tracking-widest font-semibold mb-6 reveal-item">Pengurus</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {pengurus.map((p, i) => (
            <OrgCard key={i} {...p} featured={i === 0} />
          ))}
        </div>

        {/* Pengawas */}
        <p className="text-gold-400 text-xs uppercase tracking-widest font-semibold mb-6 reveal-item">Pengawas</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          {pengawas.map((p, i) => (
            <OrgCard key={i} {...p} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
