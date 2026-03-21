// app/page.js (or pages/index.js)
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function FalconTechAbout() {
  const [openFaq, setOpenFaq] = useState(0);
  const [counts, setCounts] = useState({
    projects: 0,
    team: 0,
    customers: 0,
    years: 0,
  });

  useEffect(() => {
    // Scroll reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    document
      .querySelectorAll(".sr, .sr-l, .sr-r")
      .forEach((el) => io.observe(el));

    const barIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const targetEl = e.target as HTMLElement; // cast target
            targetEl.querySelectorAll(".skill-bar-fill").forEach((bar) => {
              const htmlBar = bar as HTMLElement;
              htmlBar.style.width = htmlBar.dataset.w || "0";
            });
            barIo.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    // Stat counters
    const statIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = {
              projects: 3,
              team: 200,
              customers: 350,
              years: 16,
            } as const; // make keys literal types

            (Object.keys(targets) as Array<keyof typeof targets>).forEach(
              (key) => {
                animateCount(key, targets[key]);
              },
            );

            statIo.unobserve(entry.target as Element); // ✅ cast to Element
          }
        });
      },
      { threshold: 0.4 },
    );

    const statsRow = document.querySelector(".stats-row");
    if (statsRow) statIo.observe(statsRow);

    // Parallax
    const handleScroll = () => {
      const s = window.scrollY;
      const dots = document.querySelector(".hero-dots") as HTMLElement | null;
      if (dots && s < window.innerHeight) {
        dots.style.transform = `translateY(${s * 0.08}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      io.disconnect();
      barIo.disconnect();
      statIo.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  type CountKeys = "projects" | "team" | "customers" | "years";

  const animateCount = (key: CountKeys, target: number) => {
    let current = 0;
    const step = Math.max(1, target / 50);

    const t = setInterval(() => {
      current = Math.min(current + step, target);

      setCounts((prev) => ({
        ...prev,
        [key]: Math.floor(current),
      }));

      if (current >= target) {
        setCounts((prev) => ({ ...prev, [key]: target }));
        clearInterval(t);
      }
    }, 28);
  };

  const services = [
    {
      num: "01",
      icon: "📝",
      title: "Content Marketing",
      body: "Strategic content creation that drives organic growth, builds authority, and connects your brand with the right audience at every stage of their journey.",
      featured: false,
      delay: "d1",
    },
    {
      num: "02",
      icon: "📱",
      title: "Social Media Marketing",
      body: "Full-service social media management, community building, and campaign execution that amplifies your reach and drives real engagement.",
      featured: true,
      delay: "d2",
    },
    {
      num: "03",
      icon: "🔍",
      title: "Search Engine Optimization",
      body: "Data-driven SEO strategies that deliver top rankings, increase organic traffic, and generate sustainable long-term growth for your business.",
      featured: false,
      delay: "d3",
    },
    {
      num: "04",
      icon: "💻",
      title: "Web Development",
      body: "Custom websites and web applications built with modern tech stacks — fast, secure, scalable, and designed to convert visitors into customers.",
      featured: false,
      delay: "d2",
    },
    {
      num: "05",
      icon: "🎨",
      title: "UI/UX Design",
      body: "Research-backed design systems and interfaces that balance aesthetic beauty with functional clarity — making complex products feel effortless.",
      featured: false,
      delay: "d3",
    },
    {
      num: "06",
      icon: "🏆",
      title: "Brand Strategy",
      body: "Comprehensive brand development from identity to positioning — crafting a distinctive voice and visual language that sets you apart in your market.",
      featured: false,
      delay: "d4",
    },
  ];

  const team = [
    {
      name: "Kartavya Basnet",
      role: "Lead Developer",
      bio: "Full-stack developer with a passion for clean architecture. Kartavya has led over 80 projects, championing best practices and innovative solutions.",
      featured: false,
      delay: "d1",
      img: "ph-pale",
    },
    {
      name: "Er. Sajeet Pokharel",
      role: "CEO & Founder",
      bio: "Visionary entrepreneur who founded FalconTech with the mission to democratize technology for businesses of all sizes across Nepal.",
      featured: true,
      delay: "d2",
      img: "ph-navy",
    },
    {
      name: "Ashok Kumar Mehta",
      role: "Operations Director",
      bio: "Strategic operations leader ensuring every project runs flawlessly — from discovery to deployment, zero compromise on quality.",
      featured: false,
      delay: "d3",
      img: "ph-light",
    },
    {
      name: "Saurab Singh Basnet",
      role: "UI/UX Designer",
      bio: "Award-winning designer who transforms complex user journeys into elegant, intuitive interfaces that users love and clients rave about.",
      featured: false,
      delay: "d1",
      img: "ph-mid",
    },
    {
      name: "Raaz Shrestha",
      role: "Digital Strategist",
      bio: "Data-driven strategist who turns analytics into actionable roadmaps with a track record of growing brand visibility and ROI.",
      featured: false,
      delay: "d2",
      img: "ph-navy2",
    },
    {
      name: "Krisha Karki",
      role: "Content Lead",
      bio: "Creative storyteller translating brand voices into compelling content — leading strategy, copywriting, and editorial across all touchpoints.",
      featured: false,
      delay: "d3",
      img: "ph-pale",
    },
    {
      name: "Prithvi Raj Pant",
      role: "Backend Engineer",
      bio: "Systems engineer specializing in scalable APIs and cloud infrastructure. Every product Prithvi builds is fast, secure, and built to grow.",
      featured: false,
      delay: "d1",
      img: "ph-blue",
    },
    {
      name: "Sijal Karki",
      role: "Brand Designer",
      bio: "Visual identity specialist crafting brand systems with soul — spanning logos, typography systems, brand guidelines, and motion graphics.",
      featured: false,
      delay: "d2",
      img: "ph-light",
    },
    {
      name: "Samit Panthee",
      role: "CTO",
      bio: "Technology visionary driving FalconTech's engineering culture with deep expertise in distributed systems, AI integration, and product engineering at scale.",
      featured: true,
      delay: "d3",
      img: "ph-navy",
    },
    {
      name: "Simran Shrestha",
      role: "Project Manager",
      bio: "Certified project manager who keeps teams aligned and timelines intact. Simran brings calm, structure, and precision to every engagement.",
      featured: false,
      delay: "d1",
      img: "ph-mid",
    },
    {
      name: "Saurav Raj Pant",
      role: "Mobile Developer",
      bio: "Flutter and React Native expert crafting seamless mobile experiences. Saurav has shipped apps across Nepal and internationally with hundreds of thousands of active users.",
      featured: false,
      delay: "d2",
      img: "ph-blue",
      wide: true,
    },
    {
      name: "Jenuine Karki",
      role: "Social Media Manager",
      bio: "Social media strategist building communities and amplifying brand stories. Campaigns that have generated millions of organic impressions.",
      featured: false,
      delay: "d3",
      img: "ph-pale",
    },
    {
      name: "Sansar Maharjan",
      role: "DevOps Engineer",
      bio: "Infrastructure specialist ensuring zero-downtime releases. Sansar architects CI/CD pipelines, monitoring stacks, and cloud environments.",
      featured: false,
      delay: "d1",
      img: "ph-light",
    },
    {
      name: "Rohan Sunuwar",
      role: "Graphic Designer",
      bio: "Multi-disciplinary visual designer with expertise in print and digital. Rohan brings brands to life through powerful visual storytelling and meticulous craft.",
      featured: true,
      delay: "d2",
      img: "ph-navy2",
    },
    {
      name: "Anuj Thapa",
      role: "SEO Specialist",
      bio: "Search engine strategist with a data-first approach. Anuj's organic campaigns consistently deliver top-3 rankings and sustainable traffic growth.",
      featured: false,
      delay: "d3",
      img: "ph-mid",
    },
    {
      name: "Sikum Lungphuwa",
      role: "Video Producer",
      bio: "Award-winning video producer creating compelling brand films, product demos, and visual stories that capture attention and drive engagement.",
      featured: false,
      delay: "d1",
      img: "ph-pale",
    },
  ];

  const faqs = [
    {
      q: "Why choose us?",
      a: "FalconTech Nepal provides cutting-edge solutions tailored to your needs. With 15+ years of experience and a dedicated team of 50+ experts, we deliver results that transform businesses. Our client-first approach means personalized attention, not a template.",
    },
    {
      q: "What services does Falcon Tech Nepal offer?",
      a: "We offer a full spectrum of digital services including web development, UI/UX design, mobile app development, software consulting, SEO strategy, digital marketing, content creation, multimedia production, and ongoing technical support.",
    },
    {
      q: "How do I get started with a solution?",
      a: "Getting started is simple — reach out via our contact page, schedule a free discovery call, and we'll put together a customized proposal. From there, our team will onboard you smoothly within 48 hours.",
    },
    {
      q: "Do you offer custom software development?",
      a: "Absolutely. Our engineering team specializes in bespoke software solutions — from enterprise systems to lightweight SaaS tools — built with your exact requirements, scalability, and budget in mind.",
    },
    {
      q: "Can you manage my existing website or app?",
      a: "Yes! We offer comprehensive management and maintenance packages for existing websites and applications, including updates, performance optimization, security audits, and feature expansion.",
    },
    {
      q: "How can I run my privacy needs?",
      a: "We take data privacy very seriously. All client data is handled under strict confidentiality agreements and we comply with relevant data protection regulations. You retain full ownership of your data at all times.",
    },
  ];

  const marqueeItems = [
    "Digital Marketing",
    "Content Marketing",
    "Social Media Marketing",
    "Search Engine Optimization",
    "Web Development",
    "UI/UX Design",
    "Brand Strategy",
  ];

  return (
    <>
      <Head>
        <title>FalconTech — About & Team</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        :root {
          --orange: #f97316;
          --orange-dark: #ea6500;
          --orange-light: #fff4ec;
          --orange-glow: rgba(249, 115, 22, 0.15);
          --navy: #0d1b3e;
          --navy-mid: #162852;
          --navy-light: #1e3570;
          --navy-pale: #eef2fb;
          --white: #ffffff;
          --off-white: #f8f9fc;
          --text-muted: #64748b;
          --text-light: #94a3b8;
          --border: #e2e8f0;
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .font-manrope {
          font-family: "Manrope", sans-serif;
        }
        .font-playfair {
          font-family: "Playfair Display", serif;
        }

        @keyframes heroIn {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes lineW {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
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
        @keyframes floatY {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes rotateSlow {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulseDot {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
        }
        @keyframes badgePop {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .sr {
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 0.8s var(--ease),
            transform 0.8s var(--ease);
        }
        .sr.on {
          opacity: 1;
          transform: translateY(0);
        }
        .sr-l {
          opacity: 0;
          transform: translateX(-40px);
          transition:
            opacity 0.8s var(--ease),
            transform 0.8s var(--ease);
        }
        .sr-l.on {
          opacity: 1;
          transform: translateX(0);
        }
        .sr-r {
          opacity: 0;
          transform: translateX(40px);
          transition:
            opacity 0.8s var(--ease),
            transform 0.8s var(--ease);
        }
        .sr-r.on {
          opacity: 1;
          transform: translateX(0);
        }
        .d1 {
          transition-delay: 0.08s !important;
        }
        .d2 {
          transition-delay: 0.16s !important;
        }
        .d3 {
          transition-delay: 0.24s !important;
        }
        .d4 {
          transition-delay: 0.32s !important;
        }
        .d5 {
          transition-delay: 0.4s !important;
        }
        .d6 {
          transition-delay: 0.48s !important;
        }

        .animate-heroIn {
          animation: heroIn 0.9s var(--ease) both;
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease 0.3s both;
        }
        .animate-lineW {
          animation: lineW 0.8s 0.9s var(--ease) both;
          transform-origin: left;
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
        .animate-floatY {
          animation: floatY 5s ease-in-out infinite;
        }
        .animate-rotateSlow {
          animation: rotateSlow 8s linear infinite;
        }
        .animate-pulseDot {
          animation: pulseDot 2s infinite;
        }
        .animate-badgePop {
          animation: badgePop 0.6s 0.2s var(--spring) both;
        }

        /* Image placeholders */
        .ph-navy {
          background: linear-gradient(145deg, #0d1b3e, #1e3570);
          color: rgba(255, 255, 255, 0.18);
        }
        .ph-navy2 {
          background: linear-gradient(145deg, #162852, #243d80);
          color: rgba(255, 255, 255, 0.15);
        }
        .ph-blue {
          background: linear-gradient(145deg, #1e3570, #2a4a92);
          color: rgba(255, 255, 255, 0.18);
        }
        .ph-pale {
          background: linear-gradient(145deg, #c8d5f0, #afc0e0);
          color: rgba(13, 27, 62, 0.2);
        }
        .ph-light {
          background: linear-gradient(145deg, #dce6f8, #c8d8f0);
          color: rgba(13, 27, 62, 0.18);
        }
        .ph-mid {
          background: linear-gradient(145deg, #b8cce8, #a0bcd8);
          color: rgba(13, 27, 62, 0.2);
        }

        /* Button hover effects */
        .btn-orange svg {
          transition: transform 0.3s ease;
        }
        .btn-orange:hover svg {
          transform: translateX(4px);
        }

        /* Service card effects */
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            var(--orange-glow),
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .service-card:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(249, 115, 22, 0.3);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }
        .service-card:hover .sc-icon-wrap {
          transform: scale(1.1) rotate(-5deg);
        }
        .service-card:hover .sc-hover-line {
          transform: scaleX(1);
        }

        /* Team card effects */
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 56px rgba(13, 27, 62, 0.12);
          border-color: rgba(249, 115, 22, 0.2);
        }
        .team-card:hover .tc-img-overlay {
          opacity: 1;
        }
        .team-card:hover .tc-bar {
          transform: scaleX(1);
        }
        .tc-social:hover {
          background: var(--orange);
          border-color: var(--orange);
          color: #fff;
          transform: scale(1.15);
        }

        /* FAQ effects */
        .faq-item.open .faq-icon {
          background: var(--orange);
          border-color: var(--orange);
          color: #fff;
          transform: rotate(45deg);
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            min-height: auto;
          }
          .about-grid {
            grid-template-columns: 1fr;
            gap: 50px;
            padding: 80px 40px;
          }
          .about-imgs {
            display: none;
          }
          .faq-grid {
            grid-template-columns: 1fr;
            padding: 80px 40px;
          }
          .faq-visual {
            display: none;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .team-wide {
            grid-column: span 1;
          }
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .services-header {
            grid-template-columns: 1fr;
          }
          .cta-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .hero-left {
            padding: 60px 24px 40px;
          }
          .hero-right {
            padding: 0 24px 40px;
            grid-template-rows: 280px 180px;
          }
          .team-grid,
          .services-grid {
            grid-template-columns: 1fr;
          }
          .cta-navy,
          .cta-orange {
            padding: 50px 28px;
          }
          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .about-section,
          .team-section,
          .services-section,
          .faq-section {
            padding: 60px 24px;
          }
        }
      `}</style>

      <div className="font-manrope bg-white text-[#0d1b3e] overflow-x-hidden">
        {/* ════════════════ HERO ════════════════ */}
        {/* ════════════════ HERO ════════════════ */}
        <section className="hero-grid flex flex-col lg:flex-row gap-0 items-stretch min-h-[92vh] relative overflow-hidden bg-[#f8f9fc]">
          <div className="hero-dots absolute inset-0 pointer-events-none z-0 animate-fadeIn bg-[radial-gradient(circle,rgba(13,27,62,0.07)_1px,transparent_1px)] bg-[length:32px_32px]" />
          <div className="absolute -top-[150px] -left-[60px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.06),transparent_70%)] pointer-events-none z-0" />

          {/* LEFT SIDE (TEXT) */}
          <div className="hero-left w-full lg:w-[55%] relative z-[2] px-20 py-[90px] pb-20 flex flex-col justify-center lg:px-10 lg:py-16 md:px-6 md:py-10">
            <div className="inline-flex items-center gap-1.5 bg-[#fff4ec] border border-[rgba(249,115,22,0.25)] text-[#ea6500] text-[11px] font-bold tracking-[0.12em] uppercase px-3.5 py-1 rounded-full mb-7 animate-badgePop">
              <span className=" rounded-full bg-[#f97316] animate-pulseDot" />
              Elevate Your Brand With Us
            </div>

            <h1 className="font-playfair font-extrabold text-[clamp(38px,4.5vw,64px)] leading-[1.02] tracking-[-0.03em] text-[#0d1b3e] mb-6">
              <span className="block overflow-hidden">
                <span
                  className="block animate-heroIn"
                  style={{ animationDelay: "0.35s" }}
                >
                  Empowering Your
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block animate-heroIn"
                  style={{ animationDelay: "0.5s" }}
                >
                  Success with
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="block animate-heroIn italic text-[#f97316]"
                  style={{ animationDelay: "0.65s" }}
                >
                  Digital Expertise
                </span>
              </span>
            </h1>

            <p
              className="text-[15px] font-normal leading-[1.8] text-[#64748b] max-w-[420px] mb-10 animate-heroIn opacity-0"
              style={{ animationDelay: "0.85s" }}
            >
              FalconTech helps you discover how incredibly easy it is to
              streamline your workflow, sharpen your skills, and achieve your
              milestones. We empower you to feel inspired and grow continuously.
            </p>

            <div
              className="flex items-center gap-4 flex-wrap animate-heroIn opacity-0 md:flex-col md:items-start"
              style={{ animationDelay: "1s" }}
            >
              <Link
                href="#about"
                className="btn-orange inline-flex items-center gap-2 bg-[#f97316] text-white px-7 py-3 rounded-full text-[13px] font-bold tracking-[0.04em] no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_6px_24px_rgba(249,115,22,0.35)] hover:bg-[#ea6500] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(249,115,22,0.45)]"
              >
                Explore More
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 border-[1.5px] border-[#e2e8f0] text-[#0d1b3e] px-6 py-3 rounded-full text-[13px] font-semibold no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#f97316] hover:text-[#f97316] hover:-translate-y-0.5"
              >
                View All Services
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE (IMAGES) */}
          <div
            className="hero-right w-full lg:w-[45%] relative z-[2] grid grid-rows-[62%_38%] grid-cols-2 gap-2.5 p-6 pb-6 pl-0 animate-heroIn opacity-0 lg:p-5 lg:pb-10 md:grid-rows-[280px_180px] md:p-6 md:pb-10 md:pl-6"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="col-start-1 col-end-2 row-start-1 row-end-3 rounded-[20px] overflow-hidden shadow-[0_24px_60px_rgba(13,27,62,0.18)] relative">
              <div className="ph-navy2 w-full h-full min-h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.15em] uppercase">
                Team Photo
              </div>
              <div className="absolute bottom-5 -right-3.5 bg-[#f97316] text-white w-24 h-24 rounded-full flex flex-col items-center justify-center text-[10px] font-bold tracking-[0.08em] text-center shadow-[0_10px_32px_rgba(249,115,22,0.5)] animate-floatY z-[6] leading-tight">
                <div className="font-playfair text-2xl font-extrabold leading-none">
                  15+
                </div>
                <div className="text-[9px] tracking-[0.06em]">Yrs Exp</div>
              </div>
            </div>

            <div className="col-start-2 col-end-3 row-start-1 row-end-2 rounded-[20px] overflow-hidden shadow-[0_12px_30px_rgba(13,27,62,0.12)] relative">
              <div className="ph-light w-full h-full min-h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.15em] uppercase">
                Office Space
              </div>
            </div>

            <div className="col-start-2 col-end-3 row-start-2 row-end-3 rounded-[20px] overflow-hidden shadow-[0_12px_30px_rgba(13,27,62,0.12)] relative">
              <div className="ph-pale w-full h-full min-h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.15em] uppercase">
                Collaboration
              </div>
              <div className="hero-star absolute bottom-3.5 right-3.5 text-[22px] text-[#f97316] animate-rotateSlow pointer-events-none z-[5]">
                ✦
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════ MARQUEE ════════════════ */}
        <div
          className="bg-[#0d1b3e] py-4 overflow-hidden border-t border-white/5"
          aria-hidden="true"
        >
          <div className="flex whitespace-nowrap animate-marquee">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-4 px-8 flex-shrink-0 text-[13px] font-semibold tracking-[0.1em] uppercase text-white/60"
              >
                <span className="text-[#f97316] text-[10px]">✦</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ ABOUT ════════════════ */}
        <section
          className="about-grid about-section grid grid-cols-2 gap-20 items-center py-[110px] px-20 bg-white lg:py-20 lg:px-10 md:py-16 md:px-6"
          id="about"
        >
          <div className="sr-l about-imgs relative h-[500px] lg:hidden">
            <div className="absolute top-0 left-0 w-[60%] h-[68%] rounded-[20px] overflow-hidden shadow-[0_24px_60px_rgba(13,27,62,0.14)]">
              <div className="ph-navy2 w-full h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.15em] uppercase">
                Team at Work
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-[58%] h-[55%] rounded-[20px] overflow-hidden shadow-[0_16px_40px_rgba(13,27,62,0.1)] border-[5px] border-white">
              <div className="ph-pale w-full h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.15em] uppercase">
                Collaboration
              </div>
            </div>
            <div className="absolute top-[52%] -left-5 bg-[#f97316] text-white px-5 py-4 rounded-xl text-center z-[4] shadow-[0_10px_32px_rgba(249,115,22,0.4)] animate-floatY">
              <div className="font-playfair text-[30px] font-extrabold leading-none">
                10+
              </div>
              <div className="text-[10px] font-semibold tracking-[0.08em] uppercase opacity-88 mt-1">
                Years of
                <br />
                Experience
              </div>
            </div>
          </div>

          <div>
            <div className="sr inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#f97316] mb-4">
              <span className="w-5 h-0.5 bg-[#f97316] rounded-sm" />
              About Us
            </div>
            <h2 className="sr d1 font-playfair font-bold text-[clamp(34px,3.5vw,52px)] leading-[1.08] tracking-[-0.02em] text-[#0d1b3e] mb-4">
              Empowering Your Success
              <br />
              with <em className="italic text-[#f97316]">Digital Expertise</em>
            </h2>
            <p className="sr d2 text-[15px] font-normal leading-[1.85] text-[#64748b] mb-8">
              FalconTech Nepal provides cutting-edge digital solutions tailored
              to your needs. With 15+ years of experience and a dedicated team
              of 50+ experts, we deliver results that transform businesses. Our
              client-first approach means personalized attention — not a
              template.
            </p>

            <div className="sr d3 skill-bars flex flex-col gap-4.5 mb-9">
              {[
                { name: "Marketing & Business Growth", pct: "65%" },
                { name: "Creativity & Innovation", pct: "90%" },
                { name: "Business & Financial Management", pct: "98%" },
              ].map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] font-semibold text-[#0d1b3e]">
                      {skill.name}
                    </span>
                    <span className="text-xs font-bold text-[#f97316]">
                      {skill.pct}
                    </span>
                  </div>
                  <div className="w-full h-[7px] rounded-full bg-[#eef2fb] overflow-hidden">
                    <div
                      className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-[#f97316] to-[#ea6500] w-0 transition-[width] duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      data-w={skill.pct}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#team"
              className="sr d4 btn-orange inline-flex items-center gap-2 bg-[#f97316] text-white px-7 py-3 rounded-full text-[13px] font-bold tracking-[0.04em] no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_6px_24px_rgba(249,115,22,0.35)] hover:bg-[#ea6500] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(249,115,22,0.45)] w-fit"
            >
              About Us
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Stats strip */}
        <div className="bg-[#f8f9fc] border-t border-[#e2e8f0] px-20 lg:px-10 md:px-6">
          <div className="stats-grid grid grid-cols-4 gap-5 py-0 lg:grid-cols-2">
            {[
              {
                num: counts.projects,
                suffix: "k+",
                label: "Successful Projects",
                key: "projects",
              },
              {
                num: counts.team,
                suffix: "+",
                label: "Expert Team",
                key: "team",
              },
              {
                num: counts.customers,
                suffix: "+",
                label: "Happy Customers",
                key: "customers",
              },
              {
                num: counts.years,
                suffix: "+",
                label: "Years of Experience",
                key: "years",
              },
            ].map((stat, i) => (
              <div key={i} className={`sr d${i + 1} py-8`}>
                <div className="font-playfair text-[36px] font-extrabold text-[#0d1b3e] leading-none flex items-baseline gap-1">
                  <span>{stat.num}</span>
                  <span className="text-[#f97316] font-manrope font-extrabold text-2xl">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-xs text-[#64748b] font-medium mt-1 tracking-[0.02em] flex items-center">
                  <span className="inline-flex w-2 h-2 rounded-full bg-[#f97316] mr-1.5 animate-pulseDot" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ SERVICES ════════════════ */}
        <section
          className="services-section bg-[#0d1b3e] py-[110px] px-20 relative overflow-hidden lg:py-20 lg:px-10 md:py-16 md:px-6"
          id="services"
        >
          <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:28px_28px]" />

          <div className="services-header grid grid-cols-[1fr_auto] items-end mb-16 relative z-[2] lg:grid-cols-1">
            <div>
              <div className="sr inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#f97316] mb-3">
                <span className="w-5 h-0.5 bg-[#f97316] rounded-sm" />
                Our Services
              </div>
              <h2 className="sr d1 font-playfair font-bold text-[clamp(34px,3.5vw,52px)] leading-[1.05] tracking-[-0.02em] text-white mb-3">
                Boost Your Brand
                <br />
                with <em className="italic text-[#f97316]">Our Expertise</em>
              </h2>
              <p className="sr d2 text-sm leading-[1.75] text-white/50 max-w-[380px] mt-3">
                Empowering businesses with tailored digital solutions — from
                creative content to technical excellence.
              </p>
            </div>
            <Link
              href="#"
              className="sr w-[200px] btn-orange inline-flex items-center gap-2 bg-[#f97316] text-white px-7 py-3 rounded-full text-[13px] font-bold tracking-[0.04em] no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_6px_24px_rgba(249,115,22,0.35)] hover:bg-[#ea6500] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(249,115,22,0.45)] flex-shrink-0 self-center lg:mt-5"
            >
              View All Services
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="services-grid grid grid-cols-3 gap-5 relative z-[2] lg:grid-cols-2 md:grid-cols-1">
            {services.map((service, i) => (
              <div
                key={i}
                className={`sr ${service.delay} service-card relative rounded-[20px] p-8 border overflow-hidden cursor-default transition-all duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${service.featured ? " featured" : "border-white/[0.07]: border-white/[0.07]"}`}
              >
                <div
                  className={`font-playfair absolute top-5 right-6 text-[38px] font-extrabold leading-none ${service.featured ? "text-white/[0.06]" : "text-white/[0.06]"}`}
                >
                  {service.num}
                </div>
                <div
                  className={`w-[50px] h-[50px] rounded-xl flex items-center justify-center text-[22px] mb-5 transition-transform duration-[0.4s] ease-[cubic-bezier(0.34,1.56,0.64,1)] sc-icon-wrap ${service.featured ? " featured" : "bg-white/[0.04]: border-white/[0.07]"}`}
                >
                  {service.icon}
                </div>
                <div
                  className={`text-[17px] font-bold mb-2.5 leading-[1.3] ${service.featured ? "text-white" : "text-white"}`}
                >
                  {service.title}
                </div>
                <div
                  className={`text-[13px] font-normal leading-[1.75] ${service.featured ? "text-white/50" : "text-white/50"}`}
                >
                  {service.body}
                </div>
                <Link
                  href="#"
                  className={`inline-flex items-center gap-1.5 mt-5 text-xs font-bold tracking-[0.04em] transition-[gap] duration-300 sc-link ${service.featured ? "text-[#f97316]" : "text-[#f97316]"}`}
                >
                  Learn More →
                </Link>
                <div
                  className={`sc-hover-line absolute bottom-0 left-0 right-0 h-[3px] origin-left transition-transform duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-0 ${service.featured ? "bg-white/40" : "bg-[#f97316]"}`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════ TEAM ════════════════ */}
        <section
          className="team-section bg-[#f8f9fc] py-[110px] px-20 relative overflow-hidden lg:py-20 lg:px-10 md:py-16 md:px-6"
          id="team"
        >
          <div className="absolute -right-[100px] top-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.05),transparent_70%)] pointer-events-none" />

          <div className="text-center mb-[70px]">
            <div className="sr inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#f97316] mb-3 justify-center">
              <span className="w-5 h-0.5 bg-[#f97316] rounded-sm" />
              Our Team
            </div>
            <h2 className="sr d1 font-playfair font-bold text-[clamp(34px,3.5vw,52px)] leading-[1.08] tracking-[-0.02em] text-[#0d1b3e] mb-3">
              Meet <em className="italic text-[#f97316]">Our People</em>
            </h2>
            <p className="sr d2 text-[15px] font-normal leading-[1.85] text-[#64748b] max-w-[500px] mx-auto">
              The brilliant minds behind FalconTech — passionate, driven, and
              committed to your success.
            </p>
          </div>

          <div className="team-grid grid grid-cols-3 gap-6 lg:grid-cols-2 md:grid-cols-1">
            {team.map((member, i) => (
              <div
                key={i}
                className={`sr ${member.delay} team-card bg-white rounded-[20px] max-w-[600px] overflow-hidden border border-[#e2e8f0] transition-all duration-[0.45s] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default relative ${member.featured ? "bg-[#0d1b3e] featured" : ""} ${member.wide ? "col-span-2 lg:col-span-1 team-wide" : ""}`}
              >
                <div className="w-full  h-[248px] overflow-hidden relative">
                  <div
                    className={`${member.img} w-full h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.15em] uppercase tc-img-ph`}
                  >
                    Photo
                  </div>
                  <div className="tc-img-overlay absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(13,27,62,0.4)] opacity-0 transition-opacity duration-[0.4s]" />
                  <div className="absolute top-3.5 right-3.5 bg-black/20 backdrop-blur-md text-white/75 text-[10px] font-bold tracking-[0.12em] px-2.5 py-1 rounded-full">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="p-5 pb-5">
                  <div
                    className={`font-playfair text-[19px] font-bold mb-1 ${member.featured ? "text-white" : "text-[#0d1b3e]"}`}
                  >
                    {member.name}
                  </div>
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#f97316] mb-3 flex items-center gap-1.5">
                    <span className="w-3.5 h-[1.5px] bg-[#f97316]" />
                    {member.role}
                  </div>
                  <div
                    className={`text-[13px] font-normal leading-[1.75] line-clamp-3 ${member.featured ? "text-white/55" : "text-[#64748b]"}`}
                  >
                    {member.bio}
                  </div>
                  <div className="flex gap-2 mt-4">
                    {["in", "tw", "gh"].map((social, j) => (
                      <Link
                        key={j}
                        href="#"
                        className={`w-[30px] h-[30px] rounded-full border flex items-center justify-center text-[11px] font-bold transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] no-underline ${member.featured ? "border-white/[0.15] text-white/60 hover:bg-[#f97316] hover:border-[#f97316] hover:text-white hover:scale-[1.15]" : "border-[#e2e8f0] text-[#0d1b3e] hover:bg-[#f97316] hover:border-[#f97316] hover:text-white hover:scale-[1.15]"}`}
                      >
                        {social}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="tc-bar absolute bottom-0 left-0 right-0 h-[3px] bg-[#f97316] origin-left transition-transform duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] scale-x-0" />
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════ FAQ ════════════════ */}
        <section
          className="faq-section faq-grid grid grid-cols-[400px_1fr] gap-20 items-start py-[110px] px-20 bg-white lg:grid-cols-1 lg:py-20 lg:px-10 md:py-16 md:px-6"
          id="faq"
        >
          <div>
            <div className="sr inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#f97316] mb-4">
              <span className="w-5 h-0.5 bg-[#f97316] rounded-sm" />
              Why Choose Us
            </div>
            <h2 className="sr d1 font-playfair font-bold text-[clamp(32px,3vw,46px)] leading-[1.1] tracking-[-0.02em] text-[#0d1b3e] mb-4">
              Why Choose
              <br />
              <em className="italic text-[#f97316]">Falcon Tech Nepal?</em>
            </h2>
            <p className="sr d2 text-[15px] leading-[1.8] text-[#64748b] mb-9">
              Everything you need to know about us, our services and how we work
              to drive real, measurable results for your business.
            </p>
            <div className="sr d3 faq-visual w-full aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_16px_40px_rgba(13,27,62,0.1)] lg:hidden">
              <div className="ph-navy2 w-full h-full flex items-center justify-center text-[10px] font-semibold tracking-[0.15em] uppercase">
                Our Team
              </div>
            </div>
          </div>

          <div className="sr d1 flex flex-col gap-0">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item border-b border-[#e2e8f0] overflow-hidden ${i === 0 ? "border-t" : ""} ${openFaq === i ? "open" : ""}`}
              >
                <div className="flex justify-between items-center py-5 gap-5 cursor-pointer text-[15px] font-semibold text-[#0d1b3e] transition-colors duration-300 hover:text-[#f97316]">
                  {faq.q}
                  <div
                    className={`w-[30px] h-[30px] rounded-full border-[1.5px] border-[#e2e8f0] flex items-center justify-center text-[15px] text-[#64748b] flex-shrink-0 transition-all duration-[0.35s] ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === i ? "bg-[#f97316] border-[#f97316] text-white rotate-45" : ""}`}
                  >
                    +
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-[max-height] duration-[0.45s] ease-[cubic-bezier(0.16,1,0.3,1)] ${openFaq === i ? "max-h-[160px]" : "max-h-0"}`}
                >
                  <div className="pb-4.5 text-sm leading-[1.8] text-[#64748b]">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════ CTA ════════════════ */}
        <div className="cta-grid grid grid-cols-2 lg:grid-cols-1">
          <div className="cta-navy sr bg-[#162852] px-[70px] py-20 relative overflow-hidden lg:px-10 lg:py-16 md:px-7 md:py-12">
            <div className="absolute -bottom-[70px] -right-[70px] w-[250px] h-[250px] rounded-full border-[44px] border-white/[0.04]" />
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/45 mb-3.5">
              Ready To Get Started?
            </div>
            <div className="font-playfair font-bold text-[clamp(32px,3vw,46px)] text-white leading-[1.1] tracking-[-0.02em] mb-4">
              Build With
              <br />
              The Best.
            </div>
            <p className="text-sm leading-[1.8] text-white/60 mb-9">
              Join thousands of businesses who trust FalconTech to turn their
              boldest ideas into powerful digital products that actually
              perform.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 bg-white text-[#0d1b3e] px-7 py-3 rounded-full text-[13px] font-bold no-underline transition-all duration-300 relative z-[2] hover:bg-[#f8f9fc] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            >
              Get Started
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="cta-orange sr d1 bg-[#f97316] px-[70px] py-20 relative overflow-hidden lg:px-10 lg:py-16 md:px-7 md:py-12">
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full border-[55px] border-white/[0.07]" />
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/45 mb-3.5">
              Join Our Community
            </div>
            <div className="font-playfair font-bold text-[clamp(32px,3vw,46px)] text-white leading-[1.1] tracking-[-0.02em] mb-4">
              Ready To
              <br />
              Join Us?
            </div>
            <p className="text-sm leading-[1.8] text-white/[0.84] mb-9">
              Exciting opportunities await ambitious, driven minds. Follow our
              journey and discover what it truly means to work at FalconTech.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 border-2 border-white/45 text-white px-7 py-3 rounded-full text-[13px] font-bold no-underline transition-all duration-300 relative z-[2] hover:bg-white/[0.12] hover:border-white hover:-translate-y-0.5"
            >
              Explore Careers
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
