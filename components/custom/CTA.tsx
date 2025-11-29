'use client';

import React, { useEffect, useRef, useState } from 'react';
import StatCounter from './StatCounter';
import { Building, CalendarDays, Earth, UsersRound } from 'lucide-react';

/**
 * CTA — hero + stats band that visually matches the image you provided.
 *
 * Requirements satisfied:
 * - hero text large, centered, overlay on hero image
 * - thin orange decorative double-rule under the heading
 * - orange CTA button centered
 * - stats band directly under hero, full width, dark background, 4 equal tiles
 * - icons are SVGs, colored orange, centered above numbers
 * - counters animate 0 -> target when section enters viewport (once)
 */

interface Stat {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  const ORANGE = '#f39c12'; // match design

  const stats: Stat[] = [
    {
      target: 120,
      suffix: '+',
      label: 'Offices Worldwide',
      icon: <Building size={50} />,
    },
    {
      target: 15000,
      suffix: '+',
      label: 'Employees Worldwide',
      icon: <UsersRound size={50} />,
    },
    {
      target: 15,
      suffix: '+',
      label: 'Countries Covered',
      icon: <Earth size={50} />,
    },
    {
      target: 25,
      suffix: '+',
      label: 'Years Of Experience',
      icon: <CalendarDays size={50} />,
    },
  ];

  // IntersectionObserver: trigger once when hero is visible (center-ish)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect(); // only trigger once
        }
      },
      {
        threshold: 0.25,
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="cta-heading" className="w-full">
      {/* HERO: full-width background image with overlay */}
      <div
        className="w-full bg-cover bg-center relative"
        style={{
          backgroundImage: "url('/hero.jpg')",
          minHeight: '520px',
        }}
        role="img"
        aria-label="Container ship at port"
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/55"></div>

        {/* hero content centered */}
        <div className="relative z-10 inset-y-28 max-w-6xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
          <h2
            id="cta-heading"
            className="text-5xl text-white font-medium font-montserrat leading-tight"
            style={{
              //   fontSize: '56px',
              lineHeight: '1.02',
              letterSpacing: '-0.5px',
            }}
          >
            Let The Experts Handle Your Logistics.
          </h2>

          {/* decorative double-rule */}
          <div className="mt-6 flex items-center gap-3">
            <div className="w-16 h-[2px] bg-[#f39c12] rounded"></div>
            <div className="w-6 h-[2px] bg-[#f39c12] rounded opacity-60"></div>
          </div>

          <p
            className="text-gray-200 mt-6 max-w-2xl"
            style={{ fontSize: '16px', lineHeight: '1.9' }}
          >
            The most valuable resource we have is our employees. Their
            relentless pursuit of perfection is what has enabled 24 Top Global
            Xpress to deliver the premium level of service which it is known
            for.
          </p>

          <button
            type="button"
            className="mt-8 inline-block px-8 py-3 bg-[#f39c12] hover:bg-[#e2870c] text-white font-semibold rounded shadow-sm transition-colors"
            aria-label="Get a quote"
          >
            GET A QUOTE
          </button>
        </div>

        {/* bottom edge shadow to visually separate hero from stats */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-linear-to-b from-black/0 to-black"></div>
      </div>

      {/* STATS BAND */}
      <div className="w-full bg-[#0b0b0b] text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center py-16 border-t border-b border-transparent md:border-b-0 md:border-r md:last:border-r-0`}
              style={{
                minHeight: '220px',
                borderColor: '#111',
              }}
              role="group"
              aria-label={s.label}
            >
              <div className="mb-6">{s.icon}</div>

              <div
                className="text-4xl md:text-5xl font-bold"
                style={{ lineHeight: 1, letterSpacing: '-0.5px' }}
                aria-live="polite"
              >
                <StatCounter
                  target={s.target}
                  suffix={s.suffix}
                  animate={animate}
                  delay={i * 200}
                />
              </div>

              <div className="mt-4 text-sm text-[#f39c12] font-medium font-montserrat">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
