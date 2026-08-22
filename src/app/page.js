import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Services from '@/components/Services';
import DC3 from '@/components/DC3';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Services />
        <DC3 />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
