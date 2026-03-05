"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { useToastStore } from "@/store/toastStore";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { toasts, removeToast } = useToastStore();

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      {children}

      {toasts.map(({ id, title, description, variant }) => (
        <ToastPrimitive.Root
          key={id}
          className={`
                group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-xl border p-4 shadow-lg transition-all
                ${variant === "success" ? "bg-[#111111] border-green-500/50 text-white" : ""}
                ${variant === "error" ? "bg-[#111111] border-red-500/50 text-white" : ""}
                ${variant === "info" ? "bg-[#111111] border-[C9A84C]/50 text-white" : ""}
                `}
        >
          <div className="flex items-start gap-3">
            {variant === "success" && (
              <CheckCircle className="text-green-500 mt-0.5" size={18} />
            )}
            {variant === "error" && (
              <AlertCircle className="text-red-500 mt-0.5" size={18} />
            )}
            {variant === "info" && (
              <Info className="text-[#C9A84C] mt-0.5" size={18} />
            )}

            <div className="grid gap-1">
              <ToastPrimitive.Title className="text-sm font-bold uppercase tracking-tight">
                {title}
              </ToastPrimitive.Title>
              {description && (
                <ToastPrimitive.Description className="text-xs text-white/40">
                  {description}
                </ToastPrimitive.Description>
              )}
            </div>
          </div>

          <ToastPrimitive.Close
            onClick={() => removeToast(id)}
            className="rounded-lg p-1 text-white/20 hover:text-white transition-colors"
          >
            <X size={16} />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}

      {/* Positioned at bottom-right */}
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] m-0 flex max-w-[420px] flex-col-reverse p-6 gap-3 outline-none" />
    </ToastPrimitive.Provider>
  );
};
