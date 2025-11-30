import Image from 'next/image';

const Partners = () => {
  return (
    <div className="flex mt-8 bg-black items-center min-w-full">
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto py-8 gap-3 md:gap-6">
        <div className="flex items-center justify-center border border-gray-700 p-2">
          <Image
            src={'/company-1.png'}
            width={170}
            height={170}
            alt="Transport&Logistics"
          />
        </div>
        <div className="flex items-center justify-center border border-gray-700 p-2">
          <Image
            src={'/company-2.png'}
            width={140}
            height={140}
            alt="PressFactory"
          />
        </div>

        <div className="flex items-center justify-center border border-gray-700 p-2">
          <Image
            src={'/company-3.png'}
            width={140}
            height={140}
            alt="Valtor Stein Construction"
          />
        </div>

        <div className="flex items-center justify-center border border-gray-700 p-2">
          <Image
            src={'/company-4.png'}
            width={100}
            height={100}
            alt="GO CARGO"
          />
        </div>

        <div className="flex items-center justify-center border border-gray-700 p-2">
          <Image
            src={'/company-5.png'}
            width={140}
            height={140}
            alt="EVOLUTION TECHNOLOGIES"
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
