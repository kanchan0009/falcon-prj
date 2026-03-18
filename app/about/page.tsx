"use client";
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

export default function CredoLabPage() {
  const [scrolled, setScrolled] = useState(false);
  const [awardsIdx, setAwardsIdx] = useState(0);
  const [teamIdx, setTeamIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll reveal
    const revealEls = document.querySelectorAll('.sr, .sr-l, .sr-r');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  const slideAwards = (dir: number) => {
    const track = document.getElementById('awards-track');
    if (!track) return;
    const cards = track.children.length;
    const visible = Math.floor(track.parentElement!.offsetWidth / 218);
    const max = Math.max(0, cards - visible);
    const newIdx = Math.max(0, Math.min(max, awardsIdx + dir));
    setAwardsIdx(newIdx);
    (track as HTMLElement).style.transform = `translateX(-${newIdx * 218}px)`;
  };

  const slideTeam = (dir: number) => {
    const track = document.getElementById('team-track');
    if (!track) return;
    const cards = track.children.length;
    const visible = Math.floor(track.parentElement!.offsetWidth / 224);
    const max = Math.max(0, cards - visible);
    const newIdx = Math.max(0, Math.min(max, teamIdx + dir));
    setTeamIdx(newIdx);
    (track as HTMLElement).style.transform = `translateX(-${newIdx * 224}px)`;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Head>
        <title>CredoLab – Building the Future of Behavioural Analytics</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        
        
        .sr { opacity: 0; transform: translateY(30px); transition: opacity .7s ease, transform .7s ease; }
        .sr.in { opacity: 1; transform: translateY(0); }
        .sr-l { opacity: 0; transform: translateX(-30px); transition: opacity .7s ease, transform .7s ease; }
        .sr-l.in { opacity: 1; transform: translateX(0); }
        .sr-r { opacity: 0; transform: translateX(30px); transition: opacity .7s ease, transform .7s ease; }
        .sr-r.in { opacity: 1; transform: translateX(0); }
        .d1 { transition-delay: .1s !important; }
        .d2 { transition-delay: .18s !important; }
        .d3 { transition-delay: .26s !important; }
        .d4 { transition-delay: .34s !important; }
        
        @keyframes marquee { 0%{transform:translateX(0)}100%{transform:translateX(-50%)} }
        .marquee-track { animation: marquee 20s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
        
        @keyframes floatY { 0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)} }
        .float-badge { animation: floatY 3s ease-in-out infinite; }
        
        @keyframes mapPulse {
          0%,100%{box-shadow:0 0 0 3px rgba(255,95,163,.35)}
          50%{box-shadow:0 0 0 8px rgba(255,95,163,.1)}
        }
        .map-pin-pulse { animation: mapPulse 2.2s ease-in-out infinite; }
      `}</style>

      <div className="bg-white text-[#1c1c2e]  leading-relaxed overflow-x-hidden">

        {/* Hero */}
        <section className="pt-24 pb-14">
          <div className="max-w-[1120px] mx-auto px-8">
            <div className="grid grid-cols-2 gap-12 items-center">
              <div className="sr-l">
                <h1 className="text-[44px] font-extrabold text-[#111827] leading-tight mb-4">Curious, Innovative, Driven.<br/>Sound like you?</h1>
                <p className="text-[14px] text-[#6b7280] leading-relaxed max-w-[430px] mb-7">Falcon was founded with the mission to bring the most innovative, scalable and ethical predictive analytics solutions for consumer profiling and credit decision processes.</p>
                <button className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#6B21C8] text-white rounded-md text-[13px] font-bold hover:bg-[#5a18a8] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(107,33,200,.32)] transition-all tracking-wide">Get a Demo</button>
              </div>
      
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className="bg-[#f9fafb] border-y border-[#e5e7eb] py-3.5 overflow-hidden">
          <div className="text-center text-[10px] font-bold text-[#9ca3af] tracking-widest uppercase mb-3.5">Trusted by the World&apos;s Biggest Brands</div>
          <div className="overflow-hidden">
            <div className="marquee-track flex gap-0 hover:[animation-play-state:paused]">
              {[1, 2].map((set) => (
                <div key={set} className="flex items-center gap-12 px-6 flex-shrink-0" aria-hidden={set === 2}>
                  {['MAMBU', 'tonik', 'agibank', 'STRANDS', 'Today', 'FairMoney', 'HomCredit', 'Kredivo'].map((logo, i) => (
                    <span key={i} className={`text-[13px] font-extrabold text-[#9ca3af] tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity ${logo === 'tonik' ? 'italic text-[15px] tracking-[0.01em]' : ''}`}>
                      {logo}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-[52px] pb-12 max-w-full">
          <div className="  min-w-[300px] mx-[200px] px-8">
            <div className="grid grid-cols-3 gap-30 justify-around">
              {[
                { color: 'bg-[#06c8d4]', value: '500+M', label: 'Digital Footprints', delay: 'd1' },
                { color: 'bg-[#e91e8c]', value: '50+', label: 'Countries', delay: 'd2' },
                { color: 'bg-[#00c875]', value: '0', label: 'Financial Defaults', delay: 'd3' }
              ].map((stat, i) => (
                <div key={i} className={`${stat.color} rounded-[14px] py-7 px-6 text-center text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,.13)] sr ${stat.delay}`}>
                  <div className="text-[38px] font-extrabold leading-none">{stat.value}</div>
                  <div className="text-[13px] font-semibold mt-1.5 opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-14 pb-[52px] border-t border-[#e5e7eb]">
          <div className="max-w-[1120px] mx-auto px-8">
            <div className="grid grid-cols-[260px_1fr] gap-16">
              <div className="sr-l">
                <h2 className="text-[30px] font-extrabold text-[#111827]">Our story</h2>
              </div>
              <div className="sr-r d1">
                <div className="text-[13.5px] text-[#4b5563] leading-relaxed">
                  <p className="mb-3.5"><a href="#" className="text-[#6B21C8] font-bold">Falcon</a> was founded with the same passion that drives its team forward: a continuous effort to improve financial inclusion by empowering underbanked populations.</p>
                  <p className="mb-3.5">Falcon&apos;s data-driven solutions provide actionable insights to the fintech and banking industry to improve customer communication, marketing decisions, lending decisions, and fraud prevention.</p>
                  <p className="mb-3.5">Our solutions leverage app-level behavioural data and device metadata to deliver financial services to the unbanked and underbanked, while strengthening defences against fraud. By lifting over 5,000 people into formal banking every week, we&apos;re transforming lives and building a more inclusive financial ecosystem for everyone.</p>
                  <div className="mt-3.5 flex flex-col gap-2.5">
                    {[
                      'Reduce credit risk information for 50 clients, offering higher accuracy in predictions to identify potential customers resulting in increased approval rates and reduced rejection rates.',
                      'Enhance fraud detection through fraud scores and a solution efficiently identifying fraudulent applications and aiding banks to mitigate such cases and financial losses.',
                      'Improve marketing efficiency with more targeted tools and a better ROI generation and campaigns, and more responsive, uninterrupted marketing spending.'
                    ].map((text, i) => (
                      <div key={i} className="flex gap-2.5">
                        <div className="w-[18px] h-[18px] rounded-full bg-[#6B21C8] flex-shrink-0 mt-[3px] flex items-center justify-center">
                          <svg viewBox="0 0 10 10" className="w-[9px] h-[9px] stroke-white stroke-[2.5] fill-none stroke-linecap-round stroke-linejoin-round">
                            <path d="M2 5l2.5 2.5 3.5-4"/>
                          </svg>
                        </div>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3.5">In addition to UAE, CredoLab has achieved significant success in international markets in Southeast Asia and Latin America.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="py-[52px]">
          <div className="max-w-[1120px] mx-auto px-8">
            <div className="sr">
              <h2 className="text-[28px] font-extrabold text-center text-[#111827] mb-1.5">Awards</h2>
              <p className="text-[13px] text-[#9ca3af] text-center mb-9">More than 15 awards and recognitions</p>
            </div>
            <div className="relative sr d1">
              <button onClick={() => slideAwards(-1)} className="absolute top-1/2 -translate-y-1/2 -left-[18px] w-[34px] h-[34px] rounded-full bg-white border-[1.5px] border-[#e5e7eb] shadow-[0_2px_16px_rgba(0,0,0,.09)] flex items-center justify-center text-[16px] text-[#4b5563] hover:bg-[#6B21C8] hover:text-white hover:border-[#6B21C8] transition-all z-5">‹</button>
              <div className="overflow-hidden px-1 py-3">
                <div id="awards-track" className="flex gap-[18px] transition-transform duration-[420ms]" style={{ transform: `translateX(-${awardsIdx * 218}px)` }}>
                  {[
                    { logo: 'JFNEXT', tag: 'ACCELERATE+', desc: 'Accelerate the future Fintech Award 2021' },
                    { logo: 'PLUG AND PLAY', tag: 'FINTECH PROGRAM', desc: 'FinTech in Asia, Plug and Play Fintech Program', small: true },
                    { logo: 'Efma', tag: 'INNOVATION', desc: 'Best Innovative Digital Platform Award' },
                    { logo: 'Finovate', tag: 'BEST OF SHOW', desc: 'Finovate Asia Best of Show Award' },
                    { logo: 'MAS FSTI', tag: 'GLOBAL FINTECH', desc: 'MAS Global FinTech Innovation Challenge Winner', small: true }
                  ].map((award, i) => (
                    <div key={i} className="flex-shrink-0 w-[200px] border-[1.5px] border-[#e5e7eb] rounded-[14px] py-5 px-4 text-center bg-white shadow-[0_2px_10px_rgba(0,0,0,.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_2px_16px_rgba(0,0,0,.09)] hover:border-[#6B21C8]">
                      <div className={`font-extrabold text-[#6B21C8] mb-1 ${award.small ? 'text-[13px]' : 'text-[16px]'}`}>{award.logo}</div>
                      <div className="text-[10px] font-bold text-[#9ca3af] tracking-wide mb-2">{award.tag}</div>
                      <div className="text-[11.5px] text-[#6b7280] leading-snug">{award.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => slideAwards(1)} className="absolute top-1/2 -translate-y-1/2 -right-[18px] w-[34px] h-[34px] rounded-full bg-white border-[1.5px] border-[#e5e7eb] shadow-[0_2px_16px_rgba(0,0,0,.09)] flex items-center justify-center text-[16px] text-[#4b5563] hover:bg-[#6B21C8] hover:text-white hover:border-[#6B21C8] transition-all z-5">›</button>
            </div>
          </div>
        </section>

        {/* Mission/Vision/Values */}
        <section>
          <div className="bg-[#6B21C8] py-6 px-8">
            <div className="max-w-[1120px] mx-auto flex items-center gap-8 hover:h-[200px] hover:transition-transform duration-[300ms] ">
              <div className="min-w-[180px] text-[28px] font-extrabold text-white flex-shrink-0 ">Our mission</div>
              <div className="text-[13.5px] text-white/88">CredoLab improves people&apos;s lives by powering every credit decision.</div>
            </div>
          </div>
          <div className="bg-[#e91e8c] py-6 px-8">
            <div className="max-w-[1120px] mx-auto flex items-center gap-8 hover:h-[200px] hover:transition-transform duration-[300ms]">
              <div className="min-w-[180px] text-[28px] font-extrabold text-white flex-shrink-0">Our vision</div>
              <div className="text-[13.5px] text-white/88">Easy access to fair credit for all.</div>
            </div>
          </div>
          <div className="bg-[#f3f4f6] py-6 px-8">
            <div className="max-w-[1120px] mx-auto flex items-center gap-8 hover:h-[200px] hover:transition-scale duration-[300ms]">
              <div className="min-w-[180px] text-[28px] font-extrabold text-[#111827] flex-shrink-0">Our values</div>
              <div className="text-[13.5px] text-[#4b5563]">Audaciously Selfless. CredoLab employees are proactive in identifying opportunities for themselves and others. They are driven, curious, and always looking to create more value.</div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-[60px]">
          <div className="max-w-[1120px] mx-auto px-8">
            <div className="sr">
              <h2 className="text-[28px] font-extrabold text-center text-[#111827] mb-1.5">Our team</h2>
              <p className="text-[13px] text-[#9ca3af] text-center mb-9">The people behind the magic at CredoLab</p>
            </div>
            <div className="relative mt-9">
              <button onClick={() => slideTeam(-1)} className="absolute top-1/2 -translate-y-1/2 -left-[18px] w-[34px] h-[34px] rounded-full bg-white border-[1.5px] border-[#e5e7eb] shadow-[0_2px_16px_rgba(0,0,0,.09)] flex items-center justify-center text-[16px] text-[#4b5563] hover:bg-[#6B21C8] hover:text-white hover:border-[#6B21C8] transition-all z-5">‹</button>
              <div className="overflow-hidden px-1 py-2">
                <div id="team-track" className="flex gap-6 transition-transform duration-[420ms]" style={{ transform: `translateX(-${teamIdx * 224}px)` }}>
                  {[
                    { initials: 'PB', name: 'Peter Barcak', title: 'Co-Founder & Chief Executive Officer', gradient: 'from-[#7c3aed] to-[#4c1d95]', delay: 'd1' },
                    { initials: 'MT', name: 'Michel T. Tuzo', title: 'Co-Founder & Chief Strategy Officer', gradient: 'from-[#e91e8c] to-[#be185d]', delay: 'd2' },
                    { initials: 'MH', name: 'Marek Hoffman', title: 'Chief Operating Officer', gradient: 'from-[#06b6d4] to-[#0891b2]', delay: 'd3' },
                    { initials: 'CF', name: 'Chrischa Furke', title: 'Chief Financial Officer', gradient: 'from-[#10b981] to-[#059669]', delay: 'd4' },
                    { initials: 'SC', name: 'Sarah Chen', title: 'Chief Technology Officer', gradient: 'from-[#f59e0b] to-[#d97706]', delay: '' }
                  ].map((member, i) => (
                    <div key={i} className={`flex-shrink-0 w-[200px] text-center sr ${member.delay}`} style={{ transitionDelay: i === 4 ? '.42s' : undefined }}>
                      <div className={`w-[100px] h-[100px] rounded-full mx-auto mb-2.5 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,.12)] flex items-center justify-center text-[32px] font-extrabold text-white bg-gradient-to-br ${member.gradient}`}>{member.initials}</div>
                      <div className="w-[22px] h-[22px] bg-[#0077b5] rounded-md mx-auto mb-2 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                        </svg>
                      </div>
                      <div className="text-[13px] font-bold text-[#111827]">{member.name}</div>
                      <div className="text-[11.5px] text-[#9ca3af] mt-[3px] leading-snug whitespace-pre-line">{member.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => slideTeam(1)} className="absolute top-1/2 -translate-y-1/2 -right-[18px] w-[34px] h-[34px] rounded-full bg-white border-[1.5px] border-[#e5e7eb] shadow-[0_2px_16px_rgba(0,0,0,.09)] flex items-center justify-center text-[16px] text-[#4b5563] hover:bg-[#6B21C8] hover:text-white hover:border-[#6B21C8] transition-all z-5">›</button>
            </div>
            <div className="flex justify-center mt-8">
              <button className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#6B21C8] text-white rounded-md text-[13px] font-bold hover:bg-[#5a18a8] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(107,33,200,.32)] transition-all tracking-wide">Show team members</button>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="bg-[#5a1a9e] py-14 px-8 text-center">
          <h2 className="text-[28px] font-extrabold text-white mb-1.5 sr">Our office locations</h2>
          <p className="text-[13px] text-white/65 mb-9 sr d1">Where the magic happens</p>
          <div className="max-w-[780px] mx-auto bg-white/7 rounded-[18px] p-6 relative overflow-hidden sr d2">
            <svg className="w-full h-auto opacity-55" viewBox="0 0 900 440" fill="none">
              <path d="M90,60 L185,52 L225,82 L248,130 L238,195 L215,248 L185,285 L148,298 L112,278 L78,245 L58,200 L65,145 Z" fill="white" opacity="0.45"/>
              <path d="M198,20 L255,15 L275,32 L265,65 L235,78 L200,68 Z" fill="white" opacity="0.3"/>
              <path d="M165,295 L222,288 L258,315 L272,370 L252,425 L218,435 L182,420 L158,385 L145,340 Z" fill="white" opacity="0.45"/>
              <path d="M440,58 L510,52 L545,72 L540,115 L508,138 L462,132 L438,108 Z" fill="white" opacity="0.45"/>
              <path d="M445,140 L518,132 L558,160 L568,235 L548,318 L516,358 L474,365 L432,332 L408,268 L415,195 L428,158 Z" fill="white" opacity="0.45"/>
              <path d="M558,48 L720,40 L808,68 L842,112 L835,168 L778,192 L718,182 L664,192 L608,180 L568,155 L548,118 L538,72 Z" fill="white" opacity="0.45"/>
              <path d="M695,192 L748,186 L778,210 L768,258 L738,278 L698,272 L672,248 L678,212 Z" fill="white" opacity="0.4"/>
              <path d="M800,88 L828,82 L842,100 L834,128 L810,135 L792,120 Z" fill="white" opacity="0.35"/>
              <path d="M748,302 L835,296 L876,322 L872,378 L835,408 L782,412 L738,385 L726,342 Z" fill="white" opacity="0.45"/>
            </svg>
            {[{l:53,t:38}, {l:67,t:32}, {l:74,t:44}, {l:49,t:29}].map((pos, i) => (
              <div key={i} className="absolute w-3 h-3 rounded-full bg-[#ff5fa3] border-2 border-white map-pin-pulse" style={{left:`${pos.l}%`,top:`${pos.t}%`, animationDelay: `${i * 0.5}s`}}></div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-[68px] pb-14">
          <div className="max-w-[1120px] mx-auto px-8">
            <div className="sr">
              <h2 className="text-[28px] font-extrabold text-center text-[#111827] mb-1.5">We&apos;d love to hear from you</h2>
              <p className="text-[13px] text-[#9ca3af] text-center mb-9">Let&apos;s talk about how we can work together</p>
            </div>
            <div className="max-w-[680px] mx-auto flex flex-col gap-3.5 sr d1">
              <input type="text" placeholder="Name" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#e5e7eb] rounded-lg text-[13.5px] text-[#111827] outline-none focus:border-[#6B21C8] focus:shadow-[0_0_0_3px_rgba(107,33,200,.1)] transition-all placeholder:text-[#9ca3af]" />
              <input type="email" placeholder="Email" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#e5e7eb] rounded-lg text-[13.5px] text-[#111827] outline-none focus:border-[#6B21C8] focus:shadow-[0_0_0_3px_rgba(107,33,200,.1)] transition-all placeholder:text-[#9ca3af]" />
              <input type="text" placeholder="Company" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#e5e7eb] rounded-lg text-[13.5px] text-[#111827] outline-none focus:border-[#6B21C8] focus:shadow-[0_0_0_3px_rgba(107,33,200,.1)] transition-all placeholder:text-[#9ca3af]" />
              <input type="tel" placeholder="Phone" className="w-full px-3.5 py-2.5 border-[1.5px] border-[#e5e7eb] rounded-lg text-[13.5px] text-[#111827] outline-none focus:border-[#6B21C8] focus:shadow-[0_0_0_3px_rgba(107,33,200,.1)] transition-all placeholder:text-[#9ca3af]" />
              <textarea placeholder="How can we help you?" rows={4} className="w-full px-3.5 py-2.5 border-[1.5px] border-[#e5e7eb] rounded-lg text-[13.5px] text-[#111827] outline-none focus:border-[#6B21C8] focus:shadow-[0_0_0_3px_rgba(107,33,200,.1)] transition-all placeholder:text-[#9ca3af] resize-none"></textarea>
              <button 
                onClick={handleSubmit}
                className={`self-center px-7 py-3 rounded-lg text-[14px] font-bold transition-all ${submitted ? 'bg-[#22c55e] text-white' : 'bg-[#6B21C8] text-white hover:bg-[#5a18a8] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(107,33,200,.3)] active:scale-[0.98]'}`}
              >
                {submitted ? '✓ Message sent!' : 'Submit'}
              </button>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-[#f9fafb] border-t border-[#e5e7eb] py-[52px] px-8 text-center">
          <div className="sr">
            <h3 className="text-[22px] font-extrabold text-[#111827] mb-2">Unlock the Power of Behavioural Insights and Scores</h3>
            <p className="text-[13px] text-[#6b7280] mb-5 max-w-[540px] mx-auto">See how CredoLab can help your business make better lending decisions, prevent fraud, and protect against financial crime.</p>
            <div className="flex items-center justify-center gap-3 flex-wrap mb-2.5">
              <button className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#6B21C8] text-white rounded-md text-[13px] font-bold hover:bg-[#5a18a8] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(107,33,200,.32)] transition-all tracking-wide">Get a Demo</button>
              <input type="email" placeholder="Sign up for our newsletter" className="px-4 py-2.5 border-[1.5px] border-[#e5e7eb] rounded-md text-[13px] outline-none focus:border-[#6B21C8] transition-all w-[220px] placeholder:text-[#9ca3af]" />
              <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-transparent text-[#6B21C8] border-[1.5px] border-[#6B21C8] rounded-md text-[13px] font-bold hover:bg-[rgba(107,33,200,.06)] transition-all tracking-wide">Subscribe</button>
            </div>
            <div className="flex gap-2.5 items-center flex-wrap justify-center mt-2.5">
              {['🔒 GDPR', '🏅 ISO 27001', '🛡 PDPA', '📋 LGPD'].map((badge, i) => (
                <span key={i} className="text-[10.5px] font-bold text-[#9ca3af] flex items-center gap-1">{badge}</span>
              ))}
            </div>
          </div>
        </section>

        
      </div>
    </>
  );
}
