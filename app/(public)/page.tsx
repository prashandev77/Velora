import Hero from '@/components/Hero';
import TravelStyle from '@/components/TravelStyle';
import Destinations from '@/components/Destinations';
import SignatureJourneys from '@/components/SignatureJourneys';
import WhyVelora from '@/components/WhyVelora';
import HowItWorks from '@/components/HowItWorks';
import PrivateTravelPromise from '@/components/PrivateTravelPromise';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <TravelStyle />
      <Destinations />
      <SignatureJourneys />
      <WhyVelora />
      <HowItWorks />
      <PrivateTravelPromise />
      <FAQ />
      <Newsletter />
    </>
  );
}
