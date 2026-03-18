"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

export default function ServiceCard({
  title,
  description,
  link,
  icon,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group bg-black rounded-xl shadow-md hover:shadow-xl p-6 border border-slate-800 hover:border-falcon-cyan transition-all duration-300 overflow-hidden h-full"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-falcon-cyan to-falcon-cyan-light rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-falcon-navy">
        {title}
      </h3>
      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
      <Link
        href={link}
        className="flex items-center text-falcon-cyan font-semibold hover:text-falcon-navy group-hover:translate-x-2 transition-all"
      >
        Learn More{" "}
        <ArrowRight
          size={20}
          className="ml-1 group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </motion.div>
  );
}
