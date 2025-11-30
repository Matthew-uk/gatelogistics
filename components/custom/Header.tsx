'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [solutionsOpen, setSolutionsOpen] = useState(false); // desktop dropdown
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false); // mobile nested

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  // small delay (ms) to tolerate pointer gaps when moving from button -> panel
  const CLOSE_DELAY = 150;

  // helper: schedule close
  const scheduleClose = (cb: () => void) => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - window.setTimeout returns number in browser
    closeTimeoutRef.current = window.setTimeout(() => {
      cb();
      closeTimeoutRef.current = null;
    }, CLOSE_DELAY);
  };

  // helper: cancel scheduled close
  const cancelScheduledClose = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Click outside to close (immediate)
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      const el = dropdownRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  // Keyboard: Escape closes menus
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSolutionsOpen(false);
        setMobileSolutionsOpen(false);
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // focusin / focusout handlers so keyboard navigation keeps dropdown open while focus is inside
  useEffect(() => {
    const node = dropdownRef.current;
    if (!node) return;

    function onFocusIn() {
      cancelScheduledClose();
      setSolutionsOpen(true);
    }

    function onFocusOut(e: FocusEvent) {
      // if focus moved outside the dropdown, schedule close
      // relatedTarget is where focus moved to
      const related = e.relatedTarget as Node | null;
      if (related && node && node.contains(related)) {
        // focus moved to something inside dropdown -> keep open
        return;
      }
      scheduleClose(() => setSolutionsOpen(false));
    }

    node.addEventListener('focusin', onFocusIn);
    node.addEventListener('focusout', onFocusOut);

    return () => {
      node.removeEventListener('focusin', onFocusIn);
      node.removeEventListener('focusout', onFocusOut);
    };
  }, [dropdownRef.current]);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.png"
              width={180}
              height={180}
              alt="24 Top Global Xpress Logo"
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            className="text-brand-700 hover:text-brand-800 transition"
            href="/"
          >
            Home
          </Link>

          <Link className="hover:text-brand-700 transition" href="/about">
            About
          </Link>

          {/* Our Solutions dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            // when pointer enters the wrapper, cancel any scheduled close and open immediately
            onMouseEnter={() => {
              cancelScheduledClose();
              setSolutionsOpen(true);
            }}
            // when pointer leaves the wrapper, schedule close (short delay)
            onMouseLeave={() => {
              scheduleClose(() => setSolutionsOpen(false));
            }}
          >
            {/* button so it's keyboard accessible */}
            <button
              className="flex items-center gap-2 hover:text-brand-700 transition focus:outline-none"
              aria-haspopup="menu"
              aria-expanded={solutionsOpen}
              onClick={() => {
                // toggle click behavior
                setSolutionsOpen((s) => !s);
                // ensure scheduled close is cancelled when toggling open
                cancelScheduledClose();
              }}
            >
              <span>Our Solutions</span>
              {/* chevron */}
              <svg
                className={`w-3 h-3 transition-transform ${
                  solutionsOpen ? 'rotate-180' : 'rotate-0'
                }`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M5 7L10 12L15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* dropdown panel */}
            <div
              role="menu"
              aria-label="Our Solutions"
              className={`absolute right-0 mt-3 w-56 bg-white rounded-sm border border-gray-100 shadow-lg transition-all transform origin-top-right z-50
                ${
                  solutionsOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
            >
              <ul className="flex flex-col py-2">
                <li role="none">
                  <Link
                    href="/solutions/air-freight"
                    role="menuitem"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary"
                    onClick={() => {
                      // when user clicks a link, we don't force-close before navigation;
                      // let Next.js handle the route change. Still cancel scheduled close.
                      cancelScheduledClose();
                    }}
                  >
                    Air Freight Forwarding
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/solutions/road-freight"
                    role="menuitem"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary"
                    onClick={() => cancelScheduledClose()}
                  >
                    Road Freight Forwarding
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/solutions/ocean-freight"
                    role="menuitem"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary"
                    onClick={() => cancelScheduledClose()}
                  >
                    Ocean Freight Forwarding
                  </Link>
                </li>
                <li role="none">
                  <Link
                    href="/solutions/warehouse"
                    role="menuitem"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-primary"
                    onClick={() => cancelScheduledClose()}
                  >
                    Warehouse And Storage
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link className="hover:text-brand-700 transition" href="/faqs">
            FAQ
          </Link>
          <Link className="hover:text-brand-700 transition" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-brand-700 transition" href="/tracking">
            Tracking
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown with animation */}
      <div
        className={`
          md:hidden bg-white border-t border-gray-200
          px-6 overflow-hidden transition-all duration-300
          ${open ? 'max-h-[800px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}
        `}
      >
        <nav className="flex flex-col gap-4 text-sm font-medium">
          <Link className="hover:text-brand-700 transition" href="/">
            Home
          </Link>
          <Link className="hover:text-brand-700 transition" href="/about">
            About
          </Link>

          {/* Mobile collapsible Our Solutions */}
          <div>
            <button
              onClick={() => setMobileSolutionsOpen((s) => !s)}
              className="w-full flex items-center justify-between gap-2 hover:text-brand-700 transition py-2"
              aria-expanded={mobileSolutionsOpen}
              aria-controls="mobile-solutions-list"
            >
              <span>Our Solutions</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  mobileSolutionsOpen ? 'rotate-180' : 'rotate-0'
                }`}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M5 7L10 12L15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              id="mobile-solutions-list"
              className={`pl-4 overflow-hidden transition-all duration-300 ${
                mobileSolutionsOpen ? 'max-h-48' : 'max-h-0'
              }`}
            >
              <ul className="flex flex-col gap-1 mt-2">
                <li>
                  <Link
                    className="block py-2 text-sm hover:text-brand-700 transition"
                    href="/solutions/air-freight"
                  >
                    Air Freight Forwarding
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 text-sm hover:text-brand-700 transition"
                    href="/solutions/road-freight"
                  >
                    Road Freight Forwarding
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 text-sm hover:text-brand-700 transition"
                    href="/solutions/ocean-freight"
                  >
                    Ocean Freight Forwarding
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 text-sm hover:text-brand-700 transition"
                    href="/solutions/warehouse"
                  >
                    Warehouse And Storage
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link className="hover:text-brand-700 transition" href="/faqs">
            FAQ
          </Link>
          <Link className="hover:text-brand-700 transition" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-brand-700 transition" href="/tracking">
            Tracking
          </Link>
        </nav>
      </div>
    </header>
  );
}
