"use client";

import { useEffect, useState, useRef } from "react";


export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle",
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  const revealRefs = useRef<HTMLElement[]>([]);
  const tiltCardRefs = useRef<HTMLElement[]>([]);
  const magneticBtnRefs = useRef<HTMLElement[]>([]);
  const inputRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
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

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const progress =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    setTimeout(() => {
      setFormStatus("sent");
      setTimeout(() => {
        setFormStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 4000);
    }, 1400);
  };

  const infoCards = [
    {
      icon: "📍",
      label: "Location",
      head: "Visit Us At",
      text: (
        <>
          <strong className="text-[#0f2056] font-semibold">
            GBG Head Office:
          </strong>
          <br />
          1236 Street, Los Angeles,
          <br />
          3rd Street, Sal Address.
        </>
      ),
    },
    {
      icon: "📞",
      label: "24/7 Service",
      head: "Call Us On",
      text: (
        <>
          Tel: +91 456-54896
          <br />
          Mob: +91-435-87566
        </>
      ),
    },
    {
      icon: "✉️",
      label: "Drop A Mail",
      head: "Mail Address",
      text: (
        <>
          info@company.com
          <br />
          contact@company.com
        </>
      ),
    },
    {
      icon: "🕐",
      label: "Office Hours",
      head: "Opening Time",
      headColor: "#d97706",
      text: (
        <>
          Mon – Fri: 9am – 6pm
          <br />
          Saturday: 10am – 4pm
          <br />
          Sunday (Closed)
        </>
      ),
    },
  ];

  const cityBlocks = [
    { t: "27%", l: "21%", w: "10%", h: "7%" },
    { t: "27%", l: "33%", w: "13%", h: "7%" },
    { t: "37%", l: "21%", w: "9%", h: "11%" },
    { t: "37%", l: "33%", w: "13%", h: "11%" },
    { t: "52%", l: "10%", w: "8%", h: "9%" },
    { t: "52%", l: "21%", w: "9%", h: "9%" },
    { t: "52%", l: "33%", w: "13%", h: "9%" },
    { t: "52%", l: "49%", w: "7%", h: "9%" },
    { t: "52%", l: "59%", w: "11%", h: "9%" },
    { t: "27%", l: "49%", w: "7%", h: "7%" },
    { t: "27%", l: "59%", w: "11%", h: "7%" },
    { t: "37%", l: "49%", w: "7%", h: "11%" },
    { t: "37%", l: "59%", w: "11%", h: "11%" },
    { t: "27%", l: "73%", w: "9%", h: "7%" },
    { t: "37%", l: "73%", w: "9%", h: "11%" },
    { t: "52%", l: "73%", w: "9%", h: "9%" },
    { t: "77%", l: "21%", w: "40%", h: "10%" },
    { t: "77%", l: "73%", w: "9%", h: "10%" },
    { t: "62%", l: "10%", w: "12%", h: "8%" },
    { t: "62%", l: "45%", w: "10%", h: "8%" },
    { t: "15%", l: "40%", w: "15%", h: "10%" },
  ];

  const particles = [
    { w: 4, bg: "#f59e0b", left: "15%", dur: "6s", delay: "0s" },
    {
      w: 3,
      bg: "rgba(255,255,255,0.6)",
      left: "30%",
      dur: "8s",
      delay: "1.5s",
    },
    { w: 5, bg: "#f59e0b", left: "55%", dur: "7s", delay: "0.8s" },
    { w: 3, bg: "rgba(255,255,255,0.5)", left: "70%", dur: "9s", delay: "2s" },
    { w: 4, bg: "#f59e0b", left: "85%", dur: "6.5s", delay: "0.4s" },
  ];

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap");

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
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: "DM Sans", sans-serif;
          background: var(--white);
          color: var(--navy);
          overflow-x: hidden;
        }
        
        .font-manrope {
          font-family: "Manrope", sans-serif;
        }
        .font-playfair {
          font-family: "Playfair Display", serif;
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
        @keyframes fadeU {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dotPls {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.8);
            opacity: 0.5;
          }
        }
        @keyframes lineGrow {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @keyframes particleFlt {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-250px) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes personRise {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pinBounce {
          0%,
          100% {
            transform: translate(-50%, -60%) scale(1);
          }
          50% {
            transform: translate(-50%, -70%) scale(1.1);
          }
        }
        @keyframes pinRipple {
          0% {
            width: 36px;
            height: 36px;
            opacity: 0.8;
          }
          100% {
            width: 80px;
            height: 80px;
            opacity: 0;
          }
        }
        @keyframes floatCard {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-5px);
          }
        }

        .animate-slideD {
          animation: slideD 0.6s var(--ease) both;
        }
        .animate-fadeU {
          animation: fadeU 0.8s 0.2s var(--ease) both;
        }
        .animate-fadeU-delay {
          animation: fadeU 0.7s 0.4s var(--ease) both;
        }
        .animate-dotPls {
          animation: dotPls 2s infinite;
        }
        .animate-lineGrow {
          animation: lineGrow 0.8s 0.9s var(--ease) both;
          transform-origin: left;
        }
        .animate-particle {
          animation: particleFlt linear infinite;
        }
        .animate-personRise {
          animation: personRise 1s 0.5s var(--ease) both;
        }
        .animate-slideUp {
          animation: slideUp 0.8s 0.7s var(--ease) both;
        }
        .animate-pinBounce {
          animation: pinBounce 2s ease-in-out infinite;
        }
        .animate-pinRipple {
          animation: pinRipple 2s ease-out infinite;
        }
        .animate-floatCard {
          animation: floatCard 4s ease-in-out infinite alternate;
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

        .info-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--amber-xl), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }
        .info-card:hover::before {
          opacity: 1;
        }
        .info-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(245, 158, 11, 0.4);
          box-shadow: 0 16px 40px rgba(245, 158, 11, 0.12);
        }
        .info-card:hover .ic-icon {
          background: var(--amber);
          transform: scale(1.12) rotate(-5deg);
        }
        .info-card:hover .ic-head {
          color: var(--amber-d);
        }

        .cc-btn:hover {
          background: var(--navy-m);
          transform: scale(1.04);
          box-shadow: 0 4px 16px rgba(7, 15, 43, 0.3);
        }
        .submit-btn:hover {
          background: var(--amber-d);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(245, 158, 11, 0.45);
        }
        .submit-btn:hover::before {
          opacity: 1;
        }
        .submit-btn:active {
          transform: scale(0.97);
        }
        .zoom-btn:hover {
          background: var(--navy-l);
          color: var(--navy);
        }
      `}</style>

      <section
        className="relative h-[380px] flex items-center justify-center overflow-hidden"
        ref={(el) => {
          if (el) revealRefs.current[0] = el!;
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2a50] via-[#2a3a70] to-[#3a3050] z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(253,253,253,0.5)] to-[rgba(243,146,97,0.8)] z-[1]" />

        <div className="absolute bottom-0 flex items-end gap-4 px-[60px] z-0">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center opacity-[0.35]">
              <div
                className={`rounded-full mb-[3px] ${["w-12 h-12", "w-14 h-14", "w-15 h-15", "w-12 h-12"][i - 1]} bg-[rgba(180,190,220,0.4)]`}
              />
              <div
                className={`rounded-t-[40px] ${["w-[70px] h-[55px]", "w-20 h-[65px]", "w-[88px] h-[70px]", "w-[74px] h-[60px]"][i - 1]} bg-[rgba(160,170,200,0.35)]`}
              />
            </div>
          ))}
        </div>

        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none z-[2] animate-particle"
            style={{
              width: p.w,
              height: p.w,
              background: p.bg,
              left: p.left,
              bottom: 0,
              animationDuration: p.dur,
              animationDelay: p.delay,
            }}
          />
        ))}

        <div className="relative z-[3] text-center">
          <h1 className="font-syne font-extrabold text-[clamp(36px,5vw,58px)] text-white tracking-[-1px]">
            <span className="text-[#efeeec] relative">
              Contact
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#f59e0b] rounded-sm animate-lineGrow" />
            </span>
          </h1>
        </div>
      </section>

      <section
        className="py-[72px] px-20 bg-white relative"
        ref={(el) => {
          if (el) revealRefs.current[1] = el!;
        }}
      >
        <div className="flex items-center justify-center gap-1.5 mb-4">
          <div className="flex items-center gap-1.5 bg-[#fef3c7] border border-[rgba(245,158,11,0.3)] rounded-full py-1 px-3 text-[10px] font-bold text-[#d97706] tracking-[0.08em] uppercase">
            <span className="w-[5px] h-[5px] rounded-full bg-[#f59e0b] animate-dotPls" />
            Contact Info
          </div>
        </div>

        <div className="text-center mb-3">
          <h2 className="font-syne font-extrabold text-[clamp(26px,3vw,40px)] tracking-[-1.5px] text-[#0f2056]">
            <em className="text-[#f59e0b] not-italic">Contact</em> & Join
            Together
          </h2>
        </div>

        <p className="text-center text-[#6b7280] text-sm leading-[1.7] max-w-[500px] mx-auto mb-[52px]">
          Feel free to contact us at anytime. We will get back to you as soon as
          we can. No office, no noise from the problem below.
        </p>

        <div className="grid grid-cols-4 gap-5">
          {infoCards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                tiltCardRefs.current[i] = el!;
              }}
              className="info-card border border-[#e5e7eb] rounded-[14px] p-6 pb-5 relative overflow-hidden bg-white"
            >
              <div className="ic-icon w-11 h-11 rounded-[10px] bg-[#eef1fa] flex items-center justify-center text-xl mb-3.5 flex-shrink-0">
                {card.icon}
              </div>
              <div className="text-[10px] font-bold text-[#9ca3af] tracking-[0.08em] uppercase mb-1">
                {card.label}
              </div>
              <div
                className="font-syne font-bold text-sm text-[#0f2056] mb-2"
                style={{ color: card.headColor }}
              >
                {card.head}
              </div>
              <div className="text-xs leading-[1.7] text-[#6b7280]">
                {card.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-20 pb-20 bg-white relative overflow-hidden">
        <div
          className="absolute -left-[120px] -bottom-20 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.06), transparent 70%)",
          }}
        />

        <div className="grid grid-cols-2 gap-0 rounded-[20px] overflow-hidden shadow-[0_20px_80px_rgba(15,32,86,0.1)] border border-[#e5e7eb]">
          <div className="bg-[#0f2056] relative overflow-hidden flex flex-col justify-end min-h-[480px]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="absolute -top-[60px] -left-[60px] w-[280px] h-[280px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.18), transparent 70%)",
              }}
            />

            <div className="relative z-[3] bg-[#f59e0b] mx-6 mb-6 rounded-[14px] p-5 pb-4 animate-slideUp">
              <div className="w-10 h-10 rounded-[10px] bg-[rgba(255,255,255,0.2)] flex items-center justify-center text-lg mb-3">
                💬
              </div>
              <div className="font-syne font-extrabold text-[15px] text-[#070f2b] mb-1.5">
                Chat With Us !
              </div>
              <p className="text-xs leading-[1.7] text-[rgba(7,15,43,0.7)] mb-4">
                Porta, duis gravida adipisc, adipiscin faucibus diam adisalect
                diam, et lorem ipsum, via et porta ultrices Mor.
              </p>
              <button
                ref={(el) => {
                  magneticBtnRefs.current[0] = el!;
                }}
                className="cc-btn inline-flex items-center gap-1.5 bg-[#0f2056] text-white font-bold text-xs py-2 px-[18px] rounded-md transition-all duration-[300ms] border-none"
              >
                LET'S CHAT <span>→</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-12">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#d97706] tracking-[0.08em] uppercase">
                <span className="w-[5px] h-[5px] rounded-full bg-[#f59e0b] animate-dotPls" />
                Contact Us
              </div>
            </div>

            <h2 className="font-syne font-extrabold text-[clamp(22px,2.5vw,34px)] tracking-[-1.5px] text-[#0f2056] leading-[1.15] mb-7">
              <em className="text-[#f59e0b] not-italic">Reach</em> & Get In
              Touch
              <br />
              With Us !
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3.5 mb-3.5">
                <div
                  className="flex flex-col gap-1"
                  ref={(el) => {
                    inputRefs.current[0] = el!;
                  }}
                >
                  <input
                    type="text"
                    placeholder="Your Name*"
                    required
                    className="w-full py-2.5 px-3.5 border-[1.5px] border-[#e5e7eb] rounded-lg font-sans text-sm text-[#0f2056] bg-white outline-none transition-all duration-300 placeholder:text-[#9ca3af] focus:border-[#f59e0b] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)] focus:-translate-y-px"
                  />
                </div>
                <div
                  className="flex flex-col gap-1"
                  ref={(el) => {
                    inputRefs.current[1] = el!;
                  }}
                >
                  <input
                    type="email"
                    placeholder="Your Email*"
                    required
                    className="w-full py-2.5 px-3.5 border-[1.5px] border-[#e5e7eb] rounded-lg font-sans text-sm text-[#0f2056] bg-white outline-none transition-all duration-300 placeholder:text-[#9ca3af] focus:border-[#f59e0b] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)] focus:-translate-y-px"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mb-3.5">
                <div
                  className="flex flex-col gap-1"
                  ref={(el) => {
                    inputRefs.current[2] = el!;
                  }}
                >
                  <input
                    type="tel"
                    placeholder="Your number*"
                    className="w-full py-2.5 px-3.5 border-[1.5px] border-[#e5e7eb] rounded-lg font-sans text-sm text-[#0f2056] bg-white outline-none transition-all duration-300 placeholder:text-[#9ca3af] focus:border-[#f59e0b] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)] focus:-translate-y-px"
                  />
                </div>
                <div
                  className="flex flex-col gap-1"
                  ref={(el) => {
                    inputRefs.current[3] = el!;
                  }}
                >
                  <input
                    type="text"
                    placeholder="Your Subject*"
                    className="w-full py-2.5 px-3.5 border-[1.5px] border-[#e5e7eb] rounded-lg font-sans text-sm text-[#0f2056] bg-white outline-none transition-all duration-300 placeholder:text-[#9ca3af] focus:border-[#f59e0b] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)] focus:-translate-y-px"
                  />
                </div>
              </div>

              <div
                className="flex flex-col gap-1 mb-1"
                ref={(el) => {
                  inputRefs.current[4] = el!;
                }}
              >
                <textarea
                  placeholder="Write Message..."
                  className="w-full py-2.5 px-3.5 border-[1.5px] border-[#e5e7eb] rounded-lg font-sans text-sm text-[#0f2056] bg-white outline-none transition-all duration-300 placeholder:text-[#9ca3af] focus:border-[#f59e0b] focus:shadow-[0_0_0_3px_rgba(245,158,11,0.15)] focus:-translate-y-px resize-none min-h-[100px] leading-[1.6]"
                />
              </div>

              <button
                type="submit"
                className="submit-btn inline-flex items-center gap-2 bg-[#f59e0b] text-[#070f2b] font-bold text-sm py-3 px-8 rounded-lg border-none mt-4 relative overflow-hidden shadow-[0_4px_20px_rgba(245,158,11,0.35)]"
                disabled={formStatus !== "idle"}
                ref={(el) => {
                  magneticBtnRefs.current[1] = el!;
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-transparent opacity-0 transition-opacity duration-300 pointer-events-none" />
                {formStatus === "idle" && (
                  <>
                    SEND MESSAGE <span>→</span>
                  </>
                )}
                {formStatus === "sending" && "Sending…"}
                {formStatus === "sent" && (
                  <>
                    ✓ Sent! <span>→</span>
                  </>
                )}
              </button>

              <div
                className={`flex items-center gap-2.5 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] rounded-lg p-3 px-4 mt-3 text-[13px] text-[#16a34a] font-semibold ${formStatus === "sent" ? "flex animate-fadeU" : "hidden"}`}
              >
                ✓ Message sent! We'll get back to you soon.
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="bg-white py-7 px-20 flex items-center gap-3.5">
          <div className="flex items-center gap-1.5 bg-[#eef1fa] border border-[rgba(15,32,86,0.15)] rounded-full py-1 px-3.5 text-[11px] font-bold text-[#0f2056]">
            📍 Our Location
          </div>
          <h3 className="font-syne font-bold text-[15px] text-[#0f2056]">
            Riverside Building, County Hall
          </h3>
          <span className="text-xs text-[#9ca3af]">
            Westminster Bridge Rd, London, SE1 7PB
          </span>
        </div>

        <div className="relative h-[280px] overflow-hidden border-t border-[#e5e7eb]">
          <div
            className="w-full h-full relative"
            style={{
              background: `linear-gradient(90deg, rgba(245,245,220,0.3) 1px, transparent 1px), linear-gradient(rgba(245,245,220,0.3) 1px, transparent 1px), linear-gradient(135deg, #e8f0e0 0%, #d8e8d0 30%, #e0e8f0 60%, #d8e0e8 100%)`,
              backgroundSize: "60px 60px, 60px 60px, 100% 100%",
            }}
          >
            {cityBlocks.map((block, i) => (
              <div
                key={i}
                className="absolute rounded-[3px] bg-[rgba(180,200,170,0.5)] border border-[rgba(140,160,130,0.3)]"
                style={{
                  top: block.t,
                  left: block.l,
                  width: block.w,
                  height: block.h,
                }}
              />
            ))}

            <div className="absolute rounded-[4px] bg-[rgba(160,200,230,0.5)] top-[15%] left-0 w-[18%] h-[8%]" />
            <div className="absolute rounded-[4px] bg-[rgba(160,200,230,0.5)] top-[64%] left-[60%] w-[38%] h-[8%]" />

            <div className="absolute text-[9px] font-semibold text-[rgba(60,60,80,0.6)] tracking-[0.03em] whitespace-nowrap top-[22%] left-[22%]">
              CENTRAL AVE
            </div>
            <div className="absolute text-[9px] font-semibold text-[rgba(60,60,80,0.6)] tracking-[0.03em] whitespace-nowrap top-[48%] left-[34%]">
              MAIN STREET
            </div>
            <div className="absolute text-[9px] font-semibold text-[rgba(60,60,80,0.6)] tracking-[0.03em] whitespace-nowrap top-[60%] left-[50%] rotate-90">
              PARK RD
            </div>
            <div className="absolute text-[9px] font-semibold text-[rgba(60,60,80,0.6)] tracking-[0.03em] whitespace-nowrap top-[12%] left-[2%]">
              RIVERSIDE
            </div>
            <div className="absolute text-[9px] font-semibold text-[rgba(60,60,80,0.6)] tracking-[0.03em] whitespace-nowrap top-[65%] left-[62%]">
              EAST BANK
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-10 animate-pinBounce">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border-2 border-[rgba(245,158,11,0.5)] animate-pinRipple" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border-2 border-[rgba(245,158,11,0.5)] animate-[pinRipple_2s_ease-out_infinite_0.6s]" />
              <div className="w-9 h-9 rounded-[50%_50%_50%_0] bg-[#f59e0b] -rotate-45 flex items-center justify-center shadow-[0_4px_16px_rgba(245,158,11,0.5)] relative">
                <span className="rotate-45 text-base">📍</span>
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-white/97 border border-[#e5e7eb] rounded-[10px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] z-10 min-w-[clamp(160px,35vw,200px)] animate-floatCard">
              <div className="font-syne font-bold text-xs text-[#0f2056] mb-0.5">
                GBG Head Office
              </div>
              <div className="text-[11px] text-[#6b7280] leading-[1.5] mb-1.5">
                Riverside Building, County Hall
                <br />
                Westminster Bridge Rd, London
              </div>
              <div className="flex items-center">
                <span className="text-[11px] text-[#f59e0b]">★★★★★</span>
                <span className="text-[10px] text-[#6b7280] ml-1">
                  4.9 (2,480 reviews)
                </span>
              </div>
            </div>

            <div className="absolute right-4 bottom-10 z-10 flex flex-col gap-0.5">
              <button className="w-7 h-7 bg-white border border-[#d1d5db] rounded flex items-center justify-center text-sm font-bold text-[#374151] transition-all duration-[0.25s] hover:bg-[#eef1fa]">
                +
              </button>
              <button className="w-7 h-7 bg-white border border-[#d1d5db] rounded flex items-center justify-center text-sm font-bold text-[#374151] transition-all duration-[0.25s] hover:bg-[#eef1fa]">
                −
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
