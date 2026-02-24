"use client"

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-5">
      <div className="text-center max-w-md w-full">

        {/* Glowing 404 */}
        <div className="relative mb-8 select-none">
          <p
            className="text-[130px] font-bold leading-none text-gray-900"
            style={{ WebkitTextStroke: "1px #374151" }}
          >
            404
          </p>
          <p
            className="absolute inset-0 text-[130px] font-bold leading-none text-amber-500 opacity-10 blur-2xl"
          >
            404
          </p>
          {/* Floating icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center shadow-xl">
              <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
                <line x1="11" y1="8" x2="11" y2="11" />
                <line x1="11" y1="14" x2="11.01" y2="14" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-500 mb-2">
          Page Not Found
        </p>
        <h1 className="text-2xl font-semibold text-gray-100 tracking-tight mb-3">
          Oops! This page doesn't exist
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-sm font-semibold text-gray-950 tracking-wide transition-all duration-200 shadow-lg shadow-amber-500/20"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>
          <button
            onClick={() => history.back()}
            className="px-5 py-2.5 rounded-xl border border-gray-700 text-sm font-medium text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-200"
          >
            Go Back
          </button>
        </div>

      </div>
    </div>
  );
}