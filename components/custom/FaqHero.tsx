import React from 'react';

const FaqHero = () => {
  return (
    <section
      aria-label="About us hero"
      className="relative w-full bg-center bg-cover bg-no-repeat font-montserrat mt-4"
      style={{
        // update path if you keep the original filename
        backgroundImage: `url('/land-hero.jpg')`,
      }}
    >
      {/* dark overlay to match the picture's moody tone and ensure readable text */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] flex items-center justify-center">
        <div className="text-center">
          {/* Title */}
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-widest uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            FAQs
          </h1>

          {/* Breadcrumb */}
          <nav
            className="mt-4 flex items-center justify-center text-sm sm:text-base"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-2 text-gray-300">
              <li>
                <a href="/" className="text-orange-400 hover:underline">
                  Home
                </a>
              </li>

              <li className="text-gray-400">»</li>

              <li aria-current="page" className="text-gray-200">
                FAQ
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* subtle bottom fade to mimic the reference photo's darker bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default FaqHero;
