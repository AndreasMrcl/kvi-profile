import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../data/siteData";
import Logo from "./Logo";
import { useAuth } from "../contexts/AuthContext";

const resolveTo = (path, anchor) => (anchor ? `${path}#${anchor}` : path);

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/");
  };

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

        {/* Auth buttons / User menu */}
        <div className="hidden md:flex items-center gap-3">
          {currentUser ? (
            <>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="text-sm font-medium text-navy-800 hover:text-kvi-600 transition-colors"
              >
                {currentUser.name}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="px-4 py-2.5 text-navy-800 hover:text-kvi-600 font-medium text-sm transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="px-4 py-2.5 bg-navy-800 hover:bg-navy-900 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Daftar
              </Link>
            </>
          )}
        </div>

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
          <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col gap-2">
            {currentUser ? (
              <>
                <div className="px-4 py-2 text-sm text-navy-800 font-medium">
                  {currentUser.name}
                </div>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="px-4 py-2.5 text-center bg-blue-600 text-white rounded-lg text-sm font-medium"
                >
                  Profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="px-4 py-2.5 text-center bg-navy-700 text-white rounded-lg text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="px-4 py-2.5 text-center bg-navy-800 text-white rounded-lg text-sm font-medium"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
