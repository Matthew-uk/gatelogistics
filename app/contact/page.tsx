import ContactSection from '@/components/custom/Contact';
import ContactHero from '@/components/custom/ContactHero';
import FaqHero from '@/components/custom/FaqHero';
import FAQSection from '@/components/custom/Faqs';
import React from 'react';

const Page = () => {
  return (
    <div className="font-poppins">
      <ContactHero />
      <ContactSection />
    </div>
  );
};

export default Page;
