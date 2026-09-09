"use client";

import { LifeBuoy, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-800 bg-slate-950 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-6 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">

        {/* ================= BRAND / COPYRIGHT ================= */}
        <div className="flex items-center gap-3">
          {/* Brand Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20 ring-1 ring-blue-500/30">
            <span className="text-sm font-extrabold tracking-tight">V</span>
          </div>

          {/* Brand Text */}
          <div>
            <p className="text-xs font-bold tracking-wider text-white">
              VINEEV EDU
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-slate-400">
              © {new Date().getFullYear()} VINEEV EDU. ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">

          {/* System Status */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
              <ShieldCheck size={13} />
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              System Secure
            </span>
          </div>

          {/* Divider */}
          <div className="hidden h-5 w-px bg-slate-800 sm:block" />

          {/* Footer Links */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#"
              className="text-[10px] font-semibold text-slate-300 transition-all duration-200 hover:text-blue-400"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-[10px] font-semibold text-slate-300 transition-all duration-200 hover:text-blue-400"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-300 transition-all duration-200 hover:text-blue-400"
            >
              <LifeBuoy size={12} className="text-slate-400 group-hover:text-blue-400" />
              Support
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 opacity-90" />
    </footer>
  );
}