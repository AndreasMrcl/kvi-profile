import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Fungsi from './components/Fungsi';
import Membership from './components/Membership';
import Organization from './components/Organization';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Fungsi />
        <Membership />
        <Organization />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
