"use client";

import { useEffect } from "react";

export default function ConsultantPage() {
  const handleClick = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    document
      .querySelectorAll(".page-btn:not(.nav)")
      .forEach((b: Element) => b.classList.remove("active"));

    if (!target.classList.contains("nav")) {
      target.classList.add("active");
    }
  };

  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    const delays = [0, 0.1, 0.2, 0.1, 0.2, 0.3, 0.2, 0.3, 0.4];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const safeIndex = parseInt(card.dataset.index || "0");
            card.classList.add("visible");
            card.style.setProperty("--delay", `${delays[safeIndex] || 0}s`);

            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 },
    );

    cards.forEach((c, index) => {
      (c as HTMLElement).dataset.index = index.toString();
      observer.observe(c);
    });

    // Pagination listeners
    document.querySelectorAll(".page-btn").forEach((btn) => {
      btn.addEventListener("click", handleClick as any);
    });

    return () => {
      observer.disconnect();
      document.querySelectorAll(".page-btn").forEach((btn) => {
        btn.removeEventListener("click", handleClick as any);
      });
    };
  }, []);

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Senior Strategy Consultant",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Technology Consultant",
      img: "https://randomuser.me/api/portraits/men/39.jpg",
    },
    {
      name: "Elena Rodriguez",
      role: "Financial Advisor",
      img: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
      name: "David Kim",
      role: "Operations Consultant",
      img: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      name: "Lisa Wong",
      role: "HR Consultant",
      img: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      name: "Robert Taylor",
      role: "Marketing Strategist",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      name: "Aisha Patel",
      role: "Business Analyst",
      img: "https://randomuser.me/api/portraits/women/29.jpg",
    },
    {
      name: "James Wilson",
      role: "Risk Management Expert",
      img: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      name: "Maria Garcia",
      role: "Digital Transformation Lead",
      img: "https://randomuser.me/api/portraits/women/37.jpg",
    },
  ];

  return (
    <>
      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card.visible {
          animation: cardEntrance 0.6s ease forwards;
          animation-delay: var(--delay, 0s);
        }

        .star {
          transition: opacity 0.3s;
        }

        .card.visible .star {
          opacity: 1;
        }
      `}</style>

      <div className="bg-[#fafaf8] text-[#3d3d5c] min-h-screen">
        {/* HERO */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#4a2020] px-10 py-16 text-white">
          <p className="uppercase tracking-[3px] text-sm text-[#f4a89f]">
            Consultants
          </p>
          <h1 className="text-4xl font-bold mt-2">
            Our Expert <span className="text-[#f4a89f]">Consultants</span>
          </h1>
        </div>

        {/* GRID */}
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="card bg-white p-6 rounded-xl shadow-lg opacity-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Stars */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star opacity-0">
                      ⭐
                    </span>
                  ))}
                </div>

                {/* Expertise */}
                <p className="text-sm text-gray-500 mb-4">
                  Expert in delivering transformative business solutions with
                  proven track record.
                </p>

                {/* Profile */}
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-[#f4a89f]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-10">
            <button className="page-btn px-3 py-1 border rounded">1</button>
            <button className="page-btn active px-3 py-1 border rounded bg-[#e8736a] text-white">
              2
            </button>
            <button className="page-btn px-3 py-1 border rounded">3</button>
          </div>
        </div>
      </div>
    </>
  );
}
