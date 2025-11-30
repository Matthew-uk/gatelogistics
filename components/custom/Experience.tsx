import Image from 'next/image';
import {
  Clock,
  Earth,
  Gem,
  HeartPulse,
  Lightbulb,
  LucideIcon,
} from 'lucide-react';

type MiniCardProps = {
  icon: LucideIcon | string;
  text: string;
};

export const MiniCard = ({ icon: Icon, text }: MiniCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-primary p-4 rounded-full">
        {typeof Icon === 'string' ? (
          <span>{Icon}</span> // For emoji or text icons
        ) : (
          <Icon className="text-white" size={60} />
        )}
      </div>
      <span className="uppercase w-2/3 text-center font-poppins text-gray-500">
        {text}
      </span>
    </div>
  );
};

export default function Experience() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-14 flex md:flex-row flex-col items-center gap-10">
        <div className="w-full md:w-1/2">
          <img src="/truck-face.jpg" alt="truck" />
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-4xl text-center md:text-start md:text-5xl font-medium font-montserrat">
            16+ Years Experience
          </h3>
          <div className="mt-6 grid gap-4">
            <div className="bg-white p-4 rounded shadow-sm border flex gap-4 items-center">
              <div>
                <Image
                  className="bg-primary p-4 rounded-sm"
                  src={'/white-truck.png'}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <h2 className="text-xl font-montserrat font-medium">
                  Modern Shipping
                </h2>
                <p className="font-normal text-sm text-gray-500">
                  Oil tankers, gas carriers, container ships, RoRo ships, and
                  more were developed to build global routes.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border flex gap-4 items-center">
              <div>
                <Image
                  className="bg-primary p-4 rounded-sm"
                  src={'/white-lock.png'}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <h2 className="text-xl font-montserrat font-medium">
                  Safety & Security
                </h2>
                <p className="font-normal text-sm text-gray-500">
                  Maritime security is a general term for the protection of
                  vessels both internally and externally.
                </p>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border flex gap-4 items-center">
              <div>
                <Image
                  className="bg-primary p-4 rounded-sm"
                  src={'/white-guarantee.png'}
                  alt=""
                  width={120}
                  height={120}
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <h2 className="text-xl font-montserrat font-medium">
                  Best Logistic Service
                </h2>
                <p className="font-normal text-sm text-gray-500">
                  Our services include clearing services, freight forwarding,
                  door-to-door delivery, air freight services, and sea cargo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center max-w-6xl mx-auto mb-8">
        <p className="text-center text-gray-600 px-4 md:px-0">
          24 Top Global Xpress is an innovative and economical freight
          transportation service and logistics company in established in over 30
          countries. As we move up in the service industry, our mission remains
          the same, that is to consistently deliver value to our clients.
        </p>
        <div className="lg:flex grid grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          <MiniCard icon={Earth} text="BORDERLESS LOGISTICS" />
          <MiniCard icon={Clock} text="FASTER DELIVERIES" />
          <MiniCard icon={Gem} text="SKILLED LOGISTICS SERVICESS" />
          <MiniCard icon={Lightbulb} text="SMART SOLUTIONS" />
          <MiniCard icon={HeartPulse} text="Driven By Success" />
        </div>
      </div>
    </>
  );
}
