"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center justify-between px-10 py-4 border-b border-cream/10 bg-forest/70 backdrop-blur-md">
        <div className="flex gap-10">
          <Link
            href="/"
            className={`nav-link text-cream/80 hover:text-cream text-base tracking-widest uppercase text-sm ${path === "/" ? "active text-cream" : ""}`}
          >
            Home
          </Link>
        </div>

        <Link href="/" className="text-3xl font-light tracking-[0.25em] text-cream text-shadow-sm">
          KramLill
        </Link>

        <div className="flex gap-10">
          <Link
            href="/about"
            className={`nav-link text-cream/80 hover:text-cream tracking-widest uppercase text-sm ${path === "/about" ? "active text-cream" : ""}`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`nav-link text-cream/80 hover:text-cream tracking-widest uppercase text-sm ${path === "/contact" ? "active text-cream" : ""}`}
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="md:hidden bg-forest/80 backdrop-blur-md border-b border-cream/10">
        <div className="flex items-center justify-between px-5 py-4">
          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="text-cream/80 hover:text-cream transition-colors"
            aria-label="Menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link href="/" className="text-2xl font-light tracking-[0.2em] text-cream">
            KramLill
          </Link>

          {/* Bag icon → contact */}
          <Link href="/contact" className="text-cream/80 hover:text-cream transition-colors" aria-label="Contact">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
        </div>

        {/* Mobile tab row */}
        <div className="flex border-t border-cream/10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex-1 text-center py-2.5 text-xs tracking-widest uppercase transition-colors ${
                path === l.href
                  ? "text-cream border-b-2 border-gold"
                  : "text-cream/60 hover:text-cream"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Dropdown when hamburger open */}
        {open && (
          <div className="border-t border-cream/10 bg-forest/95 py-4 flex flex-col gap-1 px-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-cream/80 hover:text-cream tracking-wider text-lg border-b border-cream/10 last:border-0 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
