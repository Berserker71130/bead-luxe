"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Password Strength Logic
  const [strength, setStrength] = useState(0);
  useEffect(() => {
    let s = 0;
    if (password.length > 6) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    setStrength(s);
  }, [password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    setIsLoading(true);

    // Simulate Registration Logic
    setTimeout(() => {
      // Mock Success
      setShowSuccess(true);

      // Auto-login after registration
      login({
        name: `${firstName} ${lastName}`,
        email: email,
        role: "customer",
      });

      // Success Redirect
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Success Toast Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            className="fixed top-0 z-[100] bg-[#C9A84C] text-black px-8 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            Welcome to BeadLuxe!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-[#111111] p-10 rounded-3xl border-[#C9A84C]/10 shadow-2xl space-y-8"
      >
        {/* Brand Logo */}
        <div className="text-center space-y-2">
          <div className="text-[#C9A84C] text-3xl font-serif tracking-widest uppercase">
            BeadLuxe
          </div>
          <h2 className="text-xl font-light text-white/90">Create Account</h2>
        </div>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [-10, 10, -10, 0] }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold ml-1">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[#C9A84C]/50 transition-all text-sm"
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold ml-1">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[#C9A84C]/50 transition-all text-sm"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold ml-1">
              Email
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C9A84C] transition-colors"
                size={18}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A84C]/50 transition-all text-sm"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C9A84C] transition-colors"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-[#C9A84C]/50 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>
            {/* Strength Indicator Bar */}
            <div className="flex gap-1 mt-2 px-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${i < strength ? (strength <= 2 ? "bg-orange-500" : "bg-[#C9A84C]") : "bg-white/5"}`}
                />
              ))}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[#C9A84C]/50 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 px-1 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 accent-[#C9A84C]"
            />
            <label
              htmlFor="terms"
              className="text-[11px] text-white/40 leading-tight"
            >
              I agree to the{" "}
              <span className="text-white">Terms of Service</span> and{" "}
              <span className="text-white">Privacy Policy</span>.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C9A84C] text-[#0A0A0A] py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#b39540] transition-all disabled:opacity-50 mt-4"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link
            href="/auth/login/"
            className="text-[#C9A84C] hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
