"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Search, Heart, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlistStore } from "@/store/wishlistStore";
import CartDrawer from "@/components/shop/CartDrawer"; // 1. Back to standard import
import SearchModal from "@/components/shop/SearchModal";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // 2. The "Hydration Guard"
  const pathname = usePathname();

  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;

  // 3. Handle Scroll AND Mounting in one effect
  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 px-6 py-4 ${
        isScrolled || !isHomePage
          ? "bg-[#0A0A0A] border-b border-[#C9A84C]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-serif text-[#C9A84C] tracking-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          BeadLuxe
        </Link>

        {/* Nav Links - Now static and fast! */}
        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-[0.2em] font-medium text-white/90">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-[#C9A84C] transition-colors">
            Shop
          </Link>
          <Link
            href="/collections"
            className="hover:text-[#C9A84C] transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="hover:text-[#C9A84C] transition-colors"
          >
            About
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-5 text-white">
          {/* Search Modal Trigger */}
          <SearchModal>
            <button className="outline-none">
              <Search className="w-5 h-5 cursor-pointer hover:text-[#C9A84C] transition-colors" />
            </button>
          </SearchModal>

          {/* Wishlist - Guarded by hasMounted */}
          <Link href="/wishlist" className="relative">
            <Heart className="w-5 h-5 cursor-pointer hover:text-[#C9A84C] transition-colors" />
            {hasMounted && wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Section - Guarded by hasMounted */}
          {hasMounted ? (
            <CartDrawer>
              <button className="relative outline-none">
                <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-[#C9A84C] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </CartDrawer>
          ) : (
            <div className="w-5 h-5" /> // Placeholder while mounting to prevent layout shift
          )}

          <Link href="/account">
            <User className="w-5 h-5 cursor-pointer hover:text-[#C9A84C] transition-colors" />
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* ... (Mobile Drawer remains the same) */}
    </nav>
  );
};

export default Navbar;
