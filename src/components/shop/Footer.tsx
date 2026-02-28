import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Loggo + Tagline */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl tracking-tighter text-[C9A84C]">
            BEADLUXE
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            The destination for premium artisan beads and handcrafted jewelry
            supplies. Quality you can feel.
          </p>
          <div className="flex items-center gap-5 pt-2">
            <Instagram
              size={20}
              className="text-[#C9A84C] hover: text-white cursor-pointer transition-colors"
            />
            <Facebook
              size={20}
              className="text-[#C9A84C] hover: text-white cursor-pointer transition-colors"
            />
            <span className="text-[#C9A84C] font-bold cursor-pointer hover:text-white text-xl">
              P
            </span>
          </div>
        </div>

        {/* Column 2: Shop Links */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">
            Shop
          </h4>
          <ul className="space-y-3 flex flex-col gap-3 text-sm text-white/50">
            <li>
              <Link href="/shop" className="hover:text-[#C9A84C]">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-[#C9A84C]">
                Best Sellers
              </Link>
            </li>

            <li>
              <Link href="/shop" className="hover:text-[#C9A84C]">
                Glass Beads
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Help Links */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">
            Help
          </h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li>
              <Link href="/faq" className="hover:text-[#C9A84C]">
                FAQs
              </Link>
            </li>

            <li>
              <Link href="/shipping" className="hover:text-[#C9A84C]">
                Shipping Info
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-[#C9A84C]">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest mb-6">
            Newsletter
          </h4>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/5 border border-white/10 px-4 py-3 text-sm focus-outline-none focus:border-[#C9A84C]"
            />
            <button className="bg-[#C9A84C] text-black py-3 text-xs font-bold uppercase hover:bg-white transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center">
        <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">
          © 2025 BeadLuxe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
