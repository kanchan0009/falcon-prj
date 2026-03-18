"use client";
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

export default function GBGKYCPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll reveal logic
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));

    // Risk bars animation
    const riskBars = document.querySelectorAll('.risk-bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const target = e.target as HTMLElement;
          const finalWidth = target.style.width;
          target.style.width = '0%';
          setTimeout(() => { target.style.width = finalWidth; }, 200);
          barObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    riskBars.forEach((bar) => barObserver.observe(bar));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
      barObserver.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "What does KYC mean?", a: "KYC stands for Know Your Customer. It is a set of processes businesses use to verify the identity of their clients before and during providing services, ensuring compliance with anti-money laundering (AML) regulations." },
    { q: "What is the KYC procedure?", a: "The KYC procedure typically involves collecting customer identification documents, verifying them against trusted data sources, screening against sanctions and PEP lists, and conducting ongoing due diligence monitoring." },
    { q: "Does the KYC process exist in AML?", a: "Yes, KYC is a critical component of AML (Anti-Money Laundering) compliance. KYC forms the foundation of AML programs by establishing who your customers are before assessing the risk they present." },
    { q: "How is KYC verification typically done?", a: "KYC verification is done through document checks, biometric face matching, liveness detection, and database screening. Modern digital KYC can be completed online in minutes." },
    { q: "Why is KYC important?", a: "KYC is important because it helps businesses prevent fraud, money laundering, and other financial crimes while ensuring regulatory compliance and protecting their reputation." },
    { q: "How is KYC used by banks?", a: "Banks use KYC to verify customer identities at account opening, monitor transactions for suspicious activity, screen against sanctions lists, and comply with financial regulations from bodies like the FCA and FinCEN." },
    { q: "What does the KYC process include?", a: "The KYC process includes customer identification, document verification, biometric checks, risk assessment, sanctions and PEP screening, adverse media checks, and ongoing monitoring of customer activity." },
  ];

  return (
    <>
      <Head>
        <title>GBG – Know Your Customer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { font-family: 'Manrope', sans-serif; }
        
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-32px); transition: opacity .65s ease, transform .65s ease; }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(32px); transition: opacity .65s ease, transform .65s ease; }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }
        .delay-1 { transition-delay: .1s !important; }
        .delay-2 { transition-delay: .2s !important; }
        .delay-3 { transition-delay: .3s !important; }
        
        .hover-card { transition: transform .25s, box-shadow .25s; }
        .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 40px rgba(0,0,0,.12); }
        
        @keyframes floatBadge { 0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)} }
        .float-badge { animation: floatBadge 3s ease-in-out infinite; }
        
        @keyframes mapPulse { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.8);opacity:.5} }
        .map-dot-pulse { animation: mapPulse 2.2s ease-in-out infinite; }
        .map-dot-pulse:nth-child(2){animation-delay:.5s}
        .map-dot-pulse:nth-child(3){animation-delay:1s}
        
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        .stagger > * { animation: slideUp .5s ease both; }
        .stagger > *:nth-child(1){animation-delay:.05s}
        .stagger > *:nth-child(2){animation-delay:.12s}
        .stagger > *:nth-child(3){animation-delay:.19s}
        .stagger > *:nth-child(4){animation-delay:.26s}
        
        .risk-bar-fill { transition: width 1.5s ease; }
      `}</style>

      <div className="text-[#111827] bg-white text-[15px] leading-relaxed overflow-x-hidden">
        

        {/* Hero */}
        <section className="pt-[100px] pb-[60px]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="grid grid-cols-2 gap-[50px] items-center">
              <div className="reveal-left">
                <div className="inline-flex items-center gap-1.5 bg-[#e8f0fd] text-[#1a56db] text-[11px] font-bold px-3 py-1.5 rounded-full mb-4 border border-[#1a56db]/15 tracking-wider">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Know your customer (KYC)
                </div>
                <h1 className="text-[46px] font-extrabold text-[#111827] leading-tight mb-4">Know your<br/>customer</h1>
                <p className="text-[14.5px] text-[#6b7280] leading-relaxed mb-7 max-w-[420px]">Build compliant customer relationships based on trust with fast, accurate and secure identity verification.</p>
                <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1a56db] text-white rounded-md text-[13px] font-bold hover:bg-[#1344b0] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(26,86,219,.35)] transition-all">Get a demo</button>
              </div>
              <div className="reveal-right delay-1">
                <div className="bg-white rounded-[18px] p-4 shadow-lg border border-[#f3f4f6] hover-card relative overflow-visible">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#f8b4c8] to-[#d4a0f7] flex items-center justify-center text-lg">👩</div>
                    <div>
                      <div className="font-bold text-[13px]">Emma Hernández</div>
                      <div className="text-[11px] text-[#9ca3af]">Customer profile</div>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <span className="text-[11px] text-[#9ca3af]">Date of birth</span>
                      <span className="text-[11px] text-[#9ca3af]">Country of origin</span>
                    </div>
                  </div>
                  <div className="w-full h-[200px] rounded-[14px] mb-3 bg-gradient-to-br from-[#f0e6ff] to-[#e8f0fd] flex items-center justify-center overflow-hidden">
                    <div className="w-[130px] h-[175px] bg-gradient-to-b from-[#f9a8d4] via-[#c4b5fd] to-[#93c5fd] rounded-t-[65px] relative overflow-hidden flex items-end justify-center">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[52px] h-[52px] bg-gradient-to-br from-[#fde68a] to-[#fca5a5] rounded-full"></div>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2 stagger">
                    {[
                      { icon: 'red', label: 'Risk screening', color: '#ef4444' },
                      { icon: 'blue', label: 'Documents', color: '#1a56db' },
                      { icon: 'purple', label: 'Biometrics', color: '#7c3aed' },
                      { icon: 'gray', label: 'Watchlists', color: '#6b7280' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-[13px] text-[#374151] font-semibold">
                        <div className={`w-[22px] h-[22px] rounded-md flex items-center justify-center flex-shrink-0 ${item.icon === 'red' ? 'bg-red-100' : item.icon === 'blue' ? 'bg-blue-100' : item.icon === 'purple' ? 'bg-violet-100' : 'bg-[#f3f4f6]'}`}>
                          <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="none" stroke={item.color} strokeWidth="2.5" strokeLinecap="round">
                            {i === 0 && <><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></>}
                            {i === 1 && <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></>}
                            {i === 2 && <><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>}
                            {i === 3 && <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
                          </svg>
                        </div>
                        {item.label}
                        <div className="w-2 h-2 rounded-full bg-[#0fba5a] ml-auto"></div>
                      </li>
                    ))}
                  </ul>
                  <div className="absolute -bottom-3 right-5 bg-white rounded-xl px-3.5 py-2 shadow-md border border-green-100 flex items-center gap-1.5 text-[12px] font-bold text-[#0fba5a] float-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0fba5a" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M9 12l2 2 4-4"/><path d="M12 2a10 10 0 110 20A10 10 0 0112 2z"/>
                    </svg>
                    Customer verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Row */}
        <section className="py-12 border-y border-[#e5e7eb]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="grid grid-cols-3 gap-8">
              {[
                { icon: 'blue', title: 'All-in-one identity platform', desc: 'GBG Go brings identity intelligence, comprehensive compliance and global coverage together in one place.', color: '#1a56db', bg: '#e8f0fd' },
                { icon: 'green', title: 'Automate customer screening', desc: 'Automate customer onboarding and screening workflows to run through the identity validation process for greater risk resilience.', color: '#0fba5a', bg: '#dcfce7' },
                { icon: 'purple', title: 'Advance identity proofing', desc: 'Advanced document and biometric identity checks reduce the risk of synthetic and fraudulent identities in onboarding.', color: '#7c3aed', bg: '#ede9fe' }
              ].map((item, i) => (
                <div key={i} className={`reveal delay-${i+1}`}>
                  <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-3.5`} style={{ backgroundColor: item.bg }}>
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round">
                      {i === 0 && <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12l2 2 4-4"/></>}
                      {i === 1 && <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>}
                      {i === 2 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>}
                    </svg>
                  </div>
                  <div className="text-[14px] font-bold text-[#111827] mb-1.5">{item.title}</div>
                  <div className="text-[13px] text-[#6b7280] leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero 2 */}
        <section className="py-20 text-center">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="reveal">
              <h2 className="text-[36px] font-extrabold text-[#111827] leading-tight max-w-[600px] mx-auto mb-4">Automate KYC and AML compliance around the world</h2>
              <p className="text-[14px] text-[#6b7280] leading-relaxed max-w-[520px] mx-auto mb-7">GBG Go is the all-in-one identity platform for fast, easy and safe business growth. GBG Go delivers global coverage, comprehensive capabilities, and user-friendly configuration to optimise every genuine customer interaction.</p>
              <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-transparent text-[#1a56db] border-[1.5px] border-[#1a56db] rounded-md text-[13px] font-bold hover:bg-[#e8f0fd] transition-all">Learn more</button>
            </div>
          </div>
        </section>

        {/* Split: Due Diligence */}
        <section className="py-[72px]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="reveal-left">
                <div className="text-[#1a56db] text-[11px] font-bold tracking-widest uppercase mb-2.5">Customer due diligence</div>
                <h2 className="text-[26px] font-extrabold text-[#111827] leading-tight mb-3.5">Complete customer due diligence</h2>
                <p className="text-[13.5px] text-[#6b7280] leading-relaxed mb-5">Carry out customer due diligence (CDD) with the most up-to-date and accurate sanctions, PEPs and Adverse Media data. Our comprehensive database spans 240+ countries covering over 4,000 lists. Support on-going and triggered rescreening at intervals you choose.</p>
                <a href="#" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#1a56db] hover:gap-2 transition-all">
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div className="reveal-right delay-1">
                <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-md overflow-hidden hover-card">
                  <div className="px-4 py-3 border-b border-[#f3f4f6] flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#374151]">Customer Screening</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d]">Live</span>
                  </div>
                  <div className="px-4 py-3">
                    {[
                      { initials: 'JW', name: 'Jack Walsh', id: '#84729 · UK', status: 'Cleared', color: 'from-blue-400 to-blue-700', badge: 'bg-[#dcfce7] text-[#15803d]' },
                      { initials: 'AR', name: 'Alicia Ramos', id: '#83201 · ES', status: 'Review', color: 'from-amber-400 to-amber-600', badge: 'bg-[#fef9c3] text-[#a16207]' },
                      { initials: 'DK', name: 'Dmitri Kozlov', id: '#81995 · RU', status: 'Flagged', color: 'from-pink-400 to-pink-700', badge: 'bg-[#fee2e2] text-[#b91c1c]' },
                      { initials: 'RL', name: 'Ruth Collins', id: '#80441 · US', status: 'Cleared', color: 'from-emerald-400 to-emerald-600', badge: 'bg-[#dcfce7] text-[#15803d]' }
                    ].map((person, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2 border-b border-[#f3f4f6] last:border-0">
                        <div className={`w-[34px] h-[34px] rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center text-[13px] font-bold text-white`}>{person.initials}</div>
                        <div>
                          <div className="text-[13px] font-semibold">{person.name}</div>
                          <div className="text-[11px] text-[#9ca3af]">ID: {person.id}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto ${person.badge}`}>{person.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split: Risk Screening */}
        <section className="py-[72px] bg-[#f9fafb]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="reveal-right order-2">
                <div className="text-[#1a56db] text-[11px] font-bold tracking-widest uppercase mb-2.5">AML risk screening</div>
                <h2 className="text-[26px] font-extrabold text-[#111827] leading-tight mb-3.5">Run automated risk screening</h2>
                <p className="text-[13.5px] text-[#6b7280] leading-relaxed mb-5">Fully automate risk screening across sanctions, PEPs and adverse media using the most accurate and comprehensive data available. Check PEPs from 250+ countries, Adverse Media from CFPB, OFAC and easily define the risk criteria you want to meet, as well as the best automation for each outcome.</p>
                <a href="#" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#1a56db] hover:gap-2 transition-all">
                  Discover more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div className="reveal-left delay-1 order-1">
                <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-md overflow-hidden hover-card">
                  <div className="px-4 py-3 border-b border-[#f3f4f6] flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#374151]">Risk Score Dashboard</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e8f0fd] text-[#1a56db]">Live</span>
                  </div>
                  <div className="px-4 py-3">
                    {[
                      { label: 'Sanctions Exposure', value: 'Low', color: '#0fba5a', width: '18%' },
                      { label: 'PEP Match', value: 'Medium', color: '#f59e0b', width: '52%' },
                      { label: 'Adverse Media', value: 'High', color: '#ef4444', width: '78%' },
                      { label: 'Overall Risk Score', value: '45 / 100', color: '#f59e0b', width: '45%' }
                    ].map((risk, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between text-[11px] text-[#6b7280] mb-1">
                          <span>{risk.label}</span>
                          <span style={{ color: risk.color }} className="font-bold">{risk.value}</span>
                        </div>
                        <div className="h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                          <div className="h-full rounded-full risk-bar-fill" style={{ backgroundColor: risk.color, width: risk.width }}></div>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-3.5">
                      <button className="px-3 py-1.5 text-[11px] font-bold text-[#1a56db] border border-[#1a56db] rounded-md hover:bg-[#e8f0fd] transition-all">Flag for review</button>
                      <button className="px-3 py-1.5 text-[11px] font-bold text-white bg-[#1a56db] rounded-md hover:bg-[#1344b0] transition-all">Approve</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split: GBG Go */}
        <section className="py-[72px]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="reveal-left">
                <div className="text-[#1a56db] text-[11px] font-bold tracking-widest uppercase mb-2.5">GBG Go</div>
                <h2 className="text-[26px] font-extrabold text-[#111827] leading-tight mb-3.5">GBG Go</h2>
                <p className="text-[13.5px] text-[#6b7280] leading-relaxed mb-5">GBG Go is the all-in-one identity platform for fast, easy, and safe business growth. Help your team make accurate and informed decisions about every single identity, in real-time. Complete real-time checks and access all of our identity solutions in one place. Investigate, get started and discover all of the value of GBG Go now.</p>
                <a href="#" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#1a56db] hover:gap-2 transition-all">
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div className="reveal-right delay-1">
                <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-md p-4 hover-card">
                  <div className="text-[13px] font-extrabold text-[#111827] mb-3.5 flex items-center gap-1.5">
                    <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                      <path d="M14 2L3 8v12l11 6 11-6V8L14 2z" fill="#1a56db"/>
                      <path d="M14 2v24M3 8l11 6 11-6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    Identity Check Report
                  </div>
                  {[
                    { label: 'Customer Name', value: 'Sarah Mitchell' },
                    { label: 'Check Type', value: 'Full KYC Bundle' },
                    { label: 'Document', value: 'Passport · Valid' },
                    { label: 'Biometrics', value: '98.4% match' },
                    { label: 'Sanctions', value: 'No matches', color: '#0fba5a' },
                    { label: 'Result', value: '✓ Verified', color: '#0fba5a', bold: true }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between py-1.5 text-[12px] border-b border-[#f9fafb] last:border-0">
                      <span className="text-[#6b7280] font-medium">{row.label}</span>
                      <span className={`font-bold ${row.bold ? 'font-extrabold' : ''}`} style={{ color: row.color || '#111827' }}>{row.value}</span>
                    </div>
                  ))}
                  <div className="flex gap-1.5 flex-wrap mt-2.5">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#e8f0fd] text-[#1a56db]">AML Checked</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#15803d]">ID Verified</span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#fff7ed] text-[#c2410c]">PEP Reviewed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split: Biometric Verification */}
        <section className="py-[72px] bg-[#f9fafb]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="grid grid-cols-2 gap-16 items-center">
              <div className="reveal-right order-2">
                <div className="text-[#1a56db] text-[11px] font-bold tracking-widest uppercase mb-2.5">Biometric verification</div>
                <h2 className="text-[26px] font-extrabold text-[#111827] leading-tight mb-3.5">Advanced identity proofing</h2>
                <p className="text-[13.5px] text-[#6b7280] leading-relaxed mb-5">Complete advanced over-the-counter (OTC) identity proofing, making sure all phases of remote identity proofing, document authentication and liveness check are in place to prove real-world identities and meet all applicable KYC know your customer regulations.</p>
                <a href="#" className="inline-flex items-center gap-1 text-[13px] font-bold text-[#1a56db] hover:gap-2 transition-all">
                  Find out more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div className="reveal-left delay-1 order-1">
                <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-md overflow-hidden hover-card">
                  <div className="bg-gradient-to-br from-[#1a56db] to-[#2d3a8c] px-4 py-4">
                    <div className="text-[13px] font-extrabold text-white mb-1">Face Match Analysis</div>
                    <div className="text-[12px] text-white/80 font-semibold">Liveness + Document Match</div>
                  </div>
                  <div className="px-4 py-3.5 flex items-center gap-3">
                    <div className="w-16 h-[72px] rounded-lg border-2 border-[#1a56db] bg-[#f3f4f6] flex flex-col items-center justify-center gap-0.5">
                      <div className="w-11 h-12 bg-gradient-to-b from-amber-200 to-rose-300 rounded-t-[22px] rounded-b-lg"></div>
                      <div className="text-[9px] font-bold text-[#6b7280] text-center leading-tight">Document<br/>Photo</div>
                    </div>
                    <div className="flex-1 text-center text-lg text-[#1a56db] font-extrabold">→</div>
                    <div className="flex-1 text-center">
                      <div className="inline-block bg-[#0fba5a] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">✓ 98.4% Match</div>
                      <div className="text-[10px] text-[#9ca3af] mt-1">High confidence</div>
                    </div>
                    <div className="flex-1 text-center text-lg text-[#1a56db] font-extrabold">←</div>
                    <div className="w-16 h-[72px] rounded-lg border-2 border-[#0fba5a] bg-[#f3f4f6] flex flex-col items-center justify-center gap-0.5">
                      <div className="w-11 h-12 bg-gradient-to-b from-emerald-200 to-emerald-400 rounded-t-[22px] rounded-b-lg"></div>
                      <div className="text-[9px] font-bold text-[#0fba5a] text-center leading-tight">Live<br/>Selfie</div>
                    </div>
                  </div>
                  {[
                    { icon: '#1a56db', text: 'Passport — MRZ Read & NFC Verified' },
                    { icon: '#7c3aed', text: 'Liveness Check — Passed' },
                    { icon: '#f59e0b', text: 'Fraud Signals — None detected' }
                  ].map((item, i) => (
                    <div key={i} className="px-4 py-2 border-t border-[#f3f4f6] flex items-center gap-2">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={item.icon} strokeWidth="2" strokeLinecap="round">
                        {i === 0 && <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></>}
                        {i === 1 && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>}
                        {i === 2 && <><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>}
                      </svg>
                      <span className="text-[11px] text-[#4b5563] flex-1">{item.text}</span>
                      <span className="text-[#0fba5a] text-sm">✓</span>
                    </div>
                  ))}
                  <div className="px-4 py-2.5 bg-[#f9fafb] border-t border-[#f3f4f6] rounded-b-xl">
                    <div className="text-[11px] font-bold text-[#0fba5a] flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
                      </svg>
                      Identity successfully verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="py-20 bg-[#f9fafb]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="reveal text-center mb-12">
              <h2 className="text-[34px] font-extrabold text-[#111827] max-w-[560px] mx-auto mb-3">Connect safely with every genuine identity</h2>
              <p className="text-[14px] text-[#6b7280] max-w-[480px] mx-auto">For seamless onboarding and the fastest journeys possible, we offer expertly managed solutions for all your digital identity verification needs.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="reveal-left delay-1 bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                <div className="text-[14px] font-extrabold text-[#111827] mb-2 flex items-center gap-1.5">
                  <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                    <path d="M14 2L3 8v12l11 6 11-6V8L14 2z" fill="#1a56db"/>
                    <path d="M14 2v24M3 8l11 6 11-6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  GBG Trust
                </div>
                <p className="text-[13px] text-[#6b7280] mb-3.5 leading-relaxed">GBG Trust is the identity insights engine that helps businesses achieve trust — both with their consumers and within their own operations.</p>
                <a href="#" className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1a56db] hover:gap-2 transition-all">
                  Explore more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <div className="mt-4 h-[110px] bg-[#f9fafb] rounded-[10px] border border-[#f3f4f6] overflow-hidden relative flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-blue-100 relative flex items-center justify-center">
                    {[ {l:20,t:35}, {l:45,t:25}, {l:65,t:45}, {l:75,t:30}, {l:30,t:60} ].map((pos, i) => (
                      <div key={i} className="absolute w-2.5 h-2.5 bg-[#1a56db] rounded-full border-2 border-white shadow-[0_0_0_3px_rgba(26,86,219,.2)] map-dot-pulse" style={{left:`${pos.l}%`,top:`${pos.t}%`}}></div>
                    ))}
                    <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 500 200" fill="none">
                      <line x1="100" y1="70" x2="225" y2="50" stroke="#1a56db" strokeWidth="1.5" strokeDasharray="4 3"/>
                      <line x1="225" y1="50" x2="325" y2="90" stroke="#1a56db" strokeWidth="1.5" strokeDasharray="4 3"/>
                      <line x1="325" y1="90" x2="375" y2="60" stroke="#1a56db" strokeWidth="1.5" strokeDasharray="4 3"/>
                      <line x1="150" y1="120" x2="225" y2="50" stroke="#1a56db" strokeWidth="1.5" strokeDasharray="4 3"/>
                    </svg>
                    <svg className="absolute bottom-3 right-3.5 opacity-50" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="reveal-right delay-2 bg-white rounded-xl border border-[#e5e7eb] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
                <div className="text-[14px] font-extrabold text-[#111827] mb-2 flex items-center gap-1.5">
                  <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
                    <path d="M14 2L3 8v12l11 6 11-6V8L14 2z" fill="#0fba5a"/>
                    <path d="M14 2v24M3 8l11 6 11-6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                  GBG Go
                </div>
                <p className="text-[13px] text-[#6b7280] mb-3.5 leading-relaxed">Powered by the most precise data exchange with the most authoritative data sources. GBG Go powers seamless verification from 240+ countries.</p>
                <a href="#" className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1a56db] hover:gap-2 transition-all">
                  Explore more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <div className="mt-4 h-[110px] bg-[#f9fafb] rounded-[10px] border border-[#f3f4f6] overflow-hidden p-3">
                  <div className="text-[11px] font-bold text-[#374151] mb-2">Document Authentication</div>
                  <div className="flex gap-2 items-center mb-1.5">
                    <div className="w-9 h-[26px] bg-gradient-to-br from-blue-400 to-blue-700 rounded flex items-center justify-center">
                      <svg width="14" height="10" viewBox="0 0 24 16" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round">
                        <rect x="1" y="1" width="22" height="14" rx="2"/><path d="M1 6h22"/>
                      </svg>
                    </div>
                    <span className="text-[11px] text-[#4b5563]">Passport · UK</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] ml-auto">✓ Valid</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#e8f0fd] text-[#1a56db]">NFC ✓</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d]">MRZ ✓</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff7ed] text-[#c2410c]">Barcode ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-[70px]">
          <div className="max-w-[720px] mx-auto px-7 text-center reveal">
            <div className="text-[60px] text-[#1a56db] leading-none mb-2 font-serif">"</div>
            <p className="text-[22px] font-bold text-[#111827] leading-snug mb-6">Since adopting the GBG for KYC checks, St James&apos;s Place has improved its customer pass rate by <span className="text-[#1a56db]">9%</span></p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#1a56db] to-[#2d3a8c] rounded-[10px] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <path d="M14 2L3 8v12l11 6 11-6V8L14 2z" fill="rgba(255,255,255,.6)"/>
                  <path d="M14 2v24M3 8l11 6 11-6" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="text-[13px] font-extrabold text-[#111827]">The St. James&apos;s Place</div>
                <div className="text-[12px] text-[#9ca3af]">Gavin Robb · Security & KYC, St James&apos;s Place</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[72px]">
          <div className="max-w-[1100px] mx-auto px-7">
            <div className="grid grid-cols-[1fr_1.4fr] gap-16 items-start">
              <div className="reveal-left">
                <h2 className="text-[30px] font-extrabold text-[#111827] mb-2">Frequently Asked Questions about KYC</h2>
                <p className="text-[14px] text-[#6b7280] mt-2.5">Everything you need to know about know your customer compliance and identity verification.</p>
              </div>
              <div className="reveal-right">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-[#e5e7eb]">
                    <button 
                      onClick={() => toggleFaq(i)}
                      className="w-full text-left py-4 text-[14px] font-semibold text-[#111827] flex items-center justify-between gap-3 hover:text-[#1a56db] transition-colors"
                      aria-expanded={openFaq === i}
                    >
                      {faq.q}
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openFaq === i ? 'bg-[#1a56db] rotate-45' : 'bg-[#f3f4f6]'}`}>
                        <svg viewBox="0 0 12 12" className="w-[11px] h-[11px]" fill="none" stroke={openFaq === i ? 'white' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round">
                          <path d="M2 5l4 4 4-4"/>
                        </svg>
                      </div>
                    </button>
                    <div className={`text-[13.5px] text-[#6b7280] leading-relaxed overflow-hidden transition-all ${openFaq === i ? 'max-h-[200px] pb-4' : 'max-h-0'}`}>
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative overflow-hidden py-[72px] bg-gradient-to-br from-[#1a56db] via-[#1344b0] to-[#2d3a8c]">
          <svg className="absolute right-0 top-0 bottom-0 w-[380px] opacity-15" viewBox="0 0 380 300" fill="none">
            <circle cx="280" cy="80" r="160" stroke="white" strokeOpacity=".08" strokeWidth="60"/>
            <circle cx="320" cy="220" r="100" stroke="white" strokeOpacity=".06" strokeWidth="40"/>
            <circle cx="50" cy="250" r="80" stroke="white" strokeOpacity=".05" strokeWidth="30"/>
            <path d="M200 20 L280 80 L260 180 L160 220 L80 160 L100 60 Z" stroke="white" strokeOpacity=".04" strokeWidth="1" fill="none"/>
          </svg>
          <div className="max-w-[640px] mx-auto px-7 relative z-10 reveal">
            <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5 text-[11px] font-bold text-white tracking-wider mb-4">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Complete Customer Intelligence
            </div>
            <h2 className="text-[38px] font-extrabold text-white leading-tight mb-3">Complete customer<br/>intelligence</h2>
            <p className="text-[15px] text-white/70 mb-7">Connect safely with every genuine identity.</p>
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white text-[#1a56db] rounded-md text-[13px] font-bold hover:bg-[#f0f4ff] transition-all">Get a demo</button>
          </div>
        </section>

        
      </div>
    </>
  );
}
