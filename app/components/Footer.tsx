import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-falcon-navy text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Let's Connect */}
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            LET&apos;S CONNECT
          </h3>
          <div className="space-y-3">
            <p>
              <Mail size={20} className="inline mr-2" /> hello@falcontech.com.np
            </p>
            <p>
              <Phone size={20} className="inline mr-2" /> +977 9818721069
            </p>
            <p>
              <MapPin size={20} className="inline mr-2" /> Saraswati Nagar, near
              tax office, ward 7, Chabahil, Kathmandu
            </p>
          </div>
        </div>

        {/* Other Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">OTHER LINKS</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/blog" className="hover:text-falcon-cyan transition">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-falcon-cyan transition"
              >
                Services
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-falcon-cyan transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-falcon-cyan transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-falcon-cyan transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">FOLLOW US</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-falcon-cyan transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-falcon-cyan transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-falcon-cyan transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-falcon-cyan transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-falcon-navy-light/50 mt-8 pt-6 text-center text-sm">
        © 2026 by FALCON TECH. All rights reserved. {/* Logo placeholder */}
      </div>
    </footer>
  );
}
