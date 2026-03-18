"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PageContent {
  title: string;
  description: string;
  features: string[];
}

const pageData: Record<string, PageContent> = {
  // Products pages
  "data-verification": {
    title: "Data Verification",
    description:
      "Real-time data validation across global sources with 99.9% accuracy.",
    features: [
      "Global address verification",
      "Phone number validation",
      "Email verification",
      "Name matching",
      "Fuzzy logic matching",
    ],
  },
  "document-authentication": {
    title: "Document Authentication",
    description:
      "Advanced document verification using AI-powered image analysis.",
    features: [
      "ID document extraction",
      "MRZ scanning",
      "Security feature detection",
      "Tamper detection",
      "Barcode/QR reading",
    ],
  },
  // Add all other dropdown items...
  "know-your-customer": {
    title: "Know Your Customer (KYC)",
    description: "Complete KYC workflows with AML screening and PEP checks.",
    features: [
      "Identity verification",
      "AML screening",
      "PEP/Sanctions lists",
      "Adverse media",
      "Risk scoring",
    ],
  },
  // Default fallback
  default: {
    title: "GBG Product",
    description: "World-class identity and fraud prevention solutions.",
    features: [
      "Enterprise grade",
      "Global coverage",
      "Real-time decisions",
      "99.9% accuracy",
      "24/7 support",
    ],
  },
};

export default function DynamicPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug)
    ? params.slug[0]?.toLowerCase().replace(/\s+/g, "-")
    : "";

  const content = pageData[slug as keyof typeof pageData] || pageData.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-20">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-black"
        >
          {content.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl text-gray-900 mb-16 max-w-3xl leading-relaxed"
        >
          {content.description}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#F97316] rounded-2xl flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xl font-bold text-white">→</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-[#F97316] transition-colors">
                  {feature}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
