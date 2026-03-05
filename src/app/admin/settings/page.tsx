"use client";

import { useToastStore } from "@/store/toastStore";
import {
  Bell,
  Check,
  Moon,
  Sun,
  Palette,
  Save,
  Store,
  Truck,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("General");
  const [isSaving, setIsSaving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const addToast = useToastStore((state) => state.addToast);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);

      // TRIGGER GLOBAL TOAST
      addToast(
        "Settings Saved",
        "success",
        "Store preferences have been successfully updated.",
      );
    }, 1000);
  };

  const tabs = [
    { name: "General", icon: <Store size={18} /> },
    { name: "Appearance", icon: <Palette size={18} /> },
    { name: "Notifications", icon: <Bell size={18} /> },
    { name: "Shipping", icon: <Truck size={18} /> },
  ];

  return (
    <div className="max-w-4xl space-y-8 pb-20 relative">
      <div>
        <h1 className="text-2xl font-bold text-white uppercase tracking-wider">
          Store Settings
        </h1>
        <p className="text-sm text-white/40">
          Configure your global store preferences
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-white/5 gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-4 text-sm font-medium transition-all ${
              activeTab === tab.name
                ? "text-[#C9A84C] border-b-2 border-[#C9A84C]"
                : "text-white/40 hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-6">
        {/* General Tab */}
        {activeTab === "General" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Store Name
              </label>
              <input
                type="text"
                placeholder="Art Studios"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C9A84C]/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Store Email
              </label>
              <input
                type="email"
                placeholder="admin@artstudious.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C9A84C]/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Currency
              </label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#C9A84C]/50">
                {/* FIXED: Using solid background for options to ensure text visibility */}
                <option className="bg-[#1A1A1A] text-white">NGN (₦)</option>
                <option className="bg-[#1A1A1A] text-white">USD ($)</option>
                <option className="bg-[#1A1A1A] text-white">GBP (£)</option>
              </select>
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "Appearance" && (
          <div className="space-y-8">
            <div>
              <label className="text-xs font-bold text-white/40 uppercase mb-4 block">
                Primary Brand Color
              </label>
              <div className="flex gap-4">
                {["#C9A84C", "#D4AF37", "#B8860B"].map((color) => (
                  <button
                    key={color}
                    className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    {color === "#C9A84C" && (
                      <Check size={20} className="text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span className="text-sm text-white">Dark Mode Theme</span>
              {/* FIXED: Toggle logic between Moon and Sun icons */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="bg-[#C9A84C] text-black p-2 rounded-lg transition-all active:scale-95"
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "Notifications" && (
          <div className="space-y-4">
            {[
              "Order Cofirmation",
              "Shipment Updates",
              "New Members Alerts",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5"
              >
                <span className="text-sm text-white">{item}</span>
                <div className="w-12 h-6 bg-[#C9A84C] rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shipping Tab */}
        {activeTab === "Shipping" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Flat Rate Fee
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                  ₦
                </span>
                <input
                  type="number"
                  placeholder="5000"
                  className="w-full bg-white/5 border border-white/10 rounded px-10 py-3 text-white outline-none focus:border-[#C9A84C]/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Free Shipping Threshold
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">
                  ₦
                </span>
                <input
                  type="number"
                  placeholder="150000"
                  className="w-full bg-white/5 border-white/10 rounded-xl px-10 py-3 text-white outline-none focus:border-[#C9A84C]/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-6 border-t border-white/5 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#C9A84C] hover:bg-[#A88C3D] text-black px-8 py-3 rounded-xl flex items-center gap-2 font-bold transition-all disabled:opacity-50"
          >
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
