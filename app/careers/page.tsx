'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function FalconTechCareers() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));

    const handleScroll = () => {
      const sy = window.scrollY;
      const hr = document.querySelector('.hero-right') as HTMLElement | null;
      if (hr && sy < window.innerHeight) hr.style.transform = `translateY(${sy * 0.05}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  const perks = [
    { num: '01', icon: '🏠', title: 'Work From Home', desc: 'Full flexibility to work from any environment — home, café, or co-working space — wherever you do your best work.', featured: false, delay: '' },
    { num: '02', icon: '🤝', title: 'Paid Teamwork', desc: 'Compensation and recognition for real collaboration — your efforts as part of the team are always rewarded.', featured: true, delay: 'd1' },
    { num: '03', icon: '🚀', title: 'Growth Opportunities', desc: 'Continuously expanding and challenging career pathways within a company that actively invests in your development.', featured: false, delay: 'd2' },
    { num: '04', icon: '💎', title: 'Collaborative Environment', desc: 'Work with diverse, experienced, and ambitious teammates who push each other to achieve remarkable outcomes.', featured: false, delay: 'd1' },
    { num: '05', icon: '💰', title: 'Competitive Compensation', desc: 'Attractive salaries with performance-based incentives designed to reward excellence at every level.', featured: false, delay: 'd2' },
    { num: '06', icon: '🌐', title: 'Transparent Culture', desc: 'Open communication, mutual respect, and radical honesty — the foundation of everything we do at FalconTech.', featured: false, delay: 'd3' },
  ];

  const jobs = [
    { icon: '✍️', title: 'Content Creator', meta: 'Creativity & Formats · Full-time · Kathmandu', badge: 'Creative', delay: '' },
    { icon: '🎬', title: 'Multimedia Designer', meta: 'Creativity & Multimedia · Full-time · Kathmandu', badge: 'Design', delay: 'd1' },
    { icon: '🎨', title: 'Graphics Designer', meta: 'Creativity & Visuals · Full-time · Kathmandu', badge: 'Design', delay: 'd2' },
  ];

  const stepsRow1 = [
    { num: '01', name: 'Apply Online', desc: 'Register and submit your application' },
    { num: '02', name: 'Profile Review', desc: 'Team evaluates your background' },
    { num: '03', name: 'Screening Call', desc: 'Align on experience and goals' },
    { num: '04', name: 'Assessment', desc: 'Technical challenge to showcase skills' },
    { num: '05', name: 'Interview', desc: 'Meet the team face-to-face' },
  ];

  const stepsRow2 = [
    { num: '06', name: 'Negotiation', desc: 'Discuss compensation openly' },
    { num: '07', name: 'References', desc: 'Deeper understanding of your track record' },
    { num: '08', name: 'HR Interview', desc: 'Culture and values alignment' },
    { num: '09', name: 'Offer', desc: 'Clear, fair and exciting offer letter' },
    { num: '10', name: 'Onboarding', desc: 'Welcome aboard — your journey begins' },
  ];

  const marqueeItems = ['Work From Home', 'Paid Teamwork', 'Growth Opportunities', 'Collaborative Culture', 'Competitive Compensation', 'Transparent Communication'];

  const ArrowIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );

  return (
    <>
      <Head>
        <title>FalconTech — Careers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; }
        :root {
          --navy: #0d1b3e;
          --navy-mid: #1e3160;
          --red: #e8290b;
          --red-light: #ff4422;
          --cream: #f5f7fc;
          --grey-light: #eef1f8;
          --grey-text: #5a6a88;
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-jakarta  { font-family: 'Plus Jakarta Sans', sans-serif; }

        /* ── Animations ── */
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .hero-badge   { animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .2s  forwards; opacity:0; }
        .hero-title   { animation: fadeUp .8s cubic-bezier(.16,1,.3,1) .35s forwards; opacity:0; }
        .hero-desc    { animation: fadeUp .8s cubic-bezier(.16,1,.3,1) .5s  forwards; opacity:0; }
        .hero-actions { animation: fadeUp .8s cubic-bezier(.16,1,.3,1) .65s forwards; opacity:0; }
        .hero-right   { animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .4s  forwards; opacity:0; }
        .marquee-track{ animation: marquee 22s linear infinite; }

        /* ── Scroll reveal ── */
        .reveal { opacity:0; transform:translateY(28px); transition:opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1); }
        .reveal.in { opacity:1; transform:translateY(0); }
        .d1{transition-delay:.1s} .d2{transition-delay:.2s} .d3{transition-delay:.3s} .d4{transition-delay:.4s}

        /* ── Perk card ── */
        .perk-card::after {
          content:''; position:absolute; inset:0;
          background:var(--red); transform:scaleY(0); transform-origin:bottom;
          transition:transform .4s cubic-bezier(.16,1,.3,1); z-index:0; border-radius:14px;
        }
        .perk-card:hover::after    { transform:scaleY(1); }
        .perk-card > *             { position:relative; z-index:1; }
        .perk-card:hover .p-icon   { transform:scale(1.1) rotate(-5deg); }
        .perk-card:hover .p-title,
        .perk-card:hover .p-desc   { color:#fff; }
        .perk-card:hover .p-link   { color:rgba(255,255,255,.9); }

        /* ── Job card ── */
        .job-card::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:4px;
          background:var(--red); transform:scaleY(0); transform-origin:bottom;
          transition:transform .35s cubic-bezier(.16,1,.3,1); border-radius:4px 0 0 4px;
        }
        .job-card:hover::before { transform:scaleY(1); }
        .job-card:hover         { transform:translateX(4px); }
        .job-card:hover .j-icon { background:rgba(232,41,11,.08); }
        .job-card:hover .j-title{ color:var(--red); }
        .job-card:hover .j-badge{ background:rgba(232,41,11,.1); color:var(--red); }
        .job-card:hover .j-arrow{ background:var(--red); border-color:var(--red); color:#fff; transform:rotate(45deg) scale(1.1); }

        /* ── Step hover ── */
        .step-card:hover .step-bubble {
          background:var(--red); border-color:var(--red); color:#fff;
          transform:scale(1.1); box-shadow:0 8px 24px rgba(232,41,11,.4);
        }

        /* ── Button arrow nudge ── */
        .btn-arrow svg { transition:transform .3s; }
        .btn-arrow:hover svg { transform:translateX(4px); }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-thumb { background:var(--red); border-radius:2px; }
      `}</style>

      <div className="font-jakarta bg-[#f5f7fc] text-[#0d1b3e] leading-relaxed overflow-x-hidden">

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="relative min-h-[100svh] flex items-center overflow-hidden px-5 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20">
          {/* BG blobs */}
          <div className="absolute -top-28 -right-20 w-[420px] h-[420px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(232,41,11,.07) 0%,transparent 70%)'}}/>
          <div className="absolute -bottom-16 left-[15%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(13,27,62,.05) 0%,transparent 70%)'}}/>

          <div className="relative z-[2] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <div className="hero-badge inline-flex items-center gap-2 bg-[rgba(232,41,11,.08)] border border-[rgba(232,41,11,.2)] text-[#e8290b] text-xs font-semibold tracking-[.12em] uppercase px-4 py-[7px] rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-[#e8290b] rounded-full"/>
                FalconTech Careers
              </div>
              <h1 className="hero-title font-playfair font-bold leading-[1.08] text-[#0d1b3e] mb-5" style={{fontSize:'clamp(36px,5.5vw,62px)'}}>
                Curious, Innovative,<br/>
                <em className="italic text-[#e8290b]">Driven.</em><br/>
                Sound Like You?
              </h1>
              <p className="hero-desc text-[15px] leading-[1.8] text-[#5a6a88] max-w-[460px] mb-8">
                We embrace individuals who are driven, adaptable, and eager to grow. We value empowerment and open communication so every team member can reach their full potential.
              </p>
              <div className="hero-actions flex flex-wrap gap-4">
                <a href="#openings" className="btn-arrow inline-flex items-center gap-2.5 bg-[#e8290b] text-white px-7 py-[14px] rounded-full text-sm font-semibold no-underline transition-all duration-300 shadow-[0_6px_24px_rgba(232,41,11,.3)] hover:bg-[#ff4422] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(232,41,11,.4)]">
                  View Open Positions <ArrowIcon/>
                </a>
                <a href="#journey" className="inline-flex items-center gap-3 text-[#0d1b3e] text-sm font-semibold no-underline transition-all duration-300 hover:text-[#e8290b]">
                  <div className="w-11 h-11 rounded-full bg-white shadow-[0_8px_32px_rgba(13,27,62,.12)] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b3e" strokeWidth="2.5"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                  Our Process
                </a>
              </div>
            </div>

            {/* Right photos */}
            <div className="hero-right relative">
              <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(13,27,62,.16)]">
                <div className="w-full h-full bg-gradient-to-br from-[#1a2d5a] to-[#2a4580] flex items-center justify-center text-xs font-semibold tracking-[.15em] uppercase text-white/20 min-h-[200px]">
                  Team Photo
                </div>
              </div>
              {/* Offset thumbnail — hidden on very small screens to avoid overflow */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 w-[42%] aspect-square rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(13,27,62,.16)] border-4 border-white">
                <div className="w-full h-full bg-gradient-to-br from-[#c5cfe8] to-[#aab8d4] flex items-center justify-center text-xs font-semibold tracking-[.15em] uppercase text-[rgba(13,27,62,.18)]">
                  Office
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute top-4 -right-2 sm:-right-4 bg-white rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(13,27,62,.12)] flex items-center gap-2.5">
                <div className="w-9 h-9 bg-[rgba(232,41,11,.1)] rounded-lg flex items-center justify-center text-lg">🚀</div>
                <div>
                  <div className="text-xl font-bold text-[#0d1b3e] leading-none">3+</div>
                  <div className="text-[11px] text-[#5a6a88] font-medium">Open Roles</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MARQUEE ════════════════════════════════════════════ */}
        <div className="bg-[#0d1b3e] py-4 overflow-hidden" aria-hidden="true">
          <div className="marquee-track flex whitespace-nowrap">
            {[...marqueeItems,...marqueeItems].map((item,i)=>(
              <div key={i} className="text-[12px] sm:text-[13px] font-semibold tracking-[.12em] uppercase text-white/70 px-8 sm:px-10 flex-shrink-0 flex items-center gap-8 sm:gap-10">
                {item}<span className="text-[#e8290b] text-[10px]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ ABOUT ══════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-10 md:px-16 lg:px-20 bg-white">
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image stack */}
            <div className="relative h-[280px] sm:h-[360px] md:h-[440px] lg:h-[480px] reveal">
              <div className="absolute top-0 left-0 w-[65%] h-[75%] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(13,27,62,.16)]">
                <div className="w-full h-full bg-gradient-to-br from-[#1a2d5a] to-[#2a4580] flex items-center justify-center text-xs font-semibold tracking-[.15em] uppercase text-white/20 min-h-[160px]">Team at Work</div>
              </div>
              <div className="absolute bottom-0 right-0 w-1/2 h-[55%] rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(13,27,62,.12)] border-4 border-[#f5f7fc]">
                <div className="w-full h-full bg-gradient-to-br from-[#c5cfe8] to-[#aab8d4] flex items-center justify-center text-xs font-semibold tracking-[.15em] uppercase text-[rgba(13,27,62,.18)] min-h-[120px]">Collaboration</div>
              </div>
              <div className="absolute bottom-[18%] -left-3 sm:-left-5 bg-[#e8290b] text-white px-4 py-3.5 rounded-lg shadow-[0_8px_32px_rgba(13,27,62,.12)] text-center z-[3]">
                <div className="text-[24px] sm:text-[28px] font-bold leading-none">15+</div>
                <div className="text-[10px] sm:text-[11px] font-medium opacity-85 mt-0.5">Years of<br/>Experience</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-[#e8290b] mb-4">
                <span className="w-5 h-0.5 bg-[#e8290b] rounded-sm"/> About Our Culture
              </div>
              <h2 className="reveal d1 font-playfair font-bold leading-[1.15] text-[#0d1b3e] mb-5" style={{fontSize:'clamp(28px,3.5vw,44px)'}}>
                Build Your Career<br/>at <em className="italic text-[#e8290b]">FalconTech</em>
              </h2>
              <p className="reveal d2 text-[15px] leading-[1.8] text-[#5a6a88] mb-7">
                We embrace individuals who are driven, adaptable, and eager to grow. With over a decade of experience, FalconTech has helped build remarkable careers. Our team of 50+ expert professionals is ready to welcome you.
              </p>
              <div className="reveal d3 flex gap-2.5 flex-wrap mb-8">
                {['Tailored Growth','Proven Expertise','Flexible Work'].map((pill,i)=>(
                  <div key={i} className="flex items-center gap-1.5 px-4 py-2 bg-[#f5f7fc] rounded-full text-[12px] sm:text-[13px] font-semibold text-[#0d1b3e] border border-[#eef1f8]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#e8290b" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {pill}
                  </div>
                ))}
              </div>
              <a href="#openings" className="btn-arrow reveal d4 inline-flex items-center gap-2.5 bg-[#e8290b] text-white px-7 py-[14px] rounded-full text-sm font-semibold no-underline transition-all duration-300 shadow-[0_6px_24px_rgba(232,41,11,.3)] hover:bg-[#ff4422] hover:-translate-y-0.5">
                Discover Open Roles <ArrowIcon/>
              </a>
            </div>
          </div>
        </section>

        {/* ══ PERKS ══════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-10 md:px-16 lg:px-20 bg-[#f5f7fc] relative overflow-hidden" id="perks">
          <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(232,41,11,.05) 0%,transparent 70%)'}}/>

          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-[#e8290b] mb-4 justify-center">
              <span className="w-5 h-0.5 bg-[#e8290b] rounded-sm"/> Our Commitment
            </div>
            <h2 className="reveal d1 font-playfair font-bold leading-[1.15] text-[#0d1b3e] mb-4 max-w-[520px] mx-auto" style={{fontSize:'clamp(26px,3.5vw,44px)'}}>
              Perks &amp; Benefits of<br/>Working at <em className="italic text-[#e8290b]">FalconTech</em>
            </h2>
            <p className="reveal d2 text-[15px] leading-[1.8] text-[#5a6a88] max-w-[540px] mx-auto">
              Beyond our commitment to working and professionally growing together, today's cutting-edge culture lets us build great relationships and lasting careers.
            </p>
          </div>

          {/* Cards: 1 col → 2 col → 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1180px] mx-auto">
            {perks.map((perk, i) => (
              <div key={i} className={`reveal ${perk.delay} perk-card ${perk.featured ? 'bg-[#e8290b] text-white' : 'bg-white'} rounded-[14px] px-6 sm:px-8 py-8 relative overflow-hidden transition-all duration-[.4s] ease-[cubic-bezier(.16,1,.3,1)] border border-transparent cursor-default hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(13,27,62,.16)] hover:border-[rgba(232,41,11,.15)]`}>
                <div className={`absolute top-5 right-6 font-playfair text-[38px] font-bold leading-none ${perk.featured ? 'text-white/15' : 'text-[rgba(13,27,62,.06)]'}`}>{perk.num}</div>
                <div className={`p-icon w-[50px] h-[50px] rounded-lg flex items-center justify-center text-2xl mb-5 transition-transform duration-[.4s] ease-[cubic-bezier(.34,1.56,.64,1)] ${perk.featured ? 'bg-white/15' : 'bg-[rgba(232,41,11,.08)]'}`}>{perk.icon}</div>
                <div className={`p-title text-[16px] font-bold mb-2.5 leading-[1.3] ${perk.featured ? 'text-white' : 'text-[#0d1b3e]'}`}>{perk.title}</div>
                <p className={`p-desc text-sm leading-[1.7] ${perk.featured ? 'text-white/75' : 'text-[#5a6a88]'}`}>{perk.desc}</p>
                <a href="#" className={`p-link inline-flex items-center gap-1.5 mt-5 text-[13px] font-semibold no-underline transition-all duration-300 hover:gap-2.5 ${perk.featured ? 'text-white/90' : 'text-[#e8290b]'}`}>Learn more →</a>
              </div>
            ))}
          </div>
        </section>

        {/* ══ OPEN POSITIONS ═════════════════════════════════════ */}
        <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-10 md:px-16 lg:px-20 bg-white" id="openings">
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-20 items-start">

            {/* Sticky sidebar (sticky only on lg+) */}
            <div className="lg:sticky lg:top-24">
              <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-[#e8290b] mb-4">
                <span className="w-5 h-0.5 bg-[#e8290b] rounded-sm"/> Now Hiring
              </div>
              <h2 className="reveal d1 font-playfair font-bold leading-[1.15] text-[#0d1b3e] mb-4" style={{fontSize:'clamp(28px,3.5vw,44px)'}}>
                Current<br/><em className="italic text-[#e8290b]">Openings</em>
              </h2>
              <p className="reveal d2 text-[15px] leading-[1.8] text-[#5a6a88] mb-6">
                Find the right opportunity below and take the first step toward your next chapter at FalconTech.
              </p>
              <div className="reveal d3 flex items-center gap-4 p-5 bg-[#f5f7fc] rounded-[14px] mb-7">
                <div className="font-playfair text-[48px] sm:text-[52px] font-bold text-[#e8290b] leading-none">03</div>
                <div>
                  <div className="text-sm font-semibold text-[#0d1b3e]">Open Positions</div>
                  <div className="text-xs text-[#5a6a88]">Kathmandu, Nepal · Full-time</div>
                </div>
              </div>
              <a href="#journey" className="btn-arrow reveal d4 inline-flex items-center gap-2.5 bg-[#e8290b] text-white px-7 py-[14px] rounded-full text-sm font-semibold no-underline transition-all duration-300 shadow-[0_6px_24px_rgba(232,41,11,.3)] hover:bg-[#ff4422] hover:-translate-y-0.5">
                See Hiring Process <ArrowIcon/>
              </a>
            </div>

            {/* Job cards */}
            <div className="flex flex-col gap-4">
              {jobs.map((job, i) => (
                <div key={i} className={`reveal ${job.delay} job-card bg-[#f5f7fc] rounded-[14px] px-5 sm:px-8 py-5 sm:py-7 flex items-center gap-4 sm:gap-6 border-[1.5px] border-transparent transition-all duration-[.35s] ease-[cubic-bezier(.16,1,.3,1)] cursor-default relative overflow-hidden hover:bg-white hover:border-[rgba(232,41,11,.2)] hover:shadow-[0_2px_12px_rgba(13,27,62,.08)]`}>
                  <div className="j-icon w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] bg-white rounded-lg flex items-center justify-center text-xl sm:text-[22px] flex-shrink-0 shadow-[0_2px_12px_rgba(13,27,62,.08)] transition-all duration-300">{job.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="j-title text-[15px] sm:text-[17px] font-bold text-[#0d1b3e] mb-0.5 transition-colors duration-300">{job.title}</div>
                    <div className="text-[12px] sm:text-[13px] text-[#5a6a88] truncate">{job.meta}</div>
                  </div>
                  <div className="j-badge hidden sm:block px-3.5 py-[5px] rounded-full text-[11px] font-bold tracking-[.08em] uppercase bg-[rgba(13,27,62,.06)] text-[#1e3160] transition-all duration-300 flex-shrink-0">{job.badge}</div>
                  <div className="j-arrow w-9 h-9 sm:w-[38px] sm:h-[38px] border-[1.5px] border-[#b8c4d8] rounded-full flex items-center justify-center text-[#5a6a88] flex-shrink-0 transition-all duration-[.35s] ease-[cubic-bezier(.34,1.56,.64,1)]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ APPLICATION JOURNEY ════════════════════════════════ */}
        <section className="bg-[#0d1b3e] py-16 sm:py-20 md:py-24 px-5 sm:px-10 md:px-16 lg:px-20 relative overflow-hidden" id="journey">
          <div className="absolute -top-36 -right-36 w-[480px] h-[480px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(232,41,11,.1) 0%,transparent 70%)'}}/>

          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 relative z-[2] max-w-[1180px] mx-auto">
            <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[.2em] uppercase text-[#e8290b] mb-4 justify-center">
              <span className="w-5 h-0.5 bg-[#e8290b] rounded-sm"/> How It Works
            </div>
            <h2 className="reveal d1 font-playfair font-bold leading-[1.15] text-white mb-4" style={{fontSize:'clamp(28px,3.5vw,44px)'}}>
              A Big Step Forward<br/>in <em className="italic text-[#e8290b]">Your Career</em>
            </h2>
            <p className="reveal d2 text-[15px] leading-[1.8] text-white/60 max-w-[540px] mx-auto">
              From your first click to your first day — a transparent, human-centered process designed to find the right fit for both of us.
            </p>
          </div>

          <div className="relative z-[2] max-w-[1180px] mx-auto space-y-8 sm:space-y-10">
            {/* Row 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 relative">
              {/* Connector line — lg only */}
              <div className="hidden lg:block absolute top-[30px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[rgba(232,41,11,.5)] via-[rgba(184,196,216,.2)] to-[rgba(232,41,11,.5)]"/>
              {stepsRow1.map((step, i) => (
                <div key={i} className={`reveal d${i+1 <= 4 ? i+1 : ''} step-card text-center px-2 cursor-default`}>
                  <div className="step-bubble w-[54px] sm:w-[60px] h-[54px] sm:h-[60px] rounded-full bg-white/[.06] border-[1.5px] border-white/[.12] flex items-center justify-center mx-auto mb-4 relative z-[2] transition-all duration-[.4s] ease-[cubic-bezier(.34,1.56,.64,1)] font-playfair text-base sm:text-lg font-bold text-white/50">
                    {step.num}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-[.06em] mb-1">{step.name}</div>
                  <div className="text-[11px] leading-[1.6] text-white/40">{step.desc}</div>
                </div>
              ))}
            </div>
            {/* Row 2 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 relative">
              <div className="hidden lg:block absolute top-[30px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[rgba(232,41,11,.5)] via-[rgba(184,196,216,.2)] to-[rgba(232,41,11,.5)]"/>
              {stepsRow2.map((step, i) => (
                <div key={i} className={`reveal d${i+1 <= 4 ? i+1 : ''} step-card text-center px-2 cursor-default`}>
                  <div className="step-bubble w-[54px] sm:w-[60px] h-[54px] sm:h-[60px] rounded-full bg-white/[.06] border-[1.5px] border-white/[.12] flex items-center justify-center mx-auto mb-4 relative z-[2] transition-all duration-[.4s] ease-[cubic-bezier(.34,1.56,.64,1)] font-playfair text-base sm:text-lg font-bold text-white/50">
                    {step.num}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-[.06em] mb-1">{step.name}</div>
                  <div className="text-[11px] leading-[1.6] text-white/40">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA SPLIT ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left — navy */}
          <div className="bg-[#1e3160] px-8 sm:px-12 md:px-[70px] py-14 sm:py-16 md:py-20 relative overflow-hidden">
            <div className="absolute -bottom-16 -right-14 w-[240px] h-[240px] border-[48px] border-white/[.04] rounded-full pointer-events-none"/>
            <div className="reveal text-[11px] font-bold tracking-[.2em] uppercase text-white/50 mb-4">Ready to Build?</div>
            <div className="reveal d1 font-playfair font-bold text-white leading-[1.2] mb-4" style={{fontSize:'clamp(28px,3.5vw,40px)'}}>
              Build with<br/>the Best.
            </div>
            <p className="reveal d2 text-[15px] leading-[1.75] text-white/65 mb-8 max-w-[320px]">
              We're looking for individuals who challenge the status quo and drive the future of work. Your breakthrough idea starts here at FalconTech.
            </p>
            <a href="#openings" className="reveal d3 inline-flex items-center gap-2.5 bg-white text-[#0d1b3e] px-7 py-3.5 rounded-full text-[13px] font-bold no-underline transition-all duration-300 relative z-[2] hover:bg-[#f5f7fc] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,.15)]">
              Explore Openings <ArrowIcon/>
            </a>
          </div>

          {/* Right — red */}
          <div className="bg-[#e8290b] px-8 sm:px-12 md:px-[70px] py-14 sm:py-16 md:py-20 relative overflow-hidden">
            <div className="absolute -top-16 -left-14 w-[280px] h-[280px] border-[56px] border-white/[.06] rounded-full pointer-events-none"/>
            <div className="reveal text-[11px] font-bold tracking-[.2em] uppercase text-white/50 mb-4">Join Our Community</div>
            <div className="reveal d1 font-playfair font-bold text-white leading-[1.2] mb-4" style={{fontSize:'clamp(28px,3.5vw,40px)'}}>
              Ready to<br/>Join Us?
            </div>
            <p className="reveal d2 text-[15px] leading-[1.75] text-white/80 mb-8 max-w-[320px]">
              Follow our journey and stay updated on all things FalconTech. We're always looking for curious, driven individuals who want to make a difference.
            </p>
            <a href="#" className="reveal d3 inline-flex items-center gap-2.5 border-2 border-white/50 text-white px-7 py-3.5 rounded-full text-[13px] font-bold no-underline transition-all duration-300 relative z-[2] hover:bg-white/[.12] hover:border-white hover:-translate-y-0.5">
              Join the Community <ArrowIcon/>
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
