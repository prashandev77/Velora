import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import JourneysSection from '@/components/JourneysSection';
import Destinations from '@/components/Destinations';
import FeaturedPackages from '@/components/FeaturedPackages';
import SpecialOffers from '@/components/SpecialOffers';
import HowItWorks from '@/components/HowItWorks';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import TrustedPartners from '@/components/TrustedPartners';
import AboutSection from '@/components/AboutSection';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <JourneysSection />
      <Destinations />
      <FeaturedPackages />
      <SpecialOffers />
      <HowItWorks />
      <Gallery />
      <Testimonials />
      <TrustedPartners />
      <AboutSection />
      <FAQ />
      <Newsletter />
    </>
  );
}
