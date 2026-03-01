"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  // Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  //   setIsLoading(true);

  //   // Simulate Login Logic (DummyData)
  //   setTimeout(() => {
  //     if (email === "admin@beadluxe.com" && password === "password123") {
  //       // Wire to Zustand Store
  //       login({
  //         name: "Luxury Client",
  //         email: email,
  //         role: "customer",
  //       });

  //       // Success! Redirect to home
  //       router.push("/");
  //     } else {
  //       // Trigger Shake Animation by setting error
  //       setError("Invalid credentials. Please check your email and password.");
  //     }
  //     setIsLoading(false);
  //   }, 1500);
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 1. Check for a user registered in this browser session
    const storedUser =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("registeredUser") || "null")
        : null;

    setTimeout(() => {
      // 2. Clean the inputs
      const inputEmail = email.trim().toLowerCase();
      const inputPass = password.trim();

      // 3. Define the matches
      const isAdmin =
        inputEmail === "admin@beadluxe.com" && inputPass === "password123";
      const isRegistered =
        storedUser &&
        inputEmail === storedUser.email.toLowerCase() &&
        inputPass === storedUser.password;

      if (isAdmin || isRegistered) {
        //Success! Use correct data
        const userData = isAdmin
          ? { name: "Luxury Admin", email: inputEmail, role: "admin" }
          : {
              name: storedUser.name,
              email: storedUser.email,
              role: "customer",
            };

        login(userData);
        router.push("/account");
      } else {
        setError("Invalid credentials. Please check your email and password");
      }
      setIsLoading(false);
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6 py-20">
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
          <h2 className="text-xl font-light text-white/90">Welcome Back</h2>
        </div>

        {/* Error State: Shake Animation */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: [-10, 10, -10, 0] }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#C9A84C] transition-colors size-18" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#C9A84C]/50 transition-all"
                placeholder="email@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10-px] uppercase tracking-[0.2em] text-[#C9A84C] font-bold">
                Password
              </label>
              <Link
                href="#"
                className="text-[10px] text-white/40 hover:text-[#C9A84C] uppercase tracking-widest transition-colors"
              >
                Forgot Password
              </Link>
            </div>
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
                className="w-full bg-black/40 border border-white/5 ronded-xl py-4 pl-12 pr-12 text-whte focus:outline-none focus:border-[#C9A84C]/50 transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remeber Me */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-white/10 bg-white/5 accent-[#C9A84C]"
            />
            <label
              htmlFor="remeber"
              className="text-xs text-white/40 cursor-pointer hover:text-white/60 transition-colors"
            >
              Remember Me
            </label>
          </div>

          {/* Sign In CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#C9A84C] text-[#0A0A0A] py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#b39540] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Social Link UI */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] text-white/20">
            <span className="bg-[#111111] px-4">Or Continue With</span>
          </div>
        </div>

        <button className="w-full border border-white/5 bg-white/5 text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5 alt='Google"
          />
          <span className="text-sm font-medium">Google</span>
        </button>

        {/* Link To Register */}
        <p className="text-center text-sm text-white/40">
          New to the collection?{" "}
          <Link
            href="/auth/register/"
            className="text-[#C9A84C] hover:underline font-medium"
          >
            Join Now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
