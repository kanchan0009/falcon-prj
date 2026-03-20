// app/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";

export default function Home() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (progressRef.current) {
        const scrollPercent =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        progressRef.current.style.width = scrollPercent + "%";
      }
      const hr = document.querySelector(".hero-right") as HTMLElement;
      if (hr) {
        hr.style.transform = "translateY(" + window.scrollY * 0.04 + "px)";
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

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

    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      const button = btn as HTMLElement;
      button.addEventListener("mousemove", (e: Event) => {
        const me = e as MouseEvent;
        const r = button.getBoundingClientRect();
        const x = (me.clientX - r.left - r.width / 2) * 0.12;
        const y = (me.clientY - r.top - r.height / 2) * 0.12;
        button.style.transform = "translate(" + x + "px, " + y + "px)";
      });
      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });
    });

    document.querySelectorAll(".tilt-card").forEach((card) => {
      const cardEl = card as HTMLElement;
      cardEl.addEventListener("mousemove", (e: Event) => {
        const me = e as MouseEvent;
        const r = cardEl.getBoundingClientRect();
        const x = (me.clientX - r.left) / r.width - 0.5;
        const y = (me.clientY - r.top) / r.height - 0.5;
        cardEl.style.transform =
          "translateY(-5px) rotateX(" +
          -y * 5 +
          "deg) rotateY(" +
          x * 5 +
          "deg)";
        cardEl.style.transition = "transform 0.08s linear";
      });
      cardEl.addEventListener("mouseleave", () => {
        cardEl.style.transform = "";
        cardEl.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
      });
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      countObserver.disconnect();
    };
  }, []);

  const tickerItems = [
    "Website Design",
    "Digital Marketing",
    "SEO",
    "Graphics Design",
    "Mobile App Development",
    "Software Development",
    "AI",
    "Logo Design",
    "Web Design",
  ];

  const features = [
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
  ];

  const onboardingItems = [
    {
      title: "Data verification",
      desc: "Instantly verify customer-supplied data against authoritative global sources for fast, accurate onboarding decisions.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Document scanning",
      desc: "AI-powered document capture and analysis across passports, driving licences and national ID cards in 195+ countries.",
      img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Biometric checks",
      desc: "Liveness detection and face-matching technology to confirm the person presenting documents is the legitimate owner.",
      img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const miniGridItems1 = [
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
      desc: "Deep-dive into any identity using our powerful investigation suite.",
    },
  ];

  const miniGridItems2 = [
    {
      title: "Know your customer",
      desc: "Deep KYC checks combining database lookups, document and biometric verification.",
    },
    {
      title: "Know your business",
      desc: "Verify businesses and directors in real-time using authoritative registry data.",
    },
    {
      title: "Risk intelligence",
      desc: "Global watchlists, PEP screening and adverse media monitoring.",
    },
  ];

  const miniGridItems3 = [
    {
      title: "iOS & Android SDK",
      desc: "Drop-in native SDKs for seamless mobile integration with <100ms latency.",
    },
    {
      title: "Web component",
      desc: "Responsive web SDK for desktop and mobile browsers, zero dependencies.",
    },
    {
      title: "Headless API",
      desc: "Full REST API access with Webhooks, letting you build any custom flow.",
    },
  ];

  const stats = [
    { val: "4", sfx: ".6B+", label: "People verified" },
    { val: "30", sfx: "+", label: "Team members" },
    { val: "60", sfx: "+", label: "Projects delivered" },
    { val: "195", sfx: "+", label: "Countries covered" },
  ];

  const globeNodes = [
    { top: "18%", left: "52%", delay: "0s" },
    { top: "34%", left: "24%", delay: "0.5s" },
    { top: "62%", left: "72%", delay: "1s" },
    { top: "76%", left: "38%", delay: "1.5s" },
    { top: "48%", left: "82%", delay: "0.8s" },
    { top: "26%", left: "68%", delay: "0.3s" },
  ];

  const partners = ["NatWest", "Barclays", "HSBC", "Monzo", "Revolut", "Wise"];

  const testimonials = [
    {
      text: "Partnering with GBG enables us to offer a suite of accurate, multi-layered protection against payment fraud. The results have been exceptional from day one.",
      av: "TR",
      bg: "#0f2056",
      name: "Thomas Reed",
      role: "Head of Fraud Prevention, NatWest",
    },
    {
      text: "When we launched GBG, our identity data intelligence improved our pass rate for genuine customers vastly. Our conversion climbed while fraud dropped near zero.",
      av: "AP",
      bg: "#d97706",
      name: "Amir Patel",
      role: "Chief Technology Officer, Revolut",
    },
  ];

  const footerLinks = {
    products: ["Verify", "Assess", "Protect", "Connect"],
    company: ["About", "Careers", "Blog", "Press"],
    legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  return (
    <>
      <Head>
        <title>Falcon - Identity Intelligence Platform</title>
        <meta
          name="description"
          content="Complete customer intelligence and identity verification platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Manrope:wght@300;400;500;600;700;800&display=swap");

        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

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
          --section-px: clamp(20px, 5vw, 100px);
          --section-py: clamp(48px, 8vw, 100px);
        }

        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: "Manrope", sans-serif;
          color: var(--text);
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        .font-playfair {
          font-family: "Playfair Display", serif;
        }
        .font-manrope {
          font-family: "Manrope", sans-serif;
        }

        /* Progress bar */
        #progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: var(--amber);
          z-index: 9999;
          width: 0%;
          transition: width 0.1s linear;
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

        /* Reveal animations */
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

        /* Hero animations */
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
        @keyframes fadeR {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
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
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

        .animate-dotPulse {
          animation: dotPulse 2s infinite;
        }
        .animate-floatY {
          animation: floatY 4s ease-in-out infinite alternate;
        }
        .animate-floatY-delay {
          animation: floatY 5s 1s ease-in-out infinite alternate;
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
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

        /* Buttons */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--amber);
          color: var(--navy-d);
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 20px;
          border-radius: 10px;
          border: none;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s var(--spring);
          white-space: nowrap;
        }
        .btn-primary:hover {
          background: var(--amber-d);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
        }
        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid var(--g300);
          color: var(--navy);
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s var(--ease);
          white-space: nowrap;
        }
        .btn-outline:hover {
          background: var(--navy-l);
          border-color: var(--navy);
        }
        .btn-outline-white {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid rgba(255, 255, 255, 0.25);
          color: rgba(255, 255, 255, 0.85);
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 13px;
          padding: 10px 20px;
          border-radius: 10px;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .btn-outline-white:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 64px);
          align-items: center;
          padding: clamp(40px, 6vw, 80px) var(--section-px);
          gap: clamp(32px, 4vw, 60px);
          background: linear-gradient(135deg, #ffffff 55%, #eef1fa 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(#e5e7eb 1px, transparent 1px),
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px);
          background-size: 52px 52px;
          opacity: 0.3;
        }
        .hero-glow {
          position: absolute;
          right: -120px;
          top: -120px;
          width: 560px;
          height: 560px;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(
            circle,
            rgba(245, 158, 11, 0.07),
            transparent 70%
          );
        }
        .hero-left {
          position: relative;
          z-index: 2;
        }
        .h-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--navy);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .h-title {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: clamp(32px, 4.5vw, 58px);
          line-height: 1.06;
          letter-spacing: -2px;
          color: var(--navy);
          margin-bottom: 16px;
        }
        .h-sub {
          font-size: 15px;
          line-height: 1.75;
          color: var(--g500);
          max-width: 400px;
          margin-bottom: 28px;
        }
        .h-btns {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Hero photos grid */
        .hero-right {
          position: relative;
          z-index: 2;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 10px;
          height: clamp(320px, 45vw, 460px);
        }
        .hero-photo {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(135deg, #c5ceef, #9daee0);
        }
        .hero-photo.span2 {
          grid-row: span 2;
        }
        .hero-photo img,
        .hero-photo .bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          background-size: cover;
          background-position: center;
        }
        .badge-float {
          position: absolute;
          bottom: 14px;
          left: 12px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 10px;
          padding: 10px 14px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(6px);
        }
        .badge-check {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--amber);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          color: var(--navy-d);
          font-weight: 900;
          flex-shrink: 0;
        }
        .badge-name {
          position: absolute;
          bottom: 10px;
          right: 8px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 6px;
          padding: 5px 10px;
          font-size: 10px;
          font-weight: 700;
          color: var(--navy);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
        }

        /* Ticker */
        .ticker {
          padding: 18px 0;
          border-top: 1px solid var(--g200);
          border-bottom: 1px solid var(--g200);
          overflow: hidden;
          position: relative;
        }
        .ticker::before,
        .ticker::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
        }
        .ticker::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .ticker::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .ticker-track {
          display: flex;
          gap: 0;
          width: max-content;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          display: flex;
          align-items: center;
          gap: 40px;
        }
        .ticker-label {
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 11px;
          color: var(--g300);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.3s;
          cursor: default;
          padding: 0 20px;
        }
        .ticker-label:hover {
          color: var(--navy);
        }
        .ticker-dot {
          color: var(--g200);
          font-size: 16px;
        }

        /* Features grid */
        .features {
          padding: clamp(40px, 6vw, 70px) var(--section-px);
          background: var(--white);
        }
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border: 1px solid var(--g200);
          border-radius: 18px;
          overflow: hidden;
        }
        .feat-card {
          padding: clamp(24px, 4vw, 36px);
          position: relative;
          overflow: hidden;
          border-right: 1px solid var(--g200);
          transition: background 0.35s;
          cursor: default;
        }
        .feat-card:last-child {
          border-right: none;
        }
        .feat-card:hover {
          background: var(--amber-xl);
        }
        .feat-card:hover .f-num {
          background: var(--amber);
          color: var(--navy-d);
        }
        .f-num {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: var(--navy-l);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: var(--navy);
          margin-bottom: 14px;
          transition:
            background 0.35s,
            color 0.35s;
        }
        .feat-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--navy);
          margin-bottom: 8px;
        }
        .feat-desc {
          font-size: 12.5px;
          line-height: 1.7;
          color: var(--g500);
          margin-bottom: 14px;
        }
        .learn-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
          font-weight: 600;
          color: var(--navy);
          text-decoration: none;
          transition: color 0.25s;
        }
        .learn-link:hover {
          color: var(--amber);
        }

        /* Connect section */
        .connect {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
          padding: var(--section-py) var(--section-px);
          background: var(--navy-l);
        }
        .pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 14px;
          background: var(--navy-l);
          border: 1px solid rgba(15, 32, 86, 0.15);
          color: var(--navy);
        }
        .section-title {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: clamp(22px, 3vw, 40px);
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: var(--navy);
          margin-bottom: 12px;
        }
        .section-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--g500);
          max-width: 480px;
        }

        /* Dashboard card */
        .dash-card {
          background: var(--white);
          border: 1px solid var(--g200);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(15, 32, 86, 0.1);
        }
        .dash-header {
          background: var(--navy);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .dash-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dash-title {
          flex: 1;
          text-align: center;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }
        .dash-live {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.4);
        }
        .dash-body {
          padding: 16px;
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid var(--g100);
        }
        .check-row:last-child {
          border-bottom: none;
        }
        .av {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 11px;
          color: white;
          flex-shrink: 0;
        }
        .check-info {
          flex: 1;
        }
        .check-name {
          font-size: 12px;
          font-weight: 600;
          color: var(--navy);
        }
        .check-sub {
          font-size: 10px;
          color: var(--g400);
          margin-top: 1px;
        }
        .status-badge {
          font-size: 9px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          flex-shrink: 0;
          border: 1px solid;
        }

        /* Onboarding */
        .onboarding {
          padding: var(--section-py) var(--section-px);
          background: var(--white);
        }
        .ob-header {
          margin-bottom: clamp(32px, 5vw, 52px);
        }
        .ob-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 4vw, 32px);
        }
        .ob-img {
          border-radius: 14px;
          overflow: hidden;
          aspect-ratio: 3/2.2;
          margin-bottom: 18px;
          background: linear-gradient(135deg, #c5ceef, #9daee0);
          position: relative;
        }
        .ob-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ob-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--navy);
          margin-bottom: 6px;
        }
        .ob-desc {
          font-size: 12.5px;
          line-height: 1.7;
          color: var(--g500);
          margin-bottom: 10px;
        }

        /* Split sections */
        .split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 4vw, 72px);
          align-items: center;
          padding: var(--section-py) var(--section-px);
        }
        .split.reverse .split-visual {
          order: -1;
        }
        .split-title {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: clamp(22px, 2.8vw, 38px);
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: var(--navy);
          margin-bottom: 12px;
        }
        .split-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: var(--g500);
          max-width: 480px;
          margin-bottom: 22px;
        }
        .mini-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(14px, 2.5vw, 22px);
          margin-top: 28px;
        }
        .mini-title {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          font-size: 12.5px;
          color: var(--navy);
          margin-bottom: 5px;
        }
        .mini-desc {
          font-size: 11.5px;
          line-height: 1.65;
          color: var(--g500);
          margin-bottom: 6px;
        }

        .split-photo {
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 0.85;
          position: relative;
          background: linear-gradient(135deg, #c8b8d5, #a898b8);
          max-width: 400px;
          width: 100%;
        }
        .split-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .float-tag {
          position: absolute;
          background: white;
          border: 1px solid var(--g200);
          border-radius: 10px;
          padding: 8px 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          font-size: 11px;
        }
        .float-tag strong {
          display: block;
          font-weight: 700;
          color: var(--navy);
          font-size: 11px;
          margin-bottom: 1px;
        }
        .float-tag span {
          font-size: 10px;
          color: var(--g400);
        }

        /* Coverage */
        .coverage {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
          padding: var(--section-py) var(--section-px);
          background: linear-gradient(
            135deg,
            var(--navy-d) 0%,
            var(--navy) 60%,
            var(--navy-m)
          );
          position: relative;
          overflow: hidden;
        }
        .coverage-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.06) 1px,
            transparent 1px
          );
          background-size: 28px 28px;
        }
        .coverage-title {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: clamp(22px, 2.8vw, 40px);
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: white;
          margin-bottom: 12px;
        }
        .coverage-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.55);
          max-width: 480px;
        }
        .stats-g {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(18px, 4vw, 28px);
          margin-top: 36px;
        }
        .stat-val {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: clamp(28px, 3.5vw, 44px);
          letter-spacing: -2px;
          color: white;
          display: block;
          margin-bottom: 2px;
        }
        .stat-label {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
        }

        /* Globe viz */
        .globe-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          aspect-ratio: 1;
        }
        .globe-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(245, 158, 11, 0.15);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .globe-node {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--amber);
        }
        .globe-center {
          text-align: center;
          position: relative;
          z-index: 3;
        }
        .globe-num {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: 40px;
          color: white;
          letter-spacing: -2px;
        }
        .globe-sub {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 4px;
        }

        /* Testimonials */
        .testimonials {
          padding: var(--section-py) var(--section-px);
          background: var(--white);
        }
        .test-intro {
          margin-bottom: clamp(28px, 5vw, 44px);
        }
        .stars-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--amber-l);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 10px;
          font-weight: 700;
          color: var(--amber-d);
          margin-bottom: 18px;
        }
        .partner-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 16px;
        }
        .chip {
          background: var(--g100);
          border: 1px solid var(--g200);
          border-radius: 6px;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 700;
          color: var(--g500);
          font-family: "Manrope", sans-serif;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.3s;
        }
        .chip:hover {
          background: var(--navy-l);
          color: var(--navy);
          border-color: rgba(15, 32, 86, 0.2);
        }
        .test-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(14px, 3vw, 20px);
        }
        .test-card {
          background: var(--white);
          border: 1px solid var(--g200);
          border-radius: 14px;
          padding: clamp(20px, 3vw, 28px);
          position: relative;
          overflow: hidden;
          transition: all 0.4s var(--ease);
        }
        .test-card:hover {
          transform: translateY(-5px);
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 14px 40px rgba(245, 158, 11, 0.1);
        }
        .test-quote {
          position: absolute;
          top: -6px;
          right: 18px;
          font-family: "Playfair Display", serif;
          font-size: 90px;
          font-weight: 800;
          color: var(--amber-l);
          line-height: 1;
          pointer-events: none;
        }
        .test-text {
          font-size: 13px;
          line-height: 1.8;
          color: var(--g700);
          margin-bottom: 18px;
          position: relative;
        }
        .test-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .test-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--navy);
        }
        .test-role {
          font-size: 11px;
          color: var(--g400);
          margin-top: 1px;
        }

        /* CTA Band */
        .cta-band {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(24px, 4vw, 40px);
          align-items: center;
          padding: clamp(48px, 8vw, 80px) var(--section-px);
          background: linear-gradient(135deg, var(--navy-d), var(--navy));
          position: relative;
          overflow: hidden;
        }
        .cta-glow {
          position: absolute;
          right: 0;
          top: 0;
          width: 40%;
          height: 100%;
          pointer-events: none;
          background: radial-gradient(
            circle at right,
            rgba(245, 158, 11, 0.1),
            transparent 60%
          );
        }
        .cta-spinner {
          position: absolute;
          right: 180px;
          top: 50%;
        }
        .cta-title {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: clamp(22px, 3vw, 40px);
          letter-spacing: -1.5px;
          color: white;
          margin-bottom: 6px;
        }
        .cta-sub {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.5);
        }
        .cta-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Footer */
        .footer {
          background: var(--navy-d);
          padding: clamp(40px, 6vw, 64px) var(--section-px) 28px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1.4fr repeat(3, 1fr);
          gap: clamp(28px, 4vw, 48px);
          margin-bottom: 40px;
        }
        .footer-logo {
          font-family: "Playfair Display", serif;
          font-weight: 800;
          font-size: 18px;
          color: white;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-tagline {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.6;
          max-width: 220px;
        }
        .footer-col-title {
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 14px;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-links a {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.25s;
        }
        .footer-links a:hover {
          color: rgba(255, 255, 255, 0.9);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-copy {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.25);
        }

        /* ============ MOBILE RESPONSIVE ============ */

        /* Tablet: ≤1024px */
        @media (max-width: 1024px) {
          .hero {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .connect {
            gap: 36px;
          }
          .split {
            gap: 36px;
          }
          .coverage {
            gap: 36px;
          }
          .feat-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
          .mini-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Tablet portrait / large phone: ≤768px */
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            min-height: auto;
            padding-top: 36px;
            padding-bottom: 36px;
            text-align: center;
          }
          .h-eyebrow-wrap {
            justify-content: center;
          }
          .h-sub {
            margin-left: auto;
            margin-right: auto;
          }
          .h-btns {
            justify-content: center;
          }
          .hero-right {
            margin-top: 8px;
          }
          .hero-grid {
            height: clamp(260px, 60vw, 380px);
          }

          .feat-grid {
            grid-template-columns: 1fr;
          }
          .feat-card {
            border-right: none;
            border-bottom: 1px solid var(--g200);
          }
          .feat-card:last-child {
            border-bottom: none;
          }

          .connect {
            grid-template-columns: 1fr;
          }
          .ob-grid {
            grid-template-columns: 1fr 1fr;
          }

          .split {
            grid-template-columns: 1fr;
          }
          .split.reverse .split-visual {
            order: unset;
          }
          .split-photo {
            max-width: 100%;
          }
          .mini-grid {
            grid-template-columns: 1fr;
          }

          .coverage {
            grid-template-columns: 1fr;
          }
          .globe-wrap {
            max-width: 260px;
            margin: 0 auto;
          }

          .test-grid {
            grid-template-columns: 1fr;
          }
          .cta-band {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .cta-btns {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }
          .cta-spinner {
            display: none;
          }

          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }

        /* Small phone: ≤480px */
        @media (max-width: 480px) {
          .hero {
            padding-top: 28px;
            padding-bottom: 28px;
          }
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            height: clamp(220px, 55vw, 280px);
          }
          .h-title {
            letter-spacing: -1px;
          }

          .ob-grid {
            grid-template-columns: 1fr;
          }
          .stats-g {
            grid-template-columns: 1fr 1fr;
          }
          .footer-top {
            grid-template-columns: 1fr;
          }
          .test-grid {
            grid-template-columns: 1fr;
          }

          .split-photo {
            aspect-ratio: 1.1;
          }
          .btn-primary,
          .btn-outline {
            padding: 9px 16px;
            font-size: 12px;
          }

          .cta-btns {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />

        <div className="hero-left">
          <div className="h-eyebrow">
            <div className="h-eyebrow-wrap font-playfair">
              <span
                className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-dotPulse"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  flexShrink: 0,
                }}
              />
              Identity Intelligence Platform
            </div>
          </div>
          <h1 className="h-title font-playfair">
            Complete
            <br />
            customer
            <br />
            intelligence
          </h1>
          <p className="h-sub">
            Identity intelligence for fast and rewarding customer experiences,
            every time, without compromise.
          </p>
          <div className="h-btns">
            <a href="#" className="btn-primary magnetic-btn">
              Get started →
            </a>
            <a href="#" className="btn-outline magnetic-btn">
              See how it works
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-grid">
            <div className="hero-photo span2">
              <div
                className="bg-img"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80')",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="badge-float animate-floatY">
                <div className="badge-check">✓</div>
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--navy)",
                    }}
                  >
                    Identity Verified
                  </strong>
                  <span style={{ fontSize: 10, color: "var(--g400)" }}>
                    Verified in 1.2s
                  </span>
                </div>
              </div>
            </div>
            <div
              className="hero-photo"
              style={{ background: "linear-gradient(135deg,#e8d2be,#d4b49a)" }}
            >
              <div
                className="bg-img"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80')",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="badge-name animate-floatY-delay">
                Natasha B. ✓
              </div>
            </div>
            <div
              className="hero-photo"
              style={{ background: "linear-gradient(135deg,#bcd4c8,#96bdb0)" }}
            >
              <div
                className="bg-img"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80')",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track animate-marquee">
          {[...Array(2)].map((_, si) => (
            <div key={si} className="ticker-item">
              {tickerItems.map((label) => (
                <div
                  key={`${si}-${label}`}
                  style={{ display: "flex", alignItems: "center", gap: 32 }}
                >
                  <span className="ticker-label">{label}</span>
                  <span className="ticker-dot">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="features">
        <div className="feat-grid">
          {features.map((feat, i) => (
            <div key={feat.num} className={`feat-card reveal d${i + 1}`}>
              <div className="f-num font-playfair">{feat.num}</div>
              <h3 className="feat-title">{feat.title}</h3>
              <p className="feat-desc">{feat.desc}</p>
              <a href="#" className="learn-link">
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Connect */}
      <section className="connect">
        <div className="reveal">
          <div className="pill-badge font-playfair">GBG Connect</div>
          <h2 className="section-title">Connect with every genuine customer</h2>
          <p className="section-desc">
            Falcon enables you to offer fast and personalised journeys while
            blocking fraudsters at every touchpoint.
          </p>
          <a
            href="#"
            className="btn-primary magnetic-btn"
            style={{ marginTop: 22, display: "inline-flex" }}
          >
            Find out more →
          </a>
        </div>
        <div className="reveal d2">
          <div className="dash-card tilt-card animate-floatY">
            <div className="dash-header">
              <div className="dash-dot" style={{ background: "#ff5f57" }} />
              <div className="dash-dot" style={{ background: "#febc2e" }} />
              <div className="dash-dot" style={{ background: "#28c840" }} />
              <div className="dash-title">Identity Checks</div>
              <div className="dash-live">
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#28c840",
                    animation: "dotPulse 2s infinite",
                  }}
                />
                Live
              </div>
            </div>
            <div className="dash-body">
              {[
                {
                  av: "JD",
                  bg: "#0f2056",
                  name: "James Dawson",
                  sub: "UK · Passport · 0.9s",
                  badge: "Passed",
                  bc: "rgba(34,197,94,0.1)",
                  tc: "#16a34a",
                  bdr: "rgba(34,197,94,0.25)",
                },
                {
                  av: "AS",
                  bg: "#d97706",
                  name: "Amara Singh",
                  sub: "IN · Aadhaar · 1.1s",
                  badge: "Passed",
                  bc: "rgba(34,197,94,0.1)",
                  tc: "#16a34a",
                  bdr: "rgba(34,197,94,0.25)",
                },
                {
                  av: "??",
                  bg: "#9ca3af",
                  name: "Unknown User",
                  sub: "VPN detected · Spoofed",
                  badge: "Blocked",
                  bc: "rgba(239,68,68,0.1)",
                  tc: "#dc2626",
                  bdr: "rgba(239,68,68,0.25)",
                },
                {
                  av: "MC",
                  bg: "#1a3580",
                  name: "Maria Chen",
                  sub: "SG · NRIC · 1.4s",
                  badge: "Review",
                  bc: "rgba(245,158,11,0.15)",
                  tc: "#d97706",
                  bdr: "rgba(245,158,11,0.3)",
                },
              ].map((row, i) => (
                <div key={i} className="check-row">
                  <div className="av" style={{ background: row.bg }}>
                    {row.av}
                  </div>
                  <div className="check-info">
                    <div className="check-name">{row.name}</div>
                    <div className="check-sub">{row.sub}</div>
                  </div>
                  <div
                    className="status-badge"
                    style={{
                      background: row.bc,
                      color: row.tc,
                      borderColor: row.bdr,
                    }}
                  >
                    {row.badge}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Split: Fraud */}
      <section className="split" style={{ background: "var(--g50)" }}>
        <div className="reveal">
          <h2 className="split-title">Mobile App development</h2>
          <p className="split-desc">
            Block synthetic identities, account takeovers and first-party fraud
            before they cost your business a single penny.
          </p>
          <a href="#" className="btn-primary magnetic-btn">
            Learn more →
          </a>
          <div className="mini-grid">
            {miniGridItems1.map((item) => (
              <div key={item.title}>
                <h3 className="mini-title">{item.title}</h3>
                <p className="mini-desc">{item.desc}</p>
                <a href="#" className="learn-link">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
        <div
          className="split-visual reveal d2"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div className="split-photo">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=800&q=80"
              alt="Fraud prevention"
            />
            <div
              className="float-tag animate-floatY"
              style={{ top: "18%", left: "-16px" }}
            >
              <strong>Fraud Detected</strong>
              <span>Device mismatch · VPN</span>
            </div>
            <div
              className="float-tag animate-floatY"
              style={{ bottom: "22%", right: "-16px", animationDelay: "1s" }}
            >
              <strong>✓ Accuracy</strong>
              <span>Cross-ref'd 4.6B IDs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Split: Compliance */}
      <section className="split reverse" style={{ background: "var(--white)" }}>
        <div
          className="split-visual reveal"
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <div
            className="split-photo"
            style={{ background: "linear-gradient(135deg,#bcd4c8,#7aac9c)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80"
              alt="Compliance"
            />
            <div
              className="tilt-card"
              style={{
                position: "absolute",
                bottom: "-24px",
                right: "-12px",
                background: "white",
                border: "1px solid var(--g200)",
                borderRadius: 12,
                padding: "14px 18px",
                boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
                minWidth: 190,
                animation: "floatY 5s ease-in-out infinite alternate",
                animationDelay: "0.5s",
              }}
            >
              <div
                style={{
                  fontFamily: "Playfair Display,serif",
                  fontWeight: 700,
                  fontSize: 13,
                  color: "var(--navy)",
                  marginBottom: 2,
                }}
              >
                Elena Cooper
              </div>
              <div
                style={{ fontSize: 10, color: "var(--g400)", marginBottom: 10 }}
              >
                Customer since 2021 · Low risk
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {[80, 60, 90, 70, 85].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      background: "var(--amber)",
                      borderRadius: 3,
                      height: h * 0.3,
                      alignSelf: "flex-end",
                      opacity: 0.7 + i * 0.06,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="reveal d2">
          <h2 className="split-title">Graphics Design</h2>
          <p className="split-desc">
            Make confident decisions with comprehensive KYC, KYB, and risk
            intelligence in one integrated platform.
          </p>
          <a href="#" className="btn-primary magnetic-btn">
            Learn more →
          </a>
          <div className="mini-grid">
            {miniGridItems2.map((item) => (
              <div key={item.title}>
                <h3 className="mini-title">{item.title}</h3>
                <p className="mini-desc">{item.desc}</p>
                <a href="#" className="learn-link">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split: Mobile App */}
      <section className="split" style={{ background: "var(--g50)" }}>
        <div className="reveal">
          <h2 className="split-title">Web Development</h2>
          <p className="split-desc">
            Native SDK integrations for iOS and Android deliver sub-second
            verification, keeping conversion rates high and drop-off minimal.
          </p>
          <a href="#" className="btn-primary magnetic-btn">
            Learn more →
          </a>
          <div className="mini-grid">
            {miniGridItems3.map((item) => (
              <div key={item.title}>
                <h3 className="mini-title">{item.title}</h3>
                <p className="mini-desc">{item.desc}</p>
                <a href="#" className="learn-link">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
        <div
          className="split-visual reveal d2"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div
            className="split-photo"
            style={{ background: "linear-gradient(135deg,#c8d8e8,#a8c0d8)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
              alt="Mobile app"
            />
            <div
              className="float-tag animate-floatY"
              style={{ top: "22%", left: "-16px" }}
            >
              <strong>UI/UX Design</strong>
              <span>Native feel, any platform</span>
            </div>
            <div
              className="float-tag animate-floatY"
              style={{ bottom: "20%", right: "-16px", animationDelay: "1.2s" }}
            >
              <strong>✓ 99.7% uptime</strong>
              <span>SLA guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="coverage">
        <div className="coverage-dots" />
        <div
          className="cov-left reveal"
          style={{ position: "relative", zIndex: 2 }}
        >
          <h2 className="coverage-title">
            Make the right customer decisions around the world
          </h2>
          <p className="coverage-desc">
            Our data network spans 195+ countries, giving you the coverage to
            verify identities with confidence.
          </p>
          <div className="stats-g">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span
                  className="s-num stat-val font-playfair"
                  data-val={stat.val}
                  data-sfx={stat.sfx}
                >
                  {stat.val}
                  {stat.sfx}
                </span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal d2" style={{ position: "relative", zIndex: 2 }}>
          <div className="globe-wrap">
            {[300, 220, 140].map((size) => (
              <div
                key={size}
                className="globe-ring"
                style={{ width: size, height: size }}
              />
            ))}
            {globeNodes.map((node, i) => (
              <div
                key={i}
                className="globe-node animate-nodePls"
                style={{
                  top: node.top,
                  left: node.left,
                  animationDelay: node.delay,
                }}
              />
            ))}
            <div className="globe-center">
              <div className="globe-num font-playfair">60+</div>
              <div className="globe-sub">Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="test-intro reveal">
          <div className="stars-badge">★★★★★ &nbsp;Trusted by enterprise</div>
          <h2 className="section-title">
            20,000+ businesses
            <br />
            partner with us
          </h2>
          <p className="section-desc">
            From global banks to fast-growing fintechs, teams everywhere rely on
            Falcon to verify identities and stop fraud.
          </p>
          <div className="partner-chips">
            {partners.map((p) => (
              <div key={p} className="chip">
                {p}
              </div>
            ))}
          </div>
        </div>
        <div
          className="test-grid"
          style={{ marginTop: "clamp(24px,4vw,40px)" }}
        >
          {testimonials.map((test, i) => (
            <div key={i} className={`test-card reveal d${i + 1}`}>
              <div className="test-quote">"</div>
              <p className="test-text">{test.text}</p>
              <div className="test-author">
                <div className="av" style={{ background: test.bg }}>
                  {test.av}
                </div>
                <div>
                  <div className="test-name">{test.name}</div>
                  <div className="test-role">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="cta-glow" />
        <div
          className="cta-spinner animate-spin-slow"
          style={{
            width: 110,
            height: 110,
            borderRadius: 20,
            border: "2px solid rgba(245,158,11,0.18)",
          }}
        />
        <div className="reveal" style={{ position: "relative", zIndex: 2 }}>
          <h2 className="cta-title">
            Complete customer
            <br />
            intelligence
          </h2>
          <p className="cta-sub">Connect safely with every genuine identity.</p>
        </div>
        <div
          className="cta-btns reveal d2"
          style={{ position: "relative", zIndex: 2 }}
        >
          <a href="#" className="btn-primary magnetic-btn">
            Get a demo →
          </a>
          <a href="#" className="btn-outline-white magnetic-btn">
            See pricing
          </a>
        </div>
      </section>
    </>
  );
}
