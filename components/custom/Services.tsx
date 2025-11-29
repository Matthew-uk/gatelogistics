import Image from 'next/image';

export default function Services() {
  const items = [
    {
      title: 'Ocean Freight',
      text: 'providing Perfect Shipping Document (Form M & PAAR), 20 & 40 fit Container shipping by Sea, Groupage Shipping, Customs Clearing',
      src: '/ship.png',
    },
    {
      title: 'Air Freight',
      text: 'We continue to improve our services to guarantee a competent, quick and accurate transportation handling process.',
      src: '/airplane.png',
    },
    {
      title: 'Land Transport',
      text: 'Land freight comprises two main modes of transport; road and rail. Rail freight sees goods loaded onto trains.',
      src: '/truck.png',
    },
    {
      title: 'Cargo Storage',
      text: 'With our flexible warehouse solutions and added services, you will benefit from modern and secured storage facilities worldwide, indoor as well as outdoor.',
      src: '/cube.png',
    },
  ];
  return (
    <section className="bg-black text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-5xl font-medium text-center font-montserrat">
          We Provide Best Logistic Services
        </h2>
        <p className="text-center text-xs md:text-sm mt-4 text-gray-300">
          When you ship with 24 Top Global Xpress – you’re shipping with
          specialists in international shipping and delivery services! With our
          wide range of Shipment parcel and package services, along with
          shipping, Storage and tracking solutions to fit your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {items.map((it, i) => (
            <div key={i} className="bg-[#0f0f0f] p-6 rounded shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <Image src={it.src} alt="" width={80} height={80} />
              </div>
              <h4 className="font-semibold text-center">{it.title}</h4>
              <p className="text-sm text-gray-400 mt-2 text-center">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
