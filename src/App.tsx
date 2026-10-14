import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { IntroController } from './components/layout/IntroController';
import { Contact } from './components/sections/Contact';
import { Experiences } from './components/sections/Experiences';
import { Faq } from './components/sections/Faq';
import { Gallery } from './components/sections/Gallery';
import { Hero } from './components/sections/Hero';
import { Highlights } from './components/sections/Highlights';
import { HowItWorks } from './components/sections/HowItWorks';
import { Parties } from './components/sections/Parties';
import { Story } from './components/sections/Story';
import { Testimonials } from './components/sections/Testimonials';

export default function App() {
  return (
    <>
      <IntroController />
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Highlights />
        <Story />
        <Experiences />
        <Parties />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
