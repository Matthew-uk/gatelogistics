'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            width={180}
            height={180}
            alt="24 Top Global Xpress Logo"
            className="object-contain"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a
            className="text-brand-700 hover:text-brand-800 transition"
            href="#"
          >
            Home
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            About
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            Our Solutions
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            FAQ
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            Contact
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            Tracking
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown with animation */}
      <div
        className={`
          md:hidden bg-white border-t border-gray-200
          px-6 overflow-hidden transition-all duration-300
          ${open ? 'max-h-[500px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}
        `}
      >
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <a className="hover:text-brand-700 transition" href="#">
            Home
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            About
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            Our Solutions
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            FAQ
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            Contact
          </a>
          <a className="hover:text-brand-700 transition" href="#">
            Tracking
          </a>
        </nav>
      </div>
    </header>
  );
}
