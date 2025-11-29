const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="bg-white card-plate p-10 flex flex-col md:flex-row gap-12 md:items-center">
        <div className="flex-1 w-full md:w-7/12 font-montserrat">
          <h3 className="text-2xl font-medium">Who We Are</h3>
          <h3 className="text-3xl py-4">
            24 Top Global Xpress is a worldwide global delivery logistics
            company.
          </h3>
          <p className="mt-4 text-gray-600 text-sm">
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
          <img src="/forklift.jpg" alt="forklift" height={800} />
        </div>
      </div>
    </div>
  );
};

export default About;
