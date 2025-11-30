import {
  Clock,
  Earth,
  Gem,
  HeartPulse,
  Lightbulb,
  LucideIcon,
} from 'lucide-react';
import { MiniCard } from './Experience';

const ChooseUs = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-6xl mx-auto mb-8 mt-8">
      {/* <div className="absolute inset-0 bg-black/55"></div> */}
      <div className="z-10 inset-y-28 max-w-6xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        <h2
          id="cta-heading"
          className="text-3xl text-black font-semibold font-montserrat leading-tight"
          style={{
            //   fontSize: '56px',
            lineHeight: '1.02',
            letterSpacing: '-0.5px',
          }}
        >
          WHY CHOOSE US
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="w-16 h-[2px] bg-[#f39c12] rounded"></div>
          <div className="w-6 h-[2px] bg-[#f39c12] rounded opacity-60"></div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 px-4 md:px-0 mt-8">
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
  );
};

export default ChooseUs;
