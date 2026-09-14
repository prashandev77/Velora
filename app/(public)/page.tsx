import Hero from '@/components/Hero';
import TravelStyle from '@/components/TravelStyle';
import WhyAvelora from '@/components/WhyAvelora';
import WhatsYourSriLanka from '@/components/WhatsYourSriLanka';
import ResponsibleTravel from '@/components/ResponsibleTravel';
import SignatureJourneys from '@/components/SignatureJourneys';
import Destinations from '@/components/Destinations';
import StartPlanning from '@/components/StartPlanning';
import HowItWorks from '@/components/HowItWorks';
import PrivateTravelPromise from '@/components/PrivateTravelPromise';
import FAQ from '@/components/FAQ';
import { getAllPackages } from '@/lib/data';

export default async function Home() {
  const packages = await getAllPackages();

  return (
    <>
      {/* 1. Inspiration */}
      <Hero />
      {/* 2. Travel Style */}
      <TravelStyle />
      {/* 3. Trust – The Avelora Difference */}
      <WhyAvelora />
      {/* 4. Campaign – What's Your Sri Lanka? */}
      <WhatsYourSriLanka />
      {/* 5. Journeys – Signature Packages */}
      <SignatureJourneys packages={packages} />
      {/* 6. Exploration – Sri Lanka by Province Map */}
      <Destinations />
      {/* 7. Responsibility - Travel with Purpose */}
      <ResponsibleTravel />
      {/* 8. Enquiry – Start Planning CTA */}
      <StartPlanning />
      {/* 9. Process – How It Works */}
      <HowItWorks />
      {/* 10. FAQ */}
      <FAQ />
      {/* 11. Reassurance – Our Private Travel Promise */}
      <PrivateTravelPromise />
    </>
  );
}
