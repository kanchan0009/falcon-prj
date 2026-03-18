"use client";

import Link from "next/link";

/* ================= NAV ITEMS ================= */
const navItems = ["Services", "Portfolio", "Careers", "Contact", "About"];

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-[#0B1F3A] flex items-center gap-1"
        >
          <span className="text-[#F97316]">●</span> FALCON
        </Link>

        {/* NAV */}
        <div className="flex gap-8">
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
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA BUTTON */}
        <button className="bg-[#F97316] text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition">
          Get Started
        </button>

      </div>
    </nav>
  );
}