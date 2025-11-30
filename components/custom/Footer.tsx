import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white font-poppins">
      <div className="max-w-7xl mx-auto px-6 pt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Image src={'/logo-white.png'} alt="Logo" width={200} height={200} />
          <div className="mt-5">
            <p className="text-sm text-gray-400 leading-relaxed">
              24 Top Global Xpress is a Worldwide Global delivering logistics
              company. We have offices in more than 15 countries and an
              international network of partners and agents.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-5 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>Home</Link>
            </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>About Us</Link>
            </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>Contact Us</Link>
            </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Solutions</h3>
          <ul className="space-y-5 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>Air Freight Forwarding</Link>
            </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>Road Freight Forwarding</Link>
            </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>Ocean Freight Forwarding</Link>
            </li>
            <li className="hover:text-white cursor-pointer transition">
              <Link href={'/'}>Warehousing & Storage</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400 hover:text-white transition cursor-pointer">
            support@24topglobalxpress.com
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-3 md:pt-0 pb-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <Image src={'/trustpilot.png'} alt="" width={200} height={200} />
      </div>
      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} 24 Top Global Xpress. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
