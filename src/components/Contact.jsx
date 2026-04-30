import { contact } from '../data/siteData';

export default function Contact() {
  const alamatLines = contact.alamat.split('\n');

  return (
    <section id="contact" className="py-20 md:py-24 bg-white">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body reveal-item">
            Hubungi Kami
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 reveal-item">
            {contact.title}
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mt-4 mx-auto reveal-item" />
          <p className="text-zinc-500 font-body mt-5 max-w-xl mx-auto text-sm md:text-base reveal-item">
            {contact.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-4 reveal-item">
            <div className="flex gap-4 p-5 bg-paper-50 rounded-xl border border-zinc-100">
              <div className="w-11 h-11 rounded-lg bg-kvi-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-navy-800 mb-1">Alamat Kantor</h4>
                <p className="text-zinc-500 font-body text-sm leading-relaxed">
                  {alamatLines.map((line, i) => (
                    <span key={i}>{line}{i < alamatLines.length - 1 && <br />}</span>
                  ))}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-paper-50 rounded-xl border border-zinc-100">
              <div className="w-11 h-11 rounded-lg bg-kvi-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-navy-800 mb-1">Telepon</h4>
                <p className="text-zinc-500 font-body text-sm">{contact.telepon}</p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-kvi-600 to-kvi-800 rounded-xl text-white shadow-card">
              <h4 className="font-display text-xl font-bold mb-2">Bergabung dengan KVI</h4>
              <p className="text-white/75 font-body text-sm leading-relaxed mb-4">
                Jadilah bagian dari komunitas profesional dokter hewan Indonesia yang terus berkembang dan berdedikasi.
              </p>
              <a
                href={`tel:${contact.telepon.replace(/-/g, '')}`}
                className="inline-block px-5 py-2.5 bg-white text-kvi-700 rounded-md text-sm font-bold hover:bg-gold-400 hover:text-kvi-900 transition-colors"
              >
                Hubungi Sekarang
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="reveal-item rounded-xl overflow-hidden shadow-soft border border-zinc-100 min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8!2d106.833!3d-6.294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f13d3a787e27%3A0x8df1dbb55e58571!2sJl.%20Kebagusan%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1"
              className="w-full h-full min-h-[400px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi KVI"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
