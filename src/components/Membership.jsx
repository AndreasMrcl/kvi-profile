import { membership } from '../data/siteData';

export default function Membership() {
  return (
    <section id="membership" className="py-20 md:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body reveal-item">
            {membership.label}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 reveal-item">
            {membership.title}
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mt-4 mx-auto reveal-item" />
          <p className="text-zinc-500 font-body mt-5 max-w-xl mx-auto text-sm md:text-base reveal-item">
            {membership.intro}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-paper-50 rounded-xl border border-zinc-100 shadow-soft overflow-hidden reveal-item">
          {membership.items.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 ${i < membership.items.length - 1 ? 'border-b border-zinc-100' : ''}`}
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-md bg-kvi-500 text-white flex items-center justify-center font-display font-bold text-sm">
                {i + 1}
              </span>
              <p className="text-zinc-600 font-body leading-relaxed text-sm md:text-base pt-1">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
