const MissionVision = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-black text-white my-8">
      <div className="bg-black text-white card-plate p-4 md:p-10 flex flex-col md:flex-row gap-12 md:items-center">
        <div className="flex-1 w-full md:w-7/12 font-montserrat">
          <h3 className="text-xl md:text-2xl md:font-medium font-semibold uppercase tracking-wider text-primary">
            Who We Are
          </h3>
          <h3 className="text-3xl py-4">
            To meet our customers’ demands for a personal & proffessional
            service by offering innovative supply chain solutions.
          </h3>
          <p className="mt-4 text-gray-200 text-sm">
            Our focus is on simplifying complex supply chains, achieving
            efficiency improvements that enable our customers to do their
            business, reducing operating costs, and making significant
            short-term savings for long-term competitiveness. We work to connect
            and simplify our customers supply chains. As the global leader in
            shipping services, the company operates in more than 15 countries
            and employs roughly 10,000 people.
          </p>
        </div>
        <div className="w-full md:w-5/12">
          <img src="/dark-forklift.png" alt="forklift" height={800} />
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
