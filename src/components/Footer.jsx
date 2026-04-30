import { footerLinks, contact } from '../data/siteData';
import { navigate } from '../hooks/useRoute';
import logoKvi from '../assets/LOGO-KVI.png';

export default function Footer() {
  const alamatLines = contact.alamat.split('\n');

  return (
    <footer className="bg-navy-800 text-white">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 py-14">
        <div className="grid md:grid-cols-12 gap-10">

          {/* Quick links */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-white text-xs mb-4 tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={`#${link.path}`}
                    onClick={(e) => { e.preventDefault(); navigate(link.path, link.anchor); }}
                    className="text-white/65 hover:text-kvi-300 text-sm font-body transition-colors inline-flex items-center gap-1.5"
                  >
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo + tagline */}
          <div className="md:col-span-3 flex flex-col items-center text-center">
            <div className="bg-white/95 rounded-xl p-4 shadow-soft">
              <img src={logoKvi} alt="Konsil Veteriner Indonesia" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-white/55 text-xs leading-relaxed mt-4 max-w-[220px]">
              Indonesian Veterinary Statutory Body — menjaga mutu profesi kedokteran hewan di Indonesia.
            </p>
          </div>

          {/* Alamat */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-white text-xs mb-4 tracking-widest uppercase">Alamat</h4>
            <ul className="space-y-3 text-white/65 text-sm font-body">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-kvi-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">
                  {alamatLines.map((line, i) => (
                    <span key={i}>{line}{i < alamatLines.length - 1 && <br />}</span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 flex-shrink-0 text-kvi-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${contact.email}`} className="hover:text-kvi-300 transition-colors">{contact.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 flex-shrink-0 text-kvi-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <a href={`tel:${contact.telepon.replace(/-/g, '')}`} className="hover:text-kvi-300 transition-colors">{contact.telepon}</a>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-white text-xs mb-4 tracking-widest uppercase">Social Media</h4>
            <div className="flex gap-3">
              {footerLinks.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-kvi-600 hover:border-kvi-600 text-white/65 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/45 text-xs font-body">
          © {new Date().getFullYear()} KONSIL VETERINER INDONESIA. Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
