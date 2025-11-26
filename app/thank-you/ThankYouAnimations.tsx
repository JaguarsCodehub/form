"use client";

import Link from "next/link";

export default function ThankYouAnimations({ displayName }: { displayName: string }) {
  return (
    <>
      {/* Animated Success Checkmark */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-bounce">
            <svg
              className="w-12 h-12 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                animation: "scaleIn 0.5s ease-out, drawCheck 0.5s ease-out 0.3s both",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                style={{
                  strokeDasharray: "24",
                  strokeDashoffset: "24",
                  animation: "drawCheck 0.5s ease-out 0.3s forwards",
                }}
              />
            </svg>
          </div>
          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-emerald-200 animate-ping opacity-75"></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-2">
        <p className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-emerald-600">Thank you</p>
        <svg
          className="w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            animation: "scaleIn 0.5s ease-out 0.2s both",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1
        className="mt-4 text-3xl font-sans font-semibold tracking-tight"
        style={{
          animation: "fadeIn 0.6s ease-out 0.4s both",
        }}
      >
        We got your details, {displayName}!
      </h1>
      <p
        className="mt-4 text-base font-sans text-zinc-500"
        style={{
          animation: "fadeIn 0.6s ease-out 0.6s both",
        }}
      >
        Sit tight—we&apos;ll reach out soon. Visit our website to learn more about our services and offerings.
      </p>

      <Link
        href={process.env.NEXT_PUBLIC_WEBSITE_URL || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-sans font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 hover:scale-105"
        style={{
          animation: "fadeIn 0.6s ease-out 0.8s both",
        }}
      >
        <span className="font-sans">Visit our website for more details</span>
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>

    </>
  );
}

