"use client";

import { useState } from "react";

export default function Navbar() {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo Section */}
        <a href="https://butterflyfintech.com/" className="flex items-center gap-3 relative z-[101]">
          <div className="flex items-center gap-3">
            <img
              src="/Butterfly_Fintech_Logo1.svg"
              alt="Butterfly Fintech Logo"
              className="h-12 w-auto"
              style={{ maxWidth: "200px" }}
            />
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 lg:flex relative z-[101]">
          <a
            href="https://butterflyfintech.com/"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="https://butterflyfintech.com/about_us.html"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            About Us
          </a>

          {/* Product Dropdown */}
          <a
            href="https://butterflyfintech.com/car_refinance.html"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Products
          </a>

          <a
            href="https://butterflyfintech.com/emi_calculator.html"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            EMI Calculator
          </a>
          <a
            href="https://blog.butterflyfintech.com/"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Blogs
          </a>
          <a
            href="https://butterflyfintech.com/contact_us.html"
            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
          >
            Contact Us
          </a>
        </div>

        {/* Apply Now Button */}
        <a
          href="https://apply.butterflyfintech.com/"
          className="relative z-[101] rounded-lg bg-yellow-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-yellow-300"
        >
          Apply Now
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-[101] lg:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg lg:hidden z-[101]">
          <div className="flex flex-col px-4 py-4 space-y-3">
            <a
              href="https://butterflyfintech.com/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="https://butterflyfintech.com/about_us.html"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </a>
            <div className="py-2">
              <button
                onClick={() => setIsProductOpen(!isProductOpen)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Product
                <svg
                  className={`h-4 w-4 transition-transform ${isProductOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isProductOpen && (
                <div className="mt-2 pl-4 space-y-2">
                  <a
                    href="https://butterflyfintech.com/"
                    className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    New Car Loan
                  </a>
                  <a
                    href="https://butterflyfintech.com/"
                    className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pre owned Car Loan
                  </a>
                  <a
                    href="https://butterflyfintech.com/car_refinance.html"
                    className="block text-sm text-gray-600 hover:text-blue-600 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Car Refinance
                  </a>
                </div>
              )}
            </div>
            <a
              href="https://butterflyfintech.com/emi_calculator.html"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              EMI Calculator
            </a>
            <a
              href="https://blog.butterflyfintech.com/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blogs
            </a>
            <a
              href="https://butterflyfintech.com/contact_us.html"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

