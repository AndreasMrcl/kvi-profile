import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import TentangKami from './pages/TentangKami';
import BeritaPublikasi from './pages/BeritaPublikasi';
import RegistrasiLisensi from './pages/RegistrasiLisensi';
import EtikaStandar from './pages/EtikaStandar';
import HubungiKami from './pages/HubungiKami';
import DetailBerita from './pages/DetailBerita';
import { useReveal } from './hooks/useReveal';
import { useRoute } from './hooks/useRoute';

export default function App() {
  const { path } = useRoute();
  useReveal([path]);

  const renderPage = () => {
    if (path.startsWith('/tentang'))   return <TentangKami />;
    if (path.startsWith('/berita/'))   return <DetailBerita />;
    if (path.startsWith('/berita'))    return <BeritaPublikasi />;
    if (path.startsWith('/registrasi'))return <RegistrasiLisensi />;
    if (path.startsWith('/etika'))     return <EtikaStandar />;
    if (path.startsWith('/kontak'))    return <HubungiKami />;
    return <Home />;
  };

  return (
    <>
      <Navbar currentPath={path} />
      <main>{renderPage()}</main>
      <Footer />
      <BackToTop />
    </>
  );
}
