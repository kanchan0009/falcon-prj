// app/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (progressRef.current) {
        const pct =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        progressRef.current.style.width = `${pct}%`;
      }
      // Hero parallax
      const hr = document.querySelector(".hero-right") as HTMLElement;
      if (hr) hr.style.transform = `translateY(${window.scrollY * 0.06}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Intersection Observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("vis");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
      .forEach((el) => io.observe(el));

    // Magnetic buttons
    document.querySelectorAll(".mag").forEach((btn) => {
      const b = btn as HTMLElement;
      b.addEventListener("mousemove", (e: Event) => {
        const me = e as MouseEvent;
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(me.clientX - r.left - r.width / 2) * 0.13}px, ${(me.clientY - r.top - r.height / 2) * 0.13}px)`;
      });
      b.addEventListener("mouseleave", () => {
        b.style.transform = "";
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      io.disconnect();
    };
  }, []);

  const services = [
    { label: "Branding", icon: "◈" },
    { label: "Website", icon: "⬡" },
    { label: "Social Media", icon: "◎" },
    { label: "Marketing", icon: "◉" },
    { label: "Mobile App", icon: "▣" },
  ];

  const projects = [
    {
      tag: "About Us",
      title: "Web Design",
      sub: "for Trek Nepal",
      desc: "We built a visually rich, performance-optimised website for Trek Nepal — capturing the grandeur of the Himalayas while delivering seamless booking experiences across all devices.",
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
      bg: "#f0ece6",
      accent: "#f97316",
    },
    {
      tag: "Our Philosophy",
      title: "Mobile App",
      sub: "Development for Trek Nepal",
      desc: "A native iOS & Android app that brings real-time trek tracking, offline maps, and emergency SOS directly into the hands of adventurers exploring Nepal's remote trails.",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
      bg: "#e8eef4",
      accent: "#fb923c",
    },
    {
      tag: "Our Work",
      title: "Graphic Design",
      sub: "for Trek Nepal",
      desc: "A complete visual identity system — from trail maps to merchandise — crafted to reflect the rugged elegance of Nepal's landscapes and the spirit of its trekking culture.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
      bg: "#eef0e8",
      accent: "#f97316",
    },
    {
      tag: "Results",
      title: "Digital Marketing",
      sub: "Campaign for Trek Nepal",
      desc: "A multi-channel campaign that drove 340% growth in organic traffic and tripled international bookings through strategic content, SEO, and social storytelling.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      bg: "#f0e8ee",
      accent: "#fb923c",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700;800&display=swap");

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          --orange: #f97316;
          --orange-d: #ea6400;
          --navy: #0a1628;
          --navy-m: #0f2056;
          --cream: #faf8f5;
          --warm: #f5f0e8;
          --g200: #e5e7eb;
          --g400: #9ca3af;
          --g500: #6b7280;
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: "Manrope", sans-serif;
          background: var(--cream);
          color: var(--navy);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        ::-webkit-scrollbar {
          width: 3px;
        }
        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        ::-webkit-scrollbar-thumb {
          background: var(--orange);
          border-radius: 2px;
        }

        /* ---- Animations ---- */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes dotPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.8);
            opacity: 0.4;
          }
        }

        .anim-fade-up {
          opacity: 0;
          animation: fadeUp 0.7s 0.25s var(--ease) forwards;
        }
        .anim-fade-up-2 {
          opacity: 0;
          animation: fadeUp 0.7s 0.4s var(--ease) forwards;
        }
        .anim-fade-up-3 {
          opacity: 0;
          animation: fadeUp 0.7s 0.55s var(--ease) forwards;
        }
        .anim-fade-r {
          opacity: 0;
          animation: fadeRight 0.9s 0.2s var(--ease) forwards;
        }
        .anim-line {
          transform-origin: top;
          animation: lineGrow 1.4s 0.6s var(--ease) both;
        }

        /* Scroll reveal */
        .reveal,
        .reveal-left,
        .reveal-right {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 0.9s var(--ease),
            transform 0.9s var(--ease);
        }
        .reveal-left {
          transform: translateX(-48px);
        }
        .reveal-right {
          transform: translateX(48px);
        }
        .reveal.vis,
        .reveal-left.vis,
        .reveal-right.vis {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
        .d1 {
          transition-delay: 0.05s;
        }
        .d2 {
          transition-delay: 0.15s;
        }
        .d3 {
          transition-delay: 0.25s;
        }
        .d4 {
          transition-delay: 0.35s;
        }
        .d5 {
          transition-delay: 0.45s;
        }

        
        
        
       


        
        /* ---- Hero ---- */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
          background: #050d20;
          position: relative;
          overflow: hidden;
        }
        .hero-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .hero-accent-line {
          position: absolute;
          left: clamp(20px, 5vw, 60px);
          top: 120px;
          bottom: 80px;
          width: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--orange),
            transparent
          );
          z-index: 2;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px clamp(28px, 5vw, 64px) 80px
            calc(clamp(20px, 5vw, 60px) + 28px);
          position: relative;
          z-index: 3;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--orange);
          margin-bottom: 22px;
        }
        .hero-eyebrow span {
          display: block;
          width: 28px;
          height: 1.5px;
          background: var(--orange);
        }
        .hero-title {
          font-family: "Cormorant Garamond", serif;
          font-weight: 700;
          font-size: clamp(40px, 5.5vw, 72px);
          line-height: 1.04;
          letter-spacing: -1px;
          color: white;
          margin-bottom: 20px;
        }
        .hero-title em {
          color: var(--orange);
          font-style: italic;
        }
        .hero-sub {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.5);
          max-width: 380px;
          margin-bottom: 36px;
        }
        .hero-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-orange {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--orange);
          color: white;
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 13px 26px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.3s var(--spring);
          position: relative;
          overflow: hidden;
        }
        .btn-orange:hover {
          background: var(--orange-d);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249, 115, 22, 0.45);
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 13px 26px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.3s var(--ease);
          background: transparent;
        }
        .btn-ghost:hover {
          border-color: rgba(255, 255, 255, 0.6);
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .hero-right {
          position: relative;
          overflow: hidden;
        }
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.65) saturate(0.8);
        }
        .hero-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #050d20 0%, transparent 40%);
        }
        .hero-badge {
          position: absolute;
          bottom: 40px;
          right: 32px;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 16px 22px;
          text-align: right;
        }
        .hero-badge-num {
          font-family: "Cormorant Garamond", serif;
          font-weight: 700;
          font-size: 36px;
          color: white;
          line-height: 1;
          letter-spacing: -1px;
        }
        .hero-badge-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ---- Services strip ---- */
        .svc-strip {
          background: #050d20;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding: clamp(32px, 5vw, 56px) clamp(20px, 5vw, 60px);
        }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(12px, 2vw, 24px);
        }
        .svc-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: default;
          transition: transform 0.3s var(--ease);
        }
        .svc-item:hover {
          transform: translateY(-6px);
        }
        .svc-circle {
          width: clamp(60px, 8vw, 80px);
          height: clamp(60px, 8vw, 80px);
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: rgba(255, 255, 255, 0.6);
          transition: all 0.4s var(--spring);
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
        }
        .svc-item:hover .svc-circle {
          border-color: var(--orange);
          color: white;
          background: rgba(249, 115, 22, 0.12);
          box-shadow: 0 0 24px rgba(249, 115, 22, 0.2);
        }
        .svc-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          text-align: center;
          transition: color 0.3s;
          max-width: 70px;
          line-height: 1.4;
        }
        .svc-item:hover .svc-label {
          color: rgba(255, 255, 255, 0.8);
        }

        /* ---- Ticker ---- */
        .ticker {
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: #07111a;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 28s linear infinite;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 14px 0;
        }
        .ticker-text {
          font-family: "Cormorant Garamond", serif;
          font-weight: 600;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.25);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
          padding: 0 28px;
          transition: color 0.3s;
        }
        .ticker-dot {
          color: var(--orange);
          font-size: 8px;
          flex-shrink: 0;
        }

        /* ---- Project sections ---- */
        .project-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: clamp(440px, 55vw, 600px);
          overflow: hidden;
        }
        .proj-photo {
          position: relative;
          overflow: hidden;
        }
        .proj-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s var(--ease);
          display: block;
        }
        .proj-photo:hover img {
          transform: scale(1.05);
        }
        .proj-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10, 8, 6, 0.5) 0%,
            transparent 60%
          );
          pointer-events: none;
        }
        .proj-tag-corner {
          position: absolute;
          top: 24px;
          left: 24px;
          background: var(--orange);
          color: white;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 4px;
        }
        .proj-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(36px, 6vw, 80px) clamp(28px, 5vw, 72px);
          position: relative;
        }
        .proj-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 16px;
          color: var(--orange);
        }
        .proj-eyebrow span {
          display: block;
          width: 24px;
          height: 1.5px;
          background: currentColor;
        }
        .proj-title {
          font-family: "Cormorant Garamond", serif;
          font-weight: 700;
          font-size: clamp(26px, 3.2vw, 44px);
          line-height: 1.1;
          letter-spacing: -0.5px;
          margin-bottom: 14px;
        }
        .proj-title em {
          font-style: italic;
        }
        .proj-desc {
          font-size: 13.5px;
          line-height: 1.8;
          color: var(--g500);
          max-width: 420px;
          margin-bottom: 28px;
        }
        .proj-learn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1.5px solid currentColor;
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 11px 22px;
          border-radius: 5px;
          text-decoration: none;
          transition: all 0.35s var(--ease);
          position: relative;
          overflow: hidden;
          width: fit-content;
        }
        .proj-learn .arr {
          transition: transform 0.3s var(--spring);
          display: inline-block;
        }
        .proj-learn:hover .arr {
          transform: translateX(5px);
        }
        .proj-learn-dark {
          color: var(--navy);
          border-color: var(--navy);
          background: transparent;
        }
        .proj-learn-dark:hover {
          background: var(--navy);
          color: white;
        }
        .proj-learn-orange {
          color: var(--orange);
          border-color: var(--orange);
          background: transparent;
        }
        .proj-learn-orange:hover {
          background: var(--orange);
          color: white;
        }

        /* Dark bg projects */
        .proj-content-dark {
          background: #08122a;
        }
        .proj-content-dark .proj-title {
          color: white;
        }
        .proj-content-dark .proj-desc {
          color: rgba(255, 255, 255, 0.45);
        }

        /* Light bg projects */
        .proj-content-light {
          background: var(--cream);
        }
        .proj-content-light .proj-title {
          color: var(--navy);
        }

        /* Number indicator */
        .proj-number {
          position: absolute;
          bottom: 28px;
          right: 28px;
          font-family: "Cormorant Garamond", serif;
          font-weight: 700;
          font-size: 80px;
          color: rgba(0, 0, 0, 0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -4px;
        }
        .proj-number-light {
          color: rgba(255, 255, 255, 0.04);
        }

        /* ---- Stats band ---- */
        .stats-band {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--orange);
        }
        .stat-cell {
          padding: clamp(28px, 4vw, 48px) clamp(20px, 3vw, 36px);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          text-align: center;
        }
        .stat-cell:last-child {
          border-right: none;
        }
        .stat-num {
          font-family: "Cormorant Garamond", serif;
          font-weight: 700;
          font-size: clamp(36px, 4.5vw, 56px);
          color: white;
          letter-spacing: -2px;
          line-height: 1;
          display: block;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.65);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ---- Responsive ---- */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .hero-left {
            padding: 100px clamp(24px, 5vw, 48px) 48px clamp(24px, 5vw, 48px);
          }
          .hero-right {
            height: clamp(280px, 55vw, 420px);
          }
          .hero-accent-line {
            display: none;
          }

          .svc-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
          }
          .svc-label {
            font-size: 9px;
          }

          .project-section {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .project-section .proj-photo {
            height: clamp(240px, 50vw, 380px);
          }
          /* Ensure alternating sections still photo-top, text-bottom on mobile */
          .project-section.reverse .proj-photo {
            order: -1;
          }

          .stats-band {
            grid-template-columns: 1fr 1fr;
          }
          .stat-cell:nth-child(2) {
            border-right: none;
          }
          .stat-cell:nth-child(1),
          .stat-cell:nth-child(2) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          }

          
          .nav-hire-desktop {
            display: none;
          }
          
        }

        @media (max-width: 560px) {
          .svc-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px 8px;
          }
          /* Hide last 2 on very small screens or wrap — keep 5 in 3-col wrap */

          .hero-btns {
            flex-direction: column;
          }
          .btn-orange,
          .btn-ghost {
            justify-content: center;
          }

          .stats-band {
            grid-template-columns: 1fr 1fr;
          }
          .proj-content {
            padding: 32px 24px 40px;
          }
        }

        @media (max-width: 400px) {
          .svc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      {/* Progress bar */}
      <div
        ref={progressRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          background: "var(--orange)",
          zIndex: 9999,
          width: "0%",
          transition: "width 0.1s linear",
        }}
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero-grain" />
        <div className="hero-accent-line anim-line" />

        <div className="hero-left">
          <div className="hero-eyebrow anim-fade-up">
            <span />
            Creative Agency · Nepal
          </div>
          <h1 className="hero-title anim-fade-up-2">
            Creative Stories.
            <br />
            <em>Fearless</em> Impact.
          </h1>
          <p className="hero-sub anim-fade-up-2">
            We build bold digital experiences — websites, apps, and campaigns —
            that help brands in Nepal and beyond leave a lasting impression.
          </p>
          <div className="hero-btns anim-fade-up-3">
            <a href="#" className="btn-orange mag">
              Hire Us →
            </a>
            <a href="#" className="btn-ghost mag">
              Our Work
            </a>
          </div>
        </div>

        <div className="hero-right anim-fade-r">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85"
            alt="Nepal mountains"
            className="hero-img"
          />
          <div className="hero-img-overlay" />
          <div className="hero-badge">
            <div className="hero-badge-num">60+</div>
            <div className="hero-badge-label">Projects Delivered</div>
          </div>
        </div>
      </section>

      {/* Services strip */}
      <div className="svc-strip">
        <div className="svc-grid">
          {services.map((svc, i) => (
            <div key={i} className={`svc-item reveal d${i + 1}`}>
              <div className="svc-circle">{svc.icon}</div>
              <div className="svc-label">{svc.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, si) => (
            <div key={si} className="ticker-item">
              {[
                "Website Design",
                "Digital Marketing",
                "SEO",
                "Graphic Design",
                "Mobile App",
                "Software Dev",
                "Branding",
                "UI/UX",
              ].map((t) => (
                <div
                  key={t}
                  style={{ display: "flex", alignItems: "center", gap: 0 }}
                >
                  <span className="ticker-text">{t}</span>
                  <span className="ticker-dot">◆</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Projects — alternating photo/text */}
      {projects.map((proj, i) => {
        const isEven = i % 2 === 0;
        const isDark = i === 0 || i === 1;
        return (
          <section
            key={i}
            className={`project-section ${!isEven ? "reverse" : ""}`}
            style={{ background: isDark ? "#08122a" : "var(--cream)" }}
          >
            {isEven ? (
              <>
                {/* Photo left */}
                <div className="proj-photo reveal-left">
                  <img src={proj.img} alt={proj.title} />
                  <div className="proj-photo-overlay" />
                  <div className="proj-tag-corner">{proj.tag}</div>
                </div>
                {/* Text right */}
                <div
                  className={`proj-content ${isDark ? "proj-content-dark" : "proj-content-light"} reveal-right`}
                >
                  <div className="proj-eyebrow">
                    <span />
                    {proj.tag}
                  </div>
                  <h2 className="proj-title">
                    {proj.title}
                    <br />
                    <em style={{ color: proj.accent }}>{proj.sub}</em>
                  </h2>
                  <p className="proj-desc">{proj.desc}</p>
                  <a
                    href="#"
                    className={`proj-learn mag ${isDark ? "proj-learn-orange" : "proj-learn-dark"}`}
                  >
                    <span>View Project</span>
                    <span className="arr">→</span>
                  </a>
                  <div
                    className={`proj-number ${isDark ? "proj-number-light" : ""}`}
                  >
                    0{i + 1}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Text left */}
                <div
                  className={`proj-content ${isDark ? "proj-content-dark" : "proj-content-light"} reveal-left`}
                >
                  <div className="proj-eyebrow">
                    <span />
                    {proj.tag}
                  </div>
                  <h2 className="proj-title">
                    {proj.title}
                    <br />
                    <em style={{ color: proj.accent }}>{proj.sub}</em>
                  </h2>
                  <p className="proj-desc">{proj.desc}</p>
                  <a
                    href="#"
                    className={`proj-learn mag ${isDark ? "proj-learn-orange" : "proj-learn-dark"}`}
                  >
                    <span>View Project</span>
                    <span className="arr">→</span>
                  </a>
                  <div
                    className={`proj-number ${isDark ? "proj-number-light" : ""}`}
                  >
                    0{i + 1}
                  </div>
                </div>
                {/* Photo right */}
                <div className="proj-photo reveal-right">
                  <img src={proj.img} alt={proj.title} />
                  <div className="proj-photo-overlay" />
                  <div className="proj-tag-corner">{proj.tag}</div>
                </div>
              </>
            )}
          </section>
        );
      })}

      {/* Stats band */}
      <div className="stats-band">
        {[
          { num: "60+", label: "Projects Delivered" },
          { num: "30+", label: "Team Members" },
          { num: "4.6B", label: "IDs Processed" },
          { num: "5★", label: "Client Rating" },
        ].map((s) => (
          <div key={s.label} className="stat-cell reveal">
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
