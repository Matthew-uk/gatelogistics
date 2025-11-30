import React, { JSX } from 'react';
import Image from 'next/image';

export default function DetailsSection(): JSX.Element {
  return (
    <section className="py-16 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - main content */}
          <div className="lg:col-span-8">
            <article className="space-y-12 text-gray-700">
              <header>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-800">
                  Road Freight Introduction
                </h2>
                <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl">
                  When goods have to be delivered to your customer’s door, road
                  freight is still indispensable. And will remain so in future.
                  In recent years, 24 Top Global Xpress Shipment has expanded
                  the options for European distribution by road freight by
                  adding dozens of lanes. We make up our own daily schedules for
                  packed product lines. This applies both to full and part truck
                  loads.
                </p>
              </header>

              <section>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-800">
                  Transport Solutions
                </h3>
                <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl">
                  24 Top Global Xpress Shipment is the number one logistics
                  supply chain director with a maritime character. In addition
                  to overseas import, export and warehousing activities, we also
                  handle the distribution of your goods to and from any
                  destination in the World. For more than 20 years, our business
                  locations situated at inland road, rail and water terminals
                  have been the foundation of our operations. Our logistics
                  services would not be complete without a rapid and efficient
                  transport service that is perfectly in line with these
                  terminals and which allow us to deliver goods right to your
                  customer’s door.
                </p>
              </section>

              <section>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-gray-800">
                  Quality and Reliability
                </h3>
                <p className="mt-4 text-sm lg:text-base leading-relaxed max-w-3xl">
                  Your business needs the right goods in the right place at the
                  right time. In other words: delivery reliability. That’s why
                  our efforts are registered in KPIs. Thanks to our modern
                  tracking & tracing systems, we measure and evaluate these
                  indicators per shipment. Our modern information techniques
                  allow us to analyze your shipment precisely. Our logistics
                  engineers use this information to:
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
