"use client";
import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

export default function AIConsultingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [caseIdx, setCaseIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [activeExpert, setActiveExpert] = useState(null);
  const [counts, setCounts] = useState({
    consultants: 0,
    satisfaction: 0,
    cases: 0,
  });
  const countsRef = useRef({ consultants: 200, satisfaction: 100, cases: 1 });
  const caseTrackRef = useRef(null);

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
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );
    srEls.forEach((el) => srObs.observe(el));

    // Count-up animation
    const countEls = document.querySelectorAll(".count-up");
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = parseInt(
              e.target.getAttribute("data-target") || "0"
            );
            animateCount(
              target,
              e.target.classList.contains("consultants")
                ? "consultants"
                : e.target.classList.contains("satisfaction")
                ? "satisfaction"
                : "cases"
            );
            countObs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    countEls.forEach((el) => countObs.observe(el));

    // Auto-advance case studies
    const interval = setInterval(() => {
      setCaseIdx((prev) => (prev + 1) % 2);
    }, 5200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      srObs.disconnect();
      countObs.disconnect();
      clearInterval(interval);
    };
  }, []);

  const animateCount = (target, key) => {
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      setCounts((prev) => ({ ...prev, [key]: value }));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-5px) rotateX(${-y * 5}deg) rotateY(${
      x * 5
    }deg)`;
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <>
      <Head>
        <title>AI Consulting Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Barlow+Condensed:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .sr {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sr-l {
          opacity: 0;
          transform: translateX(-36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sr-r {
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .sr-scale {
          opacity: 0;
          transform: scale(0.88);
          transition: opacity 0.6s ease, transform 0.6s ease;
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

        .service-card {
          transition: transform 0.28s, box-shadow 0.28s, border-color 0.28s;
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

        .expert-card {
          transition: transform 0.28s;
        }
        .expert-card:hover {
          transform: translateY(-6px);
        }
        .expert-photo {
          transition: outline-color 0.3s;
        }
        .expert-card:hover .expert-photo {
          outline-color: #e84a1a;
        }

        .process-step {
          transition: all 0.3s;
        }
        .process-step.active .process-num {
          color: #e84a1a;
        }
        .process-step.active .process-step-dot {
          background: #e84a1a;
          box-shadow: 0 0 0 4px rgba(232, 74, 26, 0.22);
        }
        .process-step.active .process-step-title {
          color: #e84a1a;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="bg-white text-[#1a1a2e] text-[15px] leading-relaxed overflow-x-hidden">
        {/* Hero */}
        <section
          className="relative min-h-[400px] flex items-center pt-[66px] overflow-hidden"
          style={{
            background: `linear-gradient(to right, rgba(8,15,35,.92) 42%, rgba(8,15,35,.55) 100%), url('https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80') center/cover no-repeat`,
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(232,74,26,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,74,26,.04) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
          {/* Glowing accent */}
          <div
            className="absolute top-[20%] right-[28%] w-[420px] h-[420px] pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232,74,26,.15) 0%, transparent 70%)",
            }}
          ></div>

          <div className="max-w-[1180px] mx-auto px-9 relative z-[2] w-full">
            <div className="grid grid-cols-2 items-center gap-12">
              <div>
                <div className="inline-flex items-center gap-2 text-[32px] font-bold tracking-widest uppercase text-[#E84A1A] mb-4 sr">
                  <span className="w-8 h-0.5 bg-[#E84A1A] rounded-sm"></span>
                  FALCON
                  <span className="w-8 h-0.5 bg-[#E84A1A] rounded-sm"></span>
                </div>
                <h1 className="font-['Barlow_Condensed'] text-[68px] font-black text-white leading-none mb-5 tracking-tight sr d1">
                  Don't Just Market
                  <br />
                  <span className="text-[#E84A1A]">Dominate</span>
                </h1>
                <p className="text-[15px] text-white/70 leading-relaxed max-w-[420px] mb-8 sr d2">
                  At Falcon Tech Nepal, we create bold strategies that cut
                  through the noise and deliver real results. Stand out.
                  <br />
                  Be exceptional.
                </p>
                <button className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#E84A1A] text-white rounded text-[13px] font-bold tracking-wide uppercase hover:bg-[#c93d10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,74,26,.4)] active:scale-[0.97] transition-all sr d3">
                  Hire Us
                </button>
              </div>

              <div className="relative flex items-center justify-center p-5 sr-r d1">
                <div
                  className="w-full max-w-[480px] aspect-[4/3] rounded-[18px] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,.4)] relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(232,74,26,.12), rgba(13,27,62,.6)), url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80') center/cover`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(13,27,62,.7)]"></div>
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-5 py-2 text-white text-[13px] font-bold tracking-wide uppercase whitespace-nowrap">
                    <span className="font-['Barlow_Condensed'] text-[20px] font-black mr-2">
                      AI
                    </span>
                    Artificial Intelligence
                  </div>
                </div>
                <div className="absolute top-8 right-0 bg-white/7 backdrop-blur-md border border-white/12 rounded-[14px] px-6 py-4 text-center">
                  <div className="font-['Barlow_Condensed'] text-[48px] font-black text-white leading-none">
                    AI
                  </div>
                  <div className="text-[12px] text-white/60 tracking-wide">
                    Artificial Intelligence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <div className="relative z-10 -mt-16 pb-0">
          <div className="bg-[#0d1b3e] rounded-t-2xl py-10 px-16 grid grid-cols-3 max-w-[860px] mx-auto shadow-[0_16px_56px_rgba(0,0,0,.18)] sr">
            {[
              {
                icon: "users",
                value: counts.consultants,
                suffix: "+",
                label: "Specialised Consultants",
                key: "consultants",
              },
              {
                icon: "star",
                value: counts.satisfaction,
                suffix: "%",
                label: "Customer Satisfaction",
                key: "satisfaction",
              },
              {
                icon: "briefcase",
                value: counts.cases,
                suffix: "K+",
                label: "Completed Cases",
                key: "cases",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center relative ${
                  i > 0
                    ? 'before:content-[""] before:absolute before:left-0 before:top-[15%] before:bottom-[15%] before:w-px before:bg-white/12'
                    : ""
                }`}
              >
                <div className="mx-auto mb-2.5 w-10 h-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-10 h-10 stroke-white/65 fill-none stroke-[1.5] stroke-linecap-round stroke-linejoin-round"
                  >
                    {stat.icon === "users" && (
                      <>
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                      </>
                    )}
                    {stat.icon === "star" && (
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    )}
                    {stat.icon === "briefcase" && (
                      <>
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                      </>
                    )}
                  </svg>
                </div>
                <div className="font-['Barlow_Condensed'] text-[52px] font-black text-white leading-none">
                  <span
                    className={`count-up ${stat.key}`}
                    data-target={
                      stat.key === "consultants"
                        ? 200
                        : stat.key === "satisfaction"
                        ? 100
                        : 1
                    }
                  >
                    {stat.value}
                  </span>
                  {stat.suffix}
                </div>
                <div className="text-[12px] text-white/55 font-semibold tracking-wide uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Us */}
        <section className="py-[100px]">
          <div className="max-w-[1180px] mx-auto px-9">
            <div className="grid grid-cols-2 gap-20 items-center">
              <div className="relative sr-l">
                <div className="w-full max-w-[460px] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] overflow-hidden shadow-[0_16px_56px_rgba(0,0,0,.18)] aspect-[3/3.2]">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80')] bg-center bg-cover"></div>
                </div>
                <div className="absolute -bottom-2 right-5 bg-[#E84A1A] text-white rounded-xl px-5 py-3.5 shadow-[0_8px_28px_rgba(232,74,26,.45)] flex items-center gap-2.5 float-badge">
                  <div>
                    <div className="font-['Barlow_Condensed'] text-[28px] font-black leading-none">
                      3+
                    </div>
                    <div className="text-[11px] font-bold tracking-wide leading-tight">
                      Years of
                      <br />
                      Experience
                    </div>
                  </div>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,.8)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </div>
              </div>

              <div className="sr-r d1">
                <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-widest uppercase text-[#E84A1A] mb-2">
                  <span className="w-7 h-0.5 bg-[#E84A1A]"></span>
                  About Us
                </div>
                <h2 className="font-['Barlow_Condensed'] text-[48px] font-black text-[#0d1b3e] leading-tight mb-1.5">
                  About Us
                </h2>
                <div className="w-12 h-[3px] bg-[#E84A1A] rounded-sm my-2.5"></div>
                <p className="text-[15px] text-[#6b7a94] leading-relaxed mb-7 max-w-[440px]">
                  Credibly innovate granular internal or organic sources whereas
                  high standards in web-readiness. Energistically scale
                  future-proof core competencies vis-a-vis impactful
                  experiences.
                </p>
                <button className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#E84A1A] text-white rounded text-[13px] font-bold tracking-wide uppercase hover:bg-[#c93d10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,74,26,.4)] active:scale-[0.97] transition-all">
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-[90px] pb-[100px] bg-[#f8f9fa]">
          <div className="max-w-[1180px] mx-auto px-9">
            <div className="grid grid-cols-[500px_1fr] gap-14 items-start">
              <div className="sr-l">
                <div className="inline-flex items-center gap-2 text-[32px] font-bold tracking-widest uppercase text-[#E84A1A] mb-1.5">
                  <span className="w-7 h-1 bg-[#E84A1A]"></span>
                  What We Do
                  <span className="w-7 h-0.5 bg-[#E84A1A]"></span>
                </div>
                <h2 className="font-['Barlow_Condensed'] text-xl font-black text-[#0d1b3e] leading-tight mb-2 gap-10">
                  We Provide client with everything they need to have an
                  effective e-commerce or product solution for their business.
                  We offer full stack, front end and back end development,
                  custom WordPress development, sophisticated design services
                  and much more
                  <br />
                  <br />
                  Most importantly, the launch of your website is not the finish
                  line, it's the beginning. We support our clients, helping them
                  test, interpret data and continue to evolve with their market.
                </h2>
                <div className="w-12 h-[3px] bg-[#E84A1A] rounded-sm my-2.5"></div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 px-7 py-3 bg-[#E84A1A] text-white rounded text-[13px] font-bold tracking-wide uppercase hover:bg-[#c93d10] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(232,74,26,.4)] active:scale-[0.97] transition-all mt-5"
                >
                  View All Services
                </Link>
              </div>

              <div className="grid grid-cols-2 grid-rows-2 gap-5">
                {[
                  {
                    icon: "ai-consulting",
                    title: "AI-Consulting\nofferings",
                    description:
                      "Credibly innovate granular internal or organic sources",
                    delay: "d1",
                  },
                  {
                    icon: "automation",
                    title: "Business Process\nAutomation",
                    description:
                      "Streamline operations with intelligent automation",
                    delay: "d2",
                  },
                  {
                    icon: "secure",
                    title: "Secure AI\nImplementation\nstrategies",
                    description: "Enterprise-grade security for AI deployments",
                    delay: "d3",
                  },
                  {
                    icon: "knowledge",
                    title: "Knowledge\ncentralization\nSolutions",
                    description: "Unify data sources for intelligent insights",
                    delay: "d4",
                  },
                  {
                    icon: "implementation",
                    title: "AI\nimplementation",
                    description: "End-to-end AI solution deployment",
                    delay: "d5",
                  },
                  {
                    icon: "analytics",
                    title: "Data Analytics\n& Insights",
                    description: "Transform data into actionable intelligence",
                    delay: "d1",
                  },
                ].map((service, i) => (
                  <div
                    key={i}
                    className={`service-card bg-white border-[1.5px] border-[#e1e5ec] rounded-xl p-7 shadow-[0_2px_12px_rgba(0,0,0,.08)] relative overflow-hidden hover:-translate-y-[5px] hover:shadow-[0_6px_28px_rgba(0,0,0,.12)] sr ${service.delay}`}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="w-[52px] h-[52px] mb-4 flex items-center justify-center">
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="#E84A1A"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-12 h-12"
                      ></svg>
                    </div>

                    <div className="text-[16px] font-extrabold text-[#0d1b3e] mb-2 leading-tight whitespace-pre-line">
                      {service.title}
                    </div>

                    <div className="text-[13px] text-[#6b7a94] leading-relaxed">
                      {service.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experts */}
        <section className="py-[90px]">
          <div className="max-w-[1180px] mx-auto px-9">
            <div className="text-center mb-14 sr">
              <h2 className="font-['Barlow_Condensed'] text-[46px] font-black text-[#0d1b3e] leading-tight mb-1">
                Our Experts
              </h2>
              <div className="w-12 h-[3px] bg-[#E84A1A] rounded-sm mx-auto my-2.5"></div>
              <p className="text-[14px] text-[#6b7a94] max-w-[380px] mx-auto">
                Credibly innovate granular internal or organic sources
              </p>
            </div>

            <div className="relative group">
              <button
                onClick={() => {
                  const container = document.getElementById("expert-carousel");
                  container?.scrollBy({ left: -280, behavior: "smooth" });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#E84A1A] hover:bg-[#E84A1A] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
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
                onClick={() => {
                  const container = document.getElementById("expert-carousel");
                  container?.scrollBy({ left: 280, behavior: "smooth" });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#E84A1A] hover:bg-[#E84A1A] hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
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
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {[
                  {
                    initials: "SD",
                    name: "Saskia Daly",
                    title: "Founder",
                    gradient: "from-[#1a2d5a] to-[#2d4a8a]",
                    delay: "d1",
                    description:
                      "Visionary leader with 15+ years of experience in strategic planning and business development. Passionate about driving innovation and building high-performance teams.",
                  },
                  {
                    initials: "SW",
                    name: "Shayne Wallace",
                    title: "IT Manager",
                    gradient: "from-[#2d4a8a] to-[#3a5fa0]",
                    delay: "d2",
                    description:
                      "Technology expert specializing in cloud infrastructure and cybersecurity. Led digital transformation initiatives for Fortune 500 companies.",
                  },
                  {
                    initials: "NA",
                    name: "Niko Anderson",
                    title: "CTO",
                    gradient: "from-[#4a5568] to-[#6b7a94]",
                    delay: "d3",
                    description:
                      "Chief Technology Officer with deep expertise in AI/ML, software architecture, and emerging technologies. Former tech lead at major Silicon Valley firms.",
                  },
                  {
                    initials: "EM",
                    name: "Emma Mitchell",
                    title: "Design Lead",
                    gradient: "from-[#E84A1A] to-[#ff6b3d]",
                    delay: "d4",
                    description:
                      "Creative director with award-winning portfolio in UX/UI design. Specializes in creating intuitive digital experiences that drive user engagement.",
                  },
                  {
                    initials: "JR",
                    name: "James Rodriguez",
                    title: "Marketing Director",
                    gradient: "from-[#0d1b3e] to-[#1a2d5a]",
                    delay: "d5",
                    description:
                      "Results-driven marketing strategist with proven track record in brand growth and digital marketing campaigns across global markets.",
                  },
                  {
                    initials: "LC",
                    name: "Lisa Chen",
                    title: "Operations Manager",
                    gradient: "from-[#6b7a94] to-[#8b9aae]",
                    delay: "d6",
                    description:
                      "Operations excellence expert focused on process optimization and supply chain management. Certified Six Sigma Black Belt.",
                  },
                ].map((expert, i) => (
                  <div
                    key={i}
                    className={`flex-shrink-0 w-[calc(25%-18px)] min-w-[220px] text-center expert-card sr${expert.delay}`}
                  >
                    <div
                      className="relative group/card cursor-pointer"
                      onClick={() =>
                        setActiveExpert(activeExpert === i ? null : i)
                      }
                    >
                      <div className="w-full aspect-square rounded-[20px] mx-auto mb-4 overflow-hidden shadow-[0_10px_36px_rgba(0,0,0,.14)] border-4 border-white outline-[3px] outline-[#e1e5ec] expert-photo transition-all duration-300 group-hover/card:shadow-[0_15px_50px_rgba(232,74,26,0.2)] group-hover/card:outline-[#E84A1A]">
                        <div
                          className={`w-full h-full flex items-center justify-center font-['Barlow_Condensed'] text-[52px] font-black text-white bg-gradient-to-br ${expert.gradient} transition-transform duration-300 group-hover/card:scale-105`}
                        >
                          {expert.initials}
                        </div>
                      </div>

                      <div
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#E84A1A] transition-all duration-300 ${
                          activeExpert === i
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                      ></div>
                    </div>

                    <div
                      className={`text-[16px] font-extrabold mb-1 transition-colors duration-300 cursor-pointer ${
                        activeExpert === i ? "text-[#E84A1A]" : "text-[#0d1b3e]"
                      }`}
                      onClick={() =>
                        setActiveExpert(activeExpert === i ? null : i)
                      }
                    >
                      {expert.name}
                    </div>
                    <div className="text-[13px] text-[#E84A1A] font-semibold mb-3">
                      {expert.title}
                    </div>

                    <div
                      className={`text-[13px] text-[#6b7a94] leading-relaxed transition-all duration-400 overflow-hidden text-left bg-[#f8f9fa] rounded-lg px-4 ${
                        activeExpert === i
                          ? "max-h-[200px] opacity-100 py-3 mt-2"
                          : "max-h-0 opacity-0 py-0 mt-0"
                      }`}
                    >
                      {expert.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-[90px] bg-[#f8f9fa]">
          <div className="max-w-[1180px] mx-auto px-9">
            <div className="text-center mb-13 sr">
              <h2 className="font-['Barlow_Condensed'] text-[46px] font-black text-[#0d1b3e] leading-tight mb-1">
                Our Process
              </h2>
              <div className="w-12 h-[3px] bg-[#E84A1A] rounded-sm mx-auto my-2.5"></div>
            </div>

            <div className="grid grid-cols-5 gap-0 mt-13 relative">
              <div className="absolute top-[38px] left-[calc(10%+8px)] right-[calc(10%+8px)] h-0.5 bg-[#e1e5ec] z-0"></div>

              {[
                { num: "01", title: "Step 1", align: "l", delay: "d1" },
                { num: "02", title: "Step 2", align: "", delay: "d2" },
                {
                  num: "03",
                  title: "Step 3",
                  align: "",
                  delay: "d3",
                  active: true,
                },
                { num: "04", title: "Step 4", align: "", delay: "d4" },
                { num: "05", title: "Step 5", align: "r", delay: "d5" },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`text-center relative z-[1] px-6 process-step sr${
                    step.align ? "-" + step.align : ""
                  } ${step.delay}`}
                  onMouseEnter={() => setActiveStep(i)}
                  onMouseLeave={() => setActiveStep(i)}
                >
                  <div className="font-['Barlow_Condensed'] text-[64px] font-black text-[#e1e5ec] leading-none mb-2 relative inline-block transition-colors process-num">
                    {step.num}
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border-[3px] border-white mx-auto mb-4 transition-all process-step-dot ${
                      activeStep === i
                        ? "bg-[#E84A1A] shadow-[0_0_0_4px_rgba(232,74,26,.22)]"
                        : "bg-[#e1e5ec] shadow-[0_0_0_2px_#e1e5ec]"
                    }`}
                  ></div>

                  <div
                    className={`text-[18px] font-extrabold mb-2.5 transition-colors process-step-title ${
                      activeStep === i ? "text-[#E84A1A]" : "text-[#0d1b3e]"
                    }`}
                  >
                    {step.title}
                  </div>

                  <div
                    className={`text-[13.5px] text-[#6b7a94] leading-relaxed transition-all duration-300 overflow-hidden ${
                      activeStep === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    Lorem ipsum dolor sit amet, consecte adipiscing elit, sed
                    eiusmod tempor incididunt labore et dolore magna aliqua
                    minim.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}