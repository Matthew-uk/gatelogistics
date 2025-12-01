import ContactSection from '@/components/custom/Contact';
import ContactHero from '@/components/custom/ContactHero';
import FaqHero from '@/components/custom/FaqHero';
import FAQSection from '@/components/custom/Faqs';
import TrackingSection from '@/components/custom/Tracking';
import TrackingHero from '@/components/custom/TrackingHero';
import React from 'react';

const Page = () => {
  return (
    <div className="font-poppins">
      <TrackingHero />
      <TrackingSection />
    </div>
  );
};

export default Page;
