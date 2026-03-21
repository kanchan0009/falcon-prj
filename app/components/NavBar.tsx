"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ================= NAV ITEMS ================= */
const navItems = ["Services", "Portfolio", "Careers", "Contact", "About"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/image0.jpeg" // 👈 put your logo inside public folder
            alt="Falcon Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-bold text-[#78772d]">FALCON</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item}
              href={
                item === "About"
                  ? "/about"
                  : item === "Services"
                    ? "/services"
                    : item === "Careers"
                      ? "/careers"
                      : item === "Contact"
                        ? "/contact"
                        : item === "Portfolio"
                          ? "/portfolio"
                          : "/"
              }
              className="text-[#7d7c32] font-medium hover:text-[white] transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA BUTTON (DESKTOP) */}
        <Link
          href="/hired"
          className="hidden md:inline-block bg-[#F97316] text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition no-underline"
        >
          Hire Us
        </Link>

        {/* HAMBURGER BUTTON */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-[2px] bg-[#0B1F3A]"></span>
          <span className="w-6 h-[2px] bg-[#0B1F3A]"></span>
          <span className="w-6 h-[2px] bg-[#0B1F3A]"></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-6 shadow-lg">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href={
                  item === "About"
                    ? "/about"
                    : item === "Services"
                      ? "/services"
                      : item === "Careers"
                        ? "/careers"
                        : item === "Contact"
                          ? "/contact"
                          : item === "Portfolio"
                            ? "/portfolio"
                            : "/"
                }
                className="text-[#0B1F3A] font-medium hover:text-[#F97316] transition"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}

            {/* MOBILE CTA */}
            <Link
              href="/hired"
              className="mt-3 bg-[#F97316] text-white px-5 py-2 rounded-lg font-medium text-center hover:bg-orange-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Hire Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
