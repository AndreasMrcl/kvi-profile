import { navigate } from '../hooks/useRoute';

/**
 * Reusable page header with navy background, breadcrumb, and optional tab bar.
 *
 * Props:
 *   breadcrumbs  – [{ label, path }]  last item is current page (no link)
 *   title        – main heading string
 *   subtitle     – subheading string
 *   badge        – optional { text, color:'green'|'gold'|'navy' }
 *   tabs         – optional [{ key, label }]  renders tab nav at bottom of hero
 *   activeTab    – current tab key
 *   onTabChange  – (key) => void
 *   image        – optional background image url (low opacity overlay)
 *   actions      – optional [{ label, path, anchor, primary }]
 */
export default function PageHero({
  breadcrumbs = [],
  title = '',
  subtitle = '',
  badge = null,
  tabs = [],
  activeTab = '',
  onTabChange = () => {},
  image = null,
  actions = [],
}) {
  return (
    <div className="relative bg-navy-800 pt-[88px] md:pt-[104px] overflow-hidden">
      {/* background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-40" />

      {/* optional image */}
      {image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: `url('${image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 to-navy-800/95" />
        </>
      )}

      {/* decorative orbs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-kvi-500/8" />
      <div className="absolute bottom-10 left-1/3 w-48 h-48 rounded-full bg-white/[0.03]" />

      <div className="relative max-w-[1320px] mx-auto px-6 md:px-8 pt-14 pb-0">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 mb-5 flex-wrap">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-2">
                {i < breadcrumbs.length - 1 ? (
                  <button
                    onClick={() => navigate(b.path, '')}
                    className="text-xs text-white/50 hover:text-white/80 transition-colors font-body"
                  >
                    {b.label}
                  </button>
                ) : (
                  <span className="text-xs text-white/90 font-semibold font-body">{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <svg className="w-3 h-3 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className={`inline-flex items-center gap-2 rounded-md px-3 py-1 mb-5 border
            ${badge.color === 'gold'
              ? 'bg-gold-400/12 border-gold-400/25'
              : badge.color === 'navy'
              ? 'bg-white/8 border-white/15'
              : 'bg-kvi-500/15 border-kvi-500/30'}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full
              ${badge.color === 'gold' ? 'bg-gold-400' : badge.color === 'navy' ? 'bg-white/60' : 'bg-kvi-400'}`}
            />
            <span className={`text-[11px] font-bold tracking-widest uppercase
              ${badge.color === 'gold' ? 'text-gold-300' : badge.color === 'navy' ? 'text-white/80' : 'text-kvi-300'}`}>
              {badge.text}
            </span>
          </div>
        )}

        {/* Title + subtitle */}
        <h1 className="font-display text-4xl md:text-[46px] font-extrabold text-white leading-[1.1] mb-5 tracking-tight" style={{ textWrap: 'pretty' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-[15px] leading-[1.75] max-w-[540px] mb-8 font-body">{subtitle}</p>
        )}

        {/* Action buttons */}
        {actions.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-10">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(a.path, a.anchor)}
                className={`px-6 py-3 rounded-lg text-[13px] font-bold tracking-wide transition-all
                  ${a.primary
                    ? 'bg-kvi-600 hover:bg-kvi-700 text-white shadow-card'
                    : 'bg-white/8 hover:bg-white/15 text-white border border-white/15'}`}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}

        {/* Tab nav */}
        {tabs.length > 0 && (
          <div className="flex gap-1 mt-10">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => onTabChange(t.key)}
                className={`px-5 py-3 rounded-t-lg text-[12px] font-bold transition-all
                  ${activeTab === t.key
                    ? 'bg-white text-navy-800'
                    : 'bg-white/8 text-white/75 hover:bg-white/15'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* bottom spacer when no tabs */}
        {tabs.length === 0 && <div className="pb-14" />}
      </div>
    </div>
  );
}
