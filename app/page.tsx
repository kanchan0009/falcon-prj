"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function AIConsultingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeExpert, setActiveExpert] = useState<number | null>(null);
  const [counts, setCounts] = useState({
    consultants: 0,
    satisfaction: 0,
    cases: 0,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scroll reveal
    const srEls = document.querySelectorAll(".sr, .sr-l, .sr-r, .sr-scale");
    const srObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            srObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    srEls.forEach((el) => srObs.observe(el));

    // Count-up animation
    const targets = { consultants: 200, satisfaction: 100, cases: 1 };
    const countEls = document.querySelectorAll(".count-up");
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const key = e.target.getAttribute(
              "data-key",
            ) as keyof typeof targets;
            const target = targets[key];
            let i = 0;
            const step = target / 60;
            const timer = setInterval(() => {
              i = Math.min(i + step, target);
              setCounts((prev) => ({ ...prev, [key]: Math.floor(i) }));
              if (i >= target) clearInterval(timer);
            }, 1600 / 60);
            countObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    countEls.forEach((el) => countObs.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      srObs.disconnect();
      countObs.disconnect();
    };
  }, []);

  const services = [
    {
      title: "AI-Consulting\nOfferings",
      description: "Credibly innovate granular internal or organic sources",
      icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    },
    {
      title: "Business Process\nAutomation",
      description:
        "Streamline operations with intelligent automation solutions",
      icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    },
    {
      title: "Secure AI\nImplementation",
      description: "Enterprise-grade security for AI deployments and systems",
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    },
    {
      title: "Knowledge\nCentralization",
      description: "Unify data sources for intelligent insights and decisions",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    },
    {
      title: "AI\nImplementation",
      description: "End-to-end AI solution deployment and integration",
      icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    },
    {
      title: "Data Analytics\n& Insights",
      description: "Transform raw data into actionable business intelligence",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    },
  ];

  const experts = [
    {
      initials: "SD",
      name: "Saskia Daly",
      title: "Founder",
      gradient: "from-[#1a2d5a] to-[#2d4a8a]",
      description:
        "Visionary leader with 15+ years of experience in strategic planning and business development. Passionate about driving innovation and building high-performance teams.",
    },
    {
      initials: "SW",
      name: "Shayne Wallace",
      title: "IT Manager",
      gradient: "from-[#2d4a8a] to-[#3a5fa0]",
      description:
        "Technology expert specializing in cloud infrastructure and cybersecurity. Led digital transformation initiatives for Fortune 500 companies.",
    },
    {
      initials: "NA",
      name: "Niko Anderson",
      title: "CTO",
      gradient: "from-[#4a5568] to-[#6b7a94]",
      description:
        "Chief Technology Officer with deep expertise in AI/ML, software architecture, and emerging technologies.",
    },
    {
      initials: "EM",
      name: "Emma Mitchell",
      title: "Design Lead",
      gradient: "from-[#E84A1A] to-[#ff6b3d]",
      description:
        "Creative director with award-winning portfolio in UX/UI design. Specializes in creating intuitive digital experiences.",
    },
    {
      initials: "JR",
      name: "James Rodriguez",
      title: "Marketing Director",
      gradient: "from-[#0d1b3e] to-[#1a2d5a]",
      description:
        "Results-driven marketing strategist with proven track record in brand growth and digital marketing campaigns.",
    },
    {
      initials: "LC",
      name: "Lisa Chen",
      title: "Operations Manager",
      gradient: "from-[#6b7a94] to-[#8b9aae]",
      description:
        "Operations excellence expert focused on process optimization. Certified Six Sigma Black Belt with global experience.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We dive deep into your business goals, challenges, and existing systems to understand the full picture.",
    },
    {
      num: "02",
      title: "Strategy",
      desc: "Our experts craft a tailored AI roadmap aligned with your business objectives and technical constraints.",
    },
    {
      num: "03",
      title: "Design",
      desc: "We architect the solution with scalability and security in mind, prototyping key components first.",
    },
    {
      num: "04",
      title: "Build",
      desc: "Agile development sprints deliver working software iteratively with continuous feedback loops.",
    },
    {
      num: "05",
      title: "Launch",
      desc: "We deploy, monitor, and fine-tune your solution — then support you as you scale with confidence.",
    },
  ];

  return (
    <>
      <Head>
        <title>Falcon Tech — AI Consulting Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        /* Scroll reveal */
        .sr {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }
        .sr-l {
          opacity: 0;
          transform: translateX(-36px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }
        .sr-r {
          opacity: 0;
          transform: translateX(36px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }
        .sr-scale {
          opacity: 0;
          transform: scale(0.88);
          transition:
            opacity 0.6s ease,
            transform 0.6s ease;
        }
        .sr.in,
        .sr-l.in,
        .sr-r.in,
        .sr-scale.in {
          opacity: 1;
          transform: none;
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

        @keyframes floatBadge {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .float-badge {
          animation: floatBadge 3s ease-in-out infinite;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Service card bottom bar */
        .service-card {
          transition:
            transform 0.28s,
            box-shadow 0.28s,
            border-color 0.28s;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #e84a1a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .service-card:hover::before {
          transform: scaleX(1);
        }

        /* Scrollbar hide */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Mobile menu slide */
        .mobile-nav {
          animation: slideDown 0.28s ease both;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 3px;
        }
        ::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
        ::-webkit-scrollbar-thumb {
          background: #e84a1a;
          border-radius: 2px;
        }
      `}</style>

      <div className="bg-white text-[#1a1a2e] leading-relaxed overflow-x-hidden">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          id="about"
          className="relative min-h-[100svh] flex items-center pt-16 overflow-hidden"
          style={{
            background: `linear-gradient(to right, rgba(8,15,35,.94) 45%, rgba(8,15,35,.6) 100%), url('https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80') center/cover no-repeat`,
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(232,74,26,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,74,26,.04) 1px,transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Glow */}
          <div
            className="absolute top-1/4 right-1/4 w-[360px] h-[360px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232,74,26,.14) 0%, transparent 70%)",
            }}
          />

          <div className="max-w-[1180px] mx-auto px-5 sm:px-9 relative z-[2] w-full py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-12">
              {/* Left text */}
              <div>
                <div
                  className="inline-flex items-center gap-2 text-[#E84A1A] font-bold tracking-widest uppercase mb-4 sr"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "clamp(18px,3vw,26px)",
                  }}
                >
                  <span className="w-7 h-0.5 bg-[#E84A1A]" />
                  FALCON TECH
                  <span className="w-7 h-0.5 bg-[#E84A1A]" />
                </div>
                <h1
                  className="text-white leading-none mb-5 tracking-tight sr d1"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(44px,8vw,72px)",
                  }}
                >
                  Don't Just Market
                  <br />
                  <span className="text-[#E84A1A]">Dominate</span>
                </h1>
                <p
                  className="text-white/70 leading-relaxed max-w-[420px] mb-8 sr d2"
                  style={{ fontSize: "clamp(14px,1.6vw,16px)" }}
                >
                  At Falcon Tech Nepal, we create bold strategies that cut
                  through the noise and deliver real results. Stand out. Be
                  exceptional.
                </p>
                <div className="flex flex-wrap gap-3 sr d3">
                  <button className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#E84A1A] text-white rounded text-[13px] font-bold tracking-wide uppercase hover:bg-[#c93d10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,74,26,.4)] active:scale-[.97] transition-all">
                    Hire Us →
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-7 py-3 bg-transparent text-white border border-white/25 rounded text-[13px] font-bold tracking-wide uppercase hover:bg-white/8 hover:-translate-y-0.5 transition-all">
                    Our Work
                  </button>
                </div>
              </div>

              {/* Right card */}
              <div className="relative flex items-center justify-center sr-r d1">
                <div
                  className="w-full max-w-[460px] aspect-[4/3] rounded-[18px] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,.4)] relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg,rgba(232,74,26,.12),rgba(13,27,62,.6)),url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80') center/cover`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(13,27,62,.7)]" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white/50 text-[11px] font-bold tracking-widest uppercase mb-1">
                      Build With
                    </div>
                    <div
                      className="text-white font-black tracking-tight"
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: "clamp(28px,5vw,42px)",
                      }}
                    >
                      Creation and AI
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -top-4 -right-2 sm:right-0 bg-white/8 backdrop-blur-md border border-white/15 rounded-[14px] px-4 sm:px-6 py-3 sm:py-4 text-center float-badge">
                  <div
                    className="text-white font-black leading-none"
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "clamp(32px,5vw,48px)",
                    }}
                  >
                    AI
                  </div>
                  <div
                    className="text-white/55 tracking-wide"
                    style={{ fontSize: 11 }}
                  >
                    Intelligence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ─────────────────────────────────────────── */}
        <div className="relative z-10 -mt-1">
          <div className="bg-[#0d1b3e] py-8 sm:py-10 px-6 sm:px-16 grid grid-cols-3 max-w-[860px] mx-auto sm:rounded-t-2xl shadow-[0_16px_56px_rgba(0,0,0,.18)] sr">
            {[
              {
                key: "consultants",
                suffix: "+",
                label: "Specialised Consultants",
                icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z",
              },
              {
                key: "satisfaction",
                suffix: "%",
                label: "Customer Satisfaction",
                icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
              },
              {
                key: "cases",
                suffix: "K+",
                label: "Completed Cases",
                icon: "M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center relative ${i > 0 ? "before:content-[''] before:absolute before:left-0 before:top-[15%] before:bottom-[15%] before:w-px before:bg-white/12" : ""}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 sm:w-10 sm:h-10 stroke-white/60 fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round mx-auto mb-2"
                >
                  <path d={stat.icon} />
                </svg>
                <div
                  className="text-white font-black leading-none"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: "clamp(28px,5vw,52px)",
                  }}
                >
                  <span className="count-up" data-key={stat.key}>
                    {counts[stat.key as keyof typeof counts]}
                  </span>
                  {stat.suffix}
                </div>
                <div
                  className="text-white/50 font-semibold tracking-wide uppercase mt-1"
                  style={{ fontSize: "clamp(9px,1.2vw,12px)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── About ─────────────────────────────────────────────── */}
        <section id="about-detail" className="py-16 sm:py-24 md:py-[100px]">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Photo */}
              <div className="relative flex justify-center sr-l">
                <div className="w-full max-w-[360px] sm:max-w-[420px] rounded-[40%_60%_60%_40%/50%_50%_50%_50%] overflow-hidden shadow-[0_16px_56px_rgba(0,0,0,.18)] aspect-square">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80')] bg-center bg-cover" />
                </div>
                {/* Float badge */}
                <div className="absolute -bottom-4 right-4 sm:right-8 bg-[#E84A1A] text-white rounded-xl px-4 py-3 shadow-[0_8px_28px_rgba(232,74,26,.45)] flex items-center gap-2 float-badge">
                  <div>
                    <div
                      className="font-black leading-none"
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: 26,
                      }}
                    >
                      3+
                    </div>
                    <div className="text-[10px] font-bold tracking-wide">
                      Years of
                      <br />
                      Experience
                    </div>
                  </div>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,.85)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </div>
              </div>

              {/* Text */}
              <div className="sr-r d1">
                <div className="inline-flex items-center gap-2 text-[#E84A1A] text-[11px] font-bold tracking-widest uppercase mb-2">
                  <span className="w-6 h-0.5 bg-[#E84A1A]" /> About Us
                </div>
                <h2
                  className="text-[#0d1b3e] leading-tight mb-3"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(32px,5vw,52px)",
                  }}
                >
                  Who We Are
                </h2>
                <div className="w-10 h-[3px] bg-[#E84A1A] rounded-sm mb-5" />
                <p
                  className="text-[#6b7a94] leading-relaxed mb-4"
                  style={{ fontSize: "clamp(14px,1.5vw,15px)" }}
                >
                  Credibly innovate granular internal or organic sources whereas
                  high standards in web-readiness. Energistically scale
                  future-proof core competencies vis-a-vis impactful
                  experiences.
                </p>
                <p
                  className="text-[#6b7a94] leading-relaxed mb-7"
                  style={{ fontSize: "clamp(14px,1.5vw,15px)" }}
                >
                  We provide clients with everything they need — from full-stack
                  development to sophisticated design — supported long after
                  launch day.
                </p>
                <button className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#E84A1A] text-white rounded text-[13px] font-bold tracking-wide uppercase hover:bg-[#c93d10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,74,26,.4)] active:scale-[.97] transition-all">
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ──────────────────────────────────────────── */}
        <section
          id="services"
          className="py-16 sm:py-24 md:py-[90px] bg-[#f8f9fa]"
        >
          <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start mb-12">
              <div className="sr-l">
                <div
                  className="inline-flex items-center gap-2 text-[#E84A1A] font-bold tracking-widest uppercase mb-3"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontSize: 20,
                  }}
                >
                  <span className="w-6 h-0.5 bg-[#E84A1A]" /> What We Do
                  <span className="w-6 h-0.5 bg-[#E84A1A]" />
                </div>
                <h2
                  className="text-[#0d1b3e] leading-tight mb-3"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(28px,4vw,44px)",
                  }}
                >
                  Our Services
                </h2>
                <div className="w-10 h-[3px] bg-[#E84A1A] rounded-sm mb-4" />
                <p className="text-[#6b7a94] leading-relaxed text-[14px] mb-6 max-w-[480px]">
                  We provide clients with everything they need to have an
                  effective e-commerce or product solution. Full-stack
                  development, custom WordPress, sophisticated design, and much
                  more.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#E84A1A] text-white rounded text-[13px] font-bold tracking-wide uppercase hover:bg-[#c93d10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,74,26,.4)] transition-all"
                >
                  View All Services →
                </Link>
              </div>

              {/* Mobile: show description differently */}
              <div className="hidden lg:block sr-r d1 text-[#6b7a94] text-[14px] leading-relaxed">
                Most importantly, the launch of your website is not the finish
                line — it's the beginning. We support our clients, helping them
                test, interpret data and continue to evolve with their market.
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc, i) => (
                <div
                  key={i}
                  className={`service-card bg-white border-[1.5px] border-[#e1e5ec] rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,.07)] hover:-translate-y-[5px] hover:shadow-[0_8px_28px_rgba(0,0,0,.1)] sr d${(i % 3) + 1}`}
                >
                  <div className="w-12 h-12 mb-4 rounded-lg bg-[#fff3ef] flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E84A1A"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <path d={svc.icon} />
                    </svg>
                  </div>
                  <div className="text-[15px] font-extrabold text-[#0d1b3e] mb-2 leading-tight whitespace-pre-line">
                    {svc.title}
                  </div>
                  <div className="text-[13px] text-[#6b7a94] leading-relaxed">
                    {svc.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experts ───────────────────────────────────────────── */}
        <section id="experts" className="py-16 sm:py-24 md:py-[90px]">
          <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
            <div className="text-center mb-12 sr">
              <h2
                className="text-[#0d1b3e] leading-tight mb-1"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(32px,5vw,48px)",
                }}
              >
                Our Experts
              </h2>
              <div className="w-10 h-[3px] bg-[#E84A1A] rounded-sm mx-auto my-3" />
              <p className="text-[#6b7a94] text-[14px] max-w-[360px] mx-auto">
                Meet the passionate team behind Falcon Tech's award-winning
                work.
              </p>
            </div>

            {/* Scrollable row on mobile, grid on desktop */}
            <div className="relative group">
              {/* Scroll buttons */}
              <button
                onClick={() =>
                  document
                    .getElementById("expert-carousel")
                    ?.scrollBy({ left: -280, behavior: "smooth" })
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg hidden md:flex items-center justify-center text-[#E84A1A] hover:bg-[#E84A1A] hover:text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("expert-carousel")
                    ?.scrollBy({ left: 280, behavior: "smooth" })
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 bg-white rounded-full shadow-lg hidden md:flex items-center justify-center text-[#E84A1A] hover:bg-[#E84A1A] hover:text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div
                id="expert-carousel"
                className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
              >
                {experts.map((exp, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[calc(50%-8px)] sm:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] min-w-[150px] text-center cursor-pointer"
                    onClick={() =>
                      setActiveExpert(activeExpert === i ? null : i)
                    }
                  >
                    {/* Avatar */}
                    <div
                      className={`w-full aspect-square rounded-[20px] mx-auto mb-3 overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,.12)] border-[3px] transition-all duration-300 ${activeExpert === i ? "border-[#E84A1A] shadow-[0_10px_36px_rgba(232,74,26,.25)]" : "border-white outline outline-[2px] outline-[#e1e5ec]"}`}
                    >
                      <div
                        className={`w-full h-full flex items-center justify-center text-white font-black bg-gradient-to-br ${exp.gradient} transition-transform duration-300 hover:scale-105`}
                        style={{
                          fontFamily: "'Barlow Condensed',sans-serif",
                          fontSize: "clamp(28px,5vw,52px)",
                        }}
                      >
                        {exp.initials}
                      </div>
                    </div>
                    <div
                      className={`font-extrabold text-[14px] mb-0.5 transition-colors ${activeExpert === i ? "text-[#E84A1A]" : "text-[#0d1b3e]"}`}
                    >
                      {exp.name}
                    </div>
                    <div className="text-[12px] text-[#E84A1A] font-semibold mb-2">
                      {exp.title}
                    </div>
                    {/* Expandable description */}
                    <div
                      className={`text-[12px] text-[#6b7a94] leading-relaxed overflow-hidden transition-all duration-400 text-left bg-[#f8f9fa] rounded-lg px-3 ${activeExpert === i ? "max-h-[160px] opacity-100 py-2.5 mt-1" : "max-h-0 opacity-0 py-0"}`}
                    >
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────── */}
        <section
          id="process"
          className="py-16 sm:py-24 md:py-[90px] bg-[#f8f9fa]"
        >
          <div className="max-w-[1180px] mx-auto px-5 sm:px-9">
            <div className="text-center mb-12 sr">
              <h2
                className="text-[#0d1b3e] leading-tight mb-1"
                style={{
                  fontFamily: "'Barlow Condensed',sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(32px,5vw,48px)",
                }}
              >
                Our Process
              </h2>
              <div className="w-10 h-[3px] bg-[#E84A1A] rounded-sm mx-auto mt-3" />
            </div>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:grid grid-cols-5 gap-0 relative">
              <div className="absolute top-[38px] left-[10%] right-[10%] h-0.5 bg-[#e1e5ec] z-0" />
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="text-center relative z-[1] px-4 cursor-pointer sr d1"
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => {}}
                >
                  <div
                    className={`font-black leading-none mb-2 transition-colors ${activeStep === i ? "text-[#E84A1A]" : "text-[#e1e5ec]"}`}
                    style={{
                      fontFamily: "'Barlow Condensed',sans-serif",
                      fontSize: "clamp(40px,5vw,64px)",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-[3px] border-white mx-auto mb-4 transition-all ${activeStep === i ? "bg-[#E84A1A] shadow-[0_0_0_4px_rgba(232,74,26,.22)]" : "bg-[#e1e5ec]"}`}
                  />
                  <div
                    className={`font-extrabold text-[16px] mb-2 transition-colors ${activeStep === i ? "text-[#E84A1A]" : "text-[#0d1b3e]"}`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-[13px] text-[#6b7a94] leading-relaxed transition-all duration-300 overflow-hidden ${activeStep === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: vertical accordion */}
            <div className="md:hidden space-y-3">
              {steps.map((step, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                  className={`rounded-xl border-[1.5px] overflow-hidden transition-all duration-300 cursor-pointer ${activeStep === i ? "border-[#E84A1A] shadow-[0_4px_20px_rgba(232,74,26,.12)]" : "border-[#e1e5ec] bg-white"}`}
                >
                  <div className="flex items-center gap-4 p-4">
                    <span
                      className={`font-black leading-none flex-shrink-0 transition-colors ${activeStep === i ? "text-[#E84A1A]" : "text-[#e1e5ec]"}`}
                      style={{
                        fontFamily: "'Barlow Condensed',sans-serif",
                        fontSize: 36,
                      }}
                    >
                      {step.num}
                    </span>
                    <span
                      className={`font-extrabold text-[15px] transition-colors ${activeStep === i ? "text-[#E84A1A]" : "text-[#0d1b3e]"}`}
                    >
                      {step.title}
                    </span>
                    <svg
                      className={`ml-auto w-5 h-5 flex-shrink-0 transition-transform ${activeStep === i ? "rotate-180 text-[#E84A1A]" : "text-[#9ca3af]"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {activeStep === i && (
                    <div className="px-4 pb-4 text-[13px] text-[#6b7a94] leading-relaxed border-t border-[#E84A1A]/20 pt-3">
                      {step.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Band ──────────────────────────────────────────── */}
        <section
          id="contact"
          className="relative py-16 sm:py-20 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0d1b3e 0%, #1a2d5a 100%)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(232,74,26,.08) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="max-w-[1180px] mx-auto px-5 sm:px-9 relative z-[2]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
              <div className="sr-l">
                <h2
                  className="text-white leading-tight mb-2"
                  style={{
                    fontFamily: "'Barlow Condensed',sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(30px,4.5vw,52px)",
                  }}
                >
                  Ready to <span className="text-[#E84A1A]">Dominate</span>?
                </h2>
                <p className="text-white/55 text-[14px] max-w-[420px]">
                  Let's build something exceptional together. Tell us about your
                  project.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 sr-r d1">
                <button className="inline-flex items-center gap-1.5 px-7 py-3.5 bg-[#E84A1A] text-white rounded text-[13px] font-bold tracking-wide uppercase hover:bg-[#c93d10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,74,26,.4)] transition-all">
                  Get a Free Quote
                </button>
                <button className="inline-flex items-center gap-1.5 px-7 py-3.5 bg-transparent text-white border border-white/25 rounded text-[13px] font-bold tracking-wide uppercase hover:bg-white/8 transition-all">
                  View Our Work
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
