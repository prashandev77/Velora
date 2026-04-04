import Hero from '@/components/Hero';
import TravelStyle from '@/components/TravelStyle';
import WhyAvelora from '@/components/WhyAvelora';
import SignatureJourneys from '@/components/SignatureJourneys';
import Destinations from '@/components/Destinations';
import StartPlanning from '@/components/StartPlanning';
import HowItWorks from '@/components/HowItWorks';
import PrivateTravelPromise from '@/components/PrivateTravelPromise';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      {/* 1. Inspiration */}
      <Hero />
      {/* 2. Travel Style */}
      <TravelStyle />
      {/* 3. Trust – The Avelora Difference */}
      <WhyAvelora />
      {/* 4. Journeys – Signature Packages */}
      <SignatureJourneys />
      {/* 5. Exploration – Sri Lanka by Province Map */}
      <Destinations />
      {/* 6. Enquiry – Start Planning CTA */}
      <StartPlanning />
      {/* 7. Process – How It Works */}
      <HowItWorks />
      {/* 8. Reassurance – Our Private Travel Promise */}
      <PrivateTravelPromise />
      {/* 9. FAQ */}
      <FAQ />
      {/* 10. Social Proof – Traveller Reviews */}
      <Testimonials />
    </>
  );
}
