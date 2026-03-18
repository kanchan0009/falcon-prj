// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleScroll = () => {
      if (progressRef.current) {
        const scrollPercent =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        progressRef.current.style.width = `${scrollPercent}%`;
      }

      // Parallax effect for hero photos
      const hr = document.querySelector(".hero-right") as HTMLElement;
      if (hr) {
        hr.style.transform = `translateY(${window.scrollY * 0.06}px)`;
      }
    };

    // Intersection Observer for scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    // Count up animation for stats
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".s-num").forEach((n: Element) => {
              const numEl = n as HTMLElement;
              const val = parseInt(numEl.dataset.val || "0");
              const sfx = numEl.dataset.sfx || "";
              let i = 0;
              const dur = 1600;
              const step = dur / 60;
              const timer = setInterval(() => {
                i += val / 60;
                if (i >= val) {
                  numEl.textContent = val + sfx;
                  clearInterval(timer);
                } else {
                  numEl.textContent = Math.floor(i) + sfx;
                }
              }, step);
            });
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    document
      .querySelectorAll(".stats-g")
      .forEach((el) => countObserver.observe(el));

    // Magnetic buttons
    document.querySelectorAll(".magnetic-btn, .n-sign").forEach((btn) => {
      const button = btn as HTMLElement;
      button.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const r = button.getBoundingClientRect();
        const x = (mouseEvent.clientX - r.left - r.width / 2) * 0.14;
        const y = (mouseEvent.clientY - r.top - r.height / 2) * 0.14;
        button.style.transform = `translate(${x}px, ${y}px)`;
      });
      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });
    });

    // Tilt effect
    document.querySelectorAll(".tilt-card").forEach((card) => {
      const cardEl = card as HTMLElement;
      cardEl.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const r = cardEl.getBoundingClientRect();
        const x = (mouseEvent.clientX - r.left) / r.width - 0.5;
        const y = (mouseEvent.clientY - r.top) / r.height - 0.5;
        cardEl.style.transform = `translateY(-5px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        cardEl.style.transition = "transform 0.08s linear";
      });
      cardEl.addEventListener("mouseleave", () => {
        cardEl.style.transform = "";
        cardEl.style.transition =
          "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
      });
    });

    // Cursor hover effects
    const handleCursorEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "16px";
        cursorRef.current.style.height = "16px";
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.width = "48px";
        cursorRingRef.current.style.height = "48px";
      }
    };

    const handleCursorLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "10px";
        cursorRef.current.style.height = "10px";
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.width = "34px";
        cursorRingRef.current.style.height = "34px";
      }
    };

    document
      .querySelectorAll("a, button, .feat, .test, .fc3, .rc, .ob-col")
      .forEach((el) => {
        el.addEventListener("mouseenter", handleCursorEnter);
        el.addEventListener("mouseleave", handleCursorLeave);
      });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      countObserver.disconnect();
    };
  }, [mousePos, ringPos]);

  return (
    <>
      <style jsx global>{`
        :root {
          --amber: #f59e0b;
          --amber-d: #d97706;
          --amber-l: #fef3c7;
          --amber-xl: #fffbeb;
          --navy: #0f2056;
          --navy-d: #070f2b;
          --navy-m: #1a3580;
          --navy-l: #eef1fa;
          --white: #ffffff;
          --g50: #f9fafb;
          --g100: #f3f4f6;
          --g200: #e5e7eb;
          --g300: #d1d5db;
          --g400: #9ca3af;
          --g500: #6b7280;
          --g700: #374151;
          --text: #111827;
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "DM Sans", sans-serif;
          color: var(--text);
          overflow-x: hidden;
        }

        .font-syne {
          font-family: "Syne", sans-serif;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.85s var(--ease),
            transform 0.85s var(--ease);
        }

        .reveal.vis {
          opacity: 1;
          transform: translateY(0);
        }

        .d1 {
          transition-delay: 0.08s;
        }
        .d2 {
          transition-delay: 0.18s;
        }
        .d3 {
          transition-delay: 0.3s;
        }
        .d4 {
          transition-delay: 0.42s;
        }

        @keyframes slideD {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.7);
            opacity: 0.5;
          }
        }

        @keyframes floatY {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-9px);
          }
        }

        @keyframes fadeR {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scanBar {
          0% {
            top: 10%;
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            top: 90%;
            opacity: 0;
          }
        }

        @keyframes barW {
          from {
            width: 0;
          }
          to {
            width: 82%;
          }
        }

        @keyframes nodePls {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.5;
            box-shadow: none;
          }
          50% {
            transform: scale(1.6);
            opacity: 1;
            box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
          }
        }

        @keyframes spin {
          from {
            transform: translateY(-50%) rotate(0deg);
          }
          to {
            transform: translateY(-50%) rotate(360deg);
          }
        }

        @keyframes spinLinear {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        ::-webkit-scrollbar {
          width: 3px;
        }
        ::-webkit-scrollbar-track {
          background: var(--g100);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--amber);
          border-radius: 2px;
        }

        .animate-slideD {
          animation: slideD 0.5s var(--ease) both;
        }
        .animate-slideD-delay {
          animation: slideD 0.6s 0.05s var(--ease) both;
        }
        .animate-dotPulse {
          animation: dotPulse 2s infinite;
        }
        .animate-floatY {
          animation: floatY 4s ease-in-out infinite alternate;
        }
        .animate-floatY-delay {
          animation: floatY 5s 1s ease-in-out infinite alternate;
        }
        .animate-fadeR {
          animation: fadeR 0.9s 0.3s var(--ease) forwards;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-scanBar {
          animation: scanBar 2.5s ease-in-out infinite;
        }
        .animate-scanBar-delay {
          animation: scanBar 2.5s ease-in-out infinite;
          animation-delay: 0.9s;
        }
        .animate-scanBar-delay-2 {
          animation: scanBar 2.5s ease-in-out infinite;
          animation-delay: 1.8s;
        }
        .animate-barW {
          animation: barW 2s 1.2s var(--ease) both;
        }
        .animate-nodePls {
          animation: nodePls 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 14s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin 9s linear infinite reverse;
        }
        .animate-spin-linear {
          animation: spinLinear 4s linear infinite;
        }

        .hero-right {
          opacity: 0;
          animation: fadeR 0.9s 0.3s var(--ease) forwards;
        }
        .h-eyebrow {
          opacity: 0;
          animation: fadeUp 0.6s 0.25s var(--ease) forwards;
        }
        .h-title {
          opacity: 0;
          animation: fadeUp 0.7s 0.35s var(--ease) forwards;
        }
        .h-sub {
          opacity: 0;
          animation: fadeUp 0.7s 0.45s var(--ease) forwards;
        }
        .h-btns {
          opacity: 0;
          animation: fadeUp 0.7s 0.55s var(--ease) forwards;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .magnetic-btn {
          transition: all 0.3s var(--spring);
        }

        .magnetic-btn:hover {
          background: var(--amber-d);
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.4);
        }

        .btn-outline {
          background: transparent;
          border: 1.5px solid var(--amber);
          color: var(--navy);
        }

        .btn-outline:hover {
          background: var(--amber-l);
          border-color: var(--amber-d);
        }

        .tilt-card {
          transition: transform 0.6s var(--ease);
        }

        .l-track:hover {
          animation-play-state: paused;
        }

        .feat:hover::before {
          opacity: 1;
        }

        .feat:hover {
          background: var(--amber-xl);
        }

        .feat:hover .f-num {
          background: var(--amber);
          color: var(--navy-d);
        }

        .test:hover {
          transform: translateY(-5px);
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 14px 40px rgba(245, 158, 11, 0.1);
        }

        .plog:hover {
          background: var(--navy-l);
          color: var(--navy);
          border-color: rgba(15, 32, 86, 0.2);
        }

        .ft-si:hover {
          border-color: var(--amber);
          color: var(--amber);
        }

        .fc a:hover {
          color: var(--white);
        }

        .ft-blinks a:hover {
          color: rgba(255, 255, 255, 0.55);
        }

        .n-links a::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--amber);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s var(--ease);
        }

        .n-links a:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      {/* Hero Section */}
      <section className="grid grid-cols-2 min-h-[calc(100vh-100px)] items-center px-[60px] py-16 gap-12 bg-gradient-to-br from-white 55% to-[#eef1fa] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute -right-[120px] -top-[120px] w-[560px] h-[560px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.07), transparent 70%)",
          }}
        />

        <div className="relative z-[2]">
          <div className="h-eyebrow inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0f2056] tracking-[0.08em] uppercase mb-[18px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-dotPulse" />
            Identity Intelligence Platform
          </div>
          <h1 className="font-syne font-extrabold text-[clamp(38px,4.2vw,58px)] leading-[1.08] tracking-[-2px] text-[#0f2056] mb-[18px] h-title">
            Complete
            <br />
            customer
            <br />
            intelligence
          </h1>
          <p className="h-sub text-[15px] leading-[1.75] text-[#6b7280] max-w-[400px] mb-8">
            Identity intelligence for fast and rewarding customer experiences,
            every time, without compromise.
          </p>
          <div className="h-btns flex gap-3">
            <a
              href="#"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#070f2b] font-sans font-bold text-[13px] py-2 px-5 rounded-lg border-none no-underline"
            >
              Get started{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-[3px]">
                →
              </span>
            </a>
            <a
              href="#"
              className="magnetic-btn btn-outline inline-flex items-center gap-1.5 font-sans font-bold text-[13px] py-2 px-5 rounded-lg no-underline"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-right relative z-[2]">
          <div className="grid grid-cols-[1.1fr_1fr] grid-rows-[auto_auto] gap-3 h-[460px]">
            <div className="row-span-2 rounded-[18px] overflow-hidden relative bg-gradient-to-br from-[#c5ceef] to-[#9daee0]">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
                }}
              ></div>
              <div className="absolute bottom-4 left-3.5 bg-[rgba(255,255,255,0.95)] rounded-[10px] p-2.5 px-3.5 shadow-[0_6px_24px_rgba(0,0,0,0.12)] flex items-center gap-2.5 animate-floatY backdrop-blur-[6px]">
                <div className="w-[26px] h-[26px] rounded-full bg-[#f59e0b] flex items-center justify-center text-xs text-[#070f2b] font-extrabold flex-shrink-0">
                  ✓
                </div>
                <div>
                  <strong className="block text-xs font-bold text-[#0f2056]">
                    Identity Verified
                  </strong>
                  <span className="text-[10px] text-[#6b7280]">
                    Verified in 1.2 seconds
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-[18px] overflow-hidden relative bg-gradient-to-br from-[#e8d2be] to-[#d4b49a]">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
                }}
              ></div>
              <div className="absolute bottom-3 right-2.5 bg-[rgba(255,255,255,0.92)] rounded-[7px] py-1.5 px-2.5 text-[11px] font-bold text-[#0f2056] shadow-[0_3px_12px_rgba(0,0,0,0.1)] animate-floatY-delay">
                Natasha B. ✓
              </div>
            </div>
            <div className="rounded-[18px] overflow-hidden relative bg-gradient-to-br from-[#bcd4c8] to-[#96bdb0]">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Strip */}
      <div className="py-6 border-y border-[#e5e7eb] overflow-hidden relative">
        <div className="absolute top-0 bottom-0 left-0 w-[100px] z-[2] bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-[100px] z-[2] bg-gradient-to-l from-white to-transparent" />
        <div className="flex gap-[52px] items-center w-max animate-marquee l-track">
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-[52px] items-center">
              {[
                "Website Design",
                "Digital Marketing",
                "SEO",
                "Graphics Design",
                "Mobile App Development",
                "Software Development",
                "AI",
                "Logo Design",
                "Web Design",
              ].map((logo) => (
                <div
                  key={`${setIndex}-${logo}`}
                  className="flex items-center gap-[60px]"
                >
                  <span className="font-syne font-bold text-xs text-[#d1d5db] tracking-[0.1em] uppercase whitespace-nowrap transition-colors duration-300 hover:text-[#0f2056] cursor-none">
                    {logo}
                  </span>
                  <span className="text-[#e5e7eb] text-lg">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-[70px] px-[60px] bg-white">
        <div className="grid grid-cols-3 border border-[#e5e7eb] rounded-2xl overflow-hidden">
          {[
            {
              num: "01",
              title: "Verify identity",
              desc: "Confirm your customers are who they say they are, with document verification and biometric checks in seconds.",
            },
            {
              num: "02",
              title: "Assess risk",
              desc: "Understand risk in real-time using our global risk engine, drawing on data from across the world to inform decisions.",
            },
            {
              num: "03",
              title: "Protect against fraud",
              desc: "Identify and stop fraud attempts before they succeed, with synthetic identity detection and device intelligence signals.",
            },
          ].map((feat, i) => (
            <div
              key={feat.num}
              className={`feat reveal d${i + 1} p-9 pb-8 border-r border-[#e5e7eb] last:border-r-0 transition-[background,transform] duration-[350ms] relative overflow-hidden  hover:bg-[#fffbeb]`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#fef3c7] to-transparent opacity-0 transition-opacity duration-[350ms] pointer-events-none" />
              <div className="f-num w-[30px] h-[30px] rounded-lg bg-[#eef1fa] flex items-center justify-center text-[11px] font-bold text-[#0f2056] mb-4 transition-[background,color] duration-[350ms]">
                {feat.num}
              </div>
              <h3 className="font-syne font-bold text-base text-[#0f2056] mb-2.5">
                {feat.title}
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6b7280] mb-3.5">
                {feat.desc}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2056] no-underline transition-colors duration-[250ms] hover:text-[#f59e0b]"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Connect Section */}
      <section className="grid grid-cols-2 gap-20 items-center py-[70px] px-[60px] bg-[#eef1fa]">
        <div className="reveal">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.07em] uppercase mb-3.5 bg-[#eef1fa] border border-[rgba(15,32,86,0.15)] text-[#0f2056]">
            GBG Connect
          </div>
          <h2 className="font-syne font-extrabold text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-1.5px] text-[#0f2056] mb-3.5">
            Connect with every genuine customer
          </h2>
          <p className="text-sm leading-[1.75] text-[#6b7280] max-w-[480px]">
            Falcon enables you to offer fast and personalised journeys while
            blocking fraudsters at every touchpoint.
          </p>
          <a
            href="#"
            className="magnetic-btn inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#070f2b] font-sans font-bold text-[13px] py-2 px-5 rounded-lg border-none no-underline mt-6"
          >
            Find out more <span>→</span>
          </a>
        </div>
        <div className="reveal d2">
          <div className="tilt-card bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,32,86,0.1)] animate-floatY">
            <div className="bg-[#0f2056] py-3 px-[18px] flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <div className="flex-1 text-center text-[11px] text-[rgba(255,255,255,0.4)] font-medium">
                Identity Checks
              </div>
              <div className="flex items-center gap-1 text-[10px] text-[rgba(255,255,255,0.4)]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#28c840] animate-dotPulse" />
                Live
              </div>
            </div>
            <div className="p-[18px]">
              {[
                {
                  av: "JD",
                  bg: "#0f2056",
                  name: "James Dawson",
                  sub: "UK · Passport · 0.9s",
                  badge: "Passed",
                  badgeClass:
                    "bg-[rgba(34,197,94,0.1)] text-[#16a34a] border-[rgba(34,197,94,0.25)]",
                },
                {
                  av: "AS",
                  bg: "#d97706",
                  name: "Amara Singh",
                  sub: "IN · Aadhaar · 1.1s",
                  badge: "Passed",
                  badgeClass:
                    "bg-[rgba(34,197,94,0.1)] text-[#16a34a] border-[rgba(34,197,94,0.25)]",
                },
                {
                  av: "??",
                  bg: "#9ca3af",
                  name: "Unknown User",
                  sub: "VPN detected · Spoofed",
                  badge: "Blocked",
                  badgeClass:
                    "bg-[rgba(239,68,68,0.1)] text-[#dc2626] border-[rgba(239,68,68,0.25)]",
                },
                {
                  av: "MC",
                  bg: "#1a3580",
                  name: "Maria Chen",
                  sub: "SG · NRIC · 1.4s",
                  badge: "Review",
                  badgeClass:
                    "bg-[rgba(245,158,11,0.15)] text-[#d97706] border-[rgba(245,158,11,0.3)]",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 py-2.5 border-b border-[#f3f4f6] last:border-b-0"
                >
                  <div
                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[11px] font-bold font-syne text-white flex-shrink-0"
                    style={{ background: row.bg }}
                  >
                    {row.av}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#0f2056]">
                      {row.name}
                    </div>
                    <div className="text-[10px] text-[#9ca3af]">{row.sub}</div>
                  </div>
                  <div
                    className={`text-[9px] font-bold py-0.5 px-2 rounded-full uppercase tracking-[0.04em] flex-shrink-0 border ${row.badgeClass}`}
                  >
                    {row.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section className="py-[70px] px-[60px] bg-white">
        <div className="reveal mb-[52px]">
          <h2 className="font-syne font-extrabold text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-1.5px] text-[#0f2056]">
            Verify genuine customers,
            <br />
            securing every step of the journey
          </h2>
          <a
            href="#"
            className="magnetic-btn inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#070f2b] font-sans font-bold text-[13px] py-2 px-5 rounded-lg border-none no-underline mt-5"
          >
            Start now <span>→</span>
          </a>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {[
            {
              title: "Data verification",
              desc: "Instantly verify customer-supplied data against authoritative global sources for fast, accurate onboarding decisions.",

              bg: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80') ",
            },
            {
              title: "Data verification",
              desc: "Instantly verify customer-supplied data against authoritative global sources for fast, accurate onboarding decisions.",

              bg: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80') ",
            },

            {
              title: "Data verification",
              desc: "Instantly verify customer-supplied data against authoritative global sources for fast, accurate onboarding decisions.",

              bg: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80') ",
            },
          ].map((col, i) => (
            <div key={i} className={`ob-col reveal d${i + 1}`}>
              <div
                className="rounded-[14px] overflow-hidden aspect-[3/2.2] relative mb-5.5"
                style={{ background: col.bg }}
              ></div>
              <h3 className="font-syne font-bold text-[15px] text-[#0f2056] mb-2">
                {col.title}
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#6b7280] mb-2.5">
                {col.desc}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2056] no-underline transition-colors duration-[250ms] hover:text-[#f59e0b]"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>
      {/* Fraud Section */}
      <section className="py-[100px] px-[100px] bg-[#f9fafb]">
        <div className="grid grid-cols-2 gap-[400px] items-center">
          <div className="reveal">
            <h2 className="font-syne font-extrabold text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-1.5px] text-[#0f2056] mb-3.5">
              Web Designer
            </h2>
            <p className="text-sm leading-[1.75] text-[#6b7280] max-w-[480px]">
              Block synthetic identities, account takeovers and first-party
              fraud before they cost your business a single penny.
            </p>
            <a
              href="#"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#070f2b] font-sans font-bold text-[13px] py-2 px-5 rounded-lg border-none no-underline mt-5.5"
            >
              Learn more <span>→</span>
            </a>
            <div className="grid grid-cols-3 gap-5 mt-9">
              {[
                {
                  title: "Cross industry network",
                  desc: "Share and receive fraud signals across our global consortium in real time.",
                },
                {
                  title: "Synthetic identities",
                  desc: "Detect AI-generated and fabricated identity attempts at the point of onboarding.",
                },
                {
                  title: "Investigate identities",
                  desc: "Deep-dive into any identity using our powerful investigation and link analysis suite.",
                },
              ].map((item) => (
                <div key={item.title} className="fc3">
                  <h3 className="font-syne font-bold text-[13px] text-[#0f2056] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-[1.7] text-[#6b7280] mb-2">
                    {item.desc}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2056] no-underline transition-colors duration-[250ms] hover:text-[#f59e0b]"
                  >
                    Learn more →
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d2 relative">
            <div className=" w-[200px] sm:w-[250px] md:w-[400px] rounded-[18px] overflow-hidden aspect-[0.85] relative bg-gradient-to-br from-[#c8b8d5] to-[#a898b8]">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
                }}
              ></div>

              <div
                className="absolute bg-white border border-[#e5e7eb] rounded-lg py-2 px-3 shadow-[0_6px_20px_rgba(0,0,0,0.1)] text-[11px] animate-floatY"
                style={{ top: "18%", left: "-12px" }}
              >
                <div className="font-bold text-[#0f2056] text-[11px] mb-0.5">
                  UI/UX design
                </div>
                <div className="text-[#6b7280] text-[10px]">
                  Device mismatch detected
                </div>
              </div>
              <div
                className="absolute bg-white border border-[#e5e7eb] rounded-lg py-2 px-3 shadow-[0_6px_20px_rgba(0,0,0,0.1)] text-[11px] animate-floatY"
                style={{ bottom: "22%", right: "-12px", animationDelay: "1s" }}
              >
                <div className="font-bold text-[#0f2056] text-[11px] mb-0.5">
                  ✓ Accuracy
                </div>
                <div className="text-[#6b7280] text-[10px]">
                  Cross-referenced 4.6B IDs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk/Compliance Section */}
      <section className="py-[100px] px-[100px] bg-white">
        <div className="grid grid-cols-2 gap-[400px] items-center">
          <div className="reveal relative pr-5">
            <div className=" w-[200px] sm:w-[250px] md:w-[400px] rounded-[18px] overflow-hidden aspect-[0.85] relative">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
                }}
              ></div>
              <div
                className="tilt-card absolute -bottom-6 -right-4 bg-white border border-[#e5e7eb] rounded-xl p-3.5 px-[18px] shadow-[0_12px_36px_rgba(0,0,0,0.1)] min-w-[190px] animate-floatY"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="font-syne font-bold text-[13px] text-[#0f2056] mb-0.5">
                  Elena Cooper
                </div>
                <div className="text-[10px] text-[#6b7280] mb-2.5">
                  Customer since 2021 · Low risk
                </div>
                
                
              </div>
            </div>
          </div>
          <div className="reveal d2">
            
            <h2 className="font-syne font-extrabold text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-1.5px] text-[#0f2056] mb-3.5">
              Mobile App
            </h2>
            <p className="text-sm leading-[1.75] text-[#6b7280] max-w-[480px]">
              Make confident decisions with comprehensive KYC, KYB, and risk
              intelligence in one integrated platform.
            </p>
            <a
              href="#"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#070f2b] font-sans font-bold text-[13px] py-2 px-5 rounded-lg border-none no-underline mt-5.5"
            >
              Learn more <span>→</span>
            </a>
            <div className="grid grid-cols-3 gap-6 mt-9">
              {[
                {
                  title: "Know your customer",
                  desc: "Run deep KYC checks combining database lookups, document and biometric checks for full confidence.",
                },
                {
                  title: "Know your business",
                  desc: "Verify businesses and directors in real-time using authoritative company registry data globally.",
                },
                {
                  title: "Risk intelligence",
                  desc: "Use global watchlists, PEP screening and adverse media monitoring to stay ahead of risk.",
                },
              ].map((item) => (
                <div key={item.title} className="rc">
                  <h3 className="font-syne font-bold text-[13px] text-[#0f2056] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-[1.7] text-[#6b7280] mb-2">
                    {item.desc}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2056] no-underline transition-colors duration-[250ms] hover:text-[#f59e0b]"
                  >
                    Learn more →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fraud Section */}
      <section className="py-[100px] px-[100px] bg-[#f9fafb]">
        <div className="grid grid-cols-2 gap-[400px] items-center">
          <div className="reveal">
            <h2 className="font-syne font-extrabold text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-1.5px] text-[#0f2056] mb-3.5">
              Web Designer
            </h2>
            <p className="text-sm leading-[1.75] text-[#6b7280] max-w-[480px]">
              Block synthetic identities, account takeovers and first-party
              fraud before they cost your business a single penny.
            </p>
            <a
              href="#"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#070f2b] font-sans font-bold text-[13px] py-2 px-5 rounded-lg border-none no-underline mt-5.5"
            >
              Learn more <span>→</span>
            </a>
            <div className="grid grid-cols-3 gap-5 mt-9">
              {[
                {
                  title: "Cross industry network",
                  desc: "Share and receive fraud signals across our global consortium in real time.",
                },
                {
                  title: "Synthetic identities",
                  desc: "Detect AI-generated and fabricated identity attempts at the point of onboarding.",
                },
                {
                  title: "Investigate identities",
                  desc: "Deep-dive into any identity using our powerful investigation and link analysis suite.",
                },
              ].map((item) => (
                <div key={item.title} className="fc3">
                  <h3 className="font-syne font-bold text-[13px] text-[#0f2056] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-[1.7] text-[#6b7280] mb-2">
                    {item.desc}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f2056] no-underline transition-colors duration-[250ms] hover:text-[#f59e0b]"
                  >
                    Learn more →
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d2 relative">
            <div className=" w-[400px] sm:w-[250px] md:w-[400px] rounded-[18px] overflow-hidden aspect-[0.85] relative bg-gradient-to-br from-[#c8b8d5] to-[#a898b8]">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
                }}
              ></div>

              <div
                className="absolute bg-white border border-[#e5e7eb] rounded-lg py-2 px-3 shadow-[0_6px_20px_rgba(0,0,0,0.1)] text-[11px] animate-floatY"
                style={{ top: "18%", left: "-12px" }}
              >
                <div className="font-bold text-[#0f2056] text-[11px] mb-0.5">
                  UI/UX design
                </div>
                <div className="text-[#6b7280] text-[10px]">
                  Device mismatch detected
                </div>
              </div>
              <div
                className="absolute bg-white border border-[#e5e7eb] rounded-lg py-2 px-3 shadow-[0_6px_20px_rgba(0,0,0,0.1)] text-[11px] animate-floatY"
                style={{ bottom: "22%", right: "-12px", animationDelay: "1s" }}
              >
                <div className="font-bold text-[#0f2056] text-[11px] mb-0.5">
                  ✓ Accuracy
                </div>
                <div className="text-[#6b7280] text-[10px]">
                  Cross-referenced 4.6B IDs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-[70px] px-[60px] bg-gradient-to-br from-[#070f2b] 0% via-[#0f2056] 60% to-[#1a3580] grid grid-cols-2 gap-20 items-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="cov-left reveal relative z-[2]">
          <h2 className="font-syne font-extrabold text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-1.5px] text-white mb-3.5">
            Make the right customer decisions and combat onboarding fraud around
            the world
          </h2>
          <p className="text-sm leading-[1.75] text-[rgba(255,255,255,0.6)] max-w-[480px]">
            Our data network spans  countries, giving you the coverage to
            verify identities with confidence.
          </p>
          <div className="stats-g grid grid-cols-2 gap-7 mt-10">
            {[
              
              { val: "4", sfx: ".6B+", label: "people are involved" },
              { val: "30", sfx: "+", label: "team members" },
              { val: "60", sfx: "+", label: "Projects" },
            ].map((stat) => (
              <div key={stat.label} className="stat-b">
                <span
                  className="s-num font-syne font-extrabold text-[clamp(28px,3vw,44px)] tracking-[-2px] text-white block mb-0.5"
                  data-val={stat.val}
                  data-sfx={stat.sfx}
                >
                  {stat.val}
                  {stat.sfx}
                </span>
                <span className="text-xs text-[rgba(255,255,255,0.5)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="cov-right reveal d2 relative z-[2] flex items-center justify-center aspect-square">
          <div className="absolute rounded-full border border-[rgba(245,158,11,0.15)] w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-[rgba(245,158,11,0.15)] w-[220px] h-[220px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute rounded-full border border-[rgba(245,158,11,0.15)] w-[140px] h-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#f59e0b] animate-nodePls"
            style={{ top: "18%", left: "52%" }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#f59e0b] animate-nodePls"
            style={{ top: "34%", left: "24%", animationDelay: "0.5s" }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#f59e0b] animate-nodePls"
            style={{ top: "62%", left: "72%", animationDelay: "1s" }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#f59e0b] animate-nodePls"
            style={{ top: "76%", left: "38%", animationDelay: "1.5s" }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#f59e0b] animate-nodePls"
            style={{ top: "48%", left: "82%", animationDelay: "0.8s" }}
          />
          <div
            className="absolute w-2 h-2 rounded-full bg-[#f59e0b] animate-nodePls"
            style={{ top: "26%", left: "68%", animationDelay: "0.3s" }}
          />
          <div className="text-center z-[3]">
            <div className="font-syne font-extrabold text-[40px] text-white tracking-[-2px]">
              60+
            </div>
            <div className="text-[11px] text-[rgba(255,255,255,0.45)] mt-1">
              project
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-[70px] px-[60px] bg-white">
        <div className="reveal mb-11">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.07em] uppercase mb-3.5 bg-[#eef1fa] border border-[rgba(15,32,86,0.15)] text-[#0f2056]">
            Trusted by 20,000+ businesses
          </div>
          <h2 className="font-syne font-extrabold text-[clamp(26px,2.8vw,40px)] leading-[1.1] tracking-[-1.5px] text-[#0f2056]">
            20,000+ businesses
            <br />
            partner with us
          </h2>
          <div className="inline-flex items-center gap-1.5 bg-[#fef3c7] border border-[rgba(245,158,11,0.3)] rounded-full py-1 px-3.5 text-[10px] font-bold text-[#d97706] mb-4">
            ★★★★★ &nbsp;For enterprise
          </div>
          <div className="flex gap-2.5 flex-wrap mt-4.5">
            {["NatWest", "Barclays", "HSBC", "Monzo", "Revolut", "Wise"].map(
              (partner) => (
                <div
                  key={partner}
                  className="plog bg-[#f3f4f6] border border-[#e5e7eb] rounded-md py-1.5 px-4 text-[11px] font-bold text-[#6b7280] tracking-[0.06em] font-syne transition-all duration-300 cursor-pointer hover:bg-[#eef1fa] hover:text-[#0f2056] hover:border-[rgba(15,32,86,0.2)]"
                >
                  {partner}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {[
            {
              text: "Partnering with GBG enables us to offer a suite of accurate, multi-layered protection layers against payment fraud. The results have been exceptional from day one.",
              av: "TR",
              avBg: "#0f2056",
              name: "Thomas Reed",
              role: "Head of Fraud Prevention, NatWest",
            },
            {
              text: "When we launched GBG, our identity data intelligence improved our pass rate for genuine customers vastly. Our conversion climbed while fraud dropped near zero.",
              av: "AP",
              avBg: "#d97706",
              name: "Amir Patel",
              role: "Chief Technology Officer, Revolut",
            },
          ].map((test, i) => (
            <div
              key={i}
              className={`test reveal d${i + 1} bg-white border border-[#e5e7eb] rounded-[14px] p-7 px-[30px] transition-all duration-[400ms]  relative overflow-hidden hover:-translate-y-1 hover:border-[rgba(245,158,11,0.3)] hover:shadow-[0_14px_40px_rgba(245,158,11,0.1)]`}
            >
              <span className="absolute -top-1.5 right-[18px] font-syne text-[90px] font-extrabold text-[#fef3c7] leading-none pointer-events-none">
                "
              </span>
              <p className="text-[13px] leading-[1.8] text-[#374151] mb-5 relative">
                {test.text}
              </p>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-syne font-bold text-xs text-white flex-shrink-0"
                  style={{ background: test.avBg }}
                >
                  {test.av}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#0f2056]">
                    {test.name}
                  </div>
                  <div className="text-[11px] text-[#6b7280]">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="grid grid-cols-[1fr_auto] gap-10 items-center py-[72px] px-[60px] bg-gradient-to-br from-[#070f2b] to-[#0f2056] relative overflow-hidden">
        <div
          className="absolute right-0 top-0 w-[400px] h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at right, rgba(245,158,11,0.1), transparent 60%)",
          }}
        />
        <div className="absolute right-[200px] top-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-[20px] border-2 border-[rgba(245,158,11,0.18)] animate-spin-slow" />
        <div className="absolute right-[228px] top-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-[10px] border-2 border-[rgba(245,158,11,0.12)] animate-spin-slow-reverse" />

        <div className="reveal relative z-[2]">
          <h2 className="font-syne font-extrabold text-[clamp(26px,3vw,42px)] tracking-[-1.5px] text-white mb-1.5">
            Complete customer
            <br />
            intelligence
          </h2>
          <p className="text-sm text-[rgba(255,255,255,0.55)]">
            Connect safely with every genuine identity.
          </p>
        </div>
        <div className="reveal d2 flex flex-col gap-2.5 flex-shrink-0 relative z-[2]">
          <a
            href="#"
            className="magnetic-btn inline-flex items-center gap-1.5 bg-[#f59e0b] text-[#070f2b] font-sans font-bold text-[13px] py-2 px-5 rounded-lg border-none no-underline"
          >
            Get a demo <span>→</span>
          </a>
          <a
            href="#"
            className="magnetic-btn inline-flex items-center gap-1.5 font-sans font-bold text-[13px] py-2 px-5 rounded-lg no-underline border-[rgba(255,255,255,0.25)] text-[rgba(255,255,255,0.8)] bg-transparent border"
          >
            See pricing
          </a>
        </div>
      </section>
    </>
  );
}
