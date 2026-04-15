import { membership } from '../data/siteData';

export default function Membership() {
  return (
    <section id="membership" className="py-28 bg-cream-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-500 font-semibold font-body reveal-item">{membership.label}</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-emerald-900 mt-3 reveal-item">
            {membership.title}
          </h2>
          <p className="text-zinc-500 font-body mt-4 max-w-xl mx-auto reveal-item">{membership.intro}</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-cream-100 overflow-hidden reveal-item">
          {membership.items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-6 ${i < membership.items.length - 1 ? 'border-b border-cream-100' : ''}`}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-display font-bold text-sm mt-0.5">
                {i + 1}
              </span>
              <p className="text-zinc-600 font-body leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
