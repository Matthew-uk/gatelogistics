'use client';
import Image from 'next/image';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'; // shadcn-style accordion
// If your shadcn exports are under a different path, update the import above.

type FAQ = {
  id: string;
  q: string;
  a: string;
};

const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    q: 'WHAT IS LOGISTICS MANAGEMENT?',
    a: 'Logistics management is a function where a company usually consisting of various shipping and distribution professionals provide services to analyze a company’s supply chain, offer carrier and service options, and provide continued management of all or some areas of a customer’s transportation needs.',
  },
  {
    id: 'faq-2',
    q: 'DOES IT COST ANYTHING TO DO A FULL ANALYSIS OF OUR SUPPLY CHAIN SERVICES?',
    a: 'No, we do not charge for our initial analysis. There is absolutely nothing to lose by having our expert logistics professionals review your shipping and distribution spend and profile. In most cases we are compensated by our providers should you utilize our services.',
  },
  {
    id: 'faq-3',
    q: 'WHAT MODES AND SERVICES DOES 24 TOP GLOBAL XPRESS PROVIDE?',
    a: 'We offer services for international and domestic freight, LCL shipping, FCL shipping solutions, freight and parcel audit and reporting, and overall supply chain management.',
  },
  {
    id: 'faq-4',
    q: 'I AM A SMALL START-UP, CAN 24 TOP GLOBAL XPRESS HELP ME?',
    a: 'Yes, we love working with small and emerging companies. 24 Top Global Xpress provides the expertise and support to help your company scale.',
  },
  {
    id: 'faq-5',
    q: 'WHAT SIZE SHIPMENTS CAN YOU HANDLE?',
    a: 'Pretty much any size you have! We can handle individual cartons, palletized items, and large, bulky items up to 20,000 lbs per piece-plus everything in between. Our terminals are equipped for flatrack/flatbed loading and oversized freight. We can accommodate special freight needs by utilizing equipment rentals.',
  },
  {
    id: 'faq-6',
    q: 'HOW DO YOU MEASURE SHIPMENTS?',
    a: 'We measure the length, width, and height of the shipment and calculate the cubic feet of space that the shipment takes up in the container.',
  },
  {
    id: 'faq-7',
    q: 'CAN YOU HANDLE HAZARDOUS MATERIALS?',
    a: 'Yes. All of our associates have been fully trained and are certified in the handling of hazardous material. We take the handling of hazardous materials very seriously and are completely certified to transport freight of this nature. At this time, we do not handle Class 1 explosives. If you are shipping hazardous materials, you must include a copy of the MSDS with the shipment at the time of delivery. The freight must be properly packaged and labeled to meet all regulations. All hazardous items must be itemized to include: Shipper’s Name Shipper’s Emergency contact name & phone number Emergency Contact file number or name UN Number IMO Proper shipping name Hazardous Class Packaging Group (if applicable) Quantity and packaging type Weight Cubic feet Flash Point (if applicable) Placard',
  },
  {
    id: 'faq-8',
    q: 'DO YOU OFFER WAREHOUSING?',
    a: 'Yes! We offer standard storage fees and variable storage fees, (only pay for what you use), but we can negotiate storage costs to fit your budget. Our warehouses are highly secure, equipped with state of the art camera systems and alarms. Our facilities are monitored both on site and remotely. We also offer a full services WMS (warehouse management system).',
  },
];

export default function FAQSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 xl:px-0 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Title + subtitle + image */}
        <div className="lg:col-span-7">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl">
            All you need to know about 24 Top Global Xpress.
          </p>

          <div className="relative w-full h-[260px] lg:h-[420px]">
            {/* Make sure image is placed at /public/images/faq-truck.png */}
            <Image
              src="/faq-truck.jpg"
              alt="logistics truck and forklift"
              fill
              style={{ objectFit: 'contain' }}
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
          </div>
        </div>

        {/* RIGHT: Accordion */}
        <aside className="lg:col-span-5">
          <div className="border border-gray-200 rounded-sm overflow-hidden">
            <Accordion
              type="single"
              defaultValue="faq-1"
              className=""
              collapsible
            >
              {FAQS.map((f) => (
                <AccordionItem
                  key={f.id}
                  value={f.id}
                  className="border-b last:border-b-0"
                >
                  <div className="flex items-center justify-between px-6">
                    <AccordionTrigger className="flex-1 text-left">
                      <span className="block text-sm font-bold tracking-wide text-gray-800">
                        {f.q}
                      </span>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent className="px-6 pb-6 pt-0">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {f.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>
      </div>

      {/* Decorative rules / spacing to visually match screenshot */}
      <style jsx>{`
        /* Orange accent on the first opened header's left border and small minus icon effect */
        :global(.accordion-trigger[aria-expanded='true']) {
          color: rgb(
            254 180 60
          ); /* orange tint for open trigger if shadcn's trigger supports styling */
        }

        /* If you want an orange top header for the first item like the design, apply a special style:
           Note: This assumes the first AccordionItem has value="faq-1" and is open by default. */
        :global(.accordion-item[value='faq-1'] .accordion-trigger) {
          /* no-op: visual customization happens with Tailwind classes above or override your shadcn CSS */
        }
      `}</style>
    </section>
  );
}
