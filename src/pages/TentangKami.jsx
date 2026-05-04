import { useState } from "react";
import { Link } from "react-router-dom";
import {
  about,
  fungsiList,
  membership,
  pengurus,
  pengawas,
} from "../data/siteData";
import profileImage from "../assets/optimized/profile.webp";
import PageHero from "../components/PageHero";

const ASOSIASI = ["AFKHI", "APSTVI", "PDHI", "PAVETI", "PARAVETINDO"];

/* ── Profil section ── */
function ProfilSection() {
  return (
    <section id="section-profil" className="bg-white py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal-item relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-card">
              <img
                src={profileImage}
                alt="Dokter Hewan"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Vision pill */}
            <div className="absolute top-[-16px] right-[-16px] bg-kvi-600 rounded-xl p-4 shadow-card max-w-[180px]">
              <div className="text-[10px] font-bold text-white/70 tracking-widest uppercase mb-1">
                Visi
              </div>
              <div className="text-xs font-semibold text-white leading-snug">
                Profesi Veteriner Unggul &amp; Berintegritas
              </div>
            </div>
          </div>

          <div className="reveal-item">
            <span className="text-[10px] font-body uppercase tracking-widest text-kvi-500 font-bold">
              {about.label}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2 leading-tight">
              {about.title}
            </h2>
            <div className="h-1 w-16 bg-kvi-500 rounded mb-5" />
            <p className="text-zinc-600 font-body leading-relaxed mb-5 text-sm md:text-base">
              {about.intro}
            </p>
            <ul className="space-y-3 mb-7">
              {about.tujuan.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-zinc-600 font-body text-sm leading-relaxed"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-kvi-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {ASOSIASI.map((a) => (
                <span
                  key={a}
                  className="px-3 py-1.5 rounded-md bg-kvi-50 text-kvi-700 text-xs font-semibold border border-kvi-100"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Fungsi section ── */
function FungsiSection() {
  return (
    <section id="section-fungsi" className="relative py-20 bg-paper-100">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-14">
          <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body reveal-item">
            Fungsi Organisasi
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 reveal-item">
            Peran Strategis KVI
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mt-4 mx-auto reveal-item" />
          <p className="text-zinc-500 font-body mt-5 max-w-xl mx-auto text-sm md:text-base reveal-item">
            Enam pilar utama yang menjadi landasan gerak dan tanggung jawab
            Konsil Veteriner Indonesia.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fungsiList.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border border-zinc-100 shadow-soft hover:shadow-card hover:-translate-y-1 hover:border-kvi-200 transition-all duration-300 reveal-item"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-kvi-50 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-kvi-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={f.icon}
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-navy-800 mb-2 leading-tight">
                {f.title}
              </h3>
              <p className="text-zinc-500 font-body text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Membership section ── */
function MembershipSection() {
  return (
    <section id="section-keanggotaan" className="bg-white py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* CTA card */}
          <div className="relative bg-navy-800 rounded-2xl p-12 overflow-hidden shadow-card reveal-item">
            <div className="absolute inset-0 pattern-dots opacity-30" />
            <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-kvi-500/8" />
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <svg
                  className="w-7 h-7 text-kvi-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                Informasi Keanggotaan KVI
              </h3>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Setiap anggota memiliki hak dan kewajiban yang ditetapkan dalam
                AD/ART perkumpulan.
              </p>
              <Link
                to="/registrasi"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-kvi-500 hover:bg-kvi-600 text-white rounded-lg text-sm font-bold transition-colors"
              >
                Daftar Sekarang
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="reveal-item">
            <span className="text-[10px] font-body uppercase tracking-widest text-kvi-500 font-bold">
              {membership.label}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 mb-2 leading-tight">
              Hak &amp; Kewajiban Anggota
            </h2>
            <div className="h-1 w-16 bg-kvi-500 rounded mb-6" />
            <div className="bg-paper-50 rounded-xl border border-zinc-100 shadow-soft overflow-hidden">
              {membership.items.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-5 ${i < membership.items.length - 1 ? "border-b border-zinc-100" : ""}`}
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-md bg-kvi-500 text-white flex items-center justify-center font-display font-bold text-sm">
                    {i + 1}
                  </span>
                  <p className="text-zinc-600 font-body leading-relaxed text-sm md:text-base pt-1">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Organization section ── */
function OrgSection() {
  const [tab, setTab] = useState("pengurus");
  const people = tab === "pengurus" ? pengurus : pengawas;

  return (
    <section id="section-org" className="bg-paper-100 py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest text-kvi-500 font-bold font-body reveal-item">
            Struktur Organisasi
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-800 mt-3 reveal-item">
            Pengurus &amp; Pengawas KVI
          </h2>
          <div className="h-1 w-16 bg-kvi-500 rounded mt-4 mx-auto reveal-item" />
          {/* Tab toggle */}
          <div className="inline-flex bg-white rounded-xl p-1 border border-paper-200 gap-1 mt-6 reveal-item">
            {["pengurus", "pengawas"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all
                  ${tab === t ? "bg-navy-800 text-white" : "text-zinc-500 hover:text-zinc-700"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`grid gap-4 ${people.length <= 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"}`}
        >
          {people.map((p, i) => (
            <div
              key={i}
              className={`rounded-xl p-5 text-center reveal-item transition-all duration-300 hover:-translate-y-1 border shadow-soft hover:shadow-card
                ${i === 0 ? "bg-kvi-600 text-white border-kvi-600" : "bg-white text-navy-800 border-zinc-100"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className={`w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-lg
                ${i === 0 ? "bg-gold-400 text-kvi-900" : "bg-kvi-50 text-kvi-600"}`}
              >
                {p.inisial}
              </div>
              <p
                className={`font-display font-semibold text-sm leading-snug ${i === 0 ? "text-white" : "text-navy-800"}`}
              >
                {p.nama}
              </p>
              <p
                className={`text-xs mt-1 font-body ${i === 0 ? "text-gold-300" : "text-zinc-500"}`}
              >
                {p.jabatan}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page ── */
export default function TentangKami() {
  const TABS = [
    { key: "profil", label: "Profil & Tujuan" },
    { key: "fungsi", label: "Fungsi Organisasi" },
    { key: "keanggotaan", label: "Keanggotaan" },
    { key: "org", label: "Struktur Organisasi" },
  ];

  const scrollTo = (key) => {
    const el = document.getElementById(`section-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Beranda", path: "/" },
          { label: "Tentang Kami" },
        ]}
        title={"KONSIL\nVETERINER\nINDONESIA"}
        subtitle="Lembaga konsil profesi resmi yang mengatur dan mengawasi standar pendidikan, registrasi, serta praktik kedokteran hewan di seluruh Indonesia."
        tabs={TABS}
        activeTab="profil"
        onTabChange={scrollTo}
      />
      <div className="border-t-4 border-kvi-500">
        <ProfilSection />
        <FungsiSection />
        <MembershipSection />
        <OrgSection />
      </div>
    </>
  );
}
