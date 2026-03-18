"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sachin Bade",
    role: "Owner, Bade's Cafe",
    quote: "Professionalism and dedication exceeded expectations.",
    rating: 5,
  },
  {
    name: "Er. Sagun Kadel",
    role: "Co-Founder, Wisdom Builders",
    quote: "Meticulous work, attention to detail outstanding.",
    rating: 5,
  },
  {
    name: "Nabin Basnet",
    role: "CEO, Somerville Communications",
    quote: "Website exceeded expectations, fast and stunning.",
    rating: 5,
  },
  {
    name: "Rojan Gurung",
    role: "Managing Director",
    quote: "E-commerce platform doubled our sales.",
    rating: 5,
  },
  {
    name: "Paulinho Santos",
    role: "Owner, Tabalo",
    quote: "Helped after previous agency failed us.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-falcon-navy mb-16"
        >
          Testimonials
        </motion.h2>

        <div className="relative">
          {/* Dots */}
          <div className="flex justify-center mb-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-falcon-cyan scale-125"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Active testimonial */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-2xl border border-slate-100"
          >
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-falcon-gold text-falcon-gold"
                />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl font-medium text-slate-800 italic mb-8 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className="font-semibold text-falcon-navy">
              — {testimonials[currentIndex].name}
            </div>
            <div className="text-slate-600">
              {testimonials[currentIndex].role}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
