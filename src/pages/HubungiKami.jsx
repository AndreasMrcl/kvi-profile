import { useState } from 'react';
import { contact } from '../data/siteData';
import PageHero from '../components/PageHero';

const JAM = [
  { hari: 'Senin – Jumat',         jam: '08.00 – 16.00 WIB', status: 'Buka',     statusClass: 'bg-kvi-50 text-kvi-600' },
  { hari: 'Sabtu',                  jam: '08.00 – 12.00 WIB', status: 'Terbatas', statusClass: 'bg-amber-50 text-amber-600' },
  { hari: 'Minggu & Libur Nasional',jam: '—',                 status: 'Tutup',    statusClass: 'bg-zinc-100 text-zinc-500' },
];

const KONTAK_INFO = [
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', judul: 'Alamat Kantor', bg: 'bg-kvi-50',    text: 'text-kvi-600', detail: contact.alamat },
  { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z', judul: 'Telepon', bg: 'bg-navy-50', text: 'text-navy-700', detail: `${contact.telepon}\n(Senin–Jumat, 08.00–16.00 WIB)` },
  { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', judul: 'Email', bg: 'bg-amber-50', text: 'text-amber-700', detail: `${contact.email}\nPesan dibalas dalam 1–2 hari kerja` },
  { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', judul: 'Pesan Langsung', bg: 'bg-emerald-50', text: 'text-emerald-700', detail: 'Kirim WhatsApp ke\n+62 812-3456-7890' },
];

const DEPARTEMEN = [
  { nama: 'Sekretariat Umum',     email: 'sekretariat@kvi.or.id', telp: 'Ext. 101', desc: 'Informasi umum, surat-menyurat resmi' },
  { nama: 'Divisi Registrasi',    email: 'registrasi@kvi.or.id',  telp: 'Ext. 102', desc: 'Pendaftaran STRV, SIP, dan perpanjangan' },
  { nama: 'Divisi Etik & Disiplin',email: 'etik@kvi.or.id',       telp: 'Ext. 103', desc: 'Pengaduan etik dan penegakan disiplin' },
  { nama: 'Divisi Pendidikan',    email: 'pendidikan@kvi.or.id',  telp: 'Ext. 104', desc: 'Akreditasi institusi dan standar kompetensi' },
];

function ContactForm() {
  const [form, setForm] = useState({ nama: '', email: '', telepon: '', topik: '', pesan: '' });
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div className="bg-kvi-50 border-2 border-kvi-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center h-full">
      <div className="w-16 h-16 rounded-full bg-kvi-500 flex items-center justify-center mb-5">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </div>
      <h3 className="font-display text-xl font-bold text-navy-800 mb-2">Pesan Terkirim!</h3>
      <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-6">Tim KVI akan merespons dalam 1–2 hari kerja.</p>
      <button onClick={() => setSent(false)} className="px-6 py-2.5 bg-kvi-500 hover:bg-kvi-600 text-white rounded-lg text-sm font-bold transition-colors">Kirim Pesan Lain</button>
    </div>
  );

  return (
    <div className="bg-paper-50 rounded-2xl border border-paper-200 p-8 shadow-soft">
      <h3 className="font-display font-bold text-navy-800 text-xl mb-1.5">Kirim Pesan</h3>
      <p className="text-zinc-500 text-xs mb-6">Isi formulir di bawah dan kami akan segera merespons.</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        {[
          { id: 'nama', label: 'Nama Lengkap', ph: 'Nama Anda' },
          { id: 'email', label: 'Email', ph: 'email@contoh.com' },
          { id: 'telepon', label: 'Nomor Telepon', ph: '+62 xxx' },
        ].map((f) => (
          <div key={f.id}>
            <label className="block text-xs font-semibold text-zinc-600 mb-1.5">{f.label}</label>
            <input value={form[f.id]} onChange={(e) => setForm((p) => ({ ...p, [f.id]: e.target.value }))} placeholder={f.ph} className="w-full px-4 py-2.5 border-[1.5px] border-paper-200 focus:border-kvi-400 rounded-xl text-sm font-body outline-none bg-white" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Topik</label>
          <select value={form.topik} onChange={(e) => setForm((p) => ({ ...p, topik: e.target.value }))} className="w-full px-4 py-2.5 border-[1.5px] border-paper-200 focus:border-kvi-400 rounded-xl text-sm font-body outline-none bg-white">
            <option value="" disabled>Pilih topik</option>
            <option>Registrasi & Lisensi</option>
            <option>Etika & Standar</option>
            <option>Keanggotaan</option>
            <option>Informasi Umum</option>
            <option>Lainnya</option>
          </select>
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-semibold text-zinc-600 mb-1.5">Pesan</label>
        <textarea value={form.pesan} onChange={(e) => setForm((p) => ({ ...p, pesan: e.target.value }))} placeholder="Tulis pesan Anda di sini..." rows={4} className="w-full px-4 py-2.5 border-[1.5px] border-paper-200 focus:border-kvi-400 rounded-xl text-sm font-body outline-none bg-white resize-y leading-relaxed" />
      </div>
      <button onClick={() => setSent(true)} className="w-full py-3 bg-kvi-500 hover:bg-kvi-600 text-white rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        Kirim Pesan
      </button>
    </div>
  );
}

export default function HubungiKami() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Beranda', path: '/' }, { label: 'Hubungi Kami' }]}
        title={'HUBUNGI\nKAMI'}
        subtitle="Kami siap melayani pertanyaan, kebutuhan informasi, dan layanan Anda terkait profesi kedokteran hewan Indonesia."
      />

      {/* Jam operasional strip */}
      <div className="bg-navy-800 py-0">
        <div className="max-w-[1320px] mx-auto px-6 md:px-8 -mt-0">
          <div className="bg-white/8 backdrop-blur rounded-b-2xl p-6 border border-white/10 max-w-lg ml-auto -translate-y-6 hidden md:block shadow-card">
            <div className="text-xs font-bold text-white/55 uppercase tracking-widest mb-4">Jam Operasional</div>
            {JAM.map((j, i) => (
              <div key={i} className={`flex items-center justify-between py-3 ${i < JAM.length - 1 ? 'border-b border-white/8' : ''}`}>
                <span className="text-sm text-white/70">{j.hari}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">{j.jam}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${j.statusClass}`}>{j.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t-4 border-kvi-500 bg-white">
        {/* Info cards */}
        <section className="py-16">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {KONTAK_INFO.map((k, i) => (
                <div key={i} className="bg-paper-50 rounded-2xl p-6 border border-paper-200 hover:shadow-soft transition-all reveal-item" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${k.bg}`}>
                    <svg className={`w-5 h-5 ${k.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={k.icon} />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-navy-800 text-[15px] mb-2">{k.judul}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {k.detail.split('\n').map((l, j) => <span key={j}>{l}{j < k.detail.split('\n').length - 1 && <br />}</span>)}
                  </p>
                </div>
              ))}
            </div>

            {/* Map + Form */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden border border-paper-200 shadow-soft min-h-[420px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.8!2d106.833!3d-6.294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f13d3a787e27%3A0x8df1dbb55e58571!2sJl.%20Kebagusan%2C%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1"
                  className="w-full h-full min-h-[420px] block border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi KVI"
                />
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Departemen */}
        <section className="bg-paper-100 py-16">
          <div className="max-w-[1320px] mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold">Kontak Langsung</span>
              <h2 className="font-display text-3xl font-bold text-navy-800 mt-3 mb-2">Hubungi Divisi Terkait</h2>
              <div className="h-1 w-16 bg-kvi-500 rounded mx-auto mb-3" />
              <p className="text-zinc-500 text-sm max-w-md mx-auto">Untuk pertanyaan spesifik, hubungi langsung divisi yang berwenang.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DEPARTEMEN.map((d, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-zinc-100 hover:shadow-card hover:border-kvi-200 transition-all duration-300 reveal-item" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-11 h-11 rounded-xl bg-kvi-50 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-kvi-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-navy-800 text-[15px] mb-1.5">{d.nama}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4">{d.desc}</p>
                  <div className="flex flex-col gap-2">
                    <a href={`mailto:${d.email}`} className="text-xs text-kvi-600 hover:text-kvi-700 font-semibold flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {d.email}
                    </a>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      021-78848462 {d.telp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
