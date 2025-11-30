import AboutHero from '@/components/custom/AboutHero';
import AboutWe from '@/components/custom/AboutWe';
import ChooseUs from '@/components/custom/Choose';
import Footer from '@/components/custom/Footer';
import Header from '@/components/custom/Header';
import MissionVision from '@/components/custom/MissionVision';
import Partners from '@/components/custom/Partners';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      {/* <Header /> */}
      <AboutHero />
      <AboutWe />
      <MissionVision />
      <ChooseUs />
      <Partners />
      {/* <Footer /> */}
    </div>
  );
};

export default AboutPage;
