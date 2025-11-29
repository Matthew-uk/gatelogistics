import Image from 'next/image';
import Header from '../components/custom/Header';
import Hero from '../components/custom/Hero';
import Services from '../components/custom/Services';
import Experience from '../components/custom/Experience';
import CTA from '../components/custom/CTA';
import Stats from '../components/custom/Stats';
import Testimonials from '../components/custom/Testimonials';
import Footer from '../components/custom/Footer';
import About from '@/components/custom/About';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Header />
      <main className="w-full">
        <Hero />
        <About />
        <Services />
        <Experience />
        <CTA />
        {/* <Stats /> */}
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
