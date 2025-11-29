'use client';

import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);

  // Background images array - replace with your actual images
  const backgroundImages = [
    '/hero.jpg', // Replace with your first image path
    '/hero-2.jpg', // Replace with your second image path
    '/hero-3.jpg', // Replace with your third image path
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Transitions */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentBg ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
        {/* Top Text - FAST.SECURED.WORLDWIDE */}
        <div className="mb-6">
          <h1 className="text-lg font-light tracking-[0.3em] md:text-xl text-primary">
            FAST.SECURED.WORLDWIDE
          </h1>
        </div>

        {/* Main Logo - EXPRESSCOURIER */}
        <div className="mb-8">
          <h2 className="text-5xl font-black uppercase tracking-widest md:text-7xl lg:text-8xl">
            EXPRESS
            <span className="block mt-2">COURIER</span>
          </h2>
        </div>

        {/* Bottom Text - LOGISTICS SERVICES */}
        <div className="mt-6">
          <p className="text-xl font-medium tracking-wider md:text-2xl">
            LOGISTICS SERVICES
          </p>
        </div>

        {/* Optional: Background Indicator Dots */}
        {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBg(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBg
                  ? 'bg-white scale-110'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
