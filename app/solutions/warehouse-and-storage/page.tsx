import React, { JSX } from 'react';
import Image from 'next/image';
import WareHouseHero from '@/components/custom/WarehouseHero';

export default function DetailsSection(): JSX.Element {
  return (
    <section className="py-16 bg-white font-poppins">
      <WareHouseHero />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - main content */}
          <div className="lg:col-span-8">
            <article className="space-y-12 text-gray-700">
              <header>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-800">
                  Warehousing & Storage Introduction
                </h2>
                <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl">
                  As a logistics supply chain director, we are situated at
                  strategic inland terminals from where deliveries can be made
                  within 24 hours to the most important European consumer
                  concentrations. We offer 200,000 m2 of centrally located,
                  advanced dedicated or public warehouse facilities under
                  customs control. All these warehouse facilities meet the most
                  modern requirements relating to health and safety, security
                  and AEO, and are spatially flexible. In this way, we offer
                  tailor-made solutions for your organisation.
                </p>
              </header>

              <section>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-800">
                  Knowledge and facilities
                </h3>
                <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl">
                  24 Top Global Xpress’ scale enables us to take innovative and
                  decisive action to develop and implement the most suitable
                  service portfolio for your organization. For this purpose, we
                  have an IT & logistical engineering department. Our warehouse
                  processes focus on goods intakes, AEO-certified customs
                  services, quality controls, stock management, e-commerce order
                  fulfilment and customer-specific product management. Data
                  exchange is preferably digital.
                </p>
              </section>

              <section>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-800">
                  Flexible labor pool
                </h3>
                <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl">
                  Seasonal influences, rapidly expanding markets and sensitivity
                  to economic cycles: your organisation never stands still. For
                  those focusing on cost management and quality, the flexible
                  deployment of the right staff and equipment is crucial. We
                  position our well-trained, qualified and flexible labour pool
                  in those positions where they have the greatest benefit for
                  you. Seacon has its own large flexible labour pool. We have
                  excellent relationships with secondment firms, temporary
                  employment agencies and sheltered workshops.
                </p>
              </section>
            </article>
          </div>

          {/* Right column - sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="bg-white p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  Our Solutions
                </h4>

                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1">
                      {/* airplane icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.18 9.18l6.23-3.11a.5.5 0 00.24-.66l-.5-1a.5.5 0 00-.66-.24L9.37 6.5 6.98 4.8a.5.5 0 00-.75.36L5.9 9.1 2 10.5v1L5.9 12.9l.33 3.94a.5.5 0 00.76.36l2.39-1.7 7.08 2.32a.5.5 0 00.66-.24l.5-1a.5.5 0 00-.24-.66l-6.23-3.11z" />
                      </svg>
                    </span>
                    <span>Air Freight Forwarding</span>
                  </li>

                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1">
                      {/* ship icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 12l3 1 2-1 2 .5 2-1 3 1v3H2v-3zM4 6h12v2H4V6zM10 2l2 3H8l2-3z" />
                      </svg>
                    </span>
                    <span>Ocean Freight Forwarding</span>
                  </li>

                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1">
                      {/* truck icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M3 11h11v-3H11V6H3v5zM16 11h1v2h-1v-2zM13 13a1 1 0 11-2 0 1 1 0 012 0zM6 13a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </span>
                    <span>Road Freight Forwarding</span>
                  </li>

                  <li className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-1">
                      {/* warehouse icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-amber-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 6l8-4 8 4v10H2V6zM9 8v6h2V8H9z" />
                      </svg>
                    </span>
                    <span>Warehousing And Storage</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 border border-gray-100 shadow-sm">
                <h4 className="text-xl font-bold text-gray-800 mb-4">
                  Contact Us
                </h4>

                <div className="flex items-start gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-amber-400 mt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v.5L10 9 2 4.5V4zM2 6.7V16a2 2 0 002 2h12a2 2 0 002-2V6.7l-8 4.3-8-4.3z" />
                  </svg>
                  <div>
                    <a
                      href="mailto:support@24topglobalxpress.com"
                      className="text-sm text-gray-700 hover:underline"
                    >
                      support@24topglobalxpress.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-amber-400 mt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a8 8 0 108 8 8 8 0 00-8-8zM9 6h2v5H9V6zM9 13h2v2H9v-2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-700">
                      Sat - Thu: 8am to 7pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
