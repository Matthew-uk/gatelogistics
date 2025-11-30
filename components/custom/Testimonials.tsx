import React, { JSX } from 'react';
import Image from 'next/image';

const clients = [
  {
    id: 1,
    img: '/profile-1.png',
    name: 'Alex Douglas',
    location: 'USA',
    review:
      'These guys are just the coolest logistics company ever! They exceptionally handled our complex road freight services.',
    stars: 5,
  },
  {
    id: 2,
    img: '/profile-2.png',
    name: 'Aladino Schiavone',
    location: 'Italy',
    review:
      'Their performance on our project was extremely successful. As a result of this collaboration, the project was built with exceptional quality & delivered.',
    stars: 5,
  },
  {
    id: 3,
    img: '/profile-3.png',
    name: 'Isabela Ferreira',
    location: 'Spain',
    review:
      'The shipping process with this crew was a pleasurable experience! They did all in time and with no safety incidents.',
    stars: 4,
  },
];

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-gray-200'}`}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
    >
      <path d="M10 1.5l2.59 5.25L18.5 7.5l-4.25 3.9L15.18 17 10 14.1 4.82 17l.93-5.6L1.5 7.5l5.91-.75L10 1.5z" />
    </svg>
  );
}

export default function Testimonials(): JSX.Element {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="z-10 inset-y-28 max-w-6xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center font-montserrat">
          <h2
            id="cta-heading"
            className="text-3xl md:text-5xl text-black font-medium font-montserrat leading-tight"
            style={{
              //   fontSize: '56px',
              lineHeight: '1.02',
              letterSpacing: '-0.5px',
            }}
          >
            What Our Clients Say About Us
          </h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-16 h-[2px] bg-[#f39c12] rounded"></div>
            <div className="w-6 h-[2px] bg-[#f39c12] rounded opacity-60"></div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {clients.map((c, idx) => (
            <article
              key={c.id}
              className={`relative bg-white rounded-sm shadow-[0_6px_18px_rgba(16,24,40,0.08)] p-8 text-center flex flex-col items-center transition-transform duration-300 ease-in-out ${
                idx === 1 ? 'md:translate-y-0 md:shadow-lg' : ''
              }`}
              style={{ minHeight: 320 }}
            >
              <div className="-mt-14">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-4 border-white shadow-md bg-gray-50">
                  <Image
                    src={c.img}
                    alt={c.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
              </div>

              <blockquote className="mt-6 text-gray-600 italic text-sm leading-relaxed flex-1 relative px-4">
                <span className="absolute -left-3 -top-3 text-6xl text-gray-200">
                  “
                </span>
                <p className="mx-auto max-w-104">{c.review}</p>
                <span className="absolute -right-3 -bottom-3 text-6xl text-gray-200">
                  ”
                </span>
              </blockquote>

              <div className="mt-6">
                <div className="flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < c.stars} />
                  ))}
                </div>

                <h4 className="mt-4 text-sm font-semibold text-gray-800">
                  {c.name}
                </h4>
                <p className="text-xs text-gray-400 mt-1 italic">
                  From {c.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
