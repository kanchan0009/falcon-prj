// app/page.js (or pages/index.js)
'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function FalconTechCareers() {
  useEffect(() => {
    // Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if(e.isIntersecting){ 
          e.target.classList.add('in'); 
          io.unobserve(e.target); 
        } 
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    reveals.forEach(el => io.observe(el));

    // Parallax effect
    const handleScroll = () => {
      const sy = window.scrollY;
      const hr = document.querySelector('.hero-right');
      if(hr && sy < window.innerHeight) {
        hr.style.transform = `translateY(${sy * 0.07}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
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
    { num: '01', name: 'Apply Online', desc: 'Register and submit your application', delay: '' },
    { num: '02', name: 'Profile Review', desc: 'Team evaluates your background', delay: 'd1' },
    { num: '03', name: 'Screening Call', desc: 'Align on experience and goals', delay: 'd2' },
    { num: '04', name: 'Assessment', desc: 'Technical challenge to showcase skills', delay: 'd3' },
    { num: '05', name: 'Interview', desc: 'Meet the team face-to-face', delay: 'd4' },
  ];

  const stepsRow2 = [
    { num: '06', name: 'Negotiation', desc: 'Discuss compensation openly', delay: '' },
    { num: '07', name: 'References', desc: 'Deeper understanding of your track record', delay: 'd1' },
    { num: '08', name: 'HR Interview', desc: 'Culture and values alignment', delay: 'd2' },
    { num: '09', name: 'Offer', desc: 'Clear, fair and exciting offer letter', delay: 'd3' },
    { num: '10', name: 'Onboarding', desc: 'Welcome aboard — your journey begins', delay: 'd4' },
  ];

  const marqueeItems = [
    'Work From Home', 'Paid Teamwork', 'Growth Opportunities', 
    'Collaborative Culture', 'Competitive Compensation', 'Transparent Communication'
  ];

  return (
    <>
      <Head>
        <title>FalconTech — Careers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        :root {
          --navy: #0d1b3e;
          --navy-mid: #1e3160;
          --navy-light: #2a4580;
          --red: #e8290b;
          --red-light: #ff4422;
          --cream: #f5f7fc;
          --white: #ffffff;
          --grey-light: #eef1f8;
          --grey-mid: #b8c4d8;
          --grey-text: #5a6a88;
        }
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
        
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(24px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        @keyframes marquee { 
          from { transform: translateX(0); } 
          to { transform: translateX(-50%); } 
        }
        
        .hero-badge { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; opacity: 0; }
        .hero-title { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s forwards; opacity: 0; }
        .hero-desc { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards; opacity: 0; }
        .hero-actions { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s forwards; opacity: 0; }
        .hero-right { animation: fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s forwards; opacity: 0; }
        .marquee-track { animation: marquee 20s linear infinite; }
        
        .reveal { 
          opacity: 0; 
          transform: translateY(32px); 
          transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); 
        }
        .reveal.in { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; }
        .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.3s; }
        .d4 { transition-delay: 0.4s; }
        .d5 { transition-delay: 0.5s; }
        .d6 { transition-delay: 0.6s; }
        
        /* Perk card hover */
        .perk-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--red);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
          border-radius: 14px;
        }
        .perk-card:hover::after { transform: scaleY(1); }
        .perk-card > * { position: relative; z-index: 1; }
        .perk-card:hover .perk-icon-wrap { transform: scale(1.1) rotate(-5deg); }
        .perk-card.featured .perk-icon-wrap { background: rgba(255,255,255,0.15); }
        .perk-card.featured .perk-title { color: #fff; }
        .perk-card.featured .perk-desc { color: rgba(255,255,255,0.75); }
        .perk-card.featured .perk-num { color: rgba(255,255,255,0.15); }
        .perk-card.featured .perk-link { color: rgba(255,255,255,0.9); }
        .perk-card:hover .perk-name,
        .perk-card:hover .perk-desc { color: #fff; }
        .perk-card.featured:hover .perk-title { color: #fff; }
        
        /* Job card hover */
        .job-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0; width: 4px;
          background: var(--red);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          border-radius: 4px 0 0 4px;
        }
        .job-card:hover::before { transform: scaleY(1); }
        .job-card:hover { transform: translateX(4px); }
        .job-card:hover .job-icon { background: rgba(232,41,11,0.08); }
        .job-card:hover .job-title { color: var(--red); }
        .job-card:hover .job-badge { background: rgba(232,41,11,0.1); color: var(--red); }
        .job-card:hover .job-arrow { 
          background: var(--red); 
          border-color: var(--red); 
          color: #fff; 
          transform: rotate(45deg) scale(1.1); 
        }
        
        /* Step hover */
        .step-card:hover .step-bubble { 
          background: var(--red); 
          border-color: var(--red); 
          color: #fff; 
          transform: scale(1.1); 
          box-shadow: 0 8px 24px rgba(232,41,11,0.4); 
        }
        
        /* Button effects */
        .btn-red svg { transition: transform 0.3s ease; }
        .btn-red:hover svg { transform: translateX(4px); }
        .btn-play:hover { gap: 14px; }
        .btn-play:hover .play-icon { background: var(--red); }
        .btn-play:hover .play-icon svg { stroke: #fff; }
        .perk-link:hover { gap: 10px; }
        
        /* Responsive */
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; gap: 50px; }
          .about-grid { grid-template-columns: 1fr; gap: 50px; }
          .openings-grid { grid-template-columns: 1fr; gap: 50px; }
          .perks-grid-responsive { grid-template-columns: repeat(2, 1fr); }
          .steps-grid-responsive { grid-template-columns: repeat(3, 1fr); }
          .steps-grid-responsive::before { display: none; }
          .cta-split-responsive { grid-template-columns: 1fr; }
          .about-images { height: 360px; }
          .openings-left { position: static; }
        }
        @media (max-width: 600px) {
          .perks-grid-responsive { grid-template-columns: 1fr; }
          .steps-grid-responsive { grid-template-columns: 1fr; }
          .hero-actions-responsive { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="font-jakarta bg-[#f5f7fc] text-[#0d1b3e] leading-[1.6] overflow-x-hidden">
        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section className="bg-[#f5f7fc] px-20 py-20 pb-[60px] grid grid-cols-2 gap-[60px] items-center min-h-[88vh] relative overflow-hidden lg:px-10 lg:py-16 lg:pb-10 lg:min-h-auto hero-grid">
          {/* Background gradients */}
          <div className="absolute -top-[120px] -right-[100px] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(232,41,11,0.07)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute -bottom-20 left-[200px] w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(13,27,62,0.06)_0%,transparent_70%)] pointer-events-none" />
          
          <div className="relative z-[2]">
            <div className="hero-badge inline-flex items-center gap-2 bg-[rgba(232,41,11,0.08)] border border-[rgba(232,41,11,0.2)] text-[#e8290b] text-xs font-semibold tracking-[0.12em] uppercase px-4 py-[7px] rounded-full mb-7">
              <span className="inline-block w-1.5 h-1.5 bg-[#e8290b] rounded-full" />
              FalconTech Careers
            </div>
            
            <h1 className="hero-title font-playfair text-[clamp(40px,4.2vw,62px)] font-bold leading-[1.1] text-[#0d1b3e] mb-[22px]">
              Curious, Innovative,<br />
              <em className="italic text-[#e8290b]">Driven.</em><br />
              Sound Like You?
            </h1>
            
            <p className="hero-desc text-base leading-[1.75] text-[#5a6a88] font-normal max-w-[460px] mb-10">
              We specialize in embracing individuals who are driven, adaptable, and eager to grow. We value empowerment and open communication so every team member can reach their full potential.
            </p>
            
            <div className="hero-actions flex items-center gap-5 hero-actions-responsive">
              <a href="#openings" className="btn-red inline-flex items-center gap-2.5 bg-[#e8290b] text-white px-[30px] py-[15px] rounded-full text-sm font-semibold no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_6px_24px_rgba(232,41,11,0.3)] hover:bg-[#ff4422] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(232,41,11,0.4)]">
                View Open Positions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              
              <a href="#journey" className="btn-play inline-flex items-center gap-2.5 text-[#0d1b3e] text-sm font-semibold no-underline transition-all duration-300 hover:text-[#e8290b] hover:gap-3.5">
                <div className="play-icon w-11 h-11 rounded-full bg-white shadow-[0_8px_32px_rgba(13,27,62,0.12)] flex items-center justify-center transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d1b3e" strokeWidth="2.5" className="ml-0.5">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                </div>
                Our Process
              </a>
            </div>
          </div>
          
          <div className="hero-right relative z-[2]">
            <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden relative shadow-[0_20px_60px_rgba(13,27,62,0.16)]">
              <div className="w-full h-full min-h-[200px] flex items-center justify-center text-[12px] font-semibold tracking-[0.15em] uppercase rounded-[inherit] bg-gradient-to-br from-[#1a2d5a] to-[#2a4580] text-white/20">
                Team Photo
              </div>
            </div>
            
            <div className="absolute -bottom-7 -left-8 w-[44%] aspect-square rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(13,27,62,0.16)] border-4 border-white">
              <div className="w-full h-full min-h-[160px] flex items-center justify-center text-[12px] font-semibold tracking-[0.15em] uppercase rounded-[inherit] bg-gradient-to-br from-[#c5cfe8] to-[#aab8d4] text-[rgba(13,27,62,0.18)]">
                Office
              </div>
            </div>
            
            <div className="absolute top-6 -right-5 bg-white rounded-lg px-[18px] py-3.5 shadow-[0_8px_32px_rgba(13,27,62,0.12)] flex items-center gap-2.5">
              <div className="w-[38px] h-[38px] bg-[rgba(232,41,11,0.1)] rounded-lg flex items-center justify-center text-lg">
                🚀
              </div>
              <div>
                <div className="text-xl font-bold text-[#0d1b3e] leading-none">3+</div>
                <div className="text-[11px] text-[#5a6a88] font-medium">Open Roles</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ MARQUEE ════════════════════════════════════════════ */}
        <div className="bg-[#0d1b3e] py-[18px] overflow-hidden" aria-hidden="true">
          <div className="marquee-track flex whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="text-[13px] font-semibold tracking-[0.12em] uppercase text-white/70 px-10 flex-shrink-0 flex items-center gap-10">
                {item}
                <span className="text-[#e8290b] text-[10px]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ ABOUT ══════════════════════════════════════════════ */}
        <section className="py-[100px] px-20 grid grid-cols-2 gap-20 items-center bg-white lg:px-10 lg:py-[70px] about-grid">
          <div className="relative h-[480px] lg:h-[360px] reveal">
            <div className="absolute top-0 left-0 w-[65%] h-[75%] rounded-[14px] overflow-hidden shadow-[0_20px_60px_rgba(13,27,62,0.16)]">
              <div className="w-full h-full min-h-[280px] flex items-center justify-center text-[12px] font-semibold tracking-[0.15em] uppercase bg-gradient-to-br from-[#1a2d5a] to-[#2a4580] text-white/20">
                Team at Work
              </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-1/2 h-[55%] rounded-[14px] overflow-hidden shadow-[0_8px_32px_rgba(13,27,62,0.12)] border-4 border-[#f5f7fc]">
              <div className="w-full h-full min-h-[180px] flex items-center justify-center text-[12px] font-semibold tracking-[0.15em] uppercase bg-gradient-to-br from-[#c5cfe8] to-[#aab8d4] text-[rgba(13,27,62,0.18)]">
                Collaboration
              </div>
            </div>
            
            <div className="absolute bottom-20 -left-5 bg-[#e8290b] text-white px-5 py-4 rounded-lg shadow-[0_8px_32px_rgba(13,27,62,0.12)] text-center z-[3]">
              <div className="text-[28px] font-bold leading-none">15+</div>
              <div className="text-[11px] font-medium opacity-85 mt-0.5">Years of<br />Experience</div>
            </div>
          </div>
          
          <div>
            <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#e8290b] mb-[18px]">
              <span className="block w-5 h-0.5 bg-[#e8290b] rounded-sm" />
              About Our Culture
            </div>
            
            <h2 className="reveal d1 font-playfair text-[clamp(30px,2.8vw,44px)] font-bold leading-[1.15] text-[#0d1b3e] mb-5">
              Build Your Career<br />
              at <em className="italic text-[#e8290b]">FalconTech</em>
            </h2>
            
            <p className="reveal d2 text-[15px] leading-[1.8] text-[#5a6a88] mb-8 font-normal">
              We embrace individuals who are driven, adaptable, and eager to grow. With over a decade of experience, FalconTech has helped build remarkable careers and shaped the future of work. Our team of 50+ expert professionals is ready to welcome you.
            </p>
            
            <div className="reveal d3 flex gap-3 flex-wrap mb-9">
              {['Tailored Growth', 'Proven Expertise', 'Flexible Work'].map((pill, i) => (
                <div key={i} className="flex items-center gap-2 px-[18px] py-2.5 bg-[#f5f7fc] rounded-full text-[13px] font-semibold text-[#0d1b3e] border border-[#eef1f8]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8290b" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  {pill}
                </div>
              ))}
            </div>
            
            <a href="#openings" className="reveal d4 btn-red inline-flex items-center gap-2.5 bg-[#e8290b] text-white px-[30px] py-[15px] rounded-full text-sm font-semibold no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_6px_24px_rgba(232,41,11,0.3)] hover:bg-[#ff4422] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(232,41,11,0.4)]">
              Discover Open Roles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </section>

        {/* ══ PERKS ══════════════════════════════════════════════ */}
        <section className="py-[100px] px-20 bg-[#f5f7fc] relative overflow-hidden lg:px-10 lg:py-[70px]" id="perks">
          <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,41,11,0.05)_0%,transparent_70%)]" />
          
          <div className="text-center mb-[60px]">
            <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#e8290b] mb-[18px] justify-center">
              <span className="block w-5 h-0.5 bg-[#e8290b] rounded-sm" />
              Our Commitment
            </div>
            
            <h2 className="reveal d1 font-playfair text-[clamp(30px,2.8vw,44px)] font-bold leading-[1.15] text-[#0d1b3e] mb-4 max-w-[520px] mx-auto">
              Perks &amp; Benefits of<br />
              Working at <em className="italic text-[#e8290b]">FalconTech</em>
            </h2>
            
            <p className="reveal d2 text-[15px] leading-[1.8] text-[#5a6a88] max-w-[540px] mx-auto">
              Beyond our commitment to working and professionally growing together, today's cutting-edge culture lets us build great relationships and lasting careers.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 lg:gap-6 perks-grid-responsive">
            {perks.map((perk, i) => (
              <div 
                key={i} 
                className={`reveal ${perk.delay} ${perk.featured ? 'featured bg-[#e8290b] text-white' : 'bg-white'} rounded-[14px] px-[30px] py-9 relative overflow-hidden transition-all duration-[0.4s] ease-[cubic-bezier(0.16,1,0.3,1)] border border-transparent cursor-default hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(13,27,62,0.16)] hover:border-[rgba(232,41,11,0.15)]`}
              >
                <div className={`perk-num absolute top-6 right-7 font-playfair text-[40px] font-bold leading-none ${perk.featured ? 'text-white/15' : 'text-[rgba(13,27,62,0.06)]'}`}>
                  {perk.num}
                </div>
                
                <div className={`perk-icon-wrap w-[52px] h-[52px] rounded-lg flex items-center justify-center text-2xl mb-5 transition-transform duration-[0.4s] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${perk.featured ? 'bg-white/15' : 'bg-[rgba(232,41,11,0.08)]'}`}>
                  {perk.icon}
                </div>
                
                <div className={`perk-title text-[17px] font-bold mb-2.5 leading-[1.3] ${perk.featured ? 'text-white' : 'text-[#0d1b3e]'}`}>
                  {perk.title}
                </div>
                
                <p className={`perk-desc text-sm leading-[1.7] font-normal ${perk.featured ? 'text-white/75' : 'text-[#5a6a88]'}`}>
                  {perk.desc}
                </p>
                
                <a href="#" className={`perk-link inline-flex items-center gap-1.5 mt-5 text-[13px] font-semibold no-underline transition-all duration-300 hover:gap-2.5 ${perk.featured ? 'text-white/90' : 'text-[#e8290b]'}`}>
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ══ OPEN POSITIONS ═════════════════════════════════════ */}
        <section className="py-[100px] px-20 bg-white lg:px-10 lg:py-[70px]" id="openings">
          <div className="grid grid-cols-[360px_1fr] gap-20 items-start lg:grid-cols-1 lg:gap-12 openings-grid">
            <div className="lg:static sticky top-[100px]">
              <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#e8290b] mb-[18px]">
                <span className="block w-5 h-0.5 bg-[#e8290b] rounded-sm" />
                Now Hiring
              </div>
              
              <h2 className="reveal d1 font-playfair text-[clamp(30px,2.8vw,44px)] font-bold leading-[1.15] text-[#0d1b3e] mb-4">
                Current<br />
                <em className="italic text-[#e8290b]">Openings</em>
              </h2>
              
              <p className="reveal d2 text-[15px] leading-[1.8] text-[#5a6a88] mb-7">
                Please find the right opportunity below and take the first step toward your next chapter at FalconTech.
              </p>
              
              <div className="reveal d3 flex items-center gap-4 p-5 bg-[#f5f7fc] rounded-[14px] mb-8">
                <div className="font-playfair text-[52px] font-bold text-[#e8290b] leading-none">03</div>
                <div>
                  <div className="text-sm font-semibold text-[#0d1b3e]">Open Positions</div>
                  <div className="text-xs text-[#5a6a88]">Kathmandu, Nepal · Full-time</div>
                </div>
              </div>
              
              <a href="#journey" className="reveal d4 btn-red inline-flex items-center gap-2.5 bg-[#e8290b] text-white px-[30px] py-[15px] rounded-full text-sm font-semibold no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_6px_24px_rgba(232,41,11,0.3)] hover:bg-[#ff4422] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(232,41,11,0.4)]">
                See Hiring Process
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            
            <div className="flex flex-col gap-4">
              {jobs.map((job, i) => (
                <div 
                  key={i} 
                  className={`reveal ${job.delay} job-card bg-[#f5f7fc] rounded-[14px] px-[30px] py-7 flex items-center gap-6 border-[1.5px] border-transparent transition-all duration-[0.35s] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default relative overflow-hidden hover:bg-white hover:border-[rgba(232,41,11,0.2)] hover:shadow-[0_2px_12px_rgba(13,27,62,0.08)]`}
                >
                  <div className="job-icon w-[50px] h-[50px] bg-white rounded-lg flex items-center justify-center text-[22px] flex-shrink-0 shadow-[0_2px_12px_rgba(13,27,62,0.08)] transition-all duration-300">
                    {job.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="job-title text-[17px] font-bold text-[#0d1b3e] mb-1 transition-colors duration-300">
                      {job.title}
                    </div>
                    <div className="text-[13px] text-[#5a6a88]">{job.meta}</div>
                  </div>
                  
                  <div className="job-badge px-3.5 py-[5px] rounded-full text-[11px] font-bold tracking-[0.08em] uppercase bg-[rgba(13,27,62,0.06)] text-[#1e3160] transition-all duration-300 flex-shrink-0">
                    {job.badge}
                  </div>
                  
                  <div className="job-arrow w-[38px] h-[38px] border-[1.5px] border-[#b8c4d8] rounded-full flex items-center justify-center text-[#5a6a88] flex-shrink-0 transition-all duration-[0.35s] ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ APPLICATION JOURNEY ════════════════════════════════ */}
        <section className="bg-[#0d1b3e] py-[100px] px-20 relative overflow-hidden lg:px-10 lg:py-[70px]" id="journey">
          <div className="absolute -top-[150px] -right-[150px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,41,11,0.1)_0%,transparent_70%)]" />
          
          <div className="text-center mb-16 relative z-[2]">
            <div className="reveal inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-[#e8290b] mb-[18px] justify-center">
              <span className="block w-5 h-0.5 bg-[#e8290b] rounded-sm" />
              How It Works
            </div>
            
            <h2 className="reveal d1 font-playfair text-[clamp(30px,2.8vw,44px)] font-bold leading-[1.15] text-white mb-4">
              A Big Step Forward<br />
              in <em className="italic text-[#e8290b]">Your Career</em>
            </h2>
            
            <p className="reveal d2 text-[15px] leading-[1.8] text-white/60 max-w-[540px] mx-auto">
              From your first click to your first day — a transparent, human-centered process designed to find the right fit for both of us.
            </p>
          </div>
          
          <div className="steps-grid grid grid-cols-5 gap-5 relative z-[2] mb-7 lg:grid-cols-3 steps-grid-responsive">
            <div className="absolute top-[30px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[rgba(232,41,11,0.6)] via-[rgba(184,196,216,0.2)] to-[rgba(232,41,11,0.6)] lg:hidden" />
            
            {stepsRow1.map((step, i) => (
              <div key={i} className={`reveal ${step.delay} step-card text-center px-2 cursor-default`}>
                <div className="step-bubble w-[60px] h-[60px] rounded-full bg-white/[0.06] border-[1.5px] border-white/[0.12] flex items-center justify-center mx-auto mb-[18px] relative z-[2] transition-all duration-[0.4s] ease-[cubic-bezier(0.34,1.56,0.64,1)] font-playfair text-lg font-bold text-white/50">
                  {step.num}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-[0.06em] mb-1.5">
                  {step.name}
                </div>
                <div className="text-[11px] leading-[1.6] text-white/40">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
          
          <div className="steps-grid grid grid-cols-5 gap-5 relative z-[2] lg:grid-cols-3 steps-grid-responsive">
            {stepsRow2.map((step, i) => (
              <div key={i} className={`reveal ${step.delay} step-card text-center px-2 cursor-default`}>
                <div className="step-bubble w-[60px] h-[60px] rounded-full bg-white/[0.06] border-[1.5px] border-white/[0.12] flex items-center justify-center mx-auto mb-[18px] relative z-[2] transition-all duration-[0.4s] ease-[cubic-bezier(0.34,1.56,0.64,1)] font-playfair text-lg font-bold text-white/50">
                  {step.num}
                </div>
                <div className="text-xs font-bold text-white uppercase tracking-[0.06em] mb-1.5">
                  {step.name}
                </div>
                <div className="text-[11px] leading-[1.6] text-white/40">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CTA SPLIT ══════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-1 cta-split-responsive">
          <div className="bg-[#1e3160] px-[70px] py-20 relative overflow-hidden lg:px-8 lg:py-[60px]">
            <div className="absolute -bottom-20 -right-[60px] w-[260px] h-[260px] border-[50px] border-white/[0.04] rounded-full" />
            
            <div className="reveal text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
              Ready to Build?
            </div>
            
            <div className="reveal d1 font-playfair text-[40px] font-bold text-white leading-[1.2] mb-4">
              Build with<br />the Best.
            </div>
            
            <p className="reveal d2 text-[15px] leading-[1.75] text-white/65 mb-9 font-normal max-w-[320px]">
              We're looking for individuals who challenge the status quo and drive the future of work. Your breakthrough idea starts here at FalconTech.
            </p>
            
            <a href="#openings" className="reveal d3 inline-flex items-center gap-2.5 bg-white text-[#0d1b3e] px-7 py-3.5 rounded-full text-[13px] font-bold no-underline transition-all duration-300 relative z-[2] hover:bg-[#f5f7fc] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              Explore Openings
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          
          <div className="bg-[#e8290b] px-[70px] py-20 relative overflow-hidden lg:px-8 lg:py-[60px]">
            <div className="absolute -top-20 -left-[60px] w-[300px] h-[300px] border-[60px] border-white/[0.06] rounded-full" />
            
            <div className="reveal text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-4">
              Join Our Community
            </div>
            
            <div className="reveal d1 font-playfair text-[40px] font-bold text-white leading-[1.2] mb-4">
              Ready to<br />Join Us?
            </div>
            
            <p className="reveal d2 text-[15px] leading-[1.75] text-white/[0.82] mb-9 font-normal max-w-[320px]">
              Follow our journey and stay updated on all things FalconTech. We're always looking for curious, driven individuals who want to make a difference.
            </p>
            
            <a href="#" className="reveal d3 inline-flex items-center gap-2.5 border-2 border-white/50 text-white px-7 py-3.5 rounded-full text-[13px] font-bold no-underline transition-all duration-300 relative z-[2] hover:bg-white/[0.12] hover:border-white hover:-translate-y-0.5">
              Join the Community
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}