import { navLinks } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 border-t border-gold-500/15">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-emerald-950 font-display font-bold text-lg">
              K
            </div>
            <div>
              <div className="text-white font-display font-semibold">Konsil Veteriner Indonesia</div>
              <div className="text-white/40 text-xs font-body">Organisasi Profesi Dokter Hewan</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/50 hover:text-gold-400 text-sm font-body transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/30 text-xs font-body">
          © {new Date().getFullYear()} Konsil Veteriner Indonesia. Seluruh hak cipta dilindungi undang-undang.
        </div>
      </div>
    </footer>
  );
}
