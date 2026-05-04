import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/siteData";
import Logo from "./Logo";

const resolveTo = (path, anchor) => (anchor ? `${path}#${anchor}` : path);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b
        ${
          scrolled
            ? "bg-white/97 backdrop-blur-md border-zinc-200 shadow-soft py-3"
            : "bg-white border-zinc-100 py-4"
        }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 flex items-center justify-between gap-4">
        <Link to="/" onClick={closeMenu} className="flex-shrink-0">
          <Logo variant="light" size="lg" />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={resolveTo(link.path, link.anchor)}
              end={link.path === "/"}
              onClick={closeMenu}
              className={({
                isActive,
              }) => `relative px-2.5 py-2 text-[10px] font-semibold tracking-wide transition-colors whitespace-nowrap
                ${isActive ? "text-kvi-600" : "text-navy-800 hover:text-kvi-600"}`}
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-6 h-[3px] bg-kvi-600 rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* SIVET CTA */}
        <Link
          to="/registrasi"
          onClick={closeMenu}
          className="hidden md:flex items-center gap-3 pl-3 pr-4 py-2.5 bg-navy-800 hover:bg-navy-900 text-white rounded-lg transition-colors shadow-sm"
        >
          <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-3-3v6m-9 0a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </div>
          <div className="leading-tight text-left">
            <div className="text-[13px] font-bold tracking-wide">SIVET</div>
            <div className="text-[10px] text-white/70 font-medium">
              Sistem Informasi Veteriner
            </div>
          </div>
          <div className="pl-3 ml-1 border-l border-white/20 text-[11px] font-semibold whitespace-nowrap">
            Log in / Register
          </div>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-navy-800 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-100 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={resolveTo(link.path, link.anchor)}
              end={link.path === "/"}
              onClick={closeMenu}
              className={({
                isActive,
              }) => `py-2.5 text-sm font-semibold tracking-wide transition-colors
                ${isActive ? "text-kvi-600" : "text-navy-800 hover:text-kvi-600"}`}
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/registrasi"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 bg-navy-800 text-white rounded-lg text-sm font-semibold"
          >
            SIVET · Log in / Register
          </Link>
        </div>
      )}
    </nav>
  );
}
