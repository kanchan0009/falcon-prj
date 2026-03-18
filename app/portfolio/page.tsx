// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollProgress(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100,
      );
      setNavScrolled(window.scrollY > 60);

      // Hero parallax
      const hr = document.querySelector(".hero-right") as HTMLElement;
      if (hr) hr.style.transform = `translateY(${window.scrollY * 0.07}px)`;

      // Photo parallax
      const altPhotos = document.querySelectorAll(".alt-photo-inner");
      altPhotos.forEach((ph) => {
        const phEl = ph as HTMLElement;
        const rect = phEl.closest(".alt-photo")?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (rect.top / window.innerHeight) * 20;
          phEl.style.transform = `translateY(${offset}px) scale(1)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => io.observe(el));

    // Tilt on cards
    document.querySelectorAll(".article-card").forEach((card) => {
      const cardEl = card as HTMLElement;
      cardEl.addEventListener("mousemove", (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const r = cardEl.getBoundingClientRect();
        const x = (mouseEvent.clientX - r.left) / r.width - 0.5;
        const y = (mouseEvent.clientY - r.top) / r.height - 0.5;
        cardEl.style.transform = `translateY(-8px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
        cardEl.style.transition =
          "transform .08s linear, box-shadow .4s, border-color .4s";
      });
      cardEl.addEventListener("mouseleave", () => {
        cardEl.style.transform = "";
        cardEl.style.transition = "all .5s cubic-bezier(.22,1,.36,1)";
      });
    });

    // Magnetic buttons
    document
      .querySelectorAll(".hero-cta, .learn-btn, .nav-book")
      .forEach((btn) => {
        const btnEl = btn as HTMLElement;
        btnEl.addEventListener("mousemove", (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const r = btnEl.getBoundingClientRect();
          const x = (mouseEvent.clientX - r.left - r.width / 2) * 0.14;
          const y = (mouseEvent.clientY - r.top - r.height / 2) * 0.14;
          btnEl.style.transform = `translate(${x}px, ${y}px)`;
        });
        btnEl.addEventListener("mouseleave", () => {
          btnEl.style.transform = "";
        });
      });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Vancouver Naturopathic Clinic</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

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
          --text: #1a1a2e;
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "DM Sans", sans-serif;
          background: var(--white);
          color: var(--text);
          overflow-x: hidden;
          line-height: 1.6;
        }

        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
        }

        .font-dm {
          font-family: "DM Sans", sans-serif;
        }

        /* Scrollbar */
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

        /* Animations */
        @keyframes navDrop {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes lineGrow {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
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

        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes playPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.5);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(245, 158, 11, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0);
          }
        }

        .animate-navDrop {
          animation: navDrop 0.7s var(--ease) both;
        }

        .animate-lineGrow {
          animation: lineGrow 1.2s 0.5s var(--ease) both;
          transform-origin: top;
        }

        .animate-fadeUp {
          animation: fadeUp 0.6s 0.3s var(--ease) forwards;
        }

        .animate-fadeUp-delay {
          animation: fadeUp 0.8s 0.4s var(--ease) forwards;
        }

        .animate-fadeUp-delay-2 {
          animation: fadeUp 0.8s 0.5s var(--ease) forwards;
        }

        .animate-fadeUp-delay-3 {
          animation: fadeUp 0.8s 0.6s var(--ease) forwards;
        }

        .animate-fadeRight {
          animation: fadeRight 1s 0.2s var(--ease) forwards;
        }

        .animate-playPulse {
          animation: playPulse 2.5s ease-out infinite;
        }

        /* Scroll reveal */
        .reveal,
        .reveal-left,
        .reveal-right {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.9s var(--ease),
            transform 0.9s var(--ease);
        }

        .reveal-left {
          transform: translateX(-40px);
        }

        .reveal-right {
          transform: translateX(40px);
        }

        .reveal.vis,
        .reveal-left.vis,
        .reveal-right.vis {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }

        .d1 {
          transition-delay: 0.1s;
        }
        .d2 {
          transition-delay: 0.2s;
        }
        .d3 {
          transition-delay: 0.32s;
        }
        .d4 {
          transition-delay: 0.44s;
        }
        .d5 {
          transition-delay: 0.56s;
        }

        /* Nav link underline */
        .nav-links a::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1.5px;
          background: var(--amber);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s var(--ease);
        }

        .nav-links a:hover::after {
          transform: scaleX(1);
        }

        /* Hero CTA hover */
        .hero-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--amber);
          transform: translateX(-105%);
          transition: transform 0.4s var(--ease);
        }

        .hero-cta:hover::before {
          transform: translateX(0);
        }

        .hero-cta:hover {
          color: var(--navy-d);
          box-shadow: 0 6px 24px rgba(245, 158, 11, 0.35);
        }

        .hero-cta .arr {
          transition: transform 0.3s var(--spring);
        }

        .hero-cta:hover .arr {
          transform: translateX(4px);
        }

        /* Service circle hover */
        .svc-circle::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--amber);
          transform: scale(0);
          transition: transform 0.4s var(--spring);
        }

        .svc-item:hover .svc-circle::before {
          transform: scale(1);
        }

        .svc-item:hover .svc-circle {
          border-color: var(--amber);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.25);
        }

        .svc-item:hover .svc-circle span {
          transform: scale(1.15);
        }

        .svc-item:hover .svc-label {
          color: var(--navy);
        }

        /* Photo hover effects */
        .photo-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.12),
            transparent
          );
          transition: left 0.7s var(--ease);
          pointer-events: none;
          z-index: 5;
        }

        .alt-photo:hover .photo-shimmer {
          left: 150%;
        }

        .alt-photo:hover .alt-photo-inner {
          transform: scale(1.04);
        }

        .alt-photo:hover .photo-overlay {
          opacity: 0;
        }

        /* Learn button hover */
        .learn-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--amber);
          transform: translateX(-105%);
          transition: transform 0.35s var(--ease);
        }

        .learn-btn:hover::before {
          transform: translateX(0);
        }

        .learn-btn:hover {
          border-color: var(--amber);
          color: var(--navy-d);
        }

        .learn-btn .arr {
          transition: transform 0.3s var(--spring);
        }

        .learn-btn:hover .arr {
          transform: translateX(4px);
        }

        /* Article card hover */
        .article-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(15, 32, 86, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
        }

        .article-card:hover .article-img-bg {
          transform: scale(1.06);
        }

        .article-read:hover {
          color: var(--amber-d);
          gap: 8px;
        }

        /* Footer hover */
        .footer-col a:hover {
          color: var(--white);
        }

        .ft-si:hover {
          border-color: var(--amber);
          color: var(--amber);
        }

        .footer-bottom-links a:hover {
          color: rgba(255, 255, 255, 0.6);
        }
      `}</style>

      {/* Hero Section */}
      <section className="grid grid-cols-2 min-h-100 h-[300px] overflow-hidden">
        {/* Left text */}
        <div className="flex flex-col justify-center py-20 px-[60px] relative bg-white">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[#fffbeb] to-transparent" />
          <div className="absolute left-0 top-1/2 bottom-1/5 w-[3px] bg-gradient-to-b from-transparent via-[#f59e0b] to-transparent animate-lineGrow" />

          <h1 className="font-cormorant font-semibold text-[clamp(36px,4vw,56px)] leading-[1.1] tracking-[-0.5px] text-[#0f2056] mb-5 animate-fadeUp-delay relative z-[1]">
            Creative Stories.
            <br />
            Fearless Impact
            <br />
          </h1>
          <p className="text-sm leading-[1.8] text-[#6b7280] max-w-[380px] mb-3 animate-fadeUp-delay-2 relative z-[1]">
            Your holistic health partner for over 30 years, combining
            traditional naturopathic wisdom with modern evidence-based care.
          </p>
          <a
            href="#"
            className="hero-cta inline-flex items-center gap-2 bg-[#0f2056] text-white font-dm font-semibold text-xs tracking-[0.08em] uppercase py-3.5 px-7 rounded no-underline transition-all duration-[300ms] relative overflow-hidden w-fit animate-fadeUp-delay-3 z-[1] group"
          >
            <span className="relative z-[1]">Hire Us</span>
            <span className="arr relative z-[1]">→</span>
          </a>
        </div>

        {/* Right photo */}
        <div className="hero-right relative overflow-hidden opacity-0 animate-fadeRight">
          <div className="w-full h-full bg-gradient-to-br from-[#c8d4e0] via-[#b0c0d0] to-[#d0c8b8] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8d8c8] via-[#d0c0a8] to-[#c8d8e0]" />
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <div className="py-[52px] px-20 bg-white border-y border-[#e5e7eb]">
        <div className="grid grid-cols-5 gap-6 text-center">
          {[
            { label: "Branding" },
            { label: "Website" },
            { label: "Social Media" },
            { label: "Marketing" },
            { label: "Mobile App" },
          ].map((svc, i) => (
            <div
              key={i}
              className={`flex flex-col items-center gap-3 transition-transform duration-[400ms] cursor-default hover:-translate-y-1.5 reveal d${i + 1}`}
            >
              <div className="svc-circle w-[72px] h-[72px] rounded-full bg-[#eef1fa] border-2 border-[#e5e7eb] flex items-center justify-center text-[26px] transition-all duration-[400ms] relative overflow-hidden"></div>
              <div className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#6b7280] max-w-[90px] leading-[1.4] transition-colors duration-300">
                {svc.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 1: Healing Vancouver - Photo LEFT | Text RIGHT */}
      <section className="grid grid-cols-2 min-h-[480px] overflow-hidden">
        <div className="alt-photo relative overflow-hidden bg-[#f3f4f6] reveal-left">
          <div
            className="alt-photo-inner w-full h-full absolute inset-0 transition-transform duration-[800ms]"
            style={{
              background:
                "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover",
            }}
          ></div>
        </div>

        <div className="flex flex-col justify-center py-[72px] px-16 bg-white reveal-right">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-[#d97706] mb-[18px]">
            <span className="w-6 h-[1.5px] bg-[#f59e0b]" />
            About Us
          </div>
          <h2 className="font-cormorant font-semibold text-[clamp(28px,3vw,42px)] leading-[1.15] tracking-[-0.5px] text-[#0f2056] mb-5">
            web design
            <br />
            for  <em className="text-[#d97706] not-italic">Trek Nepal</em>
          </h2>
          <p className="text-sm leading-[1.8] text-[#6b7280] max-w-[420px] mb-8">
           lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <a
            href="#"
            className="learn-btn inline-flex items-center gap-2 bg-transparent border-2 border-[#0f2056] text-[#0f2056] font-dm font-semibold text-[11px] tracking-[0.08em] uppercase py-2.5 px-5 rounded no-underline transition-all duration-[350ms] w-fit relative overflow-hidden group"
          >
            <span className="relative z-[1]">Learn More</span>
            <span className="arr relative z-[1]">→</span>
          </a>
        </div>
      </section>

      {/* Section 2: Balanced Approach - Text LEFT | Photo RIGHT */}
      <section
        className="grid grid-cols-2 min-h-[480px] overflow-hidden"
        style={{ direction: "rtl" }}
      >
        <div
          className="alt-photo relative overflow-hidden bg-[#f3f4f6] reveal-right"
          style={{ direction: "ltr" }}
        >
          <div
            className="alt-photo-inner w-full h-full absolute inset-0 transition-transform duration-[800ms]"
            style={{
              background:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover",
            }}
          >
          </div>
        </div>

        <div
          className="flex flex-col justify-center py-[72px] px-16 bg-white reveal-left"
          style={{ direction: "ltr" }}
        >
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-[#d97706] mb-[18px]">
            <span className="w-6 h-[1.5px] bg-[#f59e0b]" />
            Our Philosophy
          </div>
          <h2 className="font-cormorant font-semibold text-[clamp(28px,3vw,42px)] leading-[1.15] tracking-[-0.5px] text-[#0f2056] mb-5">
           Mobile App
            <br />
            <em className="text-[#d97706] not-italic">Development</em>{" "}
            For <br/>Trek Nepal
          </h2>
          <p className="text-sm leading-[1.8] text-[#6b7280] max-w-[420px] mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <a
            href="#"
            className="learn-btn inline-flex items-center gap-2 bg-transparent border-2 border-[#0f2056] text-[#0f2056] font-dm font-semibold text-[11px] tracking-[0.08em] uppercase py-2.5 px-5 rounded no-underline transition-all duration-[350ms] w-fit relative overflow-hidden group"
          >
            <span className="relative z-[1]">Learn More</span>
            <span className="arr relative z-[1]">→</span>
          </a>
        </div>
      </section>

      
      {/* Section 1: Healing Vancouver - Photo LEFT | Text RIGHT */}
      <section className="grid grid-cols-2 min-h-[480px] overflow-hidden">
        <div className="alt-photo relative overflow-hidden bg-[#f3f4f6] reveal-left">
          <div
            className="alt-photo-inner w-full h-full absolute inset-0 transition-transform duration-[800ms]"
            style={{
              background:
                "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover",
            }}
          ></div>
        </div>

        <div className="flex flex-col justify-center py-[72px] px-16 bg-white reveal-right">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-[#d97706] mb-[18px]">
            <span className="w-6 h-[1.5px] bg-[#f59e0b]" />
            About Us
          </div>
          <h2 className="font-cormorant font-semibold text-[clamp(28px,3vw,42px)] leading-[1.15] tracking-[-0.5px] text-[#0f2056] mb-5">
            Healing Vancouver
            <br />
            for over <em className="text-[#d97706] not-italic">30 years</em>
          </h2>
          <p className="text-sm leading-[1.8] text-[#6b7280] max-w-[420px] mb-8">
            At this original Vancouver Naturopathic Clinic in Vancouver, our
            mission is to help patients build a healthy foundation that will
            support them throughout life. We are highly trained doctors who
            follow the best evidence-based principles and standards of
            naturopathic medicine.
          </p>
          <a
            href="#"
            className="learn-btn inline-flex items-center gap-2 bg-transparent border-2 border-[#0f2056] text-[#0f2056] font-dm font-semibold text-[11px] tracking-[0.08em] uppercase py-2.5 px-5 rounded no-underline transition-all duration-[350ms] w-fit relative overflow-hidden group"
          >
            <span className="relative z-[1]">Learn More</span>
            <span className="arr relative z-[1]">→</span>
          </a>
        </div>
      </section>
{/* Section 2: Balanced Approach - Text LEFT | Photo RIGHT */}
      <section
        className="grid grid-cols-2 min-h-[480px] overflow-hidden"
        style={{ direction: "rtl" }}
      >
        <div
          className="alt-photo relative overflow-hidden bg-[#f3f4f6] reveal-right"
          style={{ direction: "ltr" }}
        >
          <div
            className="alt-photo-inner w-full h-full absolute inset-0 transition-transform duration-[800ms]"
            style={{
              background:
                "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover",
            }}
          >
          </div>
        </div>

        <div
          className="flex flex-col justify-center py-[72px] px-16 bg-white reveal-left"
          style={{ direction: "ltr" }}
        >
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] uppercase text-[#d97706] mb-[18px]">
            <span className="w-6 h-[1.5px] bg-[#f59e0b]" />
            Our work
          </div>
          <h2 className="font-cormorant font-semibold text-[clamp(28px,3vw,42px)] leading-[1.15] tracking-[-0.5px] text-[#0f2056] mb-5">
            Graphic Design
            <br />
            for <br/>
            <em className="text-[#d97706] not-italic">Trek Nepal</em>{" "}
            
          </h2>
          <p className="text-sm leading-[1.8] text-[#6b7280] max-w-[420px] mb-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae perferendis recusandae beatae reiciendis mollitia similique iste explicabo doloribus sequi atque id, animi aliquid incidunt odit, ea debitis iure quod dignissimos.
          </p>
          <a
            href="#"
            className="learn-btn inline-flex items-center gap-2 bg-transparent border-2 border-[#0f2056] text-[#0f2056] font-dm font-semibold text-[11px] tracking-[0.08em] uppercase py-2.5 px-5 rounded no-underline transition-all duration-[350ms] w-fit relative overflow-hidden group"
          >
            <span className="relative z-[1]">Learn More</span>
            <span className="arr relative z-[1]">→</span>
          </a>
        </div>
      </section>

    </>
  );
}
