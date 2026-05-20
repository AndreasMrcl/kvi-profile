import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import TentangKami from "./pages/TentangKami";
import BeritaPublikasi from "./pages/BeritaPublikasi";
import RegistrasiLisensi from "./pages/RegistrasiLisensi";
import EtikaStandar from "./pages/EtikaStandar";
import HubungiKami from "./pages/HubungiKami";
import DetailBerita from "./pages/DetailBerita";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import { useReveal } from "./hooks/useReveal";

const MAINTENANCE_MODE = false;

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  const location = useLocation();
  useReveal([location.pathname]);

  if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  return (
    <>
      <Navbar />
      <ScrollManager />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<TentangKami />} />
          <Route path="/registrasi" element={<RegistrasiLisensi />} />
          <Route path="/etika" element={<EtikaStandar />} />
          <Route path="/kontak" element={<HubungiKami />} />
          <Route path="/berita" element={<BeritaPublikasi />} />
          <Route path="/berita/:slug" element={<DetailBerita />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
